import React, { useState, useEffect } from 'react';
import { Box, Typography, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from "../../api";

const ManufacturingOrder = () => {
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
    navigate(`/mfg/mfgorder/${params.row.id}`);
  };

  const handleAddManufacturingOrder = () => {
    navigate(`/mfg/manufacturingorder/new`);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'product_id',
      headerName: 'Product',
      width: 200,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
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
      field: 'created_at',
      headerName: 'Created At',
      type: 'date',
      width: 180,
      valueFormatter: (params) => params.value && new Date(params.value).toLocaleDateString(),
      headerClassName: 'super-app-theme--header'
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '95%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "28px" }}>
          Manufacturing Orders
        </Typography>

        <Box sx={{ height: 600, width: '100%', '& .super-app-theme--header': { backgroundColor: '#cfd8dc' } }}>
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
              '& .MuiDataGrid-cell:hover': { color: 'primary.main' },
              ".MuiDataGrid-iconButtonContainer": { marginLeft: '50px !important' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default ManufacturingOrder;