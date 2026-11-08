import data from "@/data/papers.json";
import { objectives } from "@/data/phd";
import { pastels, asset } from "../ui";

type Paper = {
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
type Group = { id: string; folder: string; heading: string; papers: Paper[] };

const groups = data as Group[];
const total = groups.reduce((n, g) => n + g.papers.length, 0);
const shortName = (id: string) => objectives.find((o) => o.id === id)?.short ?? "";

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

type Props = { path: string[]; go: (p: string[]) => void };

const PAGE_SIZE = 6;

export function PaperBank({ path, go }: Props) {
  const group = groups.find((g) => g.id === path[0]) ?? groups[0];
  const index = group.papers.findIndex((p) => p.id === path[1]);

  if (index >= 0) return <PaperReader group={group} index={index} go={go} />;

  // list URL: #papers/O1 or #papers/O1/page/2
  const pages = Math.max(1, Math.ceil(group.papers.length / PAGE_SIZE));
  const page = Math.min(Math.max(path[1] === "page" ? Number(path[2]) || 1 : 1, 1), pages);
  const shown = group.papers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const goPage = (n: number) => go(n === 1 ? [group.id] : [group.id, "page", String(n)]);

  return (
    <div>
      {/* sticky title + objective selector */}
      <div className="sticky top-[var(--nav-h)] z-20 -mx-5 -mt-10 border-b border-black bg-white px-5 pt-6 pb-4 sm:-mx-8 sm:-mt-14 sm:px-8 sm:pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-xl font-bold tracking-tight sm:text-3xl">Research Paper Bank</h2>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">{total} papers</span>
        </div>
        <p className="mt-1 hidden text-neutral-600 sm:block">
          Core papers for each objective, with review notes. Choose a paper to read its notes and the PDF.
        </p>

        <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
          {groups.map((g, gi) => {
            const on = g.id === group.id;
            return (
              <button
                key={g.id}
                onClick={() => go([g.id])}
                aria-pressed={on}
                className={`min-w-0 rounded-xl border border-black px-2 py-2 text-left transition-colors sm:px-4 sm:py-3 ${
                  on ? `card-2d ${pastels[gi % 6]}` : "bg-white hover:bg-neutral-100"
                }`}
              >
                <span className="flex flex-wrap items-baseline justify-between gap-x-2 font-mono text-sm font-bold">
                  {g.id}
                  <span className="text-xs font-normal opacity-60">{g.papers.length}</span>
                </span>
                <span className="mt-1 hidden text-sm leading-snug opacity-80 md:block">{shortName(g.id)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <p className="leading-relaxed text-neutral-600">{group.heading}</p>
        <p className="font-mono text-xs text-neutral-500">
          {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, group.papers.length)} of {group.papers.length}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {shown.map((p) => (
          <button
            key={p.id}
            onClick={() => go([group.id, p.id])}
            className="flex min-w-0 flex-col rounded-xl border border-black bg-white p-5 text-left break-words transition-colors hover:bg-lavender hover:text-black sm:p-6"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold">{p.id}</span>
              <span className="opacity-60">{p.year}</span>
            </div>
            <p className="mt-3 text-[17px] font-bold leading-snug">{p.title}</p>
            <p className="mt-2 line-clamp-1 text-xs opacity-60">{p.authors}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed opacity-80">{p.aim}</p>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-current/20 pt-4 font-mono text-xs">
              <span className="truncate opacity-60">{p.venue}</span>
              <span className="whitespace-nowrap">Read →</span>
            </div>
          </button>
        ))}
      </div>

      {pages > 1 && (
        <nav aria-label="Pages" className="mt-10 flex items-center justify-center gap-2 font-mono text-sm">
          <button
            onClick={() => goPage(page - 1)}
            disabled={page === 1}
            className="rounded-xl border border-black bg-white px-3 py-2 hover:bg-lavender hover:text-black disabled:border-neutral-300 disabled:text-neutral-300 disabled:hover:bg-white"
          >
            ← Prev
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => goPage(n)}
              aria-current={n === page ? "page" : undefined}
              className={`h-10 w-10 rounded-xl border border-black ${n === page ? "bg-lavender text-black" : "hover:bg-neutral-100"}`}
            >
              {n}
            </button>
          ))}
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

          <div className="mt-6 flex flex-wrap gap-2 font-mono text-sm">
            {p.pdfUrl && (
              <a
                href={asset(p.pdfUrl)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-xl border border-black bg-lavender px-4 py-2.5 text-center text-black hover:bg-white hover:text-black sm:flex-none"
              >
                Open PDF ↗
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
          <iframe key={p.pdfUrl} src={asset(p.pdfUrl)} title={p.title} className="h-full w-full" />
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
