import { objectives } from "@/data/phd";
import { PageHeader, pastels } from "../ui";
import { ShareLink } from "../deeplink";

export function Objectives() {
  return (
    <div>
      <PageHeader
        title="Research objectives"
        description="Four objectives, each answering one research question."
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
            <ShareLink to={`objectives/${o.id.toLowerCase()}`} className="mt-6 self-start" />
          </article>
        ))}
      </div>
    </div>
  );
}
