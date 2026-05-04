import { SmartImage } from '../ui/SmartImage';
import type { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';
import { FavoriteButton } from './FavoriteButton';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative group w-full  select-none">

      <article className="relative bg-[#1a242f] rounded-lg overflow-hidden isolate shadow-2xl border border-white/5 h-full">

        <Link to={`/movie/${movie.imdbID}`} className="block">
          <div className="aspect-[2/3] w-full overflow-hidden bg-slate-800">
            <SmartImage
              src={movie.Poster}
              alt={movie.Title}
              draggable={false}
              className="pointer-events-none select-none"
            />
          </div>
        </Link>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172430] via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-3 text-center z-10 pointer-events-none">
          <h3 className="text-[11px] sm:text-xs lg:text-sm text-gray-100 font-bold truncate leading-tight">
            {movie.Title}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 mt-1.5 text-[9px] sm:text-[10px] lg:text-xs font-black">
            <span className="text-prime-blue uppercase">{movie.Year}</span>

            {movie.Rated && movie.Rated !== 'N/A' && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">•</span>
                <span className="px-1 py-0.5 rounded border border-white/20 bg-white/5 text-gray-300">
                  {movie.Rated}
                </span>
              </div>
            )}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">•</span>
                <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-1.5 py-0.5 rounded-md font-bold">
                  IMDb {movie.imdbRating}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
      <div className="absolute top-2 right-2 z-20">
        <FavoriteButton movie={movie}/>
      </div>
    </div>
  );
};