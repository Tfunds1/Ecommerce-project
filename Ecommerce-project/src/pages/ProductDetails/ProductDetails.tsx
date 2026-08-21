import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

import SearchInput from "../../components/search/SearchInput";
import ProductSection from "../Home/components/ProductSection";
import { currency, products } from "../../data/products";
import heartIcon from "../../assets/icons/ri_heart-3-line.png";
import vector from "../../assets/icons/Vector.png";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../Wishlist/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const relatedProducts = useMemo(
    () => products.filter((p) => p.id !== id),
    [id],
  );

  if (!product) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4">
          <p className="font-['DM_Sans'] text-lg text-[#171717]">
            We couldn&apos;t find that product.
          </p>
          <Link
            to="/home"
            className="font-['DM_Sans'] text-sm font-medium text-[#262626] underline"
          >
            Back to home
          </Link>
        </main>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-[1341px] flex-col gap-10 px-[20px] py-[32px]">
          <nav className="flex items-center gap-1.5 font-['DM_Sans'] text-base text-[#737373] leading-[24px] font-[400]">
            <Link to="/home" className="hover:text-[#171717]">
              Home
            </Link>
            <img src={vector} alt="" className="text-[#737373]" />
            <Link to="/search" className="hover:text-[#171717]">
              Search
            </Link>
            {product.category && (
              <>
                <img src={vector} alt="" className="text-[#737373]" />
                <Link
                  to={`/search?q=${encodeURIComponent(product.category)}`}
                  className="hover:text-[#171717]"
                >
                  {product.category}
                </Link>
              </>
            )}
            <img src={vector} alt="" className="text-[#737373]" />
            <span className="text-[#171717]">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="  ">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[320px] rounded-[8px] border border-[#E5E5E5] w-[600px] object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-['DM_Sans'] text-sm font-semibold text-[#A3A3A3]">
                {product.brand}
              </p>
              <h1 className="font-['DM_Sans'] text-2xl font-bold leading-tight text-[#171717]">
                {product.title}
              </h1>

              {product.description && (
                <p className="font-['DM_Sans'] text-sm leading-6 text-[#525252]">
                  {showFullDescription
                    ? product.description
                    : `${product.description.slice(0, 90)}…`}{" "}
                  <button
                    type="button"
                    onClick={() => setShowFullDescription((v) => !v)}
                    className="cursor-pointer font-medium text-[#171717] underline"
                  >
                    {showFullDescription ? "View less" : "View more"}
                  </button>
                </p>
              )}

              <div className="flex items-center gap-3">
                <span className="font-['DM_Sans'] text-2xl font-bold text-[#171717]">
                  {currency.format(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-['DM_Sans'] text-base text-[#A3A3A3] line-through">
                    {currency.format(product.originalPrice)}
                  </span>
                )}
                {discountPercent !== null && (
                  <span className="rounded-full bg-[#171717] px-2.5 py-1 font-['DM_Sans'] text-xs font-semibold text-white">
                    {discountPercent}% off
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <span className="font-['DM_Sans'] text-sm font-medium text-[#171717]">
                  Quantity
                </span>
                <div className="flex w-fit items-center gap-4 rounded-full border border-[#E5E5E5] px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="cursor-pointer font-['DM_Sans'] text-lg font-medium text-[#171717] disabled:opacity-30"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-['DM_Sans'] text-sm font-medium text-[#171717]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="cursor-pointer font-['DM_Sans'] text-lg font-medium text-[#171717]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addItem(product, quantity);
                  }}
                  className="cursor-pointer rounded-full bg-[#171717] px-6 py-3 font-['DM_Sans'] text-sm font-semibold text-white hover:bg-black"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-full border border-[#E5E5E5] px-6 py-3 font-['DM_Sans'] text-sm font-semibold text-[#171717] hover:bg-[#FAFAFA]"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  aria-pressed={isWishlisted}
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors ${
                    isWishlisted
                      ? "border-red-200 bg-red-50"
                      : "border-[#E5E5E5] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <img
                    src={heartIcon}
                    alt=""
                    className={`h-5 w-5 transition-colors ${
                      isWishlisted ? "fill-red-500" : "fill-[#171717]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="fixed  bottom-10 left-1/2 -translate-x-1/2 ">
            <SearchInput />
          </div>

          <ProductSection title="More to Love" items={relatedProducts} />

          <button className="w-[161px] h-[56px] py-[16px] px-[40px] bg-[#E5E5E5] rounded-[43px] font-['DM_Sans'] text-base font-semibold text-[#171717] hover:bg-[#D9D9D9] leading-[24px] mx-auto  cursor-pointer">
            View More
          </button>
        </section>
      </main>
    </div>
  );
}
