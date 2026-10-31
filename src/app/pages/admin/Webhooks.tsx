import { useState } from "react";
import { Plus, Radio, Check, Copy, Trash2, Key } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: "Active" | "Failing" | "Disabled";
  createdAt: string;
  lastDelivered: string;
}

const INITIAL_WEBHOOKS: WebhookEndpoint[] = [
  {
    id: "wh_live_94812",
    url: "https://api.acmehealth.com/mantracomply/webhooks",
    events: ["provider.credentialed", "license.expiring", "task.completed"],
    status: "Active",
    createdAt: "Aug 12, 2026",
    lastDelivered: "10 mins ago",
  },
  {
    id: "wh_live_21904",
    url: "https://events.acmehealth.com/ehr-sync",
    events: ["payer.enrollment_approved", "document.verified"],
    status: "Active",
    createdAt: "Sep 01, 2026",
    lastDelivered: "2 hours ago",
  },
];

export function Webhooks() {
  const { showToast } = useToast();
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>(INITIAL_WEBHOOKS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    "provider.credentialed",
    "license.expiring",
  ]);

  const handleCreateWebhook = () => {
    if (!newUrl) {
      showToast("Please enter a valid webhook endpoint URL", "error");
      return;
    }
    const newEndpoint: WebhookEndpoint = {
      id: `wh_live_${Math.floor(10000 + Math.random() * 90000)}`,
      url: newUrl,
      events: selectedEvents,
      status: "Active",
      createdAt: "Just now",
      lastDelivered: "Never",
    };
    setWebhooks([newEndpoint, ...webhooks]);
    showToast("Webhook endpoint registered successfully", "success");
    setShowAddModal(false);
    setNewUrl("");
  };

  const handleDelete = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id));
    showToast("Webhook endpoint removed", "info");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Webhooks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Receive real-time automated HTTP POST payloads for license updates, roster changes, and task completions.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Endpoint
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Key className="w-4 h-4 text-gray-400" />
            <span>Signing Secret: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono font-bold text-gray-800">whsec_live_9a7b8c...</code></span>
          </div>
          <button
            onClick={() => showToast("Webhook signing secret copied", "success")}
            className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Secret
          </button>
        </div>

        {/* Webhooks Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0B2545] text-white">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  ENDPOINT URL
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  SUBSCRIBED EVENTS
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  STATUS
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  LAST DELIVERED
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {webhooks.length > 0 ? (
                webhooks.map((wh) => (
                  <tr key={wh.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-mono text-xs font-semibold text-gray-900">{wh.url}</div>
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">{wh.id}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {wh.events.map((e) => (
                          <span
                            key={e}
                            className="inline-block bg-blue-50 text-[#2563EB] border border-blue-100 text-[11px] px-2 py-0.5 rounded-md font-mono"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {wh.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-600">{wh.lastDelivered}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(wh.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove Endpoint"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-sm text-gray-400">
                    No webhook endpoints configured.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Webhook Modal */}
      <ModalWrapper
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Webhook Endpoint"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-mono"
              placeholder="https://api.yourdomain.com/webhooks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Events to send</label>
            <div className="space-y-2 border border-gray-200 rounded-xl p-3 bg-gray-50/50">
              {[
                { id: "provider.credentialed", label: "provider.credentialed" },
                { id: "license.expiring", label: "license.expiring" },
                { id: "task.completed", label: "task.completed" },
                { id: "payer.enrollment_approved", label: "payer.enrollment_approved" },
              ].map((ev) => (
                <label key={ev.id} className="flex items-center gap-2.5 text-xs font-mono text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(ev.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEvents([...selectedEvents, ev.id]);
                      } else {
                        setSelectedEvents(selectedEvents.filter((item) => item !== ev.id));
                      }
                    }}
                    className="w-4 h-4 text-[#2563EB] rounded border-gray-300"
                  />
                  <span>{ev.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateWebhook}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Save Endpoint
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Webhooks;

