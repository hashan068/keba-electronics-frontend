import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from "../../api";

export default function ManufacturingOrderList() {
  const [manufacturingOrders, setManufacturingOrders] = useState([]);
  const navigate = useNavigate();

  const getManufacturingOrders = () => {
    api
      .get("/api/manufacturing/manufacturing-orders/")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        setManufacturingOrders(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    getManufacturingOrders();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/manufacturingorder/${params.row.id}`);
  };

  const handleAddManufacturingOrder = () => {
    navigate(`/manufacturingorder/new`);
  };

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 150,
      valueFormatter: (params) => params.value && format(new Date(params.value), 'yyyy/MM/dd'),
      headerClassName: 'super-app-theme--header'
    },
    { field: 'id', headerName: 'Order ID', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'sales_order_id', headerName: 'Sales Order ID', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'product_id', headerName: 'Product ID', type: 'number', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'status', headerName: 'Status', width: 150, headerClassName: 'super-app-theme--header' },
  ];

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '95%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "28px" }}>
          Manufacturing Orders
        </Typography>

        <Box sx={{
          height: 600,
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#cfd8dc',
            // color: 'white',
            
          },
        }}>
          <DataGrid
            rows={manufacturingOrders}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[10]}
            onRowClick={handleRowClick}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
              ".MuiDataGrid-iconButtonContainer": {
                marginLeft: '50px !important'
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}