import { useState } from "react";
import { Plus, Building2, Check, ExternalLink } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

interface OrgItem {
  id: string;
  name: string;
  role: string;
  plan: string;
  providersCount: number;
  status: "Active" | "Pending";
  isCurrent: boolean;
}

const INITIAL_ORGS: OrgItem[] = [
  {
    id: "org_1",
    name: "adsa",
    role: "OWNER",
    plan: "Enterprise Roster Pro",
    providersCount: 18,
    status: "Active",
    isCurrent: true,
  },
  {
    id: "org_2",
    name: "PhysioMantra",
    role: "ADMIN",
    plan: "Standard Clinical",
    providersCount: 12,
    status: "Active",
    isCurrent: false,
  },
  {
    id: "org_3",
    name: "CareFirst Health",
    role: "MEMBER",
    plan: "Basic Starter",
    providersCount: 4,
    status: "Active",
    isCurrent: false,
  },
];

export function Organizations() {
  const { showToast } = useToast();
  const [orgs, setOrgs] = useState<OrgItem[]>(INITIAL_ORGS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");

  const handleCreateOrg = () => {
    if (!newOrgName) {
      showToast("Please enter organization name", "error");
      return;
    }
    const newOrg: OrgItem = {
      id: `org_${Date.now()}`,
      name: newOrgName,
      role: "OWNER",
      plan: "Standard Clinical",
      providersCount: 0,
      status: "Active",
      isCurrent: false,
    };
    setOrgs([...orgs, newOrg]);
    showToast(`Organization "${newOrgName}" created`, "success");
    setShowAddModal(false);
    setNewOrgName("");
  };

  const handleSwitch = (name: string) => {
    setOrgs(
      orgs.map((o) => ({
        ...o,
        isCurrent: o.name === name,
      }))
    );
    showToast(`Switched active organization to ${name}`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Organizations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your parent organization, tenant entities, and sub-accounts.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Organization
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-5">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0B2545] text-white">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  ORGANIZATION
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  YOUR ROLE
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  SUBSCRIPTION PLAN
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  PROVIDERS
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  STATUS
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orgs.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] font-bold text-xs flex items-center justify-center border border-blue-100">
                        {org.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                          {org.name}
                          {org.isCurrent && (
                            <span className="bg-blue-100 text-[#2563EB] text-[10px] font-bold px-2 py-0.5 rounded-full">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-400 font-mono">{org.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                      {org.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700">{org.plan}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900">{org.providersCount}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {org.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {!org.isCurrent ? (
                      <button
                        onClick={() => handleSwitch(org.name)}
                        className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
                      >
                        Switch To
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Organization Modal */}
      <ModalWrapper
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Organization"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              placeholder="e.g. HealthCare Partners LLC"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateOrg}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Create Organization
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Organizations;

