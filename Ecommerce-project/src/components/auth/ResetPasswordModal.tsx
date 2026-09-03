import closeOutline from "../../assets/icons/ri_close-line.svg";
import arrowLeft from "../../assets/icons/ri_arrow-left-s-line.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ResetPasswordModal({
  onClose,
  onSignIn,
}: {
  onClose: () => void;
  onSignIn: () => void;
}) {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const isEmailValid = emailRegex.test(email);

  const [step, setStep] = useState<"request" | "sent">("request");

  const handleSendResetLink = () => {
    if (!isEmailValid) return;

    setStep("sent");
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-[555px]  flex-col gap-5 rounded-[12px] border border-[#D4D4D4] bg-white pt-[40px] px-[40px] pb-[64px]  shadow-xl"
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

        {step === "request" ? (
          <>
            <button
              type="button"
              onClick={onSignIn}
              className="flex items-center gap-2 w-[475px] h-[24px] cursor-pointer"
            >
              <img src={arrowLeft} alt="" className="w-[24px] h-[24px]" />
              <p className="text-sm  text-[#525252] leading-[20px] font-['DM_Sans']">
                Back
              </p>
            </button>
            <div>
              <h1 className=" mb-2 font-[700] text-[23px] leading-[28px] tracking-[-0.2] text-[#171717]">
                Reset password
              </h1>
              <p className="font-[400]  text-base leading-[24px] text-[#262626]">
                Enter your email to receive reset link.
              </p>
            </div>

            <div>
              <label
                htmlFor="#"
                className="font-[500] text-sm leading-[20px] text-[#525252]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className=" mt-2 placeholder:text-[16px] h-[56px] w-[475px] rounded-[12px] border border-[#D4D4D4] px-4 py-3.5  outline-none font-[400] text-base leading-[24px]"
              />
            </div>

            <button
              type="button"
              disabled={!isEmailValid}
              onClick={handleSendResetLink}
              className={`w-[475px] h-[56px] rounded-[43px] py-[16px] px-[40px] font-semibold text-base font-['DM_Sans'] leading-[24px] font-600 ${
                isEmailValid
                  ? "bg-black text-white cursor-pointer"
                  : "bg-[#E5E5E5] text-[#FAFAFA]"
              }`}
            >
              Send Reset Link
            </button>
          </>
        ) : (
          <>
            <h1 className=" font-[700] text-[23px] font-bold leading-[28px] tracking-[-0.1] text-[#171717]">
              Check your inbox
            </h1>
            <p className="font-[400]     text-base leading-[24px] text-[#262626]">
              We sent a reset link to markjones@gmail.com. Didn't get it? Check
              your spam folder or{" "}
              <a
                href="#"
                className="text-black underline font-[500] leading-[24px] text-base"
              >
                Resend link
              </a>
            </p>

            <button
              type="button"
              onClick={() => {
                onClose();
                navigate("/");
              }}
              className="w-[475px] h-[56px] rounded-[43px] bg-[#171717] py-[16px] px-[40px] font-semibold text-base font-['DM_Sans'] leading-[24px] font-600 text-white cursor-pointer"
            >
              Continue Shopping
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
