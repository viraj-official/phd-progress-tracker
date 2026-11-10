import { useEffect, useRef, useState } from "react";
import { PdfButton, PdfPages } from "../PdfViewer";
import data from "@/data/papers.json";
import { objectives } from "@/data/phd";
import { asset, pastels } from "../ui";

export type Paper = {
  id: string;
  title: string;
  authors: string;
  year: string;
  venue: string;
  aim: string;
  method: string;
  result: string;
  tools: string;
  gap: string;
  relation: string;
  limitations: string;
  link: string;
  pdf: string;
  pdfUrl: string;
  openAccess?: string;
  base?: string;
  notes?: string;
  fullText?: string;
  methodologyDetail?: string;
  studyDesign?: string;
  datasets?: string;
  preprocessing?: string;
  modelDetails?: string;
  training?: string;
  evaluation?: string;
  baselines?: string;
  results?: string;
  statistics?: string;
  availability?: string;
};
export type Group = { id: string; folder: string; heading: string; papers: Paper[] };

export const objectiveGroups = data as Group[];
const total = objectiveGroups.reduce((n, g) => n + g.papers.length, 0);
// Extra tab listing the base papers (the main papers this PhD builds on) from every objective.
const baseGroup: Group = {
  id: "BASE",
  folder: "00_Base_Papers",
  heading: "Base papers: the main papers this PhD builds on, across all four objectives.",
  papers: objectiveGroups.flatMap((g) => g.papers.filter((p) => p.base)),
};
const groups = [...objectiveGroups, baseGroup];
const shortName = (id: string) => (id === "BASE" ? "Base papers" : objectives.find((o) => o.id === id)?.short ?? "");

const DETAIL_FIELDS: [keyof Paper, string][] = [
  ["aim", "Aim of the paper"],
  ["method", "Method used"],
  ["result", "End result"],
  ["tools", "Technology / tools used"],
  ["gap", "Remaining work (gap)"],
  ["limitations", "Limitations & future work"],
];

// Detailed research methodology, extracted from the full text of each paper.
const METHOD_FIELDS: [keyof Paper, string][] = [
  ["studyDesign", "Study design & setting"],
  ["datasets", "Datasets & sample size"],
  ["preprocessing", "Preprocessing & data split"],
  ["modelDetails", "Model / method details"],
  ["training", "Training settings & values"],
  ["evaluation", "Evaluation protocol & metrics"],
  ["baselines", "Baselines compared"],
  ["results", "Key quantitative results"],
  ["statistics", "Statistical analysis"],
  ["availability", "Code / data availability"],
];

type Props = { path: string[]; go: (p: string[]) => void; embedded?: boolean };

const PAGE_SIZE = 12;

const matches = (p: Paper, q: string) =>
  !q || `${p.id} ${p.title} ${p.authors} ${p.venue} ${p.year}`.toLowerCase().includes(q.toLowerCase());

// Page numbers to show: first, last and the pages next to the current one; 0 marks a gap.
function pageList(page: number, pages: number): number[] {
  const keep = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
  const out: number[] = [];
  [...keep].sort((a, b) => a - b).forEach((n, i, arr) => {
    if (i > 0 && n - arr[i - 1] > 1) out.push(0);
    out.push(n);
  });
  return out;
}

export function PaperBank({ path, go, embedded }: Props) {
  const [onlyBase, setOnlyBase] = useState(false);
  const [query, setQuery] = useState("");
  const group = groups.find((g) => g.id === path[0]) ?? groups[0];
  const index = group.papers.findIndex((p) => p.id === path[1]);

  // Once the header sticks under the nav, shrink it to a single row of objective chips.
  const sentinel = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = sentinel.current;
      const navH = document.querySelector("nav")?.getBoundingClientRect().height ?? 56;
      setCompact(!!el && el.getBoundingClientRect().top < navH);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [index]);

  if (index >= 0) return <PaperReader group={group} index={index} go={go} />;

  // list URL: #papers/O1 or #papers/O1/page/2
  const list = (onlyBase ? group.papers.filter((p) => p.base) : group.papers).filter((p) => matches(p, query));
  const baseCount = group.papers.filter((p) => p.base).length;
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const page = Math.min(Math.max(path[1] === "page" ? Number(path[2]) || 1 : 1, 1), pages);
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const goPage = (n: number) => go(n === 1 ? [group.id] : [group.id, "page", String(n)]);

  return (
    <div>
      {/* marker: when it scrolls behind the nav, the header goes compact */}
      <div ref={sentinel} aria-hidden className={embedded ? "" : "-mt-10 sm:-mt-14"} />
      {/* sticky title + objective selector */}
      <div
        className={`sticky top-[var(--nav-h)] z-20 -mx-5 border-b border-black bg-white px-5 sm:-mx-8 sm:px-8 ${
          compact ? "py-2" : "pt-6 pb-4 sm:pt-8"
        }`}
      >
        {!compact && (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Research Paper Bank</h2>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">{total} papers</span>
            </div>
            <p className="mt-1 hidden text-neutral-600 sm:block">
              Open-access papers for each objective, each with a downloadable PDF. Choose a paper to read its notes and the PDF.
            </p>
          </>
        )}

        <div className={`grid grid-cols-5 ${compact ? "gap-2" : "mt-4 gap-2 sm:gap-3"}`}>
          {groups.map((g, gi) => {
            const on = g.id === group.id;
            return (
              <button
                key={g.id}
                onClick={() => go([g.id])}
                aria-pressed={on}
                title={shortName(g.id)}
                className={`min-w-0 rounded-xl border border-black text-left transition-colors ${
                  compact ? "px-2 py-1 sm:px-3" : "px-2 py-2 sm:px-4 sm:py-3"
                } ${on ? `card-2d ${pastels[gi % 6]}` : "bg-white hover:bg-neutral-100"}`}
              >
                <span className="flex flex-wrap items-baseline justify-between gap-x-2 font-mono text-sm font-bold">
                  {g.id === "BASE" ? "★ Base" : g.id}
                  <span className="text-xs font-normal opacity-60">{g.papers.length}</span>
                </span>
                {!compact && <span className="mt-1 hidden text-sm leading-snug opacity-80 md:block">{shortName(g.id)}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-6 mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <p className="leading-relaxed text-neutral-600">{group.heading}</p>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (page > 1) go([group.id]);
            }}
            placeholder={`Search ${group.id === "BASE" ? "base papers" : group.id}…`}
            aria-label="Search papers"
            className="w-full rounded-xl border border-black bg-white px-3 py-2 font-mono text-sm sm:w-64"
          />
          {group.id !== "BASE" && (
            <label className="flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-wider">
              <button
                type="button"
                role="switch"
                aria-checked={onlyBase}
                onClick={() => {
                  setOnlyBase((v) => !v);
                  if (page > 1) go([group.id]);
                }}
                className={`relative h-6 w-11 shrink-0 rounded-full border border-black transition-colors ${onlyBase ? "bg-butter" : "bg-neutral-200"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-full border border-black bg-white transition-transform ${
                    onlyBase ? "translate-x-5" : ""
                  }`}
                />
              </button>
              Only base papers ({baseCount})
            </label>
          )}
          <p className="font-mono text-xs text-neutral-500">
            {list.length ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, list.length)} of ${list.length}` : "0 papers"}
          </p>
        </div>
      </div>
      {!list.length && (
        <p className="rounded-xl border border-dashed border-neutral-400 p-10 text-center text-neutral-500">
          {query ? "No papers match your search." : "No base papers in this objective yet."}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {shown.map((p) => (
          <div
            key={p.id}
            className={`flex min-w-0 flex-col overflow-hidden rounded-xl border border-black break-words ${
              p.base ? "card-2d bg-butter" : "bg-white"
            }`}
          >
          <button
            onClick={() => go([group.id, p.id])}
            className="flex flex-1 flex-col p-5 text-left transition-colors hover:bg-lavender hover:text-black sm:p-6"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold">{p.id}</span>
              <span className="flex items-center gap-2">
                {p.base && <span className="rounded-full border border-black bg-white px-2 py-0.5 font-bold">★ Base</span>}
                <span className="opacity-60">{p.year}</span>
              </span>
            </div>
            <p className="mt-3 text-[17px] font-bold leading-snug">{p.title}</p>
            <p className="mt-2 line-clamp-1 text-xs opacity-60">{p.authors}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed opacity-80">{p.aim}</p>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-current/20 pt-4 font-mono text-xs">
              <span className="truncate opacity-60">{p.venue}</span>
              <span className="whitespace-nowrap">Read →</span>
            </div>
          </button>
          {p.pdfUrl && (
            <a
              href={asset(p.pdfUrl)}
              download={p.pdf}
              className="border-t border-black px-5 py-2.5 text-center font-mono text-xs hover:bg-lavender sm:px-6"
            >
              ↓ Download PDF
            </a>
          )}
          </div>
        ))}
      </div>

      {pages > 1 && (
        <nav aria-label="Pages" className="mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-sm">
          <button
            onClick={() => goPage(page - 1)}
            disabled={page === 1}
            className="rounded-xl border border-black bg-white px-3 py-2 hover:bg-lavender hover:text-black disabled:border-neutral-300 disabled:text-neutral-300 disabled:hover:bg-white"
          >
            ← Prev
          </button>
          {pageList(page, pages).map((n, i) =>
            n === 0 ? (
              <span key={`gap${i}`} className="px-1 text-neutral-500">
                …
              </span>
            ) : (
            <button
              key={n}
              onClick={() => goPage(n)}
              aria-current={n === page ? "page" : undefined}
              className={`h-10 w-10 rounded-xl border border-black ${n === page ? "bg-lavender text-black" : "hover:bg-neutral-100"}`}
            >
              {n}
            </button>
            ),
          )}
          <button
            onClick={() => goPage(page + 1)}
            disabled={page === pages}
            className="rounded-xl border border-black bg-white px-3 py-2 hover:bg-lavender hover:text-black disabled:border-neutral-300 disabled:text-neutral-300 disabled:hover:bg-white"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}

/* ---------- reader: notes on the left, PDF on the right, both fixed to the screen ---------- */

function PaperReader({ group, index, go }: { group: Group; index: number; go: (p: string[]) => void }) {
  const p = group.papers[index];
  const prev = group.papers[index - 1];
  const next = group.papers[index + 1];
  const listPage = Math.floor(index / PAGE_SIZE) + 1;
  const backToList = () => go(listPage === 1 ? [group.id] : [group.id, "page", String(listPage)]);

  return (
    <div className="lg:grid lg:h-[calc(100dvh-var(--nav-h))] lg:grid-cols-[minmax(26rem,2fr)_3fr]">
      {/* notes */}
      <aside className="flex min-h-0 flex-col lg:border-r-2 lg:border-black">
        {/* reader toolbar */}
        <div className="sticky top-[var(--nav-h)] z-10 flex items-center justify-between gap-2 border-b border-black bg-white px-5 py-3 sm:px-8 lg:static">
          <button
            onClick={backToList}
            className="font-mono text-xs uppercase tracking-wider hover:underline"
          >
            ← {group.id} list
          </button>
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              disabled={!prev}
              onClick={() => prev && go([group.id, prev.id])}
              className="rounded-xl border border-black bg-white px-2.5 py-1.5 hover:bg-lavender hover:text-black disabled:border-neutral-300 disabled:text-neutral-300 disabled:hover:bg-white"
              aria-label="Previous paper"
            >
              ← Prev
            </button>
            <span className="px-2 text-neutral-500">
              {index + 1}/{group.papers.length}
            </span>
            <button
              disabled={!next}
              onClick={() => next && go([group.id, next.id])}
              className="rounded-xl border border-black bg-white px-2.5 py-1.5 hover:bg-lavender hover:text-black disabled:border-neutral-300 disabled:text-neutral-300 disabled:hover:bg-white"
              aria-label="Next paper"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="flex-1 px-5 py-8 sm:px-8 lg:overflow-y-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            {p.id} · {p.year}
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-tight">{p.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{p.authors}</p>
          <p className="mt-1 text-sm italic text-neutral-600">{p.venue}</p>
          {p.base && (
            <p className="mt-3 inline-block rounded-full border border-black bg-butter px-3 py-1 font-mono text-xs font-bold">
              ★ {p.base}
            </p>
          )}
          {p.notes && <p className="mt-2 text-sm text-neutral-600">Note: {p.notes}</p>}

          <div className="mt-6 flex flex-wrap gap-2 font-mono text-sm">
            {p.pdfUrl && (
              <PdfButton
                url={p.pdfUrl}
                title={p.title}
                className="flex-1 rounded-xl border border-black bg-lavender px-4 py-2.5 text-center text-black hover:bg-white hover:text-black sm:flex-none"
              >
                ▸ View PDF
              </PdfButton>
            )}
            {p.pdfUrl && (
              <a
                href={asset(p.pdfUrl)}
                download={p.pdf}
                className="flex-1 rounded-xl border border-black bg-white px-4 py-2.5 text-center hover:bg-lavender hover:text-black sm:flex-none"
              >
                ↓ Download
              </a>
            )}
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-xl border border-black bg-white px-4 py-2.5 text-center hover:bg-lavender hover:text-black sm:flex-none"
              >
                Source ↗
              </a>
            )}
          </div>

          {p.relation && (
            <section className="mt-8 rounded-xl border border-black bg-lavender p-5 text-black">
              <p className="font-mono text-xs uppercase tracking-widest opacity-70">How it relates to our project</p>
              <p className="mt-3 leading-7">{p.relation}</p>
            </section>
          )}

          {(p.methodologyDetail || METHOD_FIELDS.some(([k]) => p[k])) && (
            <section className="mt-8 rounded-xl border border-black bg-mint/40 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">
                Research methodology in detail{p.fullText === "Abstract only" ? " · from abstract only" : ""}
              </p>
              {p.methodologyDetail && <p className="mt-3 text-[15px] leading-7">{p.methodologyDetail}</p>}
              <dl className="mt-4">
                {METHOD_FIELDS.filter(([k]) => p[k]).map(([k, label]) => (
                  <div key={k} className="border-t border-black/15 py-4">
                    <dt className="font-mono text-xs uppercase tracking-widest text-neutral-600">{label}</dt>
                    <dd className="mt-1.5 whitespace-pre-line text-[15px] leading-7">{p[k]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <dl className="mt-8">
            {DETAIL_FIELDS.map(([k, label]) => (
              <div key={k} className="border-t border-neutral-300 py-5 first:border-t-0 first:pt-0">
                <dt className="font-mono text-xs uppercase tracking-widest text-neutral-500">{label}</dt>
                <dd className="mt-2 text-[15px] leading-7">{p[k] || <span className="text-neutral-400">—</span>}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      {/* PDF: desktop only — phones open the PDF in their own viewer */}
      <section className="hidden min-h-0 bg-neutral-100 lg:block">
        {p.pdfUrl ? (
          <div key={p.pdfUrl} className="h-full overflow-auto"><PdfPages url={p.pdfUrl} /></div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center text-neutral-600">
            <p>This paper is not open access, so its PDF is not hosted here.</p>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="rounded-xl border border-black bg-white px-4 py-2.5 font-mono text-sm hover:bg-lavender">
                Read it at the publisher ↗
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
