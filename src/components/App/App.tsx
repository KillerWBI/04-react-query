
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import { Loader } from '../Loader/Loader';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { SearchBar } from '../SearchBar/SearchBar';
import './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);
  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoading(true);
    const result = await fetchMovies(query);
    setLoading(false);
    if (result.length === 0) {
      toast.error("No movies found for your request.");
    }

    setMovies(result);
    console.log(movies);
  };

  const handleSelect = (movie: Movie) => {
    setModalMovie(movie);
    toast.success(`You selected: ${modalMovie}`);
  };



  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      <main>
        {loading && <Loader />}
      <MovieGrid movies={movies} onSelect={handleSelect}/>
      </main>
    </>
  );
}
