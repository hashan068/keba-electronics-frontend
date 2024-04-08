import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';

const SalesOrderForm = () => {
  const [customer, setCustomer] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [salesOrderItems, setSalesOrderItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customersResponse = await fetch('http://127.0.0.1:8000/api/sales/customers/');
      const customersData = await customersResponse.json();
      setCustomers(customersData);

      const productsResponse = await fetch('http://127.0.0.1:8000/api/sales/products/');
      const productsData = await productsResponse.json();
      setProducts(productsData);
    };

    fetchData();
  }, []);

  const handleAddItem = () => {
    if (product && quantity > 0) {
      const newItem = {
        product: product.name,
        quantity,
        price: product.price,
      };

      setSalesOrderItems([...salesOrderItems, newItem]);
      setQuantity(1);
      setProduct(null);
    }
  };
  const validateForm = () => {
    if (!customer) {
      alert('Please select a customer.');
      return false;
    }
  
    if (salesOrderItems.length === 0) {
      alert('Please add at least one item to the order.');
      return false;
    }
  
    return true;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    // Prepare the sales order data to be sent to the API
    const salesOrderData = {
      customer: customer.id,
      items: salesOrderItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  
    try {
      // Send the data to the server-side API
      const response = await fetch('http://127.0.0.1:8000/api/sales/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salesOrderData),
      });
  
      if (response.ok) {
        // If the API returns a successful response, reset the form or perform other actions
        alert('Sales order created successfully!');
        setCustomer(null);
        setSalesOrderItems([]);
      } else {
        // Handle any errors returned by the API
        const errorData = await response.json();
        alert(`Error creating sales order: ${errorData.message}`);
      }
    } catch (error) {
      // Handle any network or fetch errors
      console.error('Error creating sales order:', error);
      alert('An error occurred while creating the sales order. Please try again later.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sales Order Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          options={customers}
          value={customer}
          onChange={(event, newValue) => setCustomer(newValue)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Customer" fullWidth margin="normal" />}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesOrderItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.product}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.quantity * item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, }}>
          <Autocomplete
            options={products}
            value={product}
            onChange={(event, newValue) => setProduct(newValue)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Product" margin="normal" />}
            sx={{ width: '50%' }}
          />
          <TextField
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            label="Quantity"
            margin="normal"
            sx={{ ml: 2, mr: 2, width: '300px' }}
          />
          <Button variant="contained" onClick={handleAddItem}>
            Add Item
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit Order
        </Button>
      </form>
    </Box>
  );
};

export default SalesOrderForm;
