interface EnrollmentStatusBadgeProps {
  status: "Pending" | "Submitted to Payer" | "In Review" | "More Info Needed" | "Approved" | "Denied" | "Active" | "Terminated" | "Pending Effective Date" | "Authorized" | "Expired" | "Not Authorized" | "In Progress" | "Synced" | "Sync Pending" | "Failed";
}

export function EnrollmentStatusBadge({ status }: EnrollmentStatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case "Pending":
      case "Not Authorized":
        return "bg-gray-100 text-gray-800";
      case "Submitted to Payer":
        return "bg-blue-100 text-blue-800";
      case "In Review":
      case "In Progress":
      case "Pending Effective Date":
      case "Sync Pending":
        return "bg-yellow-100 text-yellow-800";
      case "More Info Needed":
        return "bg-orange-100 text-orange-800";
      case "Approved":
      case "Active":
      case "Authorized":
      case "Synced":
        return "bg-green-100 text-green-800";
      case "Denied":
      case "Terminated":
      case "Expired":
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStyles()}`}>
      {status}
    </span>
  );
}
