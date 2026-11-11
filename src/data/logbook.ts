// Supervisor meeting log book. Add each new meeting to this list (the page sorts newest first).

export type Action = {
  task: string;
  owner: string; // who does it
  due?: string; // YYYY-MM-DD
  done: boolean;
  note?: string; // e.g. when / how it was done
};

export type Meeting = {
  date: string; // YYYY-MM-DD
  mode?: "In person" | "Online" | "Hybrid";
  place?: string;
  attendees: string[];
  topics: string[]; // agenda / what we planned to discuss
  discussion: string[]; // what was discussed
  decisions: string[]; // what was agreed / instructed
  actions: Action[]; // follow-up tasks
  nextMeeting?: string;
  example?: boolean;
};

export const meetings: Meeting[] = [
  {
    date: "2026-11-05",
    attendees: ["KH Viraj Sameera", "Dr. WGCW Kumara"],
    topics: ["Ethics approval plan"],
    discussion: ["Discussed which ethics approvals to obtain for the study and in what order."],
    decisions: [
      "Dr. Kumara advised submitting the KDU ethics application first.",
      "After KDU approval, the ethics application will be submitted to the University of Sri Jayewardenepura as well.",
    ],
    actions: [
      { task: "Submit KDU ethics application", owner: "Viraj", due: "2026-11-10", done: true, note: "Submitted on 10 Nov 2026 with the REC fee receipt (No. 13275, Rs 1000)" },
      { task: "Submit USJ ethics application after KDU approval", owner: "Viraj", done: false, note: "Waiting for the KDU decision" },
    ],
  },
  {
    date: "2026-11-05",
    attendees: ["KH Viraj Sameera", "Dr. WMKS Ilmini"],
    topics: ["Progress on collecting research papers", "Research methodology"],
    discussion: ["I gave Dr. Ilmini the current update on collecting research papers."],
    decisions: [
      "Dr. Ilmini instructed me to collect more research papers.",
      "She instructed me to collect papers that describe their research methodology in detail, for every paper.",
      "She instructed me to start working on the research methodology.",
      "She advised submitting the KDU ethics application.",
    ],
    actions: [
      { task: "Collect more research papers", owner: "Viraj", done: true, note: "Paper Bank expanded to 559 open-access papers (10 Nov 2026)" },
      { task: "Collect papers with a detailed research methodology", owner: "Viraj", done: true, note: "Detailed methodology extracted for all 559 papers (11 Nov 2026)" },
      { task: "Start working on the research methodology", owner: "Viraj", done: true, note: "Research methodology draft v1 written (10 Nov 2026), in Documents for review" },
    ],
  },
  {
    date: "2026-10-06",
    attendees: ["KH Viraj Sameera", "Dr. WMKS Ilmini"],
    topics: ["First supervision meeting", "Starting the literature review"],
    discussion: ["First supervision meeting of the PhD."],
    decisions: ["Dr. Ilmini instructed me to collect research papers.", "She instructed me to create a review table based on those papers."],
    actions: [
      { task: "Collect research papers for each objective", owner: "Viraj", done: true },
      { task: "Create a review table based on the papers", owner: "Viraj", done: true },
    ],
  },
];
