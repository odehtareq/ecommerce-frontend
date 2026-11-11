import { useState } from 'react'
import { ToastContext } from './ToastContext'
import '../components/common/Toast.css'

const ICONS = { success: '✓', error: '✕', info: 'ℹ' };

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000); // auto-hide after 3s
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            <span className="toast__icon" aria-hidden="true">{ICONS[toast.type]}</span>
            <p className="toast__message">{toast.message}</p>
            <button
              type="button"
              className="toast__close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;