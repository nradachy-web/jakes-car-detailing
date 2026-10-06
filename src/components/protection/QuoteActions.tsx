import Link from "next/link";
import { BOOK_HREF, BRAND, QUOTE_LABEL } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** The two ways into a quote: the form, with the service preselected, or the phone. */
export default function QuoteActions({ service, className }: { service: "correction" | "ceramic"; className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:flex sm:flex-wrap", className)}>
      <Link href={`${BOOK_HREF}?service=${service}`} className="btn btn-primary">
        {QUOTE_LABEL}
      </Link>
      <a href={`tel:${BRAND.phoneTel}`} className="btn btn-ghost">
        Call {BRAND.phone}
      </a>
    </div>
  );
}
