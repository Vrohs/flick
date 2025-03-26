interface MovieCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
  };
  onClick: (id: string) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : '/src/assets/no-image.png'} 
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;