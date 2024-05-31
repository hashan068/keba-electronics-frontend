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
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();

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
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => handleNavigate('/')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/sales/quotations')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Quotations" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/sales/product')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/sales/salesorder')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Sales Order" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/mfg/mfgorder')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Manufacturing Order" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/mfg/bom')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="BOM" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/mfg/materialreq')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Material Requisition" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/inventory/component')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText primary="Components" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/inventory/purchas-req')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Purchase Requisitions" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/inventory/po')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Purchase Order" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
