import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { POSTS } from "@/lib/posts";
import { car } from "@/lib/photos";

/** Salt season, and Jake's three articles. The winter one leads: it is the local story. */
export default function Journal() {
  const [lead, ...rest] = POSTS;
  return (
    <section className="on-spruce section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
        <Photo
          slug={lead.photo}
          cut="w"
          alt={car(lead.photo).alt}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3]"
        />
        <div>
          <h2 className="d2">Salt season is hard on a car.</h2>
          <p className="lede muted mt-6">{lead.excerpt}</p>
          <Link href={`/post/${lead.slug}/`} className="link mt-6 inline-block">
            Read Jake&rsquo;s winter guide
          </Link>

          <ul className="mt-12 border-t border-white/14">
            {rest.map((p) => (
              <li key={p.slug} className="border-b border-white/14">
                <Link href={`/post/${p.slug}/`} className="group flex items-baseline justify-between gap-6 py-5">
                  <span className="d4 transition-colors group-hover:text-sky">{p.title}</span>
                  <span className="muted shrink-0 text-[0.875rem]">{p.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
