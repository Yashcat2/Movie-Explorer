import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../api/tmdb';
import {
  Container, Typography, Grid, CardMedia, Chip, Box, CircularProgress, Button
} from '@mui/material';
import { toast } from 'react-toastify'; // Import toast

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  // Add to favorites functionality
  const addToFavorites = (movie) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Check if movie is already in favorites
    const isMovieInFavorites = storedFavorites.some((fav) => fav.id === movie.id);
    if (!isMovieInFavorites) {
      storedFavorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
      
      // Show toast notification
      toast.success(`${movie.title} has been added to favorites!`);
    }
  };

  if (loading) return <Container sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Container>;
  if (!movie) return <Container><Typography>Error loading movie.</Typography></Container>;

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Grid container spacing={5}>
        {/* Left Column: Poster */}
        <Grid item xs={6} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              image={getImageUrl(movie.poster_path)}
              alt={movie.title}
              sx={{
                width: '100%',
                maxWidth: '100%',
                borderRadius: 2,
                maxHeight: 600,
                objectFit: 'cover',
                boxShadow: 3,
              }}
            />
          </Box>
        </Grid>

        {/* Right Column: Details */}
        <Grid item xs={6} md={8}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            {movie.title}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {movie.overview}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Genres
            </Typography>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} color="primary" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Release Date:</strong> {movie.release_date}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            <strong>Rating:</strong> {movie.vote_average}
          </Typography>

          {movie.videos?.results?.length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              href={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
              target="_blank"
              sx={{ mt: 2 }}
            >
              Watch Trailer
            </Button>
          )}

          {/* Add to Favorites button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToFavorites(movie)}
            sx={{ mt: 2, ml: 2 }}
          >
            Add to Favorites
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;
