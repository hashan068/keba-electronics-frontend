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

const POForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    purchaseRequisitionId: '',
    supplierId: '',
    purchaseManagerApproval: false,
    status: '',
    notes: '',
  });

  const [submitAction, setSubmitAction] = useState('close');

  useEffect(() => {
    if (id) {
      api
        .get(`/api/inventory/purchase-orders/${id}/`)
        .then((response) => {
          const {
            purchase_requisition_id,
            supplier_id,
            purchase_manager_approval,
            status,
            notes,
          } = response.data;
          setInitialValues({
            purchaseRequisitionId: purchase_requisition_id,
            supplierId: supplier_id,
            purchaseManagerApproval: purchase_manager_approval,
            status,
            notes,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const validationSchema = Yup.object({
    purchaseRequisitionId: Yup.string().required('Purchase Requisition is required'),
    supplierId: Yup.string().required('Supplier is required'),
    purchaseManagerApproval: Yup.boolean().required('Manager Approval is required'),
    status: Yup.string().required('Status is required'),
    notes: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
    try {
      setSubmitting(true);

      const data = {
        purchase_requisition_id: values.purchaseRequisitionId,
        supplier_id: values.supplierId,
        purchase_manager_approval: values.purchaseManagerApproval,
        status: values.status,
        notes: values.notes,
      };

      let response;
      if (id) {
        response = await api.put(`/api/inventory/purchase-orders/${id}/`, data);
      } else {
        response = await api.post('/api/inventory/purchase-orders/', data);
      }

      const { id: newId } = response.data;

      if (submitAction === 'close') {
        navigate(`/inventory/purchase-orders/${newId}`);
      } else {
        resetForm();
        setInitialValues({
          purchaseRequisitionId: '',
          supplierId: '',
          purchaseManagerApproval: false,
          status: '',
          notes: '',
        });
      }

      setSubmitting(false);
    } catch (error) {
      console.error(error);
      setFieldError('general', 'Failed to create purchase order.');
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
                  <TextField
                    label="Purchase Requisition ID"
                    value={values.purchaseRequisitionId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.purchaseRequisitionId && Boolean(errors.purchaseRequisitionId)}
                    helperText={touched.purchaseRequisitionId && errors.purchaseRequisitionId}
                    fullWidth
                    required
                    name="purchaseRequisitionId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Supplier ID"
                    value={values.supplierId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.supplierId && Boolean(errors.supplierId)}
                    helperText={touched.supplierId && errors.supplierId}
                    fullWidth
                    required
                    name="supplierId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Purchase Manager Approval</InputLabel>
                    <Select
                      value={values.purchaseManagerApproval}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.purchaseManagerApproval && Boolean(errors.purchaseManagerApproval)}
                      name="purchaseManagerApproval"
                    >
                      <MenuItem value={true}>Approved</MenuItem>
                      <MenuItem value={false}>Not Approved</MenuItem>
                    </Select>
                  </FormControl>
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
                  sx={{ flexGrow: 22 }}
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
export default POForm;