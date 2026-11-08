// Full supervisor profiles, keyed by the supervisor's slug in phd.ts.
// A supervisor without an entry here shows "Profile and CV coming soon".
// Put CV files in public/docs/ and set `cv` so they can be downloaded.

export type SupervisorProfile = {
  fullName: string;
  headline: string;
  officePhone?: string;
  homePhone?: string;
  homeAddress?: string[];
  general?: { label: string; value: string }[];
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
};
