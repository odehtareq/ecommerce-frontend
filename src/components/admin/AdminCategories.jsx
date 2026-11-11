import { useState } from 'react'
import FormField from '../forms/FormField'
import ConfirmDialog from '../common/ConfirmDialog'

function AdminCategories({ categories, products, onAdd, onDelete }) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const countProducts = (categoryName) =>
    products.filter((p) => p.category === categoryName).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError('Category name is required');
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('This category already exists');
      return;
    }

    onAdd({ name: trimmed, icon: icon.trim() || '🏷️' });
    setName('');
    setIcon('');
    setError('');
  };

  const confirmDelete = () => {
    onDelete(categoryToDelete.id);
    setCategoryToDelete(null);
  };

  return (
    <>
      <div className="admin-content__header">
        <h1>Categories ({categories.length})</h1>
      </div>

      <form className="card category-form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Category Name"
          id="category-name"
          placeholder="e.g. Cameras"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(''); }}
          error={error}
        />
        <FormField
          label="Icon (emoji)"
          id="category-icon"
          placeholder="📷"
          maxLength={4}
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <button type="submit" className="btn btn--primary">+ Add</button>
      </form>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">Icon</th>
              <th scope="col">Name</th>
              <th scope="col">Products</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const count = countProducts(category.name);
              return (
                <tr key={category.id}>
                  <td data-label="Icon"><span aria-hidden="true">{category.icon}</span></td>
                  <td data-label="Name">{category.name}</td>
                  <td data-label="Products">{count}</td>
                  <td data-label="Actions">
                    <button
                      type="button"
                      className="btn btn--sm btn--danger"
                      onClick={() => setCategoryToDelete(category)}
                      disabled={count > 0}
                      title={count > 0 ? 'Move or disable its products first' : undefined}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="admin-note">ℹ️ Categories that still have products can't be deleted.</p>

      <ConfirmDialog
        isOpen={categoryToDelete !== null}
        title="Delete category?"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setCategoryToDelete(null)}
      />
    </>
  );
}

export default AdminCategories;