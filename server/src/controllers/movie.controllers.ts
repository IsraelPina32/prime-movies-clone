import {  Request ,Response} from 'express';
import { MovieService } from '@/services/movie.services';


const movieService = new MovieService();

export const getMovies = async (req: Request, res: Response) => {
    try {
        const { s } = req.query;

        if(!s || typeof s !== 'string') {
            return res.status(400).json({ error: 'Query parameter "s" is required and must be a string' });
        };

        const movies = await movieService.searchMovies(s);
        return res.json(movies);

    } catch (error: any) {
        console.error(' [MovieController]:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching movies' });
    };
};