import cors from 'cors';
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import 'dotenv/config';



dotenv.config();

const app = express();

app.use(cors({
    origin: ['https://prime-movies-clone.vercel.app',
            "http://localhost:5173"
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
}));

const PORT = process.env.PORT || 3001;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.get('/api/movies', async (req, res) => {
    const query = req.query.query as string;

    if(!query) {
        return res.status(400).json({ error: "Query parameter is required"})
    };

    try {
        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                s: query,
                apikey: OMDB_API_KEY,
            },    
        });
            res.json(response.data);

            } catch (error) {
        console.error('Error fetching data from OMDB API.', error);
        res.status(500).json({ error: 'Error fetching data from OMDB API.'})
        };
     });

app.get('/api/movies/:id', async(req, res) => {
    const { id } = req.params;
    const apiKey = process.env.OMDB_API_KEY;

    try {
        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                i: id,
                plot: 'full',
                apikey: apiKey,
            },
        });
    if(response.data.Response === "False") {
        return res.status(404).json({error: "Movie not found"});
      }
      res.json(response.data);
    } catch (error) {
        console.error("Error fetching movie details from OMDB API.", error);
        res.status(500).json({error: "Error fetching movie details from OMDB API."});
    }
});

app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Endpoint de search: http://localhost:${PORT}/api/movies`);
        console.log(`Details: http://localhost:${PORT}/api/movies/ID_AQUI`);
});