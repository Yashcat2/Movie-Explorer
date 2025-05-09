import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for the toast
import Home from './pages/Home';
import Navbar from './components/Navbar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LoginSignup from './pages/LoginSignup'; // Adjust path if needed
import MoviePage from './pages/MoviePage';
import MovieDetails from './pages/MovieDetails'; // 👈 new page
import FavoritesPage from './pages/Favorites'; // Adjust path if needed
import SearchResults from './components/SearchResults';
import AllMoviePage from './pages/AllMoviePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup mode="login" />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/allmovies" element={<AllMoviePage />} />


      </Routes>
      
      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
    </Router>
  );
}

export default App;
