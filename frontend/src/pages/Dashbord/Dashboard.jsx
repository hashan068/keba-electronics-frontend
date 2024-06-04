import React, { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import SalesDashboard from './SalesDashboard';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userrole');
    setUserRole(storedUserRole);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* <Typography variant="h3" align="center" gutterBottom>
        Dashboard
      </Typography> */}
      {userRole.includes('Admin') && <SalesDashboard />}
    </Container>
  );
};

export default Dashboard;