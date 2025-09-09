import axios from 'axios';
import toast from 'react-hot-toast';
import type { Movie } from '../types/movie';
export interface MovieApiResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function fetchMovies(query: string, page: number): Promise<MovieApiResponse> {
  try {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const response = await axios.get<MovieApiResponse>(BASE_URL, {
      params: {
        query,
        page

      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });
   if (!response.data.results.length) {
      toast.error('No results found.');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
}
export function getImageUrl(path: string): string {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  return `${IMAGE_URL}${path}`;
}
