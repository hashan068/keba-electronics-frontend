import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

const CustomerForm = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Simulate sending data to the server
      const response = await fetch('/api/sales/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
        }),
      });

      if (response.ok) {
        setAlert({ severity: 'success', message: 'Customer created successfully.' });
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        history.push('/customers'); // Redirect to customer list
      } else {
        setAlert({ severity: 'error', message: 'Error creating customer.' });
      }
    } catch (error) {
      setAlert({ severity: 'error', message: 'An error occurred while creating the customer.' });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Form
      </Typography>
      <div>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CustomerForm;