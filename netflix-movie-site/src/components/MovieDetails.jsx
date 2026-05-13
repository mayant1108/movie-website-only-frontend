// src/components/MovieDetails.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { movies } from '../data/movies';
import './MovieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="details-error">
        <h2>Movie not found</h2>
        <Link to="/" className="back-home-btn">← Back to Home</Link>
      </div>
    );
  }

  const { title, year, rating, genre, poster, description } = movie;

  const renderFullRating = () => {
    const fullStars = Math.floor(rating / 2);
    const starDisplay = [];
    for (let i = 0; i < 5; i++) {
      starDisplay.push(
        <span key={i} className={`detail-star ${i < fullStars ? 'filled' : ''}`}>★</span>
      );
    }
    return (
      <div className="detail-rating-box">
        {starDisplay}
        <span className="detail-rating-value">{rating}/10</span>
      </div>
    );
  };

  return (
    <div className="details-page">
      <div className="details-backdrop" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${movie.poster})` }}></div>
      
      <div className="details-container container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        
        <div className="details-content">
          <div className="details-poster">
            <img src={movie.poster} alt={title} />
          </div>
          
          <div className="details-info">
            <h1 className="details-title">{title}</h1>
            <div className="details-meta">
              <span className="details-year">{year}</span>
              <span className="details-genre">{genre}</span>
              {renderFullRating()}
            </div>
            <p className="details-description">{description}</p>
            <Link to="/" className="home-action-btn">🏠 Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;