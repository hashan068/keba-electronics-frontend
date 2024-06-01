import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  ThemeProvider,
  createTheme,
  Stack,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@mui/material';
import api from '../../api';

const theme = createTheme({
  palette: {
    primary: { main: '#6200ea' },
    secondary: { main: '#03dac6' },
  },
  typography: { h4: { fontWeight: 600 } },
  components: {
    MuiTextField: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
  },
});

const POForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    purchase_requisition: null,
    component: null,
    quantity: '',
    notes: '',
    priority: 'high',
    purchase_manager_approval: false,
    status: 'draft',
    supplier: null,
  });

  const [components, setComponents] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseRequisitions, setPurchaseRequisitions] = useState([]);
  const [submitAction, setSubmitAction] = useState('close');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const componentResponse = await api.get('/api/inventory/components/');
        setComponents(componentResponse.data);
        const supplierResponse = await api.get('/api/inventory/suppliers/');
        setSuppliers(supplierResponse.data);
        const requisitionResponse = await api.get('/api/inventory/purchase-requisitions/');
        setPurchaseRequisitions(requisitionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if (id) {
      api.get(`/api/inventory/purchase-orders/${id}/`).then((response) => {
        const {
          purchase_requisition,
          quantity,
          notes,
          priority,
          purchase_manager_approval,
          status,
          supplier,
        } = response.data;
        setInitialValues({
          purchase_requisition,
          component: purchase_requisition.component,
          quantity,
          notes,
          priority,
          purchase_manager_approval,
          status,
          supplier,
        });
      }).catch((error) => console.error(error));
    }
  }, [id]);

  const handleRequisitionChange = async (requisition) => {
    if (requisition) {
      const { component, quantity, notes, priority, supplier } = requisition;
      setInitialValues((prevValues) => ({
        ...prevValues,
        purchase_requisition: requisition,
        component,
        quantity,
        notes,
        priority,
        supplier,
      }));
    }
  };

  const validationSchema = Yup.object({
    purchase_requisition: Yup.object().required('Purchase requisition is required'),
    component: Yup.object().required('Component is required'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
    notes: Yup.string(),
    priority: Yup.string().required('Priority is required'),
    status: Yup.string().required('Status is required'),
    supplier: Yup.object().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      setSubmitting(true);

      const data = {
        purchase_requisition_id: values.purchase_requisition.id,
        component_id: values.component.id,
        quantity: parseInt(values.quantity, 10),
        notes: values.notes,
        priority: values.priority,
        purchase_manager_approval: values.purchase_manager_approval,
        status: values.status,
        supplier_id: values.supplier ? values.supplier.id : null,
      };

      let response;
      if (id) {
        response = await api.put(`/api/inventory/purchase-orders/${id}/`, data);
      } else {
        response = await api.post('/api/inventory/purchase-orders/', data);
      }

      const { id: newId } = response.data;

      if (submitAction === 'close') {
        navigate(`/inventory/purchase-order/${newId}`);
      } else {
        resetForm();
        setInitialValues({
          purchase_requisition: null,
          component: null,
          quantity: '',
          notes: '',
          priority: 'high',
          purchase_manager_approval: false,
          status: 'draft',
          supplier: null,
        });
      }

      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setFieldError('general', 'Failed to submit purchase order.');
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Purchase Order' : 'Create Purchase Order'}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    options={purchaseRequisitions}
                    value={values.purchase_requisition}
                    onChange={(event, newValue) => handleRequisitionChange(newValue)}
                    getOptionLabel={(option) => option.id.toString()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Purchase Requisition"
                        error={touched.purchase_requisition && Boolean(errors.purchase_requisition)}
                        helperText={touched.purchase_requisition && errors.purchase_requisition}
                        required
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    options={components}
                    value={values.component}
                    onChange={(event, newValue) => handleChange({ target: { name: 'component', value: newValue } })}
                    getOptionLabel={(option) => option.name || ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Component"
                        error={touched.component && Boolean(errors.component)}
                        helperText={touched.component && errors.component}
                        required
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                    type="number"
                    fullWidth
                    required
                    name="quantity"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Notes"
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.notes && Boolean(errors.notes)}
                    helperText={touched.notes && errors.notes}
                    fullWidth
                    multiline
                    rows={4}
                    name="notes"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Priority"
                    value={values.priority}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.priority && Boolean(errors.priority)}
                    helperText={touched.priority && errors.priority}
                    select
                    fullWidth
                    required
                    name="priority"
                  >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.purchase_manager_approval}
                        onChange={handleChange}
                        name="purchase_manager_approval"
                      />
                    }
                    label="Purchase Manager Approval"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status && errors.status}
                    select
                    fullWidth
                    required
                    name="status"
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="open_order">Open Order</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="received">Received</MenuItem>
                    <MenuItem value="invoiced">Invoiced</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    options={suppliers}
                    value={values.supplier}
                    onChange={(event, newValue) => handleChange({ target: { name: 'supplier', value: newValue } })}
                    getOptionLabel={(option) => option.name || ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Supplier"
                        error={touched.supplier && Boolean(errors.supplier)}
                        helperText={touched.supplier && errors.supplier}
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                </Grid>
              </Grid>
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button variant="contained" color="secondary" onClick={() => navigate(-1)} sx={{ flexGrow: 1 }}>
                  Back
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={() => { setSubmitAction('close'); handleSubmit(); }}
                >
                  Save and Close
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={() => { setSubmitAction('new'); handleSubmit(); }}
                >
                  Save and New
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </ThemeProvider>
  );
};

export default POForm;
