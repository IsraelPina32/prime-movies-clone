import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MovieSkeleton } from './MovieSkeleton';

interface MovieGridSkeletonProps {
  count?: number;
  isLoading: boolean;
}

export const MovieGridSkeleton: React.FC<MovieGridSkeletonProps> = ({ 
  count = 12, 
  isLoading 
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={`skeleton-wrapper-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                delay: i * 0.05,
                ease: "easeOut" 
              }}
              className="w-full"
            >
              <MovieSkeleton />
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
};