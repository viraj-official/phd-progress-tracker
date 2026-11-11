import { currentMonth, latestUpdate, objectives, phd, supervisors } from "@/data/phd";
import { documents, type Status } from "@/data/documents";
import { meetings } from "@/data/logbook";
import { todos } from "@/data/todo";
import { paperStats } from "@/data/paperStats";
import { Label, pastels } from "../ui";
import { ShareLink } from "../deeplink";
import { StatusMark } from "./Documents";

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const doc = (id: string) => documents.find((d) => d.id === id)!;

// A card heading with a link to the full page and a share button.
function CardHead({ title, href, anchor }: { title: string; href: string; anchor: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-lg font-bold">{title}</h3>
      <span className="flex items-center gap-2">
        <ShareLink to={anchor} label="" className="px-2" />
        <a href={`#${href}`} className="font-mono text-xs uppercase tracking-wider underline underline-offset-4 hover:no-underline">
          Open →
        </a>
      </span>
    </div>
  );
}

function Bar({ pct, color = "bg-mint" }: { pct: number; color?: string }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full border border-black bg-white">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------- ethics ---------- */
function Ethics() {
  const apps = [doc("ethics-kdu"), doc("ethics-usj")];
  return (
    <div data-anchor="overview/ethics" className="card-2d rounded-xl border border-black bg-white p-5 sm:p-6">
      <CardHead title="Ethics approval" href="documents/ethics-kdu" anchor="overview/ethics" />
      <ul className="mt-4 space-y-4">
        {apps.map((d) => {
          const next = d.parts.find((p) => p.status !== "done");
          return (
            <li key={d.id} className="flex gap-3">
              <span className="pt-1">
                <StatusMark status={d.status} size={20} />
              </span>
              <div className="min-w-0">
                <p className="font-bold leading-snug">{d.title.replace("Ethics Application — ", "")}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
                  <span className={`rounded-xl border border-black px-2 py-0.5 ${d.status === "waiting" ? "bg-butter" : "bg-rose"}`}>
                    {d.statusText}
                  </span>
                  {d.status === "waiting" && d.date && <span className="text-neutral-500">Submitted {fmt(d.date)}</span>}
                </p>
                {next && (
                  <p className="mt-1.5 text-sm text-neutral-600">
                    Next: {next.name}
                    {next.note && ` · ${next.note}`}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- first progress review ---------- */
function ProgressReview() {
  const d = doc("progress-review-1");
  const done = d.parts.filter((p) => p.status === "done");
  const left = d.parts.filter((p) => p.status !== "done");
  const pct = Math.round((done.length / d.parts.length) * 100);
  return (
    <div data-anchor="overview/progress-review" className="card-2d rounded-xl border border-black bg-white p-5 sm:p-6">
      <CardHead title="First progress review" href="documents/progress-review-1" anchor="overview/progress-review" />
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-neutral-500">
        Due {fmt(d.date!)} · {done.length}/{d.parts.length} parts done
      </p>
      <div className="mt-3">
        <Bar pct={pct} />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <Label>Done</Label>
          <ul className="mt-2 space-y-2">
            {done.map((p) => (
              <li key={p.name} className="flex gap-2 text-[15px] leading-snug">
                <span className="pt-0.5">
                  <StatusMark status="done" size={14} />
                </span>
                {p.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>Pending</Label>
          <ul className="mt-2 space-y-2">
            {left.map((p) => (
              <li key={p.name} className="flex gap-2 text-[15px] leading-snug text-neutral-600">
                <span className="pt-0.5">
                  <StatusMark status={p.status} size={14} />
                </span>
                {p.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- paper bank ---------- */
function Papers() {
  const s = paperStats;
  const max = Math.max(...s.byObjective.map((o) => o.n));
  return (
    <div data-anchor="overview/papers" className="card-2d rounded-xl border border-black bg-white p-5 sm:p-6">
      <CardHead title="Research papers" href="papers" anchor="overview/papers" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { k: "Papers", v: s.total },
          { k: "Journals", v: s.journalCount, sub: "distinct titles" },
          { k: "Base papers", v: s.base },
          { k: "Published", v: `${s.fromYear}–${s.toYear}`, sub: `${s.since2021} from 2021 on` },
        ].map((x) => (
          <div key={x.k} className="rounded-xl border border-black bg-neutral-50 p-3">
            <Label>{x.k}</Label>
            <p className="mt-1 text-2xl font-bold">{x.v}</p>
            {x.sub && <p className="font-mono text-[11px] text-neutral-500">{x.sub}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <Label>By objective</Label>
          <ul className="mt-3 space-y-3">
            {s.byObjective.map((o, i) => (
              <li key={o.id}>
                <a href={`#papers/${o.id}`} className="group block">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate group-hover:underline">
                      <span className="font-mono font-bold">{o.id}</span> {objectives.find((x) => x.id === o.id)?.short}
                    </span>
                    <span className="shrink-0 font-mono font-bold">{o.n}</span>
                  </div>
                  <div className="mt-1 h-3 overflow-hidden rounded-full border border-black bg-white">
                    <div className={`h-full ${pastels[i % 6]}`} style={{ width: `${(o.n / max) * 100}%` }} />
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-neutral-500">
                    {o.journal} journal · {o.conference} conference · {o.preprint} preprint
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label>By type of publication</Label>
          <div className="mt-3 flex h-4 overflow-hidden rounded-full border border-black">
            {s.types.map((t, i) => (
              <div key={t.type} className={`${["bg-sky", "bg-peach", "bg-butter"][i]} ${i ? "border-l border-black" : ""}`} style={{ width: `${(t.n / s.total) * 100}%` }} />
            ))}
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
            {s.types.map((t, i) => (
              <li key={t.type} className="flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-full border border-black ${["bg-sky", "bg-peach", "bg-butter"][i]}`} />
                {t.type} {t.n}
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <Label>Most used journals</Label>
            <ol className="mt-2 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
              {s.topJournals.map((j) => (
                <li key={j.name} className="flex justify-between gap-3 py-1.5">
                  <span className="min-w-0 truncate">{j.name}</span>
                  <span className="shrink-0 font-mono">{j.n}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- meetings ---------- */
function Meetings() {
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  const next = sorted.find((m) => m.nextMeeting)?.nextMeeting;
  const per = supervisors.map((s) => ({
    s,
    n: meetings.filter((m) => m.attendees.includes(s.name)).length,
  }));
  return (
    <div data-anchor="overview/meetings" className="card-2d rounded-xl border border-black bg-white p-5 sm:p-6">
      <CardHead title="Supervision meetings" href="logbook" anchor="overview/meetings" />
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-black bg-neutral-50 p-3">
          <Label>Held</Label>
          <p className="mt-1 text-2xl font-bold">{meetings.length}</p>
        </div>
        <div className="rounded-xl border border-black bg-neutral-50 p-3">
          <Label>Last</Label>
          <p className="mt-1 font-bold">{sorted[0] ? fmt(sorted[0].date) : "—"}</p>
        </div>
        <div className="rounded-xl border border-black bg-neutral-50 p-3">
          <Label>Next</Label>
          <p className="mt-1 font-bold">{next ? fmt(next) : "Not set"}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm">
        {per.map(({ s, n }) => (
          <li key={s.slug} className="flex justify-between gap-3">
            <span className="min-w-0 truncate">
              {s.name} <span className="text-neutral-500">· {s.role}</span>
            </span>
            <span className="shrink-0 font-mono">{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- to-do ---------- */
type Row = { task: string; due?: string; from: string; link?: string; status: Status | "open" };

function Todo() {
  const rows: Row[] = [
    ...todos.filter((t) => !t.done).map((t) => ({ task: t.task, due: t.due, from: "To-do", link: t.link, status: "open" as const })),
    ...meetings.flatMap((m) =>
      m.actions.filter((a) => !a.done).map((a) => ({ task: a.task, due: a.due, from: `Meeting ${fmt(m.date)}`, link: "logbook/actions", status: "open" as const })),
    ),
    ...documents
      .filter((d) => d.status !== "done")
      .flatMap((d) =>
        d.parts
          .filter((p) => p.status !== "done")
          // preparing and submitting the USJ application is already an action item from the 5 Nov meeting
          .filter((p) => !(d.id === "ethics-usj" && /^(Prepare|Submit)/.test(p.name)))
          .map((p) => ({
            task: p.name,
            due: d.dateLabel === "Due" ? d.date : undefined,
            from: d.title,
            link: `documents/${d.id}`,
            status: p.status,
          })),
      ),
  ];
  return (
    <div data-anchor="overview/todo" className="card-2d rounded-xl border border-black bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold">To-do list</h3>
        <span className="flex items-center gap-2 font-mono text-xs text-neutral-500">
          {rows.length} open
          <ShareLink to="overview/todo" label="" className="px-2" />
        </span>
      </div>
      <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
        {rows.map((r) => (
          <li key={r.from + r.task} className="flex gap-3 py-3">
            <span className="pt-0.5">
              {r.status === "open" ? <span className="font-mono">☐</span> : <StatusMark status={r.status} size={16} />}
            </span>
            <div className="min-w-0 flex-1">
              {r.link ? (
                <a href={`#${r.link}`} className="text-[15px] leading-snug hover:underline">
                  {r.task}
                </a>
              ) : (
                <span className="text-[15px] leading-snug">{r.task}</span>
              )}
              <p className="font-mono text-xs text-neutral-500">
                {r.from}
                {r.status === "waiting" && " · waiting on others"}
                {r.due && ` · due ${fmt(r.due)}`}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
            <span>{fmt(latestUpdate.date)}</span>
            <span className="text-neutral-500">{latestUpdate.phase}</span>
          </div>
          <p className="mt-4 text-base leading-relaxed sm:text-lg">{latestUpdate.text}</p>
          <ShareLink to="overview/latest" className="mt-4" />
        </div>

        <div data-anchor="overview/progress" className="card-2d rounded-xl border border-black bg-butter p-5 sm:p-6">
          <Label>Started {fmt(phd.startDate)}</Label>
          <p className="mt-3 text-4xl font-bold">
            Month {month}
            <span className="text-lg font-normal text-neutral-500"> / {phd.durationMonths}</span>
          </p>
          <div className="mt-4">
            <Bar pct={pct} />
          </div>
          <p className="mt-2 font-mono text-xs text-neutral-500">{pct}% of programme elapsed</p>
          <ShareLink to="overview/progress" className="mt-4" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:gap-6 lg:grid-cols-2">
        <Ethics />
        <ProgressReview />
      </div>

      <div className="mt-6">
        <Papers />
      </div>

      <div className="mt-6 grid gap-5 md:gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start">
        <Meetings />
        <Todo />
      </div>
    </div>
  );
}
