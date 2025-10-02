import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

type Props = {
  title: string;
  products: Product[];
  isLoading?: boolean;
  emptyText?: string;
  className?: string;
};

export default function ProductShelf({
  title,
  products,
  isLoading,
  emptyText = "No products found.",
  className = "",
}: Props) {
  return (
    <section className={className}>
      <div className="flex items-center gap-8 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-10 w-5 rounded-sm bg-primary" />
          <span className={`ml-4 font-normal text-[20px]`}>{title}</span>
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-gray-500 py-10">
          Loading products...
        </div>
      )}
      {!isLoading && products.length > 0 && (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
          {emptyText}
        </div>
      )}
    </section>
  );
}
