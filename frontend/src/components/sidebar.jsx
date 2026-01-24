import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Toolbar,
  Box,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SavingsIcon from '@mui/icons-material/Savings';
import DescriptionIcon from '@mui/icons-material/Description';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaidIcon from '@mui/icons-material/Paid';
import { AuthContext } from '../context/AuthContext';
import useResponsive from '../hooks/useResponsive';

const DRAWER_WIDTH = 260;

/**
 * Sidebar Component
 * Navigation drawer for authenticated users
 */
function Sidebar() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [activeRoute, setActiveRoute] = useState('/');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isMobile, isTablet } = useResponsive();

  // Hide sidebar on mobile
  const shouldHideSidebar = isMobile;

  useEffect(() => {
    const userName = localStorage.getItem('name') || 'User';
    const userAvatar = localStorage.getItem('avatar') || null;
    setName(userName);
    setAvatar(userAvatar);
  }, []);

  /**
   * Navigation menu configuration
   * Each item contains label, route, and icon
   */
  const navigationItems = [
    {
      label: 'Dashboard',
      route: '/',
      icon: <DashboardIcon />,
    },
    {
      label: 'Attendance',
      route: '/attendance',
      icon: <EventAvailableIcon />,
    },
    {
      label: 'Salary',
      route: '/salary',
      icon: <SavingsIcon />,
    },
    {
      label: 'Payslip',
      route: '/payslip',
      icon: <PaidIcon />,
    },
    {
      label: 'Leaves',
      route: '/leaves',
      icon: <EventNoteIcon />,
    },
    {
      label: 'Settings',
      route: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  const handleNavigation = (route) => {
    setActiveRoute(route);
    navigate(route);
  };

  const sidebarContent = (
    <>
      {/* User Profile Section */}
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Avatar
          alt={name}
          src={`${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000'}/uploads/${avatar}`}
          sx={{
            width: 64,
            height: 64,
            mb: 1,
            border: '3px solid #1976d2',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          Software Engineer
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List
        sx={{
          p: 1,
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#121212',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#424242',
            borderRadius: '3px',
          },
        }}
      >
        {navigationItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.route)}
              selected={activeRoute === item.route}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                transition: 'all 0.2s ease',
                color: activeRoute === item.route ? '#1976d2' : 'inherit',
                backgroundColor:
                  activeRoute === item.route ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  transform: 'translateX(4px)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.16)',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeRoute === item.route ? '#1976d2' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '0.95rem',
                    fontWeight: activeRoute === item.route ? 600 : 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer Divider */}
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ opacity: 0.5 }}>
          HRMS v1.0
        </Typography>
      </Box>
    </>
  );

  // Hide sidebar on mobile devices
  if (shouldHideSidebar) {
    return null;
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#121212',
          color: '#fff',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          transition: 'all 0.3s ease',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
}

export default Sidebar;
