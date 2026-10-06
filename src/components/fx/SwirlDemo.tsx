"use client";

import { useState } from "react";
import PaintPanel from "@/components/fx/PaintPanel";
import Seg from "@/components/ui/Seg";

type Stage = "swirled" | "first" | "corrected";

const STAGES: { value: Stage; label: string; level: number; note: string }[] = [
  {
    value: "swirled",
    label: "Swirled",
    level: 0,
    note: "Years of washing leave a web of fine scratches. Under a light they show as rings, and the reflection goes hazy.",
  },
  {
    value: "first",
    label: "First pass",
    level: 0.66,
    note: "The first machine pass levels the shallow marks. The deeper ones are still there, and the reflection starts to tighten.",
  },
  {
    value: "corrected",
    label: "Corrected",
    level: 1,
    note: "Refined until the light comes back as a clean point, with nothing circling it.",
  },
];

/**
 * The swirl panel with its three stages. Move the pointer (or a finger) across
 * the paint to move the inspection light.
 */
export default function SwirlDemo({ className }: { className?: string }) {
  const [stage, setStage] = useState<Stage>("swirled");
  const current = STAGES.find((s) => s.value === stage) ?? STAGES[0];

  return (
    <figure className={className}>
      <PaintPanel
        level={current.level}
        label={`Illustration of dark paint under an inspection light. Stage shown: ${current.label}. ${current.note}`}
      />
      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,340px)_1fr] md:items-start md:gap-8">
        <Seg
          label="Stage of correction"
          options={STAGES.map((s) => ({ value: s.value, label: s.label }))}
          value={stage}
          onChange={setStage}
        />
        <p className="muted min-h-[4.8em] text-[0.9688rem] md:min-h-[3.2em]" aria-live="polite">
          {current.note}
        </p>
      </div>
      <figcaption className="credit mt-3">
        Illustration of how swirl marks show under an inspection light. Not a photo of a customer&rsquo;s car. Move your
        pointer or finger across the panel to move the light.
      </figcaption>
    </figure>
  );
}
