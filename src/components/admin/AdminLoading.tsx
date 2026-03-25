export function AdminLoading({ message = "Loading…" }: { message?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-white/70">
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-[#D7B46A] border-t-transparent"
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm">{message}</p>
    </div>
  );
}
