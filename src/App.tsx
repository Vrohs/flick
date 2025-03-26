import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import { searchMovies, getMovieDetails, MovieSearchResult, MovieDetails as MovieDetailsType } from './services/movieService';
import './App.css';

function App() {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleMovieClick = async (imdbID: string) => {
    try {
      const details = await getMovieDetails(imdbID);
      setSelectedMovie(details);
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
    }
  };

  useEffect(() => {

    const loadDefaultMovie = async () => {
      try {
        
        const details = await getMovieDetails('tt3896198');
        if (details) {
          setSelectedMovie(details);
        }
      } catch (err) {
        console.error('Failed to load default movie:', err);
      }
    };
    
    loadDefaultMovie();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Movie Collection Dashboard</h1>
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

        {selectedMovie && (
          <MovieDetails 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
