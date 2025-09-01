import axios from 'axios';
import type { Movie } from '../types/movie';

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const response = await axios.get<{ results: Movie[] }>(BASE_URL, {
      params: { query },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}
export function getImageUrl(path: string): string {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  return `${IMAGE_URL}${path}`;
}
