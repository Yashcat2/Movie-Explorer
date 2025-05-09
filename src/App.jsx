import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LoginSignup from './pages/LoginSignup'; // adjust path if needed
import MoviePage from './pages/MoviePage';
import MovieDetails from './pages/MovieDetails'; // 👈 new page


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup mode="login"  />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />


        {/* You can add more routes like /movie/:id or /favorites later */}
      </Routes>
    </Router>
  );
}

export default App;
