import React, { useState, useEffect } from'react';
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
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../api';
import pageAppbarStyles from '../../styles/pageAppbarStyles';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterBy, setFilterBy] = useState('all');
  const [inverterType, setInverterType] = useState('');
  const [powerRating, setPowerRating] = useState('');
  const [frequency, setFrequency] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [surgePower, setSurgePower] = useState('');
  const [warrantyYears, setWarrantyYears] = useState('');
  const [inputVoltage, setInputVoltage] = useState('');
  const [outputVoltage, setOutputVoltage] = useState('');
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

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
    let filteredData = products;

    switch (event.target.value) {
      case 'inverterType':
        filteredData = filteredData.filter((product) => product.inverter_type === inverterType);
        break;
      case 'powerRating':
        filteredData = filteredData.filter((product) => product.power_rating === parseInt(powerRating, 10));
        break;
      case 'frequency':
        filteredData = filteredData.filter((product) => product.frequency === frequency);
        break;
      case 'efficiency':
        filteredData = filteredData.filter((product) => product.efficiency === efficiency);
        break;
      case'surgePower':
        filteredData = filteredData.filter((product) => product.surge_power === parseInt(surgePower, 10));
        break;
      case 'warrantyYears':
        filteredData = filteredData.filter((product) => product.warranty_years === parseInt(warrantyYears, 10));
        break;
      case 'inputVoltage':
        filteredData = filteredData.filter((product) => product.input_voltage === inputVoltage);
        break;
      case 'outputVoltage':
        filteredData = filteredData.filter((product) => product.output_voltage === outputVoltage);
        break;
      default:
        filteredData = products;
    }

    setFilteredProducts(filteredData);
  };

  const columns = [
    { field: 'product_name', headerName: 'Product Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'price', headerName: 'Price', type: 'number', width: 150 },
    { field: 'bom', headerName: 'BOM', width: 150 },
    { field: 'inverter_type', headerName: 'Inverter Type', width: 150 },
    { field: 'power_rating', headerName: 'Power Rating', type: 'number', width: 150 },
    { field: 'frequency', headerName: 'Frequency', width: 150 },
    { field: 'efficiency', headerName: 'Efficiency', width: 150 },
    { field:'surge_power', headerName: 'Surge Power', type: 'number', width: 150 },
    { field: 'warranty_years', headerName: 'Warranty Years', type: 'number', width: 150 },
    { field: 'input_voltage', headerName: 'Input Voltage', width: 150 },
    { field: 'output_voltage', headerName: 'Output Voltage', width: 150 },
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
          <Select
            value={filterBy}
            onChange={handleFilterChange}
            sx={{ mr: 2 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="inverterType">Inverter Type</MenuItem>
            <MenuItem value="powerRating">Power Rating</MenuItem>
            <MenuItem value="frequency">Frequency</MenuItem>
            <MenuItem value="efficiency">Efficiency</MenuItem>
            <MenuItem value="surgePower">Surge Power</MenuItem>
            <MenuItem value="warrantyYears">Warranty Years</MenuItem>
            <MenuItem value="inputVoltage">Input Voltage</MenuItem>
            <MenuItem value="outputVoltage">Output Voltage</MenuItem>
          </Select>
          {filterBy === 'inverterType' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Inverter Type"
              value={inverterType}
              onChange={(event) => setInverterType(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
          {filterBy === 'powerRating' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Power Rating"
              value={powerRating}
              onChange={(event) => setPowerRating(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
          {filterBy === 'frequency' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Frequency"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
          {filterBy === 'efficiency' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Efficiency"
              value={efficiency}
              onChange={(event) => setEfficiency(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
          {filterBy ==='surgePower' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Surge Power"
              value={surgePower}
              onChange={(event) => setSurgePower(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
          {filterBy === 'warrantyYears' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Warranty Years"
              value={warrantyYears}
              onChange={(event) => setWarrantyYears(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
          {filterBy === 'inputVoltage' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Input Voltage"
              value={inputVoltage}
              onChange={(event) => setInputVoltage(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
          {filterBy === 'outputVoltage' && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Output Voltage"
              value={outputVoltage}
              onChange={(event) => setOutputVoltage(event.target.value)}
              sx={{ mr: 2 }}
            />
          )}
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
          {loading? (
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