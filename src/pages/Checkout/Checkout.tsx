import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";
import { type CheckoutForm } from "@/utils/validation";
import Button from "@/components/Button";

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: { items: CartItem[]; subtotal: number };
  };

  if (!location.state?.items?.length) {
    navigate("/cart", { replace: true });
    return null;
  }

  const { items, subtotal } = location.state;
  const shipping = 0;
  const total = subtotal + shipping;

  const paymentMethods = [
    { id: "bank", label: "Bank" },
    { id: "cod", label: "Cash on delivery" },
  ] as const;

  const handleFormSubmit = (billingData: CheckoutForm) => {
    const payload = {
      billing: billingData,
      paymentMethod: "COD",
      items,
      totals: { subtotal, shipping, total },
    };
    console.log("Order payload:", payload);
    toast.success("Order placed successfully");
  };

  return (
    <div className="min-h-screen bg-white py-14">
      <div className="app-container px-4">
        <h1 className="mb-4 text-[36px] font-normal tracking-[1.44px] ">
          Billing Details
        </h1>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_470px]">
          <section className="max-w-[450px]">
            <BillingForm onSubmit={handleFormSubmit} />
          </section>

          <div>
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
            <div className="mt-8">
              <div className="space-y-3">
                {paymentMethods.map((m) => (
                  <label
                    key={m.id}
                    className="flex cursor-pointer items-center gap-3 text-[15px] text-gray-800"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      defaultChecked={m.id === "cod"}
                      className="h-4 w-4 accent-[#DB4444]"
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-[250px] mt-8">Place Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
