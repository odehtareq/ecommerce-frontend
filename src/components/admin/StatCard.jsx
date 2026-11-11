function StatCard({ icon, label, value }) {
  return (
    <div className="card stat-card">
      <span className="stat-card__icon" aria-hidden="true">{icon}</span>
      <div>
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;