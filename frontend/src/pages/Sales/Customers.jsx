import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Container,
  CircularProgress,
  Toolbar,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../api';
import pageAppbarStyles from '../../styles/pageAppbarStyles';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const navigate = useNavigate();

  const getCustomers = () => {
    setLoading(true);
    api
      .get('/api/sales/customers/')
      .then((res) => {
        setCustomers(res.data);
        setFilteredCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/sales/customer/${params.row.id}`);
  };

  const handleAddCustomer = () => {
    navigate('/sales/customer/new');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const filteredData = customers.filter((customer) =>
      Object.values(customer).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredCustomers(filteredData);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'street_address', headerName: 'Street Address', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
  ];

  return (
    <Container maxWidth="lg" sx={pageAppbarStyles.container}>
      <Paper sx={pageAppbarStyles.paper}>
        <Toolbar sx={pageAppbarStyles.toolbar}>
          <Typography variant="h6">
            Customers
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon position="start" />,
            }}
            sx={pageAppbarStyles.textField}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCustomer}
            startIcon={<AddIcon />}
          >
            Add Customer
          </Button>
        </Toolbar>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Paper sx={{ p: 2, height: 500 }}>
              <DataGrid
                rows={filteredCustomers}
                columns={columns}
                onRowClick={handleRowClick}
                sx={pageAppbarStyles.dataGrid}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}