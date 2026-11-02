import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  FileText, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import { 
  initialAdminDocuments, 
  availableSpecialists, 
  getStoredDocuments,
  saveStoredDocuments,
  DocumentRecord 
} from '../../data/adminMockData';
import { StatusBadge, StatusType } from '../../components/shared/StatusBadge';
import { DocumentPreviewModal } from '../../components/shared/DocumentPreviewModal';

export const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentRecord[]>(() => getStoredDocuments());
  const [searchTerm, setSearchTerm] = useState('');
  const [specialistFilter, setSpecialistFilter] = useState('ALL');
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Synchronize state with persistent storage on tab switch or updates
  useEffect(() => {
    const handleSync = () => {
      setDocuments(getStoredDocuments());
    };
    window.addEventListener('mantra_documents_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('mantra_documents_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleStatusChange = (id: string, newStatus: StatusType) => {
    setDocuments(prev => {
      const updated = prev.map(d => d.id === id ? { ...d, status: newStatus as any } : d);
      saveStoredDocuments(updated);
      return updated;
    });
    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc(prev => prev ? { ...prev, status: newStatus as any } : null);
    }
  };

  const handleOpsResponsibleChange = (id: string, specialist: string) => {
    setDocuments(prev => {
      const updated = prev.map(d => d.id === id ? { ...d, opsResponsible: specialist } : d);
      saveStoredDocuments(updated);
      return updated;
    });
    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc(prev => prev ? { ...prev, opsResponsible: specialist } : null);
    }
  };

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const docSpecialist = doc.opsResponsible || 'Sarah Jenkins';

      if (specialistFilter !== 'ALL' && docSpecialist !== specialistFilter) {
        return false;
      }

      const matchSearch = searchTerm === '' ||
        doc.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docSpecialist.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [documents, searchTerm, specialistFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredDocs.length / itemsPerPage));
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#002B49]">
          Document Verification
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review and verify uploaded provider documents, licenses, and certificates.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 flex-wrap sm:flex-nowrap">
          <Search size={18} className="text-slate-400 shrink-0" />
          
          <button className="px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/50 text-xs font-semibold text-blue-600 shrink-0 cursor-pointer flex items-center gap-1.5">
            All documents
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
            <ChevronDown size={12} className="text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search documents, users or responsible..."
            className="w-full text-sm text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent"
          />
        </div>

        <div className="text-xs font-semibold text-slate-500 whitespace-nowrap pl-4 border-l border-slate-100 hidden md:block">
          {filteredDocs.length} documents
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#002B49] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5 border-r border-[#1a4a6e]">User</th>
                <th className="py-4 px-4 border-r border-[#1a4a6e]">Uploaded</th>
                <th className="py-4 px-5 border-r border-[#1a4a6e]">Document</th>
                <th className="py-4 px-4 border-r border-[#1a4a6e]">Expiry Date</th>
                <th className="py-4 px-4 border-r border-[#1a4a6e]">Document Type</th>
                <th className="py-4 px-4 border-r border-[#1a4a6e]">Responsible</th>
                <th className="py-4 px-4 text-center border-r border-[#1a4a6e]">Status</th>
                <th className="py-4 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-slate-400 text-sm border-b border-slate-100">
                    No documents found matching your search.
                  </td>
                </tr>
              ) : (
                paginatedDocs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-semibold text-slate-900 border-r border-slate-100">
                      {item.userName}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap border-r border-slate-100">
                      {item.uploadDate}
                    </td>
                    <td className="py-4 px-5 border-r border-slate-100">
                      <button
                        onClick={() => {
                          setSelectedDoc(item);
                          setIsPreviewOpen(true);
                        }}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-xs text-left cursor-pointer transition-colors group"
                      >
                        <FileText size={15} className="text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="hover:underline">{item.documentName}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600 border-r border-slate-100">
                      {item.expiryDate}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-700 tracking-tight border-r border-slate-100">
                      {item.documentType}
                    </td>
                    {/* Responsible (Static Pill for MantraComply, Interactive Dropdown for Manual) */}
                    <td className="py-4 px-4 whitespace-nowrap border-r border-slate-100">
                      {item.opsResponsible === 'MantraComply' || item.opsResponsible === 'Mantra AI' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 shadow-2xs select-none">
                          MantraComply
                        </span>
                      ) : (
                        <div className="relative inline-block text-left">
                          <select
                            value={item.opsResponsible || availableSpecialists[0]}
                            onChange={(e) => handleOpsResponsibleChange(item.id, e.target.value)}
                            className="text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-800 hover:border-slate-300 shadow-2xs transition-all cursor-pointer appearance-none pr-7"
                          >
                            {availableSpecialists.map((specialist) => (
                              <option key={specialist} value={specialist}>
                                {specialist}
                              </option>
                            ))}
                            {!availableSpecialists.includes(item.opsResponsible || '') && item.opsResponsible && (
                              <option value={item.opsResponsible}>{item.opsResponsible}</option>
                            )}
                          </select>
                          <ChevronDown 
                            size={12} 
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" 
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap border-r border-slate-100">
                      <StatusBadge
                        status={item.status}
                        interactive={true}
                        options={['PENDING', 'VERIFIED', 'UNVERIFIED', 'RESUBMITTED']}
                        onChange={(s) => handleStatusChange(item.id, s)}
                      />
                    </td>
                    <td className="py-4 px-5 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedDoc(item);
                          setIsPreviewOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Eye size={13} className="text-blue-600" />
                        <span>Preview</span>
                      </button>
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
              {filteredDocs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>
            <span>to</span>
            <span className="font-bold text-slate-900">
              {Math.min(currentPage * itemsPerPage, filteredDocs.length)}
            </span>
            <span>of</span>
            <span className="font-bold text-slate-900">{filteredDocs.length}</span>
            <span>documents</span>
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

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        document={selectedDoc}
        onUpdateStatus={handleStatusChange}
      />
    </div>
  );
};

export default Documents;

