import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/products/ProductCard'
import EmptyState from '../components/common/EmptyState'
import '../styles/ProductsPage.css'

function ProductsPage() {
  // Search & category live in the URL (so links from home page work)
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';

  // Sort lives in local state
  const [sortBy, setSortBy] = useState('default');

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params, { replace: true });
  };

  // ===== 1. Filter =====
  const term = search.trim().toLowerCase();

  const filteredProducts = products
    .filter((p) => p.isActive)
    .filter((p) => p.name.toLowerCase().includes(term))
    .filter((p) => category === 'all' || p.category === category);

  // ===== 2. Sort (on a copy!) =====
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':   return a.name.localeCompare(b.name);
      case 'name-desc':  return b.name.localeCompare(a.name);
      case 'price-asc':  return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      default:           return 0;
    }
  });

  return (
    <div className="container">
      <h1>All Products</h1>

      {/* ===== Toolbar ===== */}
      <div className="products-toolbar">
        <div className="field">
          <label htmlFor="search" className="field__label">Search</label>
          <input
            id="search"
            type="search"
            className="input"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => updateParam('search', e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="category" className="field__label">Category</label>
          <select
            id="category"
            className="input"
            value={category}
            onChange={(e) => updateParam('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="sort" className="field__label">Sort by</label>
          <select
            id="sort"
            className="input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* ===== Results count ===== */}
      <p className="products-count" aria-live="polite">
        Showing {sortedProducts.length} of {products.length} products
      </p>

      {/* ===== Results or Empty ===== */}
      {sortedProducts.length > 0 ? (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No products found"
          message="Try a different search term or change the filters."
        />
      )}
    </div>
  );
}

export default ProductsPage;