import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductShelf from "@/components/ProductShelf/ProductShelf";
import Pagination from "@/components/Pagination/Pagination";
import { productsApi } from "@/services/productsApi";
import type { Product } from "@/types/product";
import { toast } from "react-toastify";

const ProductsSearch = () => {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const size = 8;
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productsApi.getProducts({
        page,
        size,
        search: q,
      });
      setItems(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to fetch products"
      );
      setItems([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [q, page, size]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const title = q ? `Search results for "${q}"` : "All Products";

  return (
    <div className="app-container mx-auto px-4 py-10">
      <ProductShelf
        title={title}
        products={items}
        isLoading={loading}
        emptyText={q ? `No products matched "${q}".` : "No products found."}
      />
      {!loading && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          className="mt-8"
        />
      )}
    </div>
  );
};

export default ProductsSearch;
