import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { mockProductsAdmin } from "@/mock/products";
import SearchIcon from "@/components/icons/SearchIcon";

// -------- Helpers --------
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

export default function ProductsList() {
  const [page, setPage] = useState(1);
  const size = 7;

  // Calculate pagination
  const total = mockProductsAdmin.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const start = (page - 1) * size;
  const items = mockProductsAdmin.slice(start, start + size);

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
                placeholder="Search by name, title, category..."
                className="w-full rounded-[12px] border border-gray-200 bg-white px-[16px] pr-[37px] py-[10px] text-[14px] outline-none focus:border-gray-400"
              />
              <SearchIcon className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500" />
            </div>
          </div>

          <button className="rounded-[12px] bg-gray-900 px-[16px] py-[8px] text-[14px] font-medium text-white hover:bg-black">
            + Add Product
          </button>
        </div>

        {/* Table */}
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
              {items.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50/50">
                  <td className="px-[16px] py-[12px] text-gray-600 font-mono text-[12px] truncate">
                    {p.id}
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <div className="flex items-center gap-[12px] min-w-0">
                      <img
                        src={p.thumbnail}
                        alt={p.nameProduct}
                        className="w-[40px] h-[40px] rounded-[8px] object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-gray-900 truncate">
                        {p.nameProduct}
                      </span>
                    </div>
                  </td>

                  <td className="px-[16px] py-[12px] text-gray-600 truncate">
                    {p.nameCategory}
                  </td>
                  <td className="px-[16px] py-[12px] text-gray-600 truncate">
                    {p.titleProduct}
                  </td>
                  <td className="px-[16px] py-[12px] text-gray-600 truncate">
                    {p.descriptionProduct}
                  </td>
                  <td className="px-[16px] py-[12px] font-semibold truncate">
                    {formatPrice(p.price)}
                  </td>

                  <td className="px-[16px] py-[12px] text-right">
                    <div className="inline-flex items-center gap-[4px]">
                      <button className="rounded-[8px] px-[12px] py-[6px] hover:bg-gray-100">
                        View
                      </button>
                      <button className="rounded-[8px] px-[12px] py-[6px] hover:bg-gray-100">
                        Edit
                      </button>
                      <button className="rounded-[8px] px-[12px] py-[6px] text-red-600 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={page}
          totalPages={pages}
          onPageChange={setPage}
          className="mt-[24px]"
        />
      </main>
    </div>
  );
}
