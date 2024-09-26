import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { navigate } from 'gatsby';


interface LoginProps {
    onLogin: () => void;
  }

  
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event:any) => {
    event.preventDefault();
    
    
        if (username === 'user' && password === 'password') {
            sessionStorage.setItem('isLoggedIn', 'true');
            navigate('/');  
            onLogin();
          } else {
            alert('Invalid username or password');
            sessionStorage.setItem('isLoggedIn', 'false');
          }
    
          
  };

  return (
    <Container component="main" maxWidth="xs"
        style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh', 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
    >
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Login</Typography>
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;