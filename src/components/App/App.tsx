
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { MovieModal } from '../MovieModal/MovieModal';
import { SearchBar } from '../SearchBar/SearchBar';
import './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);

  const [error, setError] = useState(false);


  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false);
    setLoading(true);
    const result = await fetchMovies(query);
    setLoading(false);
    if (result.length === 0) {
      toast.error("No movies found for your request.");
      setError(true);
      return;
    }
    setMovies(result);
  };

  const handleSelect = (movie: Movie) => {
    setModalMovie(movie);
  };

const closeModal = () => {
  setModalMovie(null);
}


  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      <main>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal}/>}
      <MovieGrid movies={movies} onSelect={handleSelect}/>
      </main>
    </>
  );
}
