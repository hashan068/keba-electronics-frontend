// src/components/StatisticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import api from '../../api';

const StatisticsDashboard = () => {
  const [data, setData] = useState([
    { label: 'Quotations', value: 150, icon: <ReceiptIcon />, color: '#4caf50', percentage: '10%' },
    { label: 'Pending Sales Orders', value: 0, icon: <ShoppingCartIcon />, color: '#ff9800', percentage: '-5%' },
    { label: 'Customers', value: 0, icon: <PeopleIcon />, color: '#2196f3', percentage: '0%' },
    { label: 'Products', value: 557, icon: <InventoryIcon />, color: '#9c27b0', percentage: '25%' },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = api.get('/api/sales/customers/');
    const fetchOrders = api.get('/api/sales/orders/');

    Promise.all([fetchCustomers, fetchOrders])
      .then(([customersResponse, ordersResponse]) => {
        const customers = customersResponse.data.length;
        const pendingOrders = ordersResponse.data.filter(order => order.status === 'pending').length;

        setData(prevData => prevData.map(item => {
          if (item.label === 'Customers') return { ...item, value: customers };
          if (item.label === 'Pending Sales Orders') return { ...item, value: pendingOrders };
          return item;
        }));
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: '20px' }}>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: item.color }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Box sx={{ marginRight: '10px' }}>{item.icon}</Box>
                <Typography variant="h4">{item.value}</Typography>
              </Box>
              <Typography variant="subtitle1">{item.label}</Typography>
              <Typography variant="subtitle2" sx={{ marginTop: '10px', color: item.percentage.includes('-') ? 'red' : 'green' }}>
                {item.percentage} from last month
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsDashboard;