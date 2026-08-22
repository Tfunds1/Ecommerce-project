import { useEffect, useRef, useState } from "react";
import moreIcon from "../../assets/icons/ri_more-fill.png";
import masterCardLogo from "../../assets/logos/logos_mastercard.png";

const inputCls =
  "h-12 w-full rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] font-[400] text-base text-[#171717] outline-none focus:border-[#171717] leading-[24px]";

const labelCls = " font-[500] text-sm text-[#525252] leading-[20px]";

type CardDetails = {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  saveDefault: boolean;
};

const DEFAULT_DETAILS: CardDetails = {
  name: "Mark Jones",
  number: "3428 4514 9448 7846",
  expiry: "12/30",
  cvc: "463",
  saveDefault: true,
};

const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 4)
    .replace(/(\d{2})(?=\d)/, "$1/");

const formatCvc = (v: string) => v.replace(/\D/g, "").slice(0, 4);

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

export default function SavedCards() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [details, setDetails] = useState<CardDetails>(DEFAULT_DETAILS);
  const [draftDetails, setDraftDetails] = useState<CardDetails>(details);
  const [card, setCard] = useState<CardDetails>(details);

  const savedDetails = () => {
    setDetails(draftDetails);
    setIsEditing(false);
  };

  const startEditing = () => {
    setDraftDetails(details);
    setIsEditing(true);
    setIsOpen(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  return (
    <div className="w-[549px] h-[448px]">
      <div className="flex justify-between items-center gap-[8px] mb-[32px]">
        <h1 className="mb-[16px] font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01em] text-[#262626]">
          Saved cards
        </h1>
        <button
          type="button"
          className="max-w-[131px] rounded-[43px] py-[10px] px-[24px] text-[12px] leading-[16px] font-semibold text-[#404040] bg-[#E5E5E5] cursor-pointer"
        >
          Add New Card
        </button>
      </div>

      <div className="p-[24px]">
        <div className="mb-[4px] flex justify-between">
          <button
            type="button"
            className="max-w-[58px] rounded-[43px] py-[4px] px-[8px] text-[12px] leading-[16px] font-semibold text-[#525252] bg-[#F5F5F5] cursor-pointer"
          >
            Default
          </button>

          <div className="relative" ref={menuRef}>
            {isOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-0 w-[131px] rounded-[12px] border border-[#F5F5F5] bg-white p-[12px] shadow-sm"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={startEditing}
                  className="w-full rounded-[8px] px-[8px] py-[6px] text-left text-base font-[400] leading-[24px] text-[#525252] hover:bg-[#F5F5F5] cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="w-full rounded-[8px] px-[8px] py-[6px] text-left text-base font-[400] leading-[24px] text-[#525252] hover:bg-[#F5F5F5] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="More options"
                aria-haspopup="menu"
                // aria-expanded={isOpen}
                className="cursor-pointer"
              >
                <img src={moreIcon} alt="" className="w-[24px] h-[24px]" />
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="mt-[24px] flex flex-col gap-[14px]">
            <TextField
              id="name"
              label="Name on Card"
              value={draftDetails.name}
              onChange={(v) => setDraftDetails({ ...draftDetails, name: v })}
            />
            <TextField
              id="number"
              label="Card Number"
              value={draftDetails.number}
              onChange={(v) =>
                setDraftDetails({
                  ...draftDetails,
                  number: formatCardNumber(v),
                })
              }
            />
            <div className="grid grid-cols-2 gap-[16px]">
              <TextField
                id="expiry"
                label="Expiry Date"
                value={draftDetails.expiry}
                onChange={(v) =>
                  setDraftDetails({ ...draftDetails, expiry: formatExpiry(v) })
                }
              />

              <TextField
                id="cvc"
                label="CVC"
                value={draftDetails.cvc}
                onChange={(v) =>
                  setDraftDetails({ ...draftDetails, cvc: formatCvc(v) })
                }
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={card.saveDefault}
                onChange={(e) =>
                  setCard({
                    ...card,
                    saveDefault: e.target.checked,
                  })
                }
                className="h-4 w-4 cursor-pointer rounded border-[#A3A3A3] accent-[#171717]"
              />
              <span className="          text-sm text-[#171717]">
                Set as default card
              </span>
            </label>
            <div className="max-w-[286px] flex items-center gap-[16px]">
              <button
                type="button"
                onClick={savedDetails}
                className="px-[32px] py-[14px] cursor-pointer rounded-[43px] bg-[#171717] font-[600] text-sm text-[#FAFAFA] font-semibold leading-[20px]"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="px-[32px] py-[14px] cursor-pointer rounded-[43px] border border-[#D4D4D4] text-sm text-[#404040] font-semibold leading-[20px]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-[16px]">
            <img src={masterCardLogo} alt="" />
            <div>
              <p className=" font-[600] font-bold text-base leading-[24px] text-[#404040]">
                Mastercard ending in 7846
              </p>
              <p className=" font-[400] text-sm leading-[20px] text-[#525252]">
                Expires 12/30
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

<div>
  <h1 className="mb-[16px] font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01] text-[#262626]  ">
    Saved cards
  </h1>

  <div className="flex flex-col items-center justify-center gap-[16px]  h-[388px]">
    <p className="font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01] text-[#262626]">
      No saved cards yet
    </p>
    <span className="text-[#404040] font-[400] text-base leading-[24px]">
      Save your credit or debit cards for faster, one-click checkout next time.
      Your payment details are securely encrypted.
    </span>
    <button
      type="button"
      className=" max-w-[165px] rounded-[43px] py-[14px] px-[32px] text-sm leading-[20px] font-semibold font-600 text-[#404040] bg-[#E5E5E5] cursor-pointer"
    >
      Add New Card
    </button>
  </div>

  <div className="p-[24px]">
    <div className="mb-[4px] flex justify-between">
      <button
        type="button"
        className="max-w-[58px] rounded-[43px] py-[4px] px-[8px] text-[12px] leading-[16px] font-semibold text-[#525252] bg-[#F5F5F5] cursor-pointer"
      >
        Default
      </button>
      <button
        type="button"
        // onClick={() => setIsOpen(true)}
        aria-label="More options"
        aria-haspopup="menu"
        // aria-expanded={isOpen}
        className="cursor-pointer"
      >
        <img src={moreIcon} alt="" className="w-[24px] h-[24px]" />
      </button>
    </div>
  </div>
</div>;
