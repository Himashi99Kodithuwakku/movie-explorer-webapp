import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create Theme Context object
const ThemeContext = createContext();

// Custom hook to easily access Theme Context in any component
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

//  Design Token Palette  

// Shared accent colors  , consistent across both light & dark themes
export const COLORS = {
  ratingGold: '#F59E0B',   // Star ratings 
  success: '#10B981',   // Saved to Watchlist &  success alerts
  error: '#EF4444',   // Remove from favorites, error messages
  // Light theme 
  light: {
    primary: '#0066FF',   // Buttons, active tabs, badges
    primaryHover: '#0052CC',   // Button hover/focus
    secondary: '#3B82F6',   // Links, star rating highlights, metadata
    bgCanvas: '#F8FAFC',   // Main page background
    bgSurface: '#FFFFFF',   // Cards, modals, header bar
    border: '#E2E8F0',   // Card borders, input outline, dividers
    textPrimary: '#0F172A',   // Titles, headings 
    textSecondary: '#64748B',  // Release year, genres, plot body text
  },
  // Dark theme 
  dark: {
    primary: '#3B82F6',   // Buttons, active nav items, badges
    primaryHover: '#60A5FA',   // Button hover/focus
    secondary: '#60A5FA',   // Links, active filter tags
    bgCanvas: '#0B0F19',   // Main background
    bgSurface: '#1E293B',   // Movie cards, dropdowns, modals
    border: '#334155',   // Search bar outline, subtle card separators
    textPrimary: '#F8FAFC',   // Titles, headings 
    textSecondary: '#94A3B8',  // Cast details, metadata, runtime, secondary copy
  },
};

// Theme Provider Component 

export const CustomThemeProvider = ({ children }) => {
  // Load saved theme from localStorage, default to dark theme
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem('movieAppTheme');
    return savedTheme ? savedTheme : 'dark';
  });

  // correctly  theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieAppTheme', mode);
  }, [mode]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Build the MUI theme using the color palette 
  const theme = useMemo(() => {
    const c = mode === 'dark' ? COLORS.dark : COLORS.light;

    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: c.primary,
          light: c.primaryHover,
        },
        secondary: {
          main: c.secondary,
        },
        error: {
          main: COLORS.error,           // #EF4444 — consistent across themes
        },
        warning: {
          main: COLORS.ratingGold,      // #F59E0B — rating stars
        },
        success: {
          main: COLORS.success,         // #10B981 — watchlist saved
        },
        background: {
          default: c.bgCanvas,          // Page background
          paper: c.bgSurface,         // Cards, modals, navbar 
        },
        divider: c.border,              // Divider lines, card borders
        text: {
          primary: c.textPrimary,     // Titles, headings
          secondary: c.textSecondary,   // Metadata, plot body text
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
      shape: {
        borderRadius: 8,                // Consistent rounded corners globally
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, COLORS }}>
      {/* ThemeProvider applies the MUI theme to all components */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline normalizes background color and resets browser defaults */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
