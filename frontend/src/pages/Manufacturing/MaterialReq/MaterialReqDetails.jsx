import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api';
import {
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Grid,
  useTheme,
  styled
} from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const MaterialReqDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [materialReq, setMaterialReq] = useState(null);
  const [components, setComponents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterialReq = async () => {
      try {
        const response = await api.get(`/api/manufacturing/material-requisitions/${id}/`);
        setMaterialReq(response.data);

        // Fetch components after fetching material requisition
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
    try {
      const response = await api.post(`/api/manufacturing/material-requisitions/${id}/approve/`);
      // Optionally, you can handle success response here
      console.log('Material requisition approved successfully:', response.data);
  
      // You may want to refresh the materialReq state or redirect after approval
    } catch (error) {
      console.error('Error approving material requisition:', error);
      setError('Error approving material requisition');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!materialReq) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Material Requisition not found</Typography>
      </Box>
    );
  }

  return (
    <StyledBox>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Button variant="contained" onClick={handleApproveRequisition} sx={{ mb: 2, ml: 2 }}>
        Approve
      </Button>
      <Typography variant="h4" gutterBottom>
        Material Requisition Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Requisition ID: {materialReq.id}</Typography>
            <Typography variant="h6">Manufacturing Order ID: {materialReq.manufacturing_order}</Typography>
            <Typography variant="h6">BOM ID: {materialReq.bom}</Typography>
            <Typography variant="h6">Status: {materialReq.status}</Typography>
            <Typography variant="h6">Created At: {new Date(materialReq.created_at).toLocaleString()}</Typography>
            <Typography variant="h6">Updated At: {new Date(materialReq.updated_at).toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item ID</TableCell>
                  <TableCell>Component</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materialReq.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{components[item.component] || 'Loading...'}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default MaterialReqDetails;
