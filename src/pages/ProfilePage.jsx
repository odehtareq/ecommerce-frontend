import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { orders } from '../data/orders'
import { formatPrice, formatDate, getOrderStatusBadge } from '../utils/helpers'
import { validateProfile, validatePasswordChange } from '../utils/validation'
import FormField from '../components/forms/FormField'
import PasswordField from '../components/forms/PasswordField'
import ConfirmDialog from '../components/common/ConfirmDialog'
import EmptyState from '../components/common/EmptyState'
import '../styles/ProfilePage.css'

const EMPTY_PASSWORDS = { currentPassword: '', newPassword: '', confirmNewPassword: '' };

function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // ===== Profile form =====
  const [profile, setProfile] = useState({ fullName: user.fullName, phone: user.phone });
  const [profileErrors, setProfileErrors] = useState({});

  // ===== Password form =====
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [passwordErrors, setPasswordErrors] = useState({});

  // ===== Logout dialog =====
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const userOrders = orders.filter((order) => order.userId === user.id);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    if (profileErrors[name]) setProfileErrors({ ...profileErrors, [name]: undefined });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const errors = validateProfile(profile);
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    updateProfile({ fullName: profile.fullName.trim(), phone: profile.phone.trim() });
    showToast('Profile updated successfully', 'success');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    if (passwordErrors[name]) setPasswordErrors({ ...passwordErrors, [name]: undefined });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errors = validatePasswordChange(passwords);
    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Frontend validation only — the real change will happen through the API later
    setPasswords(EMPTY_PASSWORDS);
    showToast('Password change validated (demo only)', 'info');
  };

  const handleLogout = () => {
    setShowLogoutDialog(false);
    navigate('/');
    logout();
    showToast('You have been logged out', 'info');
  };

  const hasProfileChanges =
    profile.fullName !== user.fullName || profile.phone !== user.phone;

  return (
    <div className="container">
      {/* ===== Header ===== */}
      <div className="profile-header">
        <div className="profile-user">
          <div className="profile-avatar" aria-hidden="true">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{user.fullName}</h1>
            <p className="profile-user__email">{user.email} • {user.role}</p>
          </div>
        </div>

        <button type="button" className="btn btn--danger" onClick={() => setShowLogoutDialog(true)}>
          Log Out
        </button>
      </div>

      <div className="profile-grid">
        {/* ===== Edit profile ===== */}
        <form className="card" onSubmit={handleProfileSubmit} noValidate>
          <h2>Personal Information</h2>

          <FormField
            label="Email"
            id="profile-email"
            value={user.email}
            disabled
          />
          <FormField
            label="Full Name"
            id="profile-fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleProfileChange}
            error={profileErrors.fullName}
          />
          <FormField
            label="Phone"
            id="profile-phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleProfileChange}
            error={profileErrors.phone}
          />

          <button type="submit" className="btn btn--primary" disabled={!hasProfileChanges}>
            Save Changes
          </button>
        </form>

        {/* ===== Change password ===== */}
        <form className="card" onSubmit={handlePasswordSubmit} noValidate>
          <h2>Change Password</h2>

          <PasswordField
            label="Current Password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
            autoComplete="current-password"
          />
          <PasswordField
            label="New Password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
            autoComplete="new-password"
          />
          <PasswordField
            label="Confirm New Password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={passwords.confirmNewPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmNewPassword}
            autoComplete="new-password"
          />

          <button type="submit" className="btn btn--secondary">
            Update Password
          </button>
        </form>
      </div>

      {/* ===== Orders ===== */}
      <section className="card orders-section">
        <h2>My Orders ({userOrders.length})</h2>

        {userOrders.length > 0 ? (
          <ul className="orders-list">
            {userOrders.map((order) => {
              const badge = getOrderStatusBadge(order.status);
              const itemsCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

              return (
                <li key={order.id} className="order-card">
                  <div>
                    <p className="order-card__id">{order.id}</p>
                    <p className="order-card__meta">
                      {formatDate(order.date)} • {itemsCount} item(s)
                    </p>
                  </div>
                  <span className={`badge badge--${badge.type}`}>
                    {badge.icon} {order.status}
                  </span>
                  <span className="order-card__total">{formatPrice(order.total)}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState icon="📦" title="No orders yet" message="When you place an order, it will appear here.">
            <Link to="/products" className="btn btn--primary">Start Shopping</Link>
          </EmptyState>
        )}
      </section>

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Log out?"
        message="Are you sure you want to log out of your account?"
        confirmText="Log Out"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
      />
    </div>
  );
}

export default ProfilePage;