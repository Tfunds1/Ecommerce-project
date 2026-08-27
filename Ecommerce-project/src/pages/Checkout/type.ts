export type ContactInfo = {
  email: string;
  phone: string;
};

export type ShippingAddress = {
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

export type ShippingMethod = {
  id: string;
  label: string;
  eta: string;
  price: number;
};

export type PaymentMethod = {
  id: string;
  label: string;
  icon: string;
};

export type CardDetails = {
  number: string;
  expiry: string;
  cvc: string;
  saveDefault: boolean;
};
