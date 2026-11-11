import './EmptyState.css'

function EmptyState({ icon = '📭', title, message, children }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">{icon}</span>
      <h2 className="empty-state__title">{title}</h2>
      {message && <p className="empty-state__message">{message}</p>}
      {children}
    </div>
  );
}

export default EmptyState;