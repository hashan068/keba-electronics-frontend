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
import { format } from 'date-fns';

export default function Quotations() {
 const [quotations, setQuotations] = useState([]);
 const [loading, setLoading] = useState(false);
 const [searchText, setSearchText] = useState('');
 const [filteredQuotations, setFilteredQuotations] = useState([]);
 const navigate = useNavigate();

 const getQuotations = () => {
   setLoading(true);
   api
     .get('/api/sales/quotations/')
     .then((res) => {
       setQuotations(res.data);
       setFilteredQuotations(res.data);
       setLoading(false);
     })
     .catch((err) => {
       console.error(err);
       setLoading(false);
     });
 };

 useEffect(() => {
   getQuotations();
 }, []);

 const handleRowClick = (params) => {
   navigate(`/sales/quotation/${params.row.id}`);
 };

 const handleAddQuotation = () => {
   navigate('/sales/quotations/new');
 };

 const handleSearchChange = (event) => {
   const value = event.target.value;
   setSearchText(value);
   const filteredData = quotations.filter((quotation) =>
     Object.values(quotation).some((field) =>
       field.toString().toLowerCase().includes(value.toLowerCase())
     )
   );
   setFilteredQuotations(filteredData);
 };

 const columns = [
   { field: 'id', headerName: 'ID', width: 100 },
   { field: 'quotation_number', headerName: 'Quotation Number', width: 150 },
   { field: 'customer_name', headerName: 'Customer', width: 200 },
   {
     field: 'date',
     headerName: 'Date',
     type: 'date',
     width: 150,
     valueFormatter: (params) => params.value && format(new Date(params.value), 'yyyy/MM/dd'),
   },
   {
     field: 'expiration_date',
     headerName: 'Expiration Date',
     type: 'date',
     width: 150,
     valueFormatter: (params) => params.value && format(new Date(params.value), 'yyyy/MM/dd'),
   },
   { field: 'total_amount', headerName: 'Total Amount', type: 'number', width: 150 },
   { field: 'status', headerName: 'Status', width: 150 },
 ];

 return (
   <Container maxWidth="lg" sx={{ py: 3 }}>
     <Paper sx={{ p: 3, mb: 3 }}>
       <Toolbar>
         <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Quotations
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
           onClick={handleAddQuotation}
           startIcon={<AddIcon />}
         >
           Add Quotation
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
               rows={filteredQuotations}
               columns={columns}
               onRowClick={handleRowClick}
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
               }}
             />
           </Paper>
         )}
       </Grid>
     </Grid>
   </Container>
 );
}