declare module 'movie-trailer' {
  const movieTrailer: (
    movie: string,
    options?: { id?: boolean; multi?: boolean; year?: string | number } | boolean
  ) => Promise<any>;

  export default movieTrailer;
}