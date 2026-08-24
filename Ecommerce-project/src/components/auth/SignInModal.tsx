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
  "flex w-[475px] h-[56px] items-center justify-center gap-[16px] rounded-[43px] border-[1px] border-[#D4D4D4] py-[16px] px-[40px] text-base font-medium text-[#262626] font-500 hover:bg-gray-50";

const nextButtonClass = (enabled: boolean) =>
  `w-[475px] h-[56px] rounded-[43px] py-[16px] px-[40px] font-semibold text-base leading-[23px] font-600 ${
    enabled
      ? "bg-black text-white cursor-pointer"
      : "bg-[#E5E5E5] text-[#FAFAFA]"
  }`;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInModal({
  onClose,
  onSignUp,
}: {
  onClose: () => void;
  onSignUp: () => void;
}) {
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
        email: "markjones@gmail.com",
        phone: "0811 138 6111",
        country: "Nigeria",
      });
      onClose();
      navigate("/account/personal-details");
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
        className="relative flex w-[555px] flex-col gap-[24px] rounded-[12px] border border-[#D4D4D4] bg-white pt-[40px] px-[40px] pb-[64px] shadow-[0px 2px 4px 0px #0000000D] shadow-[0px 20px 35px 0px #00000026]
"
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
            <h1 className="w-[199px] text-[23px] font-bold leading-[28px] tracking-[-0.01em] text-[#171717]">
              Sign in to Shoppii
            </h1>

            <div>
              <label
                htmlFor="modal-email"
                className="mb-1 block h-5 w-[475px] text-sm font-[500] font-medium leading-5 tracking-normal text-[#525252]"
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
              <div className="w-[195px] h-[2px] bg-[#E5E5E5]" />
              OR
              <div className="w-[195px] h-[2px] bg-[#E5E5E5]" />
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
            <p className=" flex gap-[4px]  justify-center    font-400 leading-[24px]  text-base text-[#262626]">
              New to Shoppii?
              <a
                href="#"
                onClick={onSignUp}
                className="text-base    font-500 font-medium leading-[24px] text-[#262626] underline"
              >
                Create an account
              </a>
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <h1 className="text-[23px] font-bold leading-[28px] tracking-[-0.01em] text-[#171717]">
              Welcome back
            </h1>

            <div className="relative">
              <input
                type="email"
                value={email}
                disabled
                className="h-[48px] w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-[#525252] outline-none"
              />

              <button
                type="button"
                disabled={isLoading}
                onClick={() => setStep("email")}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-semibold text-[#262626] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Change Email
              </button>
            </div>

            <div>
              <label
                htmlFor="modal-password"
                className="mb-1 block text-sm font-medium leading-5 text-[#525252]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="modal-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSignIn();
                  }}
                  placeholder="Enter password"
                  className="h-[56px] w-full rounded-xl border border-gray-200 px-4 pr-12 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3]"
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

              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  className="text-xs font-medium text-[#262626] underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="button"
              disabled={!isPasswordValid || isLoading}
              onClick={handleSignIn}
              className={`flex h-[56px] w-full items-center justify-center rounded-[43px] px-10 py-4 text-base font-semibold leading-[23px] ${
                isLoading
                  ? "cursor-not-allowed bg-[#737373] text-white"
                  : isPasswordValid
                    ? "cursor-pointer bg-black text-white"
                    : "bg-[#E5E5E5] text-[#FAFAFA]"
              }`}
            >
              {isLoading ? (
                <img
                  src={gradient}
                  alt="Loading"
                  className="h-6 w-6 animate-spin"
                />
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-base leading-6 text-[#525252]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setStep("email")}
                className="font-medium text-[#262626] underline"
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
