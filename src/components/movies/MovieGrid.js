import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import MovieIcon from '@mui/icons-material/Movie';

import MovieCard from './MovieCard';
import { useMovieContext } from '../../context/MovieContext';

/**
 * MovieGrid Component
 * Responsive CSS Grid layout:
 *  - Mobile View  (xs): 3 cards per row
 *  - Tablet View  (sm): 4 cards per row
 *  - Small Desktop View  (md): 6 cards per row
 *  - Large Desktop  View (lg+): 9 cards per row
**/

const MovieGrid = ({ movies = [], loading = false, error = null, onSelectMovie }) => {
  const { selectedGenre, selectedYear, minRating } = useMovieContext();

  // Filter movies based on selected filters 
  const filteredMovies = movies.filter((movie) => {
    //  Check Genre Filter 
    if (selectedGenre) {
      const hasGenre = movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre));
      if (!hasGenre) return false;
    }

    // Check Release Year Filter 
    if (selectedYear) {
      const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';
      if (releaseYear !== selectedYear) return false;
    }

    // Check  Rating Filter 
    if (minRating > 0) {
      if (!movie.vote_average || movie.vote_average < minRating) return false;
    }

    return true;
  });

  // CSS Grid column breakdown
  const gridColumns = {
    xs: 'repeat(3, 1fr)',   // 3 columns on mobile phones
    sm: 'repeat(4, 1fr)',   // 4 columns on tablets
    md: 'repeat(6, 1fr)',   // 6 columns on small desktops
    lg: 'repeat(9, 1fr)',   // 9 columns on large desktops
  };

  // Display API Error
  if (error) {
    return (
      <Alert severity="error" sx={{ my: 4, width: '100%' }}>
        {error}
      </Alert>
    );
  }

  // Display Loading Skeleton Grid while fetching data
  if (loading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridColumns,
          gap: { xs: 1, sm: 2, md: 2 },
          my: 2,
        }}
      >
        {Array.from(new Array(18)).map((_, index) => (
          <Box key={index} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Skeleton variant="rectangular" sx={{ height: { xs: 140, sm: 200, md: 220 } }} animation="wave" />
            <Box sx={{ pt: 0.5, px: 0.5 }}>
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={16} width="40%" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  // Display Empty State if no movies match
  if (!loading && filteredMovies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
        <MovieIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No movies found
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Try adjusting your search query or reset your filter settings.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: gridColumns,
        gap: { xs: 1, sm: 1.5, md: 2 },
        my: 2,
      }}
    >
      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onSelectMovie && onSelectMovie(movie)}
        />
      ))}
    </Box>
  );
};

export default MovieGrid;
