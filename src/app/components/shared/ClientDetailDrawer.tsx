import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  FileCheck,
  MessageSquare, 
  User, 
  Search 
} from 'lucide-react';
import { EnrollmentRecord, availableSpecialists, ClientActivity, ClientDocument } from '../../data/adminMockData';
import { PipelineStageBar } from './PipelineStageBar';

interface ClientDetailDrawerProps {
  client: EnrollmentRecord;
  onClose: () => void;
  onUpdate: (updatedClient: EnrollmentRecord) => void;
  onOpenNewEnrollment?: () => void;
}

export const ClientDetailDrawer: React.FC<ClientDetailDrawerProps> = ({
  client,
  onClose,
  onUpdate,
  onOpenNewEnrollment
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'enrollments' | 'documents'>('general');

  // Form states
  const [name, setName] = useState(client.providerName);
  const [email, setEmail] = useState(client.email || `${client.providerName.toLowerCase().replace(/\s+/g, '.')}@mantra.care`);
  const [phone, setPhone] = useState(client.phone || '+1 6402869150');
  const [organization, setOrganization] = useState(client.organization || 'MantraCare');
  const [stateName, setStateName] = useState(client.state || 'New York (NY)');
  const [referenceNumber, setReferenceNumber] = useState(client.referenceNumber || 'REF-AET-99214');

  // Payer Details
  const [payer, setPayer] = useState(client.payer || client.insurance || 'Aetna');
  const [planType, setPlanType] = useState(client.type || 'Commercial');

  // Dates
  const [submissionDate, setSubmissionDate] = useState(client.dateOfSubmission || client.date || '10/22/2026');
  const [revalidationDate, setRevalidationDate] = useState(client.recredentialingDate || '09/28/2028');
  const [effectiveDate, setEffectiveDate] = useState(client.effectiveDate || '09/29/2026');
  const [followUpDate, setFollowUpDate] = useState(client.followUpDate || '11/14/2026');

  // Collapsible sections
  const [payerDetailsOpen, setPayerDetailsOpen] = useState(true);
  const [datesOpen, setDatesOpen] = useState(true);

  // Status & Responsible
  const [currentStatus, setCurrentStatus] = useState<string>(client.status);
  const [responsibleUser, setResponsibleUser] = useState(client.responsibleUser || client.assignedSpecialist || availableSpecialists[0]);

  // Activity & Notes
  const [noteText, setNoteText] = useState('');
  const [activities, setActivities] = useState<ClientActivity[]>(client.activities || [
    {
      id: 'act-1',
      type: 'STAGE_UPDATED',
      title: 'Stage Updated',
      subtitle: `${client.status} via Payer Credentialing & Enrollment Pipeline`,
      badgeText: client.status,
      timestamp: 'Oct 31, 2026, 2:58 PM'
    },
    {
      id: 'act-2',
      type: 'VERIFICATION_COMPLETED',
      title: 'Primary Source Verification (PSV) Completed',
      subtitle: 'State Medical License & Board Certification verified with active standing.',
      badgeText: 'VERIFIED',
      timestamp: 'Oct 31, 2026, 11:30 AM'
    },
    {
      id: 'act-3',
      type: 'NOTE_ADDED',
      title: 'Credentialing Compliance Note Added',
      subtitle: `Note by ${client.responsibleUser || client.assignedSpecialist || 'Sarah Jenkins'}: ${client.notes || 'Enrollment dossier verified and submitted.'}`,
      timestamp: 'Oct 28, 2026, 2:10 PM'
    }
  ]);

  const [documents, setDocuments] = useState<ClientDocument[]>(client.documents || [
    { 
      id: 'doc-1', 
      name: 'Signed_W9_Tax_Form.pdf', 
      documentNumber: 'DOC-892147',
      uploadedBy: 'Sarah Jenkins',
      uploadDate: 'Oct 28, 2026', 
      size: '1.4 MB', 
      type: 'DOCUMENT/PDF', 
      status: 'VERIFIED' 
    },
    { 
      id: 'doc-2', 
      name: 'State_Medical_License.pdf', 
      documentNumber: 'DOC-892148',
      uploadedBy: 'David Miller',
      uploadDate: 'Oct 28, 2026', 
      size: '2.8 MB', 
      type: 'LICENSE/PDF', 
      status: 'VERIFIED' 
    }
  ]);

  const handleSave = () => {
    onUpdate({
      ...client,
      providerName: name,
      email,
      phone,
      organization,
      state: stateName,
      referenceNumber,
      payer,
      type: planType,
      dateOfSubmission: submissionDate,
      effectiveDate,
      recredentialingDate: revalidationDate,
      followUpDate,
      status: currentStatus,
      responsibleUser,
      assignedSpecialist: responsibleUser,
      activities,
      documents
    });
    onClose();
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newActivity: ClientActivity = {
      id: `act-${Date.now()}`,
      type: 'NOTE_ADDED',
      title: 'Compliance Note Added',
      subtitle: `Note by ${responsibleUser}: ${noteText.trim()}`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setActivities([newActivity, ...activities]);
    setNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Top Header Bar */}
        <div className="bg-[#002B49] text-white p-4 flex items-center justify-between border-b border-[#1a4a6e]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-white font-bold text-sm">
              {name.charAt(0) || 'P'}
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">{name}</h2>
              <div className="flex items-center gap-2 text-xs text-blue-200 mt-0.5">
                <span>ID: #{client.id}</span>
                <span>•</span>
                <span>{organization}</span>
                <span>•</span>
                <span>{payer}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 pt-3 flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('general')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'general'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            General & Process Details
          </button>
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'enrollments'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Milestone Pipeline
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'documents'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Documents ({documents.length})
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Form Info */}
              <div className="space-y-4">
                {/* Pipeline Status Summary Card */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Current Milestone Stage
                  </div>
                  <PipelineStageBar
                    status={currentStatus}
                    onChange={(st) => setCurrentStatus(st)}
                  />
                  
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Ops Responsible:</span>
                    <select
                      value={responsibleUser}
                      onChange={(e) => setResponsibleUser(e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {availableSpecialists.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Collapsible: Payer Details */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setPayerDetailsOpen(!payerDetailsOpen)}
                    className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-800 cursor-pointer transition-colors"
                  >
                    <span>Payer & Network Details</span>
                    {payerDetailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {payerDetailsOpen && (
                    <div className="p-4 space-y-3 bg-white text-xs">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Payer</label>
                        <input
                          type="text"
                          value={payer}
                          onChange={(e) => setPayer(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-500 block mb-1">State</label>
                          <input
                            type="text"
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-500 block mb-1">Plan Type</label>
                          <input
                            type="text"
                            value={planType}
                            onChange={(e) => setPlanType(e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Reference Number</label>
                        <input
                          type="text"
                          value={referenceNumber}
                          onChange={(e) => setReferenceNumber(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Collapsible: Dates */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setDatesOpen(!datesOpen)}
                    className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-800 cursor-pointer transition-colors"
                  >
                    <span>Key Milestone Dates</span>
                    {datesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {datesOpen && (
                    <div className="p-4 grid grid-cols-2 gap-3 bg-white text-xs">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Date of Submission</label>
                        <input
                          type="text"
                          value={submissionDate}
                          onChange={(e) => setSubmissionDate(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Follow-Up Date</label>
                        <input
                          type="text"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Effective Date</label>
                        <input
                          type="text"
                          value={effectiveDate}
                          onChange={(e) => setEffectiveDate(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-500 block mb-1">Recredentialing Date</label>
                        <input
                          type="text"
                          value={revalidationDate}
                          onChange={(e) => setRevalidationDate(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Activity Timeline & Notes */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <MessageSquare size={14} className="text-blue-600" />
                    <span>Add Ops / Compliance Note</span>
                  </div>
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Type note or update regarding payer status..."
                      rows={3}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send size={12} /> Post Note
                      </button>
                    </div>
                  </form>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-slate-500" />
                    <span>Activity History</span>
                  </div>
                  <div className="space-y-3">
                    {activities.map((act) => (
                      <div key={act.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                        <div className="flex items-center justify-between font-semibold text-slate-800">
                          <span>{act.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{act.timestamp}</span>
                        </div>
                        {act.subtitle && (
                          <p className="text-slate-600 text-[11px] mt-1">{act.subtitle}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'enrollments' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2">12-Stage Enrollment Progression</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Advance through the contracting milestones by clicking any segment below.
                </p>
                <PipelineStageBar
                  status={currentStatus}
                  onChange={(st) => setCurrentStatus(st)}
                />
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Attached Provider Documents</h3>
                <button
                  type="button"
                  onClick={() => alert('Document upload modal')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={13} /> Upload Document
                </button>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{doc.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {doc.type} • {doc.size} • Uploaded {doc.uploadDate} by {doc.uploadedBy || 'Ops'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

