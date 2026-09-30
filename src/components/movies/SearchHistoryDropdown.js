import React from 'react';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

// SearchHistoryDropdown Component

const SearchHistoryDropdown = ({
  anchorEl,
  open,
  history = [],
  onSelectTerm,
  onRemoveTerm,
  onClearAll,
  onClose,
}) => {
  if (!open || history.length === 0) return null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      style={{
        width: anchorEl ? anchorEl.clientWidth : '100%',
        zIndex: 1400,
        marginTop: 6,
      }}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          {/* search header  Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
              bgcolor: 'action.hover',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HistoryIcon fontSize="small" color="primary" />
              <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Recent Searches
              </Typography>
            </Box>

            <Button
              size="small"
              onClick={onClearAll}
              startIcon={<DeleteIcon fontSize="small" />}
              sx={{
                textTransform: 'none',
                fontSize: '0.75rem',
                color: 'text.secondary',
                '&:hover': { color: 'error.main' },
              }}
            >
              Clear All
            </Button>
          </Box>

          {/* Show List of Recent Search Keywords */}
          <List disablePadding sx={{ maxHeight: 280, overflowY: 'auto' }}>
            {history.map((term, index) => (
              <ListItemButton
                key={`${term}-${index}`}
                onClick={() => onSelectTerm(term)}
                sx={{
                  px: 2,
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    bgcolor: 'action.selected',
                    '& .delete-btn': { opacity: 1 },
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, mr: 1 }}>
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1.5, flexShrink: 0 }} />
                  <ListItemText
                    primary={term}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      noWrap: true,
                    }}
                  />
                </Box>

                <IconButton
                  className="delete-btn"
                  size="small"
                  aria-label={`delete ${term} from search history`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTerm(term);
                  }}
                  sx={{
                    p: 0.5,
                    opacity: { xs: 1, sm: 0.7 },
                    transition: 'opacity 0.2s ease',
                    '&:hover': { color: 'error.main', opacity: 1 },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default SearchHistoryDropdown;
