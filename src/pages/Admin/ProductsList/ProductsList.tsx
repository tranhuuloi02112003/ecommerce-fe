import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@/components/Pagination/Pagination";
import SearchIcon from "@/components/icons/SearchIcon";
import Button from "@/components/Button";
import { productsApi } from "@/services/productsApi";
import type { Product } from "@/types/product";
import { toast } from "react-toastify";
import routes from "@/config/routes";
import useDebounce from "@/hooks/useDebounce";
import DeleteModal from "@/components/Modal/DeleteModal";

// -------- Helpers --------
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

export default function ProductsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const size = 5;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productsApi.getProducts({
        page,
        size,
        search: debouncedSearchTerm,
      });

      setProducts(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err: unknown) {
      console.error("❌ Failed to fetch products:", err);

      toast.error("System error occurred. Please try again later.");

      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, size, debouncedSearchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditProduct = (productId: string) => {
    navigate(routes.ADMIN_EDIT_PRODUCT.replace(":id", productId));
  };

  const handleViewProduct = (productId: string) => {
    console.log("View product:", productId);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setIsDeleting(true);
      await productsApi.deleteProductById(selectedProduct.id);
      toast.success(`Product "${selectedProduct.name}" deleted successfully`);

      // Refresh products list
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };
  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-[1200px]">
        <div className="mb-[16px] text-[12px] text-gray-500">
          Home &gt; All Products
        </div>
        <h1 className="mb-[16px] text-[22px] font-semibold text-gray-900">
          All Products
        </h1>

        {/* Toolbar */}
        <div className="mb-[16px] flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-[8px]">
            <div className="relative w-[280px]">
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name, title, category..."
                className="w-full rounded-[12px] border border-gray-200 bg-white px-[16px] pr-[37px] py-[10px] text-[14px] outline-none focus:border-gray-400"
              />
              <SearchIcon className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500" />
            </div>
          </div>

          <Button
            variant="admin"
            onClick={() => navigate(routes.ADMIN_ADD_PRODUCT)}
            className="px-[16px] text-[14px] font-medium !h-[46px]"
          >
            + Add Product
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8 text-gray-500">
            Loading products...
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto rounded-[16px] border border-gray-200 bg-white">
            <table className="w-full text-[14px] table-fixed">
              <thead className="sticky top-0 bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-[16px] py-[12px] w-[80px]">ID</th>
                  <th className="px-[16px] py-[12px] w-[200px]">Product</th>
                  <th className="px-[16px] py-[12px] w-[100px]">Category</th>
                  <th className="px-[16px] py-[12px] w-[150px]">Title</th>
                  <th className="px-[16px] py-[12px] w-[200px]">Description</th>
                  <th className="px-[16px] py-[12px] w-[100px]">Price</th>
                  <th className="px-[16px] py-[12px] w-[170px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((p: Product) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50/50">
                      <td className="px-[16px] py-[12px] text-gray-600 font-mono text-[12px] truncate">
                        {p.id}
                      </td>
                      <td className="px-[16px] py-[12px]">
                        <div className="flex items-center gap-[12px] min-w-0">
                          <img
                            src={p.mainImage}
                            alt={p.name}
                            className="w-[40px] h-[40px] rounded-[8px] object-cover flex-shrink-0"
                          />
                          <span className="font-medium text-gray-900 truncate">
                            {p.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-[16px] py-[12px] text-gray-600 truncate">
                        {p.categoryName}
                      </td>
                      <td className="px-[16px] py-[12px] text-gray-600 truncate">
                        {p.name}
                      </td>
                      <td className="px-[16px] py-[12px] text-gray-600 truncate">
                        {p.description}
                      </td>
                      <td className="px-[16px] py-[12px] font-semibold truncate">
                        {formatPrice(p.price)}
                      </td>

                      <td className="px-[16px] py-[12px] text-right">
                        <div className="inline-flex items-center gap-[4px]">
                          <button
                            onClick={() => handleViewProduct(p.id)}
                            className="rounded-[8px] px-[12px] py-[6px] hover:bg-gray-100"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditProduct(p.id)}
                            className="rounded-[8px] px-[12px] py-[6px] hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p)}
                            className="rounded-[8px] px-[12px] py-[6px] text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <DeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName={selectedProduct?.name}
          itemType="product"
          isLoading={isDeleting}
        />

        {!loading && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mt-[24px]"
          />
        )}
      </main>
    </div>
  );
}
