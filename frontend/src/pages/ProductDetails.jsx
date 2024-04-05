import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import api from '../api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/sales/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/api/sales/products/${id}/`, product);
      navigate('/product');
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Details
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
      <Button variant="contained" onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  );
};

export default ProductDetails;
