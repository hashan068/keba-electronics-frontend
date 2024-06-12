import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Skeleton,
  AppBar,
  Toolbar,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import api from '../../api';

const SalesOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesOrder, setSalesOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [salesOrderItems, setSalesOrderItems] = useState([]);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const userRole = localStorage.getItem('userrole');
    const userName = localStorage.getItem('username');
    const userId = localStorage.getItem('user_id');
    setRole(userRole);
    setUsername(userName);
    setUserId(userId);
  }, []);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const { data } = await api.get(`/api/sales/orders/${id}/`);
          setSalesOrder(data);
          setSalesOrderItems(data.order_items);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSalesOrder();
  }, [id]);

  const STATUS_CHOICES = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'in_production', label: 'In Production' },
    { value: 'ready_for_delivery', label: 'Ready for Delivery' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'delivered', label: 'Delivered' },
  ];

  const createManufacturingOrder = async (salesOrderItemId) => {
    const salesOrderItem = salesOrderItems.find(item => item.id === salesOrderItemId);

    if (!salesOrderItem) return;

    try {
      const { data: product } = await api.get(`/api/sales/products/${salesOrderItem.product}/`);
      const manufacturingOrderData = {
        sales_order_item: salesOrderItem.sales_order_item_id,
        quantity: salesOrderItem.quantity,
        product_id: salesOrderItem.product,
        bom: product.bom, // Include the BOM ID from the product details
        creater: userId,
      };

      console.log(manufacturingOrderData);

      const response = await api.post('/api/manufacturing/manufacturing-orders/', manufacturingOrderData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/salesorder/${id}`);
  };

  const handleManufacture = () => {
    salesOrderItems.forEach((item) => {
      createManufacturingOrder(item.id);
    });
  };

  const getStatusStep = (status) => {
    return STATUS_CHOICES.findIndex(choice => choice.value === status);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await api.patch(`/api/sales/orders/${id}/`, { status: newStatus });
      setSalesOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const renderStatusControls = () => {
    switch (salesOrder?.status) {
      case 'pending':
      if (role === 'Production Manager') {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleStatusUpdate('confirmed');
              handleManufacture();
            }}
          >
            Manufacture
          </Button>
        );
      }
      // case 'confirmed':
      //   return (
      //     <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('processing')}>
      //       Start Processing
      //     </Button>
      //   );
      // case 'processing':
      //   return (
      //     <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('in_production')}>
      //       Start Production
      //     </Button>
      //   );
      case 'in_production':
        return (
          <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('ready_for_delivery')}>
            Ready for Delivery
          </Button>
        );
      case 'ready_for_delivery':
        return (
          <Button variant="contained" color="primary" onClick={() => handleStatusUpdate('delivered')}>
            Mark as Delivered
          </Button>
        );
      case 'delivered':
        return <Typography variant="body1">Order Delivered</Typography>;
      case 'cancelled':
        return <Typography variant="body1">Order Cancelled</Typography>;
      default:
        return null;
    }
  };

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

  if (!salesOrder) {
    return <div>Sales order not found.</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, py: 4, px: 2, backgroundColor: '#eceff1' }}>
      <AppBar position="static" color="default" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {`Sales Order Details - ID ${salesOrder.id}`}
          </Typography>
          {renderStatusControls()}
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper activeStep={getStatusStep(salesOrder.status)} alternativeLabel>
              {STATUS_CHOICES.map((choice) => (
                <Step key={choice.value}>
                  <StepLabel>{choice.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="body1" gutterBottom sx={{ color: '#424242', fontWeight: 'bold' }}>
                Order ID: {salesOrder.id}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#424242', fontWeight: 'bold' }}>
                Customer: {salesOrder.customer_name}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#424242', fontWeight: 'bold' }}>
                Order Date: {new Date(salesOrder.created_at).toLocaleString()}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#424242', fontWeight: 'bold' }}>
                Status: {salesOrder.status}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader title="Order Items" />
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Product</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salesOrderItems.map((item) => (
                      <TableRow key={item.product}>
                        <TableCell align="right">{item.sales_order_item_id}</TableCell>
                        <TableCell align="right">{item.product_name}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">{(item.quantity * parseFloat(item.price)).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: '#424242', fontWeight: 'bold', margin: 4, textAlign: 'right' }}
                >
                  Total Amount: {salesOrder.total_amount}
                </Typography>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SalesOrderDetails;
