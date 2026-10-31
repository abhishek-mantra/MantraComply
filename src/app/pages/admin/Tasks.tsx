import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { ConfirmationDialog } from "../../components/shared/ConfirmationDialog";
import { useToast } from "../../components/shared/Toast";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  providerId: string;
  category: string;
  priority?: "High" | "Medium" | "Low";
  dueDate: string;
  status: string;
  createdBy: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Upload renewed medical license",
    description: "Your NY state license expires soon. Please upload the renewed version.",
    assignedTo: "Dr. Emily Rodriguez",
    providerId: "3",
    category: "Document Upload",
    priority: "High",
    dueDate: "2026-04-15",
    status: "Overdue",
    createdBy: "Admin User",
  },
  {
    id: 2,
    title: "Complete CAQH re-attestation",
    description: "Annual CAQH profile attestation is due",
    assignedTo: "Dr. Michael Chen",
    providerId: "2",
    category: "Form Completion",
    priority: "Medium",
    dueDate: "2026-04-20",
    status: "Pending",
    createdBy: "Admin User",
  },
  {
    id: 3,
    title: "Sign Aetna delegation agreement",
    description: "New delegation agreement requires your signature",
    assignedTo: "Dr. Sarah Johnson",
    providerId: "1",
    category: "Signature Required",
    priority: "High",
    dueDate: "2026-04-25",
    status: "In Progress",
    createdBy: "Admin User",
  },
  {
    id: 4,
    title: "Review malpractice insurance renewal",
    description: "Please review and confirm malpractice insurance renewal details",
    assignedTo: "Dr. Robert Taylor",
    providerId: "6",
    category: "Review",
    priority: "Medium",
    dueDate: "2026-05-01",
    status: "Pending",
    createdBy: "Admin User",
  },
  {
    id: 5,
    title: "Upload DEA certificate copy",
    description: "DEA certificate copy needed for credentialing file",
    assignedTo: "Dr. James Williams",
    providerId: "4",
    category: "Document Upload",
    priority: "Low",
    dueDate: "2026-05-10",
    status: "Completed",
    createdBy: "Admin User",
  },
];

const PROVIDERS = [
  { id: "1", name: "Dr. Sarah Johnson" },
  { id: "2", name: "Dr. Michael Chen" },
  { id: "3", name: "Dr. Emily Rodriguez" },
  { id: "4", name: "Dr. James Williams" },
  { id: "5", name: "Dr. Lisa Anderson" },
  { id: "6", name: "Dr. Robert Taylor" },
];

export function Tasks() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [providerFilter, setProviderFilter] = useState("All Providers");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    category: "",
    dueDate: "",
    priority: "Medium" as "High" | "Medium" | "Low",
  });

  useEffect(() => {
    document.title = "Tasks Management — MantraComply";
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || task.status === statusFilter;
    const matchesProvider = providerFilter === "All Providers" || task.assignedTo === providerFilter;
    const matchesCategory = categoryFilter === "All Categories" || task.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesProvider && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Document Upload":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Form Completion":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Signature Required":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "Review":
        return "bg-teal-50 text-teal-700 border border-teal-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "Overdue":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    return due < today && status !== "Completed";
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.category || !newTask.dueDate) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const provider = PROVIDERS.find((p) => p.id === newTask.assignedTo);
    const newTaskObj: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      assignedTo: provider?.name || "",
      providerId: newTask.assignedTo,
      category: newTask.category,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      status: "Pending",
      createdBy: "Abhishek Madaan",
    };

    setTasks([...tasks, newTaskObj]);
    showToast(`Task created and assigned to ${provider?.name}`, "success");
    setShowCreateModal(false);
    setNewTask({
      title: "",
      description: "",
      assignedTo: "",
      category: "",
      dueDate: "",
      priority: "Medium",
    });
  };

  const handleEditTask = () => {
    if (!selectedTask || !newTask.title || !newTask.assignedTo || !newTask.category || !newTask.dueDate) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const provider = PROVIDERS.find((p) => p.id === newTask.assignedTo);
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              title: newTask.title,
              description: newTask.description,
              assignedTo: provider?.name || "",
              providerId: newTask.assignedTo,
              category: newTask.category,
              priority: newTask.priority,
              dueDate: newTask.dueDate,
            }
          : task
      )
    );
    showToast("Task updated successfully", "success");
    setShowEditModal(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter((task) => task.id !== selectedTask.id));
      showToast("Task deleted successfully", "success");
      setShowDeleteDialog(false);
      setSelectedTask(null);
    }
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
    showToast("Task status updated", "success");
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    const provider = PROVIDERS.find((p) => p.name === task.assignedTo);
    setNewTask({
      title: task.title,
      description: task.description,
      assignedTo: provider?.id || "",
      category: task.category,
      dueDate: task.dueDate,
      priority: task.priority || "Medium",
    });
    setShowEditModal(true);
  };

  const openDeleteDialog = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tasks Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, assign, and track compliance and credentialing tasks across all providers.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Main Card with Filter Bar and Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-5">
        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search task title...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option>All Categories</option>
            <option>Document Upload</option>
            <option>Form Completion</option>
            <option>Signature Required</option>
            <option>Review</option>
            <option>Other</option>
          </select>

          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option>All Providers</option>
            {PROVIDERS.map((provider) => (
              <option key={provider.id} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tasks Data Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0B2545] text-white">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  TASK TITLE
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  ASSIGNED TO
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  CATEGORY
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  PRIORITY
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  STATUS
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  DUE DATE
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-sm font-semibold text-gray-900">{task.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{task.description}</div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => navigate(`/admin/providers/${task.providerId}`)}
                        className="text-sm font-medium text-[#2563EB] hover:underline"
                      >
                        {task.assignedTo}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        task.priority === "High" ? "bg-red-50 text-red-700 border border-red-200" :
                        task.priority === "Medium" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                        "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}>
                        {task.priority || "Medium"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer ${getStatusColor(task.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-sm ${isOverdue(task.dueDate, task.status) ? "text-red-600 font-semibold" : "text-gray-700"}`}>
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(task)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteDialog(task)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-sm text-gray-400">
                    No tasks found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Task Modal */}
      <ModalWrapper
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Task"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="e.g., Upload renewed medical license"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              rows={3}
              placeholder="e.g., Your NY state license expires soon. Please upload the renewed version."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To <span className="text-red-500">*</span>
            </label>
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
            >
              <option value="">Select a provider...</option>
              {PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="">Select category...</option>
                <option>Document Upload</option>
                <option>Form Completion</option>
                <option>Signature Required</option>
                <option>Review</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTask}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              Create Task
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Edit Task Modal */}
      <ModalWrapper isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Task" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To <span className="text-red-500">*</span>
            </label>
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
            >
              <option value="">Select a provider...</option>
              {PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="">Select category...</option>
                <option>Document Upload</option>
                <option>Form Completion</option>
                <option>Signature Required</option>
                <option>Review</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditTask}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </ModalWrapper>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message="Delete this task? This cannot be undone."
        confirmText="Delete"
        confirmColor="red"
      />
    </div>
  );
}

export default Tasks;
