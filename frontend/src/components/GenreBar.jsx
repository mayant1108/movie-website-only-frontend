import './GenreBar.css'

export default function GenreBar({ genres, activeGenre, onSelectGenre }) {
  return (
    <div className="genreBar" role="group" aria-label="Filter by genre">
      {genres.map((g) => (
        <button
          key={g}
          className={`genreBar__chip ${activeGenre === g ? 'isActive' : ''}`}
          onClick={() => onSelectGenre(g)}
        >
          {g}
        </button>
      ))}
    </div>
  )
}

