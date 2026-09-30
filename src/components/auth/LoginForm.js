import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';


//LoginForm Modal Component
//Displays a popup modal for user login

const LoginForm = ({ open, onClose }) => {
  const { login, isAuthenticated } = useAuth();

  // Local form state for input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [showAlert, setShowAlert] = useState(false);

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertMessage('');
    setShowAlert(false);

    // when Both username & password missing
    if (!username.trim() && !password.trim()) {
      setAlertMessage('Please enter username and password.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    //  if username missing
    if (!username.trim()) {
      setAlertMessage('Please enter username.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    //  if user password missing
    if (!password.trim()) {
      setAlertMessage('Please enter password.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    //  validate username & password
    const result = login(username, password);

    if (result.success) {
      setAlertMessage('Login Successful! Welcome back.');
      setAlertSeverity('success');
      setShowAlert(true);

      // Close popup automatically and refresh to clean home page
      setTimeout(() => {
        setUsername('');
        setPassword('');
        setAlertMessage('');
        setShowAlert(false);
        onClose();
        if (window.location.pathname === '/' || window.location.pathname === '') {
          window.location.reload();
        } else {
          window.location.href = '/';
        }
      }, 2000);
    } else {
      setAlertMessage(result.message);
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  // Handle closing modal manually 
  const handleClose = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setAlertMessage('');
    setShowAlert(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        // block closing modal when clicking outside or pressing escape if user not logged in
        if (!isAuthenticated && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
          return;
        }
        handleClose();
      }}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(15, 23, 42, 0.65)'
        }
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 2 }}>
        {/* Title */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <AccountCircleIcon sx={{ fontSize: 36 }} />
          </Avatar>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>User Login</DialogTitle>
        </Box>

        {/* Alert Notification  */}
        {showAlert && alertMessage && (
          <Alert
            severity={alertSeverity}
            onClose={() => {
              setShowAlert(false);
              setAlertMessage('');
              setUsername('');
              setPassword('');
              setShowPassword(false);
            }}
            sx={{ mb: 2 }}
          >
            <AlertTitle sx={{ fontWeight: 700 }}>
              {alertSeverity === 'success' ? 'Success!' : 'Login Failed!'}
            </AlertTitle>
            {alertMessage}
          </Alert>
        )}

        <DialogContent sx={{ px: 1 }}>
          {/* Username Input Field */}
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (showAlert) setShowAlert(false);
            }}
            error={showAlert && alertSeverity === 'error' && (!username.trim() || alertMessage.includes('username'))}
          />

          {/* Password Input Field with password Visibility icon */}
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (showAlert) setShowAlert(false);
            }}
            error={showAlert && alertSeverity === 'error' && (!password.trim() || alertMessage.includes('password'))}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                    sx={{ color: 'text.secondary' }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 1, pt: 2, justifyContent: 'center' }}>
          {isAuthenticated && (
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              px: 4,             // Horizontal padding
              py: 1,             // Vertical padding
              minWidth: '140px',  // width
              borderRadius: 2,
            }}
          >
            Sign In
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default LoginForm;
