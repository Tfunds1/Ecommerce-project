import closeOutline from "../../assets/icons/ri_close-line.svg";
import { useNavigate } from "react-router-dom";

export default function ResetLinkSent() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
      <div className="relative flex w-[555px] h-[292px] flex-col gap-5 rounded-[12px] border border-[#D4D4D4] bg-white pt-[40px] px-[40px] pb-[64px]  shadow-xl">
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <img src={closeOutline} alt="" className="w-[32px] h-[32px]" />
        </button>
        <h1 className=" font-[700] text-[23px] font-bold leading-[28px] tracking-[-0.1] text-[#171717]">
          Check your inbox
        </h1>
        <p className="font-[400] font-['DM Sans']  text-base leading-[24px] text-[#262626]">
          We sent a reset link to markjones@gmail.com. Didn't get it? Check your
          spam folder or{" "}
          <a
            href="#"
            className="text-black underline font-[500] leading-[24px] text-base"
          >
            Resend link
          </a>
        </p>

        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="w-[475px] h-[56px] rounded-[43px] bg-[#171717] py-[16px] px-[40px] font-semibold text-base font-['DM_Sans'] leading-[24px] font-600 text-white cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
