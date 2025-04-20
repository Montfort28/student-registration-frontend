// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Badge
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { language, toggleLanguage, translations } = useLanguage();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  
  const t = translations[language].navbar;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleLanguageMenu = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
    handleLanguageClose();
  };

  const menuItems = [
    { text: t.home, path: '/', icon: <HomeIcon fontSize="small" /> },
    ...(currentUser ? [] : [
      { text: t.login, path: '/login', icon: <LoginIcon fontSize="small" /> },
      { text: t.register, path: '/register', icon: <HowToRegIcon fontSize="small" /> }
    ])
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
        <SchoolIcon sx={{ mr: 1 }} />
        <Typography variant="h6">
          {t.title}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        
        {currentUser && (
          <>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon sx={{ minWidth: 36 }}><AccountCircleIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary={t.profile} />
            </ListItem>
            {currentUser.role === 'admin' && (
              <ListItem button component={Link} to="/admin/dashboard">
                <ListItemIcon sx={{ minWidth: 36 }}><DashboardIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary={t.adminDashboard} />
              </ListItem>
            )}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}><LogoutIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary={t.logout} />
            </ListItem>
          </>
        )}
        
        <ListItem button onClick={handleLanguageToggle}>
          <ListItemIcon sx={{ minWidth: 36 }}><TranslateIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary={language === 'en' ? 'Français' : 'English'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold'
            }}
          >
            {t.title}
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{ mx: 0.5 }}
                >
                  {item.text}
                </Button>
              ))}
              
              <Tooltip title={language === 'en' ? 'Changer en Français' : 'Switch to English'}>
                <IconButton 
                  color="inherit" 
                  onClick={handleLanguageToggle}
                  sx={{ ml: 1, mr: 2 }}
                >
                  <Badge
                    badgeContent={language.toUpperCase()}
                    color="secondary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '10px',
                        height: '16px',
                        minWidth: '16px',
                      }
                    }}
                  >
                    <TranslateIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              {currentUser ? (
                <>
                  <IconButton
                    onClick={handleMenu}
                    color="inherit"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.875rem' }}>
                      {currentUser.firstName?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { borderRadius: 2, mt: 0.5 }
                    }}
                  >
                    <MenuItem sx={{ pointerEvents: 'none' }}>
                      <Typography variant="body2" color="textSecondary">
                        {currentUser.firstName} {currentUser.lastName}
                      </Typography>
                    </MenuItem>
                    <MenuItem sx={{ pointerEvents: 'none' }}>
                      <Typography variant="body2" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                        {t.role}: {currentUser.role}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem 
                      onClick={() => {
                        navigate('/profile');
                        handleClose();
                      }}
                    >
                      <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                      {t.profile}
                    </MenuItem>
                    {currentUser.role === 'admin' && (
                      <MenuItem 
                        onClick={() => {
                          navigate('/admin/dashboard');
                          handleClose();
                        }}
                      >
                        <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
                        {t.adminDashboard}
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                      {t.logout}
                    </MenuItem>
                  </Menu>
                </>
              ) : null}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;