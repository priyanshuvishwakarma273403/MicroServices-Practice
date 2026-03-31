import axiosInstance from './axiosInstance';

export const getCart = () => {
  return axiosInstance.get('/api/cart');
};

export const addItemToCart = (productId, quantity = 1) => {
  return axiosInstance.post('/api/cart/add', { productId, quantity });
};

export const updateCartItem = (productId, quantity) => {
  return axiosInstance.put(`/api/cart/update/${productId}`, { quantity });
};

export const removeCartItem = (productId) => {
  return axiosInstance.delete(`/api/cart/remove/${productId}`);
};

export const clearCartApi = () => {
  return axiosInstance.delete('/api/cart/clear');
};
