import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { currency } from "../../data/products";

type OrderSummaryProps = {
  showCheckoutButton?: boolean;
};

export default function OrderSummary({
  showCheckoutButton = true,
}: OrderSummaryProps) {
  const { itemCount, subtotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();
  return (
    <aside className="w-[447px]   rounded-[12px] border border-[#E5E5E5] ">
      <div className="flex flex-col gap-[24px] p-[32px]">
        <h2 className="text-xl font-bold text-[#171717]">Summary</h2>

        <div className="flex flex-col gap-2.5           text-base leading-[24px]">
          <div className="flex items-center justify-between">
            <span className="text-[#525252]">Items</span>
            <span className="text-[#262626]">{itemCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className=" font-[400] text-[#262626]">Subtotal</span>
            <span className=" font-[500] font-medium text-[#171717]">
              {currency.format(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#525252]">Delivery</span>
            <span className="text-[#737373]">Calculated at checkout</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#525252]">Tax</span>
            <span className="text-[#737373]">Calculated at checkout</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-4  text-base font-bold font-700 mb-[14px] text-[#262626]">
          <span>Total</span>
          <span>{currency.format(subtotal)}</span>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="discount-code"
            className=" text-sm font-medium text-[#525252] font-[500] leading-[20px]"
          >
            Discount Code
          </label>
          <div className="flex  justify-between  items-center gap-[16px]">
            <input
              id="discount-code"
              type="text"
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value)}
              placeholder="Enter code"
              className="  rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] font-[400]          text-base  outline-none placeholder:text-[#A3A3A3]"
            />
            <button
              type="button"
              className=" w-[110px] cursor-pointer rounded-full border border-[#E5E5E5] px-[24px] py-[16px]  font-[600]         text-sm font-semibold text-[#404040] hover:bg-[#FAFAFA]"
            >
              Apply
            </button>
          </div>
        </div>

        {showCheckoutButton && (
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="h-[52px] cursor-pointer rounded-full bg-[#171717]  text-sm font-semibold text-white hover:bg-black"
          >
            Checkout
          </button>
        )}
      </div>
    </aside>
  );
}
