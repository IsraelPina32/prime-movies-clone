import express, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from '@/config/env';
import { apiLimiter } from '@/middlewares/rateLimiter';
import { errorHandler } from '@/middlewares/errorHandler';
import { getMovieDetails, getMovies } from '@/controllers/movie.controllers';
import { MovieService } from '@/services/movie.services';

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.options('*', cors()); 
app.use('/api', apiLimiter);
app.get('/api/movies', getMovies);
app.get('/api/movies/:id', getMovieDetails);
app.get('/api/movie/:id', async (req, res) => {
    const { id } = req.params; 
    const movieService = new MovieService(); 

    try {
        const movie = await movieService.getMovieDetails(id);
        
        if (!movie) {
            return res.status(404).json({ message: "Filme não encontrado no OMDB" });
        }

        return res.json(movie);
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});
app.use(errorHandler as ErrorRequestHandler);

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`[Movie Prime Pro]: Senior Backend operational on port ${PORT}`);
    console.log(`[Env]: Running in ${config.nodeEnv} mode`);
});