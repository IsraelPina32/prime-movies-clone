import  api  from "./api"; 
import type { Movie } from "../types/movie";

export interface MovieSearchResponse {
  movies: Movie[];
  totalResults: number;
}

export const movieService = {
  searchMovies: async (options: {
    query: string;
    page: number;
    genre?: string;
    year?: string;
    type?: string;
  }): Promise<MovieSearchResponse> => {
    try {

      const response = await api.get('/api/movies', {
        params: {
          query: options.query,
          page: options.page
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to request the search endpoint:', error);
      return { movies: [], totalResults: 0 };
    }
  },

  getMovieDetails: async (id: string) => {
    try {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to request the details endpoint:", error);
      throw error;
    }
  }
};