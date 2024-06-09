import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import logo from '../assets/logo.png';
import '../styles/drawer.css';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

// Salesperson, Production Manager, General Manager, Inventory Manager, Purchasing Manager, Admin

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/', roles: ['Admin', 'Production Manager', 'General Manager', 'Inventory Manager', 'Purchasing Manager'] },
  {
    section: 'Sales',
    items: [
      { text: 'Quotations', icon: <DescriptionIcon />, path: '/sales/quotations', roles: ['Admin', 'Salesperson', 'General Manager'] },
      { text: 'Products', icon: <InventoryIcon />, path: '/sales/product', roles: ['Admin', 'Salesperson', 'General Manager'] },
      { text: 'Customers', icon: <InventoryIcon />, path: '/sales/customer', roles: ['Admin', 'Salesperson', 'General Manager'] },
      { text: 'Sales Orders', icon: <ShoppingCartIcon />, path: '/sales/salesorder', roles: ['Admin', 'Salesperson', 'General Manager','Production Manager'] },
    ],
  },
  {
    section: 'Manufacturing',
    items: [
      { text: 'Manufacturing Orders', icon: <BuildIcon />, path: '/mfg/mfgorder', roles: ['Admin', 'General Manager', 'Salesperson','Production Manager'] },
      { text: 'BOM', icon: <AccountTreeIcon />, path: '/mfg/bom', roles: ['Admin', 'General Manager', 'mfg','Production Manager'] },
    ],
  },
  {
    section: 'Inventory',
    items: [
      { text: 'Material Requisitions', icon: <AssignmentIcon />, path: '/mfg/materialreq', roles: ['Admin', 'General Manager', 'Inventory Manager','Production Manager'] },
      { text: 'Components', icon: <WidgetsIcon />, path: '/inventory/component', roles: ['Admin', 'Inventory Manager', 'Purchasing Manager'] },
      { text: 'Purchase Requisitions', icon: <LocalShippingIcon />, path: '/inventory/purchase-req', roles: ['Admin', 'General Manager', 'inventory', 'Purchasing Manager'] },
      { text: 'Purchase Orders', icon: <ShoppingCartIcon />, path: '/inventory/po', roles: ['Admin', 'General Manager', 'Inventory Manager', 'Purchasing Manager'] },
    ],
  },
  {
    section: 'Notifications',
    items: [
      { text: 'Notifications', icon: <AssessmentRoundedIcon />, path: '/sales/sales-reports', roles: ['Admin', 'General Manager', 'Inventory Manager', 'Purchasing Manager'] },
    ],
  },
  {
    section: 'Reports',
    items: [
      { text: 'Sales Report', icon: <AssessmentRoundedIcon />, path: '/sales/sales-reports', roles: ['Admin', 'General Manager', 'sales'] },
      { text: 'Manufacturing Report', icon: <AssessmentRoundedIcon />, path: '/inventory/mfg-reports', roles: ['Admin', 'General Manager','Production Manager'] },
      { text: 'Inventory Report', icon: <AssessmentRoundedIcon />, path: '/inventory/inventory-reports', roles: ['Admin', 'General Manager', 'Inventory Manager', 'Purchasing Manager'] },
    ],
  },
];

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    const userRole = localStorage.getItem('userrole');
    setRole(userRole);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#263238', // Dark background color for the drawer
            color: '#ffffff', // Text color for the drawer items
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Logo Container */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', py: 2, px: 3}}>
          <img src={logo} alt="Logo" style={{ maxHeight: '50px', maxWidth: '100%' }} />
        </Box>
        <Divider sx={{ bgcolor: '#333333' }} />
        <List>
          {menuItems.map((item, index) => {
            if (item.section) {
              const visibleItems = item.items.filter(subItem => subItem.roles.includes(role));
              if (visibleItems.length > 0) {
                return (
                  <React.Fragment key={index}>
                    <Toolbar>
                      <Typography variant="h8" noWrap component="div">
                        {item.section}
                      </Typography>
                    </Toolbar>
                    <Divider sx={{ bgcolor: '#333333' }} />
                    {visibleItems.map((subItem, subIndex) => (
                      <ListItem key={subIndex} disablePadding onClick={() => handleNavigate(subItem.path)}>
                        <ListItemButton
                          sx={{
                            minHeight: '30px',
                            justifyContent: 'center',
                            '&:hover': {
                              backgroundColor: '#333333',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: '#ffffff' }}>{subItem.icon}</ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </React.Fragment>
                );
              }
              return null;
            }
            if (item.roles.includes(role)) {
              return (
                <ListItem key={index} disablePadding onClick={() => handleNavigate(item.path)}>
                  <ListItemButton
                    sx={{
                      minHeight: '50px',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#333333',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
        <Divider sx={{ bgcolor: '#333333' }} />
      </Drawer>
    </Box>
  );
}
