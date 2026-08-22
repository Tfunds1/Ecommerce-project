import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

import SearchInput from "../../components/search/SearchInput";
import ProductSection from "../Home/ProductSection";
import { currency, products } from "../../data/products";
import earpodImage1 from "../../assets/images/Image Area (1).png";
import earpodImage2 from "../../assets/images/Image Area (2).png";
import earpodImage3 from "../../assets/images/Image Area (3).png";
import earpodImage4 from "../../assets/images/Image Area (4).png";
import heartIcon from "../../assets/icons/ri_heart-3-line.png";
import addIcon from "../../assets/icons/ri_add-line.png";
import substractIcon from "../../assets/icons/ri_subtract-line.png";
import vector from "../../assets/icons/Vector.png";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../Wishlist/WishlistContext";

export default function ProductDetails() {
  const thumb =
    "w-[72px] h-[72px] border rounded-[2px] cursor-pointer object-contain transition-colors";
  const { id } = useParams();

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  // NOTE: these 4 thumbnails are hardcoded imports, not per-product data.
  // Real fix: add an `images: string[]` field to Product in data/products.ts
  // and map over product.images here instead. Using product.image + these
  // 4 placeholders so the gallery works today without a data model change.
  const galleryImages = useMemo(
    () =>
      product
        ? [
            product.image,
            earpodImage1,
            earpodImage2,
            earpodImage3,
            earpodImage4,
          ]
        : [],
    [product],
  );

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product?.image,
  );

  // Reset the selected image whenever the product itself changes
  // (e.g. navigating from one product's page straight to another's).
  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product?.image]);

  const relatedProducts = useMemo(
    () => products.filter((p) => p.id !== id),
    [id],
  );

  if (!product) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4">
          <p className="  text-lg text-[#171717]">
            We couldn&apos;t find that product.
          </p>
          <Link
            to="/home"
            className="  text-sm font-medium text-[#262626] underline"
          >
            Back to home
          </Link>
        </main>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  // const discountPercent = product.originalPrice
  //   ? Math.round(
  //       ((product.originalPrice - product.price) / product.originalPrice) * 100,
  //     )
  //   : null;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-[1341px] flex-col gap-10 px-[20px] py-[32px]">
          <nav className="flex items-center gap-1.5   text-base text-[#737373] leading-[24px] font-[400]">
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
              <div className=" flex flex-col gap-[24px] ">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="h-[320px] rounded-[8px] border border-[#E5E5E5] w-[600px] object-contain"
                />
                <div className="flex items-center justify-center gap-[8px]">
                  {galleryImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      onClick={() => setSelectedImage(img)}
                      className={`${thumb} ${
                        selectedImage === img
                          ? "border-[#171717]"
                          : "border-[#E5E5E5] hover:border-[#A3A3A3]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <p className="text-base leading-[24px] font-[500]  text-[#525252]">
                {product.brand}
              </p>
              <h1 className="text-[32px] font-[600] font-semibold leading-[40px] tracking-[-0.5] text-[#171717]">
                {product.title}
              </h1>

              {product.description && (
                <p className="  text-base leading-[24px] font-[400] text-[#262626]">
                  {showFullDescription
                    ? product.description
                    : `${product.description.slice(0, 90)}…`}{" "}
                  <button
                    type="button"
                    onClick={() => setShowFullDescription((v) => !v)}
                    className="cursor-pointer font-semibold text-[#262626] underline"
                  >
                    {showFullDescription ? "View less" : "View more"}
                  </button>
                </p>
              )}

              <div className="flex items-center gap-3">
                <span className="  text-[28px] font-semibold text-[#171717] leading-[36px]">
                  {currency.format(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="  text-[20px] font-[400] text-[#A3A3A3] line-through leading-[22px]">
                    {currency.format(product.originalPrice)}
                  </span>
                )}

                <span className="rounded-full bg-[#171717] font-[400] px-[8px] py-[2px]   text-sm text-[#FAFAFA]">
                  20% off
                </span>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <span className="  text-base font-[600] leading-[24px] font-semibold text-[#404040]">
                  Quantity
                </span>
                <div className="flex w-[135px] justify-between items-center gap-4 rounded-full bg-[#F5F5F5] p-[4px]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="cursor-pointer w-[32px] h-[32px]  p-[4px] rounded-full  font-medium text-[#A3A3A3] bg-[#FFFFFF] "
                    disabled={quantity <= 1}
                  >
                    <img src={substractIcon} alt="" />
                  </button>
                  <span className="w-4 text-center   text-sm font-medium text-[#171717]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="cursor-pointer w-[32px] h-[32px]  p-[4px] rounded-full  font-medium text-[#A3A3A3] bg-[#FFFFFF] "
                  >
                    <img src={addIcon} alt="" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-[16px]">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/cart");
                    addItem(product, quantity);
                  }}
                  className="cursor-pointer rounded-[43px] bg-[#E5E5E5] px-[32px] py-[14px] leading-[20px]   text-sm font-semibold text-[#404040] "
                >
                  Go to Cart
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-[43px] border border-[#D4D4D4] px-[32px] py-[14px]  text-sm font-semibold text-[#171717] hover:bg-[#FAFAFA]"
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

          <button className="w-[161px] h-[56px] py-[16px] px-[40px] bg-[#E5E5E5] rounded-[43px]   text-base font-semibold text-[#171717] hover:bg-[#D9D9D9] leading-[24px] mx-auto  cursor-pointer">
            View More
          </button>
        </section>
      </main>
    </div>
  );
}
