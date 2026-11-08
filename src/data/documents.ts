// PhD documents at USJ (Faculty of Graduate Studies) and their status.
// status: "done" = finished, "waiting" = submitted / waiting on someone else,
//         "progress" = being worked on, "pending" = not started yet.
// Put finished files in public/docs/ and set `file` so they can be downloaded.

export type Status = "done" | "waiting" | "progress" | "pending";

export type DocPart = { name: string; status: Status; note?: string };

export type PhdDocument = {
  id: string;
  title: string;
  description: string;
  status: Status;
  statusText: string; // short label shown on the card
  date?: string; // YYYY-MM-DD (last status change, or due date with dateLabel "Due"); used for newest-first order
  dateLabel?: string; // e.g. "Due"
  file?: { url: string; label: string; size: string };
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
    file: { url: "/docs/PhD_Proposal_Viraj_Sameera.pdf", label: "PhD_Proposal_Viraj_Sameera.pdf", size: "1.4 MB" },
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
    status: "waiting",
    statusText: "Waiting for approval",
    date: "2026-11-10",
    parts: [
      { name: "Application form (Parts I–III)", status: "done" },
      { name: "Ethics considerations annex", status: "done" },
      { name: "Information sheets & consent forms", status: "done" },
      { name: "Submitted to KDU ethics committee", status: "done", note: "10 Nov 2026" },
      { name: "KDU ethics approval", status: "waiting" },
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
    description: "First progress review of the PhD.",
    status: "progress",
    statusText: "In progress",
    dateLabel: "Due",
    date: "2027-05-10",
    parts: [
      { name: "Research methodology", status: "progress", note: "Currently working on" },
      { name: "Collecting research papers for the methodology", status: "progress", note: "Currently working on" },
      { name: "Progress review report", status: "pending" },
      { name: "Presentation to review panel", status: "pending" },
    ],
  },
];
