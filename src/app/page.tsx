import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Packages from "@/components/sections/Packages";
import Method from "@/components/sections/Method";
import Lineup from "@/components/sections/Lineup";
import Reviews from "@/components/sections/Reviews";
import UnderTheLight from "@/components/sections/UnderTheLight";
import Journal from "@/components/sections/Journal";
import BookBand from "@/components/sections/BookBand";
import { SEO } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ ...SEO.home, path: "/" });

export default function Home() {
  return (
    <>
      <Hero />
      <Packages />
      <Method />
      <Lineup />
      <Reviews />
      <UnderTheLight />
      <Journal />
      <BookBand />
    </>
  );
}
