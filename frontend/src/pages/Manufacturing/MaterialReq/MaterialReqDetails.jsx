import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { USER_ID } from '../../../constants';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

const BoldTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

const MaterialReqDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materialReq, setMaterialReq] = useState(null);
  const [components, setComponents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchMaterialReq = async () => {
      try {
        const response = await api.get(`/api/manufacturing/material-requisitions/${id}/`);
        setMaterialReq(response.data);
        await fetchComponents(response.data.items);
      } catch (error) {
        console.error('Error fetching material requisition:', error);
        setError('Error fetching material requisition');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchComponents = async (items) => {
      const componentIds = items.map(item => item.component);
      const uniqueComponentIds = [...new Set(componentIds)];

      try {
        const responses = await Promise.all(uniqueComponentIds.map(id => api.get(`/api/inventory/components/${id}/`)));
        const componentsData = responses.reduce((acc, res) => {
          acc[res.data.id] = res.data.name;
          return acc;
        }, {});
        setComponents(componentsData);
      } catch (error) {
        console.error('Error fetching components:', error);
        setError('Error fetching components');
      }
    };

    fetchMaterialReq();
  }, [id]);

  const handleApproveRequisition = async () => {
    const approvedItems = [];
    const rejectedItems = [];

    for (const item of materialReq.items) {
      const itemApproved = await handleApproveRequisitionItem(item);
      if (itemApproved) {
        approvedItems.push(item);
      } else {
        rejectedItems.push(item);
      }
    }

    if (approvedItems.length > 0) {
      setAlert({ severity: 'success', message: 'Material requisition approved successfully' });
      setMaterialReq((prev) => ({ ...prev, status: 'approved' }));
    }

    if (rejectedItems.length > 0) {
      setAlert({ severity: 'error', message: 'Some items could not be approved due to insufficient component quantity' });
    }
  };

  const handleApproveRequisitionItem = async (item) => {
    const userId = parseInt(localStorage.getItem(USER_ID), 10);

    const payload = {
      material_requisition_item: item.id,
      component_id: item.component,
      quantity: item.quantity,
      user_id: userId,
      status: status,
    };

    try {
      const response = await fetch('http://localhost:8000/api/inventory/consumption-transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Material requisition item approved:', item.id);
        return true;
      } else {
        const responseText = await response.text();
        console.error('Error approving material requisition item:', responseText);
        return false;
      }
    } catch (error) {
      console.error('Error approving material requisition item:', error);
      setAlert({ severity: 'error', message: 'An error occurred while approving the material requisition item. Please try again later.' });
      return false;
    }
  };

  const handleDismissAlert = () => {
    setAlert(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'fulfilled':
        return 'info';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <CenteredBox>
        <CircularProgress />
      </CenteredBox>
    );
  }

  if (error) {
    return (
      <CenteredBox>
        <Typography variant="h6" color="error">{error}</Typography>
      </CenteredBox>
    );
  }

  if (!materialReq) {
    return (
      <CenteredBox>
        <Typography variant="h6">Material Requisition not found</Typography>
      </CenteredBox>
    );
  }

  return (
    <StyledBox>
      <Grid container spacing={2} justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Grid>
        {materialReq.status === 'pending' && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleApproveRequisition}>
              Approve
            </Button>
          </Grid>
        )}
      </Grid>
      <Typography variant="h4" gutterBottom>
        Material Requisition Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <BoldTypography variant="h6">Requisition ID:</BoldTypography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{materialReq.id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <BoldTypography variant="h6">Manufacturing Order ID:</BoldTypography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{materialReq.manufacturing_order}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <BoldTypography variant="h6">BOM ID:</BoldTypography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{materialReq.bom}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <BoldTypography variant="h6">Status:</BoldTypography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{materialReq.status}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <BoldTypography variant="h6">Created At:</BoldTypography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{new Date(materialReq.created_at).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <BoldTypography variant="h6">Updated At:</BoldTypography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{new Date(materialReq.updated_at).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress color={getStatusColor(materialReq.status)} variant="determinate" value={materialReq.status === 'approved' ? 100 : 50} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Card}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <BoldTypography>Item ID</BoldTypography>
                  </TableCell>
                  <TableCell>
                    <BoldTypography>Component</BoldTypography>
                  </TableCell>
                  <TableCell>
                    <BoldTypography>Quantity</BoldTypography>
                  </TableCell>
                  <TableCell>
                    <BoldTypography>Status</BoldTypography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materialReq.items.map((item) => (
                  <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{components[item.component] || 'Loading...'}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Typography
                      color={
                        item.status === 'approved'
                          ? 'success.main'
                          : item.status === 'rejected'
                          ? 'error.main'
                          : 'warning.main'
                      }
                    >
                      {item.status}
                    </Typography>
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Snackbar
        open={!!alert}
        autoHideDuration={6000}
        onClose={() => setAlert(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setAlert(null)} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default MaterialReqDetails;