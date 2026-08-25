import { products } from "../../data/products";
import ProductSection from "../Home/ProductSection";

export default function ExploreCard() {
  return (
    <>
      <ProductSection title="New in Men" items={products} />
    </>
  );
}
