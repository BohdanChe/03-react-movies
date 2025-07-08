import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';
import { getImageUrl } from '../../services/movieService';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains(styles.backdrop)) onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickOutside);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
