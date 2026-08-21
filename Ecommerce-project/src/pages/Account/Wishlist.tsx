import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();
  return (
    <div className="w-[549px] h-[448px]">
      <h1 className="mb-[16px] font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01] text-[#262626]  ">
        Wishlist
      </h1>

      <div className="flex flex-col items-center justify-center gap-[16px]  h-[388px]">
        <p className="font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01] text-[#262626]">
          Your wishlist is waiting
        </p>
        <span className="text-[#404040] font-[400] text-base leading-[24px]">
          Tap the heart icon on any product to save it here.
        </span>
        <button
          type="button"
          onClick={() => navigate("/")}
          className=" max-w-[165px] rounded-[43px] py-[14px] px-[32px] text-sm leading-[20px] font-semibold font-600 text-[#404040] bg-[#E5E5E5] cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}
