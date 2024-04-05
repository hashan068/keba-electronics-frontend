import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const LoginLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'primary.main',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '400px',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default LoginLayout;