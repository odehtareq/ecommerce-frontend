import { useState } from 'react'
import { validateProduct } from '../../utils/validation'
import FormField from '../forms/FormField'

const EMPTY_PRODUCT = {
  name: '',
  category: '',
  price: '',
  stockQuantity: '',
  image: '',
  description: '',
};

function ProductForm({ product, categories, onSubmit, onCancel }) {
  const isEditing = Boolean(product);

  // Inputs work with strings, so convert numbers to strings first
  const [values, setValues] = useState(
    isEditing
      ? {
          name: product.name,
          category: product.category,
          price: String(product.price),
          stockQuantity: String(product.stockQuantity),
          image: product.image,
          description: product.description,
        }
      : EMPTY_PRODUCT
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateProduct(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      name: values.name.trim(),
      category: values.category,
      price: Number(values.price),
      stockQuantity: Number(values.stockQuantity),
      image: values.image.trim(),
      description: values.description.trim(),
    });
  };

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    ...categories.map((c) => ({ value: c.name, label: c.name })),
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormField
        label="Product Name"
        id="product-name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />

      <FormField
        label="Category"
        id="product-category"
        name="category"
        options={categoryOptions}
        value={values.category}
        onChange={handleChange}
        error={errors.category}
      />

      <div className="form-row">
        <FormField
          label="Price ($)"
          id="product-price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
        />
        <FormField
          label="Stock"
          id="product-stock"
          name="stockQuantity"
          type="number"
          min="0"
          step="1"
          value={values.stockQuantity}
          onChange={handleChange}
          error={errors.stockQuantity}
        />
      </div>

      <FormField
        label="Image URL"
        id="product-image"
        name="image"
        placeholder="https://placehold.co/400x300?text=Product"
        value={values.image}
        onChange={handleChange}
        error={errors.image}
      />

      <FormField
        label="Description (optional)"
        id="product-description"
        name="description"
        value={values.description}
        onChange={handleChange}
      />

      <div className="confirm-actions">
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;