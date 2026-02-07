import cors from 'cors';
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import 'dotenv/config';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
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

     app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(` Endpoint de busca: http://localhost:${PORT}/api/movies`);
});