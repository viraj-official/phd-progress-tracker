// Shared layout pieces so every tab has the same width, padding and heading style.

// Pastel fills used to colour-code objectives, supervisors etc. (see globals.css).
export const pastels = ["bg-mint", "bg-sky", "bg-peach", "bg-lavender", "bg-butter", "bg-rose"];

// Prefix a file path in public/ with the site's base path (GitHub Pages serves the
// site from /phd-progress-tracker). External links are left unchanged.
// The build id is appended so a new deploy always serves fresh files (no stale cache).
export const asset = (url: string) =>
  url.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${url}${url.includes("?") ? "&" : "?"}v=${process.env.NEXT_PUBLIC_BUILD_ID ?? ""}`
    : url;

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export function PageHeader({
  title,
  description,
  aside,
}: {
  title: string;
  description?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-neutral-300 pb-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 leading-relaxed text-neutral-600">{description}</p>}
      </div>
      {aside && <div className="font-mono text-xs uppercase tracking-widest text-neutral-500">{aside}</div>}
    </div>
  );
}

export const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Prof\.)\s*/, "")
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(-2)
    .map((w) => w[0])
    .join("");

export function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">{children}</p>;
}

// Animated pastel blob with a cartoon picture, or initials when there is no picture yet.
export function Avatar({
  name,
  src,
  color = "bg-lavender",
  size = "h-28 w-28 sm:h-36 sm:w-36",
  text = "text-3xl sm:text-4xl",
}: {
  name: string;
  src?: string;
  color?: string;
  size?: string;
  text?: string;
}) {
  return (
    <div className={`float relative shrink-0 ${size}`}>
      <div className={`blob card-2d absolute inset-0 overflow-hidden border-2 border-black ${color}`}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(src)} alt={name} className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto max-w-none object-contain" />
        ) : (
          <span className={`flex h-full w-full items-center justify-center font-mono font-bold ${text}`}>{initials(name)}</span>
        )}
      </div>
    </div>
  );
}
