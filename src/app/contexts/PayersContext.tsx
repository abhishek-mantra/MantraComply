import { createContext, useContext, useState, ReactNode } from "react";

export interface Payer {
  id: string;
  name: string;
  type: "Commercial" | "Government" | "Managed Care";
  states: string;
  contractType: string;
  enrollmentType: string;
  status: "Inactive" | "Enrolled" | "In-Progress";
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  npi: string;
  activeEnrollments: number;
  currentPayers: string[];
}

export interface EnrollmentRequest {
  id: string;
  providerId: string;
  providerName: string;
  specialty: string;
  payerId: string;
  payerName: string;
  state: string;
  type: string;
  submittedDate: string;
  status: "Pending" | "Submitted to Payer" | "In Review" | "More Info Needed" | "Approved" | "Denied";
  priority: "Normal" | "Urgent";
  lastUpdated: string;
  timeline: any[];
  comments: any[];
  documents: any[];
}

export interface ExistingEnrollment {
  id: string;
  providerId: string;
  providerName: string;
  payerId: string;
  payerName: string;
  networkType: "PPO" | "HMO" | "Medicaid" | "Medicare";
  practiceLocation: string;
  effectiveDate: string;
  status: "Active" | "Terminated" | "Pending Effective Date";
  tpv: boolean;
}

interface PayersContextType {
  payers: Payer[];
  providers: Provider[];
  enrollmentRequests: EnrollmentRequest[];
  existingEnrollments: ExistingEnrollment[];
  addEnrollmentRequests: (requests: Omit<EnrollmentRequest, "id">[]) => void;
  updateEnrollmentStatus: (id: string, status: EnrollmentRequest["status"]) => void;
  terminateEnrollment: (id: string) => void;
}

const PayersContext = createContext<PayersContextType | undefined>(undefined);

export function PayersProvider({ children }: { children: ReactNode }) {
  const [payers] = useState<Payer[]>([
    { id: "1", name: "Aetna", type: "Commercial", states: "Multi-state", contractType: "Participating", enrollmentType: "Electronic", status: "Enrolled" },
    { id: "2", name: "Anthem (Health Net of CA)", type: "Commercial", states: "CA", contractType: "Participating", enrollmentType: "Paper", status: "Enrolled" },
    { id: "3", name: "Cigna", type: "Commercial", states: "Multi-state", contractType: "Non-Par", enrollmentType: "Electronic", status: "Enrolled" },
    { id: "4", name: "Medicare", type: "Government", states: "All States", contractType: "Participating", enrollmentType: "Electronic", status: "Enrolled" },
    { id: "5", name: "Medicaid - FL", type: "Government", states: "FL", contractType: "Participating", enrollmentType: "Paper", status: "In-Progress" },
    { id: "6", name: "Medicaid - WY", type: "Government", states: "WY", contractType: "Participating", enrollmentType: "Paper", status: "Enrolled" },
    { id: "7", name: "Optum", type: "Managed Care", states: "AZ, TX, FL", contractType: "Participating", enrollmentType: "Electronic", status: "Enrolled" },
    { id: "8", name: "Humana", type: "Commercial", states: "Multi-state", contractType: "Participating", enrollmentType: "Electronic", status: "In-Progress" },
    { id: "9", name: "UnitedHealthcare", type: "Commercial", states: "Multi-state", contractType: "Participating", enrollmentType: "Electronic", status: "Enrolled" },
    { id: "10", name: "Magellan", type: "Managed Care", states: "Multi-state", contractType: "Non-Par", enrollmentType: "Paper", status: "Inactive" },
  ]);

  const [providers] = useState<Provider[]>([
    { id: "1", name: "Rachit", specialty: "Therapist", npi: "1234567890", activeEnrollments: 4, currentPayers: ["Medicare", "Aetna", "Cigna", "Humana"] },
    { id: "2", name: "Aman", specialty: "Therapist", npi: "2345678901", activeEnrollments: 3, currentPayers: ["Medicare", "Medicaid - WY"] },
    { id: "3", name: "Aditya", specialty: "Therapist", npi: "3456789012", activeEnrollments: 2, currentPayers: ["Cigna"] },
    { id: "4", name: "Karan", specialty: "Therapist", npi: "4567890123", activeEnrollments: 5, currentPayers: ["Humana", "Aetna", "UnitedHealthcare"] },
    { id: "5", name: "Mahima", specialty: "Doctor", npi: "5678901234", activeEnrollments: 3, currentPayers: ["Optum", "Medicare"] },
    { id: "6", name: "Aheesha", specialty: "Therapist", npi: "6789012345", activeEnrollments: 4, currentPayers: ["UnitedHealthcare", "Cigna", "Aetna"] },
  ]);

  const [enrollmentRequests, setEnrollmentRequests] = useState<EnrollmentRequest[]>([
    {
      id: "REQ-001",
      providerId: "1",
      providerName: "Rachit",
      specialty: "Therapist",
      payerId: "1",
      payerName: "Aetna",
      state: "FL",
      type: "Commercial",
      submittedDate: "03/20/2026",
      status: "Pending",
      priority: "Normal",
      lastUpdated: "Today",
      timeline: [],
      comments: [],
      documents: [],
    },
    {
      id: "REQ-002",
      providerId: "2",
      providerName: "Aman",
      specialty: "Therapist",
      payerId: "4",
      payerName: "Medicare",
      state: "WY",
      type: "Government",
      submittedDate: "03/19/2026",
      status: "Submitted to Payer",
      priority: "Normal",
      lastUpdated: "Yesterday",
      timeline: [],
      comments: [],
      documents: [],
    },
    {
      id: "REQ-003",
      providerId: "3",
      providerName: "Aditya",
      specialty: "Therapist",
      payerId: "3",
      payerName: "Cigna",
      state: "AZ",
      type: "Commercial",
      submittedDate: "03/18/2026",
      status: "In Review",
      priority: "Urgent",
      lastUpdated: "2 days ago",
      timeline: [],
      comments: [],
      documents: [],
    },
    {
      id: "REQ-004",
      providerId: "4",
      providerName: "Karan",
      specialty: "Therapist",
      payerId: "8",
      payerName: "Humana",
      state: "FL",
      type: "Commercial",
      submittedDate: "03/15/2026",
      status: "Approved",
      priority: "Normal",
      lastUpdated: "1 week ago",
      timeline: [],
      comments: [],
      documents: [],
    },
    {
      id: "REQ-005",
      providerId: "5",
      providerName: "Mahima",
      specialty: "Doctor",
      payerId: "7",
      payerName: "Optum",
      state: "AZ",
      type: "Managed Care",
      submittedDate: "03/10/2026",
      status: "Denied",
      priority: "Normal",
      lastUpdated: "2 weeks ago",
      timeline: [],
      comments: [],
      documents: [],
    },
    {
      id: "REQ-006",
      providerId: "6",
      providerName: "Aheesha",
      specialty: "Therapist",
      payerId: "9",
      payerName: "UnitedHealthcare",
      state: "CA",
      type: "Commercial",
      submittedDate: "03/08/2026",
      status: "More Info Needed",
      priority: "Urgent",
      lastUpdated: "2 weeks ago",
      timeline: [],
      comments: [],
      documents: [],
    },
  ]);

  const [existingEnrollments, setExistingEnrollments] = useState<ExistingEnrollment[]>([
    {
      id: "1",
      providerId: "1",
      providerName: "Rachit",
      payerId: "4",
      payerName: "Medicare",
      networkType: "Medicare",
      practiceLocation: "Downtown Medical",
      effectiveDate: "01/15/2025",
      status: "Active",
      tpv: true,
    },
    {
      id: "2",
      providerId: "2",
      providerName: "Aman",
      payerId: "6",
      payerName: "Medicaid - WY",
      networkType: "Medicaid",
      practiceLocation: "Westside Clinic",
      effectiveDate: "02/01/2025",
      status: "Active",
      tpv: false,
    },
    {
      id: "3",
      providerId: "3",
      providerName: "Aditya",
      payerId: "3",
      payerName: "Cigna",
      networkType: "PPO",
      practiceLocation: "City Health Center",
      effectiveDate: "03/01/2025",
      status: "Active",
      tpv: true,
    },
  ]);

  const addEnrollmentRequests = (requests: Omit<EnrollmentRequest, "id">[]) => {
    const newRequests = requests.map((req, index) => ({
      ...req,
      id: `REQ-${String(enrollmentRequests.length + index + 1).padStart(3, "0")}`,
    }));
    setEnrollmentRequests((prev) => [...newRequests, ...prev]);
  };

  const updateEnrollmentStatus = (id: string, status: EnrollmentRequest["status"]) => {
    setEnrollmentRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status, lastUpdated: "Just now" }
          : req
      )
    );

    // If approved, add to existing enrollments
    if (status === "Approved") {
      const request = enrollmentRequests.find((r) => r.id === id);
      if (request) {
        const payer = payers.find((p) => p.id === request.payerId);
        let networkType: "PPO" | "HMO" | "Medicaid" | "Medicare" = "PPO";
        if (payer?.name.includes("Medicaid")) networkType = "Medicaid";
        else if (payer?.name === "Medicare") networkType = "Medicare";

        setExistingEnrollments((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            providerId: request.providerId,
            providerName: request.providerName,
            payerId: request.payerId,
            payerName: request.payerName,
            networkType,
            practiceLocation: "Main Office",
            effectiveDate: new Date().toLocaleDateString("en-US"),
            status: "Active",
            tpv: false,
          },
        ]);
      }
    }
  };

  const terminateEnrollment = (id: string) => {
    setExistingEnrollments((prev) =>
      prev.map((enrollment) =>
        enrollment.id === id
          ? { ...enrollment, status: "Terminated" as const }
          : enrollment
      )
    );
  };

  return (
    <PayersContext.Provider
      value={{
        payers,
        providers,
        enrollmentRequests,
        existingEnrollments,
        addEnrollmentRequests,
        updateEnrollmentStatus,
        terminateEnrollment,
      }}
    >
      {children}
    </PayersContext.Provider>
  );
}

export function usePayers() {
  const context = useContext(PayersContext);
  if (!context) {
    throw new Error("usePayers must be used within a PayersProvider");
  }
  return context;
}
