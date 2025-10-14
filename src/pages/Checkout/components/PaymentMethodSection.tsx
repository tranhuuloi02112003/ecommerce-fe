import React from "react";

interface PaymentMethodSectionProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
  const paymentMethods = [
    { id: "bank", label: "Bank Transfer" },
    { id: "cod", label: "Cash on Delivery" },
  ] as const;

  return (
    <div className="mb-[32px]">
      <h2 className="mb-[16px] text-[18px] font-medium text-gray-900">
        Payment Method
      </h2>

      <div className="space-y-[12px]">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className="flex cursor-pointer items-center gap-[12px] rounded-[8px] border border-gray-200 p-[16px] hover:border-gray-300"
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedPaymentMethod === method.id}
              onChange={(e) => onPaymentMethodChange(e.target.value)}
              className="h-[20px] w-[20px] accent-[#DB4444]"
            />
            <span className="text-[16px] text-gray-800">{method.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSection;
