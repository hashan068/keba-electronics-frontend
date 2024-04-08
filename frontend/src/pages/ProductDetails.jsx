import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import api from '../api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
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
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Product Details' : 'New Product'}
      </Typography>
      <TextField
        label="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={product.description}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleSave}>
        {id ? 'Update' : 'Create'}
      </Button>
    </Box>
  );
};

export default ProductDetails;
