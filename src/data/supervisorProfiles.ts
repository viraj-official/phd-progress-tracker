// Full supervisor profiles, keyed by the supervisor's slug in phd.ts.
// A supervisor without an entry here shows "Profile and CV coming soon".
// Put CV files in public/docs/ and set `cv` so they can be downloaded.

export type SupervisorProfile = {
  fullName: string;
  headline: string;
  summary?: string;
  researchAreas?: string[];
  links?: { label: string; url: string }[];
  officePhone?: string;
  homePhone?: string;
  homeAddress?: string[];
  general?: { label: string; value: string }[];
  appointments?: { period: string; title: string; place: string; note?: string }[];
  awards?: { year: string; title: string; detail?: string }[];
  hobbies?: string[];
  referees?: { name: string; lines: string[]; email?: string; phones: string[] }[];
  cv?: { url: string; label: string; size: string };
  qualifications: { year: string; title: string; detail?: string }[];
  memberships: string[];
  publications: { session: string; items: { title: string; authors?: string }[] }[];
  workshops: { year: string; title: string }[];
  teaching: string[];
  activities: string[];
  service: string[];
};

export const supervisorProfiles: Record<string, SupervisorProfile> = {
  attanayake: {
    fullName: "Dr. Attanayake Mudiyanselage Deepal Kumara Attanayake",
    headline: "Consultant Neurosurgeon · National Hospital of Sri Lanka, Colombo",
    officePhone: "+94 11 269 1111 Ext. 2345",
    homePhone: "+94 11 291 1682",
    homeAddress: ["338 E, Old Kandy Road", "Dalugama, Kelaniya 11300", "Sri Lanka"],
    general: [
      { label: "Date of birth", value: "19 September 1963" },
      { label: "Gender", value: "Male" },
      { label: "Marital status", value: "Married" },
      { label: "Nationality", value: "Sri Lankan" },
      { label: "Present position", value: "Consultant Neurosurgeon" },
      { label: "Present station", value: "National Hospital of Sri Lanka, Colombo" },
      { label: "SLMC registration no.", value: "10718" },
    ],
    hobbies: ["Bridge", "Billiards", "Chess", "Carom", "Swimming", "Travelling"],
    referees: [
      {
        name: "Dr. Ravi Dayasena",
        lines: ["MBBS, FRCS Edin (ENT)", "Consultant ENT Surgeon (Retired)", "National Hospital of Sri Lanka"],
        email: "ravidayasena@hotmail.com",
        phones: ["+94 77 747 5338"],
      },
      {
        name: "Dr. Shirani Hapuarachchi",
        lines: ["MBBS, MD", "Senior Consultant Anaesthetist, Neurosurgical Dept.", "National Hospital of Sri Lanka"],
        email: "hapu@sltnet.lk",
        phones: ["Tel (Res) +94 11 267 8781", "Mobile +94 71 476 1191"],
      },
    ],
    cv: { url: "/docs/CV_Dr_Deepal_Attanayake.pdf", label: "CV_Dr_Deepal_Attanayake.pdf", size: "410 KB" },
    qualifications: [
      { year: "2003", title: "M.S. (Surgery)", detail: "Postgraduate Institute of Medicine, University of Colombo, in affiliation with the Royal College of Surgeons of England — considered equivalent to FRCS / MRCS (UK)" },
      { year: "1992", title: "M.B.B.S.", detail: "Faculty of Medicine, University of Colombo, Sri Lanka" },
    ],
    memberships: [
      "Sri Lanka Medical Association",
      "College of Surgeons of Sri Lanka",
      "The Neurosurgeons Association of Sri Lanka",
      "A.O. Spine",
      "A.O. Neurosurgery",
    ],
    publications: [
      {
        session: "Annual Session of the College of Surgeons of Sri Lanka, 2006",
        items: [
          { title: "Intraoperative neuronavigation in cranial surgery: clinical experience in 55 cases", authors: "Ahiththan, A.M.D.K. Attanayake, W.D.L. Siriwardana, S.S.L. Perera" },
          { title: "Case load in a single neurosurgical unit at NHSL — An Audit" },
        ],
      },
      {
        session: "25th Anniversary Academic Sessions, Postgraduate Institute of Medicine, 2005",
        items: [
          { title: "A prospective study on objective improvement of clinical features of patients following Carpal Tunnel Decompression", authors: "T.C. Weerasuriya, C.A.H. Liyanage, A.W.P. Manjula, D. Attanayake, M.A.A.N. Marasinghe, S. Gunasekara, J. Lokuketagoda, Sunil Perera" },
        ],
      },
      {
        session: "Annual Session of the College of Surgeons of Sri Lanka, 2005",
        items: [
          { title: "Post-surgical outcome in children with posterior cranial fossa tumours", authors: "N.P. Senanayake, T. Weerasooriya, J. Lokuketagoda, A.M.D.K. Attanayake, S.S.L. Perera" },
          { title: "A retrospective audit of patients who presented to a neurosurgical unit with an extradural haematoma", authors: "T.C. Weerasuriya, C.A.H. Liyanage, A.W.P. Manjula, P. Athiththan, M.A.A.N. Marasinghe, D. Attanayake, J. Lokuketagoda, Sunil Perera" },
        ],
      },
      {
        session: "Annual Session of the College of Surgeons of Sri Lanka, 2004",
        items: [
          { title: "Removal of a Low Clival Chordoma in a Teenager by Dorsolateral Suboccipital Transcondylar Approach (case report, Asian Journal of Neurosurgery)", authors: "Co-author" },
          { title: "Hand Rubbing with Bactericidal Agent vs Hand Scrubbing in Surgical Practice", authors: "M.T.P.R. Perera, H.H.M.K. Herath, J. Masakorala, A.M.D.K. Attanayake, J. Lokuketagoda, S.S.L. Perera, J. Perera" },
          { title: "Pituitary Adenomas — Sri Lankan Scenario", authors: "M.P. Gunawardane, A.G.D.N. Gunawansa, J. Lokuketagoda, A.M.D.K. Attanayake, Sunil Perera" },
        ],
      },
    ],
    workshops: [
      { year: "2012", title: "AO Spine Advanced Degenerative Diseases of Spine Course, Davos, Switzerland" },
      { year: "2010", title: "AO Spine Advanced Trauma Management Course, Davos, Switzerland" },
      { year: "2006", title: "Neurosurgery Workshop: Minimally Invasive Neurosurgery — Keyhole Concept, Singapore" },
      { year: "2004", title: "RAIN 2004 — International Update on Neuro-intervention, Sri Ramachandra Medical College and Radiology Institution, Chennai, India" },
      { year: "2003", title: "Primary Trauma Care — World Federation of Societies of Anaesthesiologists, Colombo, Sri Lanka" },
    ],
    teaching: [
      "Teaching medical students, Faculty of Medicine, University of Ruhuna",
      "Visiting lecturer, Faculty of Medicine, University of Colombo",
      "Teaching nursing students, Nurses' Training School, Galle",
      "Formerly taught nursing students, Nurses' Training School, Colombo",
    ],
    activities: [
      "Educational programmes on neurosurgery on national television: “Nuga Sewana” and “Ayubowewa” (Rupavahini), “Pahan Dora” (ITN)",
      "Resource person for newspaper articles on neurosurgery",
      "Resource person, Primary Trauma Care workshop, Accident & Emergency Department, NHSL (College of Surgeons & College of Anaesthesiologists of Sri Lanka)",
      "Resource person, Advanced Trauma Resuscitation and Initial Management workshop for surgical registrars, College of Surgeons of Sri Lanka",
    ],
    service: [
      "Participation in voluntary health camps",
      "Providing health facilities for tsunami-affected people and war victims in Sri Lanka",
    ],
  },
  ilmini: {
    fullName: "Dr. W. M. Kalani Sriya Ilmini",
    headline: "Senior Lecturer in Computer Science · AI Researcher · University of Sri Jayewardenepura",
    summary:
      "Senior Lecturer in Computer Science with teaching, research, supervision and academic leadership experience across undergraduate and postgraduate programmes. Research spans machine learning, deep learning, explainable AI, computer vision, biomedical and healthcare applications, knowledge-based systems, and emerging work on large language models and agent systems. Active in international research networking through COST Action CA24121 on Knowledge Graphs and Large Language Models.",
    researchAreas: ["Machine Learning", "Deep Learning", "Explainable AI", "Biomedical AI", "Knowledge Graphs", "Large Language Models"],
    cv: { url: "/docs/CV_Dr_WMKS_Ilmini.pdf", label: "CV_Dr_WMKS_Ilmini.pdf", size: "209 KB" },
    appointments: [
      { period: "2025 – present", title: "Senior Lecturer Grade II", place: "Department of Computer Science, Faculty of Applied Sciences, University of Sri Jayewardenepura", note: "On contract 2024–2025" },
      { period: "2025 – 2026", title: "Visiting Lecturer, Advanced Diploma in Data Science", place: "NIBM, Sri Lanka" },
      { period: "2024", title: "Visiting Lecturer", place: "Next Campus, Sri Lanka and Dubai (in-person and online)" },
      { period: "2023 – 2024", title: "Senior Lecturer Grade II", place: "Department of Computer Science, Faculty of Computing, General Sir John Kotelawala Defence University", note: "Head of Department, 2024" },
      { period: "2017 – 2023", title: "Lecturer", place: "Department of Computer Science, Faculty of Computing, General Sir John Kotelawala Defence University" },
      { period: "2014 – 2016", title: "Temporary Lecturer / Instructor", place: "Department of Computer Science, Faculty of Applied Sciences, University of Sri Jayewardenepura", note: "Visiting Instructor, MSc in Computer Science, 2015" },
      { period: "2013 – 2014", title: "Software Developer (Intern)", place: "Solution Infinity (Private) Limited, Sri Lanka" },
    ],
    qualifications: [
      { year: "2023", title: "Ph.D., University of Sri Jayewardenepura", detail: "Thesis: Personality Traits Assessment using Facial Features with Deep Learning Techniques (2017–2023)" },
      { year: "2014", title: "BSc Honours (Special) in Computer Science, University of Sri Jayewardenepura", detail: "Department of Computer Science, Faculty of Applied Sciences. GPA 3.7/4.5" },
    ],
    awards: [
      { year: "2024", title: "Gold Medal – Best Postgraduate Student, Physical Science Stream", detail: "50th General Convocation, University of Sri Jayewardenepura" },
      { year: "2023", title: "Best Poster Award, Computing Track – 16th International Research Conference, KDU", detail: "Home Garden-based Ayurvedic Plant Identification System Using Convolutional Neural Networks (NTD Dharmasiri, WMKS Ilmini)" },
      { year: "2021", title: "Best Poster Award, Computing Track – 14th International Research Conference, KDU", detail: "Air Quality Prediction Using Machine Learning (RM Fernando, WMKS Ilmini, DU Vidanagama)" },
      { year: "2020", title: "National Best Quality Software Award – Tertiary (Undergraduate) Merit Award", detail: "Mobile app for automatic identification of snake types found in Sri Lanka using CNNs" },
      { year: "2019", title: "National Best Quality Software Award – Tertiary (Postgraduate) Merit Award", detail: "Personality Detector (WMKS Ilmini, TGI Fernando)" },
    ],
    memberships: [
      "Working Group Member, COST Action CA24121: Knowledge Graphs and Large Language Models (KGELL), WG1 (2026–present)",
      "Professional Member, IEEE (2017–present)",
      "Life Member, Sri Lanka Association for Artificial Intelligence (SLAAI) (2025–present)",
      "Professional Member, BCS, The Chartered Institute for IT (2021–2023)",
      "Professional Member, Computer Society of Sri Lanka (2018–2019)",
    ],
    publications: [
      {
        session: "Journal articles",
        items: [
          { title: "Explainable AI for critical care: A systematic review of interpretable models for sepsis and ICU mortality prediction. BMC Medical Informatics and Decision Making, 26(1):64, 2026", authors: "V. S. Athukorala, W. M. K. S. Ilmini" },
          { title: "Detection and explanation of apparent personality using deep learning: A short review of current approaches and future directions. Computing, 106(1):275–294, 2024", authors: "W. Ilmini, T. Fernando" },
          { title: "Exploring the impact of facial features on apparent personality traits detection using deep learning techniques. KDU Journal of Multidisciplinary Studies, 4(2), 2024", authors: "W. Ilmini, T. Fernando" },
          { title: "Explaining the outputs of CNN-RNN based apparent personality detection models using class activation maps. International Journal of Advanced Computer Science and Applications, 14(2), 2023", authors: "W. Ilmini, T. Fernando" },
          { title: "Performance analysis of state-of-the-art deep learning models in the visual-based apparent personality detection. Vidyodaya Journal of Science, 25(2), 2022", authors: "W. Ilmini, T. Fernando" },
          { title: "Prediction of air quality index in Colombo. International Journal of Research in Computing, 1, 2021", authors: "R. Fernando, W. Ilmini, D. Vidanagama" },
          { title: "Persons' personality traits recognition using machine learning algorithms and image processing techniques. Advances in Computer Science: an International Journal, 5(1), 2016", authors: "K. Ilmini, T. Fernando" },
        ],
      },
      {
        session: "Selected conference papers (34 in total)",
        items: [
          { title: "Ontology-based knowledge representation for recommending dietary guidelines to non-alcoholic fatty liver disease patients. SLAAI-ICAI 2025", authors: "A. A. Abeysekara, G. A. I. Uwanthika, W. M. K. S. Ilmini, G. R. N. N. Waidyarathna" },
          { title: "FITSTYLE: A GAN-based application revolutionizing online shopping by enhancing the virtual try-on experience. SCSE 2025", authors: "G. Divyanjalee, K. Ilmini, I. Uwanthika" },
          { title: "Explainable AI for transparent phishing email detection. ICATC 2024, IEEE", authors: "Y. Yakandawala, M. Madushanka, W. Ilmini" },
          { title: "Comparative analysis of diagnostic methods for differentiating Hodgkin lymphoma and non-Hodgkin lymphoma. 4th Student Symposium, Faculty of Computing, KDU, 2024", authors: "S. Serasinghe, G. Uwanthika, W. Ilmini" },
          { title: "Sign language translation techniques using artificial intelligence for the hearing impaired community in Sri Lanka: A review. SLAAI-ICAI 2023, IEEE", authors: "M. Priyankara, A. Gunasekara, K. Ilmini" },
          { title: "Facial feature identification in the deep learning based apparent personality detection. ICARC 2022, IEEE", authors: "W. Ilmini, T. Fernando" },
          { title: "Simultaneous detection of COVID-19 and its pneumonia using multitask learning. 15th International Research Conference, KDU, 2022", authors: "T. Nadeeshana, W. Ilmini" },
          { title: "Breast cancer detection using convolutional neural networks. 12th International Research Conference, KDU, 2019", authors: "P. Vinodi, W. Pemarathne, W. Ilmini, G. Senananyake" },
          { title: "Identification of snake species in Sri Lanka using convolutional neural networks. SLAAI 2019", authors: "S. Abayarathne, K. Ilmini, T. Fernando" },
          { title: "Computational personality traits assessment: A review. IEEE ICIIS 2017", authors: "K. Ilmini, T. Fernando" },
        ],
      },
      {
        session: "Preprints",
        items: [
          { title: "LLMs Working in Harmony: A Survey on the Technological Aspects of Building Effective LLM-Based Multi-Agent Systems, 2025", authors: "R. Aratchige, W. Ilmini" },
        ],
      },
    ],
    workshops: [],
    teaching: [
      "Postgraduate: Python for Data Science; Machine Learning I; Data Structures and Algorithms; Bioinformatics",
      "Undergraduate: Machine Learning; Machine Learning for Data Science; Programming for Data Science; Object-Oriented Programming; Automata Theory; Bioinformatics; Operational Research; Fundamentals of Programming; Social Aspects of Computing; Software Architecture and Design; Data Structures and Algorithms",
      "Supervision of numerous BSc, MSc and MPhil research projects in ML, DL and AI; final-year project coordination; curriculum development",
    ],
    activities: [
      "Senior Treasurer, Computer Science Student Association, University of Sri Jayewardenepura (2026–present)",
      "Head of the Department, Department of Computer Science, Faculty of Computing, KDU (2024)",
      "Chair, 4th Student Symposium, Faculty of Computing, KDU (2023–2024)",
      "Faculty Coordinator, 16th International Research Conference, Faculty of Computing, KDU (2023)",
      "Coordinator, Intelligent Research Laboratory, Faculty of Computing, KDU (2020–2024)",
      "Department Research Coordinator, Department of Computer Science, KDU (2022–2024)",
      "Final Year Project Coordinator, BSc Hons in Computer Science and Software Engineering, KDU (2018–2024)",
      "Level Coordinator (Level 3), LMS Coordinator and Competition Coordinator, KDU (2017–2024)",
      "Counsellor (2024) and Academic Advisor (2018–2024), IEEE Student Branch, KDU",
      "Resource Person, KDU Certificate in Teaching and Higher Education (2019–2023)",
      "Reviewer: KDU-IRC 2017–2026, SLAAI International Conference 2023–2026, ICAC 2023, ICARC 2023; journals including Clinical Interventions in Aging and Frontiers in Digital Health",
    ],
    service: [],
  },
  kumara: {
    fullName: "Dr. W. G. C. W. Kumara (Chinthaka)",
    headline: "Senior Lecturer (Grade I), Department of Computer Engineering, Faculty of Engineering, University of Sri Jayewardenepura",
    summary:
      "Senior Lecturer in Computer Engineering with a PhD in Computer Science and Information Engineering from National Central University, Taiwan, on 3D reconstruction with networks of RGB-D sensors. Experience in academia (department head roles at South Eastern University of Sri Lanka) and in industry in networking and telecommunications.",
    researchAreas: ["Image / Depth Processing", "3D Reconstruction (RGB-D)", "Robotics", "Automation", "Telecommunication Engineering"],
    links: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=j0-9s8cAAAAJ&hl=en" },
      { label: "ORCID", url: "https://orcid.org/0000-0002-4613-275X" },
      { label: "Web of Science", url: "https://www.webofscience.com/wos/author/record/AAU-8923-2021" },
      { label: "ResearchGate", url: "https://www.researchgate.net/profile/Wgcw-Kumara" },
    ],
    cv: { url: "/docs/CV_Dr_WGCW_Kumara.pdf", label: "CV_Dr_WGCW_Kumara.pdf", size: "167 KB" },
    appointments: [
      { period: "03.03.2026 – present", title: "Senior Lecturer (Grade I)", place: "Department of Computer Engineering, Faculty of Engineering, University of Sri Jayewardenepura" },
      { period: "01.07.2019 – 02.03.2026", title: "Senior Lecturer (Grade II 2019–2025, Grade I from 2025)", place: "Department of Computer Science and Engineering, Faculty of Engineering, South Eastern University of Sri Lanka", note: "6 years 8 months" },
      { period: "07.04.2025 – 02.03.2026", title: "Head, Department of Electrical and Telecommunication Engineering", place: "South Eastern University of Sri Lanka" },
      { period: "12.10.2023 – 02.08.2024", title: "Director, Industrial Training and Career Guidance Centre", place: "South Eastern University of Sri Lanka" },
      { period: "01.03.2023 – 30.06.2023", title: "Head, Department of Mechanical Engineering", place: "South Eastern University of Sri Lanka" },
      { period: "21.08.2019 – 20.08.2022", title: "Head, Department of Computer Science and Engineering", place: "South Eastern University of Sri Lanka" },
      { period: "2010 – 2017", title: "Lecturer, Department of Mechatronics Engineering", place: "South Asian Institute of Technology and Medicine (SAITM)", note: "01.01.2010 – 06.02.2011 and 03.10.2011 – 30.04.2017 (study leave 2012–2017)" },
      { period: "07.02.2011 – 30.09.2011", title: "Systems Engineer – Networking (Service Provider)", place: "KBSL Information Technologies Limited", note: "MPLS, WAN, VPN, Metro Ethernet, SBC, data centre" },
      { period: "16.05.2006 – 21.07.2007", title: "DSL Network Operation Engineer", place: "IP and Broadband Division, Sri Lanka Telecom PLC", note: "Project engineer for the country-wide 100,000-port ADSL expansion project" },
      { period: "2006", title: "After Sales Engineer", place: "ZTE Corporation, Sri Lanka", note: "Installation phase of the SLT CDMA project" },
    ],
    qualifications: [
      { year: "2018", title: "Ph.D. in Computer Science and Information Engineering (GPA 3.83)", detail: "National Central University, Taiwan (09.2012 – 01.2018). Thesis: Reconstruction of three-dimensional objects using a network of RGB-D sensors. Supervisor: Prof. Timothy K. Shih" },
      { year: "2009", title: "M.Eng. in Information and Communication Technology (GPA 3.60)", detail: "Asian Institute of Technology, Thailand (2007–2009). Thesis: Digital video streaming over a heterogeneous network. Supervisor: Prof. Kanchana Kanchanasut" },
      { year: "2006", title: "B.Sc.Eng. (Hons) in Electrical and Information Engineering (GPA 3.39), Second Class Upper Division", detail: "University of Ruhuna, Sri Lanka (2001–2006). Final-year project: co-channel interference in GSM networks. Supervisor: Dr. K. Pirapaharan" },
    ],
    memberships: [
      "Member, Institute of Electrical and Electronics Engineers (IEEE)",
      "Member, Institution of Engineers Sri Lanka (IESL)",
      "Member, Engineering Council of Sri Lanka (ECSL)",
      "Full Member, Young Scientists Forum (YSF), NASTEC, Sri Lanka",
      "Internet Society (ISOC)",
      "Asian Institute of Technology Alumni Association (AITAA)",
    ],
    publications: [],
    workshops: [],
    teaching: [],
    activities: [],
    service: [],
    referees: [
      { name: "Dr. Nishan Dharmaweera", lines: ["Dean, Faculty of Engineering", "University of Sri Jayewardenepura"], email: "nishanmd@sjp.ac.lk", phones: [] },
      { name: "Prof. M.A.L.A. Haleem", lines: ["Dean, Faculty of Engineering", "South Eastern University of Sri Lanka"], email: "mala_haleem@seu.ac.lk", phones: [] },
      { name: "Prof. Timothy K. Shih", lines: ["Dept. of Computer Science and Information Engineering", "National Central University, Taiwan"], email: "timothykshih@gmail.com", phones: [] },
      { name: "Prof. Kanchana Kanchanasut", lines: ["School of Engineering and Technology", "Asian Institute of Technology, Thailand"], email: "kk@cs.ait.ac.th", phones: [] },
    ],
  },
};
