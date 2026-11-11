import { useState } from 'react'
import { products as initialProducts } from '../data/products'
import { categories as initialCategories } from '../data/categories'
import { orders as initialOrders } from '../data/orders'
import { users } from '../data/users'
import { formatPrice, getOrderStatusBadge } from '../utils/helpers'
import AdminSidebar from '../components/admin/AdminSidebar'
import StatCard from '../components/admin/StatCard'
import '../styles/AdminPage.css'

function AdminPage() {
  const [activeSection, setActiveSection] = useState('overview');

  // Local copies of the data (admin changes happen here only)
  const [productList] = useState(initialProducts);
  const [categoryList] = useState(initialCategories);
  const [orderList] = useState(initialOrders);

  // ===== Derived stats =====
  const totalSales = orderList
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const lowStockProducts = productList.filter((p) => p.isActive && p.stockQuantity <= 5);
  const recentOrders = [...orderList]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="container admin-layout">
      <AdminSidebar activeSection={activeSection} onSelect={setActiveSection} />

      <div className="admin-content">
        {activeSection === 'overview' && (
          <>
            <div className="admin-content__header">
              <h1>Dashboard</h1>
            </div>

            <div className="stats-grid">
              <StatCard icon="👥" label="Users" value={users.length} />
              <StatCard icon="📦" label="Products" value={productList.length} />
              <StatCard icon="🧾" label="Orders" value={orderList.length} />
              <StatCard icon="💰" label="Total Sales" value={formatPrice(totalSales)} />
            </div>

            <div className="admin-panels">
              <section className="card">
                <h2>Recent Orders</h2>
                <ul className="simple-list">
                  {recentOrders.map((order) => {
                    const badge = getOrderStatusBadge(order.status);
                    return (
                      <li key={order.id}>
                        <span>{order.id} • {order.customerName}</span>
                        <span className={`badge badge--${badge.type}`}>
                          {badge.icon} {order.status}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="card">
                <h2>⚠️ Low Stock ({lowStockProducts.length})</h2>
                <ul className="simple-list">
                  {lowStockProducts.map((p) => (
                    <li key={p.id}>
                      <span>{p.name}</span>
                      <strong>{p.stockQuantity === 0 ? 'Out of stock' : `${p.stockQuantity} left`}</strong>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </>
        )}

        {activeSection === 'products' && <h1>Products (next step)</h1>}
        {activeSection === 'categories' && <h1>Categories ({categoryList.length}) (coming soon)</h1>}
        {activeSection === 'orders' && <h1>Orders (coming soon)</h1>}
      </div>
    </div>
  );
}

export default AdminPage;