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
  category?: string; // contributions only: Theory, Algorithm, Model, System / software, Evaluation method
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

// What the thesis will deliver, split into the two kinds of contribution a clinical-AI PhD makes.
// answers: gap ids it closes (shown as chips). output: where it is reported.
export type Contribution = Point & { output: string };

// Computer-science contributions: theory, algorithms, models, software systems and evaluation methods.
// Methods and tools named here are those planned in Chapter 3 (Research Methodology).
export const technicalContributions: Contribution[] = [
  {
    id: "tc-formulation",
    category: "Theory",
    title: "Formal model of selective autonomy over a chain of decisions",
    text: "A formulation of when an AI system may act and when it must refer, for a chain of dependent sub-decisions with asymmetric error costs and a fixed clinician capacity, optimised as a risk-versus-coverage trade-off. It turns a principle (keep the clinician in the loop) into a problem that can be solved and tested.",
    objectives: ["O2"],
    answers: ["deferral-chain"],
    tests: ["H1"],
    output: "Problem formulation and analysis (paper P2)",
  },
  {
    id: "tc-escalation",
    category: "Algorithm",
    title: "Calibrated escalation policy (core contribution)",
    text: "An algorithm applied after every agent step: calibrate the score, convert it to an uncertainty, compare it with a cost-derived threshold and add novelty (out-of-distribution), conflict and mandatory-review triggers, giving one of three actions: proceed, gather more evidence or escalate.",
    objectives: ["O2"],
    answers: ["deferral-chain"],
    tests: ["H1"],
    output: "Escalation policy and workload-safety analysis, flagship paper P2",
  },
  {
    id: "tc-propagation",
    category: "Algorithm",
    title: "Uncertainty propagation across dependent models",
    text: "A method for passing uncertainty from one model to the next, for example by sampling segmentations from an ensemble and running each through the classifier, so a doubtful upstream result produces a correspondingly doubtful downstream result.",
    objectives: ["O1"],
    answers: ["handoffs"],
    tests: ["H2"],
    output: "Propagation method and error-propagation analysis (part of paper P2)",
  },
  {
    id: "tc-mri-model",
    category: "Model",
    title: "Calibrated, data-efficient MRI perception model",
    text: "Tumour segmentation and classification models (nnU-Net and Swin UNETR baselines) with self-supervised pre-training on unlabelled local MRI, random sequence dropout so missing sequences are tolerated, ensemble-based uncertainty and post-hoc calibration, plus a failure taxonomy that maps where the model is not competent.",
    objectives: ["O3"],
    answers: ["label-efficient-confidence", "real-data"],
    tests: ["H3"],
    output: "Trained MRI models and paper P1",
  },
  {
    id: "tc-pathology-fusion",
    category: "Model",
    title: "Slide-level pathology model and missing-source fusion model",
    text: "Attention-based multiple-instance learning on pathology foundation-model features for tumour type and grade from whole slides, and a fusion model that combines MRI and slide evidence and degrades gracefully when one source is missing or poor.",
    objectives: ["O3"],
    answers: ["fusion"],
    tests: ["H4"],
    output: "Trained pathology and fusion models, paper P3",
  },
  {
    id: "tc-federated",
    category: "Algorithm",
    title: "Calibration-aware federated learning protocol",
    text: "A protocol for training across a few small hospitals without moving data (FedAvg, FedProx and FedBN compared with single-site and pooled training) that measures how aggregation and adaptation change calibration, and therefore the behaviour of the escalation policy.",
    objectives: ["O3"],
    answers: ["federation-calibration", "data-sharing"],
    tests: ["H5"],
    output: "Federated protocol and paper P4",
  },
  {
    id: "tc-orchestration-software",
    category: "System / software",
    title: "Multi-agent orchestration software",
    text: "A software framework with a typed contract for each agent (input, output, calibrated uncertainty, validation conditions), an orchestrator that routes cases, an append-only audit trail recording input, output, uncertainty, action, reason and model version, and a clinician interface for accept, amend or reject.",
    objectives: ["O1"],
    answers: ["handoffs", "oversight"],
    output: "Framework code and agent contracts",
  },
  {
    id: "tc-data-platform",
    category: "System / software",
    title: "Privacy-preserving clinical data platform",
    text: "The registry's software layer: a PostgreSQL database with an HL7 FHIR resource model, an Orthanc DICOM server, a de-identification and defacing pipeline and automated image and slide quality checks, designed so data can feed both local models and federated training.",
    objectives: ["O1", "O3"],
    answers: ["no-registry", "data-sharing"],
    output: "Registry platform software (WP1)",
  },
  {
    id: "tc-metrics",
    category: "Evaluation method",
    title: "Escalation-quality metrics and evaluation toolkit",
    text: "New measures, appropriate-escalation rate and missed-escalation rate, used with coverage, selective risk, risk-coverage curves and calibration metrics (ECE, Brier score, reliability diagrams) to judge whether a system referred the right cases.",
    objectives: ["O4"],
    answers: ["escalation-metrics"],
    tests: ["H1", "H6"],
    output: "Evaluation protocol and code (part of paper P5)",
  },
];

// Medical / clinical contributions: benefits for patients, clinicians, hospitals and the health system.
export const clinicalContributions: Contribution[] = [
  {
    id: "mc-registry",
    title: "Sri Lanka's first imaging- and tissue-linked brain-tumour registry",
    text: "A national registry linking MRI, biopsy slides, diagnoses and outcomes across neurosurgical units, with a de-identified benchmark that adds South Asian cases to the public record. It supports audit, continuity of care and future research whatever the AI results.",
    objectives: ["O1", "O3"],
    answers: ["no-registry"],
    output: "Registry platform (WP1) and de-identified benchmark",
  },
  {
    id: "mc-decision-support",
    title: "Safer decision support across the brain-tumour pathway",
    text: "Support for intake, MRI reading, tissue diagnosis, combined WHO 2021 diagnosis, surgical planning and follow-up, in which the clinician keeps final authority and uncertain, unusual or high-risk cases are always sent to a specialist.",
    objectives: ["O1", "O2"],
    answers: ["all-or-nothing"],
    output: "Working clinical prototype evaluated on local cases",
  },
  {
    id: "mc-workload",
    title: "Less specialist workload with a controlled error level",
    text: "Evidence on how much review time neurosurgeons, neuroradiologists and neuropathologists can save on routine cases while missed referrals stay below an agreed level, targeting the shortage of these specialists.",
    objectives: ["O2", "O4"],
    answers: ["all-or-nothing"],
    tests: ["H1", "H6"],
    output: "Workload-safety results (papers P2 and P5)",
  },
  {
    id: "mc-costs",
    title: "Clinician-agreed costs of diagnostic error",
    text: "A protocol for eliciting from clinicians how harmful each kind of mistake is at each decision (for example missing a high-grade tumour versus a false alarm), so the system's behaviour reflects clinical priorities rather than technical defaults.",
    objectives: ["O2"],
    answers: ["deferral-chain"],
    output: "Cost-elicitation protocol and clinician-agreed thresholds",
  },
  {
    id: "mc-local-validation",
    title: "AI validated on Sri Lankan patients",
    text: "MRI and pathology models tested on routine local scans and slides, including cases with missing sequences, giving the first evidence of how such tools perform for Sri Lankan patients where molecular testing is limited.",
    objectives: ["O3"],
    answers: ["real-data", "data-sharing"],
    tests: ["H3", "H4", "H5"],
    output: "Local validation results (papers P1, P3, P4)",
  },
  {
    id: "mc-clinical-evaluation",
    title: "Clinical evaluation with Sri Lankan clinicians",
    text: "A multi-reader study measuring accuracy, review time, usability, trust and missed referrals, providing evidence on human-AI collaboration in brain-tumour care and in a low-resource setting.",
    objectives: ["O4"],
    answers: ["oversight"],
    tests: ["H6"],
    output: "Clinical evaluation paper P5",
  },
  {
    id: "mc-surgical-planning",
    title: "Surgical planning that shows its uncertainty",
    text: "A proof-of-concept planning view with patient-specific 3D anatomy, structures to avoid and a candidate route, carrying anatomical uncertainty to the neurosurgeon, evaluated by neurosurgeons for plausibility and usefulness. The system never performs or controls surgery.",
    objectives: ["O4"],
    answers: ["planning"],
    output: "Surgical-planning demonstrator and neurosurgeon evaluation",
  },
];
