// src/components/TopBar.jsx
import { Link } from 'react-router-dom';
import './TopBar.css';

function TopBar({ searchTerm, setSearchTerm }) {
  return (
    <header className="topbar">
      <div className="topbar-container container">
        <Link to="/" className="logo-wrapper">
          <div className="logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">Cine<span className="highlight">Nest</span></span>
          </div>
        </Link>
        
        <div className="search-wrapper">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies, series..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search movies"
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;