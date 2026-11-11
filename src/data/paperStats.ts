// Summary numbers for the Research Paper Bank (used on the Overview page).
import data from "./papers.json";

type P = { id: string; venue: string; year: string; base?: string };
type G = { id: string; papers: P[] };
const groups = data as G[];

export type VenueType = "Journal" | "Conference" | "Preprint";

const PREPRINT = /arxiv|medrxiv|biorxiv|preprint|ssrn|research square/i;
const CONFERENCE =
  /conference|proceedings|workshop|symposium|neurips|nips|icml|iclr|miccai|cvpr|iccv|eccv|aaai|ijcai|chi\b|kdd|acl\b|emnlp|naacl|isbi|midl|lncs|ml4h|chil|uai\b|aistats|amia/i;

export function venueType(venue: string): VenueType {
  if (PREPRINT.test(venue)) return "Preprint";
  if (CONFERENCE.test(venue)) return "Conference";
  return "Journal";
}

const all = groups.flatMap((g) => g.papers.map((p) => ({ ...p, objective: g.id })));
const count = <T,>(xs: T[]) => xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map<T, number>());

const types = (["Journal", "Conference", "Preprint"] as VenueType[]).map((t) => ({
  type: t,
  n: all.filter((p) => venueType(p.venue) === t).length,
}));

const journals = [...count(all.filter((p) => venueType(p.venue) === "Journal").map((p) => p.venue))]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

const years = all.map((p) => Number(p.year)).filter(Boolean);

export const paperStats = {
  total: all.length,
  base: all.filter((p) => p.base).length,
  byObjective: groups.map((g) => ({
    id: g.id,
    n: g.papers.length,
    journal: g.papers.filter((p) => venueType(p.venue) === "Journal").length,
    conference: g.papers.filter((p) => venueType(p.venue) === "Conference").length,
    preprint: g.papers.filter((p) => venueType(p.venue) === "Preprint").length,
  })),
  types,
  journalCount: journals.length, // distinct journals
  topJournals: journals.slice(0, 8).map(([name, n]) => ({ name, n })),
  fromYear: Math.min(...years),
  toYear: Math.max(...years),
  since2021: all.filter((p) => Number(p.year) >= 2021).length,
};
