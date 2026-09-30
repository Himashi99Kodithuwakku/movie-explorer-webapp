import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import { getImageUrl } from '../../api/tmdb';

// CastCard Component

const CastCard = ({ actor }) => {
  if (!actor) return null;

  // get cast profile photo 
  const profileUrl = actor.profile_path
    ? getImageUrl(actor.profile_path, 'w185')
    : null;

  return (
    <Card
      elevation={2}
      sx={{
        width: 115,
        minWidth: 115,
        borderRadius: 2.5,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/*  Cast Profile Photo */}
      {profileUrl ? (
        <CardMedia
          component="img"
          height="135"
          image={profileUrl}
          alt={actor.name}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 135,
            bgcolor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
          }}
        >
          <PersonIcon sx={{ fontSize: 45 }} />
        </Box>
      )}

      {/*  Cast Info - Real Name & Character Name */}
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        {/* Real Actor Name */}
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: '0.82rem',
            lineHeight: 1.2,
            color: 'text.primary',
            mb: 0.3,
          }}
        >
          {actor.name}
        </Typography>

        {/* Character  Name */}
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: 'text.secondary',
            fontSize: '0.72rem',
            lineHeight: 1.2,
          }}
        >
          {actor.character || 'Character N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CastCard;
