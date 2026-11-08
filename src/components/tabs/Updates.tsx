import { updates } from "@/data/phd";
import { PageHeader } from "../ui";

export function Updates() {
  return (
    <div>
      <PageHeader title="Progress log" description="What has been done, newest first." />

      <ol className="ml-1.5 max-w-3xl border-l-2 border-black">
        {[...updates].sort((a, b) => b.date.localeCompare(a.date)).map((u, i) => (
          <li key={i} className="relative pb-12 pl-8 last:pb-0">
            <span
              className={`absolute -left-[8px] top-1 h-3.5 w-3.5 border-2 border-black ${i === 0 ? "bg-lavender" : "bg-white"}`}
            />
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
              <span>{u.date}</span>
              <span className="rounded-xl border border-black bg-white px-2 py-0.5">{u.tag}</span>
            </div>
            <h3 className="mt-2 text-lg font-bold">{u.title}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-neutral-700">
              {u.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
