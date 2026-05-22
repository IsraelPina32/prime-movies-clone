import express, { Request, Response,  NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from '@/config/env';
import { apiLimiter } from '@/middlewares/rateLimiter';
import { errorHandler } from '@/middlewares/errorHandler';
import { getMovieDetails, getMovies } from '@/controllers/movie.controllers';
import { MovieService } from '@/services/movie.services';

const app = express();

app.use(helmet());
const corsOptions = {
  origin: config.nodeEnv === 'production' ? config.allowedOrigins : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(apiLimiter);

const apiRouter = express.Router();

apiRouter.get('/movies', getMovies);
apiRouter.get('/api/movies/:id', getMovieDetails);
apiRouter.get('/api/movie/:id', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.query; 
    const movieService = new MovieService(); 

    if (typeof id !== 'string') {
    return res.status(400).json({ error: "O parâmetro 'id' deve ser uma string única." });
  }

    try {
        const movie = await movieService.getMovieDetails(id);
        
        if (!movie) {
            return res.status(404).json({ message: "Filme não encontrado no OMDB" });
        }

        return res.json(movie);
    } catch (error) {
        next(error);
    }
});

app.use('/api', apiRouter);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`[Movie Prime Pro]: Senior Backend operational on port ${PORT}`);
    console.log(`[Env]: Running in ${config.nodeEnv} mode`);
});

export default app;