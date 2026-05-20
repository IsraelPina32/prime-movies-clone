import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  
  if (!context) {
    throw new Error("useMovieContext deve ser usado dentro de um MovieProvider");
  }
  
  return context;
};