import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { movieService } from "../../services/movieService";
import type { MovieDetail } from "../../types/movie";
import { SmartImage } from "../../components/ui/SmartImage";
import { formatRuntime } from "../../utils/formatters";
import { TrailerSection } from "../MovieDetails/components/TrailerSection";
import { RatingBadge } from "../../components/ui/RatingBadge";


export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMovieDetails = async () => {
      if (!id) return;
      setLoading(true);

      try {

        const rawData = await movieService.getMovieDetails(id);

        if (isMounted && rawData) {
          const formattedData: MovieDetail = {
            imdbID: id,
            Rating: rawData.imdbRating || "N/A",
            Rated: rawData.rated || "N/A",
            Title: rawData.title || "Sem título",
            Year: rawData.year || "N/A",
            Poster: rawData.poster === "" ? null : rawData.poster,
            imdbRating: rawData.imdbRating || "N/A",
            Runtime: rawData.runtime || "N/A",
            Genre: rawData.genre || "N/A",
            Plot: rawData.plot || "Sinopse não disponível",
            Director: rawData.director || "N/A",
            Actors: rawData.actors || "N/A",
            Type: rawData.type || "movie",
            Writer: rawData.writer || "N/A",
            Released: rawData.released || "N/A",
          };
          setMovie(formattedData);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovieDetails();
    return () => { isMounted = false; }; // Cleanup function
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-prime-blue/20 border-t-prime-blue rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) return null;
  const hasValidRating = 
  data.imdbRating && 
  data.imdbRating !== 'N/A' && 
  data.imdbRating !== 'sem IMDB.' && 
  data.imdbRating !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1440px] mx-auto px-10 py-10"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold group"
      >
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        Voltar para a busca
      </button>

      <div className="flex flex-col md:flex-row gap-12 bg-[#1a242f] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        <div className="w-full md:w-[400px] shrink-0">
          <SmartImage src={data.Poster} alt={data.Title} className="w-full h-full object-cover" />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-4xl text-prime-blue md:text-5xl font-black mb-4 leading-tight">{data.Title}</h1>

          <div className="flex items-center flex-wrap gap-6 mb-9 text-sm font-bold">
            <span className="text-prime-blue uppercase tracking-widest">{data.Year}</span>
            <span className="text-gray-400">
              {data.Type === 'series' ? 'Série de TV' : (data.Runtime !== "N/A" ? formatRuntime(data.Runtime) : "Tempo não informado")}
            </span>

            {hasValidRating ? (
              <div className="flex items-center gap-1.5">

                <RatingBadge rating={data.imdbRating} />
              </div>
            ) :
              (
                <span className="bg-gray-500/10 text-gray-400 border border-gray-500/20 px-3 py-1 rounded-md">
                  Sem nota IMDb
                </span>
              )}
            <span className="text-gray-400 border border-gray-700 px-3 py-1 rounded-md">{data.Genre}
              
            </span>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl italic">
            {data.Plot}
          </p>

          <div className="grid grid-cols-1 gap-7 pt-7 border-t border-white/5">
            <p className="text-yellow-500 tracking-tighter">
              <span className="text-gray-500 font-bold uppercase tracking-tighter mr-2">
                {data.Type === 'series' ? 'Criadores: ' : 'Director: '}
              </span>
              {data.Director !== "N/A" ? data.Director : (data.Writer !== "N/A" ? data.Writer : "Informação indisponível")}
            </p>
            <p className="text-yellow-500 tracking-tighter">
              <span className="text-gray-500 font-bold uppercase tracking-tighter mr-2">Elenco:</span>
              {data.Actors !== "N/A" ? data.Actors : "Informação indisponível"}
            </p>

            <div className="mt-4">
              <TrailerSection movieTitle={data.Title} year={data.Year} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};