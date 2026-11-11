import {
  applicationGaps,
  applicationNovelty,
  contributions,
  technicalGaps,
  technicalNovelty,
  type Point,
} from "@/data/novelty";
import { PageHeader } from "../ui";
import { ShareLink } from "../deeplink";

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

// One column: a labelled, coloured list (e.g. "Application gap").
function Column({ kind, label, sub, color, items, anchor }: { kind: string; label: string; sub: string; color: string; items: Point[]; anchor: string }) {
  return (
    <div data-anchor={anchor} className={`card-2d rounded-xl border border-black ${color} p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">{kind}</p>
          <h3 className="mt-1 text-xl font-bold">{label}</h3>
          <p className="mt-1 text-sm text-neutral-700">{sub}</p>
        </div>
        <ShareLink to={anchor} label="" className="px-2" />
      </div>
      <ol className="mt-5 space-y-3">
        {items.map((p, i) => (
          <li key={p.id} data-anchor={`${anchor}/${p.id}`} className="rounded-xl border border-black bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold leading-snug">
                <span className="mr-2 font-mono text-neutral-500">{i + 1}.</span>
                {p.title}
              </p>
              <Tags objectives={p.objectives} />
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{p.text}</p>
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

export function Novelty() {
  return (
    <div>
      <PageHeader
        title="Research gaps, novelty and contributions"
        description="What is missing today, what this PhD does that is new, and what it will deliver. Application = the clinical and real-world side (hospitals, clinicians, Sri Lanka). Technical = the methods side (algorithms, models, evaluation). Tags link to the objective each point belongs to."
      />

      <Part n="1" title="Research gaps" intro="What existing work and practice do not yet provide.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Column kind="Gap · clinical side" label="Application gaps" sub="Problems in real hospitals and for Sri Lanka." color="bg-rose" items={applicationGaps} anchor="novelty/application-gaps" />
          <Column kind="Gap · methods side" label="Technical gaps" sub="Limits of current algorithms and evaluation." color="bg-peach" items={technicalGaps} anchor="novelty/technical-gaps" />
        </div>
      </Part>

      <Part n="2" title="Novelty" intro="What this research does that has not been done before.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Column kind="Novelty · clinical side" label="Application novelty" sub="New for the clinical setting and its users." color="bg-mint" items={applicationNovelty} anchor="novelty/application-novelty" />
          <Column kind="Novelty · methods side" label="Technical novelty" sub="New in the methods and their evaluation." color="bg-sky" items={technicalNovelty} anchor="novelty/technical-novelty" />
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
    </div>
  );
}
