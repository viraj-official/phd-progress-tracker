"use client";

import { useEffect } from "react";

// Keeps the site always up to date: when the page opens, and whenever the tab comes
// back into view, it asks the server for the current build id (bypassing every cache).
// If a newer version has been deployed, the page reloads at a fresh URL so neither the
// browser nor the GitHub Pages CDN can serve the old copy.
const BUILD = process.env.NEXT_PUBLIC_BUILD_ID ?? "";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function FreshnessCheck() {
  useEffect(() => {
    if (!BUILD || process.env.NODE_ENV !== "production") return;
    let busy = false;
    const check = async () => {
      if (busy) return;
      busy = true;
      try {
        const res = await fetch(`${BASE}/build.txt?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const live = (await res.text()).trim();
          if (live && live !== BUILD) {
            const url = new URL(window.location.href);
            url.searchParams.set("v", live);
            window.location.replace(url.toString());
          }
        }
      } catch {
        // offline or blocked: keep showing the current page
      } finally {
        busy = false;
      }
    };
    check();
    const onVisible = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVisible);
    const timer = window.setInterval(check, 5 * 60 * 1000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(timer);
    };
  }, []);
  return null;
}
