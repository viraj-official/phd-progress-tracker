import { documents, type PhdDocument, type Status } from "@/data/documents";
import { Label, PageHeader } from "../ui";
import { ShareLink, slug } from "../deeplink";
import { PdfButton } from "../PdfViewer";

const STATUS: Record<Status, string> = {
  done: "Done",
  waiting: "Waiting",
  progress: "In progress",
  pending: "Pending",
};

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// Status marks: mint tick = done, half sky = in progress, dashed butter = waiting, empty rose = pending.
export function StatusMark({ status, size = 16 }: { status: Status; size?: number }) {
  const s = { width: size, height: size };
  const base = "inline-flex shrink-0 items-center justify-center rounded-full border-2 border-black";
  if (status === "done")
    return (
      <span style={s} className={`${base} bg-mint text-black`} aria-label="Done">
        <svg viewBox="0 0 12 12" width={size * 0.6} height={size * 0.6} aria-hidden>
          <path d="M2 6.5 5 9.2 10 3" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    );
  if (status === "progress")
    return (
      <span
        style={{ ...s, background: "linear-gradient(90deg,var(--color-sky) 50%,var(--color-white) 50%)" }}
        className={base}
        aria-label="In progress"
      />
    );
  if (status === "waiting")
    return (
      <span style={s} className={`${base} border-dashed bg-butter`} aria-label="Waiting">
        <span className="h-1.5 w-1.5 rounded-full bg-lavender" />
      </span>
    );
  return <span style={s} className={`${base} border-neutral-400 bg-rose`} aria-label="Pending" />;
}

export function Documents() {
  return (
    <DocList
      items={documents}
      base="documents"
      title="PhD Documents"
      description="Formal documents for the PhD at the University of Sri Jayewardenepura, newest first, with the status of each part. Finished documents can be viewed here."
      unit="document"
    />
  );
}

// The card list shared by Documents and Papers: status legend, then one card per item
// with its checklist and files.
export function DocList({ items, base, title, description, unit }: { items: PhdDocument[]; base: string; title: string; description: string; unit: string }) {
  const sorted = [...items].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  const counts = (["done", "waiting", "progress", "pending"] as Status[]).map((s) => ({
    s,
    n: items.filter((d) => d.status === s).length,
  }));

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        aside={`${items.length} ${unit}${items.length === 1 ? "" : "s"}`}
      />

      {/* legend + counts */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-neutral-300 py-4">
        {counts.map(({ s, n }) => (
          <span key={s} className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
            <StatusMark status={s} />
            {STATUS[s]} <span className="text-neutral-500">({n})</span>
          </span>
        ))}
      </div>

      <ol className="mt-8 space-y-6">
        {sorted.map((d) => {
          const done = d.parts.filter((p) => p.status === "done").length;
          const pct = Math.round((done / d.parts.length) * 100);
          return (
            <li
              key={d.id}
              data-anchor={`${base}/${d.id}`}
              className="grid gap-6 rounded-xl border border-black bg-white p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_13rem]"
            >
              {/* title + status */}
              <div className="min-w-0">
                <div className="flex items-start gap-3">
                  <StatusMark status={d.status} size={22} />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug">{d.title}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
                      <span
                        className={`rounded-xl border border-black px-2 py-0.5 ${d.status === "done" ? "bg-lavender text-black" : ""}`}
                      >
                        {d.statusText}
                      </span>
                      {d.date && <span className="text-neutral-500">{d.dateLabel ? `${d.dateLabel} ${fmt(d.date)}` : fmt(d.date)}</span>}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{d.description}</p>
                <ShareLink to={`${base}/${d.id}`} label={`Copy link to this ${unit}`} className="mt-4" />
              </div>

              {/* checklist */}
              <div className="min-w-0">
                <div className="flex items-baseline justify-between">
                  <Label>Checklist</Label>
                  <span className="font-mono text-xs text-neutral-500">
                    {done}/{d.parts.length} done
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full border border-black">
                  <div className="h-full bg-mint" style={{ width: `${pct}%` }} />
                </div>
                <ul className="mt-4 space-y-3">
                  {d.parts.map((p) => (
                    <li key={p.name} className="flex gap-3">
                      <span className="pt-0.5">
                        <StatusMark status={p.status} />
                      </span>
                      <span className="min-w-0 text-[15px] leading-snug">
                        <span className={p.status === "pending" ? "text-neutral-500" : ""}>{p.name}</span>
                        <span className="block font-mono text-xs text-neutral-500">
                          {STATUS[p.status]}
                          {p.note && ` · ${p.note}`}
                        </span>
                        {p.file && (
                          <PdfButton url={p.file.url} title={p.file.name ?? p.name} className="font-mono text-xs underline underline-offset-4 hover:no-underline">
                            View {p.file.label} ({p.file.size})
                          </PdfButton>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* files */}
              <div className="md:col-span-2 lg:col-span-1">
                {(() => {
                  const files = [
                    ...(d.files ?? []),
                    ...d.parts.filter((p) => p.file).map((p) => ({ ...p.file!, name: p.file!.name ?? p.name })),
                  ];
                  if (!files.length)
                    return (
                      <p className="rounded-xl border border-dashed border-neutral-400 px-4 py-3 text-center font-mono text-xs text-neutral-500">
                        Available when finished
                      </p>
                    );
                  return (
                    <div>
                      <Label>Files ({files.length})</Label>
                      <ul className="mt-2 space-y-2">
                        {files.map((f) => (
                          <li key={f.url} data-anchor={`${base}/${d.id}/${slug(f.label)}`} className="flex items-stretch gap-1.5">
                            <PdfButton
                              url={f.url}
                              title={f.name ?? f.label}
                              className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-black bg-lavender px-4 py-2.5 text-left font-mono text-sm text-black hover:bg-white"
                            >
                              <span className="min-w-0">▸ {f.name ?? "View document"}</span>
                              <span className="shrink-0 text-xs opacity-70">View</span>
                            </PdfButton>
                            <ShareLink to={`${base}/${d.id}/${slug(f.label)}`} label="" className="px-2" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
