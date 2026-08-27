import logo from "../../assets/logos/logo 2.svg";
import arrowLeft from "../../assets/icons/ri_arrow-left-s-line.svg";
import paystackIcon from "../../assets/icons/simple-icons_applepay.svg";
import bankIcon from "../../assets/icons/ri_bank-line.svg";
import cardIcon from "../../assets/icons/ri_bank-card-line.svg";
import arrowDown from "../../assets/icons/ri_arrow-down-s-line.svg";
import questionLineIcon from "../../assets/icons/ri_question-line.svg";
import gradient from "../../assets/Ellipse.svg";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../Cart/OrderSummary";
import { useState, useRef, useEffect } from "react";

type ContactInfo = {
  email: string;
  phone: string;
};

type ShippingAddress = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  differentBilling: boolean;
  notes: string;
};

type CheckoutStep = {
  number: number;
  title: string;
  summary: string[];
  hasForm: boolean;
};

const inputCls =
  "h-12 w-full rounded-[10px] border border-[#A3A3A3] px-4      text-sm text-[#171717] outline-none focus:border-[#171717]";
const labelCls = "     text-sm text-[#171717]";

const emptyShipping: ShippingAddress = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "Nigeria",
  differentBilling: false,
  notes: "",
};

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

type ShippingMethod = {
  id: string;
  label: string;
  eta: string;
  price: number;
};

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

type PaymentMethod = {
  id: string;
  label: string;
  icon: string;
};

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "paystack", label: "Paystack", icon: paystackIcon },
  { id: "bank-transfer", label: "Bank Transfer", icon: bankIcon },
  { id: "card", label: "Credit Card", icon: cardIcon },
];

type CardDetails = {
  number: string;
  expiry: string;
  cvc: string;
  saveDefault: boolean;
};

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

export default function Checkout({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOrder = () => {
    setIsloading(true);
    setPayment(paymentDraft);
    // setActiveStep(null);
    setTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 1200);
  };

  useEffect(() => {
    return () => {
      if (setTimeoutRef.current) clearTimeout(setTimeoutRef.current);
    };
  }, []);

  const [contact, setContact] = useState<ContactInfo>({
    email: "markjones@gmail.com",
    phone: "0811 138 6111",
  });
  const [draft, setDraft] = useState<ContactInfo>(contact);

  const [shipping, setShipping] = useState<ShippingAddress>(emptyShipping);
  const [shippingDraft, setShippingDraft] = useState<ShippingAddress>(shipping);

  const [method, setMethod] = useState<string | null>(null);
  const [methodDraft, setMethodDraft] = useState<string | null>(method);

  const [payment, setPayment] = useState<string | null>(null);
  const [paymentDraft, setPaymentDraft] = useState<string | null>(payment);
  const [card, setCard] = useState<CardDetails>(emptyCard);

  const openStep = (n: number) => {
    if (n === 1) setDraft(contact);
    if (n === 2) setShippingDraft(shipping);
    if (n === 3) setMethodDraft(method);
    if (n === 4) setPaymentDraft(payment);
    setActiveStep(n);
  };

  const saveContact = () => {
    setContact(draft);
    setActiveStep(shipping.street ? null : 2); // advance to shipping until it's filled
  };

  const saveShipping = () => {
    setShipping(shippingDraft);
    setActiveStep(method ? null : 3); // advance to shipping method until one is picked
  };

  const saveMethod = () => {
    setMethod(methodDraft);
    setActiveStep(payment ? null : 4); // advance to payment until it's chosen
  };

  // const placeOrder = () => {
  //   setPayment(paymentDraft);
  //   setActiveStep(null);
  //   console.log("order", { contact, shipping, method, payment: paymentDraft });
  // };

  const selectedMethod = SHIPPING_METHODS.find((m) => m.id === method);
  const selectedPayment = PAYMENT_METHODS.find((p) => p.id === payment);

  const steps: CheckoutStep[] = [
    {
      number: 1,
      title: activeStep === 1 ? "Contact Information" : "Contact Details",
      summary: [contact.email, contact.phone].filter(Boolean),
      hasForm: true,
    },
    {
      number: 2,
      title: "Shipping Address",
      summary: shipping.street
        ? [
            `${shipping.firstName} ${shipping.lastName}`.trim(),
            shipping.street,
            `${shipping.city}, ${shipping.state}`,
          ]
        : [],
      hasForm: true,
    },
    {
      number: 3,
      title: "Shipping Method",
      summary: selectedMethod
        ? [
            `${selectedMethod.label} — ₦${selectedMethod.price}`,
            selectedMethod.eta,
          ]
        : [],
      hasForm: true,
    },
    {
      number: 4,
      title: "Payment",
      summary: selectedPayment ? [selectedPayment.label] : [],
      hasForm: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header
        className="h-[78px] grid grid-cols-3 items-center border-b border-[#E5E5E5] shadow-[0px 1px 4px 2px #0000000D] 

backdrop-blur-[20px]
"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex w-[80px] h-[40px] cursor-pointer items-center gap-1      text-sm font-medium text-[#525252] hover:text-[#171717] ml-[64px]"
        >
          <img src={arrowLeft} alt="" className="h-5 w-5" />
          Back
        </button>

        <img src={logo} alt="UD Stores" className="mx-auto h-[48px] w-[63px]" />
      </header>

      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-[1fr_500px] max-w-[1440px] px-[200px] py-[40px] items-start">
        <div className="flex w-[500px] flex-col gap-[24px]">
          <h1 className="     text-2xl font-bold text-[#171717]">Checkout</h1>

          <div className="flex flex-col gap-[32px]">
            {steps.map((step) => {
              const isOpen = activeStep === step.number;
              return (
                <div key={step.number}>
                  <div className="flex items-start gap-[16px]">
                    <div className="flex h-6 items-center">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5E5E5]      text-xs font-medium text-[#171717]">
                        {step.number}
                      </div>
                    </div>

                    <div className="flex flex-1 items-center justify-between">
                      <h2 className="text-[18px] font-[400] leading-[24px] text-[#262626]">
                        {step.title}
                      </h2>
                      {!isOpen && step.hasForm && (
                        <button
                          type="button"
                          onClick={() => openStep(step.number)}
                          className="cursor-pointer font-[500]  text-sm font-medium text-[#262626] underline"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {!isOpen && step.summary.length > 0 && (
                    <div className="mt-1 flex flex-col gap-0.5 pl-[36px]">
                      {step.summary.map((line) => (
                        <p key={line} className="text-sm text-[#525252]">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  {isOpen && step.number === 1 && (
                    <div className="mt-4 flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className={labelCls}>
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={draft.email}
                          onChange={(e) =>
                            setDraft({ ...draft, email: e.target.value })
                          }
                          className={inputCls}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className={labelCls}>
                          Mobile Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={draft.phone}
                          onChange={(e) =>
                            setDraft({ ...draft, phone: e.target.value })
                          }
                          className={inputCls}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={saveContact}
                        className="mt-1 cursor-pointer self-start rounded-full bg-[#171717] px-6 py-2.5      text-sm font-medium text-white"
                      >
                        Save
                      </button>
                    </div>
                  )}

                  {isOpen && step.number === 2 && (
                    <div className="mt-4 flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="firstName" className={labelCls}>
                            First Name
                          </label>
                          <input
                            id="firstName"
                            value={shippingDraft.firstName}
                            onChange={(e) =>
                              setShippingDraft({
                                ...shippingDraft,
                                firstName: e.target.value,
                              })
                            }
                            className={inputCls}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="lastName" className={labelCls}>
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            value={shippingDraft.lastName}
                            onChange={(e) =>
                              setShippingDraft({
                                ...shippingDraft,
                                lastName: e.target.value,
                              })
                            }
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
                          value={shippingDraft.street}
                          onChange={(e) =>
                            setShippingDraft({
                              ...shippingDraft,
                              street: e.target.value,
                            })
                          }
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
                            value={shippingDraft.city}
                            onChange={(e) =>
                              setShippingDraft({
                                ...shippingDraft,
                                city: e.target.value,
                              })
                            }
                            className={inputCls}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="state" className={labelCls}>
                            State
                          </label>
                          <div className="relative">
                            <select
                              id="state"
                              value={shippingDraft.state}
                              onChange={(e) =>
                                setShippingDraft({
                                  ...shippingDraft,
                                  state: e.target.value,
                                })
                              }
                              className={`${inputCls} appearance-none bg-white pr-10`}
                            >
                              <option value="" disabled></option>
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

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="zip" className={labelCls}>
                            Zip Code
                          </label>
                          <input
                            id="zip"
                            inputMode="numeric"
                            value={shippingDraft.zip}
                            onChange={(e) =>
                              setShippingDraft({
                                ...shippingDraft,
                                zip: e.target.value,
                              })
                            }
                            className={inputCls}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="country" className={labelCls}>
                            Country
                          </label>
                          <div className="relative">
                            <select
                              id="country"
                              value={shippingDraft.country}
                              onChange={(e) =>
                                setShippingDraft({
                                  ...shippingDraft,
                                  country: e.target.value,
                                })
                              }
                              className={`${inputCls} appearance-none bg-white pr-10`}
                            >
                              <option value="Nigeria">Nigeria</option>
                            </select>
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
                          checked={shippingDraft.differentBilling}
                          onChange={(e) =>
                            setShippingDraft({
                              ...shippingDraft,
                              differentBilling: e.target.checked,
                            })
                          }
                          className="h-4 w-4 cursor-pointer rounded border-[#D4D4D4] accent-[#171717]"
                        />
                        <span className="     text-sm text-[#171717]">
                          Use a different billing address
                        </span>
                      </label>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="notes" className={labelCls}>
                          Delivery Notes{" "}
                          <span className="text-[#737373]">(Optional)</span>
                        </label>
                        <textarea
                          id="notes"
                          rows={3}
                          placeholder="Special delivery instructions"
                          value={shippingDraft.notes}
                          onChange={(e) =>
                            setShippingDraft({
                              ...shippingDraft,
                              notes: e.target.value,
                            })
                          }
                          className="resize-none rounded-[10px] bg-[#F5F5F5] p-4      text-sm text-[#171717] outline-none placeholder:text-[#A3A3A3]"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={saveShipping}
                        className="mt-1 cursor-pointer self-center rounded-full border border-[#D4D4D4] bg-white px-8 py-2.5      text-sm font-medium text-[#171717]"
                      >
                        Save Address
                      </button>
                    </div>
                  )}

                  {isOpen && step.number === 3 && (
                    <div className="mt-4 flex flex-col gap-4">
                      {SHIPPING_METHODS.map((m) => {
                        const checked = methodDraft === m.id;
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
                              onChange={() => setMethodDraft(m.id)}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[#171717]/30 ${
                                checked
                                  ? "border-[#171717]"
                                  : "border-[#D4D4D4]"
                              }`}
                            >
                              {checked && (
                                <span className="h-3 w-3 rounded-full bg-[#171717]" />
                              )}
                            </span>
                            <span className="flex flex-col gap-0.5">
                              <span className="     text-base font-medium text-[#171717]">
                                {m.label}
                              </span>
                              <span className="     text-sm text-[#737373]">
                                {m.eta}
                              </span>
                            </span>
                            <span className="ml-auto      text-base font-semibold text-[#171717]">
                              ₦{m.price}
                            </span>
                          </label>
                        );
                      })}

                      <button
                        type="button"
                        onClick={saveMethod}
                        disabled={!methodDraft}
                        className="mt-1 cursor-pointer self-start rounded-full bg-[#171717] px-6 py-2.5      text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Save
                      </button>
                    </div>
                  )}

                  {isOpen && step.number === 4 && (
                    <div className="mt-4 flex flex-col gap-4">
                      {PAYMENT_METHODS.map((p) => {
                        const checked = paymentDraft === p.id;
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
                                onChange={() => setPaymentDraft(p.id)}
                                className="peer sr-only"
                              />
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-[#171717]/30 ${
                                  checked
                                    ? "border-[#171717]"
                                    : "border-[#D4D4D4]"
                                }`}
                              >
                                {checked && (
                                  <span className="h-3 w-3 rounded-full bg-[#171717]" />
                                )}
                              </span>
                              <span className="     text-base font-medium text-[#171717]">
                                {p.label}
                              </span>
                              <img
                                src={p.icon}
                                alt=""
                                className="ml-auto h-6 w-6"
                              />
                            </label>

                            {checked && p.id === "card" && (
                              <div className="mt-5 flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                  <label
                                    htmlFor="cardNumber"
                                    className={labelCls}
                                  >
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
                                        number: formatCardNumber(
                                          e.target.value,
                                        ),
                                      })
                                    }
                                    className={`${inputCls} placeholder:text-[#A3A3A3]`}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-1.5">
                                    <label
                                      htmlFor="expiry"
                                      className={labelCls}
                                    >
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
                                            cvc: e.target.value
                                              .replace(/\D/g, "")
                                              .slice(0, 4),
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
                                      setCard({
                                        ...card,
                                        saveDefault: e.target.checked,
                                      })
                                    }
                                    className="h-4 w-4 cursor-pointer rounded border-[#A3A3A3] accent-[#171717]"
                                  />
                                  <span className="     text-sm text-[#171717]">
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
                        onClick={handleOrder}
                        disabled={!paymentDraft}
                        className={`mt-2 h-[52px] flex items-center justify-center w-full cursor-pointer rounded-full bg-[#171717]      text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 ${
                          isLoading
                            ? "cursor-not-allowed bg-[#737373] text-white"
                            : paymentDraft
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
                          "Place Order"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <OrderSummary showCheckoutButton={false} />
      </div>
    </div>
  );
}
