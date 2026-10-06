"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { BRAND, SERVICE_OPTIONS } from "@/lib/constants";

/**
 * Booking request form.
 *
 * A request goes two places at once: Jake's booking desk, which saves it
 * (NEXT_PUBLIC_DESK_INTAKE_URL and _TOKEN), and an email copy through
 * Web3Forms (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY). If either lands, the visitor
 * goes to /thank-you/. If both fail, or neither is configured, the form never
 * pretends: it hands the visitor the same request as a ready-to-send text or
 * email to Jake's own number and inbox. Web3Forms can report success for a
 * dead key, which is one reason the desk copy exists.
 */

const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
// Jake's booking desk. The token only says which shop the request is for; it
// is public by nature, and the desk itself checks where the request came from.
const DESK_URL = process.env.NEXT_PUBLIC_DESK_INTAKE_URL || "";
const DESK_TOKEN = process.env.NEXT_PUBLIC_DESK_INTAKE_TOKEN || "";

const TIMES = ["Any time", "Morning", "Afternoon", "Evening"];

type Status = "idle" | "sending" | "handoff";

interface Fields {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const EMPTY: Fields = { name: "", phone: "", email: "", vehicle: "", service: "", date: "", time: TIMES[0], notes: "" };

function serviceLabel(value: string) {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? "Not sure yet";
}

function prettyDate(iso: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });
}

/** The request as a short message, used for the email body and the text handoff. */
function compose(f: Fields) {
  const lines = [
    `Hi Jake, I'd like to book: ${serviceLabel(f.service)}.`,
    `Vehicle: ${f.vehicle}`,
    f.date ? `Preferred day: ${prettyDate(f.date)} (${f.time.toLowerCase()})` : `Preferred time: ${f.time.toLowerCase()}`,
    f.notes ? `Notes: ${f.notes}` : "",
    `${f.name}, ${f.phone}${f.email ? `, ${f.email}` : ""}`,
  ];
  return lines.filter(Boolean).join("\n");
}

// Two values only the browser knows: the ?service= in the address bar and
// today's date. Read through useSyncExternalStore so the static HTML and the
// first client render agree (both see ""), then the real values arrive.
const never = () => () => {};
const readService = () => {
  const wanted = new URLSearchParams(window.location.search).get("service") ?? "";
  return SERVICE_OPTIONS.some((o) => o.value === wanted) ? wanted : "";
};
const readToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};
const empty = () => "";

export default function BookingForm() {
  const service = useSyncExternalStore(never, readService, empty);
  const today = useSyncExternalStore(never, readToday, empty);
  // Keyed on the service so a link such as ?service=full opens with it chosen.
  return <Form key={service} initialService={service} today={today} />;
}

function Form({ initialService, today }: { initialService: string; today: string }) {
  const router = useRouter();
  const [f, setF] = useState<Fields>({ ...EMPTY, service: initialService });
  const [status, setStatus] = useState<Status>("idle");
  const [failed, setFailed] = useState(false);
  const handoffRef = useRef<HTMLHeadingElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const wasHandoff = useRef(false);

  // The handoff panel replaces the form in place. Bring it into view and move
  // focus to its heading; coming back, return focus to the first field.
  useEffect(() => {
    if (status === "handoff") {
      wasHandoff.current = true;
      handoffRef.current?.focus({ preventScroll: true });
      handoffRef.current?.scrollIntoView({ block: "start" });
    } else if (status === "idle" && wasHandoff.current) {
      wasHandoff.current = false;
      serviceRef.current?.focus();
    }
  }, [status]);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [key]: e.target.value }));

  const message = useMemo(() => compose(f), [f]);
  const quoted = f.service === "correction" || f.service === "ceramic";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: a filled hidden field means a bot. Drop it silently.
    if ((form.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked) return;

    if (!KEY && !DESK_URL) {
      setFailed(false);
      setStatus("handoff");
      return;
    }

    setStatus("sending");
    // Two independent deliveries, sent together: Jake's booking desk (which
    // saves the request) and an email copy through Web3Forms. Either one
    // landing counts. Only when both fail does the visitor get the handoff.
    const toDesk: Promise<boolean> = DESK_URL
      ? fetch(DESK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: DESK_TOKEN,
            name: f.name,
            phone: f.phone,
            email: f.email,
            vehicle: f.vehicle,
            service: f.service,
            day: f.date,
            time: f.time,
            notes: f.notes,
          }),
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => Boolean(data?.ok))
          .catch(() => false)
      : Promise.resolve(false);

    const toEmail: Promise<boolean> = KEY
      ? fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: KEY,
            subject: `${quoted ? "Quote request" : "Booking request"}: ${f.name} (${serviceLabel(f.service)})`,
            from_name: `${BRAND.name} website`,
            name: f.name,
            phone: f.phone,
            email: f.email || undefined,
            vehicle: f.vehicle,
            service: serviceLabel(f.service),
            preferred_day: f.date ? prettyDate(f.date) : "No day given",
            preferred_time: f.time,
            notes: f.notes || "None",
            message,
          }),
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => Boolean(data?.success))
          .catch(() => false)
      : Promise.resolve(false);

    const [saved, emailed] = await Promise.all([toDesk, toEmail]);
    if (saved || emailed) {
      router.push("/thank-you/");
    } else {
      setFailed(true);
      setStatus("handoff");
    }
  }

  if (status === "handoff") {
    const sms = `sms:${BRAND.phoneTel}?&body=${encodeURIComponent(message)}`;
    const mail = `mailto:${BRAND.email}?subject=${encodeURIComponent(`${quoted ? "Quote request" : "Booking request"}: ${serviceLabel(f.service)}`)}&body=${encodeURIComponent(message)}`;
    return (
      <div role="status" aria-live="polite">
        <h3 ref={handoffRef} tabIndex={-1} className="d3 scroll-mt-[calc(var(--nav-h)+24px)] outline-none">
          {failed ? "That didn’t send. Your request is ready to go another way." : "Your request is ready. Send it straight to Jake."}
        </h3>
        <p className="muted mt-4 max-w-[52ch]">
          {failed
            ? "The form could not reach Jake just now. Nothing was lost: send the same details by text or email in one tap."
            : "Choose how to send it. The message below is filled in for you."}
        </p>
        <pre className="mt-6 max-w-[60ch] rounded-[6px] border p-5 font-sans text-[0.9688rem] leading-relaxed whitespace-pre-wrap" style={{ borderColor: "var(--line)", background: "var(--raised)" }}>
          {message}
        </pre>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={sms} className="btn btn-primary">
            Text it to Jake
          </a>
          <a href={mail} className="btn btn-ghost">
            Email it
          </a>
          <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
            Call {BRAND.phone}
          </a>
        </div>
        <button type="button" onClick={() => setStatus("idle")} className="link mt-7 cursor-pointer">
          Change my details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <noscript>
        <p className="rounded-[4px] border p-4" style={{ borderColor: "var(--line)" }}>
          This form needs JavaScript to send. Call or text <a href={`tel:${BRAND.phoneTel}`}>{BRAND.phone}</a>, or email{" "}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>, and Jake will take it from there.
        </p>
      </noscript>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="field">
        <label htmlFor="bf-service">What would you like done?</label>
        <select ref={serviceRef} id="bf-service" name="service" required value={f.service} onChange={set("service")} className="input">
          <option value="" disabled>
            Choose a service
          </option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="bf-vehicle">
          Your vehicle <span className="hint">(year, make and model)</span>
        </label>
        <input id="bf-vehicle" name="vehicle" required pattern=".*\S.*" title="Year, make and model" value={f.vehicle} onChange={set("vehicle")} autoComplete="off" placeholder="2021 Audi RS 3" className="input" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="bf-date">
            Preferred day <span className="hint">(optional)</span>
          </label>
          <input id="bf-date" name="date" type="date" min={today || undefined} value={f.date} onChange={set("date")} className="input" />
        </div>
        <div className="field">
          <label htmlFor="bf-time">Time of day</label>
          <select id="bf-time" name="time" value={f.time} onChange={set("time")} className="input">
            {TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="bf-name">Your name</label>
          <input id="bf-name" name="name" required pattern=".*\S.*" title="Your name" value={f.name} onChange={set("name")} autoComplete="name" className="input" />
        </div>
        <div className="field">
          <label htmlFor="bf-phone">Phone</label>
          <input id="bf-phone" name="phone" type="tel" required pattern="[^0-9]*([0-9][^0-9]*){7,}" title="A phone number with at least seven digits" value={f.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" className="input" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="bf-email">
          Email <span className="hint">(optional)</span>
        </label>
        <input id="bf-email" name="email" type="email" value={f.email} onChange={set("email")} autoComplete="email" className="input" />
      </div>

      <div className="field">
        <label htmlFor="bf-notes">
          Anything Jake should know? <span className="hint">(optional)</span>
        </label>
        <textarea id="bf-notes" name="notes" value={f.notes} onChange={set("notes")} placeholder="Stains, pet hair, a spot you want looked at" className="input" />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? "Sending" : quoted ? "Send quote request" : "Send booking request"}
        </button>
        <p className="muted text-[0.875rem]">Jake confirms the time with you directly.</p>
      </div>
    </form>
  );
}
