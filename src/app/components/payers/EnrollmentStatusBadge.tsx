interface EnrollmentStatusBadgeProps {
  status: string;
}

export function EnrollmentStatusBadge({ status }: EnrollmentStatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case "Enrolled":
      case "Approved":
      case "Active":
      case "Authorized":
      case "Synced":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "Pending":
      case "Pending Effective Date":
      case "Sync Pending":
      case "Not Authorized":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "In Progress":
      case "In Review":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Submitted":
      case "Submitted to Payer":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200";
      case "Request form Submitted":
        return "bg-sky-50 text-sky-700 border border-sky-200";
      case "LOI Submitted":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Network Status Verification":
        return "bg-teal-50 text-teal-700 border border-teal-200";
      case "Need Information":
      case "More Info Needed":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "Inactive":
        return "bg-slate-100 text-slate-600 border border-slate-200";
      case "Network Close":
        return "bg-zinc-100 text-zinc-700 border border-zinc-300";
      case "On Hold":
        return "bg-yellow-50 text-yellow-800 border border-yellow-300";
      case "Rejected":
      case "Denied":
      case "Terminated":
      case "Expired":
      case "Failed":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "Not Accepting":
        return "bg-red-50 text-red-800 border border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStyles()}`}>
      {status}
    </span>
  );
}
