import SalesDashboard from './SalesDashboard/SalesDashboard';
import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import MfgDashboard from './ManufacturingDashboard/MfgDashboard';
import InventoryDashboard from './InventoryDashboard/InventoryDashboard';


const Dashboard = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userrole');
    setUserRole(storedUserRole);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {userRole === 'General Manager' && <ManagerDashboard />}
      {userRole === 'Salesperson' && <SalesDashboard />}
      {userRole === 'Production Manager' && <MfgDashboard />}
      {userRole === 'Inventory Manager' && <InventoryDashboard />}
      {userRole === 'Purchasing Manager' && <InventoryDashboard />}
      {userRole === 'Admin' && <InventoryDashboard />}
    </Container>
  );
};

export default Dashboard;
