// components/Layout.jsx
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
      case 'Salesperson':
        return (
          <SalespersonLayout>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <ResponsiveAppBar />
              {children}
            </Box>
          </SalespersonLayout>
        );
      // case 'ProductionManager':
      //   return (
      //     <ProductionManagerLayout>
      //       <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
      //         <ResponsiveAppBar />
      //         {children}
      //       </Box>
      //     </ProductionManagerLayout>
      //   );
      // case 'GenaralManager':
      //   return (
      //     <GenaralManagerLayout>
      //       <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
      //         <ResponsiveAppBar />
      //         {children}
      //       </Box>
      //     </GenaralManagerLayout>
      //   );
      // case 'InventoryManager':
      //   return (
      //     <InventoryManagerLayout>
      //       <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
      //         <ResponsiveAppBar />
      //         {children}
      //       </Box>
      //     </InventoryManagerLayout>
      //   );
      // case 'Purchasing Manager':
      //   return (
      //     <PurchasingManagerLayout>
      //       <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
      //         <ResponsiveAppBar />
      //         {children}
      //       </Box>
      //     </PurchasingManagerLayout>
      //   );
      default:
        return (
          <Box sx={{ display: 'flex' }}>
            <PermanentDrawerLeft />
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <ResponsiveAppBar />
              {children}
            </Box>
          </Box>
        );
    }
  };

  return renderLayout();
};

export default Layout;



// // components/Layout.jsx
// import React from 'react';
// import { Box } from '@mui/material';
// import PermanentDrawerLeft from './PermanentDrawerLeft';
// import ResponsiveAppBar from './AppBar';

// const Layout = ({ children }) => {
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <PermanentDrawerLeft />
//       <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
//         <ResponsiveAppBar />
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default Layout;