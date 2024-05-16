import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid, Paper, Divider } from '@mui/material';

const MaterialReqDetails = () => {
  const { id } = useParams();
  const [materialReq, setMaterialReq] = useState(null);

  useEffect(() => {
    const fetchMaterialReq = async () => {
      try {
        const response = await api.get(`/api/manufacturing/material-requisitions/${id}/`);
        setMaterialReq(response.data);
      } catch (error) {
        console.error('Error fetching material requisition:', error);
      }
    };

    fetchMaterialReq();
  }, [id]);

  if (!materialReq) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Material Requisition Details
      </Typography>
      <Paper elevation={3}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Requisition ID:</Typography>
              <Typography variant="body1">{materialReq.id}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Status:</Typography>
              <Typography variant="body1">{materialReq.status}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Items:</Typography>
              <ul>
                {materialReq.items.map((item) => (
                  <li key={item.id}>
                    {item.component_name} ({item.quantity})
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default MaterialReqDetails;