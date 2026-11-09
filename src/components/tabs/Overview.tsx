import { currentMonth, latestUpdate, phd } from "@/data/phd";
import { Label } from "../ui";
import { ShareLink } from "../deeplink";

export function Overview() {
  const month = currentMonth();
  const pct = Math.round((month / phd.durationMonths) * 100);

  return (
    <div>
      <Label>
        {phd.degree} · {phd.candidate}
      </Label>
      <h1 className="mt-4 max-w-5xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{phd.title}</h1>

      <div className="mt-10 grid gap-5 md:grid-cols-[1fr_18rem] md:gap-6">
        <div data-anchor="overview/latest" className="card-2d rounded-xl border border-black bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest">
            <span className="rounded-full border border-black bg-lavender px-3 py-1 text-black">Latest update</span>
            <span>{latestUpdate.date}</span>
            <span className="text-neutral-500">{latestUpdate.phase}</span>
          </div>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">{latestUpdate.text}</p>
          <ShareLink to="overview/latest" className="mt-4" />
        </div>

        <div data-anchor="overview/progress" className="card-2d rounded-xl border border-black bg-butter p-5 sm:p-6">
          <Label>Started {phd.startDate}</Label>
          <p className="mt-3 text-4xl font-bold">
            Month {month}
            <span className="text-lg font-normal text-neutral-500"> / {phd.durationMonths}</span>
          </p>
          <div className="mt-4 h-3 overflow-hidden rounded-full border border-black bg-white">
            <div className="h-full bg-mint" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 font-mono text-xs text-neutral-500">{pct}% of programme elapsed</p>
          <ShareLink to="overview/progress" className="mt-4" />
        </div>
      </div>
    </div>
  );
}
