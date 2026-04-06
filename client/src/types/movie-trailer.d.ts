declare module 'movie-trailer' {
  interface Options {
    id?: boolean;
    multi?: boolean;
    year?: string | number;
    tmdbId?: string | number;
  }

  function movieTrailer(
    movie: string,
    options?: Options | boolean
  ): Promise<string | string[] | null>;

  export default movieTrailer;
}

export {};