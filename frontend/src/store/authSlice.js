import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user_info')) || null,
  token: localStorage.getItem('auth_token') || null,
  isLoggedIn: !!localStorage.getItem('auth_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_info', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
