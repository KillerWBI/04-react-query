import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // предотвращаем перезагрузку страницы

    // Получаем данные формы
    const formData = new FormData(event.currentTarget);
    const query = (formData.get('query') as string)?.trim();

    if (query === '') {
      toast.error("Any types of text are not allowed");
      return;
    }
    onSearch(query);
  };

  return (
    <>
      <Toaster /> {/* показываем тосты */}
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form className={css.form} onSubmit={handleSubmit}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </>
  );
}
