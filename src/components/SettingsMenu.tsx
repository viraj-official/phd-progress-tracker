"use client";

import { useEffect, useRef, useState } from "react";

// Floating ⚙ button (bottom-right). Its menu switches the "copy link" buttons on or off.
// The choice is remembered in this browser; shared links always work either way.
const KEY = "phd-share-links";

function apply(on: boolean) {
  document.documentElement.dataset.share = on ? "on" : "off";
}

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [share, setShare] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let on = false;
    try {
      on = localStorage.getItem(KEY) === "on";
    } catch {}
    setShare(on);
    apply(on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    const shut = () => setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    window.addEventListener("hashchange", shut);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
      window.removeEventListener("hashchange", shut);
    };
  }, [open]);

  const toggle = () => {
    const on = !share;
    setShare(on);
    apply(on);
    try {
      localStorage.setItem(KEY, on ? "on" : "off");
    } catch {}
  };

  return (
    <div ref={box} className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          id="settings-menu"
          role="dialog"
          aria-label="Settings"
          className="card-2d w-72 rounded-xl border border-black bg-white p-4"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Settings</p>
          <label className="mt-3 flex cursor-pointer items-start justify-between gap-4">
            <span>
              <span className="block font-bold">Share links</span>
              <span className="mt-0.5 block text-sm leading-snug text-neutral-600">
                Show 🔗 buttons to copy a link that opens a section directly.
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={share}
              onClick={toggle}
              className={`relative mt-1 h-6 w-11 shrink-0 rounded-full border border-black transition-colors ${share ? "bg-mint" : "bg-neutral-200"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-full border border-black bg-white transition-transform ${
                  share ? "translate-x-5" : ""
                }`}
              />
              <span className="sr-only">Share links</span>
            </button>
          </label>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="settings-menu"
        aria-label="Settings"
        className="card-2d flex h-12 w-12 items-center justify-center rounded-full border border-black bg-butter text-black hover:bg-white"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      </button>
    </div>
  );
}
