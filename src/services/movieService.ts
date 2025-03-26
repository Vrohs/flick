const API_KEY = 'c3fe1e5e';
const API_URL = 'http://www.omdbapi.com/';

export interface MovieSearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails {
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
  imdbID: string;
}

export const searchMovies = async (searchTerm: string): Promise<MovieSearchResult[]> => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${searchTerm}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data.Search || [];
    }
    return [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data;
    }
    return null;
  } catch (error) {
    console.error('Error getting movie details:', error);
    return null;
  }
};