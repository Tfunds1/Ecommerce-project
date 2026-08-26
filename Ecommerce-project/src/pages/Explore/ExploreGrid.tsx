import { categories } from "../../data/data";
import { exploreCategories } from "../../data/data";
import Sidebar from "../../components/layout/Sidebar";
import arrowRight from "../../assets/icons/ri_arrow-right-s-line.svg";
import ExploreCard from "./ExploreCard";
import SearchInput from "../../components/search/SearchInput";

export default function ExploreGrid() {
  return (
    <div className="flex  bg-[#FFFFFF]">
      <Sidebar />
      <div className=" w-[1341px] mx-auto flex flex-col p-[40px] gap-[40px]">
        <div>
          <h1 className=" mb-[4px] font-[600] font-semibold text-[32px] leading-[40px] tracking-[-0.05em] text-[#171717]">
            Explore
          </h1>
          <p className="font-[400] text-base leading-[24px] text-[#737373]">
            Discover thousands of brands and products
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-5 gap-y-[24px] gap-x-[24px] shadow-[ 0px 4px 20px 0px #0000000A] ">
            {categories.map((category) => (
              <button
                key={category.label}
                type="button"
                className="relative h-[152px] w-[233px] rounded-[12px] shrink-0 cursor-pointer overflow-hidden rounded-xl text-left shadow-[0px_4px_20px_0px_#0000000A]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_100%)] "></div>
                <img
                  src={category.image}
                  alt={category.label}
                  className=" w-full h-full  object-cover "
                />
                <span className="absolute bottom-3 left-4 text-[18px] font-[600] font-semibold leading-[24px] text-white">
                  {category.label}
                </span>
                <img
                  src={arrowRight}
                  alt=""
                  className="absolute bottom-3 right-4"
                />
              </button>
            ))}

            {exploreCategories.map((category) => (
              <button
                key={category.label}
                type="button"
                className="relative h-[152px] w-[233px] rounded-[12px] shrink-0 cursor-pointer overflow-hidden rounded-xl text-left shadow-[0px_4px_20px_0px_#0000000A]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_100%)] "></div>
                <img
                  src={category.image}
                  alt={category.label}
                  className=" w-full h-full  object-cover "
                />
                <span className="absolute bottom-3 left-4 text-[18px] font-[600] font-semibold leading-[24px] text-white">
                  {category.label}
                </span>
                <img
                  src={arrowRight}
                  alt=""
                  className="absolute bottom-3 right-4"
                />
              </button>
            ))}
          </div>
        </div>
        <ExploreCard />
      </div>
      <div className="fixed  bottom-10 left-1/2 -translate-x-1/2 ">
        <SearchInput />
      </div>
    </div>
  );
}
