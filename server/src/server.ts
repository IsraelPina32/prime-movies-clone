import cors from 'cors';
import express, { Request, Response } from 'express';
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

interface OMDBasicMovie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;

}

app.get('/api/movies', async (req : Request, res: Response) => {
    const  query  = req.query.query as string;
    const genre  = req.query.genre as string;

    if(!query) {
        return res.status(400).json({ error: "Query parameter is required"})
    };

    try {
        const searchResponse = await axios.get('https://www.omdbapi.com/', {
            params: {
                s: query,
                apikey: OMDB_API_KEY,
            },    
        });
            if(searchResponse.data.Response === "False") {
                return res.json({ Search: [], totalResults: "0"});
            }

            const movies : OMDBasicMovie[] = searchResponse.data.Search;

            const detailedMovies = await Promise.all(movies.slice(0, 10).map(async (movie: OMDBasicMovie) => {
                const detail = await axios.get('https://www.omdbapi.com/', {
                    params: { i: movie.imdbID, apikey: OMDB_API_KEY }
                });
                return detail.data
            })
          );


            const filteredResults = genre && genre !== 'All' ? detailedMovies.filter((m: any) => m.Genre && m.Genre.includes(genre as string)) : detailedMovies;

            res.json({ Search: filteredResults });

            } catch (error) {
                 console.error('Error fetching data from OMDB API.', error);
                 res.status(500).json({ error: 'Error fetching data from OMDB API.'})
        };
     });

app.get('/api/movies/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get('https://www.omdbapi.com/', {
            params: { i: id, plot: 'full', apikey: OMDB_API_KEY,}
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