import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo 2.svg";
import googleIcon from "../../assets/logos/logos_google-icon.svg";
import appleIcon from "../../assets/logos/logos_apple.svg";
import closeOutline from "../../assets/icons/ri_close-line.svg";
import eyeIcon from "../../assets/icons/ri_eye-line.svg";
import gradient from "../../assets/Gradient.png";
import { useAuth } from "../../context/AuthContext";

const socialButtonClass =
  "flex w-[475px] h-[56px]           items-center justify-center gap-[16px] rounded-[43px] border-[1px] border-gray-200 py-[16px] px-[40px] text-base font-medium text-[#262626] font-500 hover:bg-gray-50";

const nextButtonClass = (enabled: boolean) =>
  `w-[475px] h-[56px] rounded-[43px] py-[16px] px-[40px] font-semibold text-base           leading-[23px] font-600 ${
    enabled
      ? "bg-black text-white cursor-pointer"
      : "bg-[#E5E5E5] text-[#FAFAFA]"
  }`;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInModal({ onClose }: { onClose: () => void }) {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signInTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 8;

  const handleNext = () => {
    if (!isEmailValid) return;
    setStep("password");
  };

  const handleSignIn = () => {
    if (!isPasswordValid || isLoading) return;
    setIsLoading(true);
    signInTimeoutRef.current = setTimeout(() => {
      signIn({
        firstName: "Mark",
        lastName: "Jones",
        email,
        phone: "0811 138 6111",
        country: "Nigeria",
      });
      onClose();
      navigate("/account");
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (signInTimeoutRef.current) clearTimeout(signInTimeoutRef.current);
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
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

        <img src={logo} alt="Shoppii" className="h-[40px] w-[52px]" />

        {step === "email" ? (
          <>
            <h1 className="w-[199px]           text-[23px] font-bold leading-[28px] tracking-[-0.01em] text-[#171717]">
              Sign in to Shoppii
            </h1>

            <div>
              <label
                htmlFor="modal-email"
                className="mb-1 block h-5 w-[475px]           text-sm font-medium leading-5 tracking-normal text-[#525252]"
              >
                Email Address
              </label>
              <input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNext();
                }}
                placeholder="Enter email address"
                className="h-[56px] w-[475px] rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
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
              <div className="w-[194px] h-[2px] bg-gray-200" />
              OR
              <div className="w-[194px] h-[2px] bg-gray-200" />
            </div>

            <button type="button" className={socialButtonClass}>
              <img src={googleIcon} alt="" className="h-5 w-5" />
              Continue with Google
            </button>
            <button type="button" className={socialButtonClass}>
              <img src={appleIcon} alt="" className="h-5 w-5" />
              Continue with Apple
            </button>
          </>
        ) : (
          <>
            <h1 className="          text-[23px] font-bold leading-[28px] tracking-[-0.01em] text-[#171717]">
              Welcome back
            </h1>

            <div className="relative flex text-center">
              <input
                type="email"
                value={email}
                disabled
                className="h-[48px] w-[475px] rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-[#525252] outline-none"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setStep("email")}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer           text-xs font-semibold text-[#262626] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Change Email
              </button>
            </div>

            <div>
              <label
                htmlFor="modal-password"
                className="mb-1 block           text-sm font-medium leading-5 text-[#525252]"
              >
                Password
              </label>
              <div className="relative flex text-center">
                <input
                  id="modal-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSignIn();
                  }}
                  placeholder="Enter password"
                  className="h-[56px] w-[475px] rounded-xl border border-gray-200 px-4 pr-12 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <img src={eyeIcon} alt="" className="h-6 w-6" />
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={!isPasswordValid || isLoading}
              onClick={handleSignIn}
              className={`flex items-center justify-center rounded-[43px] py-[16px] px-[40px] font-semibold text-base           leading-[23px] font-600 w-[475px] h-[56px] ${
                isLoading
                  ? "bg-[#737373] text-white cursor-not-allowed"
                  : isPasswordValid
                    ? "bg-black text-white cursor-pointer"
                    : "bg-[#E5E5E5] text-[#FAFAFA]"
              }`}
            >
              {isLoading ? (
                <img
                  src={gradient}
                  alt="Loading"
                  className="h-[24px] w-[24px] animate-spin"
                />
              ) : (
                "Sign In"
              )}
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
