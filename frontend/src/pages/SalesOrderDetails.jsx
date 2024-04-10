import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import api from '../api';

const SalesOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesOrder, setSalesOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await api.get(`/api/sales/orders/${id}/`);
          setSalesOrder(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSalesOrder();
  }, [id]);

  const handleEdit = () => {
    navigate(`/salesorder/${id}/edit`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!salesOrder) {
    return <div>Sales order not found.</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sales Order Details
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          Order ID: {salesOrder.id}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Customer: {salesOrder.customer.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total Amount: {salesOrder.total_amount}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Status: {salesOrder.status}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesOrder.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.quantity * item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default SalesOrderDetails;