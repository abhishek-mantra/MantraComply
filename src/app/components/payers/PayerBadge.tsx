interface PayerBadgeProps {
  type: "PPO" | "HMO" | "Medicaid" | "Medicare" | "Commercial" | "Government" | "Managed Care";
}

export function PayerBadge({ type }: PayerBadgeProps) {
  const getStyles = () => {
    switch (type) {
      case "PPO":
        return "bg-orange-100 text-orange-800";
      case "HMO":
        return "bg-blue-100 text-blue-800";
      case "Medicaid":
        return "bg-teal-100 text-teal-800";
      case "Medicare":
        return "bg-purple-100 text-purple-800";
      case "Commercial":
        return "bg-blue-100 text-blue-800";
      case "Government":
        return "bg-gray-100 text-gray-800";
      case "Managed Care":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStyles()}`}>
      {type}
    </span>
  );
}
