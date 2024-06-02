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

import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;

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
            backgroundColor: '#263238', // Dark background color for the drawer
            color: '#ffffff', // Text color for the drawer items
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider sx={{ bgcolor: '#333333' }} />
        <List>
          <ListItem disablePadding onClick={() => handleNavigate('/')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <Toolbar>
            <Typography variant="h8" noWrap component="div">
              Sales
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: '#333333' }} />

          <ListItem disablePadding onClick={() => handleNavigate('/sales/quotations')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
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
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Product" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/sales/customer')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Customer" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/sales/salesorder')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Sales Order" />
            </ListItemButton>
          </ListItem>
          <Toolbar>
            <Typography variant="h8" noWrap component="div">
              Manufacturing
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: '#333333' }} />

          <ListItem disablePadding onClick={() => handleNavigate('/mfg/mfgorder')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
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
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="BOM" />
            </ListItemButton>
          </ListItem>
          <Toolbar>
            <Typography variant="h8" noWrap component="div">
              Inventory
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: '#333333' }} />
          <ListItem disablePadding onClick={() => handleNavigate('/mfg/materialreq')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
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
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText primary="Components" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding onClick={() => handleNavigate('/inventory/purchase-req')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
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
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Purchase Order" />
            </ListItemButton>
          </ListItem>
          <Toolbar>
            <Typography variant="h8" noWrap component="div">
              Notifications
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: '#333333' }} />

          <ListItem disablePadding onClick={() => handleNavigate('/sales/sales-reports')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <AssessmentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>

          </ListItem>
          <Toolbar>
            <Typography variant="h8" noWrap component="div">
              Reports
            </Typography>
          </Toolbar>
          <Divider sx={{ bgcolor: '#333333' }} />

          <ListItem disablePadding onClick={() => handleNavigate('/sales/sales-reports')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <AssessmentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Sales Report" />
            </ListItemButton>

          </ListItem>
          <ListItem disablePadding onClick={() => handleNavigate('/inventory/mfg-reports')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <AssessmentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Manufacturing Report" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleNavigate('/inventory/inventory-reports')}>
            <ListItemButton
              sx={{
                minHeight: '50px',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                <AssessmentRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory Report" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ bgcolor: '#333333' }} />
      </Drawer>
    </Box>
  );
}
