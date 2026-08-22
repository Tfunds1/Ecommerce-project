import { Link } from "react-router-dom";
import wishlistIcon from "../../assets/icons/ri_heart-3-fill.png";
import { currency, type Product } from "../../data/products";
import Stars from "../../components/product/Stars";
import { useWishlist } from "./WishlistContext";

export default function WishlistCard({ product }: { product: Product }) {
  const { toggleWishlist } = useWishlist();

  return (
    <div className="mb-[32px] w-full">
      <div className="relative flex h-[190px] items-center justify-center overflow-hidden rounded-xl border-[#E5E5E5] bg-[#F5F5F5]">
        <button
          type="button"
          onClick={(e) => {
            // Stop the click from also triggering the Link navigation below
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Remove from wishlist"
          className="absolute right-[10px] top-[10px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F97316] text-white cursor-pointer"
        >
          <img src={wishlistIcon} alt="" />
        </button>

        <Link
          to={`/product/${product.id}`}
          className="flex h-full w-full items-center justify-center"
        >
          <div className=" border border-[#E5E5E5] rounded-[12px]    ">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-[232px] w-[239.4px] object-contain"
              />
            ) : (
              <span className="px-4 text-center text-xs text-gray-400">
                {product.title}
              </span>
            )}
          </div>
        </Link>
      </div>

      <Link to={`/product/${product.id}`} className="block">
        <div className="flex flex-col gap-[8px] px-[8px] py-[12px]">
          <p className="          text-[12px] font-[600] font-semibold leading-[18px] tracking-[-0.2] text-[#A3A3A3]">
            {product.brand}
          </p>
          <p className="          text-sm font-[400] leading-[20px] text-[#262626]">
            {product.title}
          </p>
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="          text-xs text-gray-400">
              ({product.reviews})
            </span>
          </div>
          <p className="          text-base font-[600] font-semibold leading-[24px] text-[#262626]">
            {currency.format(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
