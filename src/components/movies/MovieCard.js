import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';

import { getImageUrl } from '../../api/tmdb';
import { useMovieContext } from '../../context/MovieContext';

// MovieCard Component

const MovieCard = ({ movie, onClick }) => {
  const { toggleFavorite, isFavorite } = useMovieContext();
  const favorited = isFavorite(movie.id);

  // fetch movie release year
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  // Format rating from 1 to 10
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  // Stop event propagation so clicking the heart doesn't open the modal
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-5px) scale(1.02)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
          zIndex: 2,
        },
        position: 'relative',
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {/*  Star Rating icon */}
      <Box
        sx={{
          position: 'absolute',
          top: 5,
          left: 5,
          zIndex: 2,
          bgcolor: 'rgba(0,0,0,0.75)',
          borderRadius: 1.5,
          px: { xs: 0.5, md: 0.8 },
          py: 0.3,
          display: 'flex',
          alignItems: 'center',
          gap: 0.3,
        }}
      >
        <StarIcon sx={{ color: '#F59E0B', fontSize: { xs: 11, md: 14 } }} />
        <Typography
          variant="caption"
          sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '0.6rem', md: '0.75rem' } }}
        >
          {rating}
        </Typography>
      </Box>

      {/* add Favorite Heart Toggle */}
      <IconButton
        onClick={handleFavoriteClick}
        size="small"
        aria-label="toggle favorite"
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          zIndex: 2,
          bgcolor: 'rgba(0,0,0,0.6)',
          color: favorited ? '#EF4444' : '#fff',
          p: { xs: '3px', md: '5px' },
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.85)',
            color: '#EF4444',
          },
        }}
      >
        {favorited ? (
          <FavoriteIcon sx={{ fontSize: { xs: 13, md: 16 } }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: { xs: 13, md: 16 } }} />
        )}
      </IconButton>

      {/*  Movie Poster Image */}
      <CardMedia
        component="img"
        image={getImageUrl(movie.poster_path, 'w342')}  // w342 is smaller & faster to load
        alt={movie.title}
        loading="lazy"
        sx={{
          width: '100%',
          aspectRatio: '2 / 3',          // Maintain poster portrait aspect ratio
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />

      {/* Movie Title & Release Year */}
      <CardContent
        sx={{
          p: { xs: 0.5, md: 1 },
          '&:last-child': { pb: { xs: 0.5, md: 1 } },
          flexGrow: 1,
        }}
      >
        <Typography
          variant="caption"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 0.2,
          }}
        >
          {movie.title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.55rem', md: '0.7rem' } }}
        >
          {releaseYear}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
