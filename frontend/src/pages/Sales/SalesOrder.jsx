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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Pagination,
} from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../api';

export default function SalesOrder() {
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filteredSalesOrders, setFilteredSalesOrders] = useState([]);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getSalesOrders = () => {
    setLoading(true);
    api
      .get('/api/sales/orders/')
      .then((res) => {
        setSalesOrders(res.data);
        setFilteredSalesOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSalesOrders();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/sales/salesorder/${params.row.id}`);
  };

  const handleAddSalesOrder = () => {
    navigate('/sales/salesorder/new');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const filteredData = salesOrders.filter((order) =>
      Object.values(order).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredSalesOrders(filteredData);
    setPage(1); // Reset to the first page whenever the search text changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'customer_name', headerName: 'Customer', width: 200 },
    { field: 'total_amount', headerName: 'Total Amount', type: 'number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'created_at_date', headerName: 'Date', type: 'date', width: 150, valueFormatter: (params) => params.value && new Date(params.value).toLocaleDateString() },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sales Orders
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
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSalesOrder}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Add Sales Order
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
            <>
              <Paper sx={{ p: 2, height: 500 }}>
                <DataGrid
                  rows={filteredSalesOrders.slice((page - 1) * pageSize, page * pageSize)}
                  columns={columns}
                  pageSize={pageSize}
                  rowCount={filteredSalesOrders.length}
                  paginationMode="server"
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  sx={{
                    '& .MuiDataGrid-cell:hover': { backgroundColor: '#f5f5f5' },
                    '& .MuiDataGrid-iconSeparator': { display: 'none' },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#fafafa',
                      borderBottom: '1px solid #e0e0e0',
                    },
                    '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #e0e0e0' },
                    '& .MuiDataGrid-sortIcon': { color: theme.palette.secondary.main },
                    '& .MuiTablePagination-root': { color: theme.palette.secondary.main },
                    '& .MuiPaginationItem-root.Mui-selected': {
                      backgroundColor: theme.palette.secondary.light,
                      color: '#fff',
                    },
                  }}
                />
              </Paper>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Rows per page</InputLabel>
                  <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    label="Rows per page"
                  >
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
                <Pagination
                  count={Math.ceil(filteredSalesOrders.length / pageSize)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
