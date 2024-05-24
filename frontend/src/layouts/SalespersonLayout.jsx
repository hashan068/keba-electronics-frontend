// components/SalespersonLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import SalespersonDrawer from '../components/drawers/SalespersonDrawer';
import SalespersonAppBar from '../components/appbars/SalespersonAppBar';

const SalespersonLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SalespersonDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <SalespersonAppBar />
        {children}
      </Box>
    </Box>
  );
};

export default SalespersonLayout;