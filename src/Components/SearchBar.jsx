import { useState } from 'react';


function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', query);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search historical figures..."
      />
      <button type="submit">
        <i className="search-icon">🔍</i>
      </button>
    </form>
  );
}

export default SearchBar;