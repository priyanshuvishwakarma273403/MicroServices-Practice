import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQty, setCart, clearCart as clearCartAction } from '../store/cartSlice';
import { addItemToCart, updateCartItem, removeCartItem, getCart, clearCartApi } from '../api/cartApi';
import { toast } from 'react-hot-toast';
import { useAuth } from './useAuth';

export const useCart = () => {
  const { items, totalAmount, totalItems } = useSelector((state) => state.cart);
  const { isLoggedIn, user } = useAuth();
  const dispatch = useDispatch();

  const fetchCartItems = async () => {
    if (!isLoggedIn || !user?.id) return;
    try {
      const response = await getCart(user.id);
      const cartData = response.data;
      // Backend returns items as Map<String, CartItem> (object, not array)
      const itemsMap = cartData.items || {};
      const mappedItems = Object.values(itemsMap).map(i => ({
        id: i.productId,
        name: i.productName,
        price: i.price,
        imageUrls: i.imageUrl ? [i.imageUrl] : [],
        quantity: i.quantity,
      }));
      dispatch(setCart({
        items: mappedItems,
        totalAmount: cartData.totalAmount || 0,
        totalItems: cartData.totalItems || mappedItems.reduce((sum, i) => sum + i.quantity, 0),
      }));
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (!user?.id) return;

    // Optimistic Update
    dispatch(addItem({ ...product, quantity }));
    toast.success('Added to cart');

    try {
      await addItemToCart(user.id, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrls?.[0] || '',
      });
    } catch (error) {
      console.error("Error adding to cart API", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isLoggedIn || !user?.id) return;
    try {
      dispatch(updateQty({ id: productId, quantity }));
      await updateCartItem(user.id, productId, quantity);
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isLoggedIn || !user?.id) return;
    try {
      dispatch(removeItem(productId));
      await removeCartItem(user.id, productId);
      toast.success('Removed from cart');
    } catch (error) {
      console.error("Error removing from cart", error);
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn || !user?.id) return;
    try {
      dispatch(clearCartAction());
      await clearCartApi(user.id);
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  return { items, totalAmount, totalItems, fetchCartItems, addToCart, updateQuantity, removeFromCart, clearCart };
};
