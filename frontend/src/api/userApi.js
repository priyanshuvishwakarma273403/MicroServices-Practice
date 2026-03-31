import axiosInstance from './axiosInstance';

export const login = (email, password) => {
  return axiosInstance.post('/api/users/login', { email, password });
};

export const register = (userData) => {
  return axiosInstance.post('/api/users/register', userData);
};

export const getProfile = (userId) => {
  return axiosInstance.get(`/api/users/${userId}/profile`);
};

export const logoutUser = () => {
  return axiosInstance.post('/api/users');
};
