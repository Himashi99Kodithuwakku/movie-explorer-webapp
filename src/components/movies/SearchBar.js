import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Tooltip from '@mui/material/Tooltip';

import { useMovieContext } from '../../context/MovieContext';
import SearchHistoryDropdown from './SearchHistoryDropdown';


//SearchBar Component

const SearchBar = () => {
  const {
    searchQuery,
    executeSearch,
    showFilterBar,
    toggleFilterBar,
    searchHistory,
    removeFromSearchHistory,
    clearAllSearchHistory,
  } = useMovieContext();

  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  const [historyOpen, setHistoryOpen] = useState(false);
  const containerRef = useRef(null);

  // Keep local input synchronized with context
  useEffect(() => {
    setSearchTerm(searchQuery || '');
  }, [searchQuery]);

  // click on Enter key or Search movies 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      executeSearch(searchTerm.trim());
      setHistoryOpen(false);
    }
  };

  // Clear the search input keywrods 
  const handleClear = () => {
    setSearchTerm('');
    executeSearch('');
  };

  // Select a keywords from history dropdown
  const handleSelectTerm = (term) => {
    setSearchTerm(term);
    executeSearch(term);
    setHistoryOpen(false);
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          p: '4px 6px 4px 14px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',         /* Full width on mobile */
          borderRadius: 3,
          bgcolor: 'background.paper',
          boxSizing: 'border-box',
        }}
      >
        {/* Text Input Field */}
        <InputBase
          sx={{ flex: 1, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setHistoryOpen(true)}
          onClick={() => setHistoryOpen(true)}
          onTouchStart={() => setHistoryOpen(true)}
          inputProps={{ 'aria-label': 'search movies' }}
        />

        {/* Clear Button  ,only visible when there is text */}
        {searchTerm && (
          <Tooltip title="Clear search">
            <IconButton onClick={handleClear} sx={{ p: '8px', mr: 0.5 }} aria-label="clear">
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        {/* add "Search" Button next to search input */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          sx={{
            borderRadius: 2.5,
            px: { xs: 2, sm: 3 },
            py: 0.8,
            textTransform: 'none',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
            },
          }}
        >
          Search
        </Button>

        {/* Filter Icon Button next to search button */}
        <Tooltip title={showFilterBar ? "Hide Filters" : "Filter Movies"}>
          <IconButton
            onClick={toggleFilterBar}
            sx={{
              ml: 1,
              p: '8px',
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: showFilterBar ? 'primary.main' : 'divider',
              bgcolor: showFilterBar ? 'primary.main' : 'action.hover',
              color: showFilterBar ? '#fff' : 'text.primary',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: showFilterBar ? 'primary.dark' : 'action.selected',
                transform: 'scale(1.05)',
              },
            }}
            aria-label="toggle filter bar"
          >
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Recent Searches Dropdown  */}
      <SearchHistoryDropdown
        anchorEl={containerRef.current}
        open={historyOpen}
        history={searchHistory}
        onSelectTerm={handleSelectTerm}
        onRemoveTerm={removeFromSearchHistory}
        onClearAll={clearAllSearchHistory}
        onClose={() => setHistoryOpen(false)}
      />
    </Box>
  );
};

export default SearchBar;
