import axiosInstance from './axiosInstance';

export const getCart = (userId) => {
  return axiosInstance.get(`/api/cart/${userId}`);
};

export const addItemToCart = (userId, item) => {
  return axiosInstance.post(`/api/cart/${userId}/items`, item);
};

export const updateCartItem = (userId, productId, quantity) => {
  return axiosInstance.put(`/api/cart/${userId}/items/${productId}`, null, { params: { quantity } });
};

export const removeCartItem = (userId, productId) => {
  return axiosInstance.delete(`/api/cart/${userId}/items/${productId}`);
};

export const clearCartApi = (userId) => {
  return axiosInstance.delete(`/api/cart/${userId}`);
};
