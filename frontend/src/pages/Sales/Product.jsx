import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from "../../api";

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = () => {
    api
      .get("/api/sales/products/")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/product/${params.row.id}`);
  };

  const handleAddProduct = () => {
    navigate(`/product/new`);
  };

  const columns = [
    { field: 'name', headerName: 'Product Name', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'description', headerName: 'Description', width: 300, headerClassName: 'super-app-theme--header' },
    { field: 'price', headerName: 'Price', type: 'number', width: 150, headerClassName: 'super-app-theme--header' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '85%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "55px" }}>
          Products
        </Typography>
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
        <Box sx={{
          height: 600,
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#cfd8dc',
            // color: 'white',
            
          },
        }}>
          <DataGrid
            rows={products}
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