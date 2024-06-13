import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert, AppBar, Toolbar } from '@mui/material';
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
      const response = await api.post('/api/sales/orders/', salesOrderData);
      console.log('Received data:', response.data);

      if (response.status === 201) {
        setAlert({ severity: 'success', message: 'Sales order created successfully!' });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        setSalesOrderItems([]);

      // Update the quotation status to 'accepted'
      const updatedQuotation = await api.patch(`/api/sales/quotations/${id}/`, { status: 'accepted' });
      setQuotation(updatedQuotation.data);

      } else {
        setAlert({ severity: 'error', message: `Error creating sales order: ${response.data.error || 'Unknown error'}` });
      }
    } catch (error) {
      console.error('Error creating sales order:', error);
      setAlert({ severity: 'error', message: 'An error occurred while creating the sales order. Please try again later.' });
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await api.post(`/api/sales/quotations/${id}/send-email/`);

      if (response.status === 200) {
        setAlert({ severity: 'success', message: 'Email sent successfully!' });
      } else {
        setAlert({ severity: 'error', message: response.data.error || 'Error sending email' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setAlert({ severity: 'error', message: 'An error occurred while sending the email. Please try again later.' });
    }
  };

  if (!quotation) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <AppBar position="static" color="default" sx={{ mb: 4, mt: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Quotation Details - {quotation.customer}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendEmail}
            sx={{
              backgroundColor: '#1a237e',
              '&:hover': { backgroundColor: '#0d1b5e' },
            }}
          >
            Send Quotation Email
          </Button>
        </Toolbar>
      </AppBar>

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
        {/* Render the "Approve" and "Reject" buttons only if the status is "pending" */}
        {quotation.status === 'pending' (
          <>
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
          </>
        )}

      </Box>

      {/* <PreviewDownloadButtons 
        onPreview={handlePreview} 
        onDownload={handleDownload} 
      /> */}
    </Box>
  );
}
