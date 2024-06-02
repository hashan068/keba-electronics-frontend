import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, Container, Grid, Card, CardHeader, CardContent, Button, AppBar, Toolbar, Box, Stepper, Step, StepLabel, Skeleton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { Assignment, Edit, Delete, CheckCircle, Cancel, ArrowBack, Warning, Business, PriorityHigh, Receipt, LocalShipping, Send } from '@mui/icons-material';

import api from '../../api';

const STATUS_CHOICES = [
  { value: 'draft', label: 'Draft', icon: <Edit /> },
  { value: 'open_order', label: 'Open Order', icon: <Assignment /> },
  { value: 'approved', label: 'Approved', icon: <CheckCircle /> },
  { value: 'received', label: 'Received', icon: <LocalShipping /> },
  { value: 'invoiced', label: 'Invoiced', icon: <Receipt /> },
  { value: 'cancelled', label: 'Cancelled', icon: <Cancel /> },
  { value: 'rejected', label: 'Rejected', icon: <Delete /> },
  { value: 'unknown', label: 'Unknown', icon: <Warning /> }, // Fallback
];

const getStatusStep = (status) => {
  const index = STATUS_CHOICES.findIndex((choice) => choice.value === status);
  return index === -1 ? 0 : index; // Default to 'draft' if not found
};

const getStatusChip = (status) => {
  const choice = STATUS_CHOICES.find((c) => c.value === status) || STATUS_CHOICES[STATUS_CHOICES.length - 1];
  return (
    <Chip
      icon={choice.icon}
      label={choice.label}
      color={status === 'approved' || status === 'received' || status === 'invoiced' ? 'success' : status === 'rejected' || status === 'cancelled' ? 'error' : 'primary'}
      variant={status === 'draft' || status === 'open_order' ? 'outlined' : 'filled'}
    />
  );
};

const POView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchaseOrder, setPurchaseOrder] = useState({
    price_per_unit: '',
    total_price: '',
  });
  const [editedValues, setEditedValues] = useState({
    price_per_unit: '',
    total_price: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/inventory/purchase-orders/${id}/`);
        setPurchaseOrder({
          ...response.data,
          price_per_unit: response.data.price_per_unit || '',
          total_price: response.data.total_price || '',
        });
      } catch (error) {
        console.error('Error fetching purchase order:', error);
        setError(error.message || 'An error occurred while fetching the purchase order.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPurchaseOrder();
  }, [id]);

  const handleApprove = async () => {
    try {
      const response = await api.patch(`/api/inventory/purchase-orders/${id}/`, {
        status: 'approved',
        purchase_manager_approval: true,
        price_per_unit: purchaseOrder.price_per_unit,
        total_price: purchaseOrder.total_price,
      });
      setPurchaseOrder(response.data);
    } catch (error) {
      console.error('Error approving purchase order:', error);
      setError('Failed to approve the purchase order. Please try again.');
    }
  };

  const handleReject = () => {
    setOpenDialog(true);
  };

  const confirmReject = async () => {
    try {
      const response = await api.patch(`/api/inventory/purchase-orders/${id}/`, {
        status: 'rejected',
        notes: rejectionReason,
        price_per_unit: purchaseOrder.price_per_unit,
        total_price: purchaseOrder.total_price,
      });
      setPurchaseOrder(response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error rejecting purchase order:', error);
      setError('Failed to reject the purchase order. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setEditedValues({
      ...editedValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSend = async () => {
    try {
      const updatedValues = {
        ...purchaseOrder,
        price_per_unit: editedValues.price_per_unit || purchaseOrder.price_per_unit,
        total_price: editedValues.total_price || purchaseOrder.total_price,
        status: 'open_order',
      };
      const response = await api.patch(`/api/inventory/purchase-orders/${id}/`, updatedValues);
      setPurchaseOrder(response.data);
      setEditedValues({
        price_per_unit: '',
        total_price: '',
      });
    } catch (error) {
      console.error('Error sending purchase order:', error);
      setError('Failed to send the purchase order. Please try again.');
    }
  };

  const handleOrderReceived = async () => {
    try {
      const response = await api.patch(`/api/inventory/purchase-orders/${id}/`, {
        status: 'received',
        price_per_unit: purchaseOrder.price_per_unit,
        total_price: purchaseOrder.total_price,
      });
      setPurchaseOrder(response.data);
    } catch (error) {
      console.error('Error updating purchase order status:', error);
      setError('Failed to update purchase order status. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/inventory/purchase-order/edit/${id}`);
  };

  const handleViewSupplierDetails = () => {
    navigate(`/suppliers/${purchaseOrder.supplier?.id}`);
  };

  const handleViewAllRequisitions = () => {
    navigate('/requisitions');
  };

  const handleCancelOrder = async () => {
    try {
      await api.delete(`/api/inventory/purchase-orders/${id}/`);
      navigate('/purchase-orders');
    } catch (error) {
      console.error(error);
      setError('Failed to cancel order.');
    }
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, bgcolor: '#f5f5f5' }}>
      <AppBar position="static" color="default" sx={{ mb: 4 }}>
        <Toolbar>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Back</Button>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Purchase Order #{isLoading ? 'Loading...' : purchaseOrder?.id || 'N/A'}
          </Typography>
          {!isLoading && purchaseOrder?.status === 'draft' && (
            <Button variant="contained" color="primary" startIcon={<Send />} onClick={handleSend} sx={{ mx: 1 }}>
              Send
            </Button>
          )}

          {!isLoading && purchaseOrder?.status === 'open_order' && (
            <>
              <Button variant="contained" color="success" startIcon={<CheckCircle />} onClick={handleApprove} sx={{ mx: 1 }}>
                Approve
              </Button>
              <Button variant="contained" color="error" startIcon={<Cancel />} onClick={handleReject} sx={{ mx: 1 }}>
                Reject
              </Button>
            </>
          )}

          {!isLoading && purchaseOrder?.status === 'approved' && (
            <Button variant="contained" color="primary" startIcon={<LocalShipping />} onClick={handleOrderReceived} sx={{ mx: 1 }}>
              Order Received
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Grid container spacing={2}>
          <Grid item xs={12}><Skeleton variant="rectangular" height={60} /></Grid>
          <Grid item xs={12}><Skeleton variant="rectangular" height={300} /></Grid>
        </Grid>
      ) : purchaseOrder ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ width: '100%', mb: 4 }}>
              <Stepper activeStep={getStatusStep(purchaseOrder.status)} alternativeLabel>
                {STATUS_CHOICES.slice(0, -1).map((choice) => (
                  <Step key={choice.value}>
                    <StepLabel>{choice.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <CardHeader
                title="Purchase Order Details"
                action={getStatusChip(purchaseOrder.status)}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Purchase Requisition</Typography>
                    <Box sx={{ p: 2, bgcolor: '#f0f0f0', borderRadius: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}><Typography><strong>ID:</strong> {purchaseOrder.purchase_requisition?.id || 'N/A'}</Typography></Grid>
                        <Grid item xs={6}><Typography><strong>Component ID:</strong> {purchaseOrder.purchase_requisition?.component_id || 'N/A'}</Typography></Grid>
                        <Grid item xs={6}><Typography><strong>Quantity:</strong> {purchaseOrder.purchase_requisition?.quantity || 'N/A'}</Typography></Grid>
                        <Grid item xs={6}>
                          <Typography><strong>Priority:</strong> </Typography>
                          <Chip
                            icon={<PriorityHigh />}
                            label={purchaseOrder.purchase_requisition?.priority || 'N/A'}
                            color={purchaseOrder.purchase_requisition?.priority === 'high' ? 'error' : 'primary'}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}><Typography><strong>Notes:</strong> {purchaseOrder.purchase_requisition?.notes || 'N/A'}</Typography></Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={6}><Typography><strong>Supplier ID:</strong> {purchaseOrder.supplier_id || 'N/A'}</Typography></Grid>
                  <Grid item xs={6}><Typography><strong>Created By:</strong> User {purchaseOrder.creator_id || 'N/A'}</Typography></Grid>
                  <Grid item xs={6}><Typography><strong>Updated At:</strong> {purchaseOrder.updated_at ? new Date(purchaseOrder.updated_at).toLocaleString() : 'N/A'}</Typography></Grid>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Field</TableCell>
                          <TableCell>Value</TableCell>
                          {purchaseOrder.status === 'draft' && <TableCell>Edit</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Price Per Unit</TableCell>
                          <TableCell>{purchaseOrder.price_per_unit || 'N/A'}</TableCell>
                          {purchaseOrder.status === 'draft' && (
                            <TableCell>
                              <TextField
                                name="price_per_unit"
                                value={editedValues.price_per_unit}
                                onChange={handleInputChange}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                        <TableRow>
                          <TableCell>Total Price</TableCell>
                          <TableCell>{purchaseOrder.total_price || 'N/A'}</TableCell>
                          {purchaseOrder.status === 'draft' && (
                            <TableCell>
                              <TextField
                                name="total_price"
                                value={editedValues.total_price}
                                onChange={handleInputChange}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid item xs={12}>
                    <Typography><strong>Notes:</strong> </Typography>
                    <Box sx={{ p: 1, bgcolor: '#f0f0f0', borderRadius: 1 }}>{purchaseOrder.notes || 'N/A'}</Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <CardHeader title="Actions" />
              <CardContent>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Business />}
                  sx={{ mb: 2 }}
                  onClick={handleViewSupplierDetails}
                >
                  View Supplier Details
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Assignment />}
                  sx={{ mb: 2 }}
                  onClick={handleViewAllRequisitions}
                >
                  View All Requisitions
                </Button>

                {!isLoading && purchaseOrder?.status === 'draft' && (
                  <Link to={`/inventory/purchase-order/edit/${id}`}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Edit />}
                      sx={{ mb: 2 }}
                    >
                      Edit Order
                    </Button>
                  </Link>
                )}
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography>No purchase order found or an error occurred.</Typography>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reject Purchase Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="rejection-reason"
            label="Reason for Rejection"
            type="text"
            fullWidth
            variant="outlined"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmReject} color="error">Reject</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default POView;