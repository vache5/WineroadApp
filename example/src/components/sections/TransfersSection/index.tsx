const PLACEHOLDER_ROWS = Array.from({ length: 3 });

export default function TransfersSection() {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            Section Label
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Heading
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            Description text for this section. Replace the copy and content with
            real data later.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_ROWS.map((_, index) => (
            <article
              key={index}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Label</span>
                <span>Detail</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Item Heading
              </h3>
              <p className="text-sm text-gray-600">
                Description placeholder to explain the highlight of this card.
              </p>
              <div className="mt-auto flex flex-col gap-2 pt-4">
                <div className="h-2 rounded-full bg-gray-100" />
                <div className="h-2 w-3/4 rounded-full bg-gray-100" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
