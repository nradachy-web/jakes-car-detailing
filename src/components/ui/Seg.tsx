"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SegProps<T extends string> {
  label: string; // accessible name for the group
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** tabs = controls tab panels (pass idBase); toggle = a plain choice */
  mode?: "tabs" | "toggle";
  idBase?: string;
  className?: string;
}

/** Segmented control with a sliding thumb. Arrow keys move between options. */
export default function Seg<T extends string>({ label, options, value, onChange, mode = "toggle", idBase, className }: SegProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, options.findIndex((o) => o.value === value));

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role={mode === "tabs" ? "tablist" : "group"}
      aria-label={label}
      className={cn("seg", className)}
      style={{ "--n": options.length, "--i": index } as React.CSSProperties}
      onKeyDown={onKeyDown}
    >
      <span className="seg-thumb" aria-hidden="true" />
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            {...(mode === "tabs"
              ? { role: "tab", "aria-selected": on, id: `${idBase}-tab-${o.value}`, "aria-controls": `${idBase}-panel-${o.value}`, tabIndex: on ? 0 : -1 }
              : { "aria-pressed": on })}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
