import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button,
  TextField, IconButton, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      localStorage.setItem('lastSearch', searchTerm);
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchResults([]);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: API_KEY,
          query: value,
        },
      });
      setSearchResults(res.data.results.slice(0, 5));
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const navLinks = (
    <>
      <Button component={Link} to="/allmovies" color="inherit">
        Movies
      </Button>
      <Button component={Link} to="/movies" color="inherit">
        Trending
      </Button>
      <Button component={Link} to="/favorites" color="inherit">
        Favorites
      </Button>
      <Button
        component={Link}
        to="/login"
        color="inherit"
        variant="outlined"
        sx={{ color: 'white', borderColor: 'white' }}
      >
        Login
      </Button>
    </>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            MovieExplorer
          </Link>
        </Typography>

        <Box sx={{ position: 'relative', display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            sx={{ backgroundColor: 'white', borderRadius: 1, width: 550,position: 'center' }}
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>

          {searchResults.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: '100%',
                mt: 1,
                width: 250,
                backgroundColor: 'white',
                borderRadius: 1,
                boxShadow: 3,
                zIndex: 9999,
                maxHeight: 300,
                overflowY: 'auto'
              }}
            >
              {searchResults.map((movie) => (
                <Box
                  key={movie.id}
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                    setSearchResults([]);
                    setSearchTerm('');
                  }}
                  sx={{
                    padding: 1,
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                    color: 'black'
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {movie.title} {movie.release_date ? `(${new Date(movie.release_date).getFullYear()})` : ''}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          {navLinks}
        </Box>

        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          color="inherit"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleInputChange}
                sx={{ backgroundColor: 'white', borderRadius: 1, width: '100%' }}
              />
              <IconButton color="inherit" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>

            <List>
              <ListItem button component={Link} to="/movies">
                <ListItemText primary="Movies" />
              </ListItem>
              <ListItem button component={Link} to="/favorites">
                <ListItemText primary="Favorites" />
              </ListItem>
              <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
