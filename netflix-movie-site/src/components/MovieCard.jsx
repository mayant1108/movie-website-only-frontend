// Updated src/components/MovieCard.jsx - with play button and modal
import { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoModal from './VideoModal';
import './MovieCard.css';

function MovieCard({ movie }) {
  const { id, title, year, rating, genre, poster, trailerId } = movie;
  const [showTrailer, setShowTrailer] = useState(false);

  const renderRating = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue / 2);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return (
      <div className="rating-stars" title={`${ratingValue}/10`}>
        {stars}
        <span className="rating-number">{ratingValue}</span>
      </div>
    );
  };

  const handlePlayClick = (e) => {
    e.preventDefault(); // Prevent navigation to details page
    setShowTrailer(true);
  };

  return (
    <>
      <div className="movie-card-wrapper">
        <div className="movie-card">
          <div className="card-poster">
            <Link to={`/movie/${id}`}>
              <img 
                src={poster} 
                alt={`${title} poster`} 
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=No+Poster";
                }}
              />
            </Link>
            <button className="play-button-overlay" onClick={handlePlayClick} aria-label="Play trailer">
              ▶
            </button>
            <div className="card-overlay">
              <span className="quick-view">Quick View</span>
            </div>
          </div>
          <div className="card-info">
            <Link to={`/movie/${id}`} className="movie-title-link">
              <h3 className="movie-title">{title}</h3>
            </Link>
            <div className="meta-info">
              <span className="movie-year">{year}</span>
              <span className="movie-genre">{genre}</span>
            </div>
            {renderRating(rating)}
          </div>
        </div>
      </div>
      {showTrailer && <VideoModal trailerId={trailerId} onClose={() => setShowTrailer(false)} />}
    </>
  );
}

export default MovieCard;