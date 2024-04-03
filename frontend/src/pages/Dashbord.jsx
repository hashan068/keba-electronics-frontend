import React from 'react';
import { Box, Typography } from '@mui/material';
import PermanentDrawerLeft from '../components/PermanentDrawerLeft';


export default function Dashbord() {
  return(
    <Box sx={{ flexGrow: 1 }}>
      <PermanentDrawerLeft/>
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Typography variant='h3' align='center' sx={{ marginTop: '80px' }}> 
          Welcome to Dashbord
        </Typography>
      </Box>
    </Box>
  ) 
};



