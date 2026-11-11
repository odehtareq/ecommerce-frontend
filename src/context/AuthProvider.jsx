import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { users } from '../data/users'

const USER_KEY = 'techstore-user';
const REGISTERED_KEY = 'techstore-registered-users';

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function withoutPassword(user) {
  const safeUser = { ...user }; // copy first
  delete safeUser.password;     // remove password from the copy only
  return safeUser;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage(USER_KEY, null));
  const [registeredUsers, setRegisteredUsers] = useState(() => loadFromStorage(REGISTERED_KEY, []));

  // Keep the logged-in user after refresh
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  // Keep accounts created from the Register page
  useEffect(() => {
    localStorage.setItem(REGISTERED_KEY, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const allUsers = [...users, ...registeredUsers];

  // ===== Actions =====
  const login = (email, password) => {
    const found = allUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }

    const safeUser = withoutPassword(found);
    setUser(safeUser);
    return { success: true, user: safeUser };
  };

  const register = ({ fullName, email, phone, password }) => {
    const exists = allUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) {
      return { success: false, message: 'An account with this email already exists' };
    }

    const newUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      role: 'customer',
    };
    setRegisteredUsers([...registeredUsers, newUser]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser({ ...user, ...updates });
  };

  const value = {
    user,
    isAuthenticated: user !== null,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;