import { Link } from "react-router-dom";
import { currency, type Product } from "../../data/products";
import Stars from "./Stars";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="mb-[32px] block w-full">
      <div className=" border border-[#E5E5E5] rounded-[12px] ">
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
      <div className="flex flex-col gap-[4px] px-[8px] py-[12px]">
        <p className=" text-[12px] font-[600] font-semibold leading-[18px] tracking-[-0.2] text-[#A3A3A3]">
          {product.brand}
        </p>
        <p className="  text-sm font-[400] leading-[20px] text-[#262626]">
          {product.title}
        </p>
        <div className="flex items-center gap-[8px]">
          <Stars rating={product.rating} />
          <span className=" font-[400] leading-[18px]  text-[12px] text-[#262626]">
            ({product.reviews})
          </span>
        </div>
        <p className="  text-base font-[600] font-semibold leading-[24px] text-[#262626]">
          {currency.format(product.price)}
        </p>
      </div>
    </Link>
  );
}
