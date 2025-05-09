import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_KEY; // Ensure this is set in Netlify too
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const Home = () => {
  const [movies, setMovies] = useState([]);

  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1
        }
      });
      setMovies(res.data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Movie App
        </Typography>
        <Typography variant="body1" gutterBottom>
          Search and discover your favorite movies!
        </Typography>

        <Slider {...settings}>
  {movies.map((movie) => (
    <Box key={movie.id} sx={{ position: 'relative' }}>
      <img
        src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        style={{
          width: 800,
          height: 450,
          objectFit: 'cover',
          borderRadius: '10px'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
          color: 'white',
          px: 2,
          py: 1,
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          textAlign: 'left' // 🔁 ensure left alignment

        }}
      >
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">
          {new Date(movie.release_date).getFullYear()}
        </Typography>
      </Box>
    </Box>
  ))}
</Slider>

      </Box>
    </Container>
  );
};

export default Home;
