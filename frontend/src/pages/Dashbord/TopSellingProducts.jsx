import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../../api';

const TopSellingProducts = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const orderItemsResponse = await api.get('/api/sales/order-items/');
        const orderItems = orderItemsResponse.data;

        const productCounts = orderItems.reduce((counts, item) => {
          const { product, quantity } = item;
          if (counts[product]) {
            counts[product].quantity += quantity;
          } else {
            counts[product] = { ...item, quantity };
          }
          return counts;
        }, {});

        const sortedProducts = Object.values(productCounts).sort((a, b) => b.quantity - a.quantity);
        setTopProducts(sortedProducts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching top-selling products:', error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Top-Selling Products
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Total Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.product}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopSellingProducts;