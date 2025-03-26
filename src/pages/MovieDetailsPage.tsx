import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, MovieDetails } from '../services/movieService';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const details = await getMovieDetails(id);
        setMovie(details);
        if (!details) {
          setError('Movie details not found');
        }
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error('Failed to fetch movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  return (
    <div className="movie-details-page">
      <header className="movie-details-header">
        <button className="back-button" onClick={handleBack}>← Back</button>
        <h1>Flick</h1>
      </header>

      <div className="movie-details-content">
        <div className="movie-poster-container">
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : '/src/assets/no-image.png'} 
            alt={movie.Title} 
            className="movie-details-poster"
          />
        </div>
        <div className="movie-info-container">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Rating:</strong> {movie.imdbRating}/10</p>
          <p><strong>Rated:</strong> {movie.Rated}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writers:</strong> {movie.Writer}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <div className="movie-plot">
            <strong>Plot:</strong>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;