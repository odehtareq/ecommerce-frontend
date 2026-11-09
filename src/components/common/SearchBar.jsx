import { useState } from 'react'
import { useNavigate } from 'react-router'
import './SearchBar.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    navigate(term ? `/products?search=${encodeURIComponent(term)}` : '/products');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="home-search" className="sr-only">Search products</label>
      <input
        id="home-search"
        type="search"
        className="input search-bar__input"
        placeholder="Search for headphones, laptops..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn--primary">Search</button>
    </form>
  );
}

export default SearchBar;