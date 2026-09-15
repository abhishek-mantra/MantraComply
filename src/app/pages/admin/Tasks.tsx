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

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
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
    priority: "Medium",
  });

  useEffect(() => {
    document.title = "Tasks — MantraComply";
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
        return "bg-blue-100 text-blue-800";
      case "Form Completion":
        return "bg-purple-100 text-purple-800";
      case "Signature Required":
        return "bg-orange-100 text-orange-800";
      case "Review":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      dueDate: newTask.dueDate,
      status: "Pending",
      createdBy: "Admin User",
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
      priority: "Medium",
    });
    setShowEditModal(true);
  };

  const openDeleteDialog = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteDialog(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tasks</h1>
        <p className="text-gray-600">Manage and track tasks assigned to providers</p>
      </div>

      {/* Top Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white rounded-md text-sm font-medium hover:bg-[#1976D2] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>

          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
          >
            <option>All Providers</option>
            {PROVIDERS.map((provider) => (
              <option key={provider.id} value={provider.name}>
                {provider.name}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
          >
            <option>All Categories</option>
            <option>Document Upload</option>
            <option>Form Completion</option>
            <option>Signature Required</option>
            <option>Review</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{task.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/providers/${task.providerId}`)}
                      className="text-sm text-[#2196F3] hover:underline"
                    >
                      {task.assignedTo}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                        task.category
                      )}`}
                    >
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm ${
                        isOverdue(task.dueDate, task.status) ? "text-red-600 font-medium" : "text-gray-900"
                      }`}
                    >
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(
                        task.status
                      )}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{task.createdBy}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(task)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteDialog(task)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No tasks found.</p>
          </div>
        )}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="e.g., Upload renewed medical license"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              rows={3}
              placeholder="e.g., Your NY state license expires soon. Please upload the renewed version."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign To <span className="text-red-500">*</span>
            </label>
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select a provider...</option>
              {PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateTask}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign To <span className="text-red-500">*</span>
            </label>
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
            >
              <option value="">Select a provider...</option>
              {PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none"
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditTask}
              className="px-4 py-2 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
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
