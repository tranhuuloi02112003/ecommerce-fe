import React from "react";

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  total,
}) => {
  return (
    <div>
      <div className="mb-6">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`flex items-center justify-between py-3 ${
              idx !== items.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded-md object-cover bg-gray-50"
              />
              <div>
                <p className="text-[15px] font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-[13px] text-gray-500">
                  ${item.price.toFixed(2)} <span className="mx-1">×</span>{" "}
                  {item.qty}
                </p>
              </div>
            </div>
            <p className="text-[15px] font-medium text-[#DB4444]">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 text-[14px]">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-800">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[16px] font-semibold text-gray-900">Total</span>
          <span className="text-[18px] font-bold text-[#DB4444]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
