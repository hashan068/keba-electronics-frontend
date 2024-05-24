import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardHeader, CardContent, Button, AppBar, Toolbar, Box, Stepper, Step, StepLabel, Skeleton } from '@mui/material';
import api from '../../api';

const POView = () => {
  const { id } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/inventory/purchase-orders/${id}/`);
        setPurchaseOrder(response.data);
      } catch (error) {
        console.error('Error fetching purchase order:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchaseOrder();
  }, [id]);

  const STATUS_CHOICES = [
    { value: 'created', label: 'Created' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const getStatusStep = (status) => {
    return STATUS_CHOICES.findIndex((choice) => choice.value === status);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="default" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Purchase Order Details
          </Typography>
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
            Delete
          </Button>
        </Toolbar>
      </AppBar>
      {isLoading ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={60} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ width: '100%', mb: 4 }}>
              <Stepper activeStep={getStatusStep(purchaseOrder?.status)} alternativeLabel>
                {STATUS_CHOICES.map((choice) => (
                  <Step key={choice.value}>
                    <StepLabel>{choice.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <CardHeader title="Purchase Order Details" />
              <CardContent>
                <Grid container spacing={2}>
                  {[
                    { label: 'Order ID:', value: purchaseOrder?.id || 'N/A' },
                    { label: 'Purchase Requisition:', value: purchaseOrder?.purchase_requisition_details || 'N/A' },
                    { label: 'Supplier:', value: purchaseOrder?.supplier_id || 'N/A' },
                    { label: 'Manager Approval:', value: purchaseOrder?.purchase_manager_approval ? 'Approved' : 'Not Approved' },
                    { label: 'Status:', value: purchaseOrder?.status || 'N/A' },
                    { label: 'Created At:', value: purchaseOrder?.created_at ? new Date(purchaseOrder.created_at).toLocaleString() : 'N/A' },
                    { label: 'Updated At:', value: purchaseOrder?.updated_at ? new Date(purchaseOrder.updated_at).toLocaleString() : 'N/A' },
                    { label: 'Notes:', value: purchaseOrder?.notes || 'N/A' },
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
                        {item.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default POView;