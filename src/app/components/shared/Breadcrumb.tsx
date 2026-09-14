import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface BreadcrumbProps {
  label: string;
  to: string;
}

export function Breadcrumb({ label, to }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
    >
      <ChevronLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
