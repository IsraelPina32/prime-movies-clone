import React from 'react';
import { SmartImage } from './SmartImage';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

export   const  MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
 
    const getSecurePoster = (url: string) => {
        if (!url || url === 'N/A') return 'https://via.placeholder.com/300x450?text=Sem+Poster';
            
        return url.replace(/^http:\/\//i, 'https://');
     };

     const posterUrl = getSecurePoster(movie.Poster);

  return (
    <article className="relative group bg-[#1a242f] rounded-lg overflow-hidden isolate transition-all duration-300 hover:scale-105 shadow-2xl transform-gpu border border-white/5">
      <div className="aspect-[2/3] w-full overflow-hidden bg-slate-800">
        <SmartImage 
          src={posterUrl} 
          alt={movie.Title} 
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#172430] via-transparent to-transparent opacity-100 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"/>

      <div className="absolute bottom-0 left-0 right-0 p-3 text-center z-10 pointer-events-none">
        <h3 className="text-[10px] md:text-xs text-gray-100 font-bold truncate leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {movie.Title}
        </h3>
        <p className="text-[10px] text-xs font-black text-prime-blue mt-1 tracking-wide uppercase">
          {movie.Year}
        </p>
      </div>
    </article>
  );
};