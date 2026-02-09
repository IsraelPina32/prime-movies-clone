import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MovieSkeleton } from './MovieSkeleton';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        src={hasError ? 'https://via.placeholder.com/300x450?text=Erro' : src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoaded ? 'scale-100' : 'scale-110'} transition-transform duration-700`}
        loading="lazy"
      />
    </div>
  );
};