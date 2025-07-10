import axios from 'axios';
import type { Movie } from '../types/movie';


const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

interface TMDBResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
  
export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<TMDBResponse>(BASE_URL, {
    params: { query },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data.results;
};

export const getImageUrl = (
  path: string,
  size: 'w500' | 'original' = 'w500'
) => `${IMAGE_BASE_URL}/${size}${path}`;
