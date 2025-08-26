import { mockProductsFlashSale } from "@/mock/products";
import ProductCard from "@/components/ProductCard";

const FlashSaleSection = () => {
  return (
    <section>
      <h2>Flash Sales</h2>
      {/* <div className="grid grid-cols-5 gap-4"> */}
      <div>
        {mockProductsFlashSale.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
