import cors from 'cors';
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['https://prime-movies-clone.vercel.app',
            "http://localhost:5173"
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
}));

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

if(process.env.NODE !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Dev server on http://localhost:${PORT}`));
};



export default app;