// src/pages/Home.jsx
import { useState, useMemo } from 'react';
import { movies } from '../data/movies';
import TopBar from '../components/TopBar';
import GenreBar from '../components/GenreBar';
import MovieCard from '../components/MovieCard';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Extract unique genres from movies data
  const genres = useMemo(() => {
    const uniqueGenres = ['All', ...new Set(movies.map(movie => movie.genre))];
    return uniqueGenres;
  }, []);

  // Filter movies based on search and genre
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <div className="home-container">
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <GenreBar 
        genres={genres} 
        selectedGenre={selectedGenre} 
        onSelectGenre={setSelectedGenre} 
      />
      <main className="main-content container">
        {filteredMovies.length === 0 ? (
          <div className="no-results">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h2>No movies found</h2>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="movies-grid">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;