import logo from "../../assets/logos/logo 2.svg";
import googleIcon from "../../assets/logos/logos_google-icon.svg";
import appleIcon from "../../assets/logos/logos_apple.svg";
import closeOutline from "../../assets/icons/ri_close-line.svg";
import arrowLeft from "../../assets/icons/ri_arrow-left-s-line.svg";
import arrowDown from "../../assets/icons/ri_arrow-down-s-line.svg";
import eyeIcon from "../../assets/icons/ri_eye-line.svg";
import flagNigeria from "../../assets/icons/twemoji_flag-nigeria.svg";
import { createPortal } from "react-dom";

import { useState, type FormEvent } from "react";

// import { useAuth } from "../../context/AuthContext";

const socialButtonClass =
  "flex w-[475px] h-[56px] items-center justify-center gap-[16px] rounded-[43px] border-[1px] border-[#D4D4D4] py-[16px] px-[40px] text-base font-medium text-[#262626] font-500 hover:bg-gray-50";

const nextButtonClass = (enabled: boolean) =>
  `w-[475px] h-[56px] rounded-[43px] py-[16px] px-[40px] font-semibold text-base  leading-[23px] font-600 ${
    enabled
      ? "bg-black text-white cursor-pointer"
      : "bg-[#E5E5E5] text-[#FAFAFA]"
  }`;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpModal({
  onClose,
  onSignIn,
}: {
  onClose: () => void;
  onSignIn: () => void;
}) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "details">("email");
  const isEmailValid = emailRegex.test(email);

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

  const handleNext = () => {
    if (!isEmailValid) return;
    setStep("details");
  };
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-[555px] flex-col gap-6 rounded-xl border border-gray-200 bg-white pt-10 pr-10 pb-16 pl-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <img src={closeOutline} alt="" className="w-[32px] h-[32px]" />
        </button>

        {step === "email" ? (
          <>
            <img src={logo} alt="Shoppii" className="h-[40px] w-[52px]" />
            <h1 className="w-[199px]   text-[23px] font-bold leading-[28px] tracking-[-0.01em] text-[#171717]">
              Sign up to Shoppii
            </h1>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block h-5 w-[475px] font-[500]   text-sm font-medium leading-5 tracking-normal text-[#525252]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="h-[56px] w-[475px] rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] text-base outline-none "
              />
            </div>

            <button
              type="button"
              disabled={!isEmailValid}
              onClick={handleNext}
              className={nextButtonClass(isEmailValid)}
            >
              Next
            </button>

            <div className="flex items-center gap-3 m-auto text-xs text-gray-400">
              <div className=" w-[194px] h-[2px]  bg-[#E5E5E5]" />
              OR
              <div className=" w-[194px] h-[2px]  bg-[#E5E5E5]" />
            </div>
            <div className="flex flex-col gap-[10px]">
              <button type="button" className={socialButtonClass}>
                <img src={googleIcon} alt="" className="h-5 w-5" />
                Continue with Google
              </button>
              <button type="button" className={socialButtonClass}>
                <img src={appleIcon} alt="" className="h-5 w-5" />
                Continue with Apple
              </button>
            </div>

            <p className="text-center font-400 leading-[24px]  text-base text-[#262626]">
              Already have an account?{" "}
              <a
                href="#"
                onClick={onSignIn}
                className="text-base font-500 font-medium leading-[24px] text-[#262626] underline"
              >
                Sign In
              </a>
            </p>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="flex items-center gap-2 w-[475px] h-[24px] cursor-pointer"
            >
              <img src={arrowLeft} alt="" className="w-[24px] h-[24px]" />
              <p className="text-sm  text-[#525252] leading-[20px]  ">Back</p>
            </button>

            <h1 className="max-w-[320px] h-[28px]   text-[23px] font-[700] leading-[28px] tracking-[-0.01em] text-[#171717]">
              Let's get your account set up
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-[20px]">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1 block h-[20px] w-[227.5px]   text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="h-[56px] w-[227.5px]   font-[400] rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] text-base text-[#171717] placeholder:text-[#A3A3A3] leading-[24px] outline-none focus:ring-2 focus:ring-black/10 "
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1 block h-[20px] w-[227.5px]   text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="h-[56px] w-[227.5px]   font-[400] rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] text-base text-[#171717] placeholder:text-[#A3A3A3] leading-[24px] outline-none focus:ring-2 focus:ring-black/10 "
                  />
                </div>
              </div>

              <div className="mt-[20px]">
                <label
                  htmlFor="number"
                  className="mb-1 block h-[20px] w-[475px] font-[500]   text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
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
                    className="h-[52px] w-[475px]    font-[400] text-base text-[#171717] placeholder:text-[#A3A3A3] leading-[24px] outline-none"
                  />
                  <button
                    type="button"
                    aria-label={
                      showMobileNumber
                        ? "Hide mobile number"
                        : "Show mobile number"
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
                  className="mb-1 block h-[20px] w-[475px] font-[500]   text-sm font-medium leading-[20px] tracking-normal text-[#525252]"
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
                    className={`h-[52px] w-[475px]   font-[400] rounded-[12px] border px-[16px] py-[14px] pr-[48px] text-base  placeholder:text-[#A3A3A3] leading-[24px] outline-none  ${
                      passwordError
                        ? "border-red-500 focus:ring-red-500/20"
                        : "border-[#D4D4D4] focus:ring-black/10"
                    }`}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-[16px] top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <img src={eyeIcon} alt="" className="h-[24px] w-[24px]" />
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1   text-sm leading-[20px] text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`mt-[24px]  h-[56px] w-[475px] rounded-[43px]   text-base font-[600] px-[40px] py-[16px] leading-[24px] ${
                  isFormValid
                    ? "bg-black text-white cursor-pointer"
                    : "bg-[#E5E5E5] text-[#FAFAFA]"
                }`}
              >
                Sign Up
              </button>

              <p className="mt-[28px] font-[400]  text-[12px]  text-sm leading-[16px] text-[#262626]">
                By clicking 'Sign Up', you agree to Shoppii's{" "}
                <span className="font-semibold font-[600] leading-[18px]  ">
                  Term
                </span>{" "}
                and{" "}
                <span className="font-semibold font-[600] leading-[18px]  ">
                  Privacy Policy
                </span>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
