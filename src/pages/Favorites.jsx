import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';  // Importing toast
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Remove from favorites functionality with toast message
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);  // Update state to remove movie from UI

    // Show toast notification after removal
    toast.success("Movie removed from favorites!");
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {favorites.length === 0 ? (
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 300, // Adjust as needed
            }}
          >
            {/* Empty state icon */}
            <MovieFilterIcon sx={{ fontSize: 100, color: 'gray' }} />
            <Typography variant="h6" sx={{ mt: 2, color: 'gray' }}>
              No favorite movies added yet.
            </Typography>
          </Grid>
        ) : (
          favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
                {/* Use the poster path stored in the full movie object */}
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ height: 350, objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {movie.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Release: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average || 'N/A'}
                  </Typography>
                </CardContent>

                <Box sx={{ padding: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFavorite(movie.id)} // Just remove from favorites
                    sx={{ width: '100%' }}
                  >
                    Remove from Favorites
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
