import React from 'react';
import { Typography, Grid, Container } from '@mui/material';
import SalesChart from './../SalesChart';
import TopSellingProducts from './../TopSellingProducts';
import TopCustomers from './../TopCustomers';
import InventoryStatistics from './InventoryStatistics';
import RecentTransactions from './RecentTransactions';


export default function Inventoryhboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Inventory Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InventoryStatistics />
        </Grid>
        <Grid item xs={12} >
          <SalesChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentTransactions />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopCustomers />
        </Grid>
      </Grid>
    </Container>
  );
}
