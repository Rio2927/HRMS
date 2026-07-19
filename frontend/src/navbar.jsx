import { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/Person';
import { AuthContext } from './context/AuthContext';
import useResponsive from './hooks/useResponsive';

/**
 * Navbar Component
 * Displays application header with user profile menu and mobile navigation
 */
function Navbar() {
  const { logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const { isMobile } = useResponsive();

  const open = Boolean(anchorEl);

  useEffect(() => {
    const userAvatar = localStorage.getItem('avatar') || null;
    setAvatar(userAvatar);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (action) => {
    setAnchorEl(null);

    switch (action) {
      case 'profile':
        // Handle profile click
        break;
      case 'settings':
        // Handle settings click
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const mobileMenuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, action: 'dashboard' },
    { label: 'Profile', icon: <ProfileIcon />, action: 'profile' },
    { label: 'Settings', icon: <SettingsIcon />, action: 'settings' },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#121212',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo / Title */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: '0.5px',
              flex: 1,
              '@media (max-width: 600px)': {
                fontSize: '1rem',
              },
            }}
          >
            HRMS Portal
          </Typography>

          {/* Desktop Profile Menu */}
          {!isMobile && (
            <Box>
              <Tooltip title="User Settings">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
                  <Avatar
                    alt="User Avatar"
                    src={`${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000'}/uploads/${avatar}`}
                    sx={{
                      width: 40,
                      height: 40,
                      border: '2px solid #1976d2',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleMenuClose('close')}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    bgcolor: '#242424',
                    color: 'white',
                    mt: 1,
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleMenuClose('profile')}
                  sx={{
                    '&:hover': { backgroundColor: '#1e1e1e' },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <ProfileIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuClose('settings')}
                  sx={{
                    '&:hover': { backgroundColor: '#1e1e1e' },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                <MenuItem
                  onClick={() => handleMenuClose('logout')}
                  sx={{
                    '&:hover': { backgroundColor: '#d32f2f' },
                    color: '#ff6b6b',
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMobileDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileDrawerOpen}
          onClose={handleMobileDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: '#121212',
              color: 'white',
              width: 280,
              mt: '65px',
            },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Menu</Typography>
              <IconButton onClick={handleMobileDrawerToggle} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            <List sx={{ width: '100%' }}>
              {mobileMenuItems.map((item) => (
                <ListItem
                  button
                  key={item.action}
                  onClick={() => {
                    handleMobileDrawerToggle();
                    if (item.action === 'logout') {
                      logout();
                    }
                  }}
                  sx={{
                    borderRadius: '8px',
                    mb: 1,
                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
              <Avatar
                alt="User Avatar"
                src={`${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000'}/uploads/${avatar}`}
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Logged in
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
}

export default Navbar;
