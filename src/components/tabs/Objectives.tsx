import { objectives } from "@/data/phd";
import { PageHeader, pastels } from "../ui";
import { ShareLink } from "../deeplink";
import { objectiveGroups } from "./PaperBank";

const paperCount = (id: string) => objectiveGroups.find((g) => g.id === id)?.papers.length ?? 0;

export function Objectives() {
  return (
    <div>
      <PageHeader
        title="Research objectives"
        description="Four objectives, each answering one research question. The papers for each objective are in the Paper Bank tab."
      />

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {objectives.map((o, i) => (
          <article key={o.id} data-anchor={`objectives/${o.id.toLowerCase()}`} className={`card-2d flex flex-col rounded-xl border border-black p-6 sm:p-8 ${pastels[i % 6]}`}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-3xl font-bold">{o.id}</span>
              <h3 className="text-lg font-bold leading-snug">{o.short}</h3>
            </div>
            <p className="mt-5 leading-relaxed">{o.text}</p>
            <div className="mt-6 border-t border-black/20 pt-5">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">
                Research question {o.id.slice(1)}
              </p>
              <p className="mt-2 leading-relaxed text-neutral-700 italic">{o.rq}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`#papers/${o.id}`}
                className="rounded-xl border border-black bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-neutral-100"
              >
                {o.id} papers ({paperCount(o.id)}) in Paper Bank →
              </a>
              <ShareLink to={`objectives/${o.id.toLowerCase()}`} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
