import { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import movieTrailer from 'movie-trailer';

interface TrailerSectionProps {
  movieTitle: string;
  year?: string;
}

export const TrailerSection = ({ movieTitle, year }: TrailerSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const url = await movieTrailer(movieTitle, { year: year });
        if (url) {
          const videoId = new URL(url).searchParams.get('v');
          setTrailerUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
        }
      } catch (err) {
        console.error("Trailer não encontrado:", err);
      }
    };
    getTrailer();
  }, [movieTitle, year]);

  if (!trailerUrl) return null; // Não exibe nada se não achar trailer

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-prime-blue text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-prime-blue/20"
      >
        <Play size={20} fill="currentColor" />
        Assistir Trailer
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-prime-blue z-10 bg-black/50 p-2 rounded-full"
              >
                <X size={24} />
              </button>
              <iframe
                src={trailerUrl}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};