import { ReasonList } from "./ReasonList";

const PLACEHOLDER_REASONS = Array.from({ length: 3 }).map(() => ({
  title: "Heading",
  description: "Description text for this list item. Replace later.",
}));

export function WhyUsSection() {
  return (
    <section className="bg-gray-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Section Label
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Heading</h2>
          <p className="mx-auto max-w-2xl text-base text-white/70">
            Description text for this section. Use it to highlight key reasons
            or benefits in a concise way.
          </p>
        </div>

        <ReasonList reasons={PLACEHOLDER_REASONS} />
      </div>
    </section>
  );
}
