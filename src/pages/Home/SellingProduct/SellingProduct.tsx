import { mockProducts } from "@/mock/products";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import Button from "@/components/Button";

const SellingProduct = () => {
  const bestSellingProducts = mockProducts.slice(0, 4);

  return (
    <section className="app-container pt-[75px] pb-[130px]">
        <SectionHeader
          label="This Month"
          title="Best Selling Products"
          rightSlot={
            <Button variant="primary" className="w-[159px]">
              View All
            </Button>
          }
        />

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
    </section>
  );
};

export default SellingProduct;
