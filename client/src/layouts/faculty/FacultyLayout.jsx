import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Tooltip,
} from '@mui/material';

import {
  Dashboard,
  Person,
  Logout,
  Feedback,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', icon: <Dashboard />, path: 'dashboard' },
  { label: 'My Timetable', icon: <EventNoteIcon />, path: 'timetable' },
  { label: 'Student Feedback', icon: <Feedback />, path: 'student-feedback' },
  { label: 'Meetings', icon: <PeopleAltIcon />, path: 'meetings' },
  { label: 'To-Do', icon: <CheckCircleIcon />, path: 'todo' },
  { label: 'Swap Requests', icon: <SwapHorizIcon />, path: 'swap-requests' },
  { label: 'Profile', icon: <Person />, path: 'profile' },
  { label: 'Logout', icon: <Logout />, path: '/login/faculty' },
];
export default function FacultyLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F5EEDD', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#06202B',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ClassSync – Faculty Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 70,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 70,
            transition: 'width 0.3s',
            backgroundColor: '#077A7D',
            color: '#fff',
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item, index) => (
            <Tooltip key={index} title={!open ? item.label : ''} placement="right">
              <ListItem
                button
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: location.pathname.includes(item.path)
                    ? '#7AE2CF'
                    : 'transparent',
                  color: location.pathname.includes(item.path) ? '#06202B' : '#fff',
                  '&:hover': {
                    backgroundColor: '#7AE2CF',
                    color: '#06202B',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          transition: 'margin 0.3s',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
