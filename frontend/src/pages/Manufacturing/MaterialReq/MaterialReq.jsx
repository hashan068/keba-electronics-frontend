import React, { useState, useEffect } from 'react';
import api from "../../../api";
import { Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MaterialReq = () => {
  const [materialReqs, setMaterialReqs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterialReqs = async () => {
      try {
        const response = await api.get('/api/manufacturing/material-requisitions/');
        setMaterialReqs(response.data);
      } catch (error) {
        console.error('Error fetching material requisitions:', error);
      }
    };
    fetchMaterialReqs();
  }, []);

  const handleRowClick = (materialReqId) => {
    navigate(`/mfg/materialreq/${materialReqId}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Material Requisitions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requisition ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materialReqs.map((materialReq) => (
              <TableRow key={materialReq.id} onClick={() => handleRowClick(materialReq.id)} style={{ cursor: 'pointer' }}>
                <TableCell>{materialReq.id}</TableCell>
                <TableCell>{materialReq.status}</TableCell>
                <TableCell>
                  <ul>
                    {materialReq.items.map((item) => (
                      <li key={item.id}>
                        {item.component_name} ({item.quantity})
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MaterialReq;
