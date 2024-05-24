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
import api from '../../../api';

const BOMs = () => {
 const [boms, setBoms] = useState([]);
 const [loading, setLoading] = useState(false);
 const [searchText, setSearchText] = useState('');
 const [filteredBOMs, setFilteredBOMs] = useState([]);
 const navigate = useNavigate();

 const fetchBOMs = async () => {
   try {
     setLoading(true);
     const response = await api.get('/api/manufacturing/bills-of-material/');
     setBoms(response.data);
     setFilteredBOMs(response.data);
     setLoading(false);
   } catch (error) {
     console.error('Error fetching BOMs:', error);
     setLoading(false);
   }
 };

 useEffect(() => {
   fetchBOMs();
 }, []);

 const handleRowClick = (params) => {
   navigate(`/mfg/bom/${params.row.id}`);
 };

 const handleAddBOM = () => {
   navigate('/mfg/bom/new');
 };

 const handleSearchChange = (event) => {
   const value = event.target.value;
   setSearchText(value);
   const filteredData = boms.filter((bom) =>
     Object.values(bom).some((field) =>
       field.toString().toLowerCase().includes(value.toLowerCase())
     )
   );
   setFilteredBOMs(filteredData);
 };

 const columns = [
   { field: 'id', headerName: 'BOM ID', width: 150 },
   { field: 'name', headerName: 'BOM Name', width: 200 },
   { field: 'product_name', headerName: 'Product', width: 200 },
   {
     field: 'created_at',
     headerName: 'Created At',
     type: 'date',
     width: 180,
     valueFormatter: (params) => params.value && new Date(params.value).toLocaleString(),
   },
   {
     field: 'updated_at',
     headerName: 'Updated At',
     type: 'date',
     width: 180,
     valueFormatter: (params) => params.value && new Date(params.value).toLocaleString(),
   },
 ];

 return (
   <Container maxWidth="lg" sx={{ py: 3 }}>
     <Paper sx={{ p: 3, mb: 3 }}>
       <Toolbar>
         <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Bill of Materials
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
           onClick={handleAddBOM}
           startIcon={<AddIcon />}
         >
           Add BOM
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
               rows={filteredBOMs}
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
};

export default BOMs;