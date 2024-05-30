import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../../api';

const TopCustomers = () => {
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const ordersResponse = await api.get('/api/sales/orders/');
        const orders = ordersResponse.data;

        const customerCounts = orders.reduce((counts, order) => {
          const { customer, customer_name, total_amount } = order;
          if (counts[customer]) {
            counts[customer].total_amount += parseFloat(total_amount);
          } else {
            counts[customer] = { customer, customer_name, total_amount: parseFloat(total_amount) };
          }
          return counts;
        }, {});

        const sortedCustomers = Object.values(customerCounts).sort((a, b) => b.total_amount - a.total_amount);
        setTopCustomers(sortedCustomers.slice(0, 5));
      } catch (error) {
        console.error('Error fetching top customers:', error);
      }
    };

    fetchTopCustomers();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Top Customers
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell align="right">Total Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topCustomers.map((customer) => (
              <TableRow key={customer.customer}>
                <TableCell>{customer.customer_name}</TableCell>
                <TableCell align="right">{customer.total_amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopCustomers;