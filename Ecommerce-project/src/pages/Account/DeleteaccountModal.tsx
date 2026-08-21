import closeOutline from "../../assets/icons/ri_close-line.svg";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type DeleteAccountProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteAccount({
  onConfirm,
  onClose,
}: DeleteAccountProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div className=" w-[555px] h-[404px] py-[40px] px-[64px] flex flex-col gap-[24px] bg-[#FFFFFF] rounded-[12px] shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <img src={closeOutline} alt="" className="w-[32px] h-[32px]" />
        </button>

        <h2 className="font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.02] text-[#171717]">
          Confirm account deletion
        </h2>

        <p className="font-[400] text-base leading-[24px] texting-[#262626]">
          Are you sure you want to delete your account? This permanently removes
          your account and all data. This can't be undone.
        </p>

        <button
          onClick={onConfirm}
          className="py-[16px] px-[40px] rounded-[43px] text-base leading-[24px] font-semibold text-[#FAFAFA] bg-[#171717] cursor-pointer"
        >
          Yes, delete my account
        </button>
        <button
          onClick={onClose}
          className="py-[16px] px-[40px] rounded-[43px] text-base leading-[24px] font-semibold text-[#404040] font-[600] cursor-pointer"
        >
          No, keep my account
        </button>
      </div>
    </div>,
    document.body,
  );
}
