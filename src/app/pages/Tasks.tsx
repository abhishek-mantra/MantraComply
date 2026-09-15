import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  assignedBy: string;
  assignedDate: string;
}

const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    title: "Update NY State License",
    description: "Please upload your renewed NY State License. The current one on file is expiring soon.",
    category: "License",
    priority: "high",
    status: "pending",
    dueDate: "2025-03-15",
    assignedBy: "Admin Team",
    assignedDate: "2025-03-01",
  },
  {
    id: 2,
    title: "Complete Malpractice Insurance Documentation",
    description: "Upload your updated malpractice insurance certificate for Humana credentialing.",
    category: "Insurance",
    priority: "high",
    status: "in_progress",
    dueDate: "2025-03-10",
    assignedBy: "Credentialing Team",
    assignedDate: "2025-02-28",
  },
  {
    id: 3,
    title: "Update Practice Address",
    description: "Your practice information needs to be updated with the new office address.",
    category: "Profile",
    priority: "medium",
    status: "pending",
    dueDate: "2025-03-20",
    assignedBy: "Admin Team",
    assignedDate: "2025-03-02",
  },
  {
    id: 4,
    title: "Board Certification Renewal",
    description: "Please provide documentation of your renewed board certification.",
    category: "Certification",
    priority: "medium",
    status: "completed",
    dueDate: "2025-02-28",
    assignedBy: "Credentialing Team",
    assignedDate: "2025-02-15",
  },
  {
    id: 5,
    title: "Missing W9 Form",
    description: "We need your completed W9 form for tax purposes.",
    category: "Documents",
    priority: "low",
    status: "pending",
    dueDate: "2025-03-25",
    assignedBy: "Finance Team",
    assignedDate: "2025-03-03",
  },
];

export function Tasks() {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800">High</span>;
      case "medium":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-orange-100 text-orange-800">Medium</span>;
      case "low":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">Low</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const filteredData = DUMMY_TASKS.filter((task) => {
    if (filterStatus !== "all" && task.status !== filterStatus) return false;
    if (filterPriority !== "all" && task.priority !== filterPriority) return false;
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue = a[sortColumn as keyof Task];
    let bValue = b[sortColumn as keyof Task];

    if (sortColumn === "dueDate" || sortColumn === "assignedDate") {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return <ChevronDown className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-gray-600" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-600" />
    );
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tasks</h1>
        <p className="text-gray-600">Complete tasks assigned by the admin team</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Priority:</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="ml-auto text-sm text-gray-600">
              {sortedData.length} task{sortedData.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* Table */}
        {sortedData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("title")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                    >
                      Task
                      <SortIcon column="title" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("category")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                    >
                      Category
                      <SortIcon column="category" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("priority")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                    >
                      Priority
                      <SortIcon column="priority" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                    >
                      Status
                      <SortIcon column="status" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("dueDate")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                    >
                      Due Date
                      <SortIcon column="dueDate" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort("assignedBy")}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700 uppercase tracking-wider group hover:text-gray-900"
                    >
                      Assigned By
                      <SortIcon column="assignedBy" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((task) => {
                  const daysUntilDue = getDaysUntilDue(task.dueDate);
                  return (
                    <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{task.category}</td>
                      <td className="px-6 py-4">{getPriorityBadge(task.priority)}</td>
                      <td className="px-6 py-4">{getStatusBadge(task.status)}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(task.dueDate).toLocaleDateString("en-US")}
                        </div>
                        {task.status !== "completed" && (
                          <div className={`text-xs mt-1 ${daysUntilDue < 0 ? "text-red-600" : daysUntilDue <= 7 ? "text-orange-600" : "text-gray-500"}`}>
                            {daysUntilDue < 0 
                              ? `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? "s" : ""}`
                              : `${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""} left`}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{task.assignedBy}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(task.assignedDate).toLocaleDateString("en-US")}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">
              {filterStatus !== "all" || filterPriority !== "all"
                ? "No tasks match your current filters."
                : "You don't have any assigned tasks at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
