export default function ScoreCard({ title, value, subtitle }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-cyan-300">{value}</p>
      {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
    </div>
  );
}
