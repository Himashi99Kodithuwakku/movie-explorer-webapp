import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
// import KeyIcon from '@mui/icons-material/Key';

import SearchBar from '../components/movies/SearchBar';
import FilterBar from '../components/movies/FilterBar';
import TrendingMovies from '../components/movies/TrendingMovies';
import MovieGrid from '../components/movies/MovieGrid';
import MovieDetailsModal from '../components/movies/MovieDetailsModal';
import { useMovieContext } from '../context/MovieContext';

// Home Page Component

const Home = () => {
    const {
        trendingMovies,
        exploreMovies,
        searchResults,
        searchQuery,
        loading,
        error,
        showFilterBar,
        fetchTrending,
        executeSearch,
    } = useMovieContext();

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);


    // Fetch initial trending movies or restore search 
    useEffect(() => {
        if (searchQuery) {
            executeSearch(searchQuery);
        } else {
            fetchTrending(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Open details modal when a movie card is clicked
    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    // Close details modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    // Load More movies 
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        if (searchQuery) {
            executeSearch(searchQuery, nextPage);
        } else {
            fetchTrending(nextPage);
        }
        // scroll down smoothly, so newly loaded movies scroll into view
        setTimeout(() => {
            window.scrollBy({ top: 320, behavior: 'smooth' });
        }, 350);
    };

    // check whether to display search results or explore movies
    const isSearching = Boolean(searchQuery && searchQuery.trim());

    // Filter out top trending movies from the grid below so no duplicate movies appear
    const trendingIds = new Set(trendingMovies.map((m) => m.id));
    const baseExploreList = exploreMovies.length > 0 ? exploreMovies : trendingMovies;
    const uniqueExploreMovies = baseExploreList.filter((movie) => !trendingIds.has(movie.id));

    const displayMovies = isSearching ? searchResults : uniqueExploreMovies;

    return (
        <Container maxWidth="xl" disableGutters sx={{ pt: 0, pb: 8 }}>
            {/* home page banner*/}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: '340px', sm: '420px', md: '500px' },
                    overflow: 'hidden',
                    mb: { xs: 3, sm: 4 },
                }}
            >
                {/* Banner background image */}
                <Box
                    component="img"
                    src={process.env.PUBLIC_URL + '/images/movie banner.png'}
                    alt="Movie Explorer Banner"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                    }}
                />

                {/* Dark gradient overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.65) 100%)',
                    }}
                />

                {/*  glass card with heading with search bar */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: { xs: 2, sm: 4 },
                    }}
                >
                    <Box
                        sx={{
                            // backdropFilter: 'blur(16px)',
                            // WebkitBackdropFilter: 'blur(16px)',
                            backgroundColor: 'rgba(0,0,0,0.40)',
                            // borderRadius: 4,
                            px: { xs: 3, sm: 6 },
                            py: { xs: 3, sm: 4 },
                            textAlign: 'center',
                            maxWidth: '800px',
                            width: '100%',
                            border: '1px solid rgba(255,255,255,0.13)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '1.7rem', sm: '2.4rem', md: '3rem' },
                                mb: 1,
                                color: '#fff',
                                textShadow: '0 2px 14px rgba(0,0,0,0.8)',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Discover Your Favorite Films
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: '0.9rem', sm: '1.05rem' },
                                color: 'rgba(255,255,255,0.82)',
                                mb: 3,
                            }}
                        >
                            Search millions of movies, view ratings, genres, plot overview, and watch trailers
                        </Typography>

                        {/* Search bar embedded inside the banner */}
                        <SearchBar />
                    </Box>
                </Box>
            </Box>

            {/* Filter Bar Component */}
            <Collapse in={showFilterBar}>
                <Box sx={{ px: { xs: 2, sm: 3 } }}>
                    <FilterBar />
                </Box>
            </Collapse>

            {/* Trending Movies Card Component (under Filter section) */}
            <Box sx={{ px: { xs: 2, sm: 3 } }}>
                {!isSearching && <TrendingMovies onSelectMovie={handleSelectMovie} />}
            </Box>

            {/* Section Header & Movie Grid */}
            <Box sx={{ px: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: isSearching ? 4 : 2, mb: 2 }}>
                    {isSearching ? (
                        <>
                            <SearchIcon color="primary" sx={{ fontSize: { xs: 24, sm: 32 } }} />
                            <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                                Search Results for "{searchQuery}"
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                            All Explore Movies
                        </Typography>
                    )}
                </Box>

                <MovieGrid
                    movies={displayMovies}
                    loading={loading}
                    error={error}
                    onSelectMovie={handleSelectMovie}
                />
            </Box>

            {/* Load More Pagination Button */}
            {!loading && displayMovies.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: { xs: 2, sm: 3 } }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleLoadMore}
                        sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 700, textTransform: 'none', width: { xs: '100%', sm: 'auto' } }}
                    >
                        Load More Movies
                    </Button>
                </Box>
            )}

            {/* Movie Details Modal */}
            <MovieDetailsModal movie={selectedMovie} open={modalOpen} onClose={handleCloseModal} />
        </Container>
    );
};

export default Home;
