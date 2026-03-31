import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQty, setCart, clearCart as clearCartAction } from '../store/cartSlice';
import { addItemToCart, updateCartItem, removeCartItem, getCart, clearCartApi } from '../api/cartApi';
import { toast } from 'react-hot-toast';
import { useAuth } from './useAuth';

export const useCart = () => {
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  const fetchCartItems = async () => {
    if (!isLoggedIn) return;
    try {
      const response = await getCart();
      dispatch(setCart(response.data));
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    // Optimistic Update
    dispatch(addItem({ ...product, quantity }));
    toast.success('Added to cart');

    try {
      await addItemToCart(product.id, quantity);
    } catch (error) {
      // Revert optimistic update? Or just show error
      console.error("Error adding to cart API", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isLoggedIn) return;
    
    try {
      dispatch(updateQty({ id: productId, quantity }));
      await updateCartItem(productId, quantity);
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isLoggedIn) return;
    
    try {
      dispatch(removeItem(productId));
      await removeCartItem(productId);
      toast.success('Removed from cart');
    } catch (error) {
      console.error("Error removing from cart", error);
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn) return;
    try {
      dispatch(clearCartAction());
      await clearCartApi();
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  return { items, totalAmount, totalItems, fetchCartItems, addToCart, updateQuantity, removeFromCart, clearCart };
};
