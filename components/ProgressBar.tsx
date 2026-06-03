export default function ProgressBar({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const pct = Math.min(100, Math.max(0, (step / total) * 100));
  const label = `${String(step).padStart(2, "0")} DE ${String(total).padStart(
    2,
    "0"
  )}`;
  return (
    <div className="w-full">
      <div className="text-[12px] tracking-[0.18em] text-muted-soft mb-2">
        {label}
      </div>
      <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gold-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
