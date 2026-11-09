// PhD documents at USJ (Faculty of Graduate Studies) and their status.
// status: "done" = finished, "waiting" = submitted / waiting on someone else,
//         "progress" = being worked on, "pending" = not started yet.
// A document can have several files (e.g. application + approval letter) and each
// part can have its own file (e.g. one chapter of the progress review).
// Put files in public/docs/ (and keep the original in the PhD folder).

export type Status = "done" | "waiting" | "progress" | "pending";

export type DocFile = { url: string; label: string; size: string; name?: string };

export type DocPart = { name: string; status: Status; note?: string; file?: DocFile };

export type PhdDocument = {
  id: string;
  title: string;
  description: string;
  status: Status;
  statusText: string; // short label shown on the card
  date?: string; // YYYY-MM-DD (last status change, or due date with dateLabel "Due"); used for newest-first order
  dateLabel?: string; // e.g. "Due"
  files?: DocFile[];
  parts: DocPart[];
};

export const documents: PhdDocument[] = [
  {
    id: "proposal",
    title: "PhD Research Proposal",
    description: "Full research proposal submitted to the Faculty of Graduate Studies, University of Sri Jayewardenepura.",
    status: "done",
    statusText: "Completed",
    date: "2026-11-04",
    files: [
      { name: "Research proposal", url: "/docs/PhD_Proposal_Viraj_Sameera.pdf", label: "PhD_Proposal_Viraj_Sameera.pdf", size: "1.4 MB" },
    ],
    parts: [
      { name: "Proposal document", status: "done" },
      { name: "Application form & supporting documents", status: "done" },
      { name: "Supervisor endorsement", status: "done" },
      { name: "Handed over to FGS", status: "done" },
      { name: "Accepted by the Board · registration approved", status: "done", note: "04 Nov 2026" },
      { name: "Handed over to evaluators", status: "done", note: "04 Nov 2026" },
    ],
  },
  {
    id: "ethics-kdu",
    title: "Ethics Application — KDU",
    description:
      "Ethics review by the Research Ethics Committee, Faculty of Medicine, General Sir John Kotelawala Defence University. Both supervisors advised submitting to KDU first; the USJ application follows after KDU approval.",
    status: "progress",
    statusText: "Ready to submit",
    date: "2026-11-10",
    files: [
      {
        name: "Application (English)",
        url: "/docs/KDU_Ethics_Application_Viraj_Sameera.pdf",
        label: "KDU_Ethics_Application_Viraj_Sameera.pdf",
        size: "758 KB",
      },
      { name: "Info sheets & consent · Sinhala", url: "/docs/KDU_Ethics_Appendix_1-2_Sinhala.pdf", label: "KDU_Ethics_Appendix_1-2_Sinhala.pdf", size: "399 KB" },
      { name: "Info sheets & consent · Tamil", url: "/docs/KDU_Ethics_Appendix_1-2_Tamil.pdf", label: "KDU_Ethics_Appendix_1-2_Tamil.pdf", size: "380 KB" },
      { name: "Data collection forms", url: "/docs/KDU_Ethics_Appendix_3_Data_Collection_Forms.pdf", label: "KDU_Ethics_Appendix_3_Data_Collection_Forms.pdf", size: "543 KB" },
      { name: "Clinician forms · Sinhala", url: "/docs/KDU_Ethics_Appendix_3B-3E_Sinhala.pdf", label: "KDU_Ethics_Appendix_3B-3E_Sinhala.pdf", size: "529 KB" },
      { name: "Clinician forms · Tamil", url: "/docs/KDU_Ethics_Appendix_3B-3E_Tamil.pdf", label: "KDU_Ethics_Appendix_3B-3E_Tamil.pdf", size: "501 KB" },
      { name: "CV · KH Viraj Sameera (PI, signed)", url: "/docs/CV_KH_Viraj_Sameera_Short.pdf", label: "CV_KH_Viraj_Sameera_Short.pdf", size: "213 KB" },
      { name: "CV · Dr. AM Deepal K Attanayake (signed)", url: "/docs/CV_Signed_Dr_AMDK_Attanayake.pdf", label: "CV_Signed_Dr_AMDK_Attanayake.pdf", size: "419 KB" },
      { name: "CV · Dr. WMKS Ilmini (signed)", url: "/docs/CV_Signed_Dr_WMKS_Ilmini.pdf", label: "CV_Signed_Dr_WMKS_Ilmini.pdf", size: "233 KB" },
      { name: "CV · Dr. WGCW Kumara (signed)", url: "/docs/CV_Signed_Dr_WGCW_Kumara.pdf", label: "CV_Signed_Dr_WGCW_Kumara.pdf", size: "208 KB" },
      { name: "CV · Dr. IHS Kumarasinghe (Co-Investigator, KDU, signed)", url: "/docs/CV_Dr_IHS_Kumarasinghe_web.pdf", label: "CV_Dr_IHS_Kumarasinghe.pdf", size: "352 KB" },
      { name: "Complete set (print copy)", url: "/docs/KDU_Ethics_Complete_Submission_Set.pdf", label: "KDU_Ethics_Complete_Submission_Set.pdf", size: "4.9 MB" },
    ],
    parts: [
      { name: "Application form (Parts I–III)", status: "done", note: "Matches KDU form A/008/01/2.0; signed by all 5 investigators on 09 Nov 2026" },
      { name: "Co-Investigator at KDU (Dr. IHS Kumarasinghe) added", status: "done", note: "Internal KDU investigator for the ethics application" },
      { name: "Ethics considerations annex", status: "done" },
      { name: "Information sheets & consent forms (English, Sinhala, Tamil)", status: "done" },
      { name: "Data collection forms & interview guide (Appendix 3)", status: "done", note: "Clinician forms also in Sinhala and Tamil" },
      { name: "CVs of investigators", status: "done", note: "All 5 CVs signed and dated 09 Nov 2026" },
      { name: "Final check & print copy (116 pages)", status: "done", note: "09 Nov 2026" },
      { name: "REC processing fee & payment slip", status: "pending", note: "Rs 1000 / 2000" },
      { name: "Submitted to KDU ethics committee", status: "pending", note: "Planned 10 Nov 2026" },
      { name: "KDU ethics approval", status: "waiting", note: "Approval document will be added here" },
    ],
  },
  {
    id: "ethics-usj",
    title: "Ethics Application — USJ",
    description:
      "Ethics review by the Ethics Review Committee of the University of Sri Jayewardenepura, to be submitted after the KDU approval.",
    status: "pending",
    statusText: "Pending",
    date: "2026-11-10",
    parts: [
      { name: "Prepare USJ application", status: "pending", note: "After KDU approval" },
      { name: "Submit to USJ ethics committee", status: "pending" },
      { name: "USJ ethics approval", status: "pending" },
    ],
  },
  {
    id: "progress-review-1",
    title: "First Progress Review",
    description:
      "First progress review report. Each part is written separately, sent to the supervisors for review and approved before it is added to the full report.",
    status: "progress",
    statusText: "In progress",
    dateLabel: "Due",
    date: "2027-05-10",
    parts: [
      { name: "Introduction", status: "progress", note: "Draft being written" },
      { name: "Literature review", status: "progress", note: "314 papers collected; methodology extracted for 275" },
      { name: "Research methodology", status: "progress", note: "Draft being written" },
      { name: "Preliminary work & results", status: "pending" },
      { name: "Work plan & timeline", status: "pending" },
      { name: "Full report (all approved parts)", status: "pending" },
      { name: "Presentation to review panel", status: "pending" },
    ],
  },
];
