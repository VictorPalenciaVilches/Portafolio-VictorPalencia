/** Subtle cyan gradient line between sections */
export default function SectionDivider() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 z-10 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/45 to-transparent shadow-[0_0_18px_rgba(6,182,212,0.35)]"
      aria-hidden
    />
  );
}
