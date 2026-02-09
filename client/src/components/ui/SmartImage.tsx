import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MovieSkeleton } from '../movies/MovieSkeleton';
import  noImagePlaceholder from "../../assets/no-poster.svg"

interface SmartImageProps {
  src: string | null;
  alt: string;
  className?: string;
  opacity?: number;
}

export const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getImageUrl = (path: string | null) => {
    if (!path || hasError) return noImagePlaceholder;
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const finalSrc = getImageUrl(src);

  return (
    <div className="relative w-full h-full bg-slate-800 overflow-hidden">
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20"
          >
            <MovieSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={finalSrc}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true);
        }}
        className={`${className} ${isLoaded ? 'scale-100' : 'scale-110'} transition-transform duration-700`}
        loading="lazy"
      />
    </div>
  );
};