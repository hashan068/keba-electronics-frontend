import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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

  const handleRowClick = (params) => {
    navigate(`/salesorder/${params.row.id}`);
  };

  const handleAddSalesOrder = () => {
    navigate(`/salesorder/new`);
  };

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'customer_name', headerName: 'Customer', width: 200 },
    { field: 'total_amount', headerName: 'Total Amount', type: 'number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '85%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "28px" }}>
          Sales Orders
        </Typography>
        <Button variant="contained" sx={{ margin: 2 }} onClick={handleAddSalesOrder}>
          Add Sales Order
        </Button>

        <div style={{ height: 400, width: '100%', margin: 20 }}>
          <DataGrid
            rows={salesOrders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={handleRowClick}
          />
        </div>
      </Box>
    </Box>
  );
}