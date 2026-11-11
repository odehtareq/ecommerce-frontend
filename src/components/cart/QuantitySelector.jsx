import './QuantitySelector.css'

function QuantitySelector({ value, min = 1, max, onChange }) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="qty">
      <button
        type="button"
        className="qty__btn"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="qty__value" aria-live="polite">{value}</span>

      <button
        type="button"
        className="qty__btn"
        onClick={increase}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;