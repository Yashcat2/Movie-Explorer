import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, TextField, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LoginSignup from '../pages/LoginSignup'; // adjust path if needed


const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {/* Left side - App Name and Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              MovieExplorer
            </Link>
          </Typography>
          <Button component={Link} to="/movies" color="inherit">
            Movies
          </Button>
          <Button component={Link} to="/favorites" color="inherit">
            Favorites
          </Button>
        </Box>

        {/* Center - Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search movies..."
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Right side - Login/Signup */}
        <Box sx={{ display: 'flex', gap: 1 }}>
<Button component={Link} to="/login" color="inherit" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
            Login</Button>
          {/* <Button >
            Sign Up
          </Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
