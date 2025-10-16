interface PaymentMethodBadgeProps {
  method: string;
}

const PaymentMethodBadge = ({ method }: PaymentMethodBadgeProps) => {
  const badgeStyles: Record<string, string> = {
    cod: "bg-gray-100 text-gray-700",
    bank_transfer: "bg-sky-100 text-sky-700",
  };

  const labels: Record<string, string> = {
    cod: "COD",
    bank_transfer: "Bank Transfer",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-[12px] font-medium ${
        badgeStyles[method] || "bg-gray-100 text-gray-700"
      }`}
    >
      {labels[method] || method}
    </span>
  );
};

export default PaymentMethodBadge;
