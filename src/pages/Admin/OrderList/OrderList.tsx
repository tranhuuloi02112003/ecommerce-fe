import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@/components/Pagination/Pagination";
import SearchIcon from "@/components/icons/SearchIcon";
import { toast } from "react-toastify";
import useDebounce from "@/hooks/useDebounce";
import OrderDateFilterPopover, {
  type DateRangeValue,
} from "@/pages/Admin/components/DateRangeFilter/DateRangeFilter";
import { format } from "date-fns";
import FilterDropdown from "../components/FilterDropdown";
import { ordersApi } from "@/services/ordersApi";
import type { Order } from "@/types/order";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
  PaymentMethodBadge,
} from "./components";

// Filter options
const orderStatusOptions = [
  { label: "All Order Status", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const paymentStatusOptions = [
  { label: "All Payment Status", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Paid", value: "PAID" },
  { label: "Unpaid", value: "UNPAID" },
  { label: "Refunded", value: "REFUNDED" },
];

// -------- Helpers --------
const formatPrice = (n: number) => `$${n.toLocaleString()}`;

const formatDate = (date: Date) => format(new Date(date), "MMM d, yyyy");

export default function OrderList() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue | undefined>(
    undefined
  );
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const size = 5;
  const goDetail = (id: string) => navigate(`/admin/orders/${id}`);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getOrders({
        page,
        size,
        search: debouncedSearchTerm,
        orderStatus: orderStatusFilter || undefined,
        paymentStatus: paymentStatusFilter || undefined,
        startDate: dateRange?.startDate
          ? format(dateRange.startDate, "yyyy-MM-dd")
          : undefined,
        endDate: dateRange?.endDate
          ? format(dateRange.endDate, "yyyy-MM-dd")
          : undefined,
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
  }, [
    page,
    size,
    debouncedSearchTerm,
    orderStatusFilter,
    paymentStatusFilter,
    dateRange,
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, dateRange, orderStatusFilter, paymentStatusFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDateRangeChange = (value: DateRangeValue) => {
    setDateRange(value);
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
            <FilterDropdown
              label="Order Status"
              options={orderStatusOptions}
              defaultValue={orderStatusFilter}
              onChange={setOrderStatusFilter}
              width="w-[180px]"
            />
            <FilterDropdown
              label="Payment Status"
              options={paymentStatusOptions}
              defaultValue={paymentStatusFilter}
              onChange={setPaymentStatusFilter}
              width="w-[180px]"
            />
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
            <table className="w-full text-[14px]">
              <thead className="sticky top-0 bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-[16px] py-[12px]">Order ID</th>
                  <th className="px-[16px] py-[12px]">Customer</th>
                  <th className="px-[16px] py-[12px]">Date</th>
                  <th className="px-[16px] py-[12px]">Items</th>
                  <th className="px-[16px] py-[12px]">Total</th>
                  <th className="px-[16px] py-[12px]">Payment Method</th>
                  <th className="px-[16px] py-[12px]">Payment Status</th>
                  <th className="px-[16px] py-[12px]">Order Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order: Order) => (
                    <tr
                      key={order.id}
                      className="border-t hover:bg-gray-50/50"
                      onClick={() => goDetail(order.id)}
                    >
                      <td className="px-[16px] py-[12px] text-gray-600 font-mono text-[12px] max-w-[120px] truncate">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-blue-600 hover:underline truncate"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-[16px] py-[12px]">
                        <div className="flex flex-col ">
                          <span className="font-medium text-gray-900  max-w-[190px] truncate block">
                            {order.customerName}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {order.customerPhone}
                          </span>
                        </div>
                      </td>
                      <td className="px-[16px] py-[12px] text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-[16px] py-[12px] text-gray-700">
                        {order.totalItems}{" "}
                        {order.totalItems === 1 ? "item" : "items"}
                      </td>
                      <td className="px-[16px] py-[12px] font-semibold">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="px-[16px] py-[12px]">
                        <PaymentMethodBadge
                          method={order.paymentMethod.toLowerCase()}
                        />
                      </td>
                      <td className="px-[16px] py-[12px]">
                        <PaymentStatusBadge
                          status={order.paymentStatus.toLowerCase()}
                        />
                      </td>
                      <td className="px-[16px] py-[12px]">
                        <OrderStatusBadge
                          status={order.orderStatus.toLowerCase()}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
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
