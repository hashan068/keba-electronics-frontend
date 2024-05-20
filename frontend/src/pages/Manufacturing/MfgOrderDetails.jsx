import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardHeader, CardContent, Button, AppBar, Toolbar, Box, Stepper, Step, StepLabel, Skeleton } from '@mui/material';
import api from '../../api';

const MfgOrderDetails = () => {
  const { id } = useParams();
  const [manufacturingOrder, setManufacturingOrder] = useState(null);
  const [bomId, setBomId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMaterialRequested, setIsMaterialRequested] = useState(false);

  useEffect(() => {
    const fetchManufacturingOrder = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/manufacturing/manufacturing-orders/${id}/`);
        setManufacturingOrder(response.data);
        fetchBomId(response.data.product_id);
      } catch (error) {
        console.error('Error fetching manufacturing order:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchManufacturingOrder();
  }, [id]);

  const fetchBomId = async (productId) => {
    try {
      const response = await api.get(`/api/sales/products/${productId}/`);
      setBomId(response.data.bom);
      console.log(response.data.bom);
    } catch (error) {
      console.error('Error fetching BOM ID:', error);
    }
  };

  const handleMaterialRequest = async () => {
    try {
      const payload = { 
        manufacturing_order: id,
        bom: bomId
      
      };
      await api.post(`/api/manufacturing/material-requisitions/`, payload);
      setIsMaterialRequested(true);
    } catch (error) {
      console.error('Error requesting material:', error);
    }
  };

  const steps = ['Confirmed', 'In Progress', 'Done'];

  const getStatusStep = (status) => {
    switch (status) {
      case 'Confirmed':
        return 0;
      case 'In Progress':
        return 1;
      case 'Done':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="default" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Manufacturing Order Details
          </Typography>
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
            Delete
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleMaterialRequest}
            disabled={isMaterialRequested}
          >
            {isMaterialRequested ? 'Material Requisition Sent' : 'Material Request'}
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
              <Stepper activeStep={getStatusStep(manufacturingOrder?.status)} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <CardHeader title="Order Details" />
              <CardContent>
                <Grid container spacing={2}>
                  {[
                    { label: 'Order ID:', value: manufacturingOrder?.id || 'N/A' },
                    { label: 'Product ID:', value: manufacturingOrder?.product_id || 'N/A' },
                    { label: 'Quantity:', value: manufacturingOrder?.quantity || 'N/A' },
                    { label: 'BOM ID:', value: bomId || 'N/A' },
                    { label: 'Status:', value: manufacturingOrder?.status || 'N/A' },
                    { label: 'Created At:', value: manufacturingOrder?.created_at ? new Date(manufacturingOrder.created_at).toLocaleString() : 'N/A' },
                    { label: 'Updated At:', value: manufacturingOrder?.updated_at ? new Date(manufacturingOrder.updated_at).toLocaleString() : 'N/A' },
                    { label: 'Sales Order Item:', value: manufacturingOrder?.sales_order_item || 'N/A' },
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

export default MfgOrderDetails;
