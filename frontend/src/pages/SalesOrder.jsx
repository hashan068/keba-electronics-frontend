import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from "../api";

export default function SalesOrder() {
  const [salesOrders, setSalesOrders] = useState([]);
  const navigate = useNavigate();

  const getSalesOrders = () => {
    api
      .get("/api/sales/orders/")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        setSalesOrders(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    getSalesOrders();
  }, []);

  const handleRowClick = (salesOrderId) => {
    navigate(`/salesorder/${salesOrderId}`);
  };

  const handleAddSalesOrder = () => {
    navigate(`/salesorder/new`);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="main" sx={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '85%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "55px" }}>
          Sales Orders
        </Typography>
        <Button variant="contained" onClick={handleAddSalesOrder}>
          Add Sales Order
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesOrders.map((salesOrder) => (
                <TableRow key={salesOrder.id} onClick={() => handleRowClick(salesOrder.id)} style={{ cursor: 'pointer' }}>
                  <TableCell component="th" scope="row">
                    {salesOrder.id}
                  </TableCell>
                  <TableCell align="right">{salesOrder.customer.name}</TableCell>
                  <TableCell align="right">{salesOrder.total_amount}</TableCell>
                  <TableCell align="right">{salesOrder.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
