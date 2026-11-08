import { currentMonth, phd, timeline } from "@/data/phd";
import { PageHeader } from "../ui";

export function Timeline() {
  const total = phd.durationMonths;
  const now = currentMonth();
  const pos = (m: number) => `${((m - 1) / total) * 100}%`;

  return (
    <div>
      <PageHeader
        title="36-month plan"
        description={`Solid fill shows work done, hatching shows work planned. The vertical line is today (month ${now}).`}
      />

      {/* phone: one card per task */}
      <ul className="space-y-3 md:hidden">
        {timeline.map((t) => (
          <li key={t.id} className="rounded-xl border border-black bg-white p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-bold leading-snug">
                <span className="mr-2 font-mono font-normal text-neutral-500">{t.id}</span>
                {t.name}
              </p>
              <span className="shrink-0 font-mono text-sm">{t.progress}%</span>
            </div>
            <p className="mt-1 font-mono text-xs text-neutral-500">
              Month {t.start} – {t.end}
            </p>
            <div className="relative mt-3 h-4 overflow-hidden rounded-full border border-neutral-300">
              <div
                className="hatch absolute inset-y-0 border-x border-black"
                style={{ left: pos(t.start), width: `${((t.end - t.start + 1) / total) * 100}%` }}
              >
                <div className="h-full bg-mint" style={{ width: `${t.progress}%` }} />
              </div>
              <div className="absolute -inset-y-1 border-l-2 border-black" style={{ left: pos(now + 0.5) }} />
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-xl border border-black bg-white md:block">
        <div className="min-w-[820px]">
          <div className="grid grid-cols-[20rem_1fr] border-b border-black bg-lavender font-mono text-xs uppercase tracking-wider text-black">
            <div className="px-4 py-3">Task</div>
            <div className="grid grid-cols-3">
              {[1, 2, 3].map((y) => (
                <div key={y} className="border-l border-neutral-600 px-4 py-3">
                  Year {y}
                </div>
              ))}
            </div>
          </div>

          {timeline.map((t) => (
            <div key={t.id} className="grid grid-cols-[20rem_1fr] border-b border-neutral-200 last:border-b-0">
              <div className="flex items-center gap-3 px-4 py-3 text-sm">
                <span className="w-7 shrink-0 font-mono text-neutral-500">{t.id}</span>
                <span>{t.name}</span>
              </div>
              <div className="relative min-h-14 border-l border-black">
                <div className="absolute inset-y-0 left-1/3 border-l border-neutral-200" />
                <div className="absolute inset-y-0 left-2/3 border-l border-neutral-200" />
                <div
                  className="hatch absolute top-1/2 h-6 -translate-y-1/2 overflow-hidden rounded-full border border-black"
                  style={{ left: pos(t.start), width: `${((t.end - t.start + 1) / total) * 100}%` }}
                  title={`M${t.start}–M${t.end} · ${t.progress}%`}
                >
                  <div className="h-full bg-mint" style={{ width: `${t.progress}%` }} />
                </div>
                <div className="absolute inset-y-0 border-l-2 border-black" style={{ left: pos(now + 0.5) }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 hidden overflow-x-auto rounded-xl border border-black bg-white md:block">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-lavender text-left font-mono text-xs uppercase tracking-wider text-black">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Months</th>
              <th className="px-4 py-3 text-right">Progress</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((t) => (
              <tr key={t.id} className="border-t border-neutral-200">
                <td className="px-4 py-3 font-mono text-neutral-500">{t.id}</td>
                <td className="px-4 py-3">{t.name}</td>
                <td className="px-4 py-3 font-mono">
                  M{t.start}–M{t.end}
                </td>
                <td className="px-4 py-3 text-right font-mono">{t.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
