import menImg from "../../assets/aa2309f7d32d431cf871230f25e8d21dc063f4aa.png";
import womenImg from "../../assets/dd62c9d0548139964b32dfd02981c20b1947a263.png";
import babyToddlerCard from "../../assets/92e86914583f492d404f1211bc7f2eb8c8631cfb.png";
import beautyImg from "../../assets/ae6f5a2c5c627f6fce6bf80e5948cf35830a318f.png";
import healthImg from "../../assets/f143e947a01abeed37d90dcf51d2f71eb4922d4a.png";

import menImg2 from "../../assets/men's wear img.png";
import womenImg2 from "../../assets/women's wear img.png";
import babyToddlerImg2 from "../../assets/baby's wear img.png";
import beautyImg2 from "../../assets/beauty img.png";
import healthImg2 from "../../assets/health img.png";

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
