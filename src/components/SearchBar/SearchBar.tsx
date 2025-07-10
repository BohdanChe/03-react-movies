'use client'; // якщо це Next.js App Router (або просто для client-side логіки)

import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const action = async (formData: FormData) => {
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={action}>
          <input
            className={styles.input}
            type="text"
            name="query"
            placeholder="Search movies..."
            autoComplete="off"
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
