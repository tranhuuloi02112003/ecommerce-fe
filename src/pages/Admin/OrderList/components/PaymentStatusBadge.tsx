interface PaymentStatusBadgeProps {
  status: string;
}

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const badgeStyles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    unpaid: "bg-orange-100 text-orange-700",
    refunded: "bg-blue-100 text-blue-700",
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

export default PaymentStatusBadge;
