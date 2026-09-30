import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import StarIcon from '@mui/icons-material/Star';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TheatersIcon from '@mui/icons-material/Theaters';

import { getMovieDetails, getMovieVideos, getImageUrl } from '../../api/tmdb';
import { useMovieContext } from '../../context/MovieContext';
import CastCard from './CastCard';

// create new  function to format runtime in hours and minutes 
const formatRuntime = (totalMinutes) => {
  if (!totalMinutes) return null;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours} h ${mins} mins`;
  } else if (hours > 0) {
    return `${hours} h`;
  } else {
    return `${mins} mins`;
  }
};

// MovieDetailsModal Component

const MovieDetailsModal = ({ movie, open, onClose }) => {
  const { toggleFavorite, isFavorite } = useMovieContext();

  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const trailerRef = useRef(null);
  const favorited = movie ? isFavorite(movie.id) : false;

  // function to scroll down to trailer section
  const handleScrollToTrailer = () => {
    if (trailerRef.current) {
      trailerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // fetch complete movie details and trailer video when user click on the  modal 
  useEffect(() => {
    if (!movie || !open) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const detailData = await getMovieDetails(movie.id);
        setDetails(detailData);

        // fetch relevent videos and find YouTube official trailer key with fallbacks
        const videos = await getMovieVideos(movie.id);
        const youtubeVideos = videos.filter((vid) => vid.site === 'YouTube');

        let officialTrailer = youtubeVideos.find((vid) => vid.type === 'Trailer');
        if (!officialTrailer) {
          officialTrailer = youtubeVideos.find((vid) => vid.type === 'Teaser');
        }
        if (!officialTrailer) {
          officialTrailer = youtubeVideos[0];
        }

        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        } else {
          // Fallback to YouTube search query for movie trailer
          setTrailerKey(`SEARCH:${encodeURIComponent(movie.title + ' official trailer')}`);
        }
      } catch (err) {
        console.error('Error fetching details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie, open]);

  if (!movie) return null;

  // Combine baseline movie object with detailed payload once loaded
  const movieData = details || movie;
  const rating = movieData.vote_average ? movieData.vote_average.toFixed(1) : 'N/A';
  const releaseDate = movieData.release_date || 'N/A';
  const runtime = formatRuntime(movieData.runtime);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="body"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative', bgcolor: 'background.paper' }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            bgcolor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Movie banner Backdrop */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 250, sm: 360 },
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.95)), url(${getImageUrl(
              movieData.backdrop_path || movieData.poster_path,
              'original'
            )})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            display: 'flex',
            alignItems: 'flex-end',
            p: { xs: 2, sm: 3 },
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', width: '100%' }}>
            {/* full poster thumbnail card */}
            {movieData.poster_path && (
              <Box
                component="img"
                src={getImageUrl(movieData.poster_path, 'w185')}
                alt={movieData.title}
                sx={{
                  width: { xs: 75, sm: 110 },
                  height: { xs: 112, sm: 165 },
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  flexShrink: 0,
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: { xs: 'none', sm: 'block' },
                }}
              />
            )}

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h4" component="h2" sx={{ color: '#fff', fontWeight: 800, mb: 1, fontSize: { xs: '1.5rem', sm: '2.1rem' } }}>
                {movieData.title}
              </Typography>

              {movieData.tagline && (
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.8)', italic: true, mb: 1, fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                  "{movieData.tagline}"
                </Typography>
              )}

              {/* short stats : Rating, Release Date, Runtime, Watch Trailer */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, color: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarBorderPurple500Icon sx={{ color: '#f5c518' }} />
                  <Typography variant="body1" fontWeight={600}>
                    {rating}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarMonthIcon fontSize="small" />
                  <Typography variant="body2">{releaseDate}</Typography>
                </Box>

                {runtime && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2">{runtime}</Typography>
                  </Box>
                )}

                {/* Watch Trailer Link  */}
                {trailerKey && (
                  <Box
                    onClick={handleScrollToTrailer}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      cursor: 'pointer',
                      color: '#fff',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        color: '#f5c518',
                        '& .MuiTypography-root': {
                          fontWeight: 700,
                          color: '#f5c518',
                        },
                        '& .MuiSvgIcon-root': {
                          color: '#f5c518',
                          transform: 'scale(1.15)',
                        },
                      },
                    }}
                  >
                    <TheatersIcon fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Watch Trailer
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Movie Details Modal Body Content */}
        <Box sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Favorite Toggle */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {movieData.genres &&
                    movieData.genres.map((genre) => (
                      <Chip key={genre.id} label={genre.name} size="small" color="primary" variant="outlined" />
                    ))}
                </Box>

                {/* Mobile View: Icon-only Heart favourite  Button */}
                <IconButton
                  color="error"
                  onClick={() => toggleFavorite(movieData)}
                  title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}
                  sx={{
                    display: { xs: 'flex', sm: 'none' },
                    bgcolor: favorited ? 'error.main' : 'transparent',
                    color: favorited ? '#fff' : 'error.main',
                    border: '1px solid',
                    borderColor: 'error.main',
                    p: 1,
                    '&:hover': {
                      bgcolor: favorited ? 'error.dark' : 'rgba(239, 68, 68, 0.08)',
                    },
                  }}
                >
                  {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

                {/* Tablet & Desktop View: Full Text Button */}
                <Button
                  variant={favorited ? 'contained' : 'outlined'}
                  color="error"
                  startIcon={favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={() => toggleFavorite(movieData)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    display: { xs: 'none', sm: 'inline-flex' },
                  }}
                >
                  {favorited ? 'In Favorites' : 'Add to Favorites'}
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Movie Plot Overview */}
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                {movieData.overview || 'No synopsis overview available for this title.'}
              </Typography>

              {/* Cast Members */}
              {movieData.credits?.cast && movieData.credits.cast.length > 0 && (
                <Box sx={{ my: 3 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Top Cast
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      overflowX: 'auto',
                      pb: 1.5,
                      pt: 0.5,
                      '&::-webkit-scrollbar': { height: 6 },
                      '&::-webkit-scrollbar-thumb': {
                        bgcolor: 'rgba(0,0,0,0.2)',
                        borderRadius: 3,
                      },
                    }}
                  >
                    {movieData.credits.cast.slice(0, 10).map((actor) => (
                      <CastCard key={actor.id} actor={actor} />
                    ))}
                  </Box>
                </Box>
              )}

              {/* YouTube Video Trailer */}
              {trailerKey ? (
                <Box ref={trailerRef} sx={{ my: 3 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Official Trailer
                  </Typography>
                  <Box
                    sx={{
                      position: 'relative',
                      pb: '56.25%', // 16:9 aspect ratio
                      height: 0,
                      overflow: 'hidden',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title={`${movieData.title} Official Trailer`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic', my: 2 }}>
                  No video trailer available for this film.
                </Typography>
              )}
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;
