import { getImageUrl } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) return ;

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={css.card}
            onClick={() => onSelect(movie)}
          >
            <img
              className={css.image}
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
