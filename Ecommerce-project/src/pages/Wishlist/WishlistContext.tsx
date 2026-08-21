import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type WishlistContextValue = {
  wishlist: string[]; // product ids
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore write errors (e.g. private browsing storage limits)
    }
  }, [wishlist]);

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addToWishlist = (productId: string) =>
    setWishlist((prev) =>
      prev.includes(productId) ? prev : [...prev, productId],
    );

  const removeFromWishlist = (productId: string) =>
    setWishlist((prev) => prev.filter((id) => id !== productId));

  const toggleWishlist = (productId: string) =>
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
