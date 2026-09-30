import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
// import ToggleOffIcon from '@mui/icons-material/ToggleOff';
// import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
// import PersonIcon from '@mui/icons-material/Person';

// Import  custom contexts
import { useThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useMovieContext } from '../../context/MovieContext';

// web app Logo image 
const LOGO_URL = process.env.PUBLIC_URL + '/images/logo.png';

//  Fixed top navigation bar 
const Navbar = ({ onOpenLogin }) => {
  const { mode, toggleTheme } = useThemeContext();
  const { user, isAuthenticated, logout } = useAuth();
  const { favorites, resetFilters, executeSearch } = useMovieContext();
  const navigate = useNavigate();

  // when user click on  Home and Logo  it will refresh page and recent search
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (resetFilters) resetFilters();
    if (executeSearch) executeSearch('');
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.location.reload();
    } else {
      window.location.href = '/';
    }
  };

  // Profile dropdown anchor state
  const [anchorEl, setAnchorEl] = useState(null);
  const profileOpen = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleFavouritesClick = () => {
    handleProfileClose();
    navigate('/favorites');
  };

  const handleLogout = () => {
    handleProfileClose();
    if (resetFilters) resetFilters();
    if (executeSearch) executeSearch('');
    logout();
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.location.reload();
    } else {
      window.location.href = '/';
    }
  };

  // get avatar initials from user name
  const getInitials = () => {
    if (!user) return 'U';
    const name = user.name || user.username || 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={4}
      sx={{
        width: '100%',
        overflowX: 'hidden',
        backdropFilter: 'blur(8px)',
        zIndex: (theme) => theme.zIndex.appBar + 10,
      }}
    >
      <Toolbar sx={{ px: { xs: 1.5, sm: 2 }, minHeight: { xs: '56px', sm: '64px' } }}>

        {/* Web app Logo */}
        <Box
          component={RouterLink}
          to="/"
          onClick={handleHomeClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            flex: '1 1 0',       // takes up equal 1/3
            minWidth: 0,
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src={LOGO_URL}
            alt="MovieExplorer Logo"
            sx={{
              height: { xs: 32, sm: 40 },
              width: 'auto',
              objectFit: 'contain',
              flexShrink: 0,
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.95rem', sm: '1.2rem' },
              letterSpacing: '0.04rem',
              whiteSpace: 'nowrap',
              background: 'linear-gradient(45deg, #0066FF 30%, #3B82F6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MovieExplorer
          </Typography>
        </Box>

        {/*  Home Link  */}
        <Box
          sx={{
            flex: '1 1 0',         // equal 1/3
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Mobile: icon-only */}
          <Tooltip title="Home">
            <IconButton
              component={RouterLink}
              to="/"
              onClick={handleHomeClick}
              color="inherit"
              aria-label="home"
              sx={{
                display: { xs: 'flex', md: 'none' },
                '&:hover': { color: '#f5c518' },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          {/* Desktop: text button */}
          <Button
            component={RouterLink}
            to="/"
            onClick={handleHomeClick}
            color="inherit"
            startIcon={<HomeIcon />}
            sx={{
              display: { xs: 'none', md: 'flex' },
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.03rem',
              px: 2,
              '&:hover': {
                background: 'transparent',
                color: '#f5c518',
              },
            }}
          >
            Home
          </Button>
        </Box>

        {/* Theme toggle , user profile */}
        <Box
          sx={{
            flex: '1 1 0',         // equal 1/3
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            size="small"
            aria-label="toggle theme mode"
            title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {mode === 'dark' ? (
              <LightModeIcon sx={{ color: '#f5c518', fontSize: { xs: 20, sm: 24 } }} />
            ) : (
              <DarkModeIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            )}
          </IconButton>

          {/*  show  user avatar with dropdown */}
          {isAuthenticated ? (
            <>
              <Tooltip title={user?.name || user?.username || 'Profile'}>
                <IconButton
                  onClick={handleProfileClick}
                  size="small"
                  aria-controls={profileOpen ? 'profile-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={profileOpen ? 'true' : undefined}
                  sx={{ p: 0.5 }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 34, sm: 38 },
                      height: { xs: 34, sm: 38 },
                      bgcolor: 'primary.main',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s',
                      '&:hover': {
                        boxShadow: '0 0 0 3px rgba(0,102,255,0.35)',
                      },
                    }}
                  >
                    {getInitials()}
                  </Avatar>
                </IconButton>
              </Tooltip>

              {/* Profile Dropdown Menu */}
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={profileOpen}
                onClose={handleProfileClose}
                onClick={handleProfileClose}
                PaperProps={{
                  elevation: 6,
                  sx: {
                    mt: 1.5,
                    minWidth: 190,
                    borderRadius: 2,
                    overflow: 'visible',
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {/* User Info */}
                <Box sx={{ px: 2, py: 1.2 }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {user?.name}
                  </Typography>
                </Box>

                <Divider />

                {/* User Favourites */}
                <MenuItem onClick={handleFavouritesClick} sx={{ py: 1.2 }}>
                  <ListItemIcon>
                    <Badge badgeContent={favorites.length} color="error">
                      <FavoriteIcon
                        fontSize="small"
                        sx={{ color: favorites.length > 0 ? '#e50914' : 'inherit' }}
                      />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText>Favourites</ListItemText>
                </MenuItem>

                <Divider />

                {/* Logout */}
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    py: 1.2,
                    color: 'error.main',
                    '& .MuiListItemIcon-root': { color: 'error.main' },
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            /* Login button */
            <>
              <IconButton
                color="primary"
                size="small"
                onClick={onOpenLogin}
                title="Login"
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <LoginIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<LoginIcon />}
                onClick={onOpenLogin}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'flex' },
                  px: 3,
                  py: 0.8,
                  borderRadius: 2,
                }}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
