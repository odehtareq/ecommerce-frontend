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

// At least 8 characters, one uppercase letter and one number
const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export function validateRegister(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'Enter a valid Jordanian number (e.g. 0791234567)';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!STRONG_PASSWORD_REGEX.test(values.password)) {
    errors.password = 'At least 8 characters, 1 uppercase letter and 1 number';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms';
  }

  return errors;
}

export function validateProfile(values) {
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

  return errors;
}

export function validatePasswordChange(values) {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (!STRONG_PASSWORD_REGEX.test(values.newPassword)) {
    errors.newPassword = 'At least 8 characters, 1 uppercase letter and 1 number';
  } else if (values.newPassword === values.currentPassword) {
    errors.newPassword = 'New password must be different from the current one';
  }

  if (values.confirmNewPassword !== values.newPassword) {
    errors.confirmNewPassword = 'Passwords do not match';
  }

  return errors;
}

export function validateProduct(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Product name is required';
  } else if (values.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!values.category) {
    errors.category = 'Please select a category';
  }

  if (values.price === '') {
    errors.price = 'Price is required';
  } else if (Number(values.price) <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (values.stockQuantity === '') {
    errors.stockQuantity = 'Stock is required';
  } else if (!Number.isInteger(Number(values.stockQuantity)) || Number(values.stockQuantity) < 0) {
    errors.stockQuantity = 'Stock must be a whole number (0 or more)';
  }

  if (!values.image.trim()) {
    errors.image = 'Image URL is required';
  } else if (!/^(https?:\/\/|\/)/.test(values.image.trim())) {
    errors.image = 'Image must be a URL (https://...) or a path (/images/...)';
  }

  return errors;
}