import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { validateRegister } from '../utils/validation'
import FormField from '../components/forms/FormField'
import PasswordField from '../components/forms/PasswordField'
import '../styles/AuthPages.css'

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

function RegisterPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Checkboxes use "checked", other inputs use "value"
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const result = register(values);

      if (!result.success) {
        setFormError(result.message);
        setIsSubmitting(false);
        return;
      }

      showToast('Account created successfully! Please log in.', 'success');
      navigate('/login', {
        replace: true,
        state: { message: `Your account is ready. Log in with ${values.email}` },
      });
    }, 800);
  };

  return (
    <div className="container auth-page">
      <div className="card auth-card">
        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join TechStore and start shopping</p>

        {formError && (
          <div className="alert alert--error" role="alert">⚠ {formError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="Ahmad Ali"
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
            autoComplete="name"
          />

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
          />

          <FormField
            label="Phone"
            id="phone"
            name="phone"
            type="tel"
            placeholder="0791234567"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            autoComplete="tel"
          />

          <PasswordField
            label="Password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
          />
          {!errors.password && (
            <p className="field__hint">At least 8 characters, 1 uppercase letter and 1 number.</p>
          )}

          <PasswordField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <label className="checkbox-field">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={values.acceptTerms}
              onChange={handleChange}
            />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button
            type="submit"
            className={`btn btn--primary btn--full ${isSubmitting ? 'btn--loading' : ''}`}
            disabled={!values.acceptTerms || isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;