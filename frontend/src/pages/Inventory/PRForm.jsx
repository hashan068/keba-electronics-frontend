import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  ThemeProvider,
  createTheme,
  Stack
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const PRForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    componentId: '',
    quantity: 0,
    status: '',
    notes: '',
  });

  const [submitAction, setSubmitAction] = useState('close');

  useEffect(() => {
    if (id) {
      api
        .get(`/api/inventory/purchase-requisitions/${id}/`)
        .then((response) => {
          const {
            component_id,
            quantity,
            status,
            notes,
          } = response.data;
          setInitialValues({
            componentId: component_id,
            quantity,
            status,
            notes,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const validationSchema = Yup.object({
    componentId: Yup.string().required('Component is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be a positive number'),
    status: Yup.string().required('Status is required'),
    notes: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      setSubmitting(true);

      const data = {
        component_id: values.componentId,
        quantity: parseInt(values.quantity, 10),
        status: values.status,
        notes: values.notes,
      };

      let response;
      if (id) {
        response = await api.put(`/api/inventory/purchase-requisitions/${id}/`, data);
      } else {
        response = await api.post('/api/inventory/purchase-requisitions/', data);
      }

      const { id: newId } = response.data;

      if (submitAction === 'close') {
        navigate(`/inventory/purchase-requisitions/${newId}`);
      } else {
        resetForm();
        setInitialValues({
          componentId: '',
          quantity: 0,
          status: '',
          notes: '',
        });
      }

      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setFieldError('general', 'Failed to create purchase requisition.');
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Purchase Requisition' : 'Create Purchase Requisition'}
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
                  <TextField
                    label="Component ID"
                    value={values.componentId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.componentId && Boolean(errors.componentId)}
                    helperText={touched.componentId && errors.componentId}
                    fullWidth
                    required
                    name="componentId"
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
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.status && Boolean(errors.status)}
                      name="status"
                    >
                      <MenuItem value="created">Created</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                      <MenuItem value="partially_fulfilled">Partially Fulfilled</MenuItem>
                      <MenuItem value="fulfilled">Fulfilled</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
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
              </Grid>
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(-1)}
                  sx={{ flexGrow: 1 }}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={() => {
                    setSubmitAction('close');
                    handleSubmit();
                  }}
                  sx={{ flexGrow: 2 }}
                >
                  {id ? 'Update and Close' : 'Create and Close'}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={() => {
                    setSubmitAction('addNew');
                    handleSubmit();
                  }}
                  sx={{ flexGrow: 2 }}
                >
                  {id ? 'Update and Add New' : 'Create and Add New'}
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </ThemeProvider>
  );
};

export default PRForm;