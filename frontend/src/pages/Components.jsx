import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from "../api";

export default function Components() {
  const [components, setComponents] = useState([]);
  const navigate = useNavigate();

  const getComponents = () => {
    api
      .get("/api/inventory/components/")
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        setComponents(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    getComponents();
  }, []);

  const handleRowClick = (params) => {
    navigate(`/component/${params.row.id}`);
  };

  const handleAddComponent = () => {
    navigate(`/component/new`);
  };

  const columns = [
    { field: 'name', headerName: 'Component Name', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'description', headerName: 'Description', width: 300, headerClassName: 'super-app-theme--header' },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'reorder_level', headerName: 'Reorder Level', type: 'number', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'unit_of_measure', headerName: 'Unit of Measure', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'supplier', headerName: 'Supplier', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'cost', headerName: 'Cost', type: 'number', width: 150, headerClassName: 'super-app-theme--header' },
  ];

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '85%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "55px" }}>
          Components
        </Typography>
        <Button variant="contained" onClick={handleAddComponent}>
          Add Component
        </Button>
        <Box sx={{
          height: 600,
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#cfd8dc',
            color: 'white',
          },
        }}>
          <DataGrid
            rows={components}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[10]}
            onRowClick={handleRowClick}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
              ".MuiDataGrid-iconButtonContainer": {
                marginLeft: '50px !important'
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}