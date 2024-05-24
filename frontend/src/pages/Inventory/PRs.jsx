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

export default function PRs() {
  const [purchaseRequisitions, setPurchaseRequisitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filteredPurchaseRequisitions, setFilteredPurchaseRequisitions] = useState([]);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getPurchaseRequisitions = () => {
    setLoading(true);
    api
      .get('/api/inventory/purchase-requisitions/')
      .then((res) => {
        setPurchaseRequisitions(res.data);
        setFilteredPurchaseRequisitions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPurchaseRequisitions();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/inventory/purchase-requisition/${params.row.id}`);
  };

  const handleAddPurchaseRequisition = () => {
    navigate('/inventory/purchase-requisition/new');
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const filteredData = purchaseRequisitions.filter((pr) =>
      Object.values(pr).some((field) =>
        field.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredPurchaseRequisitions(filteredData);
    setPage(1); // Reset to the first page whenever the search text changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'component_name', headerName: 'Component Name', width: 200 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 300 },
    { field: 'created_at', headerName: 'Created At', width: 200 },
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
            Purchase Requisitions
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
            onClick={handleAddPurchaseRequisition}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            Add Purchase Requisition
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
                  rows={filteredPurchaseRequisitions.slice((page - 1) * pageSize, page * pageSize)}
                  columns={columns}
                  pageSize={pageSize}
                  rowCount={filteredPurchaseRequisitions.length}
                  paginationMode="server"
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  sx={{
                    '& .MuiDataGrid-cell:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                    '& .MuiDataGrid-iconSeparator': {
                      display: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#fafafa',
                      borderBottom: '1px solid #e0e0e0',
                    },
                    '& .MuiDataGrid-footerContainer': {
                      borderTop: '1px solid #e0e0e0',
                    },
                    '& .MuiDataGrid-sortIcon': {
                      color: theme.palette.secondary.main,
                    },
                    '& .MuiTablePagination-root': {
                      color: theme.palette.secondary.main,
                    },
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
                    onChange={(e) => setPageSize(e.target.value)}
                    label="Rows per page"
                  >
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                  </Select>
                </FormControl>
                <Pagination
                  count={Math.ceil(filteredPurchaseRequisitions.length / pageSize)}
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