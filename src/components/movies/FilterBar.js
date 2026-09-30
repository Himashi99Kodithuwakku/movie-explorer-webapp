import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

import { useMovieContext } from '../../context/MovieContext';


// FilterBar Component

const FilterBar = () => {
  const {
    genres,
    selectedGenre,
    setSelectedGenre,
    selectedYear,
    setSelectedYear,
    minRating,
    setMinRating,
    resetFilters,
  } = useMovieContext();

  // Generate array of release years from current year down to 1980
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, index) => currentYear - index);

  // Check if any filter is currently applied
  const isFiltered = selectedGenre || selectedYear || minRating > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 720,
        mx: 'auto',
        gap: { xs: 0.8, sm: 2 },
        my: 2,
        p: { xs: 1, sm: 2 },
        bgcolor: 'background.paper',
        // borderRadius: 3,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        border: '1px solid',
        borderColor: 'divider',
        boxSizing: 'border-box',
      }}
    >
      {/* Icon / Label Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
        {/* <FilterAltIcon color="primary" sx={{ fontSize: { xs: 20, sm: 24 } }} /> */}
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{ display: { xs: 'none', md: 'inline' }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          Filters:
        </Typography>
      </Box>

      {/* Movie Genre Dropdown Filter */}
      <FormControl
        size="small"
        sx={{
          flex: 1,
          minWidth: 0,
          '& .MuiInputBase-root': {
            borderRadius: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          },
          '& .MuiSelect-select': {
            py: { xs: 0.6, sm: 1 },
            px: { xs: 0.8, sm: 1.5 },
          },
        }}
      >
        <InputLabel id="genre-select-label" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Genre
        </InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={selectedGenre}
          label="Genre"
          onChange={(e) => setSelectedGenre(e.target.value)}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <MovieFilterIcon color="primary" sx={{ fontSize: { xs: 16, sm: 20 } }} />
            </InputAdornment>
          }
        >
          <MenuItem value="">
            <em>All Genres</em>
          </MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id} sx={{ fontSize: '0.85rem' }}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Movie Release Year Dropdown Filter */}
      <FormControl
        size="small"
        sx={{
          flex: 1,
          minWidth: 0,
          '& .MuiInputBase-root': {
            borderRadius: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          },
          '& .MuiSelect-select': {
            py: { xs: 0.6, sm: 1 },
            px: { xs: 0.8, sm: 1.5 },
          },
        }}
      >
        <InputLabel id="year-select-label" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Year
        </InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          label="Year"
          onChange={(e) => setSelectedYear(e.target.value)}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <CalendarMonthIcon color="primary" sx={{ fontSize: { xs: 16, sm: 20 } }} />
            </InputAdornment>
          }
        >
          <MenuItem value="">
            <em>All Years</em>
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year.toString()} sx={{ fontSize: '0.85rem' }}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Minimum  movie Rating Dropdown Filter*/}
      <FormControl
        size="small"
        sx={{
          flex: 1,
          minWidth: 0,
          '& .MuiInputBase-root': {
            borderRadius: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          },
          '& .MuiSelect-select': {
            py: { xs: 0.6, sm: 1 },
            px: { xs: 0.8, sm: 1.5 },
          },
        }}
      >
        <InputLabel id="rating-select-label" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Rating
        </InputLabel>
        <Select
          labelId="rating-select-label"
          id="rating-select"
          value={minRating}
          label="Rating"
          onChange={(e) => setMinRating(Number(e.target.value))}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <StarBorderPurple500Icon sx={{ color: '#f5c518', fontSize: { xs: 16, sm: 20 } }} />
            </InputAdornment>
          }
        >
          <MenuItem value={0}>
            <em>All Ratings</em>
          </MenuItem>
          <MenuItem value={8} sx={{ fontSize: '0.85rem' }}>⭐ 8+ Stars</MenuItem>
          <MenuItem value={7} sx={{ fontSize: '0.85rem' }}>⭐ 7+ Stars</MenuItem>
          <MenuItem value={6} sx={{ fontSize: '0.85rem' }}>⭐ 6+ Stars</MenuItem>
          <MenuItem value={5} sx={{ fontSize: '0.85rem' }}>⭐ 5+ Stars</MenuItem>
        </Select>
      </FormControl>

      {/* 4. Reset Filters Button */}
      {isFiltered && (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={resetFilters}
          title="Reset Filters"
          sx={{
            minWidth: { xs: 34, sm: 'auto' },
            px: { xs: 0.8, sm: 2 },
            py: { xs: 0.5, sm: 0.8 },
            height: { xs: 32, sm: 38 },
            borderRadius: 2,
            flexShrink: 0,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: { xs: '0.7rem', sm: '0.85rem' },
            whiteSpace: 'nowrap',
            '& .MuiButton-startIcon': {
              mr: { xs: 0, sm: 0.8 },
              ml: { xs: 0, sm: -0.5 },
            },
          }}
          startIcon={<RestartAltIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Reset
          </Box>
        </Button>
      )}
    </Box>
  );
};

export default FilterBar;
