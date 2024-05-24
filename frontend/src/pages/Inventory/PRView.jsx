import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardHeader, CardContent, Button, AppBar, Toolbar, Box, Stepper, Step, StepLabel, Skeleton } from '@mui/material';
import api from '../../api';

const PRView = () => {
  const { id } = useParams();
  const [purchaseRequisition, setPurchaseRequisition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPurchaseRequisition = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/inventory/purchase-requisitions/${id}/`);
        setPurchaseRequisition(response.data);
      } catch (error) {
        console.error('Error fetching purchase requisition:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchaseRequisition();
  }, [id]);

  const STATUS_CHOICES = [
    { value: 'created', label: 'Created' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'partially_fulfilled', label: 'Partially Fulfilled' },
    { value: 'fulfilled', label: 'Fulfilled' },
    { value: 'closed', label: 'Closed' },
  ];

  const getStatusStep = (status) => {
    return STATUS_CHOICES.findIndex((choice) => choice.value === status);
  };

  const renderStatusControls = () => {
    const status = purchaseRequisition?.status;

    switch (status) {
      case 'created':
        return (
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Submit for Approval
          </Button>
        );
      case 'pending':
        return (
          <>
            <Button variant="contained" color="primary" sx={{ mx: 1 }}>
              Approve
            </Button>
            <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
              Reject
            </Button>
          </>
        );
      case 'approved':
        return (
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Create Purchase Order
          </Button>
        );
      case 'rejected':
        return (
          <>
            <Button variant="contained" color="primary" sx={{ mx: 1 }}>
              Revise and Resubmit
            </Button>
            <RejectedLogo />
          </>
        );
      case 'cancelled':
        return (
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Reopen
          </Button>
        );
      case 'partially_fulfilled':
        return (
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Mark as Fulfilled
          </Button>
        );
      case 'fulfilled':
        return (
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Close
          </Button>
        );
      case 'closed':
        return null;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="default" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Purchase Requisition Details
          </Typography>
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" sx={{ mx: 1 }}>
            Delete
          </Button>
          {renderStatusControls()}
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
              <Stepper activeStep={getStatusStep(purchaseRequisition?.status)} alternativeLabel>
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
              <CardHeader title="Purchase Requisition Details" />
              <CardContent>
                <Grid container spacing={2}>
                  {[
                    { label: 'Requisition ID:', value: purchaseRequisition?.id || 'N/A' },
                    { label: 'Requester:', value: purchaseRequisition?.requester || 'N/A' },
                    { label: 'Department:', value: purchaseRequisition?.department || 'N/A' },
                    { label: 'Items:', value: Array.isArray(purchaseRequisition?.items) ? purchaseRequisition.items.map(item => item.name).join(', ') : 'N/A' },
                    { label: 'Status:', value: purchaseRequisition?.status || 'N/A' },
                    { label: 'Created At:', value: purchaseRequisition?.created_at ? new Date(purchaseRequisition.created_at).toLocaleString() : 'N/A' },
                    { label: 'Updated At:', value: purchaseRequisition?.updated_at ? new Date(purchaseRequisition.updated_at).toLocaleString() : 'N/A' },
                    { label: 'Notes:', value: purchaseRequisition?.notes || 'N/A' },
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

const RejectedLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
};

export default PRView;