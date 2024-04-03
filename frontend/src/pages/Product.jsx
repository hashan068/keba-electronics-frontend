import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PermanentDrawerLeft from '../components/PermanentDrawerLeft';
import api from "../api";

export default function Product() {
  const [products, setProducts] = useState([]);

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

  return(
    <Box sx={{ flexGrow: 1 }}>
      <PermanentDrawerLeft />

      <Box component="main" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '70%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "55px" }}>
          Products
        </Typography>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">

            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

      </Box>
    </Box>
  )
};
