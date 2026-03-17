const PLACEHOLDER_VALUES = Array.from({ length: 3 });

export function CoreValuesSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
            Section Label
          </p>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Heading
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600">
            Description text for this section. Use it to outline the values or
            pillars you want to highlight.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PLACEHOLDER_VALUES.map((_, index) => (
            <article
              key={index}
              className="rounded-2xl border border-gray-200 p-6 text-left"
            >
              <div className="mb-4 h-12 w-12 rounded-full bg-gray-100" />
              <h3 className="text-xl font-semibold text-gray-900">
                Item Heading
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Placeholder description for this value. Keep it brief to
                maintain the clean layout.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
