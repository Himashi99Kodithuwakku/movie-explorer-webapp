import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '';

export const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
export const ORIGINAL_IMAGE_BASE_URL = process.env.REACT_APP_TMDB_ORIGINAL_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/original';

// Axios Instance Configuration
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the API key dynamically to every request
tmdbApi.interceptors.request.use((config) => {
  config.params = {
    api_key: process.env.REACT_APP_TMDB_API_KEY || API_KEY,
    ...config.params,
  };
  return config;
});

// Helper function to build full poster/backdrop image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) {
    // Fallback poster image placeholder
    return 'https://via.placeholder.com/500x750?text=No+Poster+Available';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

/**
 * Fetch Trending Movies for the week
 * @param {number} page
 */
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error(error.response?.data?.status_message || 'Failed to fetch trending movies.');
  }
};

/**
 * Fetch Popular / Explore Movies
 * @param {number} page
 */
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw new Error(error.response?.data?.status_message || 'Failed to fetch popular movies.');
  }
};

/**
 * Search movies by title query
 * @param {string} query
 * @param {number} page
 */
export const searchMovies = async (query, page = 1) => {
  if (!query || !query.trim()) {
    return { results: [], total_pages: 0, page: 1 };
  }

  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching movies for query "${query}":`, error);
    throw new Error(error.response?.data?.status_message || 'Failed to search movies.');
  }
};

/**
 * Fetch detailed info for a single movie (including genres, runtime, overview, rating)
 * @param {number|string} movieId
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw new Error(error.response?.data?.status_message || 'Failed to fetch movie details.');
  }
};

/**
 * Fetch video clips / trailers for a movie
 * @param {number|string} movieId
 */
export const getMovieVideos = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    return response.data?.results || [];
  } catch (error) {
    console.error(`Error fetching videos for movie ID ${movieId}:`, error);
    return [];
  }
};

/**
 * Fetch list of official movie genres
 */
export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data?.genres || [];
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export default tmdbApi;
