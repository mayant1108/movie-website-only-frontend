import './MovieCard.css'

export default function MovieCard({ movie, onOpen }) {
  return (
    <button className="movieCard" onClick={() => onOpen(movie)}>
      <div className="movieCard__posterWrap">
        <img
          className="movieCard__poster"
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
        />
      </div>
      <div className="movieCard__meta">
        <div className="movieCard__title">{movie.title}</div>
        <div className="movieCard__sub">
          {movie.year} • {movie.rating.toFixed(1)}⭐
        </div>
      </div>
    </button>
  )
}

