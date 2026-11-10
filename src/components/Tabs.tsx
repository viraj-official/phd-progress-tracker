"use client";

import { useEffect, useState } from "react";
import { asset, container } from "./ui";
import { focusAnchor } from "./deeplink";
import { SettingsMenu } from "./SettingsMenu";
import { Overview } from "./tabs/Overview";
import { Objectives } from "./tabs/Objectives";
import { Timeline } from "./tabs/Timeline";
import { Updates } from "./tabs/Updates";
import { LogBook } from "./tabs/LogBook";
import { Documents } from "./tabs/Documents";
import { PaperBank } from "./tabs/PaperBank";
import { Team } from "./tabs/Team";
import { Profile } from "./tabs/Profile";

// Top-level menu items. Each groups one or more views; a view keeps its own URL
// (#timeline, #logbook/meeting-2, #papers/O1 …) so old links keep working.
type View = { id: string; label: string };
type Group = { id: string; label: string; views: View[] };

const GROUPS: Group[] = [
  { id: "overview", label: "Overview", views: [{ id: "overview", label: "Overview" }] },
  { id: "research", label: "Objectives", views: [{ id: "objectives", label: "Objectives" }] },
  { id: "paperbank", label: "Paper Bank", views: [{ id: "papers", label: "Paper Bank" }] },
  {
    id: "progress",
    label: "Progress",
    views: [
      { id: "timeline", label: "Timeline" },
      { id: "updates", label: "Updates" },
      { id: "logbook", label: "Log Book" },
    ],
  },
  { id: "documents", label: "Documents", views: [{ id: "documents", label: "Documents" }] },
  {
    id: "people",
    label: "People",
    views: [
      { id: "profile", label: "My profile" },
      { id: "supervisors", label: "Supervisors" },
    ],
  },
];

const groupOf = (view: string) => GROUPS.find((g) => g.views.some((v) => v.id === view));

// URL hash is "#view" or "#view/sub/item" so any view can be shared as a link.
// Parts marked with data-anchor="view/…" are scrolled to and highlighted (see deeplink.tsx).
function readHash(): string[] {
  const p = window.location.hash.slice(1).split("/").filter(Boolean);
  const alias = GROUPS.find((g) => g.id === p[0] && g.views[0].id !== p[0]);
  if (alias) return [alias.views[0].id, ...p.slice(1)]; // #research → #objectives etc.
  return p.length && groupOf(p[0]) ? p : ["overview"];
}

export function Tabs() {
  const [path, setPath] = useState<string[]>(["overview"]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const p = readHash();
      setPath(p);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      // "#view/part" links jump straight to that part and highlight it
      if (p.length > 1 && p[0] !== "papers") focusAnchor(p.join("/"));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = (p: string[]) => {
    window.location.hash = p.join("/");
  };

  const view = path[0];
  const group = groupOf(view)!;
  // The paper reader has its own layout (no page footer).
  const fullBleed = view === "papers" && !!path[2] && path[2] !== "page";

  return (
    <>
      <nav className="sticky top-0 z-30 h-[var(--nav-h)] border-b border-black bg-white">
        <div className={`${container} flex h-full items-center justify-between gap-3 md:gap-6`}>
          <button onClick={() => go(["overview"])} className="flex min-w-0 shrink items-center gap-2 text-left" aria-label="Home">
            <span className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              <img src={asset("/img/logo-usj.png")} alt="University of Sri Jayewardenepura" className="h-7 w-7 object-contain sm:h-9 sm:w-9" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-mono text-[11px] font-bold tracking-normal sm:text-sm sm:tracking-wider">Brain Cancer Research</span>
              <span className="block truncate font-mono text-[11px] text-neutral-500">
                PhD · <span className="lg:hidden">USJ</span>
                <span className="hidden lg:inline">University of Sri Jayewardenepura</span>
              </span>
            </span>
          </button>

          {/* desktop menu */}
          <div className="hidden h-full items-stretch md:flex" role="tablist">
            {GROUPS.map((g) => (
              <div key={g.id} className="group/menu relative flex">
                <button
                  role="tab"
                  aria-selected={group.id === g.id}
                  aria-haspopup={g.views.length > 1 || undefined}
                  onClick={() => go([g.views[0].id])}
                  className={`-mb-px whitespace-nowrap border-b-[3px] px-4 font-mono text-[13px] uppercase tracking-wider transition-colors ${
                    group.id === g.id ? "border-black bg-lavender font-bold" : "border-transparent text-neutral-500 hover:text-black"
                  }`}
                >
                  {g.label}
                  {g.views.length > 1 && <span aria-hidden className="ml-1.5 text-[10px]">▾</span>}
                </button>
                {/* dropdown: the pages under this menu item (e.g. Progress → Timeline / Updates / Log Book) */}
                {g.views.length > 1 && (
                  <div className="absolute top-full left-0 z-40 hidden min-w-full pt-px group-focus-within/menu:block group-hover/menu:block">
                    <ul className="card-2d overflow-hidden rounded-b-xl border border-black bg-white">
                      {g.views.map((v) => (
                        <li key={v.id}>
                          <button
                            onClick={(e) => {
                              go([v.id]);
                              e.currentTarget.blur();
                            }}
                            className={`block w-full whitespace-nowrap px-4 py-2.5 text-left font-mono text-xs uppercase tracking-wider transition-colors ${
                              v.id === view ? "bg-lavender font-bold text-black" : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                            }`}
                          >
                            {v.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex shrink-0 items-center gap-3 rounded-xl border border-black bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider md:hidden"
          >
            {group.label}
            <span aria-hidden className="text-base leading-none">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        {/* mobile menu panel */}
        {menuOpen && (
          <div id="mobile-menu" className="border-b-2 border-black bg-white md:hidden">
            <ul className={`${container} divide-y divide-neutral-200 py-2`}>
              {GROUPS.map((g) => (
                <li key={g.id}>
                  <button
                    onClick={() => go([g.views[0].id])}
                    className={`flex w-full items-center justify-between py-3.5 text-left font-mono text-sm uppercase tracking-wider ${
                      group.id === g.id ? "font-bold" : "text-neutral-600"
                    }`}
                  >
                    {g.label}
                    {group.id === g.id && <span>●</span>}
                  </button>
                  {g.views.length > 1 && (
                    <ul className="-mt-1 mb-2 ml-3 border-l-2 border-black pl-3">
                      {g.views.map((v) => (
                        <li key={v.id}>
                          <button
                            onClick={() => {
                              go([v.id]);
                              setMenuOpen(false);
                            }}
                            className={`flex w-full items-center justify-between py-2.5 text-left font-mono text-xs uppercase tracking-wider ${
                              v.id === view ? "font-bold text-black" : "text-neutral-600"
                            }`}
                          >
                            {v.label}
                            {v.id === view && <span>●</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {fullBleed ? (
        <PaperBank path={path.slice(1)} go={(p) => go(["papers", ...p])} />
      ) : (
        <>
          <div className={`${container} py-10 sm:py-14`}>
            {group.views.length > 1 && <SubTabs group={group} view={view} go={go} />}

            {view === "overview" && <Overview />}
            {view === "objectives" && <Objectives />}
            {view === "papers" && <PaperBank path={path.slice(1)} go={(p) => go(["papers", ...p])} />}
            {view === "timeline" && <Timeline />}
            {view === "updates" && <Updates />}
            {view === "logbook" && <LogBook />}
            {view === "documents" && <Documents />}
            {view === "supervisors" && <Team path={path.slice(1)} go={(p) => go(["supervisors", ...p])} />}
            {view === "profile" && <Profile />}
          </div>
          <footer className="mt-10 border-t border-black">
            <div className={`${container} py-8 font-mono text-xs text-neutral-500`}>
              PhD progress tracker · KH Viraj Sameera · University of Sri Jayewardenepura
            </div>
          </footer>
        </>
      )}

      <SettingsMenu />
    </>
  );
}

// Sub-pages of a menu item (e.g. Progress → Timeline / Updates / Log Book).
function SubTabs({ group, view, go }: { group: Group; view: string; go: (p: string[]) => void }) {
  return (
    <div role="tablist" aria-label={group.label} className="mb-10 flex flex-wrap gap-2">
      {group.views.map((v) => (
        <button
          key={v.id}
          role="tab"
          aria-selected={v.id === view}
          onClick={() => go([v.id])}
          className={`rounded-xl border border-black px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
            v.id === view ? "card-2d bg-lavender font-bold text-black" : "bg-white text-neutral-600 hover:bg-neutral-100 hover:text-black"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
