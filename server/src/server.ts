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

    const { query, genre, year, page, type} = req.query

    let validYear = undefined;

    if( year && /^\d{4}$/.test( year as string)) {
        validYear = year as string;
    }

    if(!query) {
        return res.status(400).json({ error: "Query parameter is required"})
    };

    try {
        const searchResponse = await axios.get('https://www.omdbapi.com/', {
            params: {
                apikey: OMDB_API_KEY,
                s: query,
                y: validYear,
                page: page || 1,
                type: type || undefined
            },    
        });
            if(searchResponse.data.Response === "False") {
                return res.json({ Search: [], totalResults: "0"});
            };

            const movies : OMDBasicMovie[] = searchResponse.data.Search;
            const totalResults = searchResponse.data.totalResults;
            const hasGenreFilter = genre && genre !== 'All' && genre !== '';

            if(!hasGenreFilter) return res.json({ Search: movies, totalResults: totalResults, Response: "True" });

            const detailedMovies = await Promise.all(movies.map(async (movie: OMDBasicMovie) => {
                try {
                    const detail = await axios.get('https://www.omdbapi.com/', {
                        params: { i: movie.imdbID, apikey: OMDB_API_KEY }
                    });
                    return detail.data
                } catch {
                    return null;
                }
            })
          );


            const filteredResults = detailedMovies.filter((m): m is any => m !== null).filter((m: any) => m.Genre && m.Genre.toLowerCase().includes((genre as string).toLowerCase()));

            res.json({ Search: filteredResults, totalResults: totalResults, Response: "True" });

            } catch (error) {
                 console.error('[BACK_ERROR]', error);
                 res.status(500).json({ error: 'Internal Server Error'})
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
    } catch (error: unknown) {

        if (error instanceof Error) {
              console.error(`[OMDB_FETCH_ERROR]: ${error.message}`)
        res.status(500).json({
            error: "Error fetching movie details from OMDB API.",
            message:  "Our service is temporarily unable to connect to the movie provider."
        });
        } else {
            console.error("Error fetching movie details from OMDB API.", error);
            res.status(500).json({ error: "An unexpected error occurred."})
        }
    };
});

if(process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Dev server on http://localhost:${PORT}`));
};

export default app;