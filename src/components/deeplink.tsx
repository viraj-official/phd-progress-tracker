"use client";

// Deep links: every shareable part of the site carries data-anchor="tab/part[/sub]".
// Opening https://…/#documents/ethics-kdu switches to the tab, scrolls straight to that
// part and highlights it. ShareLink copies such a link so it can be sent to anyone.

import { useState } from "react";

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.pdf$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function linkFor(to: string) {
  if (typeof window === "undefined") return `#${to}`;
  return `${window.location.origin}${window.location.pathname}#${to}`;
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const t = document.createElement("textarea");
    t.value = text;
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand("copy");
    t.remove();
    return ok;
  }
}

export function ShareLink({ to, label = "Copy link", className = "" }: { to: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <button
      type="button"
      title="Copy a link that opens this part directly"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setState((await copy(linkFor(to))) ? "ok" : "fail");
        setTimeout(() => setState("idle"), 2000);
      }}
      className={`share-link inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-black bg-white px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-black hover:bg-butter ${className}`}
    >
      <span aria-hidden>{state === "ok" ? "✓" : "🔗"}</span>
      {label && (state === "ok" ? "Link copied" : state === "fail" ? "Copy failed" : label)}
      {!label && <span className="sr-only">Copy link</span>}
    </button>
  );
}

// Scroll to (and highlight) the part named by the hash. Waits briefly for the tab to render.
export function focusAnchor(to: string, highlight = true) {
  let tries = 0;
  const find = () =>
    [...document.querySelectorAll<HTMLElement>(`[data-anchor="${CSS.escape(to)}"]`)].find((el) => el.offsetParent !== null) ??
    null;
  const run = () => {
    const el = find();
    if (!el) {
      if (++tries < 40) setTimeout(run, 50);
      return;
    }
    // open any collapsed <details> around or at the target
    for (let p: HTMLElement | null = el; p; p = p.parentElement) if (p instanceof HTMLDetailsElement) p.open = true;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const target = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin);
    window.scrollTo({ top: target(), behavior: "smooth" });
    // smooth scrolling can stall (background tab, late layout): make sure we arrive
    setTimeout(() => {
      if (Math.abs(window.scrollY - target()) > 4) window.scrollTo({ top: target(), behavior: "instant" });
    }, 900);
    if (!highlight) return;
    document.querySelectorAll(".anchor-hit").forEach((x) => x.classList.remove("anchor-hit"));
    el.classList.add("anchor-hit");
    setTimeout(() => el.classList.remove("anchor-hit"), 6000);
  };
  run();
}
