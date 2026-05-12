import './TopBar.css'

export default function TopBar({
  title = 'MovieBox',
  query,
  onQueryChange,
  activeGenre,
  onClearFilters,
}) {
  return (
    <header className="topbar">
      <div className="brand">{title}</div>

      <div className="topbar__right">
        <input
          className="topbar__search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
        />

        {(activeGenre || query.trim().length > 0) && (
          <button className="topbar__clear" onClick={onClearFilters}>
            Clear
          </button>
        )}
      </div>
    </header>
  )
}

