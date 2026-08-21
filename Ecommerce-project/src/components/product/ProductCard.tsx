import { Link } from "react-router-dom";
import { currency, type Product } from "../../data/products";
import Stars from "./Stars";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="mb-[32px] block w-full">
      <div className="flex h-[190px] items-center justify-center overflow-hidden rounded-xl border-[#E5E5E5] bg-[#F5F5F5]">
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
      <div className="flex flex-col gap-[8px] px-[8px] py-[12px]">
        <p className="font-['DM_Sans'] text-[12px] font-[600] font-semibold leading-[18px] tracking-[-0.2] text-[#A3A3A3]">
          {product.brand}
        </p>
        <p className="font-['DM_Sans'] text-sm font-[400] leading-[20px] text-[#262626]">
          {product.title}
        </p>
        <div className="flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="font-['DM_Sans'] text-xs text-gray-400">
            ({product.reviews})
          </span>
        </div>
        <p className="font-['DM_Sans'] text-base font-[600] font-semibold leading-[24px] text-[#262626]">
          {currency.format(product.price)}
        </p>
      </div>
    </Link>
  );
}
