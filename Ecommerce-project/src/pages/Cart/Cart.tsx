import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import SearchInput from "../../components/search/SearchInput";
import { currency } from "../../data/products";
import { useCart } from "../../context/CartContext";
import OrderSummary from "../Cart/OrderSummary";

import heartIcon from "../../assets/icons/ri_heart-3-line.png";
import deleteBinIcon from "../../assets/icons/ri_delete-bin-6-line.png";

export default function Cart() {
  const { lines, updateQuantity, removeLine } = useCart();
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-[1341px] flex-col gap-8 px-[20px] py-[32px]">
          <h1 className="          text-2xl font-bold text-[#171717]">Cart</h1>

          {lines.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16">
              <p className=" text-sm text-[#737373]">Your cart is empty.</p>
              <Link
                to="/"
                className=" text-sm font-medium text-[#171717] underline"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_447px]">
              <div className="flex flex-col divide-y divide-[#E5E5E5]">
                {lines.map((line) => (
                  <div
                    key={line.lineId}
                    className="flex items-center  gap-4 py-5 first:pt-0"
                  >
                    <div className="flex  shrink-0 items-center justify-center  ">
                      <img
                        src={line.product.image}
                        alt={line.product.title}
                        className="h-[152px] w-[143px] object-contain"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="          text-xl font-medium text-[#262626] leading-[24px]">
                            {line.product.title}
                          </p>
                          <p className="          text-base font-medium text-[#737373] leading-[24px]">
                            {line.product.brand}
                          </p>
                        </div>
                        <span className="          leading-[22px] text-[20px] font-semibold text-[#171717]">
                          {currency.format(line.product.price * line.quantity)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <div className="mt-2 flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F5F5F5] p-[4px] w-fit">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(line.lineId, line.quantity - 1)
                            }
                            className=" w-[28px] h-[28px] cursor-pointer           rounded-full text-base font-medium text-[#A3A3A3] bg-[#FFFFFF]"
                            disabled={line.quantity <= 1}
                          >
                            −
                          </button>

                          <span className="w-4 text-center           text-sm font-medium text-[#171717]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(line.lineId, line.quantity + 1)
                            }
                            className="w-[28px] h-[28px] cursor-pointer           rounded-full text-base font-medium text-[#2626263] bg-[#FFFFFF]"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3           leading-[20px] text-xs font-medium text-[#404040]">
                          <div className="flex gap-[4px]">
                            <img
                              src={heartIcon}
                              alt=""
                              className="w-[18px] h-[18px]"
                            />
                            <button
                              type="button"
                              className="cursor-pointer hover:text-[#171717]"
                            >
                              Save for later
                            </button>
                          </div>
                          <span className="text-[#E5E5E5]">|</span>
                          <div className="flex gap-[4px]">
                            <img
                              src={deleteBinIcon}
                              alt=""
                              className="w-[18px] h-[18px]"
                            />
                            <button
                              type="button"
                              onClick={() => removeLine(line.lineId)}
                              className="cursor-pointer hover:text-[#171717]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <OrderSummary />
            </div>
          )}

          <div className="fixed bottom-10fixed bottom-10 left-1/2 -translate-x-1/2 ">
            <SearchInput />
          </div>
        </section>
      </main>
    </div>
  );
}
