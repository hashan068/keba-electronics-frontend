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
import Alert from '@mui/material/Alert';
import { Autocomplete, TextField } from '@mui/material';

const QuotationForm = () => {
  const [customer, setCustomer] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quotationItems, setQuotationItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [unitPrice, setUnitPrice] = useState(0);
  const [date, setDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [invoicingAndShippingAddress, setInvoicingAndShippingAddress] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await fetch('http://127.0.0.1:8000/api/sales/customers/');
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        const productsResponse = await fetch('http://127.0.0.1:8000/api/sales/products/');
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = () => {
    if (product && quantity > 0) {
      const newItem = {
        product,
        quantity,
        price: product.price,
        unitPrice,
      };

      setQuotationItems([...quotationItems, newItem]);
      setQuantity(1);
      setProduct(null);
      setUnitPrice(0);
    }
  };

  const validateForm = () => {
    if (!customer) {
      setAlert({ severity: 'error', message: 'Please select a customer.' });
      return false;
    }
  
    if (quotationItems.length === 0) {
      setAlert({ severity: 'error', message: 'Please add at least one item to the quotation.' });
      return false;
    }
  
    if (!date) {
      setAlert({ severity: 'error', message: 'Please enter a date.' });
      return false;
    }
  
    if (!expirationDate) {
      setAlert({ severity: 'error', message: 'Please enter an expiration date.' });
      return false;
    }
  
    if (!invoicingAndShippingAddress) {
      setAlert({ severity: 'error', message: 'Please enter an invoicing and shipping address.' });
      return false;
    }
  
    return true;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const quotationData = {
      date,
      expiration_date: expirationDate,
      invoicing_and_shipping_address: invoicingAndShippingAddress,
      customer: customer.id,
      quotation_items: quotationItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        price: item.price,
        unit_price: item.unitPrice,
      })),
    };

    console.log('Quotation data being sent:', quotationData);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/sales/quotations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quotationData),
      });

      const responseData = await response.json();

      console.log('Quotation data received:', responseData);

      if (response.ok) {
        setAlert({ severity: 'success', message: 'This is a success Alert.' });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        setCustomer(null);
        setQuotationItems([]);
      } else {
        setAlert({ severity: 'error', message: `Error creating quotation: ${responseData.error || 'Unknown error'}` });
      }
    } catch (error) {
      console.error('Error creating quotation:', error);
      setAlert({ severity: 'error', message: 'An error occurred while creating the quotation. Please try again later.' });
    }
  };

  const handleDeleteItem = (index) => {
    const updatedQuotationItems = [...quotationItems];
    updatedQuotationItems.splice(index, 1);
    setQuotationItems(updatedQuotationItems);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quotation Form
      </Typography>
      <div>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          options={customers}
          value={customer}
          onChange={(event, newValue) => setCustomer(newValue)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Customer" fullWidth margin="normal" />}
        />
        <TextField
          type="date"
          label="Date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          type="date"
          label="Expiration Date"
          value={expirationDate}
          onChange={(event) => setExpirationDate(event.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Invoicing and Shipping Address"
          value={invoicingAndShippingAddress}
          onChange={(event) => setInvoicingAndShippingAddress(event.target.value)}
          fullWidth
          margin="normal"
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotationItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.unitPrice}</TableCell>
                  <TableCell align="right">{item.quantity * item.price}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="error" onClick={() => handleDeleteItem(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Autocomplete
            options={products}
            value={product}
            onChange={(event, newValue) => setProduct(newValue)}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
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
          <TextField
          type="number"
          value={unitPrice}
          onChange={(event) => setUnitPrice(event.target.value)}
          label="Unit Price"
          margin="normal"
          sx={{ ml: 2, mr: 2, width: '300px' }}
          />
          <Button variant="contained" onClick={handleAddItem}>
            Add Item
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit Quotation
        </Button>
      </form>

    </Box>
  );
};

export default QuotationForm;
