// Proposed Rates seed data for GIC Common Empanelment (loaded from GIC_rates_tables.xlsx / spec)

export interface PackageProcedure {
  id: string;
  specialty: string;
  name: string;
  inclusions: string;
  exclusions: string;
  defaultSingleAcRate: number;
}

export interface SurgeryGradeParticular {
  particular: string;
  defaultRate: number;
}

export interface SurgeryGrade {
  grade: number;
  label: string;
  particulars: SurgeryGradeParticular[];
}

export interface RateItem {
  id: string;
  name: string;
  defaultRate: number;
}

// 113 Package Procedures grouped across 8 specialties
export const GIC_PACKAGE_PROCEDURES: PackageProcedure[] = [
  // E.N.T (10)
  { id: "ent-1", specialty: "E.N.T", name: "TONSILLECTOMY (exclude Coblation)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ent-2", specialty: "E.N.T", name: "ADENOIDECTOMY (exclude Coblation)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ent-3", specialty: "E.N.T", name: "TONSILLECTOMY & ADENOIDECTOMY (exclude Coblation)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ent-4", specialty: "E.N.T", name: "FESS-Unilateral", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "ent-5", specialty: "E.N.T", name: "MASTOIDECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "ent-6", specialty: "E.N.T", name: "TYMPANOPLASTY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "ent-7", specialty: "E.N.T", name: "SEPTOPLASTY+FESS", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "ent-8", specialty: "E.N.T", name: "MASTOIDECTOMY+TYMPANOPLASTY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "ent-9", specialty: "E.N.T", name: "FESS +TURBINECTOMY / NASAL POLYPECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "ent-10", specialty: "E.N.T", name: "MYRINGOTOMY + GROMMETS", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },

  // VASCULAR SURGERY (3)
  { id: "vasc-1", specialty: "VASCULAR SURGERY", name: "VARICOSE VEINS (ex- Laser,RFA,Foam,Glue)-Unilateral", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "vasc-2", specialty: "VASCULAR SURGERY", name: "VARICOSE VEINS (Stripping)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "vasc-3", specialty: "VASCULAR SURGERY", name: "A V FISTULA", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },

  // GENERAL SURGERY (30)
  { id: "gen-1", specialty: "GENERAL SURGERY", name: "APPENDICECTOMY - OPEN", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-2", specialty: "GENERAL SURGERY", name: "APPENDICECTOMY - LAPAROSCOPIC", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-3", specialty: "GENERAL SURGERY", name: "CHOLECYSTECOMY - OPEN", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-4", specialty: "GENERAL SURGERY", name: "CHOLECYSTECOMY - LAPAROSCOPIC", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-5", specialty: "GENERAL SURGERY", name: "CIRCUMCISION WITH OR WITHOUT MEATOTOMY MEATOPLASTY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-6", specialty: "GENERAL SURGERY", name: "FISTULECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-7", specialty: "GENERAL SURGERY", name: "FISSURECTOMY/SPHINCTEROTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-8", specialty: "GENERAL SURGERY", name: "HAEMORRHOIDECTOMY(OPEN) /Laser Haemoroidopexy", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-9", specialty: "GENERAL SURGERY", name: "INGUINAL HERNIORRAPHY - UNILATERAL", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-10", specialty: "GENERAL SURGERY", name: "INGUINAL HERNIOPLASTY - UNILATERAL - ex mesh", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-11", specialty: "GENERAL SURGERY", name: "LAP INGUINAL HERNIOPLASTY - UNILATERAL - - (Ex Mesh & disposable trocar )", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-12", specialty: "GENERAL SURGERY", name: "INGUINAL HERNIORRAPHY - BILATERAL", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-13", specialty: "GENERAL SURGERY", name: "INGUINAL HERNIOPLASTY - BILATERAL - - ex mesh", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-14", specialty: "GENERAL SURGERY", name: "LAP INGUINAL HERNIOPLASTY - BILATERAL - - (Ex Mesh & disposable trocar )", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-15", specialty: "GENERAL SURGERY", name: "UMBLICAL HERNIORRAPHY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-16", specialty: "GENERAL SURGERY", name: "UMBLICAL HERNIORRAPLASTY- ex mesh", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-17", specialty: "GENERAL SURGERY", name: "LAP UMBLICAL HERNIORRAPLASTY - - (Ex Mesh & disposable trocar )", inclusions: "L1,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-18", specialty: "GENERAL SURGERY", name: "INCISIONAL/Ventral HERNIORRAPHY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-19", specialty: "GENERAL SURGERY", name: "INCISIONAL / Ventral HERNIOPLASTY - - ex mesh", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-20", specialty: "GENERAL SURGERY", name: "LAP INCISIONAL / Ventral HERNIOPLASTY- - (Ex Mesh & disposable trocar )", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "gen-21", specialty: "GENERAL SURGERY", name: "PERIANAL ABCESS", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-22", specialty: "GENERAL SURGERY", name: "PILONIDAL SINUS-PRIMARY CLOSURE", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-23", specialty: "GENERAL SURGERY", name: "BREAST LUMPECTOMY BENIGN under GA", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-24", specialty: "GENERAL SURGERY", name: "SIMPLE MASTECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-25", specialty: "GENERAL SURGERY", name: "MODIFIED RADICAL MASTECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-26", specialty: "GENERAL SURGERY", name: "BCS WITH NODE DISSECTION", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-27", specialty: "GENERAL SURGERY", name: "HEMI THYROIDECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-28", specialty: "GENERAL SURGERY", name: "THYROIDECTOMY - TOTAL/Sub Total", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-29", specialty: "GENERAL SURGERY", name: "Endoscopy + Oesophageal Variceal Banding", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "gen-30", specialty: "GENERAL SURGERY", name: "ERCP WITH SPHINCTEROTOMY WITH STONE EXTRACTION", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },

  // OBSTETRICS & GYNECOLOGY (13)
  { id: "obg-1", specialty: "OBSTETRICS & GYNECOLOGY", name: "ABD HYSTERECTOMY WITH OR WITHOUT BSO", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-2", specialty: "OBSTETRICS & GYNECOLOGY", name: "VAGINAL HYSTERECTOMY WITH OR WITHOUT BSO", inclusions: "-", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-3", specialty: "OBSTETRICS & GYNECOLOGY", name: "BSOH+PELVIC FLOOR REPAIR", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-4", specialty: "OBSTETRICS & GYNECOLOGY", name: "LAPAROSCOPIC HYSTERECTOMY (TLH) +/- BSO", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-5", specialty: "OBSTETRICS & GYNECOLOGY", name: "LAVH", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-6", specialty: "OBSTETRICS & GYNECOLOGY", name: "RADICAL HYSTERECTOMY- LAPROSCOPIC", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-7", specialty: "OBSTETRICS & GYNECOLOGY", name: "MYOMECTOMY OPEN", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-8", specialty: "OBSTETRICS & GYNECOLOGY", name: "MYOMECTOMY LAP(INCLUDING TISSUE MORCELLATION)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-9", specialty: "OBSTETRICS & GYNECOLOGY", name: "OVARIAN CYSTECTOMY OPEN", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-10", specialty: "OBSTETRICS & GYNECOLOGY", name: "OVARIAN CYSTECTOMY LAP.", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-11", specialty: "OBSTETRICS & GYNECOLOGY", name: "HYSTEROSCOPY/ D & C/FRACTIONAL CURRETAGE", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-12", specialty: "OBSTETRICS & GYNECOLOGY", name: "NORMAL DELIVERY (WITH WELL BABY CARE)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "obg-13", specialty: "OBSTETRICS & GYNECOLOGY", name: "LSCS (WITH WELL BABY CARE)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },

  // ORTHOPAEDICS (19)
  { id: "ortho-1", specialty: "ORTHOPAEDICS", name: "ARTHROSCOPIC SURGERY OTHER THAN ACL / MENISECTOMY", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-2", specialty: "ORTHOPAEDICS", name: "ACL / PCL RECONSTRUCTION & MENISECTOMY", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-3", specialty: "ORTHOPAEDICS", name: "LAMINECTOMY / DISCECTOMY FOR SINGLE LEVEL WITH OR WITHOUT FORAMINOTOMY", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-4", specialty: "ORTHOPAEDICS", name: "MICRODISCECTOMY", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-5", specialty: "ORTHOPAEDICS", name: "LAMINECTOMY /DISSECTOMY WITH SPINAL STABILIZATION (EXCLUDE IMPLANT)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-6", specialty: "ORTHOPAEDICS", name: "TOTAL KNEE REPLACEMENT(unilateral) WITH NAVIGATION (EXCLUDE IMPLANT)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-7", specialty: "ORTHOPAEDICS", name: "TOTAL KNEE REPLACEMENT(bilateral) WITH NAVIGATION (EXCLUDE IMPLANT)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-8", specialty: "ORTHOPAEDICS", name: "TOTAL HIP REPLACEMENT (unilateral) WITH NAVIGATION (EXCLUDE IMPLANT)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-9", specialty: "ORTHOPAEDICS", name: "# NECK FEMUR (DHS /PFN/ NAILING & PLATING/ CANCELLOUS SCREW)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-10", specialty: "ORTHOPAEDICS", name: "BIPOLAR ARTHROPLASTY", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-11", specialty: "ORTHOPAEDICS", name: "ORIF# SHAFT OF FEMUR", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-12", specialty: "ORTHOPAEDICS", name: "ORIF # LONG BONE (Except femur)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-13", specialty: "ORTHOPAEDICS", name: "ORIF for # WRIST, ELBOW, ANKLE, KNEE", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-14", specialty: "ORTHOPAEDICS", name: "CLOSED REDUCTION", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-15", specialty: "ORTHOPAEDICS", name: "K WIRE FIXATION OF SHORT BONES", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-16", specialty: "ORTHOPAEDICS", name: "K WIRE FIXATION OF LONG BONES", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-17", specialty: "ORTHOPAEDICS", name: "IMPLANT REMOVAL LONG BONES", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-18", specialty: "ORTHOPAEDICS", name: "IMPLANT REMOVAL SHORT BONES", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "ortho-19", specialty: "ORTHOPAEDICS", name: "CARPEL TUNNEL RELEASE", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },

  // UROLOGY & NEPHROLOGY (11)
  { id: "uro-1", specialty: "UROLOGY & NEPHROLOGY", name: "TURP", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-2", specialty: "UROLOGY & NEPHROLOGY", name: "CYSTOSCOPY URSL/LASER LITHOTRIPSY WITH DJ STENTING (Unilateral)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-3", specialty: "UROLOGY & NEPHROLOGY", name: "CYSTOSCOPY WITH DJ STENTING", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-4", specialty: "UROLOGY & NEPHROLOGY", name: "CYSTOSCOPY(DIAGNOSTIC)/STENT REMOVAL", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-5", specialty: "UROLOGY & NEPHROLOGY", name: "PCNL +CYSTOSCOPY with DJ STENT", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-6", specialty: "UROLOGY & NEPHROLOGY", name: "HYDROCELE-UNILATERAL", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-7", specialty: "UROLOGY & NEPHROLOGY", name: "ESWL (Extra corporeal Shock Wave Lithotripsy)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-8", specialty: "UROLOGY & NEPHROLOGY", name: "ORCHIDOPEXY / ORCHIDECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-9", specialty: "UROLOGY & NEPHROLOGY", name: "TURBT", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-10", specialty: "UROLOGY & NEPHROLOGY", name: "HAEMO-DIALYSIS ( Per sitting)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "uro-11", specialty: "UROLOGY & NEPHROLOGY", name: "RIRS WITH CYSTOSCOPY WITH DJ STENT", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },

  // CARDIOLOGY (10)
  { id: "card-1", specialty: "CARDIOLOGY", name: "Coronary Angiogram (Including Guidewire,Dye and Catheter)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-2", specialty: "CARDIOLOGY", name: "Angioplasty - PTCA (Including One Balloon,1Guidewire,Dye and 1CATHETER)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-3", specialty: "CARDIOLOGY", name: "ANGIOGRAM+ANGIOPLASTY (Including One Balloon,Guidewire,Dye and Catheter)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-4", specialty: "CARDIOLOGY", name: "Valve Replacement - Double Valve(EXCLUDE COST OF VALVE)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-5", specialty: "CARDIOLOGY", name: "Valve Replacement - Single Valve(EXCLUDE COST OF VALVE)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-6", specialty: "CARDIOLOGY", name: "Temporary Pacemaker Implantation", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-7", specialty: "CARDIOLOGY", name: "Permanent Pacemaker Implantation", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-8", specialty: "CARDIOLOGY", name: "CABG -On & Off Pump", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "card-9", specialty: "CARDIOLOGY", name: "ASD/VSD Closure(DEVICE EXTRA)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "card-10", specialty: "CARDIOLOGY", name: "EP Study & RF Abalation (MAPPING & ELECTRODE EXTRA)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },

  // OPTHALMOLOGY (17) (Keep source spelling)
  { id: "oph-1", specialty: "OPTHALMOLOGY", name: "PHACO CATARACT SURGERY INCLUDING LENS", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-2", specialty: "OPTHALMOLOGY", name: "MICS--INCLUDING LENS", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-3", specialty: "OPTHALMOLOGY", name: "GLAUCOMA SURGERY--EXCLUDING VALVE", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "oph-4", specialty: "OPTHALMOLOGY", name: "VITRECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-5", specialty: "OPTHALMOLOGY", name: "SURGERY FOR RETINAL DETACHMENT (INCLUDING SCLERAL BUCKLING)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-6", specialty: "OPTHALMOLOGY", name: "TRABECULECTOMY", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-7", specialty: "OPTHALMOLOGY", name: "PTERYGIUM + CON GRAFT + GLUE", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-8", specialty: "OPTHALMOLOGY", name: "Dacryoeystorrhinostomy (DCR) + Intubation", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-9", specialty: "OPTHALMOLOGY", name: "Dacryoeystorrhinostomy (DCR) 5FU", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-10", specialty: "OPTHALMOLOGY", name: "Enucleation", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-11", specialty: "OPTHALMOLOGY", name: "Eviscreation", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-12", specialty: "OPTHALMOLOGY", name: "Chalazion", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-13", specialty: "OPTHALMOLOGY", name: "Yag Capsulotomy", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-14", specialty: "OPTHALMOLOGY", name: "Intravitreal Injection (EXCLUDE COST OF INJECTION)", inclusions: "L1,L3,L4", exclusions: "L2", defaultSingleAcRate: 0 },
  { id: "oph-15", specialty: "OPTHALMOLOGY", name: "LASIK(> +/-7.5D)", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-16", specialty: "OPTHALMOLOGY", name: "Vitrectomy with Gas Temponade", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
  { id: "oph-17", specialty: "OPTHALMOLOGY", name: "Collagen Cross Linking for Keratoconus-unilateral", inclusions: "L1,L2,L3,L4", exclusions: "-", defaultSingleAcRate: 0 },
];

// Surgery Charges Grades 1-7
export const GIC_SURGERY_GRADES: SurgeryGrade[] = [
  {
    grade: 1,
    label: "Grade 1",
    particulars: [
      { particular: "Operation Theatre Charges", defaultRate: 0 },
      { particular: "Anaesthetist fees", defaultRate: 0 },
      { particular: "Surgeon's fees", defaultRate: 0 },
    ],
  },
  {
    grade: 2,
    label: "Grade 2",
    particulars: [
      { particular: "Operation Theatre Charges", defaultRate: 0 },
      { particular: "Anaesthetist fees", defaultRate: 0 },
      { particular: "Surgeon's fees", defaultRate: 0 },
    ],
  },
  {
    grade: 3,
    label: "Grade 3",
    particulars: [
      { particular: "Operation Theatre Charges", defaultRate: 0 },
      { particular: "Anaesthetist fees", defaultRate: 0 },
      { particular: "Surgeon's fees", defaultRate: 0 },
      { particular: "Asst. Surgeon fees", defaultRate: 0 },
    ],
  },
  {
    grade: 4,
    label: "Grade 4",
    particulars: [
      { particular: "Operation Theatre Charges", defaultRate: 0 },
      { particular: "Anaesthetist fees", defaultRate: 0 },
      { particular: "Surgeon's fees", defaultRate: 0 },
      { particular: "Asst. Surgeon fees", defaultRate: 0 },
    ],
  },
  {
    grade: 5,
    label: "Grade 5",
    particulars: [
      { particular: "Operation Theatre Charges", defaultRate: 0 },
      { particular: "Anaesthetist fees", defaultRate: 0 },
      { particular: "Surgeon's fees", defaultRate: 0 },
      { particular: "Asst. Surgeon fees", defaultRate: 0 },
    ],
  },
  {
    grade: 6,
    label: "Grade 6",
    particulars: [
      { particular: "Operation Theatre Charges", defaultRate: 0 },
      { particular: "Anaesthetist fees", defaultRate: 0 },
      { particular: "Surgeon's fees", defaultRate: 0 },
      { particular: "Asst. Surgeon fees", defaultRate: 0 },
    ],
  },
  {
    grade: 7,
    label: "Grade 7",
    particulars: [
      { particular: "Operation Theatre Charges", defaultRate: 0 },
      { particular: "Anaesthetist fees", defaultRate: 0 },
      { particular: "Surgeon's fees", defaultRate: 0 },
      { particular: "Asst. Surgeon fees", defaultRate: 0 },
    ],
  },
];

// Room & Visit (Non-ICU) Charges (3)
export const GIC_ROOM_VISIT_CHARGES: RateItem[] = [
  { id: "rv-1", name: "Room Rent with Nursing Charges/RMO", defaultRate: 0 },
  { id: "rv-2", name: "Specialist Consultation Charges per day", defaultRate: 0 },
  { id: "rv-3", name: "Super-specialist Consultation charges per day", defaultRate: 0 },
];

// ICU Charges (5)
export const GIC_ICU_CHARGES: RateItem[] = [
  { id: "icu-1", name: "ICU (all types) charges including nursing charges", defaultRate: 0 },
  { id: "icu-2", name: "Doctor Consultation Charges (ICU - all types)", defaultRate: 0 },
  { id: "icu-3", name: "Super-specialist Consultation charges per day (ICU)", defaultRate: 0 },
  { id: "icu-4", name: "Ventilator Charges with O2 per day", defaultRate: 0 },
  { id: "icu-5", name: "O2 charges per day", defaultRate: 0 },
];

// 66 Investigation Charges
export const GIC_INVESTIGATION_CHARGES: RateItem[] = [
  { id: "inv-1", name: "Alkaline Phosphatase", defaultRate: 0 },
  { id: "inv-2", name: "Anti Ccp (Cyclic Citrullinated Peptide)", defaultRate: 0 },
  { id: "inv-3", name: "Anti Dengue Antibody - IgG, IgM, NS1 Antigen (package)", defaultRate: 0 },
  { id: "inv-4", name: "APT TEST", defaultRate: 0 },
  { id: "inv-5", name: "Arterial Blood Gas(Abg)", defaultRate: 0 },
  { id: "inv-6", name: "ASO", defaultRate: 0 },
  { id: "inv-7", name: "Bilirubin Total", defaultRate: 0 },
  { id: "inv-8", name: "Blood Group ABO & Rh", defaultRate: 0 },
  { id: "inv-9", name: "Bun (Blood Urea Nitrogen)", defaultRate: 0 },
  { id: "inv-10", name: "BT/CT (Bleeding time/Clotting time)", defaultRate: 0 },
  { id: "inv-11", name: "Calcium", defaultRate: 0 },
  { id: "inv-12", name: "CBC / CBC With ESR", defaultRate: 0 },
  { id: "inv-13", name: "CHIKUNGUNYA - lgG,lgM", defaultRate: 0 },
  { id: "inv-14", name: "Chloride(CL)", defaultRate: 0 },
  { id: "inv-15", name: "CPK MB", defaultRate: 0 },
  { id: "inv-16", name: "Creatinine", defaultRate: 0 },
  { id: "inv-17", name: "hs CRP", defaultRate: 0 },
  { id: "inv-18", name: "CRP (QUANTITATIVE)", defaultRate: 0 },
  { id: "inv-19", name: "D Dimer", defaultRate: 0 },
  { id: "inv-20", name: "Dengue - lgG,lgM", defaultRate: 0 },
  { id: "inv-21", name: "E2 ( Estradiol)", defaultRate: 0 },
  { id: "inv-22", name: "Electrolytes", defaultRate: 0 },
  { id: "inv-23", name: "ESR/HB/TRBC/TLC/Platelet Count", defaultRate: 0 },
  { id: "inv-24", name: "FBS/PLBS/RBS/ HbA1C", defaultRate: 0 },
  { id: "inv-25", name: "FSH + LH + PROLACTIN", defaultRate: 0 },
  { id: "inv-26", name: "HBsAg", defaultRate: 0 },
  { id: "inv-27", name: "HCV", defaultRate: 0 },
  { id: "inv-28", name: "HDL Cholesterol", defaultRate: 0 },
  { id: "inv-29", name: "HIV I & II (Tri- Dot)", defaultRate: 0 },
  { id: "inv-30", name: "Holter Monitoring", defaultRate: 0 },
  { id: "inv-31", name: "Kidney Function Test (KFT)", defaultRate: 0 },
  { id: "inv-32", name: "LDL Choelsterol", defaultRate: 0 },
  { id: "inv-33", name: "Lipid Profile", defaultRate: 0 },
  { id: "inv-34", name: "Liver Function Test", defaultRate: 0 },
  { id: "inv-35", name: "Magnesium", defaultRate: 0 },
  { id: "inv-36", name: "Malaria Antigen", defaultRate: 0 },
  { id: "inv-37", name: "Peripheral Smear Study", defaultRate: 0 },
  { id: "inv-38", name: "POTASSIUM (K)", defaultRate: 0 },
  { id: "inv-39", name: "Procalcitonin", defaultRate: 0 },
  { id: "inv-40", name: "PSA Free", defaultRate: 0 },
  { id: "inv-41", name: "PSA Total", defaultRate: 0 },
  { id: "inv-42", name: "PSA Total + Free", defaultRate: 0 },
  { id: "inv-43", name: "PT (Prothrombin Time)", defaultRate: 0 },
  { id: "inv-44", name: "RA Factor", defaultRate: 0 },
  { id: "inv-45", name: "Routine Urine Analysis", defaultRate: 0 },
  { id: "inv-46", name: "Serum Albumin", defaultRate: 0 },
  { id: "inv-47", name: "SGOT (AST)", defaultRate: 0 },
  { id: "inv-48", name: "SGPT(ALT)", defaultRate: 0 },
  { id: "inv-49", name: "Smear for MP(Rapid)", defaultRate: 0 },
  { id: "inv-50", name: "SODIUM(Na)", defaultRate: 0 },
  { id: "inv-51", name: "Sr. Calcium", defaultRate: 0 },
  { id: "inv-52", name: "Stool Occult Blood", defaultRate: 0 },
  { id: "inv-53", name: "T3/T4", defaultRate: 0 },
  { id: "inv-54", name: "Testosterone", defaultRate: 0 },
  { id: "inv-55", name: "Thyroid Profile", defaultRate: 0 },
  { id: "inv-56", name: "Total Cholesterol", defaultRate: 0 },
  { id: "inv-57", name: "Total Protein", defaultRate: 0 },
  { id: "inv-58", name: "Triglycerides", defaultRate: 0 },
  { id: "inv-59", name: "TSH", defaultRate: 0 },
  { id: "inv-60", name: "Typhi Dot", defaultRate: 0 },
  { id: "inv-61", name: "Urea", defaultRate: 0 },
  { id: "inv-62", name: "Uric Acid", defaultRate: 0 },
  { id: "inv-63", name: "Urine C/S", defaultRate: 0 },
  { id: "inv-64", name: "Urine Occult Blood", defaultRate: 0 },
  { id: "inv-65", name: "VDRL", defaultRate: 0 },
  { id: "inv-66", name: "WIDAL TEST (SLIDE METHOD)", defaultRate: 0 },
];

// Radiology Charges (4)
export const GIC_RADIOLOGY_CHARGES: RateItem[] = [
  { id: "rad-1", name: "2D Echo", defaultRate: 0 },
  { id: "rad-2", name: "ECG", defaultRate: 0 },
  { id: "rad-3", name: "USG ABDOMEN/PELVIS", defaultRate: 0 },
  { id: "rad-4", name: "X Ray Chest PA/AP view", defaultRate: 0 },
];
