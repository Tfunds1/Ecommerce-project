import { useState } from "react";
import paystackIcon from "../../../assets/icons/simple-icons_applepay.svg";
import bankIcon from "../../../assets/icons/ri_bank-line.svg";
import cardIcon from "../../../assets/icons/ri_bank-card-line.svg";
import questionLineIcon from "../../../assets/icons/ri_question-line.svg";
import gradient from "../../../assets/Ellipse.svg";
import type { CardDetails, PaymentMethod } from "../type";

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "paystack", label: "Paystack", icon: paystackIcon },
  { id: "bank-transfer", label: "Bank Transfer", icon: bankIcon },
  { id: "card", label: "Credit Card", icon: cardIcon },
];

const inputCls =
  "h-12 w-full rounded-[10px] border border-[#A3A3A3] px-4 placeholder:text-base placeholder:text-[#A3A3A3] outline-none focus:border-[#171717]";
const labelCls = "text-sm text-[#171717]";

const emptyCard: CardDetails = {
  number: "",
  expiry: "",
  cvc: "",
  saveDefault: false,
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

type PaymentFormProps = {
  initialValue: string | null;
  isLoading: boolean;
  onPlaceOrder: (paymentId: string) => void;
};

export default function PaymentForm({
  initialValue,
  isLoading,
  onPlaceOrder,
}: PaymentFormProps) {
  const [draft, setDraft] = useState<string | null>(initialValue);
  const [card, setCard] = useState<CardDetails>(emptyCard);

  return (
    <div className="flex flex-col gap-4">
      {PAYMENT_METHODS.map((p) => {
        const checked = draft === p.id;
        return (
          <div
            key={p.id}
            className="rounded-[16px] border border-[#E5E5E5] bg-white px-6 py-5"
          >
            <label className="flex cursor-pointer items-center gap-4">
              <input
                type="radio"
                name="payment-method"
                value={p.id}
                checked={checked}
                onChange={() => setDraft(p.id)}
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
              <span className="text-base font-medium text-[#171717]">
                {p.label}
              </span>
              <img src={p.icon} alt="" className="ml-auto h-6 w-6" />
            </label>

            {checked && p.id === "card" && (
              <div className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cardNumber" className={labelCls}>
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    value={card.number}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        number: formatCardNumber(e.target.value),
                      })
                    }
                    className={`${inputCls} placeholder:text-[#A3A3A3]`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="expiry" className={labelCls}>
                      Expiry Date
                    </label>
                    <input
                      id="expiry"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({
                          ...card,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                      className={`${inputCls} placeholder:text-[#A3A3A3]`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cvc" className={labelCls}>
                      CVC
                    </label>
                    <div className="relative">
                      <input
                        id="cvc"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="•••"
                        value={card.cvc}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        className={`${inputCls} pr-11 placeholder:text-[#A3A3A3]`}
                      />
                      <img
                        src={questionLineIcon}
                        alt=""
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-help"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={card.saveDefault}
                    onChange={(e) =>
                      setCard({ ...card, saveDefault: e.target.checked })
                    }
                    className="h-4 w-4 cursor-pointer rounded border-[#A3A3A3] accent-[#171717]"
                  />
                  <span className="text-sm text-[#171717]">
                    Set as default card
                  </span>
                </label>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => draft && onPlaceOrder(draft)}
        disabled={!draft}
        className={`mt-2 h-[52px] flex items-center justify-center w-full cursor-pointer rounded-full bg-[#171717] text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 ${
          isLoading
            ? "cursor-not-allowed bg-[#737373] text-white"
            : draft
              ? "cursor-pointer bg-black text-white"
              : "bg-[#E5E5E5] text-[#FAFAFA]"
        }`}
      >
        {isLoading ? (
          <img src={gradient} alt="Loading" className="h-6 w-6 animate-spin" />
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
}

export { PAYMENT_METHODS };
