import React from "react";
import type { CartResponse } from "@/types/cart";

interface ProductListSectionProps {
  items: CartResponse[];
  subtotal: number;
  shipping: number;
  total: number;
}

const ProductListSection: React.FC<ProductListSectionProps> = ({
  items,
  subtotal,
  shipping,
  total,
}) => {
  return (
    <div className="mb-[32px]">
      <h2 className="mb-[16px] text-[18px] font-medium text-gray-900">
        Products
      </h2>

      <div className="rounded-[8px] border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-[16px] font-medium text-gray-700">
                Name
              </th>
              <th className="text-center py-4 text-[16px] font-medium text-gray-700">
                Price
              </th>
              <th className="text-center py-4 text-[16px] font-medium text-gray-700">
                Quantity
              </th>
              <th className="text-center py-4 text-[16px] font-medium text-gray-700">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: CartResponse) => (
              <tr key={item.productId} className="border-b border-gray-100">
                {/* Product Info */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productMainImage}
                      alt={item.productName}
                      className="size-[65px] object-cover rounded-[8px] flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-[16px] font-medium text-gray-900">
                        {item.productName}
                      </h3>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 text-center">
                  <span className="text-[16px] font-normal">
                    ${item.price.toFixed(2)}
                  </span>
                </td>

                {/* Quantity */}
                <td className="py-4 text-center">
                  <span className="text-[16px] font-normal">
                    {item.quantity}
                  </span>
                </td>

                {/* Subtotal */}
                <td className="py-4 text-center px-4">
                  <span className="text-[16px] font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Price Summary */}
        <div className="space-y-[12px] border-t border-gray-200 pt-[16px] mt-[16px] p-4">
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">
              {shipping === 0 ? "Free" : `$${shipping}`}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-[12px] flex items-center justify-between">
            <span className="text-[16px] font-medium text-gray-900">Total</span>
            <span className="text-[18px] font-bold text-[#DB4444]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListSection;
