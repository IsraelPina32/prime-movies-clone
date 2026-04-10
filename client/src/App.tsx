import { Header } from "./components/layout/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MovieDetailsPage } from "./pages/MovieDetails/MovieDetailsPage";
import { MovieProvider } from "./context/MovieContext";
import { FavoritesProvider } from "./context/FavoritesCotext";
import { FavoritesPage } from "./pages/Favorites/FavoritesPage";
function App() {
  
  return (
    <MovieProvider >
      <FavoritesProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie/:id" element={<MovieDetailsPage/>}/>
          <Route path="/favorites" element={<FavoritesPage/>}/>
        </Routes>
      </FavoritesProvider>
    </MovieProvider>
  );
}

export default App
