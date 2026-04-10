import { useFavorites } from "../../context/FavoritesCotext";
import { MovieCard } from "../../components/movies/MovieCard";
import {  useNavigate } from "react-router-dom";

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const  navigate  = useNavigate();

  return (
    <main className="min-h-screen bg-[#0f171e] pt-20 px-4 md:px-8">
       <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold group"
      >
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        Voltar para a busca
      </button>

    <h1 className="text-2xl font-bold text-white mb-8">Meus Favoritos</h1>

    {favorites.length === 0 ? (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
        <p className="text-xl">Sua lista está vazia.</p>
        <p className="text-sm">Adicione filmes clicando no ícone de coração.</p>
      </div>
    ) : (
      /* AQUI ESTÁ O GRID */
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    )}
  </main>
  );
};