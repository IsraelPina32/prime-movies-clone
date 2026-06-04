import {  Request, Response} from 'express';
import { MovieService } from '@/services/movie.services';

const movieService = new MovieService();

export const getMovies = async (req: Request, res: Response) => {
    try {
        const { query, page, year, type } = req.query;

        if(!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Query parameter "s" is required and must be a string' });
        };

        const result = await movieService.searchMovies(query, Number(page) || 1, typeof year === 'string' ? year : undefined, typeof type === 'string' ? type : undefined);
        return res.json({
            movies: result.movies,
            totalResults: result.total
        });

    } catch (error: any) {
        console.error(' [MovieController]:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching movies' });
    };
};

export const getMovieDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        if (typeof id !== 'string') {
            return res.status(400).json({ error: 'Movie ID is required' });
        }

        const movie = await movieService.getMovieDetails(id);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        return res.json(movie);

    } catch (error: any) {
        console.error(' [MovieController Details]:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching movie details' });
    }
};