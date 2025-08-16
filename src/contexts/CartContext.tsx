import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Defina a estrutura de um item de comida e um item do carrinho
interface FoodItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

// Defina a estrutura do contexto
interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
}

// Crie o contexto com um valor padrão
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Crie o componente provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // No app real será feito uma busca do carrinho inicial de uma API ou local storage
  useEffect(() => {
    // Simula a busca dos dados iniciais do carrinho
    setLoading(false);
  }, []);

  const addToCart = (item: FoodItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        // Se o item já existe, atualiza a quantidade
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Se o item é novo, adiciona ao carrinho
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calcula o subtotal e o total
  const subtotal = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  // Por enquanto, vamos assumir uma taxa de entrega fixa
  const deliveryFee = 15.0;
  const total = subtotal + deliveryFee;

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
