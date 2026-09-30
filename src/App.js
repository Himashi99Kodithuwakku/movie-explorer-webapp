import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// Import Context Providers
import { CustomThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';

// Import UI Components & Pages
import Navbar from './components/common/Navbar';
import LoginForm from './components/auth/LoginForm';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  // If user is not logged in, force login modal open
  const isModalOpen = !isAuthenticated || loginOpen;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', overflowX: 'hidden', width: '100%' }}>
      {/* Background Page Content Blurred, when not authenticated */}
      <Box
        sx={{
          filter: !isAuthenticated ? 'blur(8px)' : 'none',
          transition: 'filter 0.4s ease-in-out',
          pointerEvents: !isAuthenticated ? 'none' : 'auto',
          userSelect: !isAuthenticated ? 'none' : 'auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Navbar onOpenLogin={() => setLoginOpen(true)} />
        {/* Spacer that matches the AppBar height so content isn't hidden underneath */}
        <Toolbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Box>

      {/* User Login Popup  */}
      <LoginForm open={isModalOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <MovieProvider>
          <Router>
            <AppContent />
          </Router>
        </MovieProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
