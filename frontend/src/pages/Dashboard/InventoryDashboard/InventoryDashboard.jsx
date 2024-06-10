import React from 'react';
import { Typography, Grid, Container,Box } from '@mui/material';

import InventoryStatistics from './InventoryStatistics';
import RecentTransactions from './RecentTransactions';
import InventoryLevels from './InventoryLevels';


export default function Inventoryhboard() {
  return (
    <Box
      sx={{
        backgroundColor: '#eceff1',
        py: 1,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 1 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Inventory Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InventoryStatistics />
          </Grid>
          <Grid item xs={12} >
            <InventoryLevels />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} md={6}>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
