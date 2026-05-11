import axios from "axios";
import { OMDBMovieRaw, Movie } from "@/interfaces/movie.interfaces";
import {config } from "@/config/env";

export class MovieService {
    private readonly baseURL = config.omdb.baseURL;
    private readonly apiKey = config.omdb.apiKey;

    async searchMovies(query: string): Promise<Movie[]> {
        if (!this.apiKey) {
            throw new Error('OMDB API key is not set in environment variables.');
        };

        const { data: searchData } = await axios.get(`${this.baseURL}?s=${query}&apikey=${this.apiKey}`);

        if (!searchData.Search) {
            return [];
        };

        const detailedPromises = searchData.Search.slice(0, 10).map((movie: any) =>
            axios.get(`${this.baseURL}?i=${movie.imdbID}&apikey=${this.apiKey}`)
        );

        const detailedResponses = await Promise.all(detailedPromises);

        return detailedResponses.map(({ data }: { data: OMDBMovieRaw }) => ({
            id: data.imdbID,
            title: data.Title,
            year: data.Year,
            poster: data.Poster !== 'N/A' ? data.Poster : '/no-poster.svg',
            rating: data.imdbRating || 'N/A',
            classification: data.Rated || 'N/A',
            plot: data.Plot || `Sinopsis not available for ${data.Title}.`,
            genres: data.Genre?.split(', ') || []
        }));
    };
};