import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import chevronDown from "../../assets/icons/ri_arrow-down-s-line.svg";
import Sidebar from "../../components/layout/Sidebar";
import ProductCard from "../../components/product/ProductCard";
import SearchInput from "../../components/search/SearchInput";
import { products } from "../../data/products";
import filterIcon from "../../assets/icons/ri_filter-3-fill.png";

const filterPills = [
  "Category",
  "Ratings",
  "Price",
  "Type",
  "Discount",
  "Colour",
];

function ProductCardSkeleton() {
  return (
    <div className="mb-[32px] w-full">
      <div className="h-[190px] animate-pulse rounded-xl bg-[#F0F0F0]" />
      <div className="flex flex-col gap-[8px] px-[8px] py-[12px]">
        <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#F0F0F0]" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-[#F0F0F0]" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-[#F0F0F0]" />
      </div>
    </div>
  );
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <section className=" relative mx-auto flex w-full max-w-[1341px] flex-col gap-6 px-[20px] py-[32px]">
          {isLoading ? (
            <div className="h-7 w-64 animate-pulse rounded-full bg-[#F0F0F0]" />
          ) : (
            <h1 className="font-['DM_Sans'] text-2xl font-bold text-[#171717]">
              Results for &ldquo;{query}&rdquo;
              <span className="ml-2 font-normal text-[#737373]">
                · {results.length} item{results.length === 1 ? "" : "s"}
              </span>
            </h1>
          )}

          {isLoading ? (
            <div className="flex flex-wrap items-center gap-2">
              {[88, 96, 84, 72, 76, 92].map((width, index) => (
                <div
                  key={index}
                  style={{ width }}
                  className="h-9 animate-pulse rounded-full bg-[#F0F0F0]"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-full border border-[#E5E5E5] px-4 py-2 font-['DM_Sans'] text-sm font-medium text-[#171717] hover:bg-[#FAFAFA]"
              >
                All filters
                <img src={filterIcon} alt="" className="h-[18px] w-[18px]" />
              </button>
              {filterPills.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="flex  cursor-pointer items-center gap-1 rounded-full border border-[#E5E5E5] pr-[8px] pl-[16px] py-[8px] font-['DM_Sans'] text-sm  leading-[20px] font-medium text-[#525252] hover:bg-[#FAFAFA]"
                >
                  {label}
                  <img src={chevronDown} alt="" className="h-[18px] w-[18px]" />
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center font-['DM_Sans'] text-sm text-[#737373]">
              No results found for &ldquo;{query}&rdquo;. Try a different search
              term.
            </p>
          )}

          <div className="fixed  bottom-10 left-1/2 -translate-x-1/2 ">
            <SearchInput />
          </div>
        </section>
      </main>
    </div>
  );
}
