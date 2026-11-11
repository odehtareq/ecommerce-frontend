import { Link, Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import EmptyState from './EmptyState'

function ProtectedRoute({ requiredRole }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // 1. Not logged in → go to login, and remember where we came from
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: 'Please log in to continue.',
        }}
      />
    );
  }

  // 2. Logged in but wrong role → Unauthorized
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="container">
        <EmptyState
          icon="🚫"
          title="Access Denied"
          message="You don't have permission to view this page. This area is for administrators only."
        >
          <Link to="/" className="btn btn--primary">Back to Home</Link>
        </EmptyState>
      </div>
    );
  }

  // 3. Allowed → show the page
  return <Outlet />;
}

export default ProtectedRoute;