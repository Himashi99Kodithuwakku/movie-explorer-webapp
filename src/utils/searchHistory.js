const STORAGE_KEY = 'movie_search_history';
const MAX_ITEMS = 8;

// fetch search history array from localStorage

export const getSearchHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to parse search history:', err);
    return [];
  }
};

// Add a new search term to history in localStorage

export const addSearchTerm = (term) => {
  if (!term || !term.trim()) return getSearchHistory();
  const cleanTerm = term.trim();

  try {
    const current = getSearchHistory();
    // Filter out existing case insensitive duplicate
    const filtered = current.filter((item) => item.toLowerCase() !== cleanTerm.toLowerCase());
    // add new term to top of history
    const updated = [cleanTerm, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save search term:', err);
    return getSearchHistory();
  }
};

// Remove a single search term from history
export const removeSearchTerm = (term) => {
  try {
    const current = getSearchHistory();
    const updated = current.filter((item) => item.toLowerCase() !== term.toLowerCase());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to remove search term:', err);
    return getSearchHistory();
  }
};

//Clear all search history from localStorage

export const clearSearchHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear search history:', err);
  }
  return [];
};
