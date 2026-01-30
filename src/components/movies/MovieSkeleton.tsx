export function MovieSkeleton() {
  return (
    <div className="relative bg-[#1a242f] rounded-lg overflow-hidden shadow-xl animate-pulse">
    
      <div className="aspect-[2/3] w-full bg-slate-700/50" />
    
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f171e] via-transparent to-transparent opacity-80" />
    
      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
       
      <div className="h-3 bg-slate-600/50 rounded w-3/4 mx-auto" />
        
      <div className="h-2 bg-prime-blue/20 rounded w-1/4 mx-auto" />
      </div>
    </div>
  );
}