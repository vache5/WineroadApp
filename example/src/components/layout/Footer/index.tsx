const FOOTER_SECTIONS = ["Section One", "Section Two", "Section Three"];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        {FOOTER_SECTIONS.map((section) => (
          <div key={section} className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
              {section}
            </p>
          </div>
        ))}
      </div>
    </footer>
  );
}
