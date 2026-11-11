import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { validateLogin } from '../utils/validation'
import FormField from '../components/forms/FormField'
import PasswordField from '../components/forms/PasswordField'
import '../styles/AuthPages.css'

const DEMO_ACCOUNTS = [
  { label: '👤 Customer', email: 'customer@techstore.test', password: 'Customer123' },
  { label: '🛠️ Admin', email: 'admin@techstore.test', password: 'Admin123' },
];

function LoginPage() {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Page the user tried to open before being sent to login (if any)
  const redirectTo = location.state?.from || null;

  // Already logged in? No need to see the login page
  if (isAuthenticated && !isSubmitting) {
    return <Navigate to={isAdmin ? '/admin' : '/profile'} replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
    setLoginError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Simulate a request to the server
    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(values.email, values.password);

      if (!result.success) {
        setLoginError(result.message);
        setIsSubmitting(false);
        return;
      }

      showToast(`Welcome back, ${result.user.fullName}!`, 'success');
      const defaultPage = result.user.role === 'admin' ? '/admin' : '/profile';
      navigate(redirectTo || defaultPage, { replace: true });
    }, 800);
  };

  return (
    <div className="container auth-page">
      <div className="card auth-card">
        <h1 className="auth-card__title">Welcome Back</h1>
        <p className="auth-card__subtitle">Log in to your TechStore account</p>

        {location.state?.message && (
          <div className="alert alert--info" role="status">{location.state.message}</div>
        )}

        {loginError && (
          <div className="alert alert--error" role="alert">⚠ {loginError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            disabled={isSubmitting}
          />

          <PasswordField
            label="Password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            disabled={isSubmitting}
          />

          <button
            type="submit"
            className={`btn btn--primary btn--full ${isSubmitting ? 'btn--loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="auth-card__footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

        <div className="demo-accounts">
          <p className="demo-accounts__title">Demo accounts (click to fill):</p>
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.email}
              type="button"
              onClick={() => setValues({ email: acc.email, password: acc.password })}
            >
              {acc.label}: {acc.email} / {acc.password}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;