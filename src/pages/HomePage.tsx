import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies, MovieSearchResult } from '../services/movieService';

const HomePage = () => {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    setError('');
    
    try {
      const results = await searchMovies(searchTerm);
      setMovies(results);
      if (results.length === 0) {
        setError('No movies found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to search movies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Flick</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="main-content">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              onClick={handleMovieClick} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;