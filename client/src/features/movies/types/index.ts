/**
 *  @file Movie Domain Interfaces
 *  @description Core date contracts for the Movies discovery Feature.
 */


export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: "movie" | "series" | "episode";
    Poster: string;
};

export interface OMDBSearchResponse {
    Serch?: Movie[];
    totalResults?: string;
    Response: "True" | "False";
    Errro?: string;
}

export interface MovieFilters {
    serachTerm: string;
    year?: string;
    type?: "movie" | "series" | "episode";
};


export interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    filters: MovieFilters;
}