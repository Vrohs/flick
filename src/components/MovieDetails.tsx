interface MovieDetailsProps {
  movie: {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
  } | null;
  onClose: () => void;
}

const MovieDetails = ({ movie, onClose }: MovieDetailsProps) => {
  if (!movie) return null;
  
  return (
    <div className="movie-details-overlay">
      <div className="movie-details">
        <button className="close-button" onClick={onClose}>×</button>
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
    </div>
  );
};

export default MovieDetails;