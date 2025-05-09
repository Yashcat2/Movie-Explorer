import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Container, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'login') {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('isLoggedIn', true);
        alert('Login successful');
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      localStorage.setItem('user', JSON.stringify({ email, password }));
      alert('Signup successful. You can now log in.');
      setMode('login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          {mode === 'signup' && (
            <TextField
              fullWidth
              label="Confirm Password"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <Button variant="text" onClick={() => setMode('signup')}>Sign Up</Button>
              </>
            ) : (
              <>
                Already a member?{' '}
                <Button variant="text" onClick={() => setMode('login')}>Login</Button>
              </>
            )}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginSignup;
