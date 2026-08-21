import speakerImg from "../assets/products/image 6.png";
import doseImg from "../assets/products/image 7.png";
import espressoImg from "../assets/products/image 8.png";
import boseImg from "../assets/products/image 9.png";
import popgripImg from "../assets/products/image 1.png";
import sodaImg from "../assets/products/image 10.png";
import airfryerImg from "../assets/products/image 11.png";
import toothbrushImg from "../assets/products/image 12.png";
import aarkeImg from "../assets/products/image 13.png";
import noiseBudsImg from "../assets/products/image 14.png";

export type Product = {
  id: string;
  brand: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  originalPrice?: number;
  category?: string;
  description?: string;
};

export const products: Product[] = [
  {
    id: "jbl-authentic-300",
    brand: "JBL",
    title: "Authentic 300 Smart Home Speaker",
    price: 525000,
    rating: 4.5,
    reviews: 128,
    image: speakerImg,
  },
  {
    id: "dosee-controller",
    brand: "Doséé",
    title: "Dose Controller",
    price: 60000,
    rating: 4.6,
    reviews: 92,
    image: doseImg,
  },
  {
    id: "terra-kaffe-tk01",
    brand: "Terra Kaffe",
    title: "TK-01 Connected Espresso Machine",
    price: 1334000,
    rating: 4.5,
    reviews: 64,
    image: espressoImg,
  },
  {
    id: "bose-qc-ultra",
    brand: "Bose",
    title:
      "QuietComfort Ultra Wireless Noise Cancelling Headphones (Sandstone)",
    price: 645000,
    rating: 4.6,
    reviews: 210,
    image: boseImg,
  },
  {
    id: "noise-buds-n1-pro",
    brand: "Noise",
    title: "Noise Buds N1 Pro in-Ear True Wireless Earbuds",
    price: 68000,
    originalPrice: 73000,
    rating: 4.4,
    reviews: 310,
    image: noiseBudsImg,
    category: "Earphones",
    description:
      "Elevate your daily audio experience with the Noise Buds N1 Pro, where premium aesthetics meet powerhouse performance. Featuring active noise cancellation, a low-latency gaming mode, and up to 40 hours of total playback with the charging case.",
  },
  {
    id: "popsocket-popgrip-slide",
    brand: "Popsocket",
    title: "PopGrip Slide Stretch",
    price: 55000,
    rating: 4.5,
    reviews: 47,
    image: popgripImg,
  },
  {
    id: "sodastream-aqua-fizz",
    brand: "SodaStream",
    title: "Terra Sparkling Water Maker Bundle",
    price: 135000,
    rating: 4.6,
    reviews: 88,
    image: sodaImg,
  },
  {
    id: "ninja-airfryer-max",
    brand: "Estrid",
    title: "Estrid Vegan Razor and Wall Mount",
    price: 22500,
    rating: 4.5,
    reviews: 132,
    image: airfryerImg,
  },
  {
    id: "oral-b-iot-toothbrush",
    brand: "SURI",
    title: "Sustainable Sonic Toothbrush",
    price: 172000,
    rating: 4.6,
    reviews: 76,
    image: toothbrushImg,
  },
  {
    id: "aarke-carbonator-ii",
    brand: "Aarke",
    title: "Carbonator 3 (Premium Sparkling Water Maker)",
    price: 390000,
    rating: 4.5,
    reviews: 54,
    image: aarkeImg,
  },
];

export const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
