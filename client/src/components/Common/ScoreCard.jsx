function scoreColor(value) {
  if (value >= 75) return 'bg-emerald-500';
  if (value >= 50) return 'bg-amber-500';
  return 'bg-rose-500';
}

export default function ScoreCard({ title, value, subtitle, showBar = false }) {
  const numValue = typeof value === 'number' ? value : 0;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-cyan-300">{value}</p>
      {showBar && (
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-700">
          <div
            className={`h-2 rounded-full transition-all duration-700 ${scoreColor(numValue)}`}
            style={{ width: `${Math.min(100, Math.max(0, numValue))}%` }}
          />
        </div>
      )}
      {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
