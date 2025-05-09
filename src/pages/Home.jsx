import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
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

      // Fetch trailers for each movie
      const movieData = await Promise.all(
        res.data.results.map(async (movie) => {
          try {
            const videoRes = await axios.get(`${BASE_URL}/movie/${movie.id}/videos`, {
              params: { api_key: API_KEY }
            });

            const trailer = videoRes.data.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

            return {
              ...movie,
              trailerKey: trailer ? trailer.key : null
            };
          } catch (err) {
            return { ...movie, trailerKey: null };
          }
        })
      );

      setMovies(movieData);
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
                  width: '100%',
                  height: 425,
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
                  py: 2,
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  textAlign: 'left'
                }}
              >
                {movie.trailerKey && (
                  <Box
                  component="a"
                  href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    border: '2px solid white'
                  }}
                >
                  ▶
                </Box>
                
                )}

                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(movie.release_date).getFullYear()}
                  </Typography>
                  <Typography
                      variant="body1"
                      component="a"
                      href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'rgba(255,255,255,0.8)', // for better visibility, use 0.8 or adjust as needed
                        // backgroundColor: 'rgba(255,255,255,0.2)',
                        // px: 2,
                        // py: 1,
                        borderRadius: 1,
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        // display: 'inline-block'
                      }}
                    >
                      Watch the Trailer
                    </Typography>

                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default Home;
