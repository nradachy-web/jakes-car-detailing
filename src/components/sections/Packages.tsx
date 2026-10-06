import PackagePicker from "@/components/sections/PackagePicker";

export default function Packages() {
  return (
    <section id="packages" className="on-light section">
      <div className="wrap">
        <div className="max-w-[860px]">
          <h2 className="d2">Three details. Three prices.</h2>
          <p className="lede muted mt-6">Pick the one your car needs and book a time.</p>
        </div>

        <div className="mt-12 lg:mt-16">
          <PackagePicker />
        </div>

      </div>
    </section>
  );
}
