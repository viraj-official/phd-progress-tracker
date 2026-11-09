import { supervisors, type Supervisor } from "@/data/phd";
import { supervisorProfiles } from "@/data/supervisorProfiles";
import { Avatar, Label, PageHeader, pastels, asset } from "../ui";
import { Section, WishList } from "./Profile";
import { profile } from "@/data/profile";
import { ShareLink } from "../deeplink";

type Props = { path: string[]; go: (p: string[]) => void };

export function Team({ path, go }: Props) {
  const selected = supervisors.find((s) => s.slug === path[0]);
  if (selected) return <SupervisorPage s={selected} back={() => go([])} />;

  return (
    <div>
      <PageHeader
        title="Supervisory panel"
        description="Supervisors from the University of Sri Jayewardenepura and the National Hospital of Sri Lanka."
        aside={`${supervisors.length} supervisors`}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {supervisors.map((s, i) => {
          const prof = supervisorProfiles[s.slug];
          return (
            <article key={s.name} className="card-2d flex flex-col rounded-xl border border-black bg-white p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <Avatar name={s.name} src={s.photo} color={pastels[(i + 1) % 6]} size="h-16 w-16" text="text-lg" />
                <div className="min-w-0">
                  <Label>{s.role}</Label>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{s.name}</h3>
                </div>
              </div>

              {s.position && <p className="mt-5 font-medium">{s.position}</p>}

              <div className="mt-6 flex flex-1 flex-col">
                <Contact s={s} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  onClick={() => go([s.slug])}
                  className="rounded-xl border border-black bg-white px-3 py-2.5 hover:bg-lavender hover:text-black"
                >
                  View profile →
                </button>
                {prof?.cv ? (
                  <a
                    href={asset(prof.cv.url)}
                    download={prof.cv.label}
                    className="rounded-xl border border-black bg-lavender px-3 py-2.5 text-center text-black hover:bg-white hover:text-black"
                  >
                    ↓ Download CV
                  </a>
                ) : (
                  <span className="border border-dashed border-neutral-400 px-3 py-2.5 text-center text-neutral-500">
                    CV coming soon
                  </span>
                )}
              </div>
              <ShareLink to={`supervisors/${s.slug}`} label="Copy profile link" className="mt-3 self-start" />
            </article>
          );
        })}
      </div>

      {profile.wishlist.some((w) => w.status !== "received") && (
        <div className="mt-12">
          <Section n="✱" title="Wish list" anchor="supervisors/wishlist">
            <WishList items={profile.wishlist} />
          </Section>
        </div>
      )}
    </div>
  );
}

function Contact({ s }: { s: Supervisor }) {
  return (
    <dl className="mt-auto space-y-3 border-t border-neutral-300 pt-5 text-sm">
      <div>
        <dt className="font-mono text-xs uppercase tracking-widest text-neutral-500">Email</dt>
        <dd className="mt-0.5">
          <a href={`mailto:${s.email}`} className="break-all underline underline-offset-4 hover:no-underline">
            {s.email}
          </a>
        </dd>
      </div>
      <div>
        <dt className="font-mono text-xs uppercase tracking-widest text-neutral-500">Phone</dt>
        <dd className="mt-0.5">
          <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="underline underline-offset-4 hover:no-underline">
            {s.phone}
          </a>
        </dd>
      </div>
    </dl>
  );
}

function Cell({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`bg-white p-4 sm:p-5 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">{label}</p>
      <div className="mt-1.5 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

const tel = (n: string) => `tel:${n.replace(/\s|Ext\..*$/g, "")}`;

function ContactPanel({
  s,
  anchor,
  office,
  home,
  homeAddress,
}: {
  s: Supervisor;
  anchor: string;
  office?: string;
  home?: string;
  homeAddress?: string[];
}) {
  const phones = [
    { label: "Phone", n: s.phone },
    ...(office ? [{ label: "Office", n: office }] : []),
    ...(home ? [{ label: "Home", n: home }] : []),
  ];
  return (
    <section data-anchor={anchor}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold">Contact</h3>
        <ShareLink to={anchor} />
      </div>
      <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
        <Cell label="Email">
          <a href={`mailto:${s.email}`} className="break-all underline underline-offset-4 hover:no-underline">
            {s.email}
          </a>
        </Cell>
        {phones.map((ph) => (
          <Cell key={ph.label} label={`${ph.label} phone`}>
            <a href={tel(ph.n)} className="hover:underline">
              {ph.n}
            </a>
          </Cell>
        ))}
        <Cell label="Work address" wide>
          {s.address.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </Cell>
        {homeAddress && (
          <Cell label="Home address" wide>
            {homeAddress.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </Cell>
        )}
      </div>
    </section>
  );
}

function SupervisorPage({ s, back }: { s: Supervisor; back: () => void }) {
  const p = supervisorProfiles[s.slug];
  const base = `supervisors/${s.slug}`;
  // Sections are numbered in the order they appear; empty ones are skipped.
  let count = 0;
  const n = () => String(++count).padStart(2, "0");
  const has = (a?: unknown[]) => !!a && a.length > 0;

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={back} className="font-mono text-xs uppercase tracking-wider hover:underline">
          ← All supervisors
        </button>
        <ShareLink to={base} label="Copy profile link" />
      </div>

      {/* intro */}
      <section className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar name={s.name} src={s.photo} color={pastels[(supervisors.indexOf(s) + 1) % 6]} />
          <div className="min-w-0">
            <Label>{s.role}</Label>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{p?.fullName ?? s.name}</h2>
            <p className="mt-2 text-lg text-neutral-700">{p?.headline ?? s.position ?? s.address[0]}</p>
          </div>
        </div>

        <div data-anchor={`${base}/cv`} className="shrink-0 space-y-2 md:w-56">
          {p?.cv ? (
            <a
              href={asset(p.cv.url)}
              download={p.cv.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-black bg-lavender px-4 py-3 font-mono text-sm text-black hover:bg-white hover:text-black"
            >
              <span>↓ Download CV</span>
              <span className="text-xs opacity-70">{p.cv.size}</span>
            </a>
          ) : (
            <p className="border border-dashed border-neutral-400 px-4 py-3 text-center font-mono text-xs text-neutral-500">
              CV coming soon
            </p>
          )}
          <ShareLink to={`${base}/cv`} label="Copy CV link" />
        </div>
      </section>

      <ContactPanel s={s} anchor={`${base}/contact`} office={p?.officePhone} home={p?.homePhone} homeAddress={p?.homeAddress} />

      {!p ? (
        <div className="border border-dashed border-black px-6 py-16 text-center text-neutral-600">
          Full profile and CV will be added soon.
        </div>
      ) : (
        <>
          {(p.summary || has(p.researchAreas) || has(p.links)) && (
            <Section n={n()} title="Profile" anchor={`${base}/profile`}>
              {p.summary && <p className="max-w-3xl text-[15px] leading-relaxed text-neutral-700">{p.summary}</p>}
              {has(p.researchAreas) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.researchAreas!.map((r) => (
                    <span key={r} className="rounded-full border border-black bg-mint px-3 py-1 text-sm">
                      {r}
                    </span>
                  ))}
                </div>
              )}
              {has(p.links) && (
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                  {p.links!.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="rounded-xl border border-black bg-white px-3 py-1.5 hover:bg-lavender">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </Section>
          )}

          {has(p.general) && (
            <Section n={n()} title="General information" anchor={`${base}/general`}>
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {p.general!.map((g) => (
                  <div key={g.label} className="border-b border-neutral-200 pb-3">
                    <dt className="font-mono text-xs uppercase tracking-widest text-neutral-500">{g.label}</dt>
                    <dd className="mt-1 text-[15px]">{g.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {has(p.appointments) && (
            <Section n={n()} title="Experience" anchor={`${base}/experience`}>
              <ol className="ml-1.5 border-l-2 border-black">
                {p.appointments!.map((a) => (
                  <li key={a.period + a.title} className="relative pb-5 pl-6 last:pb-0">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-black bg-white" />
                    <p className="font-mono text-xs text-neutral-500">{a.period}</p>
                    <p className="mt-0.5 font-bold leading-snug">{a.title}</p>
                    <p className="text-sm text-neutral-600">{a.place}</p>
                    {a.note && <p className="mt-1 text-sm italic text-neutral-500">{a.note}</p>}
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {has(p.qualifications) && (
          <Section n={n()} title="Qualifications" anchor={`${base}/qualifications`}>
            <ul className="space-y-4">
              {p.qualifications.map((q) => (
                <li key={q.title} className="grid gap-1 sm:grid-cols-[5rem_1fr]">
                  <span className="font-mono text-sm text-neutral-500">{q.year}</span>
                  <span>
                    <span className="font-bold">{q.title}</span>
                    {q.detail && <span className="mt-1 block text-sm leading-relaxed text-neutral-600">{q.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
          )}

          {has(p.awards) && (
            <Section n={n()} title="Awards & distinctions" anchor={`${base}/awards`}>
              <ul className="space-y-4">
                {p.awards!.map((a) => (
                  <li key={a.year + a.title} className="grid gap-1 sm:grid-cols-[5rem_1fr]">
                    <span className="font-mono text-sm text-neutral-500">{a.year}</span>
                    <span>
                      <span className="font-bold">{a.title}</span>
                      {a.detail && <span className="mt-1 block text-sm leading-relaxed text-neutral-600">{a.detail}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {has(p.memberships) && (
          <Section n={n()} title="Memberships" anchor={`${base}/memberships`}>
            <div className="flex flex-wrap gap-2">
              {p.memberships.map((m) => (
                <span key={m} className="rounded-xl border border-black bg-white px-3 py-1 text-sm">
                  {m}
                </span>
              ))}
            </div>
          </Section>
          )}

          {has(p.publications) && (
          <Section n={n()} title="Publications & presentations" anchor={`${base}/publications`}>
            <div className="space-y-8">
              {p.publications.map((g) => (
                <div key={g.session}>
                  <Label>{g.session}</Label>
                  <ul className="mt-3 space-y-3">
                    {g.items.map((it) => (
                      <li key={it.title} className="border-l-2 border-black pl-4">
                        <p className="text-[15px] leading-relaxed">{it.title}</p>
                        {it.authors && <p className="mt-0.5 text-sm italic text-neutral-500">{it.authors}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
          )}

          {has(p.workshops) && (
          <Section n={n()} title="Workshops attended" anchor={`${base}/workshops`}>
            <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
              {p.workshops.map((w) => (
                <li key={w.title} className="grid gap-1 py-3 sm:grid-cols-[5rem_1fr]">
                  <span className="font-mono text-sm text-neutral-500">{w.year}</span>
                  <span className="text-[15px]">{w.title}</span>
                </li>
              ))}
            </ul>
          </Section>
          )}

          {has(p.teaching) && (
          <Section n={n()} title="Teaching" anchor={`${base}/teaching`}>
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
              {p.teaching.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Section>
          )}

          {(has(p.activities) || has(p.service)) && (
          <Section n={n()} title="Other activities & service" anchor={`${base}/activities`}>
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
              {p.activities.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {has(p.service) && (
            <div className="mt-8">
              <Label>Voluntary service</Label>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
                {p.service.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            )}
          </Section>
          )}

          {has(p.hobbies) && (
            <Section n={n()} title="Hobbies" anchor={`${base}/hobbies`}>
              <div className="flex flex-wrap gap-2">
                {p.hobbies!.map((h) => (
                  <span key={h} className="border border-neutral-300 px-3 py-1 text-sm">
                    {h}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {has(p.referees) && (
            <Section n={n()} title="Referees" anchor={`${base}/referees`}>
              <div className="grid gap-4 sm:grid-cols-2">
                {p.referees!.map((r) => (
                  <div key={r.name} className="rounded-xl border border-black bg-white p-5">
                    <p className="font-bold">{r.name}</p>
                    {r.lines.map((l) => (
                      <p key={l} className="text-sm text-neutral-600">
                        {l}
                      </p>
                    ))}
                    <div className="mt-3 space-y-0.5 border-t border-neutral-200 pt-3 text-sm">
                      {r.email && (
                        <a href={`mailto:${r.email}`} className="block break-all underline underline-offset-4 hover:no-underline">
                          {r.email}
                        </a>
                      )}
                      {r.phones.map((ph) => (
                        <p key={ph}>{ph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </>
      )}
    </div>
  );
}
