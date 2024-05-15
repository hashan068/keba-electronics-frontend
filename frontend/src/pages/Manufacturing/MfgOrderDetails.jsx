import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardHeader, CardContent, Skeleton } from '@mui/material';
import api from '../../api';

const MfgOrderDetails = () => {
  const { id } = useParams();
  const [manufacturingOrder, setManufacturingOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchManufacturingOrder = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/manufacturing/manufacturing-orders/${id}/`);
        setManufacturingOrder(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchManufacturingOrder();
  }, [id]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={60} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!manufacturingOrder) {
    return <div>Manufacturing order not found.</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
            Manufacturing Order Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader title="Order Details" />
            <CardContent>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Order ID: {manufacturingOrder.id}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Product ID: {manufacturingOrder.product_id || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Quantity: {manufacturingOrder.quantity}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                BOM: {manufacturingOrder.bom || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Status: {manufacturingOrder.status}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Created At: {manufacturingOrder.created_at}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Updated At: {manufacturingOrder.updated_at}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Sales Order Item: {manufacturingOrder.sales_order_item || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MfgOrderDetails;