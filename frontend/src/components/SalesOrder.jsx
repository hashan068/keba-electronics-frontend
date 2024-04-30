// components/SalesOrder.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const SalesOrderView = () => {
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sales/orders/');
        const data = await response.json();
        setSalesOrders(data);
      } catch (error) {
        console.error('Error fetching sales orders:', error);
      }
    };

    fetchSalesOrders();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sales Orders
      </Typography>
      <Grid container spacing={2}>
        {salesOrders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Customer: {order.customer}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right">Total:</TableCell>
                    <TableCell align="right">{order.total_amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant="body1">Status: {order.status}</Typography>
              <Typography variant="body1">Created at: {order.created_at}</Typography>
              <Typography variant="body1">Updated at: {order.updated_at}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SalesOrderView;