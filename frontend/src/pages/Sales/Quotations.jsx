import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { parse, format } from 'date-fns';

export default function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const navigate = useNavigate();

  const getQuotations = () => {
    api
      .get('/api/sales/quotations/')
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        setQuotations(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'quotation_number', headerName: 'Quotation Number', width: 150 },
    { field: 'customer_name', headerName: 'Customer', width: 200 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 150,
      valueFormatter: (params) =>
        params.value && format(new Date(params.value), 'yyyy/MM/dd'),
    },
    {
      field: 'expiration_date',
      headerName: 'Expiration Date',
      type: 'date',
      width: 150,
      valueFormatter: (params) =>
        params.value && format(new Date(params.value), 'yyyy/MM/dd'),
    },
    { field: 'total_amount', headerName: 'Total Amount', type: 'number', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Typography variant="h3" align="center" sx={{ marginTop: '28px' }}>
        Quotations
      </Typography>
      <Button variant="contained" sx={{ margin: 2 }} onClick={handleAddQuotation}>
        Add Quotation
      </Button>
      <div style={{ height: 400, width: '85%', margin: 20 }}>
        <DataGrid
          rows={quotations}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          onRowClick={handleRowClick}
        />
      </div>
    </Box>
  );
}