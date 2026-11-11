import { Link } from 'react-router'
import { formatPrice } from '../../utils/helpers'
import QuantitySelector from './QuantitySelector'
import './CartItem.css'

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <li className="cart-item">
      <img className="cart-item__image" src={item.image} alt={item.name} />

      <div className="cart-item__info">
        <Link to={`/products/${item.id}`} className="cart-item__name">{item.name}</Link>
        <p className="cart-item__price">{formatPrice(item.price)} each</p>
        {item.quantity >= item.stockQuantity && (
          <p className="cart-item__limit">Max available quantity reached</p>
        )}
      </div>

      <QuantitySelector
        value={item.quantity}
        max={item.stockQuantity}
        onChange={(newQty) => onQuantityChange(item.id, newQty)}
      />

      <p className="cart-item__subtotal">{formatPrice(item.price * item.quantity)}</p>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(item)}
        aria-label={`Remove ${item.name} from cart`}
      >
        🗑️
      </button>
    </li>
  );
}

export default CartItem;