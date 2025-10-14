import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import ShippingAddressSection from "./components/ShippingAddressSection";
import ProductListSection from "./components/ProductListSection";
import PaymentMethodSection from "./components/PaymentMethodSection";
import NotesSection from "./components/NotesSection";
import type { CartResponse } from "@/types/cart";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: { 
      cartItems: CartResponse[];
      subtotal: number 
    };
  };

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("cod");
  const [orderNote, setOrderNote] = useState<string>("");

  useEffect(() => {
    if (!location.state?.cartItems?.length) {
      navigate("/cart", { replace: true });
    }
  }, [location.state, navigate]);

  // If no items, don't render anything
  if (!location.state?.cartItems?.length) {
    return null;
  }

  const items = location.state?.cartItems || [];
  const subtotal = location.state?.subtotal || 0;
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    const payload = {
      shippingAddressId: selectedAddressId,
      paymentMethod: selectedPaymentMethod,
      items,
      note: orderNote,
      totals: { subtotal, shipping, total },
    };

    console.log("Order payload:", payload);
    toast.success("Order placed successfully");
  };

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="rounded-[12px]">
          {/* Shipping Address Section */}
          <ShippingAddressSection 
            selectedAddressId={selectedAddressId}
            onAddressSelect={setSelectedAddressId}
          />

          {/* Product List */}
          <ProductListSection 
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />

          {/* Payment Methods */}
          <PaymentMethodSection
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={setSelectedPaymentMethod}
          />

          {/* Additional Notes */}
          <NotesSection
            value={orderNote}
            onChange={setOrderNote}
          />

          {/* Place Order Button */}
          <div className="text-center sm:text-right">
            <Button
              onClick={handlePlaceOrder}
              className="px-[32px] py-[12px] text-[16px]"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;