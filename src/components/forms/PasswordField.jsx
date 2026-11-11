import { useState } from 'react'
import './PasswordField.css'

function PasswordField({ label, id, error, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">{label}</label>

      <div className="password-field">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          className={`input ${error ? 'input--error' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
        >
          {isVisible ? '🙈' : '👁️'}
        </button>
      </div>

      {error && <p id={errorId} className="field__error">⚠ {error}</p>}
    </div>
  );
}

export default PasswordField;