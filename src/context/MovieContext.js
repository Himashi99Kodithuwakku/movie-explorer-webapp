import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTrendingMovies, getPopularMovies, searchMovies, getGenres } from '../api/tmdb';
import {
  getSearchHistory,
  addSearchTerm,
  removeSearchTerm,
  clearSearchHistory,
} from '../utils/searchHistory';

// Create Movie Context object
const MovieContext = createContext();

// Custom hook to easily access Movie Context in components
export const useMovieContext = () => {
  return useContext(MovieContext);
};

// Movie Provider Component
export const MovieProvider = ({ children }) => {
  // Trending Movies state
  const [trendingMovies, setTrendingMovies] = useState([]);
  // Explore Movies state 
  const [exploreMovies, setExploreMovies] = useState([]);

  // Search query state - defaults to empty string on fresh load
  const [searchQuery, setSearchQuery] = useState('');

  // Search history state - loaded from localStorage
  const [searchHistory, setSearchHistory] = useState(() => getSearchHistory());

  // Search results state
  const [searchResults, setSearchResults] = useState([]);

  //  Favorites list state - stored in localStorage 
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteMovies');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  //  Genres list state
  const [genres, setGenres] = useState([]);

  // UI Loading and Error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  Filter state 
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [showFilterBar, setShowFilterBar] = useState(false);

  const toggleFilterBar = () => {
    setShowFilterBar((prev) => !prev);
  };

  // Clear any legacy cached search query from localStorage on mount
  useEffect(() => {
    localStorage.removeItem('lastSearchedMovie');
  }, []);

  // Save favorites to localStorage whenever favorites list changes
  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }, [favorites]);

  // Load official genre list 
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };
    loadGenres();
  }, []);

  // Function to fetch trending movies  & explore movies
  const fetchTrending = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      if (page === 1) {
        const trendingData = await getTrendingMovies(1);
        setTrendingMovies(trendingData.results || []);
        const popularData = await getPopularMovies(1);
        setExploreMovies(popularData.results || []);
      } else {
        const popularData = await getPopularMovies(page);
        setExploreMovies((prev) => [...prev, ...(popularData.results || [])]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  // Function to run search query
  const executeSearch = async (query, page = 1) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Save search term to history in localStorage
    const updatedHistory = addSearchTerm(query.trim());
    setSearchHistory(updatedHistory);

    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, page);
      const newResults = data.results || [];
      if (page === 1) {
        setSearchResults(newResults);
      } else {
        setSearchResults((prev) => [...prev, ...newResults]);
      }
    } catch (err) {
      setError(err.message || 'Failed to search movies.');
    } finally {
      setLoading(false);
    }
  };

  // Remove a single keywords from search history
  const removeFromSearchHistory = (term) => {
    const updated = removeSearchTerm(term);
    setSearchHistory(updated);
  };

  // Clear all search history
  const clearAllSearchHistory = () => {
    const updated = clearSearchHistory();
    setSearchHistory(updated);
  };

  // Function to add or remove movie from user favorites list
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === movie.id);
      if (exists) {
        // Remove from favorites
        return prevFavorites.filter((item) => item.id !== movie.id);
      } else {
        // Add to favorites
        return [...prevFavorites, movie];
      }
    });
  };

  // Check if a specific movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some((item) => item.id === movieId);
  };

  // Reset filters & search
  const resetFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setMinRating(0);
    setSearchQuery('');
    setSearchResults([]);
    localStorage.removeItem('lastSearchedMovie');
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        exploreMovies,
        searchQuery,
        searchResults,
        searchHistory,
        removeFromSearchHistory,
        clearAllSearchHistory,
        favorites,
        genres,
        loading,
        error,
        selectedGenre,
        setSelectedGenre,
        selectedYear,
        setSelectedYear,
        minRating,
        setMinRating,
        showFilterBar,
        setShowFilterBar,
        toggleFilterBar,
        fetchTrending,
        executeSearch,
        toggleFavorite,
        isFavorite,
        resetFilters,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
