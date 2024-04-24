// components/Layout.jsx
import React from 'react';
import { Box } from '@mui/material';
import PermanentDrawerLeft from './PermanentDrawerLeft';
import ResponsiveAppBar from './AppBar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <ResponsiveAppBar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;