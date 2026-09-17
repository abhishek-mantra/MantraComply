import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Referral {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialty: string;
  dateInvited: string;
  status: "Pending Invite" | "Signed Up" | "Credentialing Started";
  joinedDate?: string;
}

export interface ReferralInviteInput {
  name: string;
  email: string;
  phone?: string;
  specialty?: string;
}

interface ReferralContextType {
  referrals: Referral[];
  referralCode: string;
  referralLink: string;
  targetCount: number;
  completedCount: number;
  remainingCount: number;
  isPriorityBoosted: boolean;
  addReferral: (name: string, email: string, phone?: string, specialty?: string) => boolean;
  addMultipleReferrals: (invites: ReferralInviteInput[]) => { added: number; skipped: number };
  simulateStatusChange: (id: string, newStatus: Referral["status"]) => void;
  resendInvite: (id: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = "mantracomply_referrals_state_v3";

const INITIAL_REFERRALS: Referral[] = [
  {
    id: "ref-1",
    name: "Dr. Marcus Vance",
    email: "m.vance@chicagohealth.org",
    phone: "+1 (312) 555-0143",
    specialty: "Psychiatry",
    dateInvited: "2026-09-08",
    status: "Signed Up",
    joinedDate: "2026-09-09",
  },
  {
    id: "ref-2",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@mindwell.com",
    phone: "+1 (415) 555-0188",
    specialty: "Clinical Psychology",
    dateInvited: "2026-09-10",
    status: "Credentialing Started",
    joinedDate: "2026-09-11",
  },
  {
    id: "ref-3",
    name: "Dr. Priya Sharma",
    email: "psharma@baybehavioral.com",
    phone: "+1 (212) 555-0192",
    specialty: "LCSW / Psychotherapy",
    dateInvited: "2026-09-12",
    status: "Signed Up",
    joinedDate: "2026-09-13",
  },
  {
    id: "ref-4",
    name: "Dr. David Miller",
    email: "d.miller@metrohealth.org",
    phone: "+1 (617) 555-0129",
    specialty: "Primary Care / Family Medicine",
    dateInvited: "2026-09-13",
    status: "Pending Invite",
  },
];

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export function ReferralProvider({ children }: { children: ReactNode }) {
  const referralCode = "MANTRA-JW7492";
  const referralLink = `https://mantracomply.com/join?ref=${referralCode}`;
  const targetCount = 5;

  const [referrals, setReferrals] = useState<Referral[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved referrals", e);
        }
      }
    }
    return INITIAL_REFERRALS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(referrals));
  }, [referrals]);

  // Count signed up or credentialing started
  const completedCount = referrals.filter(
    (r) => r.status === "Signed Up" || r.status === "Credentialing Started"
  ).length;

  const remainingCount = Math.max(0, targetCount - completedCount);
  const isPriorityBoosted = completedCount >= targetCount;

  const addMultipleReferrals = (
    invites: ReferralInviteInput[]
  ): { added: number; skipped: number } => {
    const today = new Date().toISOString().split("T")[0];
    let addedCount = 0;
    let skippedCount = 0;

    setReferrals((prev) => {
      const existingEmails = new Set(prev.map((r) => r.email.toLowerCase()));
      const batchEmails = new Set<string>();
      const newItems: Referral[] = [];

      for (const inv of invites) {
        const trimmedEmail = inv.email.trim().toLowerCase();
        if (!trimmedEmail || !trimmedEmail.includes("@")) {
          skippedCount++;
          continue;
        }

        if (existingEmails.has(trimmedEmail) || batchEmails.has(trimmedEmail)) {
          skippedCount++;
          continue;
        }

        batchEmails.add(trimmedEmail);
        addedCount++;
        newItems.push({
          id: `ref-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: inv.name.trim() || trimmedEmail.split("@")[0],
          email: trimmedEmail,
          phone: inv.phone?.trim() || undefined,
          specialty: inv.specialty?.trim() || "Healthcare Provider",
          dateInvited: today,
          status: "Pending Invite",
        });
      }

      return [...newItems, ...prev];
    });

    return { added: addedCount, skipped: skippedCount };
  };

  const addReferral = (name: string, email: string, phone?: string, specialty?: string) => {
    const res = addMultipleReferrals([{ name, email, phone, specialty }]);
    return res.added > 0;
  };

  const simulateStatusChange = (id: string, newStatus: Referral["status"]) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status: newStatus,
            joinedDate: newStatus !== "Pending Invite" ? new Date().toISOString().split("T")[0] : undefined,
          };
        }
        return r;
      })
    );
  };

  const resendInvite = (id: string) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            dateInvited: new Date().toISOString().split("T")[0],
          };
        }
        return r;
      })
    );
  };

  const resetToDefaults = () => {
    setReferrals(INITIAL_REFERRALS);
  };

  return (
    <ReferralContext.Provider
      value={{
        referrals,
        referralCode,
        referralLink,
        targetCount,
        completedCount,
        remainingCount,
        isPriorityBoosted,
        addReferral,
        addMultipleReferrals,
        simulateStatusChange,
        resendInvite,
        resetToDefaults,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
}

export function useReferrals() {
  const context = useContext(ReferralContext);
  if (!context) {
    throw new Error("useReferrals must be used within a ReferralProvider");
  }
  return context;
}
