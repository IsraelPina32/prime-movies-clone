
export interface Movie {
    readonly id: string,
    readonly imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string | null;
};

export interface MovieResponse {
    Search?: Movie[];
    totalResults?: string;
    Response: string;
    Error?: string;
};

export interface MovieDetail extends Movie {
    Plot: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    imdbRating: string;
    Runtime: string;
    Released: string;
    Type: string;
    TotalSeasons?: string;
}