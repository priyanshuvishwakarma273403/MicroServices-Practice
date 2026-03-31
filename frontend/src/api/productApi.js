import axiosInstance from './axiosInstance';

export const getAllProducts = (params) => {
  return axiosInstance.get('/api/products', { params });
};

export const getProductById = (id) => {
  return axiosInstance.get(`/api/products/${id}`);
};

export const searchProducts = (keyword, page = 0, size = 12) => {
  return axiosInstance.get('/api/products/search', { params: { keyword, page, size } });
};

export const getTopRatedProducts = () => {
  return axiosInstance.get('/api/products/top-rated');
};

export const getProductsByCategory = (category, page = 0, size = 12) => {
  return axiosInstance.get(`/api/products/category/${category}`, { params: { page, size } });
};

export const createProduct = (productData) => {
  return axiosInstance.post('/api/products', productData);
};
