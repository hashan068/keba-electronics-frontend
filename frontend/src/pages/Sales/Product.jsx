// Product.jsx
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

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = () => {
    setLoading(true);
    api
      .get('/api/sales/products/')
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/sales/product/${params.row.id}`);
  };

  const handleAddProduct = () => {
    navigate('/sales/product/new');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const filteredData = products.filter((product) =>
      Object.values(product).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredProducts(filteredData);
  };

  const columns = [
    { field: 'product_name', headerName: 'Product Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'price', headerName: 'Price', type: 'number', width: 150 },
    { field: 'bom', headerName: 'BOM', width: 150 },
  ];

  return (
    <Container maxWidth="lg" sx={pageAppbarStyles.container}>
      <Paper sx={pageAppbarStyles.paper}>
        <Toolbar>
          <Typography variant="h6" sx={pageAppbarStyles.toolbar}>
            Products
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
            onClick={handleAddProduct}
            startIcon={<AddIcon />}
          >
            Add Product
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
                rows={filteredProducts}
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
