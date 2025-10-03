import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductShelf from "@/components/ProductShelf/ProductShelf";
import Pagination from "@/components/Pagination/Pagination";
import { productsApi } from "@/services/productsApi";
import type { Product } from "@/types/product";
import { toast } from "react-toastify";

const CategoryProducts = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const size = 8;
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      const response = await productsApi.getProductsByCategory(
        categoryId,
        page,
        size
      );
      setItems(response.data);
      setTotalPages(response.pagination?.totalPages || 1);

      if (response.data.length > 0 && response.data[0].categoryName) {
        setCategoryName(response.data[0].categoryName);
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to fetch category products"
      );
      setItems([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [categoryId, page, size]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  const title = categoryName ? `${categoryName} Products` : "Category Products";

  return (
    <div className="app-container mx-auto px-4 py-10">
      <ProductShelf
        title={title}
        products={items}
        isLoading={loading}
        emptyText="No products found in this category."
      />
      {!loading && items.length > 0 && (
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

export default CategoryProducts;
