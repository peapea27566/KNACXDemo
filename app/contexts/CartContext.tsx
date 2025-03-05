"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ProductCart } from '../modals/Product';

type CartContextType = {
  cart: ProductCart[];
  setCartData: React.Dispatch<React.SetStateAction<ProductCart[]>>;
  addToCart: (product: ProductCart) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  openModal: () => void;
  closeModal: () => void;
  isModalCart: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCartData] = useState<ProductCart[]>([]);
  const [isModalCart, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: ProductCart) => {
    setCartData(prevCart => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        const updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartData(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartData([]);
    localStorage.removeItem('cart');
  };
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCartData,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        openModal,
        closeModal,
        isModalCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
