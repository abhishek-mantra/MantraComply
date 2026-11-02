import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Users, 
  Building2, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Plus, 
  X,
  Eye
} from 'lucide-react';
import { 
  initialEnrollments, 
  availableSpecialists, 
  availableOrganizations,
  getStoredEnrollments,
  saveStoredEnrollments,
  EnrollmentRecord 
} from '../../data/adminMockData';
import { PipelineStageBar } from '../../components/shared/PipelineStageBar';
import { PriorityBadge } from '../../components/shared/PriorityBadge';
import { ClientDetailDrawer } from '../../components/shared/ClientDetailDrawer';

export const Payers: React.FC = () => {
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(() => getStoredEnrollments());

  // Synchronize state with persistent storage on tab switch or updates from Providers tab
  useEffect(() => {
    const handleSync = () => {
      setEnrollments(getStoredEnrollments());
    };
    window.addEventListener('mantra_enrollments_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('mantra_enrollments_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);
  const [activeToggle, setActiveToggle] = useState<'providers' | 'facilities'>('providers');
  const [searchTerm, setSearchTerm] = useState('');
  const [specialistFilter, setSpecialistFilter] = useState('ALL');

  // Selected client for Drawer
  const [selectedClientRecord, setSelectedClientRecord] = useState<EnrollmentRecord | null>(null);

  // New Enrollment Request Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProviderName, setNewProviderName] = useState('');
  const [newOrganization, setNewOrganization] = useState(availableOrganizations[0]);
  const [newService, setNewService] = useState('THERAPY');
  const [newState, setNewState] = useState('NY');
  const [newType, setNewType] = useState('Commercial');
  const [newPayer, setNewPayer] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newSpecialist, setNewSpecialist] = useState(availableSpecialists[0]);
  const [newNotes, setNewNotes] = useState('');

  // Hamburger Action Menu
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleStageChange = (id: number, newStage: string) => {
    setEnrollments(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, status: newStage } : item);
      saveStoredEnrollments(updated);
      return updated;
    });
    if (selectedClientRecord && selectedClientRecord.id === id) {
      setSelectedClientRecord(prev => prev ? { ...prev, status: newStage } : null);
    }
  };

  const handlePriorityChange = (id: number, newPriority: 'High' | 'Medium' | 'Low') => {
    setEnrollments(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, priority: newPriority } : item);
      saveStoredEnrollments(updated);
      return updated;
    });
    if (selectedClientRecord && selectedClientRecord.id === id) {
      setSelectedClientRecord(prev => prev ? { ...prev, priority: newPriority } : null);
    }
  };

  const handleSpecialistChange = (id: number, newSpecialist: string) => {
    setEnrollments(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, responsibleUser: newSpecialist, assignedSpecialist: newSpecialist } : item
      );
      saveStoredEnrollments(updated);
      return updated;
    });
    if (selectedClientRecord && selectedClientRecord.id === id) {
      setSelectedClientRecord(prev => prev ? { ...prev, responsibleUser: newSpecialist, assignedSpecialist: newSpecialist } : null);
    }
  };

  const handleUpdateRecord = (updated: EnrollmentRecord) => {
    setEnrollments(prev => {
      const list = prev.map(item => item.id === updated.id ? updated : item);
      saveStoredEnrollments(list);
      return list;
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProviderName.trim() || !newPayer.trim()) return;

    const newRec: EnrollmentRecord = {
      id: Date.now(),
      providerName: newProviderName.trim(),
      organization: newOrganization,
      service: newService,
      state: newState,
      type: newType,
      payer: newPayer.trim(),
      insurance: newPayer.trim(),
      priority: newPriority,
      status: 'Pending',
      dateOfSubmission: new Date().toLocaleDateString('en-US'),
      referenceNumber: `REF-${newPayer.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      followUpDate: '—',
      responsibleUser: newSpecialist,
      assignedSpecialist: newSpecialist,
      effectiveDate: '—',
      recredentialingDate: '—',
      providerInsuranceId: '—',
      notes: newNotes.trim() || 'New enrollment initiated by Org Admin.'
    };

    const updated = [newRec, ...enrollments];
    setEnrollments(updated);
    saveStoredEnrollments(updated);
    setIsAddModalOpen(false);
    setNewProviderName('');
    setNewPayer('');
    setNewNotes('');
  };

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter(item => {
      if (specialistFilter !== 'ALL' && (item.responsibleUser || item.assignedSpecialist) !== specialistFilter) {
        return false;
      }
      const q = searchTerm.toLowerCase();
      if (!q) return true;
      return (
        item.providerName.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        (item.payer || item.insurance || '').toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q) ||
        (item.referenceNumber || '').toLowerCase().includes(q) ||
        (item.notes || '').toLowerCase().includes(q)
      );
    });
  }, [enrollments, searchTerm, specialistFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEnrollments.length / itemsPerPage));
  const paginatedList = filteredEnrollments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#002B49]">
            Enrollment Applications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track insurance enrollment requests for providers and facilities across all contracting milestones.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <div className="inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs">
            <button
              onClick={() => setActiveToggle('providers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeToggle === 'providers'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users size={16} />
              Providers
            </button>
            <button
              onClick={() => setActiveToggle('facilities')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeToggle === 'facilities'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 size={16} />
              Facilities
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>New Enrollment Request</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 flex-wrap sm:flex-nowrap">
          <Search size={18} className="text-slate-400 shrink-0" />
          
          <button className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/50 text-xs font-semibold text-blue-600 shrink-0 cursor-pointer flex items-center gap-1.5">
            All requests
            <ChevronDown size={13} />
          </button>

          <div className="relative">
            <select
              value={specialistFilter}
              onChange={(e) => {
                setSpecialistFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none appearance-none pr-7"
            >
              <option value="ALL">All Responsible</option>
              <option value="MantraComply">MantraComply</option>
              {availableSpecialists.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={13} className="text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search provider, org, payer, ref #, or notes..."
            className="w-full text-sm text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500 whitespace-nowrap pl-4 border-l border-slate-100 hidden md:flex items-center gap-2">
          <span>{filteredEnrollments.length} records</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 font-normal">Scroll horizontally to view all columns ⇄</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0 min-w-[2100px]">
            <thead>
              <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                {/* Col 1: Action Menu Icon (sticky left-0) */}
                <th className="py-3.5 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center sticky left-0 bg-[#002B49] z-30 border-r border-b border-[#1a4a6e] box-border">
                  <div className="w-[44px] flex items-center justify-center">
                    <span className="text-slate-300">≡</span>
                  </div>
                </th>

                {/* Col 2: Provider Name (sticky left-44px) */}
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[220px] sticky left-[44px] bg-[#002B49] z-30 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.25)]">
                  PROVIDER NAME
                </th>

                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[140px]">ORGANIZATION</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[130px]">SERVICE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[100px]">STATE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[120px]">TYPE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[140px]">PAYER</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[110px] text-center">PRIORITY</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[240px]">STAGE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[150px]">DATE OF SUBMISSION</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[150px]">REFERENCE NUMBER</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[130px]">FOLLOW UP DATE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[170px]">RESPONSIBLE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[130px]">EFFECTIVE DATE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[150px]">RECREDENTIALING DATE</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-r border-b border-[#1a4a6e] min-w-[170px]">PROVIDER INSURANCE ID</th>
                <th className="py-3.5 px-4 whitespace-nowrap border-b border-[#1a4a6e] min-w-[320px]">NOTES</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={17} className="text-center py-16 text-slate-400 text-sm border-b border-slate-100">
                    No enrollment requests found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Col 1: Action Hamburger */}
                    <td className="py-3 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-20 border-r border-b border-slate-100 box-border select-none">
                      <div className="w-[44px] flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setSelectedClientRecord(item)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer transition-colors"
                          title="Open Client Detail Drawer"
                        >
                          <span className="text-base font-bold leading-none">≡</span>
                        </button>
                      </div>
                    </td>

                    {/* Col 2: Provider Name */}
                    <td className="py-3 px-4 sticky left-[44px] bg-white group-hover:bg-slate-50 transition-colors z-20 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.06)] border-r border-b border-slate-100 box-border">
                      <button
                        type="button"
                        onClick={() => setSelectedClientRecord(item)}
                        className="text-left group/btn cursor-pointer focus:outline-none"
                        title="Click to view client details & process timeline"
                      >
                        <div className="font-semibold text-blue-600 group-hover/btn:text-blue-800 group-hover/btn:underline whitespace-nowrap">
                          {item.providerName}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
                          ID: #{item.id}
                        </div>
                      </button>
                    </td>

                    {/* Organization */}
                    <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap border-r border-b border-slate-100">
                      {item.organization}
                    </td>

                    {/* Service */}
                    <td className="py-3 px-4 text-blue-700 font-semibold uppercase whitespace-nowrap border-r border-b border-slate-100">
                      {item.service}
                    </td>

                    {/* State */}
                    <td className="py-3 px-4 text-slate-700 font-medium whitespace-nowrap border-r border-b border-slate-100">
                      {item.state || '—'}
                    </td>

                    {/* Type */}
                    <td className="py-3 px-4 text-slate-700 whitespace-nowrap border-r border-b border-slate-100">
                      {item.type || 'Commercial'}
                    </td>

                    {/* Payer */}
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap border-r border-b border-slate-100">
                      {item.payer || item.insurance}
                    </td>

                    {/* Priority (Interactive PriorityBadge) */}
                    <td className="py-3 px-4 text-center whitespace-nowrap border-r border-b border-slate-100">
                      <PriorityBadge
                        priority={item.priority}
                        onChange={(p) => handlePriorityChange(item.id, p)}
                      />
                    </td>

                    {/* Stage (Interactive 12-stage PipelineStageBar) */}
                    <td className="py-2.5 px-4 whitespace-nowrap border-r border-b border-slate-100">
                      <PipelineStageBar
                        status={item.status}
                        onChange={(newStage) => handleStageChange(item.id, newStage)}
                      />
                    </td>

                    {/* Date of Submission */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap border-r border-b border-slate-100">
                      {item.dateOfSubmission || '—'}
                    </td>

                    {/* Reference Number */}
                    <td className="py-3 px-4 font-mono font-medium text-slate-700 whitespace-nowrap border-r border-b border-slate-100">
                      {item.referenceNumber || '—'}
                    </td>

                    {/* Follow Up Date */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap border-r border-b border-slate-100">
                      {item.followUpDate || '—'}
                    </td>

                    {/* Responsible (Static Pill for MantraComply, Interactive Dropdown for Manual) */}
                    <td className="py-3 px-4 whitespace-nowrap border-r border-b border-slate-100">
                      {item.responsibleUser === 'MantraComply' || item.responsibleUser === 'Mantra AI' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 shadow-2xs select-none">
                          MantraComply
                        </span>
                      ) : (
                        <div className="relative inline-block text-left">
                          <select
                            value={item.responsibleUser || item.assignedSpecialist || availableSpecialists[0]}
                            onChange={(e) => handleSpecialistChange(item.id, e.target.value)}
                            className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-800 hover:border-slate-300 shadow-2xs transition-all cursor-pointer appearance-none pr-7"
                          >
                            {availableSpecialists.map((specialist) => (
                              <option key={specialist} value={specialist}>
                                {specialist}
                              </option>
                            ))}
                            {!availableSpecialists.includes(item.responsibleUser || '') && item.responsibleUser && (
                              <option value={item.responsibleUser}>{item.responsibleUser}</option>
                            )}
                          </select>
                          <ChevronDown 
                            size={12} 
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" 
                          />
                        </div>
                      )}
                    </td>

                    {/* Effective Date */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap border-r border-b border-slate-100">
                      {item.effectiveDate || '—'}
                    </td>

                    {/* Recredentialing Date */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap border-r border-b border-slate-100">
                      {item.recredentialingDate || '—'}
                    </td>

                    {/* Provider Insurance ID */}
                    <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap border-r border-b border-slate-100">
                      {item.providerInsuranceId || '—'}
                    </td>

                    {/* Notes */}
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate border-b border-slate-100" title={item.notes}>
                      {item.notes || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <span className="font-bold text-slate-900">
              {filteredEnrollments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>
            <span>to</span>
            <span className="font-bold text-slate-900">
              {Math.min(currentPage * itemsPerPage, filteredEnrollments.length)}
            </span>
            <span>of</span>
            <span className="font-bold text-slate-900">{filteredEnrollments.length}</span>
            <span>records</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }).map((_, pIdx) => {
              const pNum = pIdx + 1;
              return (
                <button
                  key={pNum}
                  onClick={() => setCurrentPage(pNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    currentPage === pNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {pNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {selectedClientRecord && (
        <ClientDetailDrawer
          client={selectedClientRecord}
          onClose={() => setSelectedClientRecord(null)}
          onUpdate={handleUpdateRecord}
        />
      )}

      {/* New Enrollment Request Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900">New Enrollment Request</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Provider Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sarah Johnson"
                  value={newProviderName}
                  onChange={(e) => setNewProviderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Organization</label>
                  <select
                    value={newOrganization}
                    onChange={(e) => setNewOrganization(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none cursor-pointer"
                  >
                    {availableOrganizations.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Service</label>
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Payer *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aetna"
                    value={newPayer}
                    onChange={(e) => setNewPayer(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">State</label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ops Responsible</label>
                <select
                  value={newSpecialist}
                  onChange={(e) => setNewSpecialist(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none cursor-pointer"
                >
                  {availableSpecialists.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Optional internal notes..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs cursor-pointer"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payers;

