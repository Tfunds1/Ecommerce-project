import chevron from "../../../assets/icons/ri_arrow-left-s-line.svg";
import ProductCard from "../../../components/product/ProductCard";
import type { Product } from "../../../data/products";

export default function ProductSection({
  title,
  items,
}: {
  title: string;
  items: Product[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="          text-lg font-bold text-[#171717]">{title}</h2>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-0.5           text-sm font-medium text-[#525252] hover:text-black"
        >
          See all
          <img src={chevron} alt="" className="h-4 w-4 -scale-x-100" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
