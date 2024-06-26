// components/PermanentDrawerLeft.jsx
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
// import ResponsiveAppBar from './AppBar';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function SalespersonDrawer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            KEBA ELECTRONICS
          </Typography>
        </Toolbar>
      </AppBar>
      <ResponsiveAppBar /> */}

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
              <ListItemIcon></ListItemIcon>
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
              <ListItemIcon></ListItemIcon>
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
              <ListItemIcon></ListItemIcon>
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
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Manufacturing Order" />
            </ListItemButton>
          </ListItem>


        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}