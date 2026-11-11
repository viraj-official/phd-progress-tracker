import { meetings, type Meeting } from "@/data/logbook";
import { Label, PageHeader } from "../ui";
import { ShareLink } from "../deeplink";

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <Label>{title}</Label>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function MeetingCard({ m, n, open }: { m: Meeting; n: number; open: boolean }) {
  const openActions = m.actions.filter((a) => !a.done).length;
  return (
    <details open={open} data-anchor={`logbook/meeting-${n}`} className="group rounded-xl border border-black bg-white">
      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
            <span>Meeting #{n}</span>
            {m.mode && <span>· {m.mode}</span>}
            {m.example && <span className="rounded-xl border border-black bg-white px-1.5 py-0.5 text-black">Example</span>}
          </div>
          <p className="mt-1 text-xl font-bold">{fmt(m.date)}</p>
          <p className="mt-1 text-sm text-neutral-600">{m.topics.join(" · ")}</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <ShareLink to={`logbook/meeting-${n}`} label="" className="px-2" />
          {m.actions.length > 0 && (
            <span className={openActions ? "" : "text-neutral-500"}>
              {openActions ? `${openActions} open action${openActions > 1 ? "s" : ""}` : "All actions done"}
            </span>
          )}
          <span aria-hidden className="text-lg transition-transform group-open:rotate-180">
            ⌄
          </span>
        </div>
      </summary>

      <div className="grid gap-6 border-t border-neutral-300 p-5 sm:p-6 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label>Attendees</Label>
            <p className="mt-2 text-[15px]">{m.attendees.join(", ")}</p>
            {m.place && <p className="text-sm text-neutral-500">{m.place}</p>}
          </div>
          <List title="What we discussed" items={m.discussion} />
          <List title="Instructions & decisions" items={m.decisions} />
        </div>

        <div className="space-y-6">
          {m.actions.length > 0 && (
            <div>
              <Label>Action items</Label>
              <ul className="mt-2 space-y-2">
                {m.actions.map((a) => (
                  <li key={a.task} className="flex gap-3 text-[15px] leading-snug">
                    <span aria-label={a.done ? "Done" : "Open"} className="font-mono">
                      {a.done ? "☒" : "☐"}
                    </span>
                    <span className={a.done ? "text-neutral-500 line-through" : ""}>
                      {a.task}
                      <span className="block font-mono text-xs text-neutral-500 no-underline">
                        {a.owner}
                        {a.due && ` · due ${fmt(a.due)}`}
                        {a.note && ` · ${a.note}`}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {m.nextMeeting && (
            <div>
              <Label>Next meeting</Label>
              <p className="mt-2 text-[15px]">{fmt(m.nextMeeting)}</p>
            </div>
          )}
        </div>
      </div>
    </details>
  );
}

export function LogBook() {
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  const open = sorted.flatMap((m) => m.actions.filter((a) => !a.done).map((a) => ({ ...a, from: m.date })));
  const next = sorted.find((m) => m.nextMeeting)?.nextMeeting;

  return (
    <div>
      <PageHeader
        title="Log Book"
        description="Record of supervisor meetings: what was discussed, what was decided and who does what next."
        aside={`${meetings.length} meeting${meetings.length === 1 ? "" : "s"}`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-black bg-white p-5">
          <Label>Meetings held</Label>
          <p className="mt-2 text-3xl font-bold">{meetings.length}</p>
        </div>
        <div className="rounded-xl border border-black bg-white p-5">
          <Label>Last meeting</Label>
          <p className="mt-2 text-xl font-bold">{sorted[0] ? fmt(sorted[0].date) : "—"}</p>
        </div>
        <div className="rounded-xl border border-black bg-white p-5">
          <Label>Next meeting</Label>
          <p className="mt-2 text-xl font-bold">{next ? fmt(next) : "Not set"}</p>
        </div>
      </div>

      {open.length > 0 && (
        <section data-anchor="logbook/actions" className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold">Open action items</h3>
            <ShareLink to="logbook/actions" />
          </div>
          <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
            {open.map((a) => (
              <li key={a.from + a.task} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="text-[15px]">☐ {a.task}</span>
                <span className="shrink-0 font-mono text-xs text-neutral-500">
                  {a.owner}
                  {a.due && ` · due ${fmt(a.due)}`} · from {fmt(a.from)}
                  {a.note && <span className="block normal-case">{a.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h3 className="text-lg font-bold">Meetings</h3>
        {sorted.length ? (
          <div className="mt-4 space-y-4">
            {sorted.map((m, i) => (
              <MeetingCard key={m.date + i} m={m} n={sorted.length - i} open={i === 0} />
            ))}
          </div>
        ) : (
          <p className="mt-4 border border-dashed border-black p-10 text-center text-neutral-500">No meetings logged yet.</p>
        )}
      </section>
    </div>
  );
}
