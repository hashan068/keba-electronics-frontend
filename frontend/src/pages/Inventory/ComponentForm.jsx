import React, { useState, useEffect } from'react';
import { useNavigate, useParams } from'react-router-dom';
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
} from '@mui/material';

const ComponentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    quantity: 0,
    reorderLevel: 0,
    unitOfMeasure: '',
    supplierId: '',
    cost: 0,
  });

  useEffect(() => {
    if (id) {
      api
       .get(`/api/inventory/components/${id}/`)
       .then((response) => {
          const {
            name,
            description,
            quantity,
            reorder_level,
            unit_of_measure,
            supplier_id,
            cost,
          } = response.data;
          setInitialValues({
            name,
            description,
            quantity,
            reorderLevel: reorder_level,
            unitOfMeasure: unit_of_measure,
            supplierId: supplier_id,
            cost,
          });
        })
       .catch((error) => console.error(error));
    }
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.number()
     .required('Quantity is required')
     .positive('Quantity must be a positive number'),
    reorderLevel: Yup.number()
     .required('Reorder Level is required')
     .positive('Reorder Level must be a positive number'),
    unitOfMeasure: Yup.string().required('Unit of Measure is required'),
    supplierId: Yup.string(),
    cost: Yup.number()
     .required('Cost is required')
     .positive('Cost must be a positive number'),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setSubmitting(true); // Set submitting state to true

      const data = {
        name: values.name,
        description: values.description,
        quantity: parseInt(values.quantity, 10),
        reorder_level: parseInt(values.reorderLevel, 10),
        unit_of_measure: values.unitOfMeasure,
        supplier_id: values.supplierId,
        cost: parseFloat(values.cost),
      };

      let response;
      if (id) {
        response = await api.put(`/api/inventory/components/${id}/`, data);
      } else {
        response = await api.post('/api/inventory/components/', data);
      }

      const { id: newId } = response.data;

      // Update the URL to include the new component ID
      navigate(`/components/${newId}`);

      // Clear the form fields only after successful creation
      setInitialValues({
        name: '',
        description: '',
        quantity: 0,
        reorderLevel: 0,
        unitOfMeasure: '',
        supplierId: '',
        cost: 0,
      });

      setSubmitting(false); // Set submitting state to false
    } catch (error) {
      console.error(error);
      setFieldError('general', 'Failed to create component.');
      setSubmitting(false); // Set submitting state to false
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {id? 'Edit Component' : 'Create Component'}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <form onSubmit={(e) => e.preventDefault()} /* Prevent default form submission */>
            <TextField
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              helperText={touched.name && errors.name}
              fullWidth
              margin="normal"
              required
              name="name"
            />
            <TextField
              label="Description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && errors.description}
              helperText={touched.description && errors.description}
              fullWidth
              margin="normal"
              required
              name="description"
            />
            <TextField
              label="Quantity"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.quantity && errors.quantity}
              helperText={touched.quantity && errors.quantity}
              type="number"
              fullWidth
              margin="normal"
              required
              name="quantity"
            />
            <TextField
              label="Reorder Level"
              value={values.reorderLevel}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.reorderLevel && errors.reorderLevel}
              helperText={touched.reorderLevel && errors.reorderLevel}
              type="number"
              fullWidth
              margin="normal"
              required
              name="reorderLevel"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Unit of Measure</InputLabel>
              <Select
                value={values.unitOfMeasure}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.unitOfMeasure && errors.unitOfMeasure}
                name="unitOfMeasure"
              >
                <MenuItem value="pcs">Pieces</MenuItem>
                <MenuItem value="kg">Kilograms</MenuItem>
                <MenuItem value="l">Liters</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Supplier ID"
              value={values.supplierId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.supplierId && errors.supplierId}
              helperText={touched.supplierId && errors.supplierId}
              fullWidth
              margin="normal"
              name="supplierId"
            />
            <TextField
              label="Cost"
              value={values.cost}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cost && errors.cost}
              helperText={touched.cost && errors.cost}
              type="number"
              fullWidth
              margin="normal"
              required
              name="cost"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {id? 'Update' : 'Create'}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ComponentForm;