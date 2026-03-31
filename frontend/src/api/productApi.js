import axiosInstance from './axiosInstance';

export const getAllProducts = (params) => {
  return axiosInstance.get('/api/products', { params });
};

export const getProductById = (id) => {
  return axiosInstance.get(`/api/products/${id}`);
};

export const searchProducts = (query) => {
  return axiosInstance.get(`/api/products/search?q=${query}`);
};

export const getTopRatedProducts = () => {
  return axiosInstance.get('/api/products/top-rated');
};

export const getProductsByCategory = (category) => {
  return axiosInstance.get(`/api/products/category/${category}`);
};

export const createProduct = (productData) => {
  return axiosInstance.post('/api/products', productData);
};
