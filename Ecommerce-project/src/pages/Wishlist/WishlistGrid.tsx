import Sidebar from "../../components/layout/Sidebar";
import { products, type Product } from "../../data/products";
import { useWishlist } from "./WishlistContext";
import WishlistCard from "./WishlistCard";
import { useNavigate } from "react-router-dom";

export default function WishlistGrid() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  const wishlistedProducts = products.filter((p: Product) =>
    wishlist.includes(p.id),
  );

  return (
    <div className="flex w-[1341px] bg-[#FFFFFF]">
      <Sidebar />

      <div className="p-[40px] flex flex-col gap-[24px]">
        <h1 className="mb-[16px] font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01] text-[#262626]  ">
          Wishlist
        </h1>

        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-[16px]   mx-auto">
            <p className="font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01] text-[#262626]">
              Your wishlist is waiting
            </p>
            <span className="text-[#404040] font-[400] text-base leading-[24px]">
              Tap the heart icon on any product to save it here.
            </span>
            <button
              type="button"
              onClick={() => navigate("/")}
              className=" max-w-[165px] rounded-[43px] py-[14px] px-[32px] text-sm leading-[20px] font-semibold font-600 text-[#404040] bg-[#E5E5E5] cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {wishlistedProducts.map((product: Product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
