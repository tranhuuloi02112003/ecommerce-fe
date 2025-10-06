import { useState, useEffect, useCallback } from "react";
import Pagination from "@/components/Pagination/Pagination";
import SearchIcon from "@/components/icons/SearchIcon";
import { ordersApi } from "@/services/ordersApi";
import type { Order } from "@/types/order";
import { toast } from "react-toastify";
import useDebounce from "@/hooks/useDebounce";
import OrderDateFilterPopover, {
  type DateRangeValue,
} from "@/pages/Admin/components/DateRangeFilter/DateRangeFilter";
import { format } from "date-fns";
import StatusFilter from "../components/StatusFilter/StatusFilter";

// -------- Helpers --------
const formatPrice = (n: number) => `$${n.toLocaleString()}`;
const formatDate = (date: Date) => format(new Date(date), "MMM d, yyyy");

// Status badge component
const OrderStatusBadge = ({ status }: { status: Order["status"] }) => {
  const badgeStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-[12px] font-medium ${
        badgeStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function OrderList() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue | undefined>(
    undefined
  );
  const [statusFilter, setStatusFilter] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const size = 5;

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getOrders({
        page,
        size,
        search: debouncedSearchTerm,
        status: statusFilter || undefined,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
      });

      setOrders(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err: unknown) {
      console.error("❌ Failed to fetch orders:", err);

      toast.error("System error occurred. Please try again later.");

      setOrders([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, size, debouncedSearchTerm, dateRange, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, dateRange, statusFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
  };

  const handleDateRangeChange = (value: DateRangeValue) => {
    setDateRange(value);
  };

  const handleViewOrder = (orderId: string) => {
    console.log("View order:", orderId);
    toast.info(`Viewing Order ${orderId}`);
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    console.log("Update status:", orderId, status);
    toast.info(`Updated order ${orderId} status to ${status}`);
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log("Delete order:", orderId);
    toast.info(`Delete Order ${orderId}`);
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-[1200px]">
        <div className="mb-[8px] text-[12px] text-gray-500">
          Admin &gt; Orders
        </div>

        <div className="mb-[16px] flex items-center justify-between">
          <h1 className="text-[22px] font-semibold text-gray-900">Orders</h1>

          <OrderDateFilterPopover
            value={dateRange}
            onApply={handleDateRangeChange}
          />
        </div>

        {/* Toolbar */}
        <div className="mb-[16px] flex flex-wrap gap-[12px] sm:items-center sm:justify-between">
          <div className="relative w-[280px]">
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by order ID, customer..."
              className="w-full rounded-[12px] border border-gray-200 bg-white px-[16px] pr-[37px] py-[10px] text-[14px] outline-none focus:border-gray-400"
            />
            <SearchIcon className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500" />
          </div>

          <div className="flex flex-wrap items-center gap-[8px]">   
            <StatusFilter/>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8 text-gray-500">
            Loading orders...
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto rounded-[16px] border border-gray-200 bg-white">
            <table className="w-full text-[14px] table-fixed">
              <thead className="sticky top-0 bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-[16px] py-[12px] w-[100px]">Order ID</th>
                  <th className="px-[16px] py-[12px] w-[180px]">Customer</th>
                  <th className="px-[16px] py-[12px] w-[150px]">Date</th>
                  <th className="px-[16px] py-[12px] w-[120px]">Status</th>
                  <th className="px-[16px] py-[12px] w-[120px]">Total</th>
                  <th className="px-[16px] py-[12px] w-[240px] text-right ">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order: Order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50/50">
                      <td className="px-[16px] py-[12px] text-gray-600 font-mono text-[12px] truncate">
                        {order.id}
                      </td>
                      <td className="px-[16px] py-[12px]">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {order.customerName}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {order.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-[16px] py-[12px] text-gray-600">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-[16px] py-[12px]">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-[16px] py-[12px] font-semibold">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-[16px] py-[12px] text-right">
                        <div className="inline-flex items-center gap-[4px]">
                          <button
                            onClick={() => handleViewOrder(order.id)}
                            className="rounded-[8px] px-[12px] py-[6px] hover:bg-gray-100 font-normal text-[14px]"
                          >
                            View
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateStatus(order.id, e.target.value)
                            }
                            className="rounded-[8px] px-[8px] py-[6px] border border-gray-200 hover:bg-gray-50 font-normal text-[14px]"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="canceled">Canceled</option>
                          </select>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="rounded-[8px] px-[12px] py-[6px] text-red-600 hover:bg-red-50 font-normal text-[14px]"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No orders available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

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
