import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieIcon from '@mui/icons-material/Movie';
import { Link as RouterLink } from 'react-router-dom';

import MovieGrid from '../components/movies/MovieGrid';
import MovieDetailsModal from '../components/movies/MovieDetailsModal';
import { useMovieContext } from '../context/MovieContext';

// User movie favorites page components
const Favorites = () => {
  const { favorites } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 8 }}>
      {/*  favorite page Title */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 5, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
          <FavoriteIcon sx={{ color: '#EF4444', fontSize: { xs: 32, sm: 42 } }} />
          <Typography variant="h3" component="h1" fontWeight={800} sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
            My Favorite Movies
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
          {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
        </Typography>

        {/* Horizontal line */}
        <Box
          sx={{
            width: 100,
            height: 4,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #EF4444 0%, #3B82F6 100%)',
            mt: 2,
          }}
        />
      </Box>

      {/* Favorites Movie Grid  */}
      {favorites.length === 0 ? (
        <Paper
          elevation={2}
          sx={{
            textAlign: 'center',
            py: { xs: 6, sm: 9 },
            px: { xs: 3, sm: 6 },
            maxWidth: 600,
            mx: 'auto',
            my: 3,
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              width: 86,
              height: 86,
              borderRadius: '50%',
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 48, color: '#EF4444' }} />
          </Box>

          <Typography variant="h5" fontWeight={800} gutterBottom sx={{ color: 'text.primary' }}>
            No Favorites Saved Yet!
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 460, mx: 'auto', lineHeight: 1.6, mb: 4 }}>
            Your collection is currently empty. Explore popular & trending movies, or search for your favorite titles and click the ❤️ <strong>heart icon</strong> on any movie  to save it to your personal watchlist!
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<MovieIcon />}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 4px 14px rgba(0, 102, 255, 0.35)',
            }}
          >
            Explore Movies Now
          </Button>
        </Paper>
      ) : (
        <MovieGrid movies={favorites} onSelectMovie={handleSelectMovie} />
      )}

      {/* Movie Details Modal */}
      <MovieDetailsModal movie={selectedMovie} open={modalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default Favorites;
