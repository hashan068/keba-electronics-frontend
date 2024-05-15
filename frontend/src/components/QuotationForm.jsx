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
  FormLabel,
  OutlinedInput,
  Grid,
  Container,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { Autocomplete, TextField } from '@mui/material';
import FormGrid from './forms/FormGrid';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  alignSelf: 'center',
  padding: theme.spacing(1.5, 4),
}));

const QuotationForm = () => {
  const [customer, setCustomer] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quotationItems, setQuotationItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
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
        setProducts(productsData.map(product => ({
          id: product.id,
          name: product.product_name,
          description: product.description,
          price: parseFloat(product.price),
          bom: product.bom
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = () => {
    if (product && quantity > 0 && product.price !== null) {
      const newItem = {
        product,
        quantity,
        price: product.price,
      };

      setQuotationItems([...quotationItems, newItem]);
      setQuantity(1);
      setProduct(null);
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
        unit_price: item.price,
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
        setAlert({ severity: 'success', message: 'Quotation Created Successfully!' });
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
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Quotation Form
      </Typography>
      <div>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </div>
      <StyledForm onSubmit={handleSubmit}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={customers}
              value={customer}
              onChange={(event, newValue) => setCustomer(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Customer" fullWidth />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormLabel>Date</FormLabel>
            <TextField
              type="date"

              value={date}
              onChange={(event) => setDate(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel>Expiration Date</FormLabel>
            <TextField
              type="date"

              value={expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>

            <TextField
              label="Invoicing and Shipping Address"
              value={invoicingAndShippingAddress}
              onChange={(event) => setInvoicingAndShippingAddress(event.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
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
        </StyledTableContainer>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              label="Quantity"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" onClick={handleAddItem} fullWidth>
              Add Item
            </Button>
          </Grid>
        </Grid>

        <StyledButton type="submit" variant="contained" color="primary">
          Submit Quotation
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );

}

export default QuotationForm;