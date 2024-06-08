import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import PermanentDrawerLeft from './PermanentDrawerLeft';
import ResponsiveAppBar from './AppBar';
import SalespersonLayout from '../layouts/SalespersonLayout';
// import ProductionManagerLayout from '../layouts/ProductionManagerLayout';
// import GenaralManagerLayout from '../layouts/GenaralManagerLayout';
// import InventoryManagerLayout from '../layouts/InventoryManagerLayout';
// import PurchasingManagerLayout from '../layouts/PurchasingManagerLayout';

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userrole');
    setUserRole(storedUserRole);
  }, []);

  const renderLayout = () => {
    switch (userRole) {
      // case 'Salesperson':
      //   return (
      //     <SalespersonLayout>
      //       <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      //         <ResponsiveAppBar />
      //         <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      //           {children}
      //         </Box>
      //       </Box>
      //     </SalespersonLayout>
      //   );
      // // Add other user roles and their respective layouts here
      default:
        return (
          <Box sx={{ display: 'flex', height: '100vh' }}>
            <PermanentDrawerLeft />
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <ResponsiveAppBar />
              <Box sx={{ flexGrow: 1, p: 2 }}>
                {children}
              </Box>
            </Box>
          </Box>
        );
    }
  };

  return renderLayout();
};

export default Layout;
