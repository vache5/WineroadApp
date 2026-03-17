interface Reason {
  title: string;
  description: string;
}

interface ReasonListProps {
  reasons: Reason[];
}

export function ReasonList({ reasons }: ReasonListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {reasons.map((reason, index) => (
        <article
          key={index}
          className="rounded-2xl border border-white/20 bg-white/5 p-6 text-left text-white"
        >
          <h3 className="text-xl font-semibold">{reason.title}</h3>
          <p className="mt-3 text-sm text-white/80">{reason.description}</p>
        </article>
      ))}
    </div>
  );
}
