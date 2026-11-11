import { useState } from "react";
import { products as initialProducts } from "../data/products";
import { categories as initialCategories } from "../data/categories";
import { orders as initialOrders } from "../data/orders";
import { users } from "../data/users";
import { formatPrice, getOrderStatusBadge } from "../utils/helpers";
import AdminSidebar from "../components/admin/AdminSidebar";
import StatCard from "../components/admin/StatCard";
import "../styles/AdminPage.css";
import AdminProducts from "../components/admin/AdminProducts";
import { useToast } from "../hooks/useToast";
import AdminCategories from "../components/admin/AdminCategories";
import AdminOrders from "../components/admin/AdminOrders";

function AdminPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const [productList, setProductList] = useState(initialProducts);
  const { showToast } = useToast();

  const toggleProductActive = (id) => {
    const product = productList.find((p) => p.id === id);
    setProductList(
      productList.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p,
      ),
    );
    showToast(
      `${product.name} ${product.isActive ? "disabled" : "enabled"}`,
      product.isActive ? "info" : "success",
    );
  };

  const addProduct = (data) => {
    const newProduct = {
      ...data,
      id: Math.max(...productList.map((p) => p.id)) + 1,
      isActive: true,
      isFeatured: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProductList([newProduct, ...productList]);
    showToast(`${newProduct.name} added`, "success");
  };

  const updateProduct = (updated) => {
    setProductList(productList.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`${updated.name} updated`, "success");
  };

  const addCategory = (data) => {
    const newCategory = {
      ...data,
      id: Math.max(...categoryList.map((c) => c.id)) + 1,
    };
    setCategoryList([...categoryList, newCategory]);
    showToast(`Category "${newCategory.name}" added`, "success");
  };

  const deleteCategory = (id) => {
    const category = categoryList.find((c) => c.id === id);
    setCategoryList(categoryList.filter((c) => c.id !== id));
    showToast(`Category "${category.name}" deleted`, "info");
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrderList(
      orderList.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o,
      ),
    );
    showToast(`${orderId} marked as ${newStatus}`, "success");
  };

  const [categoryList, setCategoryList] = useState(initialCategories);
  const [orderList, setOrderList] = useState(initialOrders);

  // ===== Derived stats =====
  const totalSales = orderList
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const lowStockProducts = productList.filter(
    (p) => p.isActive && p.stockQuantity <= 5,
  );
  const recentOrders = [...orderList]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="container admin-layout">
      <AdminSidebar activeSection={activeSection} onSelect={setActiveSection} />

      <div className="admin-content">
        {activeSection === "overview" && (
          <>
            <div className="admin-content__header">
              <h1>Dashboard</h1>
            </div>

            <div className="stats-grid">
              <StatCard icon="👥" label="Users" value={users.length} />
              <StatCard icon="📦" label="Products" value={productList.length} />
              <StatCard icon="🧾" label="Orders" value={orderList.length} />
              <StatCard
                icon="💰"
                label="Total Sales"
                value={formatPrice(totalSales)}
              />
            </div>

            <div className="admin-panels">
              <section className="card">
                <h2>Recent Orders (latest 5)</h2>
                <ul className="simple-list">
                  {recentOrders.map((order) => {
                    const badge = getOrderStatusBadge(order.status);
                    return (
                      <li key={order.id}>
                        <span>
                          {order.id} • {order.customerName}
                        </span>
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
                      <strong>
                        {p.stockQuantity === 0
                          ? "Out of stock"
                          : `${p.stockQuantity} left`}
                      </strong>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </>
        )}

        {activeSection === "products" && (
          <AdminProducts
            products={productList}
            categories={categoryList}
            onToggleActive={toggleProductActive}
            onAdd={addProduct}
            onUpdate={updateProduct}
          />
        )}
        {activeSection === "categories" && (
          <AdminCategories
            categories={categoryList}
            products={productList}
            onAdd={addCategory}
            onDelete={deleteCategory}
          />
        )}

        {activeSection === "orders" && (
          <AdminOrders orders={orderList} onStatusChange={updateOrderStatus} />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
