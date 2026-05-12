import { useMemo, useState } from 'react'
import { movies } from './data/movies'
import TopBar from './components/TopBar'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import GenreBar from './components/GenreBar'
import './App.css'

function uniqueGenres(list) {
  const set = new Set()
  list.forEach((m) => (m.genres || []).forEach((g) => set.add(g)))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

function normalize(s) {
  return (s || '').toLowerCase().trim()
}

export default function App() {
  const [query, setQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortKey, setSortKey] = useState('rating')

  const genres = useMemo(() => uniqueGenres(movies), [])

  const filtered = useMemo(() => {
    const q = normalize(query)
    let list = movies

    if (activeGenre) list = list.filter((m) => m.genres.includes(activeGenre))
    if (q) list = list.filter((m) => normalize(m.title).includes(q))

    const sorted = [...list]
    sorted.sort((a, b) => {
      if (sortKey === 'rating') return b.rating - a.rating
      if (sortKey === 'year') return b.year - a.year
      if (sortKey === 'title') return a.title.localeCompare(b.title)
      return 0
    })
    return sorted
  }, [query, activeGenre, sortKey])

  const featured = useMemo(() => {
    return [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4)
  }, [])

  const onClearFilters = () => {
    setQuery('')
    setActiveGenre(null)
    setSortKey('rating')
  }

  return (
    <div className="appRoot">
      <TopBar
        title="MovieBox"
        query={query}
        onQueryChange={setQuery}
        activeGenre={activeGenre}
        onClearFilters={onClearFilters}
      />

      <main className="container">
        <section className="hero">
          <div className="hero__copy">
            <h1 className="hero__title">Discover movies online</h1>
            <p className="hero__subtitle">
              Search, filter by genre, and open details with trailer.
            </p>
          </div>
          <div className="hero__controls">
            <label className="sortLabel">
              Sort by
              <select
                className="sortSelect"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="year">Year</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        </section>

        <section className="featured">
          <div className="sectionHead">
            <h2>Top picks</h2>
          </div>
          <div className="grid grid--4">
            {featured.map((m) => (
              <MovieCard key={m.id} movie={m} onOpen={setSelectedMovie} />
            ))}
          </div>
        </section>

        <section className="filters">
          <div className="sectionHead">
            <h2>Genres</h2>
          </div>
          <GenreBar
            genres={genres}
            activeGenre={activeGenre}
            onSelectGenre={(g) => setActiveGenre(g)}
          />
        </section>

        <section className="catalog">
          <div className="sectionHead sectionHead--row">
            <h2>All movies</h2>
            <div className="results">{filtered.length} results</div>
          </div>

          <div className="grid grid--4">
            {filtered.map((m) => (
              <MovieCard key={m.id} movie={m} onOpen={setSelectedMovie} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="emptyState">
              No movies found. Try another search or clear filters.
            </div>
          )}
        </section>
      </main>

      <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  )
}

