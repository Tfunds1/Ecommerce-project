import { useState } from "react";
import type { ShippingMethod } from "../type";

const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard-lagos",
    label: "Standard (Lagos)",
    eta: "2-5 business days",
    price: 3500,
  },
  {
    id: "standard-other",
    label: "Standard (Other States)",
    eta: "5-10 business days",
    price: 6500,
  },
];

type ShippingMethodFormProps = {
  initialValue: string | null;
  onSave: (value: string) => void;
};

export default function ShippingMethodForm({
  initialValue,
  onSave,
}: ShippingMethodFormProps) {
  const [draft, setDraft] = useState<string | null>(initialValue);

  return (
    <div className="flex flex-col gap-4">
      {SHIPPING_METHODS.map((m) => {
        const checked = draft === m.id;
        return (
          <label
            key={m.id}
            className="flex cursor-pointer items-center gap-4 rounded-[16px] border border-[#E5E5E5] bg-white p-6"
          >
            <input
              type="radio"
              name="shipping-method"
              value={m.id}
              checked={checked}
              onChange={() => setDraft(m.id)}
              className="peer sr-only"
            />
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[#171717]/30 ${
                checked ? "border-[#171717]" : "border-[#D4D4D4]"
              }`}
            >
              {checked && (
                <span className="h-3 w-3 rounded-full bg-[#171717]" />
              )}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-base font-medium text-[#171717]">
                {m.label}
              </span>
              <span className="text-sm text-[#737373]">{m.eta}</span>
            </span>
            <span className="ml-auto text-base font-semibold text-[#171717]">
              ₦{m.price}
            </span>
          </label>
        );
      })}

      <button
        type="button"
        onClick={() => draft && onSave(draft)}
        disabled={!draft}
        className="mt-1 cursor-pointer self-start rounded-full bg-[#171717] px-6 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Save
      </button>
    </div>
  );
}

export { SHIPPING_METHODS };
