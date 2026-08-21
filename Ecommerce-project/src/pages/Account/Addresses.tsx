import { useEffect, useRef, useState } from "react";
import moreIcon from "../../assets/icons/ri_more-fill.png";
import arrowDown from "../../assets/icons/ri_arrow-down-s-line.svg";

const text = "font-[500] text-sm leading-[20px] text-[#525252]";
const inputCls =
  "h-12 w-full rounded-[12px] border border-[#D4D4D4] px-[16px] py-[14px] font-[400] text-base text-[#171717] outline-none focus:border-[#171717] leading-[24px]";

const labelCls = " font-[500] text-sm text-[#525252] leading-[20px]";

type ShippingAddress = {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

const DEFAULT_ADDRESS: ShippingAddress = {
  country: "Nigeria",
  firstName: "Mark",
  lastName: "Jones",
  address: "Otigba Street, Computer Village",
  city: "Ikeja",
  state: "Lagos",
  zip: "100282",
  phone: "0811 138 6111",
};

const COUNTRIES = [
  "Nigeria",
  "USA",
  "Russia",
  "Canada",
  "Brazil",
  "Australia",
  "Poland",
  "Argentina",
];

const NIGERIAN_STATES = [
  "Lagos",
  "FCT - Abuja",
  "Ogun",
  "Oyo",
  "Rivers",
  "Kano",
  "Kwara",
  "Ondo",
];

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

export default function Addresses() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [address, setAddress] = useState<ShippingAddress>(DEFAULT_ADDRESS);
  const [addressDraft, setAddressDraft] = useState<ShippingAddress>(address);

  const saveAddress = () => {
    setAddress(addressDraft);
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

  const startEditing = () => {
    setAddressDraft(address);
    setIsEditing(true);
    setIsOpen(false);
  };

  const cancelEditing = () => {
    setAddressDraft(address);
    setIsEditing(false);
  };

  return (
    <div className="w-[549px]">
      <div className="flex justify-between items-center gap-[8px] mb-[32px]">
        <h1 className="mb-[16px] font-[700] font-bold text-[23px] leading-[28px] tracking-[-0.01em] text-[#262626]">
          Addresses
        </h1>
        <button
          type="button"
          className="max-w-[123px] rounded-[43px] py-[10px] px-[24px] text-[12px] leading-[16px] font-semibold text-[#404040] bg-[#E5E5E5] cursor-pointer"
        >
          Add Address
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
                aria-expanded={isOpen}
                className="cursor-pointer"
              >
                <img src={moreIcon} alt="" className="w-[24px] h-[24px]" />
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="mt-[24px] flex flex-col gap-[14px]">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="country" className={labelCls}>
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  value={addressDraft.country}
                  onChange={(e) =>
                    setAddressDraft({
                      ...addressDraft,
                      country: e.target.value,
                    })
                  }
                  className={`${inputCls} appearance-none bg-white pr-10`}
                >
                  {COUNTRIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <img
                  src={arrowDown}
                  alt=""
                  className="w-[24px] h-[24px] absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <TextField
                id="firstName"
                label="First Name"
                value={addressDraft.firstName}
                onChange={(v) =>
                  setAddressDraft({ ...addressDraft, firstName: v })
                }
              />
              <TextField
                id="lastName"
                label="Last Name"
                value={addressDraft.lastName}
                onChange={(v) =>
                  setAddressDraft({ ...addressDraft, lastName: v })
                }
              />
            </div>

            <TextField
              id="address"
              label="Street Address"
              value={addressDraft.address}
              onChange={(v) => setAddressDraft({ ...addressDraft, address: v })}
            />

            <div className="grid grid-cols-2 gap-[16px]">
              <TextField
                id="city"
                label="City/Town"
                value={addressDraft.city}
                onChange={(v) => setAddressDraft({ ...addressDraft, city: v })}
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="state" className={labelCls}>
                  State
                </label>
                <div className="relative">
                  <select
                    id="state"
                    value={addressDraft.state}
                    onChange={(e) =>
                      setAddressDraft({
                        ...addressDraft,
                        state: e.target.value,
                      })
                    }
                    className={`${inputCls} appearance-none bg-white pr-10`}
                  >
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <img
                    src={arrowDown}
                    alt=""
                    className="w-[24px] h-[24px] absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <TextField
                id="zip"
                label="Zip Code"
                value={addressDraft.zip}
                onChange={(v) => setAddressDraft({ ...addressDraft, zip: v })}
              />
              <TextField
                id="phone"
                label="Mobile Number"
                value={addressDraft.phone}
                onChange={(v) => setAddressDraft({ ...addressDraft, phone: v })}
              />
            </div>

            <div className="max-w-[286px] flex items-center gap-[16px]">
              <button
                type="button"
                onClick={saveAddress}
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
          <div className="flex flex-col gap-[4px] mt-[8px]">
            <p className="font-[700] font-bold text-sm leading-[20px] text-[#404040]">
              {address.firstName} {address.lastName}
            </p>
            <p className={text}>
              {address.address}, {address.city}, {address.state}
            </p>
            <p className={text}>{address.zip}</p>
            <p className={text}>{address.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
