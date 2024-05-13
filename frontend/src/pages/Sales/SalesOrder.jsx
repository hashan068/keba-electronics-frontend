import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from "../../api";

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
    {
      field: 'id',
      headerName: 'Order ID',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'customer_name',
      headerName: 'Customer',
      width: 200,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'total_amount',
      headerName: 'Total Amount',
      type: 'number',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'created_at_date',
      headerName: 'Date',
      type: 'date',
      width: 150,
      valueFormatter: (params) => params.value && new Date(params.value).toLocaleDateString(),
      headerClassName: 'super-app-theme--header'
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '95%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "28px" }}>
          Sales Orders
        </Typography>
        <Button variant="contained" sx={{ margin: 2 }} onClick={handleAddSalesOrder}>
          Add Sales Order
        </Button>
        <Box sx={{ height: 600, width: '100%', '& .super-app-theme--header': { backgroundColor: '#cfd8dc' } }}>
          <DataGrid
            rows={salesOrders}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[10]}
            onRowClick={handleRowClick}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': { color: 'primary.main' },
              ".MuiDataGrid-iconButtonContainer": { marginLeft: '50px !important' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}