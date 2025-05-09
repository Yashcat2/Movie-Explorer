// src/api/movieService.js
import tmdb from './tmdb';

export const fetchPopularMovies = async () => {
  const res = await tmdb.get('/discover/movie', {
    params: {
      include_adult: false,
      include_video: false,
      language: 'en-US',
      sort_by: 'popularity.desc',
      page: 1,
    },
  });
  return res.data.results;
};
