import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from "../api";

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

  const handleRowClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddProduct = () => {
    navigate(`/product/new`);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="main" sx={{justifyContent: 'center', alignItems: 'center', height: '100%', width: '85%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "55px" }}>
          Manufacturing Orders
        </Typography>

        {/* <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button> */}


      </Box>
    </Box>
  );
}

