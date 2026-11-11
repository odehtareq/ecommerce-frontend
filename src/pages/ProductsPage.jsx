import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { products } from '../data/products'
import { categories } from '../data/categories'
import { useSimulatedFetch } from '../hooks/useSimulatedFetch'
import ProductCard from '../components/products/ProductCard'
import ProductCardSkeleton from '../components/products/ProductCardSkeleton'
import EmptyState from '../components/common/EmptyState'
import '../styles/ProductsPage.css'

const PAGE_SIZE = 8;

function ProductsPage() {
  // ===== State in the URL =====
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';

  // Add ?simulateError=true to the URL to test the Error state
  const shouldFail = searchParams.get('simulateError') === 'true';
  const { isLoading, isError, retry } = useSimulatedFetch({ shouldFail });

  // ===== Local state =====
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  const resetPaging = () => setVisibleCount(PAGE_SIZE);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params, { replace: true });
    resetPaging();
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
    setMinPrice('');
    setMaxPrice('');
    setStockFilter('all');
    setSortBy('default');
    resetPaging();
  };

  const hasActiveFilters =
    search || category !== 'all' || minPrice || maxPrice ||
    stockFilter !== 'all' || sortBy !== 'default';

  // ===== 1. Filter =====
  const term = search.trim().toLowerCase();

  const filteredProducts = products
    .filter((p) => p.isActive)
    .filter((p) => p.name.toLowerCase().includes(term))
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => minPrice === '' || p.price >= Number(minPrice))
    .filter((p) => maxPrice === '' || p.price <= Number(maxPrice))
    .filter((p) => {
      if (stockFilter === 'in') return p.stockQuantity > 0;
      if (stockFilter === 'out') return p.stockQuantity === 0;
      return true;
    });

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

  // ===== 3. Paginate (Load More) =====
  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  return (
    <div className="container">
      <div className="products-header">
        <h1>All Products</h1>
        <button
          type="button"
          className="btn btn--secondary filters-toggle"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          aria-controls="products-filters"
        >
          {showFilters ? 'Hide Filters ✕' : 'Filters ☰'}
        </button>
      </div>

      {/* ===== Filters ===== */}
      <div
        id="products-filters"
        className={`products-toolbar ${showFilters ? 'products-toolbar--open' : ''}`}
      >
        <div className="field field--wide">
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
          <label htmlFor="min-price" className="field__label">Min Price ($)</label>
          <input
            id="min-price"
            type="number"
            min="0"
            className="input"
            placeholder="0"
            value={minPrice}
            onChange={(e) => { setMinPrice(e.target.value); resetPaging(); }}
          />
        </div>

        <div className="field">
          <label htmlFor="max-price" className="field__label">Max Price ($)</label>
          <input
            id="max-price"
            type="number"
            min="0"
            className="input"
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); resetPaging(); }}
          />
        </div>

        <div className="field">
          <label htmlFor="stock" className="field__label">Availability</label>
          <select
            id="stock"
            className="input"
            value={stockFilter}
            onChange={(e) => { setStockFilter(e.target.value); resetPaging(); }}
          >
            <option value="all">All</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
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

        <button
          type="button"
          className="btn btn--danger"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* ===== Results count ===== */}
      <div className="products-meta">
        <p className="products-count" aria-live="polite">
          {isLoading
            ? 'Loading products...'
            : `Showing ${visibleProducts.length} of ${sortedProducts.length} results`}
        </p>
      </div>

      {/* ===== Loading / Error / Results / Empty ===== */}
      {isLoading ? (
        <div className="product-grid" aria-busy="true" aria-label="Loading products">
          {Array.from({ length: PAGE_SIZE }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <EmptyState
          icon="⚠️"
          title="Something went wrong"
          message="We couldn't load the products. Please check your connection and try again."
        >
          <button type="button" className="btn btn--primary" onClick={retry}>
            ↻ Try Again
          </button>
        </EmptyState>
      ) : sortedProducts.length > 0 ? (
        <>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="load-more">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
              >
                Load More ({sortedProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon="🔍"
          title="No products found"
          message="Try a different search term or change the filters."
        >
          <button type="button" className="btn btn--primary" onClick={clearFilters}>
            Clear Filters
          </button>
        </EmptyState>
      )}
    </div>
  );
}

export default ProductsPage;