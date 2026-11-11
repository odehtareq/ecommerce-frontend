import './AdminSidebar.css'

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'products', label: 'Products', icon: '📦' },
  { id: 'categories', label: 'Categories', icon: '🏷️' },
  { id: 'orders', label: 'Orders', icon: '🧾' },
];

function AdminSidebar({ activeSection, onSelect }) {
  return (
    <nav className="admin-sidebar" aria-label="Admin navigation">
      <p className="admin-sidebar__title">Admin Panel</p>
      <ul>
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className={`admin-sidebar__link ${activeSection === section.id ? 'admin-sidebar__link--active' : ''}`}
              onClick={() => onSelect(section.id)}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              <span aria-hidden="true">{section.icon}</span> {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AdminSidebar;