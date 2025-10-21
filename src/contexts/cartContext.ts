import { createContext } from "react";

export interface CartItem {
  id: string;
  title: "Custom" | "featured";
  price: number;
  quantity: number;
  image?: string;
  meta?: {
    text?: string;
    color?: string;
    size?: string;
    font?:string
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
