import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Search, 
  Clock, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronDown,
  Settings,
  Plus
} from 'lucide-react';
import { 
  initialCredentialProviders, 
  initialCredentialFacilities, 
  availableSpecialists, 
  availableOnboarders,
  ProviderApplication,
  FacilityApplication
} from '../../data/adminMockData';
import { StatusBadge, StatusType } from '../../components/shared/StatusBadge';
import { ApplicationDetailModal } from '../../components/shared/ApplicationDetailModal';
import { StatusHistoryModal } from '../../components/shared/StatusHistoryModal';

export const Credentialing: React.FC = () => {
  const [providers, setProviders] = useState<ProviderApplication[]>(initialCredentialProviders);
  const [facilities, setFacilities] = useState<FacilityApplication[]>(initialCredentialFacilities);
  
  const [activeSubTab, setActiveSubTab] = useState<'providers' | 'facilities'>('providers');
  const [searchTerm, setSearchTerm] = useState('');
  const [specialistFilter, setSpecialistFilter] = useState('ALL');
  
  // Modals state
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [historyTitle, setHistoryTitle] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Floating hamburger action menu open state (≡ icon in Col 1)
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Close hamburger menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const updateProviderStatus = (id: number, newStatus: StatusType) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status: newStatus as any } : p));
  };

  const updateProviderSpecialist = (id: number, specialist: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, opsResponsible: specialist, assignedSpecialist: specialist } : p));
  };

  const updateProviderOnboardedBy = (id: number, onboarder: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, onboardedBy: onboarder } : p));
  };

  const updateFacilityStatus = (id: string, newStatus: StatusType) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, status: newStatus as any } : f));
  };

  const updateFacilitySpecialist = (id: string, specialist: string) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, opsResponsible: specialist, assignedSpecialist: specialist } : f));
  };

  const updateFacilityOnboardedBy = (id: string, onboarder: string) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, onboardedBy: onboarder } : f));
  };

  // Filtered providers
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      if (specialistFilter !== 'ALL' && (p.opsResponsible || p.assignedSpecialist) !== specialistFilter) {
        return false;
      }
      const matchSearch = searchTerm === '' || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.onboardedBy && p.onboardedBy.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ((p.opsResponsible || p.assignedSpecialist) && (p.opsResponsible || p.assignedSpecialist)!.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchSearch;
    });
  }, [providers, searchTerm, specialistFilter]);

  // Filtered facilities
  const filteredFacilities = useMemo(() => {
    return facilities.filter(f => {
      if (specialistFilter !== 'ALL' && (f.opsResponsible || f.assignedSpecialist) !== specialistFilter) {
        return false;
      }
      const matchSearch = searchTerm === '' || 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (f.onboardedBy && f.onboardedBy.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ((f.opsResponsible || f.assignedSpecialist) && (f.opsResponsible || f.assignedSpecialist)!.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchSearch;
    });
  }, [facilities, searchTerm, specialistFilter]);

  const activeList = activeSubTab === 'providers' ? filteredProviders : filteredFacilities;
  const totalPages = Math.max(1, Math.ceil(activeList.length / itemsPerPage));
  const paginatedList = activeList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#002B49]">
            Credential Applications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review healthcare provider credentialing applications, verify credentials, and manage ops assignments.
          </p>
        </div>

        {/* Toggle Pills: Providers / Groups & Facilities */}
        <div className="inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-xs self-start md:self-auto">
          <button
            onClick={() => {
              setActiveSubTab('providers');
              setSearchTerm('');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeSubTab === 'providers'
                ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users size={16} />
            Providers
          </button>
          <button
            onClick={() => {
              setActiveSubTab('facilities');
              setSearchTerm('');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeSubTab === 'facilities'
                ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 size={16} />
            Groups / Facilities
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 flex-wrap sm:flex-nowrap">
          <Search size={18} className="text-slate-400 shrink-0" />
          
          <button className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/50 text-xs font-semibold text-blue-600 shrink-0 cursor-pointer flex items-center gap-1.5">
            {activeSubTab === 'providers' ? 'All providers' : 'All facilities'}
            <ChevronDown size={13} />
          </button>

          {/* Admin Specialist Filter Dropdown */}
          <div className="relative">
            <select
              value={specialistFilter}
              onChange={(e) => {
                setSpecialistFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none appearance-none pr-7"
            >
              <option value="ALL">All Ops Specialists</option>
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
            placeholder={
              activeSubTab === 'providers'
                ? 'Search provider, email, organization, onboarded by, ops responsible...'
                : 'Search facility, email, organization, onboarded by, ops responsible...'
            }
            className="w-full text-sm text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500 whitespace-nowrap pl-4 border-l border-slate-100 hidden md:flex items-center gap-2">
          <span>
            {activeSubTab === 'providers' ? filteredProviders.length : filteredFacilities.length} records
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 font-normal">
            {activeSubTab === 'providers' ? 'Credential Applications' : 'Facility Submissions'}
          </span>
        </div>
      </div>

      {/* Main Content Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0 min-w-[1500px]">
            <thead>
              <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                {/* Col 1: Action Header */}
                <th className="py-3.5 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center border-r border-b border-[#1a4a6e] box-border sticky left-0 bg-[#002B49] z-30">
                  <div className="w-[44px] flex items-center justify-center">
                    <span className="text-slate-300">≡</span>
                  </div>
                </th>

                {/* Col 2: Provider / Facility Name */}
                <th className="py-3.5 px-5 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[220px] sticky left-[44px] bg-[#002B49] z-30 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.25)]">
                  {activeSubTab === 'providers' ? 'PROVIDER NAME' : 'FACILITY NAME'}
                </th>

                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[180px]">EMAIL</th>
                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[160px]">ORGANIZATION</th>
                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[130px]">SERVICE</th>
                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[140px]">COUNTRY</th>
                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[150px]">REFERRED BY</th>
                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[160px]">ONBOARDED BY</th>
                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[180px]">OPS RESPONSIBLE</th>
                <th className="py-3.5 px-4 border-r border-b border-[#1a4a6e] whitespace-nowrap min-w-[160px]">CREDENTIALING START DATE</th>
                <th className="py-3.5 px-4 border-b border-[#1a4a6e] whitespace-nowrap min-w-[140px] text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-16 text-slate-400 text-sm border-b border-slate-100">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item: any, idx) => {
                  const isNearBottom = idx >= paginatedList.length - 2 && paginatedList.length > 2;
                  const orgList = item.organizations && item.organizations.length > 0 ? item.organizations : [item.organization];

                  return (
                    <tr key={item.id} className={`hover:bg-slate-50/80 transition-colors group ${openMenuId === item.id ? 'relative z-50' : ''}`}>
                      {/* Col 1: Action Hamburger (≡) with View Details & Status History */}
                      <td className={`py-3 px-0 w-[44px] min-w-[44px] max-w-[44px] text-center border-r border-b border-slate-100 box-border sticky left-0 bg-white group-hover:bg-slate-50 transition-colors relative ${
                        openMenuId === item.id ? 'z-50' : 'z-20'
                      }`}>
                        <div className={`relative inline-block text-center ${openMenuId === item.id ? 'z-50' : ''}`}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === item.id ? null : item.id);
                            }}
                            className={`w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer mx-auto ${
                              openMenuId === item.id
                                ? 'bg-blue-100 text-blue-700 font-bold'
                                : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                            }`}
                            title="Actions (View Details, Status History)"
                            aria-label="Actions"
                          >
                            <span className="text-base select-none font-bold leading-none">≡</span>
                          </button>

                          {openMenuId === item.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute left-full ml-1 w-44 rounded-xl bg-white border border-slate-200 shadow-2xl py-1.5 z-[100] text-left font-medium text-xs tracking-wide animate-in fade-in zoom-in-95 duration-100 ${
                                isNearBottom ? 'bottom-0' : 'top-0'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                  setSelectedRecord(item);
                                  setIsDetailOpen(true);
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left cursor-pointer font-semibold"
                              >
                                <Eye size={14} className="text-blue-600" />
                                <span>View Details</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(null);
                                  setHistoryTitle(`${item.name} (ID: #${item.id})`);
                                  setIsHistoryOpen(true);
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left border-t border-slate-100 cursor-pointer font-semibold"
                              >
                                <Clock size={14} className="text-amber-600" />
                                <span>Status History</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Col 2: Provider / Facility Name with ID underneath */}
                      <td className="py-3 px-5 border-r border-b border-slate-100 whitespace-nowrap sticky left-[44px] bg-white group-hover:bg-slate-50 transition-colors z-10 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.06)]">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRecord(item);
                            setIsDetailOpen(true);
                          }}
                          className="text-left group/btn cursor-pointer focus:outline-none"
                          title="Click to view application details"
                        >
                          <div className="font-semibold text-blue-600 group-hover/btn:text-blue-800 group-hover/btn:underline whitespace-nowrap">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
                            ID: #{item.id}
                          </div>
                        </button>
                      </td>

                      {/* Email */}
                      <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap border-r border-b border-slate-100">
                        {item.email}
                      </td>

                      {/* Organization */}
                      <td className="py-3 px-4 whitespace-nowrap border-r border-b border-slate-100">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {orgList.map((org: string, oIdx: number) => (
                            <span key={oIdx} className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                              {org}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3 px-4 text-blue-700 font-semibold uppercase tracking-tight whitespace-nowrap border-r border-b border-slate-100">
                        {item.service}
                      </td>

                      {/* Country */}
                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap border-r border-b border-slate-100">
                        <span className="mr-1.5">{item.countryFlag}</span>
                        {item.country}
                      </td>

                      {/* Referred By */}
                      <td className="py-3 px-4 whitespace-nowrap border-r border-b border-slate-100">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200">
                          {item.referredBy || 'Portal (Direct)'}
                        </span>
                      </td>

                      {/* Onboarded by (Interactive Dropdown) */}
                      <td className="py-3 px-4 whitespace-nowrap border-r border-b border-slate-100">
                        <div className="relative inline-block text-left">
                          <select
                            value={item.onboardedBy || 'Self (Portal)'}
                            onChange={(e) => {
                              if (activeSubTab === 'providers') {
                                updateProviderOnboardedBy(item.id, e.target.value);
                              } else {
                                updateFacilityOnboardedBy(item.id, e.target.value);
                              }
                            }}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            {availableOnboarders.map((ob) => (
                              <option key={ob} value={ob}>
                                {ob}
                              </option>
                            ))}
                            {!availableOnboarders.includes(item.onboardedBy || '') && item.onboardedBy && (
                              <option value={item.onboardedBy}>{item.onboardedBy}</option>
                            )}
                          </select>
                          <ChevronDown size={12} className="text-slate-400 absolute right-2 top-2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Ops Responsible (Interactive Dropdown) */}
                      <td className="py-3 px-4 whitespace-nowrap border-r border-b border-slate-100">
                        <div className="relative inline-block text-left">
                          <select
                            value={item.opsResponsible || item.assignedSpecialist || availableSpecialists[0]}
                            onChange={(e) => {
                              if (activeSubTab === 'providers') {
                                updateProviderSpecialist(item.id, e.target.value);
                              } else {
                                updateFacilitySpecialist(item.id, e.target.value);
                              }
                            }}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            {availableSpecialists.map((specialist) => (
                              <option key={specialist} value={specialist}>
                                {specialist}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={12} className="text-slate-400 absolute right-2 top-2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Credentialing Start Date */}
                      <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap border-r border-b border-slate-100">
                        {item.credentialingStartDate || item.date || '—'}
                      </td>

                      {/* Status (Interactive StatusBadge) */}
                      <td className="py-3 px-4 text-center whitespace-nowrap border-b border-slate-100">
                        <StatusBadge
                          status={item.status}
                          interactive={true}
                          options={['APPROVED', 'UNDER REVIEW', 'SUBMITTED', 'NEEDS INFO', 'DRAFT', 'REJECTED']}
                          onChange={(newStatus) => {
                            if (activeSubTab === 'providers') {
                              updateProviderStatus(item.id, newStatus);
                            } else {
                              updateFacilityStatus(item.id, newStatus);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <span className="font-bold text-slate-900">
              {activeList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>
            <span>to</span>
            <span className="font-bold text-slate-900">
              {Math.min(currentPage * itemsPerPage, activeList.length)}
            </span>
            <span>of</span>
            <span className="font-bold text-slate-900">{activeList.length}</span>
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

      {/* Modals */}
      <ApplicationDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        data={selectedRecord}
        onAssignSpecialist={(id, spec) => {
          if (activeSubTab === 'providers') {
            updateProviderSpecialist(id, spec);
          } else {
            updateFacilitySpecialist(id, spec);
          }
        }}
        onApproveAndAssign={(id, spec) => {
          if (activeSubTab === 'providers') {
            updateProviderStatus(id, 'APPROVED');
            updateProviderSpecialist(id, spec);
          } else {
            updateFacilityStatus(id, 'APPROVED');
            updateFacilitySpecialist(id, spec);
          }
        }}
      />

      <StatusHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        title={historyTitle || ''}
      />
    </div>
  );
};

export default Credentialing;

