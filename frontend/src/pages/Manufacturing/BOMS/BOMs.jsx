import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from "../../../api";

const BOMs = () => {
  const [boms, setBoms] = useState([]);
  const navigate = useNavigate();

  const fetchBOMs = async () => {
    try {
      const response = await api.get('/api/manufacturing/bills-of-material/');
      setBoms(response.data);
    } catch (error) {
      console.error('Error fetching BOMs:', error);
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

  const columns = [
    { field: 'id', headerName: 'BOM ID', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'BOM Name', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'product_name', headerName: 'Product', width: 200, headerClassName: 'super-app-theme--header' },

    {
      field: 'created_at',
      headerName: 'Created At',
      type: 'date',
      width: 180,
      valueFormatter: (params) => params.value && new Date(params.value).toLocaleString(),
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'updated_at',
      headerName: 'Updated At',
      type: 'date',
      width: 180,
      valueFormatter: (params) => params.value && new Date(params.value).toLocaleString(),
      headerClassName: 'super-app-theme--header',
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '95%' }}>

        <Typography variant="h3" align="center" sx={{ marginTop: '28px' }}>
          Bill of Materials
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <Button variant="contained" color="primary" onClick={handleAddBOM}>
            Add BOM
          </Button>
        </Box>

        <Box sx={{ height: 600, width: '100%', '& .super-app-theme--header': { backgroundColor: '#cfd8dc' } }}>
          <DataGrid
            rows={boms}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[10]}
            onRowClick={handleRowClick}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': { color: 'primary.main' },
              '.MuiDataGrid-iconButtonContainer': { marginLeft: '50px !important' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BOMs;