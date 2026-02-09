import { Header } from "./components/layout/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { MovieProvider } from "./context/MovieContext";
function App() {
  
  return (
    <MovieProvider >
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie/:id" element={<MovieDetailsPage/>}/>
        </Routes>
    </MovieProvider>
  );
}

export default App
