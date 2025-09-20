import { useState } from "react";
import Button from "@/components/Button";
import { mockCartItems, type CartItem } from "@/mock/cart";
import routes from "@/config/routes";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [couponCode, setCouponCode] = useState("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: item.price * newQuantity,
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    console.log("Applying coupon:", couponCode);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <main className="mx-auto w-full max-w-[1200px] py-8 px-4">
          {/* Breadcrumb */}
          <div className="mb-[75px] text-[14px] text-gray-500">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center opacity-50">
                <a
                  href="#"
                  className="inline-flex items-center text-[14px] font-medium text-gray-700"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-[14px] font-medium md:ms-2">
                    Flowbite
                  </span>
                </div>
              </li>
            </ol>
          </div>

          <div className="text-center py-16">
            <h1 className="text-[32px] font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-[16px] text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <Button to={routes.home} variant="primary" className="px-8">
              Continue Shopping
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white my-24">
      <main className="mx-auto w-full max-w-[1200px] py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-[75px] text-[14px] text-gray-500">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center opacity-50">
              <a
                href="#"
                className="inline-flex items-center text-[14px] font-medium text-gray-700"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-[14px] font-medium md:ms-2">
                  Flowbite
                </span>
              </div>
            </li>
          </ol>
        </div>

        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 text-[16px] font-medium text-gray-700">
                    Product
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
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    {/* Product Info */}
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-[65px] object-cover rounded-[8px] flex-shrink-0"
                        />
                        <div>
                          <h3 className="text-[16px] font-medium text-gray-900">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 text-center">
                      <span className="text-[16px] font-normal">
                        ${item.price}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="py-4">
                      <div className="flex justify-center">
                        <div className="flex items-center border border-gray-300 rounded-[4px] p-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 p-5"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-12 h-8 flex items-center justify-center text-[14px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 p-5"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Subtotal */}
                    <td className="py-4 text-center">
                      <span className="text-[16px] font-medium">
                        ${item.subtotal}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <svg
                          className="w-[24px] h-[24px]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button to={routes.home} variant="outline" className="w-[218px]">
              Return To Shop
            </Button>
            <Button variant="outline" className="w-[195px]">
              Update Cart
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16%] mt-26">
          {/* Left - Coupon Code */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-6 py-3 mr-5 border border-gray-400 rounded-[4px] text-[16px] focus:outline-none focus:border-gray-500"
              />
              <Button
                variant="primary"
                onClick={applyCoupon}
                className="w-[211px]"
              >
                Apply Coupon
              </Button>
            </div>
          </div>

          {/* Right - Cart Total */}
          <div>
            <div className="border border-gray-300 rounded-[4px] p-6">
              <h3 className="text-[20px] font-normal text-gray-900 mb-6">
                Cart Total
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[16px] text-gray-700">Subtotal:</span>
                  <span className="text-[16px] font-normal">${subtotal}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-[16px] text-gray-700">Shipping:</span>
                  <span className="text-[16px] font-normal">Free</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[16px] font-normal ">Total:</span>
                  <span className="text-[16px] font-normal">${total}</span>
                </div>
              </div>

              <div className="flex justify-center mt-6 mb-6">
                <Button variant="primary" className="w-[266px]">
                  Proceed to checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
