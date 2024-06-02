import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CheckCircle, Cancel } from '@mui/icons-material';
import api from '../../api';
import PreviewDownloadButtons from '../../components/PreviewDownloadButtons';
import saveAs from 'file-saver';

export default function QuotationDetail() {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const [salesOrderItems, setSalesOrderItems] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    api.get(`/api/sales/quotations/${id}/`)
      .then((res) => {
        setQuotation(res.data);
        setSalesOrderItems(res.data.quotation_items);
      })
      .catch((err) => {
        console.log(err);
        setAlert({ severity: 'error', message: 'Error fetching quotation details' });
      });
  }, [id]);

  const handlePreview = () => {
    console.log('Preview clicked');
  };

  const handleConfirm = () => {
    console.log('Confirm clicked');
  };

  const handleDownload = () => {
    api
      .get(`/api/sales/quotations/${id}/download/`, {
        responseType: 'blob',
      })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, `quotation_${id}.pdf`);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setAlert({ severity: 'error', message: 'Quotation download URL not found' });
        } else {
          console.log(err);
          setAlert({ severity: 'error', message: 'Error downloading quotation' });
        }
      });
  };

  

  const validateForm = () => {
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const salesOrderData = {
      customer: quotation.customer,
      order_items: salesOrderItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.unit_price,
      })),
    };

    console.log('Sending data:', salesOrderData);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/sales/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salesOrderData),
      });
      const responseData = await response.json();
      console.log('Received data:', responseData);

      if (response.ok) {
        setAlert({ severity: 'success', message: 'Sales order created successfully!' });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        setSalesOrderItems([]);
      } else {
        setAlert({ severity: 'error', message: `Error creating sales order: ${responseData.error || 'Unknown error'}` });
      }
    } catch (error) {
      console.error('Error creating sales order:', error);
      setAlert({ severity: 'error', message: 'An error occurred while creating the sales order. Please try again later.' });
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/sales/quotations/${id}/send-email/`, {
        method: 'POST',
      });
      const result = await response.json();

      if (response.ok) {
        setAlert({ severity: 'success', message: 'Email sent successfully!' });
      } else {
        setAlert({ severity: 'error', message: result.error || 'Error sending email' });
      }
    } catch (error) {
      setAlert({ severity: 'error', message: 'An error occurred while sending the email. Please try again later.' });
    }
  };

  if (!quotation) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h3" align="center" sx={{ marginBottom: 3 }}>
        Quotation Details
      </Typography>

      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)} sx={{ marginBottom: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 3 }}>
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

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 3 }}>
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<CheckCircle />} 
          sx={{ textTransform: 'none' }}
          onClick={handleSubmit}
        >
          Approve
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<Cancel />} 
          sx={{ textTransform: 'none' }}
          onClick={() => console.log('Rejected')}
        >
          Reject
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ textTransform: 'none' }}
          onClick={handleSendEmail}
        >
          Send Quotation Email
        </Button>
      </Box>

      <PreviewDownloadButtons 
        onPreview={handlePreview} 
        onDownload={handleDownload} 
      />
    </Box>
  );
}
