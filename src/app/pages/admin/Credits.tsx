import { useState } from "react";
import { Search, Zap, Plus, Download, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2 } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { useToast } from "../../components/shared/Toast";

interface CreditTransaction {
  id: string;
  date: string;
  description: string;
  category: "Verification" | "Credential Check" | "CAQH Attestation" | "Credit Purchase" | "Monthly Allocation";
  amount: number;
  balance: number;
  status: "Completed" | "Pending";
}

const INITIAL_TRANSACTIONS: CreditTransaction[] = [
  {
    id: "TX-1049",
    date: "Oct 29, 2026",
    description: "State medical license primary source verification (Dr. Emily Rodriguez)",
    category: "Verification",
    amount: -1,
    balance: 489,
    status: "Completed",
  },
  {
    id: "TX-1048",
    date: "Oct 28, 2026",
    description: "Automated CAQH roster sync & re-attestation (Dr. Michael Chen)",
    category: "CAQH Attestation",
    amount: -3,
    balance: 490,
    status: "Completed",
  },
  {
    id: "TX-1047",
    date: "Oct 25, 2026",
    description: "OIG / SAM exclusion sanction check (All Providers)",
    category: "Credential Check",
    amount: -2,
    balance: 493,
    status: "Completed",
  },
  {
    id: "TX-1046",
    date: "Oct 20, 2026",
    description: "Enterprise top-up credit pack purchase (+250 credits)",
    category: "Credit Purchase",
    amount: +250,
    balance: 495,
    status: "Completed",
  },
  {
    id: "TX-1045",
    date: "Oct 01, 2026",
    description: "Monthly plan credit allowance allocation",
    category: "Monthly Allocation",
    amount: +500,
    balance: 245,
    status: "Completed",
  },
];

export function Credits() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState(100);
  const [transactions, setTransactions] = useState<CreditTransaction[]>(INITIAL_TRANSACTIONS);

  const availableCredits = 489;
  const usedThisMonth = 42;
  const totalAllocation = 750;

  const handlePurchase = () => {
    const newTx: CreditTransaction = {
      id: `TX-${Math.floor(1050 + Math.random() * 500)}`,
      date: "Just now",
      description: `Credit pack top-up (+${selectedPack} credits)`,
      category: "Credit Purchase",
      amount: selectedPack,
      balance: availableCredits + selectedPack,
      status: "Completed",
    };
    setTransactions([newTx, ...transactions]);
    showToast(`Successfully added ${selectedPack} operational credits to your organization`, "success");
    setShowBuyModal(false);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || tx.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Credits Ledger</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor real-time compliance credits, quota consumption, and audit trail.
          </p>
        </div>
        <button
          onClick={() => setShowBuyModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Zap className="w-4 h-4 fill-current" />
          Add Credits
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Available Balance</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Zap className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{availableCredits}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sufficient for ~480 automated verifications
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Used This Cycle</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{usedThisMonth}</div>
          <div className="text-xs text-gray-500 font-medium mt-1">
            Across 18 providers and 4 facilities
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Plan Quota</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalAllocation}</div>
          <div className="text-xs text-gray-500 font-medium mt-1">
            Renews on Nov 01, 2026
          </div>
        </div>
      </div>

      {/* Main Card with Filter Bar and Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden p-6 space-y-5">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search transaction description or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Verification">Verification</option>
              <option value="Credential Check">Credential Check</option>
              <option value="CAQH Attestation">CAQH Attestation</option>
              <option value="Credit Purchase">Credit Purchase</option>
              <option value="Monthly Allocation">Monthly Allocation</option>
            </select>
          </div>

          <button
            onClick={() => showToast("Exporting ledger CSV...", "info")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0B2545] text-white">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  TRANSACTION ID
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  DATE
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  DESCRIPTION
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  CATEGORY
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  AMOUNT
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider border-r border-[#1a3a60]">
                  BALANCE
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-4 text-xs font-mono font-semibold text-gray-700">{tx.id}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 whitespace-nowrap">{tx.date}</td>
                    <td className="px-5 py-4 text-sm font-medium text-gray-900">{tx.description}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-bold flex items-center gap-1 ${
                          tx.amount > 0 ? "text-emerald-600" : "text-gray-900"
                        }`}
                      >
                        {tx.amount > 0 ? (
                          <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                        )}
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-700">{tx.balance}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-sm text-gray-400">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buy Credits Modal */}
      <ModalWrapper
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        title="Purchase Operational Credits"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Operational credits are consumed automatically when running state license checks, primary source verifications, and exclusion audits.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { amount: 50, price: "$49", perCredit: "$0.98/credit" },
              { amount: 100, price: "$89", perCredit: "$0.89/credit", popular: true },
              { amount: 250, price: "$199", perCredit: "$0.80/credit" },
            ].map((pack) => (
              <button
                key={pack.amount}
                type="button"
                onClick={() => setSelectedPack(pack.amount)}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer relative ${
                  selectedPack === pack.amount
                    ? "border-[#2563EB] bg-blue-50/50 ring-2 ring-blue-500/20"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    POPULAR
                  </span>
                )}
                <div className="text-xl font-bold text-gray-900">+{pack.amount}</div>
                <div className="text-sm font-semibold text-[#2563EB] mt-0.5">{pack.price}</div>
                <div className="text-[11px] text-gray-500 mt-1">{pack.perCredit}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowBuyModal(false)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-sm font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}

export default Credits;

