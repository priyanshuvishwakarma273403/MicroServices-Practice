import { useSelector, useDispatch } from 'react-redux';
import { setAuth, logout as logoutAction } from '../store/authSlice';
import { login as loginApi, register as registerApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      const { accessToken, userId, name, email: userEmail, role } = response.data;
      const user = { id: userId, name, email: userEmail, role };
      dispatch(setAuth({ user, token: accessToken }));
      toast.success(`Welcome back, ${name}!`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerApi(userData);
      const { accessToken, userId, name, email, role } = response.data;
      const user = { id: userId, name, email, role };
      dispatch(setAuth({ user, token: accessToken }));
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return { user, token, isLoggedIn, login, register, logout };
};
