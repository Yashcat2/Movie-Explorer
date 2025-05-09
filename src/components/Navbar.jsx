import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button,
  TextField, IconButton, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = (
    <>
      <Button component={Link} to="/movies" color="inherit">
        Movies
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
        {/* Left Side: Logo */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            MovieExplorer
          </Link>
        </Typography>

        {/* Center: Search Bar (show on all screens) */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            gap: 1,
          }}
        >
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

        {/* Right Side: Links or Menu */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
          {navLinks}
        </Box>

        {/* Hamburger Menu for Mobile */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          color="inherit"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for Mobile Navigation */}
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
                sx={{ backgroundColor: 'white', borderRadius: 1, width: '100%' }}
              />
              <IconButton color="inherit">
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
