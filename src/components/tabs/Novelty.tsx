import {
  applicationGaps,
  applicationNovelty,
  contributions,
  hypotheses,
  technicalGaps,
  technicalNovelty,
  type Point,
} from "@/data/novelty";
import { objectives } from "@/data/phd";
import { PageHeader } from "../ui";
import { ShareLink } from "../deeplink";

// Each list gets a short code prefix and an anchor; codes are AG1, TG1, ... by position.
const lists = [
  { prefix: "AG", anchor: "novelty/application-gaps", items: applicationGaps as Point[], kind: "gap" },
  { prefix: "TG", anchor: "novelty/technical-gaps", items: technicalGaps as Point[], kind: "gap" },
  { prefix: "AN", anchor: "novelty/application-novelty", items: applicationNovelty as Point[], kind: "novelty" },
  { prefix: "TN", anchor: "novelty/technical-novelty", items: technicalNovelty as Point[], kind: "novelty" },
  { prefix: "C", anchor: "novelty/contributions", items: contributions as Point[], kind: "contribution" },
] as const;

type Ref = { code: string; href: string; title: string; prefix: string };
const refs = new Map<string, Ref>();
for (const l of lists)
  l.items.forEach((p, i) =>
    refs.set(`${l.prefix}:${p.id}`, { code: `${l.prefix}${i + 1}`, href: `#${l.anchor}/${p.id}`, title: p.title, prefix: l.prefix }),
  );
const gapRef = (id: string) => refs.get(`AG:${id}`) ?? refs.get(`TG:${id}`);

const chipColor: Record<string, string> = { AG: "bg-rose", TG: "bg-peach", AN: "bg-mint", TN: "bg-sky", C: "bg-lavender" };

function Chip({ r }: { r: Ref }) {
  return (
    <a
      href={r.href}
      title={r.title}
      className={`rounded-md border border-black ${chipColor[r.prefix]} px-1.5 py-0.5 font-mono text-[11px] font-bold hover:bg-white`}
    >
      {r.code}
    </a>
  );
}

function Tags({ objectives }: { objectives: string[] }) {
  return (
    <span className="flex shrink-0 gap-1">
      {objectives.map((o) => (
        <a
          key={o}
          href={`#objectives/${o.toLowerCase()}`}
          className="rounded-full border border-black bg-white px-2 py-0.5 font-mono text-[11px] font-bold hover:bg-lavender"
        >
          {o}
        </a>
      ))}
    </span>
  );
}

function Links({ p }: { p: Point }) {
  if (!p.answers?.length && !p.tests?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/15 pt-3 text-xs">
      {!!p.answers?.length && (
        <span className="flex flex-wrap items-center gap-1">
          <span className="mr-1 font-mono uppercase tracking-widest text-neutral-500">Answers</span>
          {p.answers.map((id) => {
            const r = gapRef(id);
            return r ? <Chip key={id} r={r} /> : null;
          })}
        </span>
      )}
      {!!p.tests?.length && (
        <span className="flex flex-wrap items-center gap-1">
          <span className="mr-1 font-mono uppercase tracking-widest text-neutral-500">Tested by</span>
          {p.tests.map((h) => (
            <span key={h} title={hypotheses[h]} className="cursor-help rounded-md border border-black bg-butter px-1.5 py-0.5 font-mono text-[11px] font-bold">
              {h}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}

// One column: a labelled, coloured list (e.g. "Application gaps").
function Column({ kind, label, sub, color, items, anchor, prefix }: { kind: string; label: string; sub: string; color: string; items: Point[]; anchor: string; prefix: string }) {
  return (
    <div data-anchor={anchor} className={`card-2d rounded-xl border border-black ${color} p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">{kind}</p>
          <h3 className="mt-1 flex items-center gap-2 text-xl font-bold">
            {label}
            <span className="rounded-full border border-black bg-white px-2 py-0.5 font-mono text-xs">{items.length}</span>
          </h3>
          <p className="mt-1 text-sm text-neutral-700">{sub}</p>
        </div>
        <ShareLink to={anchor} label="" className="px-2" />
      </div>
      <ol className="mt-5 space-y-3">
        {items.map((p, i) => (
          <li key={p.id} data-anchor={`${anchor}/${p.id}`} className="rounded-xl border border-black bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold leading-snug">
                <span className="mr-2 font-mono text-neutral-500">
                  {prefix}
                  {i + 1}
                </span>
                {p.title}
              </p>
              <Tags objectives={p.objectives} />
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{p.text}</p>
            <Links p={p} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Part({ n, title, intro, children }: { n: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <div className="mb-5 flex items-baseline gap-3 border-b border-black pb-3">
        <span className="font-mono text-2xl font-bold">{n}</span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="mt-1 text-neutral-600">{intro}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

// Part 4: for each objective, every item tagged with it.
function ObjectiveMap() {
  const cols = lists.map((l) => ({ ...l, label: { AG: "Application gaps", TG: "Technical gaps", AN: "Application novelty", TN: "Technical novelty", C: "Contributions" }[l.prefix] }));
  return (
    <div data-anchor="novelty/map" className="card-2d overflow-x-auto rounded-xl border border-black bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-black bg-cream">
            <th className="p-3 font-mono text-xs uppercase tracking-widest">Objective</th>
            {cols.map((c) => (
              <th key={c.prefix} className="p-3 font-mono text-xs uppercase tracking-widest">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {objectives.map((o) => (
            <tr key={o.id} className="border-b border-black/15 align-top last:border-0">
              <td className="p-3">
                <a href={`#objectives/${o.id.toLowerCase()}`} className="font-bold hover:underline">
                  {o.id}
                </a>{" "}
                <span className="text-neutral-700">{o.short}</span>
              </td>
              {cols.map((c) => (
                <td key={c.prefix} className="p-3">
                  <span className="flex flex-wrap gap-1">
                    {c.items
                      .filter((p) => p.objectives.includes(o.id))
                      .map((p) => (
                        <Chip key={p.id} r={refs.get(`${c.prefix}:${p.id}`)!} />
                      ))}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Novelty() {
  return (
    <div>
      <PageHeader
        title="Research gaps, novelty and contributions"
        description="What is missing today, what this PhD does that is new, and what it will deliver. Application = the clinical and real-world side (hospitals, clinicians, Sri Lanka). Technical = the methods side (algorithms, models, evaluation). Each item has a short code; O tags link to its objective, and the last part maps everything by objective."
      />

      <Part n="1" title="Research gaps" intro="What existing work and practice do not yet provide. Each gap is addressed by one or more objectives.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Column kind="Gap · clinical side" label="Application gaps" sub="Problems in real hospitals and for Sri Lanka." color="bg-rose" items={applicationGaps} anchor="novelty/application-gaps" prefix="AG" />
          <Column kind="Gap · methods side" label="Technical gaps" sub="Limits of current algorithms and evaluation." color="bg-peach" items={technicalGaps} anchor="novelty/technical-gaps" prefix="TG" />
        </div>
      </Part>

      <Part n="2" title="Novelty" intro="What this research does that has not been done before. Each item names the gaps it answers and, where relevant, the hypothesis that tests it (hover for the wording).">
        <div className="grid gap-6 lg:grid-cols-2">
          <Column kind="Novelty · clinical side" label="Application novelty" sub="New for the clinical setting and its users." color="bg-mint" items={applicationNovelty} anchor="novelty/application-novelty" prefix="AN" />
          <Column kind="Novelty · methods side" label="Technical novelty" sub="New in the methods and their evaluation." color="bg-sky" items={technicalNovelty} anchor="novelty/technical-novelty" prefix="TN" />
        </div>
      </Part>

      <Part n="3" title="Contributions" intro="What the thesis will deliver, and where each one is reported.">
        <div data-anchor="novelty/contributions" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contributions.map((c) => (
            <article key={c.id} data-anchor={`novelty/contributions/${c.id}`} className="card-2d flex flex-col rounded-xl border border-black bg-lavender p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold leading-snug">{c.title}</h3>
                <Tags objectives={c.objectives} />
              </div>
              <p className="mt-3 text-[15px] leading-relaxed">{c.text}</p>
              <p className="mt-auto border-t border-black/20 pt-3 font-mono text-xs text-neutral-700">
                <span className="mt-3 block uppercase tracking-widest text-neutral-500">Output</span>
                {c.output}
              </p>
            </article>
          ))}
        </div>
      </Part>

      <Part n="4" title="Map by objective" intro="Every gap, novelty and contribution grouped under the objective it belongs to. Codes link to the item.">
        <ObjectiveMap />
      </Part>
    </div>
  );
}
