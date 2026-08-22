import { useRef } from "react";

import chevron from "../../assets/icons/ri_arrow-left-s-line.svg";
import { categories, categoriesSecondary } from "../../data/data";

export default function CategoryCarousel() {
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = () => {
    categoryScrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={categoryScrollRef}
        className="flex w-full gap-[18px] overflow-x-auto scrollbar-none"
      >
        {categories.map((category) => (
          <button
            key={category.label}
            type="button"
            className="relative shrink-0 cursor-pointer overflow-hidden rounded-xl text-left shadow-[0px_4px_20px_0px_#0000000A]"
          >
            <img
              src={category.image}
              alt={category.label}
              className="h-[100px] w-[242.6px] rounded-xl object-cover"
            />
            <span className="absolute bottom-3 left-4           text-xl font-semibold leading-[24px] text-white">
              {category.label}
            </span>
          </button>
        ))}

        {categoriesSecondary.map((category) => (
          <div
            key={`${category.label}-secondary`}
            className="flex h-[112px] w-[233px] shrink-0 items-center justify-between gap-[10px] overflow-hidden rounded-[12px] bg-[#F5F5F5] p-[16px] shadow-[0px_4px_20px_0px_#0000000A]"
          >
            <span className="          text-base font-semibold leading-[20px] text-[#171717]">
              {category.label}
            </span>
            <img
              src={category.image}
              alt={category.label}
              className="h-[76px] w-[76px] shrink-0 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollCategories}
        aria-label="Scroll categories right"
        className="absolute right-[50px] top-1/2 flex h-[48px] w-[48px] -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] bg-white shadow-[0px_2px_4px_0px_#0000000D]"
      >
        <img src={chevron} alt="" className="h-[24px] w-[24px]" />
      </button>
    </div>
  );
}
