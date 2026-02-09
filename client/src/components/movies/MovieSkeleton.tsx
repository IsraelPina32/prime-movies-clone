import { motion } from "framer-motion";

export function MovieSkeleton() {
  return (
    <div className="relative bg-[#1a242f] rounded-lg overflow-hidden shadow-2xl border border-white/5 aspect-[2/3]">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 will-change-transform"
      />
      <div className="w-full h-full bg-slate-800/40" />
      
      <div className="absolute bottom-0 p-4 w-full space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-prime-blue/20 rounded w-1/4" />
      </div>
    </div>
  );
}