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

const MaterialReq = () => {
 const [materialReqs, setMaterialReqs] = useState([]);
 const [loading, setLoading] = useState(false);
 const [searchText, setSearchText] = useState('');
 const [filteredMaterialReqs, setFilteredMaterialReqs] = useState([]);
 const navigate = useNavigate();

 const fetchMaterialReqs = async () => {
   try {
     setLoading(true);
     const response = await api.get('/api/manufacturing/material-requisitions/');
     setMaterialReqs(response.data);
     setFilteredMaterialReqs(response.data);
     setLoading(false);
   } catch (error) {
     console.error('Error fetching material requisitions:', error);
     setLoading(false);
   }
 };

 useEffect(() => {
   fetchMaterialReqs();
 }, []);

 const handleRowClick = (params) => {
   navigate(`/mfg/materialreq/${params.row.id}`);
 };

 const handleAddMaterialReq = () => {
   navigate('/mfg/materialreq/new');
 };

 const handleSearchChange = (event) => {
   const value = event.target.value;
   setSearchText(value);
   const filteredData = materialReqs.filter((materialReq) =>
     Object.values(materialReq).some((field) =>
       field.toString().toLowerCase().includes(value.toLowerCase())
     )
   );
   setFilteredMaterialReqs(filteredData);
 };

 const columns = [
   { field: 'id', headerName: 'Requisition ID', width: 150 },
   { field: 'status', headerName: 'Status', width: 150 },
   {
     field: 'items',
     headerName: 'Items',
     width: 300,
     renderCell: (params) => (
       <ul>
         {params.value.map((item) => (
           <li key={item.id}>
             {item.component_name} ({item.quantity})
           </li>
         ))}
       </ul>
     ),
   },
 ];

 return (
   <Container maxWidth="lg" sx={{ py: 3 }}>
     <Paper sx={{ p: 3, mb: 3 }}>
       <Toolbar>
         <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Material Requisitions
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
           onClick={handleAddMaterialReq}
           startIcon={<AddIcon />}
         >
           Add Material Requisition
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
               rows={filteredMaterialReqs}
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

export default MaterialReq;