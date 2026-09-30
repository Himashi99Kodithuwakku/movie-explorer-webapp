import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import MovieCard from './MovieCard';
import { useMovieContext } from '../../context/MovieContext';

// TrendingMovies Component

const TrendingMovies = ({ onSelectMovie }) => {
  const { trendingMovies, loading } = useMovieContext();

  // If no trending movies loaded yet, don't render empty box
  if (!loading && (!trendingMovies || trendingMovies.length === 0)) {
    return null;
  }

  return (
    <Box sx={{ mt: 3, mb: 4, width: '100%' }}>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <WhatshotIcon sx={{ color: '#d52d2dff', fontSize: { xs: 24, sm: 28 } }} />
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.35rem' },
            color: 'text.primary',
          }}
        >
          Trending Movies
        </Typography>
      </Box>

      {/* Loading Spinner or Horizontal Movie Cards List */}
      {loading && (!trendingMovies || trendingMovies.length === 0) ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={32} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            py: 1,
            px: 0.5,
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'action.hover',
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'primary.main',
              borderRadius: 3,
            },
          }}
        >
          {trendingMovies.slice(0, 15).map((movie) => (
            <Box
              key={`trending-${movie.id}`}
              sx={{
                width: { xs: 120, sm: 145 },
                minWidth: { xs: 120, sm: 145 },
                flexShrink: 0,
              }}
            >
              <MovieCard movie={movie} onClick={() => onSelectMovie(movie)} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TrendingMovies;
