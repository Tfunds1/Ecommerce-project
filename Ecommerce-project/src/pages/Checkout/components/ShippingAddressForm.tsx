import { useState } from "react";
import arrowDown from "../../../assets/icons/ri_arrow-down-s-line.svg";
import type { ShippingAddress } from "../type";

const inputCls =
  "h-12 w-full rounded-[10px] border border-[#A3A3A3] px-4 placeholder:text-base placeholder:text-[#A3A3A3] outline-none focus:border-[#171717]";
const labelCls = "text-sm text-[#171717]";

type ShippingAddressFormProps = {
  initialValue: ShippingAddress;
  onSave: (value: ShippingAddress) => void;
};

export default function ShippingAddressForm({
  initialValue,
  onSave,
}: ShippingAddressFormProps) {
  const [draft, setDraft] = useState<ShippingAddress>(initialValue);

  const update = (patch: Partial<ShippingAddress>) =>
    setDraft((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className={labelCls}>
            First Name
          </label>
          <input
            id="firstName"
            placeholder="John"
            value={draft.firstName}
            onChange={(e) => update({ firstName: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className={labelCls}>
            Last Name
          </label>
          <input
            id="lastName"
            placeholder="Doe"
            value={draft.lastName}
            onChange={(e) => update({ lastName: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="street" className={labelCls}>
          Street Address
        </label>
        <input
          id="street"
          placeholder="123, Main Street"
          value={draft.street}
          onChange={(e) => update({ street: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="city" className={labelCls}>
            City/Town
          </label>
          <input
            id="city"
            placeholder="Select City"
            value={draft.city}
            onChange={(e) => update({ city: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="state" className={labelCls}>
            State
          </label>
          <div className="relative">
            <input
              id="state"
              placeholder="Select State"
              value={draft.state}
              onChange={(e) => update({ state: e.target.value })}
              className={inputCls}
            />
            <img
              src={arrowDown}
              alt=""
              className="w-[24px] h-[24px] absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="zip" className={labelCls}>
            Zip Code
          </label>
          <input
            id="zip"
            placeholder="10000"
            inputMode="numeric"
            value={draft.zip}
            onChange={(e) => update({ zip: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="country" className={labelCls}>
            Country
          </label>
          <div className="relative">
            <input
              id="country"
              placeholder="Select Country"
              value={draft.country}
              onChange={(e) => update({ country: e.target.value })}
              className={inputCls}
            />
            <img
              src={arrowDown}
              alt=""
              className="w-[24px] h-[24px] absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={draft.differentBilling}
          onChange={(e) => update({ differentBilling: e.target.checked })}
          className="h-4 w-4 cursor-pointer rounded border-[#D4D4D4] accent-[#171717]"
        />
        <span className="text-sm text-[#171717]">
          Use a different billing address
        </span>
      </label>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className={labelCls}>
          Delivery Notes <span className="text-[#737373]">(Optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Special delivery instructions"
          value={draft.notes}
          onChange={(e) => update({ notes: e.target.value })}
          className="resize-none rounded-[10px] bg-[#F5F5F5] p-4 text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3]"
        />
      </div>

      <button
        type="button"
        onClick={() => onSave(draft)}
        className="mt-1 cursor-pointer self-center rounded-full border border-[#D4D4D4] bg-white px-8 py-2.5 text-sm font-medium text-[#171717]"
      >
        Save Address
      </button>
    </div>
  );
}
