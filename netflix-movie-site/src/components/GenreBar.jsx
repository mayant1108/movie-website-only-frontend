// src/components/GenreBar.jsx
import './GenreBar.css';

function GenreBar({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-section">
      <div className="genre-container container">
        <div className="genre-list">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-chip ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => onSelectGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreBar;