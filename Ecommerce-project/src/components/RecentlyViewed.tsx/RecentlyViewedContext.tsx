// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";

// type RecentlyViewedContextValue = {
//   recentlyViewed: string[]; // product ids, most recent first
//   addRecentlyViewed: (productId: string) => void;
//   clearRecentlyViewed: () => void;
// };

// const RecentlyViewedContext = createContext;
// RecentlyViewedContextValue | (undefined > undefined);

// const STORAGE_KEY = "recentlyViewed";
// const MAX_ITEMS = 10; // cap the list

// export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
//   const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
//     try {
//       const stored = localStorage.getItem(STORAGE_KEY);
//       return stored ? (JSON.parse(stored) as string[]) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
//     } catch {
//       // ignore write errors
//     }
//   }, [recentlyViewed]);

//   const addRecentlyViewed = (productId: string) =>
//     setRecentlyViewed((prev) => {
//       const withoutDup = prev.filter((id) => id !== productId);
//       return [productId, ...withoutDup].slice(0, MAX_ITEMS);
//     });

//   const clearRecentlyViewed = () => setRecentlyViewed([]);

//   return (
//     <RecentlyViewedContext.Provider
//       value={{ recentlyViewed, addRecentlyViewed, clearRecentlyViewed }}
//     >
//       {children}
//     </RecentlyViewedContext.Provider>
//   );
// }

// export function useRecentlyViewed() {
//   const ctx = useContext(RecentlyViewedContext);
//   if (!ctx) {
//     throw new Error(
//       "useRecentlyViewed must be used within a RecentlyViewedProvider",
//     );
//   }
//   return ctx;
// }
