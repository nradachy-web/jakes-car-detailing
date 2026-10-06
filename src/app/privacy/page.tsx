import type { Metadata } from "next";
import Link from "next/link";
import DarkHeader from "@/components/content/DarkHeader";
import { BOOK_HREF, BRAND } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Privacy | ${BRAND.name}`,
  description: `What the ${BRAND.name} website collects through its booking form, what it is used for, and how to have your details removed.`,
  path: "/privacy",
});

const UPDATED = "October 5, 2026";

export default function PrivacyPage() {
  return (
    <>
      <DarkHeader
        title={["Privacy."]}
        lede={<p>What this site collects and what happens to it. The short version: only what you send through the booking form.</p>}
      />

      <section className="on-light section">
        <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,66ch)_minmax(280px,380px)] lg:justify-between lg:gap-20">
          <div className="article">
            <p className="muted text-[0.9375rem]">Last updated {UPDATED}</p>

            <h2>What this site collects</h2>
            <p>
              This site collects only what you type into the <Link href={BOOK_HREF} className="link">booking form</Link>:
            </p>
            <ul>
              <li>Your name</li>
              <li>Your phone number</li>
              <li>Your email address, if you choose to add one</li>
              <li>Your vehicle</li>
              <li>The service you are asking about</li>
              <li>The day and time you would prefer</li>
              <li>Any notes you add</li>
            </ul>
            <p>You can read every page of this site without giving any of it.</p>

            <h2>What it is used for</h2>
            <p>
              Your details are used to reply to you and to arrange your booking. That is all. They are not sold, and they
              are not passed to anyone for marketing.
            </p>

            <h2>How your request reaches Jake</h2>
            <p>
              When you send the form, it is delivered by email through a form processor called{" "}
              <a href="https://web3forms.com" target="_blank" rel="noopener" className="link">
                Web3Forms
              </a>
              , which passes your message on to Jake&rsquo;s inbox. If the form cannot send, it shows your request as a
              ready-made text or email for you to send yourself, and this site keeps no copy. If you call, text or email
              instead, your message goes straight to Jake&rsquo;s phone or inbox.
            </p>

            <h2>Tracking</h2>
            <p>
              This site sets no advertising trackers and no analytics trackers. The fonts and photos are served from this
              site, not from a third party.
            </p>
            <p>
              Some links lead to other sites. Once you follow one, that site&rsquo;s own privacy policy applies.
            </p>

            <h2>Seeing or removing your details</h2>
            <p>
              To ask what details Jake holds about you, or to have them removed, email{" "}
              <a href={`mailto:${BRAND.email}`} className="link break-all">
                {BRAND.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${BRAND.phoneTel}`} className="link whitespace-nowrap">
                {BRAND.phone}
              </a>
              .
            </p>

            <h2>Changes</h2>
            <p>If any of this changes, this page will be updated and the date at the top will change with it.</p>
          </div>

          <aside
            aria-labelledby="privacy-contact"
            className="border-t pt-8 lg:sticky lg:top-[calc(var(--nav-h)+32px)] lg:self-start"
            style={{ borderColor: "var(--fg)" }}
          >
            <h2 id="privacy-contact" className="d3">
              A question about your details?
            </h2>
            <p className="muted mt-3">Ask Jake directly.</p>
            <div className="mt-7 grid gap-3">
              <a href={`mailto:${BRAND.email}`} className="btn btn-primary">
                Email Jake
              </a>
              <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
                Call {BRAND.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
