import api from "./api";
import type { Movie, } from "../types/movie";

/**
 * MovieService
 */

interface OmdbSearchResponse {
    Search: Movie[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export const movieService = {

    searchMovies: async (title: string): Promise<Movie[]> => {
        console.log("Chamando a URL:", api.defaults.baseURL);
        try{
            const response = await api.get<OmdbSearchResponse>('/movies', {
                    params: { query: title }
                });
            if (response.data.Response === "False") {
                console.error('OMDB API Error:', response.data.Error);
                return [];
            } 

         return response.data.Search || [];
        } catch (error) {
            console.error('Falied to request the search endpoint:', error);
            return [];
        }
    },

    getMovieDetails: async (id: string) => {
    
        try {
            const response = await api.get(`/movies/${id}`);
            
            if((response.data as any).Response === "False") {
                throw new Error((response.data as any).Error)   
            }
            return response.data;  
        } catch (error) {
            console.error("Failed to request the details endpint:", error);
            throw error;
        }
    }
};