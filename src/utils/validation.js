// Jordanian mobile: 077 / 078 / 079 + 7 digits
const PHONE_REGEX = /^07[789]\d{7}$/;

export function validateCheckout(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Enter a valid Jordanian number (e.g. 0791234567)';
  }

  if (!values.city) {
    errors.city = 'Please select a city';
  }

  if (!values.address.trim()) {
    errors.address = 'Address is required';
  } else if (values.address.trim().length < 10) {
    errors.address = 'Please enter a more detailed address';
  }

  if (!values.paymentMethod) {
    errors.paymentMethod = 'Please choose a payment method';
  }

  return errors;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}