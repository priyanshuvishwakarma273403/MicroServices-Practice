import axiosInstance from './axiosInstance';

export const placeOrder = (orderData) => {
  return axiosInstance.post('/api/orders/place', orderData);
};

export const getUserOrders = () => {
  return axiosInstance.get('/api/orders');
};

export const getOrderDetails = (orderId) => {
  return axiosInstance.get(`/api/orders/${orderId}`);
};
