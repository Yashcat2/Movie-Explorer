// src/pages/MoviePage.jsx
import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies, getImageUrl } from '../api/tmdb';
import {
  Grid, Card, CardMedia, CardContent, Typography, Container, CircularProgress, Box
} from '@mui/material';
import { Link } from 'react-router-dom';


const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 4 }}
      >
        🎬 Trending Movies
      </Typography>
  
      <Grid container spacing={4} justifyContent="center">
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card component={Link} to={`/movie/${movie.id}`} sx={{ height: '100%',width:300, display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
              <CardMedia
                component="img"
                image={getImageUrl(movie.poster_path)}
                alt={movie.title}
                sx={{ height: 350,width:300, objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Release: {movie.release_date?.split('-')[0] || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
  
};

export default MoviePage;
