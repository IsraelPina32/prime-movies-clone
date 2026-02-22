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

    searchMovies: async (title: string, genre: string, year: string, page: number): Promise<OmdbSearchResponse> => {

        try{
            const response = await api.get<OmdbSearchResponse>('/movies', {
                    params: { query: title, genre: genre || undefined, year: year || undefined, page: page}
                });
            
            console.log("RESPOSTA COMPLETA DO SERVIDOR:", response.data);
            return response.data;

        } catch (error) {
            console.error('Falied to request the search endpoint:', error);
            return { Search: [], totalResults: "0", Response: "False", Error: "Error conection"};
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