import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Container, Paper, Grid, CircularProgress } from '@mui/material';
import api from '../../api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ product_name: '', description: '', price: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await api.get(`/api/sales/products/${id}/`);
          setProduct(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) {
        await api.put(`/api/sales/products/${id}/`, product);
      } else {
        await api.post('/api/sales/products/', product);
      }
      navigate('/product');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          {id ? 'Product Details' : 'New Product'}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              value={product.product_name}
              onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" onClick={handleSave}>
              {id ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
