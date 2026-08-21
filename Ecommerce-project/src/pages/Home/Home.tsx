import Sidebar from "../../components/layout/Sidebar";
import { products } from "../../data/products";
import CategoryCarousel from "./components/CategoryCarousel";
import HeroSearch from "./components/HeroSearch";
import ProductSection from "./components/ProductSection";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
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
