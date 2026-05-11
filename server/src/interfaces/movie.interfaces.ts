export interface OMDBMovieRaw {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Rated?: string;
    imdbRating?: string;
    Plot?: string;
    Genre?: string;
};

export interface Movie {
    id: string;
    title: string;
    year: string;
    poster: string;
    rating: string;
    classification: string;
    plot: string;
    genres: string[];
}