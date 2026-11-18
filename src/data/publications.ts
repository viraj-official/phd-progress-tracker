// My own papers (written for publication), shown in the Papers tab with the same card layout as Documents.
// Put each PDF in public/docs/ and keep the editable source in D:\Phd\6 Paper\01 Narrative Review and \02 Conceptual Framework.
// Papers must not reveal the research title: use neutral paper titles and file names here.
import type { PhdDocument } from "./documents";

// short: the name shown on the Overview card ("Paper 1 · <short>").
export type Publication = PhdDocument & { short?: string };

export const publications: Publication[] = [
  {
    id: "review-ai-brain-tumour",
    short: "Narrative review: AI across the brain tumour care pathway",
    title: "Artificial Intelligence Across the Brain Tumour Care Pathway: A Narrative Review",
    description:
      "Narrative review of AI for brain tumours along the clinical pathway: MRI analysis, computational pathology, integration of evidence, data-efficient and federated learning, surgery and clinician-AI interaction. Written from the Paper Bank (221 references).",
    status: "progress",
    statusText: "Version 1.0 · awaiting supervisor approval",
    date: "2026-11-18",
    files: [
      {
        name: "Version 1.0 (about 6,700 words, 39 pages)",
        url: "/docs/Paper_Review_AI_Brain_Tumour_v1.0.pdf",
        label: "Paper_Review_AI_Brain_Tumour_v1.0.pdf",
        size: "0.6 MB",
      },
    ],
    parts: [
      { name: "Evidence base and outline", status: "done", note: "Selected from the 559-paper Paper Bank" },
      { name: "Full draft", status: "done", note: "Version 0.2 (12 Nov 2026) · 13 sections, 2 tables, 221 references" },
      { name: "Final formatting", status: "done", note: "Version 1.0 (18 Nov 2026)" },
      { name: "Supervisor approval", status: "pending" },
      { name: "Add co-authors, funding and declarations", status: "pending" },
      { name: "Choose target journal or conference and format", status: "pending" },
      { name: "Submit", status: "pending" },
      { name: "Peer review and revision", status: "pending" },
      { name: "Accepted / published", status: "pending" },
    ],
  },
  {
    id: "conceptual-framework",
    short: "Risk-gated escalation for brain tumour decision support",
    title: "Risk-Gated Escalation for Safe Human–AI Collaboration in Brain Tumour Decision Support: Design and Feasibility Evaluation",
    description:
      "Compares the approaches in the 559-paper Paper Bank decision by decision, selects the best-supported one for each, and combines them into a framework that decides case by case when an AI output may be released and when a clinician must decide. Includes a practical deployment plan, a reference implementation with 17 automated tests, and a feasibility study on public brain tumour MRI (233 patients).",
    status: "progress",
    statusText: "Version 1.0 · awaiting supervisor approval",
    date: "2026-11-18",
    files: [
      {
        name: "Version 1.0 (about 10,700 words, 52 pages)",
        url: "/docs/Paper_Risk_Gated_Escalation_v1.0.pdf",
        label: "Paper_Risk_Gated_Escalation_v1.0.pdf",
        size: "1.5 MB",
      },
    ],
    parts: [
      { name: "Comparative analysis of the Paper Bank", status: "done", note: "559 studies, 9 design decisions, evidence matrix" },
      { name: "Framework and propositions", status: "done", note: "Six layers, escalation rule, five safety invariants, six propositions" },
      { name: "Reference implementation", status: "done", note: "17 automated tests passing" },
      { name: "Feasibility study", status: "done", note: "Public brain tumour MRI, 233 patients, five experiments" },
      { name: "Final formatting", status: "done", note: "Version 1.0 (18 Nov 2026)" },
      { name: "Supervisor approval", status: "pending" },
      { name: "Add co-authors, funding and declarations", status: "pending" },
      { name: "Choose target journal or conference and format", status: "pending" },
      { name: "Submit", status: "pending" },
      { name: "Peer review and revision", status: "pending" },
      { name: "Accepted / published", status: "pending" },
    ],
  },
];
