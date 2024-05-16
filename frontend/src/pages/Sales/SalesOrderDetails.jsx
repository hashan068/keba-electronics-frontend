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
} from '@mui/material';
import api from '../../api';

const SalesOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesOrder, setSalesOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [salesOrderItems, setSalesOrderItems] = useState([]);

  useEffect(() => {
    const fetchSalesOrder = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const { data } = await api.get(`/api/sales/orders/${id}/`);
          setSalesOrder(data);
          setSalesOrderItems(data.order_items);
          console.log(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSalesOrder();
  }, [id]);

  const createManufacturingOrder = async (salesOrderItemId) => {
    const salesOrderItem = salesOrderItems.find(item => item.id === salesOrderItemId);

    console.log(salesOrderItem); // This will log the salesOrderItem object

    if (!salesOrderItem) return;

    const manufacturingOrderData = {
      sales_order_item_id: salesOrderItem.sales_order_item_id,

      quantity: salesOrderItem.quantity,
      product_id: salesOrderItem.product,
    };

    console.log(manufacturingOrderData);

    try {
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
    <Container maxWidth="lg" sx={{ mt: 2, py: 4, px: 2, backgroundColor: '#b0bec5' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
            Sales Order Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader
              title="Order Details"
              action={
                <Button variant="contained" color="primary" onClick={handleManufacture} sx={{ backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303fff' } }}>
                  Manufacture
                </Button>
              }
            />
            <CardContent>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Order ID: {salesOrder.id}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
                Customer: {salesOrder.customer_name}
              </Typography>

              <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold' }}>
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
                        <TableCell>{item.sales_order_item_id}</TableCell>
                        <TableCell>{item.product}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">{(item.quantity * parseFloat(item.price)).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Typography variant="body1" gutterBottom sx={{ color: '#666', fontWeight: 'bold', margin: 4, textAlign: 'right' }}>
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