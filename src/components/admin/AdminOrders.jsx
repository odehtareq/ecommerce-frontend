import { useState } from 'react'
import { ORDER_STATUSES } from '../../data/orders'
import { formatPrice, formatDate, getOrderStatusBadge } from '../../utils/helpers'
import FormField from '../forms/FormField'
import EmptyState from '../common/EmptyState'

function AdminOrders({ orders, onStatusChange }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(
    (o) => statusFilter === 'all' || o.status === statusFilter
  );

  const filterOptions = [
    { value: 'all', label: 'All Statuses' },
    ...ORDER_STATUSES.map((s) => ({ value: s, label: s })),
  ];

  return (
    <>
      <div className="admin-content__header">
        <h1>Orders ({filteredOrders.length})</h1>
      </div>

      <div className="admin-filters admin-filters--single">
        <FormField
          label="Filter by status"
          id="order-status-filter"
          options={filterOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <EmptyState icon="🧾" title="No orders" message="No orders match this status." />
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Customer</th>
                <th scope="col">Date</th>
                <th scope="col">Items</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const badge = getOrderStatusBadge(order.status);
                const itemsCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
                return (
                  <tr key={order.id}>
                    <td data-label="Order"><strong>{order.id}</strong></td>
                    <td data-label="Customer">{order.customerName}</td>
                    <td data-label="Date">{formatDate(order.date)}</td>
                    <td data-label="Items">{itemsCount}</td>
                    <td data-label="Total">{formatPrice(order.total)}</td>
                    <td data-label="Status">
                      <span className={`badge badge--${badge.type}`}>
                        {badge.icon} {order.status}
                      </span>
                    </td>
                    <td data-label="Change Status">
                      <label htmlFor={`status-${order.id}`} className="sr-only">
                        Change status for {order.id}
                      </label>
                      <select
                        id={`status-${order.id}`}
                        className="input status-select"
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value)}
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AdminOrders;