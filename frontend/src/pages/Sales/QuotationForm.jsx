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
  TextField,
  Grid,
  Container,
  Alert,
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import { useFormik, FormikProvider, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
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
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
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

  const validationSchema = Yup.object({
    customer: Yup.object().nullable().required('Please select a customer.'),
    date: Yup.string().required('Please enter a date.'),
    expirationDate: Yup.string().required('Please enter an expiration date.'),
    invoicingAndShippingAddress: Yup.string().required('Please enter an invoicing and shipping address.'),
    quotationItems: Yup.array()
      .of(
        Yup.object().shape({
          product: Yup.object().nullable().required('Please select a product.'),
          quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Please enter a quantity.'),
        })
      )
      .min(1, 'Please add at least one item to the quotation.')
  });

  const formik = useFormik({
    initialValues: {
      customer: null,
      date: '',
      expirationDate: '',
      invoicingAndShippingAddress: '',
      quotationItems: [],
      newProduct: null,
      newQuantity: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const userId = localStorage.getItem('user_id');
      const quotationData = {
        date: values.date,
        expiration_date: values.expirationDate,
        invoicing_and_shipping_address: values.invoicingAndShippingAddress,
        customer: values.customer.id,
        quotation_items: values.quotationItems.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
        created_by: userId,
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/api/sales/quotations/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quotationData),
        });

        const responseData = await response.json();

        if (response.ok) {
          setAlert({ severity: 'success', message: 'Quotation Created Successfully!' });
          formik.resetForm();
          setTimeout(() => setAlert(null), 3000);
        } else {
          setAlert({ severity: 'error', message: `Error creating quotation: ${responseData.error || 'Unknown error'}` });
        }
      } catch (error) {
        console.error('Error creating quotation:', error);
        setAlert({ severity: 'error', message: 'An error occurred while creating the quotation. Please try again later.' });
      }
    },
  });

  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Quotation Form
      </Typography>
      <div>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </div>
      <FormikProvider value={formik}>
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={customers}
                value={formik.values.customer}
                onChange={(event, newValue) => formik.setFieldValue('customer', newValue)}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer"
                    error={Boolean(formik.touched.customer && formik.errors.customer)}
                    helperText={formik.touched.customer && formik.errors.customer}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.date}
                onChange={formik.handleChange('date')}
                error={Boolean(formik.touched.date && formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                label="Expiration Date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.expirationDate}
                onChange={formik.handleChange('expirationDate')}
                error={Boolean(formik.touched.expirationDate && formik.errors.expirationDate)}
                helperText={formik.touched.expirationDate && formik.errors.expirationDate}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Invoicing and Shipping Address"
                value={formik.values.invoicingAndShippingAddress}
                onChange={formik.handleChange('invoicingAndShippingAddress')}
                error={Boolean(formik.touched.invoicingAndShippingAddress && formik.errors.invoicingAndShippingAddress)}
                helperText={formik.touched.invoicingAndShippingAddress && formik.errors.invoicingAndShippingAddress}
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
                <FieldArray name="quotationItems">
                  {({ push, remove }) => (
                    <>
                      {formik.values.quotationItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.product?.name}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{item.product?.price}</TableCell>
                          <TableCell align="right">{item.quantity * item.product?.price}</TableCell>
                          <TableCell align="right">
                            <Button variant="contained" color="error" onClick={() => remove(index)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>
                          <Autocomplete
                            options={products}
                            value={formik.values.newProduct}
                            onChange={(event, newValue) => formik.setFieldValue('newProduct', newValue)}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                              <li {...props} key={option.id}>
                                {option.name}
                              </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="Product" margin="normal" />}
                            sx={{ width: '50%' }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            type="number"
                            value={formik.values.newQuantity}
                            onChange={formik.handleChange('newQuantity')}
                            label="Quantity"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            onClick={() => {
                              formik.setFieldValue('quotationItems', [
                                ...formik.values.quotationItems,
                                {
                                  product: formik.values.newProduct,
                                  quantity: formik.values.newQuantity,
                                },
                              ]);
                              formik.setFieldValue('newProduct', null);
                              formik.setFieldValue('newQuantity', '');
                            }}
                            fullWidth
                          >
                            Add Item
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </FieldArray>
              </TableBody>
            </Table>
          </StyledTableContainer>

          <StyledButton type="submit" variant="contained" color="primary">
            Submit Quotation
          </StyledButton>
        </Form>
      </FormikProvider>
    </StyledContainer>
  );
};

export default QuotationForm;
