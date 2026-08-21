import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo 2.svg";
import googleIcon from "../../assets/logos/logos_google-icon.svg";
import appleIcon from "../../assets/logos/logos_apple.svg";
import closeOutline from "../../assets/icons/ri_close-line.svg";

const socialButtonClass =
  "flex w-[475px] h-[56px] font-['DM_Sans'] items-center justify-center gap-[16px] rounded-[43px] border-[1px] border-gray-200 py-[16px] px-[40px] text-base font-medium text-[#262626] font-500 hover:bg-gray-50";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isEmailValid = emailRegex.test(email);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
      <div className="relative flex w-[555px] flex-col gap-6 rounded-xl border border-gray-200 bg-white pt-10 pr-10 pb-16 pl-10 shadow-xl">
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <img src={closeOutline} alt="" className="w-[32px] h-[32px]" />
        </button>

        <img src={logo} alt="Shoppii" className="h-[40px] w-[52px]" />

        <h1 className="w-[199px] font-['DM_Sans'] text-[23px] font-bold leading-[28px] tracking-[-0.01em] text-[#171717]">
          Sign up to Shoppii
        </h1>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block h-5 w-[475px] font-['DM_Sans'] text-sm font-medium leading-5 tracking-normal text-[#525252]"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="h-[56px] w-[475px] rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <button
          type="button"
          disabled={!isEmailValid}
          onClick={() => navigate("/signup/details")}
          className={`w-[475px] h-[56px] rounded-[43px] py-[16px] px-[40px] font-semibold text-base font-['DM_Sans'] leading-[23px] font-600 ${
            isEmailValid
              ? "bg-black text-white cursor-pointer"
              : "bg-[#E5E5E5] text-[#FAFAFA]"
          }`}
        >
          Next
        </button>

        <div className="flex items-center gap-3 m-auto text-xs text-gray-400">
          <div className=" w-[194px] h-[2px]  bg-gray-200" />
          OR
          <div className=" w-[194px] h-[2px]  bg-gray-200" />
        </div>

        <button type="button" className={socialButtonClass}>
          <img src={googleIcon} alt="" className="h-5 w-5" />
          Continue with Google
        </button>
        <button type="button" className={socialButtonClass}>
          <img src={appleIcon} alt="" className="h-5 w-5" />
          Continue with Apple
        </button>

        <p className="text-center font-['DM_Sans'] font-400 leading-[24px]  text-base text-[#262626]">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signin");
            }}
            className="text-base font-['DM_Sans'] font-500 leading-[24px] text-[#262626] underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
