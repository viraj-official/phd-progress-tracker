import { profile, type Item } from "@/data/profile";
import { Avatar, Label } from "../ui";

export function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-5 border-t border-black pt-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <div>
        <p className="font-mono text-sm text-neutral-400">{n}</p>
        <h3 className="mt-1 text-lg font-bold">{title}</h3>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="ml-1.5 border-l-2 border-black">
      {items.map((i, idx) => (
        <li key={i.title + i.place} className="relative pb-6 pl-6 last:pb-0">
          <span
            className={`absolute -left-[7px] top-1.5 h-3 w-3 border-2 border-black ${idx === 0 ? "bg-lavender" : "bg-white"}`}
          />
          <p className="font-mono text-xs text-neutral-500">{i.period}</p>
          <p className="mt-0.5 font-bold leading-snug">{i.title}</p>
          <p className="text-sm text-neutral-600">{i.place}</p>
          {i.note && <p className="mt-1 text-sm italic text-neutral-500">{i.note}</p>}
        </li>
      ))}
    </ol>
  );
}

export function Profile() {
  const p = profile;

  return (
    <div className="space-y-12">
      {/* intro */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <Avatar name={p.name} src="/img/viraj-cartoon.png" color="bg-rose" size="h-36 w-36 sm:h-44 sm:w-44" />
        <div className="min-w-0">
          <Label>My profile</Label>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{p.name}</h2>
          <p className="mt-1 text-lg text-neutral-700">{p.headline}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-neutral-600">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-sm">
            <a href={`mailto:${p.email}`} className="break-all rounded-xl border border-black bg-white px-4 py-2 hover:bg-lavender hover:text-black">
              ✉ {p.email}
            </a>
            <a href={`tel:${p.phone.replace(/\s/g, "")}`} className="rounded-xl border border-black bg-white px-4 py-2 hover:bg-lavender hover:text-black">
              ☎ {p.phone}
            </a>
          </div>
        </div>
      </section>

      <Section n="01" title="Education">
        <Timeline items={p.education} />
      </Section>

      <Section n="02" title="Experience">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Label>Academic</Label>
            <div className="mt-4">
              <Timeline items={p.academic} />
            </div>
          </div>
          <div>
            <Label>Industry</Label>
            <div className="mt-4">
              <Timeline items={p.industry} />
            </div>
          </div>
        </div>
      </Section>

      <Section n="03" title="Research & publications">
        <div className="space-y-8">
          {p.publications.map((g) => (
            <div key={g.group}>
              <Label>{g.group}</Label>
              <ol className="mt-3 space-y-3">
                {g.items.map((x) => (
                  <li key={x} className="border-l-2 border-black pl-4 text-[15px] leading-relaxed">
                    {x}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <p className="text-[15px] text-neutral-700">{p.supervision}</p>
        </div>
      </Section>

      <Section n="04" title="Skills">
        <div className="grid gap-4 sm:grid-cols-2">
          {p.skills.map((g) => (
            <div key={g.group} className="rounded-xl border border-black bg-white p-5">
              <p className="font-bold">{g.group}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="border border-neutral-300 px-2 py-0.5 font-mono text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="05" title="Achievements">
        <ul className="grid gap-4 sm:grid-cols-2">
          {p.achievements.map((a) => (
            <li key={a.title} className="rounded-xl border border-black bg-white p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-bold leading-snug">{a.title}</p>
                <span className="shrink-0 font-mono text-xs text-neutral-500">{a.year}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{a.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section n="06" title="Certificates">
        <div className="space-y-8">
          {p.certificates.map((g) => (
            <div key={g.group}>
              <Label>{g.group}</Label>
              <ul className="mt-3 divide-y divide-neutral-200 border-y border-neutral-200">
                {g.items.map((c) => (
                  <li key={c.title} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="font-medium leading-snug">{c.title}</p>
                      <p className="text-sm text-neutral-600">{c.issuer}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-neutral-500">{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section n="07" title="Memberships & service">
        <Label>Professional memberships</Label>
        <ul className="mt-3 space-y-2">
          {p.memberships.map((m) => (
            <li key={m.title} className="flex justify-between gap-4 text-[15px]">
              <span>{m.title}</span>
              <span className="shrink-0 font-mono text-xs text-neutral-500">since {m.since}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Label>University service</Label>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
            {p.service.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
