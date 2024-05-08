import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import api from '../api';

const SalesOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesOrder, setSalesOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [salesOrderItems, setSalesOrderItems] = useState([]);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const { data } = await api.get(`/api/sales/orders/${id}/`);
          setSalesOrder(data);
          setSalesOrderItems(data.order_items);
          console.log(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSalesOrder();
  }, [id]);

  const createManufacturingOrder = async (salesOrderItemId) => {
    const salesOrderItem = salesOrderItems.find(item => item.id === salesOrderItemId);
    if (!salesOrderItem) return;

    const manufacturingOrderData = {
      sales_order_item: salesOrderItem.id,
      quantity: salesOrderItem.quantity,
      product: salesOrderItem.product,
    };

    console.log(manufacturingOrderData);
    try {
      const response = await api.post('/api/manufacturing/manufacturing-orders/', manufacturingOrderData);
      console.log(response.data);
      // Handle successful creation of manufacturing order
    } catch (error) {
      console.error(error);
      // Handle error in creating manufacturing order
    }
  };

  const handleEdit = () => {
    navigate(`/salesorder/${id}`);
  };

  const handleManufacture = () => {
    salesOrderItems.forEach((item) => {
      createManufacturingOrder(item.id);
    });
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="contained" color="primary" onClick={handleManufacture}>
          Manufacture
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" gutterBottom>
          Order ID: {salesOrder.id}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Customer: {salesOrder.customer_name}
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
            {salesOrderItems.map((item) => (
              <TableRow key={item.product}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{(item.quantity * parseFloat(item.price)).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesOrderDetails;