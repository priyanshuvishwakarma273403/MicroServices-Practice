import axiosInstance from './axiosInstance';

export const login = (email, password) => {
  return axiosInstance.post('/api/auth/login', { email, password });
};

export const register = (userData) => {
  return axiosInstance.post('/api/auth/signup', userData);
};

export const getProfile = () => {
  return axiosInstance.get('/api/users/profile');
};

export const logoutUser = () => {
  return axiosInstance.post('/api/auth/logout');
};
