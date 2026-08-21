import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../data/products";

export type CartLine = {
  lineId: string;
  product: Product;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = (product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.product.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + quantity }
            : line,
        );
      }
      return [
        ...prev,
        { lineId: `${product.id}-${Date.now()}`, product, quantity },
      ];
    });
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    setLines((prev) =>
      prev.map((line) =>
        line.lineId === lineId
          ? { ...line, quantity: Math.max(1, quantity) }
          : line,
      ),
    );
  };

  const removeLine = (lineId: string) => {
    setLines((prev) => prev.filter((line) => line.lineId !== lineId));
  };

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );
  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [lines],
  );

  return (
    <CartContext.Provider
      value={{ lines, itemCount, subtotal, addItem, updateQuantity, removeLine }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
