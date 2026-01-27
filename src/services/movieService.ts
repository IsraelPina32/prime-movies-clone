import api from "./api";
import type { MovieDetail, MovieResponse } from "../types/movie";

/**
 * MovieService
 */

export const movieService = {

    searchMovies: async (title: string): Promise<MovieResponse> => {
        try {
            const response = await api.get<MovieResponse>('', {
                params: { s: title }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            throw error;
        }
    },

    getMovieDetails: async (id: string): Promise<MovieDetail> => {
         try {
            const response = await api.get<MovieDetail>('', {
                params: { i: id, plot: 'full'}
            });
            return response.data;
         } catch (error) {
            console.error("Error fetching movie details:", error);
            throw error;
         }
    }
};