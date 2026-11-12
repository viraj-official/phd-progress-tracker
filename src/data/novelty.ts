// Research → Gaps & Novelty page.
// Taken from the proposal (v2), Chapter 1 (Table 1.1, Section 1.5), Chapter 2 (gap sections 2.3.10-2.6.11,
// Table 2.5) and Chapter 3 (objective outputs, hypotheses H1-H6) of the First Progress Review.
// Edit here to change the page. Short codes (AG1, TG1, AN1, TN1, C1) come from each item's position in its list.

export type Point = {
  id: string; // used in the share link
  title: string;
  text: string;
  objectives: string[]; // e.g. ["O2"]
  answers?: string[]; // novelty only: ids of the gaps it answers
  tests?: string[]; // novelty only: hypotheses that test it, e.g. ["H1"]
};

// Hypotheses, from Chapter 3 (Research Methodology).
export const hypotheses: Record<string, string> = {
  H1: "A calibrated, cost-derived escalation policy achieves a better workload-safety trade-off than fixed-confidence thresholding (RQ2).",
  H2: "Propagating calibrated uncertainty between agents reduces downstream decision errors compared with hand-offs that ignore upstream reliability (RQ1).",
  H3: "Self-supervised pre-training on unlabelled local MRI improves performance and calibration compared with transfer from public data alone (RQ3).",
  H4: "Combining MRI and slide evidence gives higher diagnostic and grading concordance than the best single source (RQ3).",
  H5: "Federated training improves generalisation over single-site training, stays within a margin of centralised training and preserves calibration (RQ3).",
  H6: "The AI-assisted human-in-the-loop workflow reduces review time and improves usability and trust compared with an unassisted workflow, with non-inferior diagnostic performance (RQ4).",
};

// What is missing in practice: in hospitals, in Sri Lanka, for clinicians and patients.
export const applicationGaps: Point[] = [
  {
    id: "no-registry",
    title: "No linked brain-tumour data in Sri Lanka",
    text: "There is no imaging- and tissue-linked brain-tumour registry; patients are tracked in fragmented, hospital-specific records. Public datasets contain almost no South Asian cases, so AI built elsewhere is untested on Sri Lankan patients.",
    objectives: ["O1", "O3"],
  },
  {
    id: "all-or-nothing",
    title: "AI is used all-or-nothing",
    text: "Clinical AI is deployed either as a manual aid where every output is checked, or as automation where none is. Nothing decides case by case which outputs a busy specialist really needs to see, although specialist time is the scarcest resource.",
    objectives: ["O2"],
  },
  {
    id: "real-data",
    title: "Tools assume clean, complete, Western data",
    text: "Routine local MRI uses older scanners and varied protocols, sequences are often missing, and pathology results arrive later than imaging. Most published tools are built and tested on complete, curated Western datasets.",
    objectives: ["O3"],
  },
  {
    id: "data-sharing",
    title: "Hospitals cannot pool patient data",
    text: "Patient data cannot be moved freely between the few small Sri Lankan neurosurgical units, so no single site has enough data to train reliable models on its own.",
    objectives: ["O3"],
  },
  {
    id: "oversight",
    title: "Human oversight is declared, not measured",
    text: "Regulation (EU AI Act) and WHO guidance require demonstrable human oversight of high-risk clinical AI, but there is no accepted way to show whether a system referred the right cases to a clinician. How clinicians respond to a deferring system in brain-tumour care, and in low-resource settings, has not been studied.",
    objectives: ["O4"],
  },
  {
    id: "planning",
    title: "Surgical planning ignores uncertainty",
    text: "Planning and tractography tools are judged on geometric accuracy, not on whether surgeons find them acceptable, and none shows the uncertainty of the anatomy alongside the suggested route.",
    objectives: ["O4"],
  },
];

// What is missing in the methods: algorithms, models and evaluation science.
export const technicalGaps: Point[] = [
  {
    id: "deferral-chain",
    title: "Deferral methods cover one model and one decision",
    text: "Selective prediction, learning to defer and conformal prediction were built for a single model making a single decision with a uniform error cost and an always-available expert. They do not handle a chain of dependent decisions, asymmetric clinical costs or limited clinician time.",
    objectives: ["O2"],
  },
  {
    id: "handoffs",
    title: "Agent hand-offs carry no calibrated uncertainty",
    text: "Medical multi-agent systems route by question difficulty, role or LLM self-rating. Uncertainty is not part of the contract between agents, so doubtful outputs are passed on as certain (unsupported claims propagated in 16.6% of audited cases).",
    objectives: ["O1"],
  },
  {
    id: "fusion",
    title: "Fusion breaks when a source is missing",
    text: "MRI-pathology fusion beats single sources on complete cohorts, but most methods assume every source is present; missing-modality work is only simulated on BraTS.",
    objectives: ["O3"],
  },
  {
    id: "federation-calibration",
    title: "Effect of federation on calibration is unknown",
    text: "Federated learning works at international scale, but how aggregation and domain adaptation change calibration, and therefore silently change when a deferral policy escalates, is essentially unexamined, as is the regime of a few small, very different hospitals.",
    objectives: ["O3"],
  },
  {
    id: "label-efficient-confidence",
    title: "Label-efficient models are judged on accuracy only",
    text: "Self-supervised and transfer learning help with few labels, but whether the confidence they produce is good enough to drive an autonomy decision has not been established.",
    objectives: ["O3"],
  },
  {
    id: "escalation-metrics",
    title: "No metric for the quality of an escalation decision",
    text: "Reporting guidelines (DECIDE-AI, STARD-AI) require human factors and safety, but no standard defines how to measure whether a system deferred on the cases that needed a clinician and acted on those that did not.",
    objectives: ["O4"],
  },
];

// What is new for the clinical setting and its users.
export const applicationNovelty: Point[] = [
  {
    id: "pathway-system",
    title: "First uncertainty-aware multi-agent support for the whole brain-tumour pathway",
    text: "One framework covers intake, MRI, pathology, combined diagnosis, surgical planning and follow-up, with a clinician as the final validator at every step, built for a low-resource country (Sri Lanka).",
    objectives: ["O1"],
    answers: ["all-or-nothing"],
  },
  {
    id: "national-registry",
    title: "Sri Lanka's first imaging- and tissue-linked brain-tumour registry",
    text: "A national registry linking MRI, slides and outcomes, with a de-identified benchmark that adds South Asian cases to the public record. It is useful to the hospitals whatever the research results.",
    objectives: ["O1", "O3"],
    answers: ["no-registry"],
  },
  {
    id: "measurable-oversight",
    title: "Clinician oversight that is measurable and auditable",
    text: "No AI output can reach a clinical action without a clinician, and every AI output, escalation and clinician decision is written to an audit trail, so oversight can be shown to a regulator rather than just stated.",
    objectives: ["O1", "O4"],
    answers: ["oversight"],
  },
  {
    id: "workload-safety",
    title: "Less specialist workload with a controlled error level",
    text: "Routine, confident cases are handled with less review while uncertain, unusual or high-risk cases go to the specialist, targeting the shortage of neurosurgeons, neuroradiologists and neuropathologists.",
    objectives: ["O2", "O4"],
    answers: ["all-or-nothing"],
    tests: ["H1"],
  },
  {
    id: "planning-uncertainty",
    title: "Surgical planning that shows its uncertainty",
    text: "Patient-specific 3D anatomy, structures to avoid and a candidate route, with the uncertainty of the anatomy carried through to the surgeon. The system plans and flags; it never performs or controls surgery.",
    objectives: ["O4"],
    answers: ["planning"],
  },
  {
    id: "lmic-evaluation",
    title: "Clinical evaluation of a deferring AI in a low-resource setting",
    text: "A multi-reader evaluation with Sri Lankan clinicians measuring escalation appropriateness, missed escalations, workload, usability and trust, evidence that is currently missing for brain-tumour care and for LMICs.",
    objectives: ["O4"],
    answers: ["oversight"],
    tests: ["H6"],
  },
];

// What is new in the methods.
export const technicalNovelty: Point[] = [
  {
    id: "chain-escalation",
    title: "Calibrated escalation over a chain of dependent decisions",
    text: "An escalation rule that uses calibrated uncertainty and clinician-elicited, asymmetric error costs under limited clinician capacity, with three actions (proceed, gather more evidence, escalate) and four triggers (low confidence, novelty, conflict, mandatory review), applied after every agent step.",
    objectives: ["O2"],
    answers: ["deferral-chain"],
    tests: ["H1"],
  },
  {
    id: "uncertainty-contract",
    title: "Uncertainty as part of the contract between agents",
    text: "Every agent must report a calibrated confidence, and that uncertainty is propagated across each hand-off (for example by passing sampled segmentations to the classifier), so a doubtful upstream result produces a doubtful downstream one (hypothesis H2).",
    objectives: ["O1"],
    answers: ["handoffs"],
    tests: ["H2"],
  },
  {
    id: "workload-safety-frontier",
    title: "Workload-versus-safety frontier for selective autonomy",
    text: "Selective autonomy is evaluated with risk-coverage curves and an explicit workload-safety frontier, compared with fixed-threshold baselines (hypothesis H1).",
    objectives: ["O2"],
    answers: ["deferral-chain"],
    tests: ["H1"],
  },
  {
    id: "federated-calibration",
    title: "Calibration tracked through federation and adaptation",
    text: "Calibration is treated as a quantity to monitor, not assume: the study measures how federated aggregation and domain adaptation across small Sri Lankan sites change calibration and the behaviour of the escalation policy (hypothesis H5).",
    objectives: ["O3"],
    answers: ["federation-calibration", "data-sharing"],
    tests: ["H5"],
  },
  {
    id: "missing-source-fusion",
    title: "Data-efficient, missing-source-tolerant MRI-pathology fusion on local data",
    text: "Self-supervised pre-training on unlabelled local MRI (H3), training with sequence dropout, and fusion that degrades gracefully when pathology or sequences are missing (H4), tested on real local cases rather than simulated gaps.",
    objectives: ["O3"],
    answers: ["fusion", "label-efficient-confidence", "real-data"],
    tests: ["H3", "H4"],
  },
  {
    id: "escalation-quality-metrics",
    title: "Metrics for escalation quality",
    text: "New evaluation measures: appropriate-escalation rate (escalated cases the clinician changed) and missed-escalation rate (autonomous cases experts judge needed a clinician) as the primary safety indicator, alongside coverage and selective risk.",
    objectives: ["O4"],
    answers: ["escalation-metrics"],
    tests: ["H6"],
  },
];

// What the thesis will deliver.
export type Contribution = Point & { output: string };

export const contributions: Contribution[] = [
  {
    id: "c1-framework",
    title: "C1 · Uncertainty-aware multi-agent framework",
    text: "Six specialist agents and an orchestrator with agent contracts, uncertainty propagation, a clinician interface and an append-only audit trail; every decision reconstructable.",
    objectives: ["O1"],
    output: "Framework code, agent contracts, error-propagation analysis (part of paper P2)",
  },
  {
    id: "c2-escalation",
    title: "C2 · Calibrated escalation policy (core contribution)",
    text: "The rule deciding when the system may act and when it must defer, with a protocol for eliciting clinical error costs and the workload-safety analysis.",
    objectives: ["O2"],
    output: "Escalation policy, cost-elicitation protocol, flagship paper P2",
  },
  {
    id: "c3-models",
    title: "C3 · Data-efficient, calibrated and federated models",
    text: "Calibrated MRI segmentation and classification, slide-level pathology and their fusion for small Sri Lankan data, and a federated training protocol across hospitals.",
    objectives: ["O3"],
    output: "Models for the agents, federated protocol, papers P1 (MRI), P3 (pathology & fusion), P4 (federated)",
  },
  {
    id: "c4-evaluation",
    title: "C4 · Clinical evaluation and escalation-quality protocol",
    text: "A reusable protocol and evidence on escalation appropriateness, missed escalations, workload, usability and trust, plus the surgical-planning proof of concept.",
    objectives: ["O4"],
    output: "Evaluation protocol, clinical evaluation paper P5, surgical-planning demonstrator",
  },
  {
    id: "c5-registry",
    title: "C5 · National registry and benchmark",
    text: "Sri Lanka's first imaging- and tissue-linked brain-tumour registry and a de-identified South Asian benchmark dataset.",
    objectives: ["O1", "O3"],
    output: "Registry platform (WP1) and de-identified benchmark",
  },
];
