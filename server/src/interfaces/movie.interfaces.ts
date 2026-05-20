export interface OMDBMovieRaw {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    imdbRating?: string;
};

export interface Movie {
    id: string;
    title: string;
    year: string;
    poster: string;
    imdbRating?: string;
    runtime?: string;
    genre?: string;
    plot?: string;
    director?: string;
    actors?: string;
    type: string;
    writer?: string;
    released?: string;
}