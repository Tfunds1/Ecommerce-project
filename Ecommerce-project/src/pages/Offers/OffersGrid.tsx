import chevronDown from "../../assets/icons/ri_arrow-down-s-line.svg";

import filterIcon from "../../assets/icons/ri_filter-3-fill.png";
import SearchInput from "../../components/search/SearchInput";
import Sidebar from "../../components/layout/Sidebar";
import { products, type Product } from "../../data/products";
import OffersCard from "./OffersCard";

const filterPills = ["Category", "Ratings", "Price", "Type", "Discount"];
export default function OffersGrid() {
  return (
    <div className=" flex w-[1341px] h-[900px] bg-[#FFFFFF] ">
      <Sidebar />
      <div className="p-[40px] flex flex-col gap-[24px] ">
        <h1 className="text-[23px] leading-[28px] font-[700] text-[#171717]">
          Offers
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#E5E5E5] px-4 py-2  text-sm font-medium text-[#171717] hover:bg-[#FAFAFA]"
          >
            All filters
            <img src={filterIcon} alt="" className="h-[18px] w-[18px]" />
          </button>
          {filterPills.map((label) => (
            <button
              key={label}
              type="button"
              className="flex  cursor-pointer items-center gap-1 rounded-full border border-[#E5E5E5] pr-[8px] pl-[16px] py-[8px]   text-sm  leading-[20px] font-medium text-[#525252] hover:bg-[#FAFAFA]"
            >
              {label}
              <img src={chevronDown} alt="" className="h-[18px] w-[18px]" />
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product: Product) => (
            <OffersCard key={product.id} product={product} />
          ))}
          ;
        </div>
        <div className="fixed  bottom-10 left-1/2 -translate-x-1/2 ">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}
