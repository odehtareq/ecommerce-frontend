import { useState } from 'react'
import { formatPrice, getStockStatus } from '../../utils/helpers'
import FormField from '../forms/FormField'
import ConfirmDialog from '../common/ConfirmDialog'
import EmptyState from '../common/EmptyState'

function AdminProducts({ products, categories, onToggleActive }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [productToDisable, setProductToDisable] = useState(null);

  const term = search.trim().toLowerCase();
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(term))
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => {
      if (status === 'active') return p.isActive;
      if (status === 'disabled') return !p.isActive;
      return true;
    });

  const handleToggle = (product) => {
    if (product.isActive) {
      setProductToDisable(product); // ask first before disabling
    } else {
      onToggleActive(product.id);   // enabling doesn't need confirmation
    }
  };

  const confirmDisable = () => {
    onToggleActive(productToDisable.id);
    setProductToDisable(null);
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((c) => ({ value: c.name, label: c.name })),
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'disabled', label: 'Disabled' },
  ];

  return (
    <>
      <div className="admin-content__header">
        <h1>Products ({filteredProducts.length})</h1>
      </div>

      <div className="admin-filters">
        <FormField
          label="Search"
          id="admin-search"
          type="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormField
          label="Category"
          id="admin-category"
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <FormField
          label="Status"
          id="admin-status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState icon="🔍" title="No products found" message="Try changing the search or filters." />
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stock = getStockStatus(product.stockQuantity);
                return (
                  <tr key={product.id} className={product.isActive ? '' : 'is-disabled'}>
                    <td data-label="Product">
                      <span className="admin-table__product">
                        <img src={product.image} alt="" />
                        {product.name}
                      </span>
                    </td>
                    <td data-label="Category">{product.category}</td>
                    <td data-label="Price">{formatPrice(product.price)}</td>
                    <td data-label="Stock">
                      <span className={`badge badge--${stock.type}`}>{product.stockQuantity}</span>
                    </td>
                    <td data-label="Status">
                      <span className={`badge ${product.isActive ? 'badge--in' : 'badge--out'}`}>
                        {product.isActive ? '● Active' : '○ Disabled'}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="table-actions">
                        <button
                          type="button"
                          className={`btn btn--sm ${product.isActive ? 'btn--danger' : 'btn--secondary'}`}
                          onClick={() => handleToggle(product)}
                        >
                          {product.isActive ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={productToDisable !== null}
        title="Disable product?"
        message={`"${productToDisable?.name}" will be hidden from the store. You can enable it again later.`}
        confirmText="Disable"
        onConfirm={confirmDisable}
        onCancel={() => setProductToDisable(null)}
      />
    </>
  );
}

export default AdminProducts;