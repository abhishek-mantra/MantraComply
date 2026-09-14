interface StatusBadgeProps {
  status: string;
  variant?: "credentialing" | "health" | "expiration" | "enrollment" | "generic";
}

export function StatusBadge({ status, variant = "generic" }: StatusBadgeProps) {
  const getVariantStyles = () => {
    const normalized = status.toLowerCase();

    if (variant === "credentialing") {
      if (normalized.includes("done") || normalized.includes("complete")) {
        return "bg-green-100 text-green-800";
      }
      if (normalized.includes("in process") || normalized.includes("in progress")) {
        return "bg-yellow-100 text-yellow-800";
      }
      if (normalized.includes("re-credential")) {
        return "bg-orange-100 text-orange-800";
      }
      if (normalized.includes("not started")) {
        return "bg-gray-100 text-gray-800";
      }
    }

    if (variant === "health") {
      if (normalized.includes("ok") || normalized.includes("valid")) {
        return "bg-green-100 text-green-800";
      }
      if (normalized.includes("issues")) {
        return "bg-red-100 text-red-800";
      }
      if (normalized.includes("expiration")) {
        return "bg-yellow-100 text-yellow-800";
      }
    }

    if (variant === "expiration") {
      if (normalized.includes("expired")) {
        return "bg-red-100 text-red-800";
      }
      if (normalized.includes("nearing")) {
        return "bg-orange-100 text-orange-800";
      }
      if (normalized.includes("valid") || normalized.includes("active")) {
        return "bg-green-100 text-green-800";
      }
    }

    if (variant === "enrollment") {
      if (normalized.includes("enrolled") || normalized.includes("completed")) {
        return "bg-green-100 text-green-800";
      }
      if (normalized.includes("processing") || normalized.includes("pending")) {
        return "bg-yellow-100 text-yellow-800";
      }
      if (normalized.includes("ppo")) {
        return "bg-orange-100 text-orange-800";
      }
      if (normalized.includes("hmo")) {
        return "bg-blue-100 text-blue-800";
      }
      if (normalized.includes("medicaid")) {
        return "bg-teal-100 text-teal-800";
      }
    }

    // Generic fallback
    if (normalized.includes("success") || normalized.includes("active") || normalized.includes("approved")) {
      return "bg-green-100 text-green-800";
    }
    if (normalized.includes("warning") || normalized.includes("pending")) {
      return "bg-yellow-100 text-yellow-800";
    }
    if (normalized.includes("error") || normalized.includes("failed") || normalized.includes("rejected")) {
      return "bg-red-100 text-red-800";
    }

    return "bg-gray-100 text-gray-800";
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getVariantStyles()}`}
    >
      {status}
    </span>
  );
}
