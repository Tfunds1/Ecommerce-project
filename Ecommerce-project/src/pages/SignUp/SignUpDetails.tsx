import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import closeOutline from "../../assets/icons/ri_close-line.svg";
import arrowLeft from "../../assets/icons/ri_arrow-left-s-line.svg";
import arrowDown from "../../assets/icons/ri_arrow-down-s-line.svg";
import eyeIcon from "../../assets/icons/ri_eye-line.svg";
import flagNigeria from "../../assets/icons/twemoji_flag-nigeria.svg";

export default function SignUpDetails() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showMobileNumber, setShowMobileNumber] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    mobileNumber.trim().length >= 7 &&
    password.length >= 8;

  const passwordError =
    password.length > 0 && password.length < 8
      ? "Password must be at least 8 characters"
      : "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
  };

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

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 w-[475px] h-[24px] cursor-pointer"
        >
          <img src={arrowLeft} alt="" className="w-[24px] h-[24px]" />
          <p className="text-sm  text-[#525252] leading-[20px] font-['DM_Sans']">
            Back
          </p>
        </button>

        <h1 className="max-w-[320px] h-[28px] font-['DM_Sans'] text-[23px] font-[700] leading-[28px] tracking-[-0.01em] text-[#171717]">
          Let's get your account set up
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-[20px]">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block h-[20px] w-[227.5px] font-['DM_Sans'] text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="h-[56px] w-[227.5px] font-['DM_Sans'] font-[400] rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] text-base text-[#171717] placeholder:text-[#A3A3A3] leading-[24px] outline-none focus:ring-2 focus:ring-black/10 "
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block h-[20px] w-[227.5px] font-['DM_Sans'] text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="h-[56px] w-[227.5px] font-['DM_Sans'] font-[400] rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] text-base text-[#171717] placeholder:text-[#A3A3A3] leading-[24px] outline-none focus:ring-2 focus:ring-black/10 "
              />
            </div>
          </div>

          <div className="mt-[20px]">
            <label
              htmlFor="number"
              className="mb-1 block h-[20px] w-[475px] font-[500] font-['DM_Sans'] text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
            >
              Mobile Number
            </label>
            <div className=" relative flex  items-center gap-[8px] rounded-[12px] border border-[#D4D4D4] px-[16px]  focus-within:ring-2 focus-within:ring-black/10">
              <img
                src={flagNigeria}
                alt="Nigeria"
                className="h-[24px] w-[24px]"
              />
              <img src={arrowDown} alt="" className="h-[24px] w-[24px]" />

              <input
                id="number"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+234"
                className="h-[52px] w-[475px]  font-['DM_Sans'] font-[400] text-base text-[#171717] placeholder:text-[#A3A3A3] leading-[24px] outline-none"
              />
              <button
                type="button"
                aria-label={
                  showMobileNumber ? "Hide mobile number" : "Show mobile number"
                }
                onClick={() => setShowMobileNumber((prev) => !prev)}
                className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img src={eyeIcon} alt="" className="h-[24px] w-[24px]" />
              </button>
            </div>
          </div>

          <div className="mt-[20px]">
            <label
              htmlFor="password"
              className="mb-1 block h-[20px] w-[475px] font-[500] font-['DM_Sans'] text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`h-[52px] w-[475px] font-['DM_Sans'] font-[400] rounded-[12px] border px-[16px] py-[14px] pr-[48px] text-base  placeholder:text-[#A3A3A3] leading-[24px] outline-none  ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-[#D4D4D4] focus:ring-black/10"
                }`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <img src={eyeIcon} alt="" className="h-[24px] w-[24px]" />
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 font-['DM_Sans'] text-sm leading-[20px] text-red-500">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`mt-[24px]  h-[56px] w-[475px] rounded-[43px] font-['DM_Sans'] text-base font-[600] px-[40px] py-[16px] leading-[24px] ${
              isFormValid
                ? "bg-black text-white cursor-pointer"
                : "bg-[#E5E5E5] text-[#FAFAFA]"
            }`}
          >
            Sign Up
          </button>

          <p className="mt-[28px]  text-[12px] font- font-['DM_Sans'] text-sm leading-[20px] text-[#525252]">
            By clicking 'Sign Up', you agree to Shoppii's{" "}
            <span className="font-medium text-[#262626] ">Term</span> and{" "}
            <span className="font-medium text-[#262626] ">Privacy Policy</span>.
          </p>
        </form>
      </div>
    </div>
  );
}
