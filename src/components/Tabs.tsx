"use client";

import { useEffect, useState } from "react";
import { container } from "./ui";
import { Overview } from "./tabs/Overview";
import { Objectives } from "./tabs/Objectives";
import { Timeline } from "./tabs/Timeline";
import { Updates } from "./tabs/Updates";
import { LogBook } from "./tabs/LogBook";
import { Documents } from "./tabs/Documents";
import { PaperBank } from "./tabs/PaperBank";
import { Team } from "./tabs/Team";
import { Profile } from "./tabs/Profile";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "objectives", label: "Objectives" },
  { id: "timeline", label: "Timeline" },
  { id: "documents", label: "Documents" },
  { id: "updates", label: "Updates" },
  { id: "logbook", label: "Log Book" },
  { id: "papers", label: "Paper Bank" },
  { id: "supervisors", label: "Supervisors" },
  { id: "profile", label: "Profile" },
];

// URL hash is "#tab" or "#tab/sub/item" so any view can be shared as a link.
function readHash() {
  return window.location.hash.slice(1).split("/").filter(Boolean);
}

export function Tabs() {
  const [path, setPath] = useState<string[]>(["overview"]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      const p = readHash();
      setPath(p.length && TABS.some((t) => t.id === p[0]) ? p : ["overview"]);
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const go = (p: string[]) => {
    window.location.hash = p.join("/");
  };

  const active = path[0];
  const activeLabel = TABS.find((t) => t.id === active)?.label;
  // The paper reader uses the whole screen below the nav.
  const fullBleed = active === "papers" && !!path[2] && path[2] !== "page";

  return (
    <>
      <nav className="sticky top-0 z-30 h-[var(--nav-h)] border-b border-black bg-white">
        <div className={`${container} flex h-full items-center justify-between gap-6`}>
          <button onClick={() => go(["overview"])} className="shrink-0 font-mono text-sm font-bold tracking-wider">
            PhD<span className="font-normal text-neutral-500"> · USJ</span>
          </button>

          {/* desktop tabs */}
          <div className="hidden h-full items-stretch xl:flex" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => go([t.id])}
                className={`-mb-px whitespace-nowrap border-b-[3px] px-3 font-mono text-[13px] uppercase tracking-wider transition-colors ${
                  active === t.id ? "border-black bg-lavender font-bold" : "border-transparent text-neutral-500 hover:text-black"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex items-center gap-3 rounded-xl border border-black bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider xl:hidden"
          >
            {activeLabel}
            <span aria-hidden className="text-base leading-none">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        {/* mobile menu panel */}
        {menuOpen && (
          <div id="mobile-menu" className="border-b-2 border-black bg-white xl:hidden">
            <ul className={`${container} divide-y divide-neutral-200 py-2`}>
              {TABS.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => go([t.id])}
                    className={`flex w-full items-center justify-between py-3.5 text-left font-mono text-sm uppercase tracking-wider ${
                      active === t.id ? "font-bold" : "text-neutral-600"
                    }`}
                  >
                    {t.label}
                    {active === t.id && <span>●</span>}
                  </button>
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
            {active === "overview" && <Overview />}
            {active === "objectives" && <Objectives />}
            {active === "timeline" && <Timeline />}
            {active === "documents" && <Documents />}
            {active === "updates" && <Updates />}
            {active === "logbook" && <LogBook />}
            {active === "papers" && <PaperBank path={path.slice(1)} go={(p) => go(["papers", ...p])} />}
            {active === "supervisors" && <Team path={path.slice(1)} go={(p) => go(["supervisors", ...p])} />}
            {active === "profile" && <Profile />}
          </div>
          <footer className="mt-10 border-t border-black">
            <div className={`${container} py-8 font-mono text-xs text-neutral-500`}>
              PhD progress tracker · KH Viraj Sameera · University of Sri Jayewardenepura
            </div>
          </footer>
        </>
      )}
    </>
  );
}
