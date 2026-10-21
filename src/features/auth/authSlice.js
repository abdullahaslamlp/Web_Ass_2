import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY_CURRENT_USER = 'eventhub_current_user';
const STORAGE_KEY_USERS = 'eventhub_users';

// Pre-seed demo user if no users are in localStorage
const initializeUsers = () => {
  try {
    const rawUsers = localStorage.getItem(STORAGE_KEY_USERS);
    if (!rawUsers) {
      const defaultUsers = [
        {
          id: 'user_demo_1',
          name: 'Demo Explorer',
          email: 'demo@eventhub.com',
          password: 'password123',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(rawUsers);
  } catch (error) {
    console.error('Failed to load users from localStorage:', error);
    return [];
  }
};

const getStoredCurrentUser = () => {
  try {
    const rawUser = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    console.error('Failed to parse current user from localStorage:', error);
    return null;
  }
};

initializeUsers();
const initialUser = getStoredCurrentUser();

const initialState = {
  user: initialUser,
  isAuthenticated: Boolean(initialUser),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      try {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(action.payload));
      } catch (err) {
        console.error('Error saving session:', err);
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      try {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      } catch (err) {
        console.error('Error removing session:', err);
      }
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      try {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(action.payload));
      } catch (err) {
        console.error('Error saving session:', err);
      }
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  clearAuthError,
} = authSlice.actions;

// Async Thunk-like Actions for simulated auth
export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(loginStart());

  try {
    const rawUsers = localStorage.getItem(STORAGE_KEY_USERS);
    const users = rawUsers ? JSON.parse(rawUsers) : [];
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!matchedUser) {
      dispatch(loginFailure('Invalid email or password. Please try again.'));
      return { success: false, error: 'Invalid email or password.' };
    }

    const sessionUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
    };

    dispatch(loginSuccess(sessionUser));
    return { success: true, user: sessionUser };
  } catch (err) {
    const msg = err.message || 'Login failed. Please try again.';
    dispatch(loginFailure(msg));
    return { success: false, error: msg };
  }
};

export const registerUser = ({ name, email, password }) => (dispatch) => {
  dispatch(registerStart());

  try {
    const rawUsers = localStorage.getItem(STORAGE_KEY_USERS);
    const users = rawUsers ? JSON.parse(rawUsers) : [];
    const normalizedEmail = email.trim().toLowerCase();

    const emailExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (emailExists) {
      dispatch(registerFailure('An account with this email already exists.'));
      return { success: false, error: 'Email already exists.' };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    dispatch(registerSuccess(sessionUser));
    return { success: true, user: sessionUser };
  } catch (err) {
    const msg = err.message || 'Registration failed. Please try again.';
    dispatch(registerFailure(msg));
    return { success: false, error: msg };
  }
};

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
