import logo from "../../assets/logos/logo 2.svg";
import arrowLeft from "../../assets/icons/ri_arrow-left-s-line.svg";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../Cart/OrderSummary";
import { useState, useRef, useEffect } from "react";
import CheckoutStepShell from "./components/CheckoutStepShell";
import ContactInfoForm from "./components/ContactInfoForm";
import ShippingAddressForm from "./components/ShippingAddressForm";
import ShippingMethodForm, {
  SHIPPING_METHODS,
} from "./components/ShippingMethodForm";
import PaymentForm, { PAYMENT_METHODS } from "./components/PaymentForm";
import type { ContactInfo, ShippingAddress } from "./type";

const emptyContact: ContactInfo = { email: "", phone: "" };
const emptyShipping: ShippingAddress = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  differentBilling: false,
  notes: "",
};

export default function Checkout() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [contact, setContact] = useState<ContactInfo>(emptyContact);
  const [shipping, setShipping] = useState<ShippingAddress>(emptyShipping);
  const [method, setMethod] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSaveContact = (value: ContactInfo) => {
    setContact(value);
    setActiveStep(shipping.street ? null : 2);
  };

  const handleSaveShipping = (value: ShippingAddress) => {
    setShipping(value);
    setActiveStep(method ? null : 3);
  };

  const handleSaveMethod = (value: string) => {
    setMethod(value);
    setActiveStep(payment ? null : 4);
  };

  const handlePlaceOrder = (paymentId: string) => {
    setPayment(paymentId);
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      navigate("/order-confirmation");
    }, 1200);
  };

  const selectedMethod = SHIPPING_METHODS.find((m) => m.id === method);
  const selectedPayment = PAYMENT_METHODS.find((p) => p.id === payment);

  return (
    <div className="min-h-screen bg-white">
      <header className="h-[78px] grid grid-cols-3 items-center border-b border-[#E5E5E5] shadow-[0px_1px_4px_2px_#0000000D] backdrop-blur-[20px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex w-[80px] h-[40px] cursor-pointer items-center gap-1 text-sm font-medium text-[#525252] hover:text-[#171717] ml-[64px]"
        >
          <img src={arrowLeft} alt="" className="h-5 w-5" />
          Back
        </button>
        <img src={logo} alt="UD Stores" className="mx-auto h-[48px] w-[63px]" />
      </header>

      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-[1fr_500px] max-w-[1440px] px-[200px] py-[40px] items-start">
        <div className="flex w-[500px] flex-col gap-[24px]">
          <h1 className="text-2xl font-bold text-[#171717]">Checkout</h1>

          <div className="flex flex-col gap-[32px]">
            <CheckoutStepShell
              number={1}
              title={
                activeStep === 1 ? "Contact Information" : "Contact Details"
              }
              isOpen={activeStep === 1}
              summary={[contact.email, contact.phone].filter(Boolean)}
              onEdit={() => setActiveStep(1)}
            >
              <ContactInfoForm
                initialValue={contact}
                onSave={handleSaveContact}
              />
            </CheckoutStepShell>

            <CheckoutStepShell
              number={2}
              title="Shipping Address"
              isOpen={activeStep === 2}
              summary={
                shipping.street
                  ? [
                      `${shipping.firstName} ${shipping.lastName}`.trim(),

                      `  ${shipping.street}, ${shipping.city}, ${shipping.state}`,

                      shipping.zip,
                    ]
                  : []
              }
              onEdit={() => setActiveStep(2)}
            >
              <ShippingAddressForm
                initialValue={shipping}
                onSave={handleSaveShipping}
              />
            </CheckoutStepShell>

            <CheckoutStepShell
              number={3}
              title="Shipping Method"
              isOpen={activeStep === 3}
              summary={
                selectedMethod
                  ? [
                      <span>
                        {selectedMethod.label}{" "}
                        <span className="font-semibold text-[#404040]">
                          ₦{selectedMethod.price}
                        </span>
                      </span>,
                      selectedMethod.eta,
                    ]
                  : []
              }
              onEdit={() => setActiveStep(3)}
            >
              <ShippingMethodForm
                initialValue={method}
                onSave={handleSaveMethod}
              />
            </CheckoutStepShell>

            <CheckoutStepShell
              number={4}
              title="Payment"
              isOpen={activeStep === 4}
              summary={selectedPayment ? [selectedPayment.label] : []}
              onEdit={() => setActiveStep(4)}
            >
              <PaymentForm
                initialValue={payment}
                isLoading={isLoading}
                onPlaceOrder={handlePlaceOrder}
              />
            </CheckoutStepShell>
          </div>
        </div>

        <OrderSummary showCheckoutButton={false} />
      </div>
    </div>
  );
}
