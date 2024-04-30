import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function QuotationDetail() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);

  useEffect(() => {
    api.get(`/api/quotations/${id}/`)
      .then((res) => {
        setQuotation(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, [id]);

  if (!quotation) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="main" sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '85%' }}>
        <Typography variant="h3" align="center" sx={{ marginTop: "28px" }}>
          Quotation Details
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Quotation Number:</Typography>
            <Typography>{quotation.quotation_number}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Customer:</Typography>
            <Typography>{quotation.customer}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Date:</Typography>
            <Typography>{quotation.date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Expiration Date:</Typography>
            <Typography>{quotation.expiration_date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Invoicing and Shipping Address:</Typography>
            <Typography>{quotation.invoicing_and_shipping_address}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total Amount:</Typography>
            <Typography>{quotation.total_amount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Status:</Typography>
            <Typography>{quotation.status}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
