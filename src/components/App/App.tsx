import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { MovieModal } from '../MovieModal/MovieModal';
import { SearchBar } from '../SearchBar/SearchBar';
import css from './App.module.css';

export default function App() {
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });
const movies = useMemo(() => data?.results ?? [], [data?.results]);
const totalPages = data?.total_pages ?? 0;

useEffect(() => {
    if (isSuccess && movies.length === 0 && query) {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, movies, query]);

  const handleSearch = async (NewQuery: string) => {
      if (!NewQuery.trim()) {
        toast.error('Please enter your search query.');
        return;
      }

    setQuery(NewQuery);
    setPage(1);
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
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {totalPages > 1 && <ReactPaginate
	    pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
/>}

        {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal}/>}
      <MovieGrid movies={movies} onSelect={handleSelect}/>
      </main>
    </>
  );
}
