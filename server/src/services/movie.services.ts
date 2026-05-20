import axios from "axios";
import { OMDBMovieRaw, Movie } from "@/interfaces/movie.interfaces";
import { config } from "@/config/env";

export interface MovieSearchResponse {
    movies: Movie[];
    total: number;
};

export class MovieService {
    private readonly baseUrl = config.omdb.baseUrl;
    private readonly apiKey = config.omdb.apiKey;

    async searchMovies(query: string, page: number = 1): Promise<MovieSearchResponse> {
        if (!this.apiKey) {
            throw new Error('OMDB API key is not set in environment variables.');
        };

        const { data: searchData } = await axios.get(`${this.baseUrl}?s=${query}&page=${page}&apikey=${this.apiKey}`);

        if (!searchData.Search || searchData.Response === "False" || !searchData.Search) {
            return { movies: [], total: 0 };
        };

        return {
            movies: searchData.Search.map((movie: any) => ({
                id: movie.imdbID,
                title: movie.Title || 'Sem título',
                year: movie.Year || 'N/A',
                poster: movie.Poster !== 'N/A' ? movie.Poster : '',
                imdbRating: movie.imdbRating || 'N/A',
                runtime: movie.Runtime || 'N/A',
                genre: movie.Genre || 'N/A',
                plot: movie.Plot || '',
                director: movie.Director || 'N/A',
                actors: movie.Actors || 'N/A',
                type: movie.Type || 'movie',
                writer: movie.Writer || 'N/A',
                released: movie.Released || 'N/A'
            })),
            total: Number(searchData.totalResults) || 0
        };
    };

    async getMovieDetails(id: string): Promise<Movie | null> {
        if (!this.apiKey) throw new Error('API Key missing');

        try {
            const { data } = await axios.get(`${this.baseUrl}?i=${id}&plot=full&apikey=${this.apiKey}`);

            if (data.Response === "False") return null;

            return this.mapToMovie(data);

        } catch (error) {
            console.error("Error fetching movie details:", error);
            return null;
        };
    };

    private mapToMovie(data: OMDBMovieRaw): Movie {
        return {
            id: data.imdbID,
            title: data.Title,
            year: data.Year,
            poster: data.Poster !== 'N/A' ? data.Poster : '',
            imdbRating: data.imdbRating || 'N/A', 
            runtime: data.Runtime || 'N/A',
            genre: data.Genre || 'N/A',
            plot: data.Plot || '',
            director: data.Director || 'N/A',
            actors: data.Actors || 'N/A',
            type: data.Type || 'movie',
            writer: data.Writer || 'N/A',
            released: data.Released || 'N/A'
        };
    };
};