import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchPage = () => {
  const [query, setQuery] = useState(localStorage.getItem('lastSearch') || '');
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);

  // Fetch trending movies on mount
  const fetchTrending = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
        params: { api_key: API_KEY }
      });
      setTrending(res.data.results);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    }
  };

  // Search movies by query
  const searchMovies = async (searchTerm) => {
    if (!searchTerm) return;

    try {
      const res = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchTerm
        }
      });
      setResults(res.data.results);
      localStorage.setItem('lastSearch', searchTerm); // Save search
    } catch (err) {
      console.error('Error searching movies:', err);
    }
  };

  useEffect(() => {
    fetchTrending();

    // If user had a previous search term, auto-trigger search
    if (query) {
      searchMovies(query);
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 2) {
      searchMovies(value);
    } else {
      setResults([]);
    }
  };

  const displayedMovies = results.length > 0 ? results : trending;

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search movies"
        value={query}
        onChange={handleChange}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4}>
        {displayedMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{ height: 350 }}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchPage;
