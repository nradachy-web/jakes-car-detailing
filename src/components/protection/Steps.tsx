export interface Step {
  name: string;
  body: React.ReactNode;
}

const rule = "1px solid var(--line)";

/** A numbered sequence as full-width rows. Numbered because the order matters. */
export function StepRows({ steps }: { steps: Step[] }) {
  return (
    <ol style={{ borderTop: rule }}>
      {steps.map((step, i) => (
        <li key={step.name} className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-7 md:grid-cols-[5rem_1fr]" style={{ borderBottom: rule }}>
          <span className="d3" style={{ color: "var(--accent)" }} aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="d3">{step.name}</h3>
            <div className="muted mt-2.5 max-w-[48ch]">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The same idea laid left to right: one column per step from 1024px up, rows below that. */
export function StepColumns({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid lg:grid-cols-5 lg:gap-x-7" style={{ borderTop: rule }}>
      {steps.map((step, i) => (
        <li
          key={step.name}
          className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-b py-7 lg:block lg:border-b-0 lg:py-0 lg:pt-8"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="figure block text-[2rem] lg:text-[3.5rem]" style={{ color: "var(--accent)" }} aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="d4 lg:mt-6">{step.name}</h3>
            <div className="muted mt-2.5 text-[0.9688rem]">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
