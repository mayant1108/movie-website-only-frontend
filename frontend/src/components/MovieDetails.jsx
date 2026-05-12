import { useEffect } from 'react'
import './MovieDetails.css'

export default function MovieDetails({ movie, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!movie) return null

  return (
    <div className="detailsOverlay" role="dialog" aria-modal="true">
      <div className="details">
        <button className="details__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="details__hero">
          <img className="details__backdrop" src={movie.backdrop} alt="" />
          <div className="details__heroShade" />
          <div className="details__heroInner">
            <img className="details__poster" src={movie.poster} alt={movie.title} />
            <div className="details__info">
              <h2 className="details__title">{movie.title}</h2>
              <div className="details__line">
                {movie.year} • {movie.rating.toFixed(1)}⭐
              </div>
              <div className="details__genres">
                {movie.genres.map((g) => (
                  <span key={g} className="genreChip">
                    {g}
                  </span>
                ))}
              </div>
              <p className="details__desc">{movie.description}</p>

              <div className="details__actions">
                {movie.trailerUrl ? (
                  <a
                    className="btn"
                    href={movie.trailerUrl.startsWith('https') ? movie.trailerUrl : '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch Trailer
                  </a>
                ) : (
                  <span className="btn btn--disabled">No trailer</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {movie.trailerUrl && (
          <div className="details__trailer">
            <div className="trailerFrame">
              <iframe
                src={movie.trailerUrl}
                title="Trailer"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
      <div className="detailsOverlay__bg" onClick={onClose} />
    </div>
  )
}

