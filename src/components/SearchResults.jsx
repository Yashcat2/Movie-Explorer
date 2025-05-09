import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      axios
        .get(`${BASE_URL}/search/movie`, {
          params: { api_key: API_KEY, query },
        })
        .then((res) => setResults(res.data.results))
        .catch(console.error);
    }
  }, [query]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Results for: "{query}"
      </Typography>
      <Grid container spacing={3}>
        {results.map((movie) => (
          <Grid item xs={6} sm={4} md={3} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;
