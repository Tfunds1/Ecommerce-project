import menImg from "../assets/category1/men.png";
import womenImg from "../assets/category1/woman.png";
import babyToddlerCard from "../assets/category1/baby-toddler.png";
import beautyImg from "../assets/category1/beauty.png";
import healthImg from "../assets/category1/health-wellness.png";

import menImg2 from "../assets/category2/men's wear img.png";
import womenImg2 from "../assets/category2/women's wear img.png";
import babyToddlerImg2 from "../assets/category2/baby's wear img.png";
import beautyImg2 from "../assets/category2/beauty img.png";
import healthImg2 from "../assets/category2/health img.png";

export type Category = {
  label: string;
  image: string;
};

export const categories: Category[] = [
  { label: "Men", image: menImg },
  { label: "Women", image: womenImg },
  { label: "Baby & Toddler", image: babyToddlerCard },
  { label: "Beauty", image: beautyImg },
  { label: "Health & Wellness", image: healthImg },
];

export const categoriesSecondary: Category[] = [
  { label: "Men", image: menImg2 },
  { label: "Women", image: womenImg2 },
  { label: "Baby & Toddler", image: babyToddlerImg2 },
  { label: "Beauty", image: beautyImg2 },
  { label: "Health & Wellness", image: healthImg2 },
];
