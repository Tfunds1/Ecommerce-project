import Sidebar from "../../components/layout/Sidebar";
import { products } from "../../data/products";
import CategoryCarousel from "./CategoryCarousel";
import HeroSearch from "./HeroSearch";
import ProductSection from "./ProductSection";

export default function Home() {
  return (
    <div className="flex h-[2228px] bg-white">
      <Sidebar />

      <main className="container">
        <HeroSearch />

        <section className="mx-auto flex w-full max-w-[1341px] flex-col gap-[24px] px-[20px] pb-[24px] pt-[24px]">
          <CategoryCarousel />

          <ProductSection title="Recently Viewed" items={products} />
          <ProductSection title="New in Men" items={products} />
        </section>
      </main>
    </div>
  );
}
