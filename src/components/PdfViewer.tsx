"use client";

// In-page PDF viewer (PDF.js). Pages are drawn as images on <canvas>, so there is
// no download / print button and right-click is disabled. Note: a public website
// cannot make downloading impossible for a determined visitor; this only removes
// the normal ways of saving the file.

import { useEffect, useRef, useState } from "react";
import { asset } from "./ui";

type PdfJs = typeof import("pdfjs-dist");
let pdfjsPromise: Promise<PdfJs> | null = null;
function loadPdfJs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((m) => {
      m.GlobalWorkerOptions.workerSrc = asset("/pdfjs/pdf.worker.min.mjs");
      return m;
    });
  }
  return pdfjsPromise;
}

const block = (e: React.SyntheticEvent) => e.preventDefault();

export function PdfPages({ url, zoom = 1 }: { url: string; zoom?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [pages, setPages] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const host = box.current;
    if (!host) return;
    host.innerHTML = "";
    setState("loading");
    (async () => {
      try {
        const pdfjs = await loadPdfJs();
        const doc = await pdfjs.getDocument({ url: asset(url) }).promise;
        if (cancelled) return;
        setPages(doc.numPages);
        const width = Math.max(280, host.clientWidth - 16) * zoom;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) return;
          const page = await doc.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const vp = page.getViewport({ scale: (width / base.width) * ratio });
          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(vp.width);
          canvas.height = Math.floor(vp.height);
          canvas.style.width = `${Math.floor(vp.width / ratio)}px`;
          canvas.style.height = `${Math.floor(vp.height / ratio)}px`;
          canvas.className = "mx-auto mb-3 block bg-white shadow";
          canvas.oncontextmenu = (e) => e.preventDefault();
          host.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
          if (i === 1) setState("ready");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url, zoom]);

  return (
    <div className="pdf-viewer relative select-none" onContextMenu={block} onDragStart={block}>
      {state === "loading" && <p className="p-6 text-center font-mono text-sm text-neutral-500">Loading document…</p>}
      {state === "error" && <p className="p-6 text-center font-mono text-sm text-neutral-500">Could not open this document.</p>}
      <div ref={box} className="px-2 pt-2" />
      {state === "ready" && pages > 0 && (
        <p className="pb-4 text-center font-mono text-xs text-neutral-400">{pages} page{pages > 1 ? "s" : ""}</p>
      )}
    </div>
  );
}

export function PdfModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // block Ctrl/Cmd + S and Ctrl/Cmd + P while the viewer is open
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) e.preventDefault();
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 p-2 sm:p-6" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-black bg-neutral-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-black bg-white px-4 py-2.5">
          <p className="min-w-0 truncate font-mono text-sm">{title}</p>
          <div className="flex shrink-0 items-center gap-1.5 font-mono text-sm">
            <button onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)))} className="rounded-lg border border-black px-2.5 py-1 hover:bg-lavender" aria-label="Zoom out">−</button>
            <span className="w-12 text-center text-xs">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(1)))} className="rounded-lg border border-black px-2.5 py-1 hover:bg-lavender" aria-label="Zoom in">+</button>
            <button onClick={onClose} className="ml-2 rounded-lg border border-black bg-lavender px-3 py-1 hover:bg-white" aria-label="Close">✕ Close</button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          <PdfPages url={url} zoom={zoom} />
        </div>
      </div>
    </div>
  );
}

// A button that opens a document in the viewer instead of downloading it.
export function PdfButton({
  url,
  title,
  className,
  children,
}: {
  url: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && <PdfModal url={url} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}
