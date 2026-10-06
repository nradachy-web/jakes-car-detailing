import Link from "next/link";
import { PACKAGES, QUOTED } from "@/lib/constants";

/** All five services as full-width rows, each a link to its page. */
export default function ServiceRows() {
  const rows = [
    ...PACKAGES.map((p) => ({ href: p.slug, name: p.name, line: p.line, meta: `$${p.price}` })),
    ...QUOTED.map((q) => ({ href: q.slug, name: q.name, line: q.line, meta: "Free quote" })),
  ];
  return (
    <ul style={{ borderTop: "1px solid var(--line)" }}>
      {rows.map((r) => (
        <li key={r.href} style={{ borderBottom: "1px solid var(--line)" }}>
          <Link
            href={r.href}
            className="group grid gap-2 py-7 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)_auto] md:items-center md:gap-10"
          >
            <span className="d3 transition-colors group-hover:text-[var(--accent)]">{r.name}</span>
            <span className="muted">{r.line}</span>
            <span className="d4 md:min-w-[7.5rem] md:text-right">{r.meta}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
