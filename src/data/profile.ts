// My Profile tab. Sources: D:\Jobs applications (USJ Lecturer ICT, SLITHM Assistant Director IT) and certificates.

export type Item = { title: string; place: string; period: string; note?: string };

// Wish list: things I need from other people. status: "needed" = not asked yet,
// "requested" = asked and waiting, "received" = done.
export type Wish = {
  id: string; // used in the share link: #profile/wishlist/<id>
  item: string;
  from: string;
  status: "needed" | "requested" | "received";
  why?: string;
  link?: { label: string; to: string }; // a page or part of this site, e.g. "documents/ethics-kdu"
  file?: { label: string; url: string; size: string };
};

export const profile = {
  name: "KH Viraj Sameera",
  fullName: "Kaluhennadige Viraj Sameera",
  headline: "PhD Candidate · Lecturer · Researcher",
  email: "virajofficialinfo@gmail.com",
  phone: "+94 77 581 6789",
  location: "Dehiwala-Mount Lavinia, Sri Lanka",
  summary:
    "Full-time PhD candidate in Computer Science at the University of Sri Jayewardenepura, working on uncertainty-aware multi-agent AI for brain-tumour diagnosis. Brings five years of software-engineering and technical-leadership experience and two years of university teaching, with research in deep learning for medical histopathology.",

  education: [
    { title: "PhD in Computer Science (Reading, full-time)", place: "University of Sri Jayewardenepura, Sri Lanka", period: "2026 – 2030", note: "Registered 04 Nov 2026 (Board approved)" },
    { title: "MSc Computer Science (Information Technology Management) — Distinction", place: "University of Staffordshire, UK · APIIT Sri Lanka", period: "2023 – 2026" },
    { title: "BSc (Hons) Computer Science with Industrial Experience — Upper Second Class", place: "University of Westminster, UK · IIT Sri Lanka", period: "2019 – 2023" },
    { title: "Foundation Certificate in Higher Education", place: "Informatics Institute of Technology (IIT), Sri Lanka", period: "2018 – 2019" },
  ] as Item[],

  academic: [
    { title: "Coordinator cum Lecturer — IT", place: "BCAS Campus (British College of Applied Studies), Colombo", period: "Apr – Oct 2026" },
    { title: "Visiting Lecturer — HND in Accountancy", place: "Advanced Technological Institute, Dehiwala (SLIATE)", period: "2026 – present" },
    { title: "Visiting Lecturer — Database Implementation", place: "University of Vocational Technology", period: "2025 – present" },
    { title: "Temporary Instructor — Dept. of Computer Science", place: "General Sir John Kotelawala Defence University (KDU)", period: "2024 – 2026" },
    { title: "Visiting Lecturer — Dept. of Information Technology", place: "ICBT Campus, Colombo", period: "2024 – 2025" },
    { title: "Visiting Lecturer — Pearson HND in Computing", place: "Study World Lanka Campus", period: "Dec 2024 – Mar 2025" },
  ] as Item[],

  industry: [
    { title: "Senior Technical Lead & Consultant", place: "Apps Technologies Pvt.Ltd", period: "2024 – 2026" },
    { title: "Technical Lead cum Project Manager", place: "Apps Technologies Pvt.Ltd", period: "2024 – 2026" },
    { title: "Senior Software Engineer", place: "Pentacove (Pvt) Ltd", period: "2023 – 2024" },
    { title: "Associate Software Engineer", place: "Techlabs Global (Pvt) Ltd", period: "2022 – 2023" },
    { title: "Intern Software Engineer", place: "Techlabs Global (Pvt) Ltd", period: "2022" },
    { title: "Intern Software Engineer", place: "Texonic Information Systems (Pvt) Ltd", period: "2021 – 2022" },
  ] as Item[],

  supervision: "Supervised and co-supervised 40+ undergraduate final-year research projects.",

  publications: [
    {
      group: "International conference (refereed)",
      items: [
        "K.H. Viraj Sameera, W.G.C.W. Kumara and I.H.S. Kumarasinghe (2026). An Explainable Gated ConvNeXt-ViT Hybrid and YOLO Ensemble Model for Endometrial Cancer Histopathology Subtyping and Clinical Deployment in Sri Lankan Healthcare. NEW2AN 2026.",
      ],
    },
    {
      group: "Local conferences (refereed)",
      items: [
        "K.H. Viraj Sameera, W.G.C.W. Kumara, I.H.S. Kumarasinghe and R.N. Rajapakse (2026). An Efficient Deep Learning Framework for Automated Endometrial Cancer Detection Using ResNet50-ViT Hybrid Architecture. 19th International Research Conference, KDU (oral presentation).",
        "K.H. Viraj Sameera, W.G.C.W. Kumara and I.H.S. Kumarasinghe (2026). A Gated Cross-Attention CNN-Transformer Ensemble for Multiclass Endometrial Cancer Histopathology Classification: A Sri Lankan Dataset Study. International Research Conference (IRC 2026), SLTC.",
        "Viraj Sameera and H.A. Seneviratne (2026). Physics-Informed Neural Networks for Differential Equations: From Data-Free Forward Solutions to Epidemic Transmission Inference. International Conference on Computational and Mathematical Modelling 2026, Colombo.",
        "K.T. Ayeshani, S.C.M. de S. Sirisuriya and K.H.V. Sameera (2025). AI-Driven Chatbot for Personalized Mental Health Support in Post-Breakup Depression. 18th International Research Conference, KDU.",
        "J.A.H. Nishadi and K.H.V. Sameera. Bitcoin Transaction Fraud Detection Using Time-Aware Graphs and Transaction Features. General Sir John Kotelawala Defence University.",
      ],
    },
    {
      group: "Research report",
      items: [
        "K.H. Viraj Sameera (2023). Emotional Based Call Center Calls Management (Lycan): Voice Frequency-Based Emotion Classification — A Comparative Study of Machine Learning and Deep Learning Methods. BSc (Hons) research, IIT Digital Repository.",
      ],
    },
  ],

  skills: [
    { group: "AI & Machine Learning", items: ["Python", "PyTorch", "TensorFlow", "YOLO", "NumPy", "CNN / Vision Transformers", "Explainable AI", "Medical image analysis"] },
    { group: "Backend", items: ["Java", "Spring Boot", "Spring MVC / JPA / Hibernate", "Python (Django, Flask, FastAPI)", "Go (Fiber)", "Express.js", "REST APIs", "Microservices", "OAuth2 / JWT"] },
    { group: "Frontend & Mobile", items: ["React", "Redux", "Angular", "JavaScript", "HTML", "jQuery", "Flutter", "React Native", "Android"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB"] },
    { group: "Cloud & DevOps", items: ["AWS", "GCP", "Docker", "CI/CD", "Git", "GitHub", "Bitbucket", "Maven", "Gradle"] },
    { group: "Testing & Project Tools", items: ["JUnit", "Unit testing", "JIRA"] },
  ],

  achievements: [
    { title: "MSc awarded with Distinction", detail: "University of Staffordshire, UK (APIIT Sri Lanka)", year: "2026" },
    { title: "BestWeb.LK 2026 award", detail: "Development Team Lead and Senior Web Developer — official website of the University of Vocational Technology, launched in Parliament under the patronage of the Hon. Prime Minister", year: "2026" },
    { title: "Finalist — Game Jam 2021", detail: "Dialog Axiata", year: "2021" },
    { title: "Cutting Edge 2019 — Certificate of Honour", detail: "Informatics Institute of Technology; 1st place and 14 best-innovation prizes, Foundation Level IT category", year: "2019" },
    { title: "Winning Team — SESGP Provincial Competition", detail: "School Educational Software Group Projects, Southern Province — Ministry of Education & Microsoft Sri Lanka", year: "2011" },
  ],

  certificates: [
    { group: "Academic", items: [
      { title: "MSc Computer Science (IT Management) — Distinction", issuer: "University of Staffordshire, UK", date: "Aug 2026" },
      { title: "BSc (Hons) Computer Science with Industrial Experience", issuer: "University of Westminster, UK", date: "Aug 2023" },
      { title: "Foundation Certificate in Higher Education", issuer: "Informatics Institute of Technology", date: "2019" },
    ] },
    { group: "Research", items: [
      { title: "Paper presentation — 19th International Research Conference", issuer: "General Sir John Kotelawala Defence University", date: "Aug 2026" },
      { title: "Paper presentation — 18th International Research Conference", issuer: "General Sir John Kotelawala Defence University", date: "Oct 2025" },
    ] },
    { group: "Courses & training", items: [
      { title: "International FDP Course on Advanced Leadership — Responsible Governance", issuer: "BCAS Campus, CLEON Academy & Globethics South Asia", date: "Jun 2026" },
      { title: "Short Course on Systematic Review", issuer: "Research Cell, Faculty of Medicine & Staff Development Centre, KDU", date: "Sep 2025" },
      { title: "Certificate of Training in Internet & E-Commerce", issuer: "Amazon Lanka Computer Studies", date: "2015" },
      { title: "Diploma in English Language", issuer: "British Way English Academy, Matara", date: "2013" },
    ] },
  ],

  wishlist: [
    {
      id: "cv-ilmini",
      item: "Signed and dated CV",
      from: "Dr. WMKS Ilmini",
      status: "received",
      why: "Full CV received on 09 Nov 2026. This CV is used in the KDU ethics application, signed and dated on 09 Nov 2026.",
      link: { label: "KDU ethics application files", to: "documents/ethics-kdu" },
      file: { label: "CV_Signed_Dr_WMKS_Ilmini.pdf", url: "/docs/CV_Signed_Dr_WMKS_Ilmini.pdf", size: "233 KB" },
    },
    {
      id: "cv-kumara",
      item: "Signed and dated CV",
      from: "Dr. WGCW (Chinthaka) Kumara",
      status: "received",
      why: "Full CV received on 09 Nov 2026. This CV is used in the KDU ethics application, signed and dated on 09 Nov 2026.",
      link: { label: "KDU ethics application files", to: "documents/ethics-kdu" },
      file: { label: "CV_Signed_Dr_WGCW_Kumara.pdf", url: "/docs/CV_Signed_Dr_WGCW_Kumara.pdf", size: "208 KB" },
    },
    {
      id: "cv-attanayake",
      item: "Signature and date on CV",
      from: "Dr. AM Deepal K Attanayake",
      status: "needed",
      why: "The CV is already in the application; it only needs to be signed and dated.",
      link: { label: "KDU ethics application files", to: "documents/ethics-kdu" },
    },
    {
      id: "signatures-coi",
      item: "Signature on Part I, section 9.4 (conflict of interest declaration)",
      from: "Dr. WMKS Ilmini, Dr. WGCW Kumara and Dr. AM Deepal K Attanayake",
      status: "needed",
      why: "Every investigator must sign individually; unsigned forms are treated as incomplete.",
      link: { label: "Application (Part I)", to: "documents/ethics-kdu/kdu-ethics-application-viraj-sameera" },
    },
  ] as Wish[],

  memberships: [
    { title: "Member — Sri Lanka Association for Artificial Intelligence (SLAAI)", since: "2024" },
    { title: "Member — IEEE", since: "2024" },
  ],

  service: [
    "Sports Coordinator — Faculty of Computing, KDU (from April 2025)",
    "Convenor — Entrepreneurial Support, Industrial Training & Career Guidance Unit, Faculty of Computing, KDU (from December 2024)",
    "Event management team — 4th SLAAI International Conference on Artificial Intelligence (SLAAI-ICAI 2024)",
    "Organising committee — KDU International Research Conference 2024 & 2025, Step into Industry 3.0, Ideate 360', FOC Career Fair 2025, CYPHER 3.0",
    "Resource person — Department Industry Consultative Board, Dept. of Computer Science, KDU (2024, 2025)",
  ],
};
