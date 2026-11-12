// My own papers (written for publication), shown in the Papers tab with the same card layout as Documents.
// Put each draft PDF in public/docs/ and keep the editable source in D:\Phd\6 Paper.
import type { PhdDocument } from "./documents";

export const publications: PhdDocument[] = [
  {
    id: "review-ai-brain-tumour",
    title: "Artificial Intelligence Across the Brain Tumour Care Pathway: A Narrative Review",
    description:
      "Narrative review of AI for brain tumours along the clinical pathway: MRI analysis, computational pathology, integration of evidence, data-efficient and federated learning, surgery and clinician-AI interaction. Written from the Paper Bank (221 references).",
    status: "progress",
    statusText: "Draft v0.2 · for supervisor review",
    date: "2026-11-12",
    files: [
      {
        name: "Draft v0.2 (about 7,000 words, 40 pages)",
        url: "/docs/Paper_Review_AI_Brain_Tumour_v0.2.pdf",
        label: "Paper_Review_AI_Brain_Tumour_v0.2.pdf",
        size: "0.5 MB",
      },
    ],
    parts: [
      { name: "Evidence base and outline", status: "done", note: "Selected from the 559-paper Paper Bank" },
      { name: "Full draft", status: "done", note: "Version 0.2 (12 Nov 2026) · 13 sections, 2 tables, 221 references" },
      { name: "Supervisor and co-author review", status: "pending" },
      { name: "Add co-authors, funding and declarations", status: "pending" },
      { name: "Choose target journal and format", status: "pending" },
      { name: "Submit to journal", status: "pending" },
      { name: "Peer review and revision", status: "pending" },
      { name: "Accepted / published", status: "pending" },
    ],
  },
];
