function SkillGroup({ title, items, tone }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <span key={item} className={`rounded-full px-3 py-1 text-xs ${tone}`}>
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-400">None detected</span>
        )}
      </div>
    </div>
  );
}

export default function SkillsTab({ analysis }) {
  if (!analysis) return <p className="text-slate-400">Run an analysis to view skill matching.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SkillGroup title="Matched Skills" items={analysis.skills.matched} tone="bg-emerald-900/40 text-emerald-300" />
      <SkillGroup title="Missing Skills" items={analysis.skills.missing} tone="bg-rose-900/40 text-rose-300" />
      <SkillGroup title="Optional Skills" items={analysis.skills.optional} tone="bg-violet-900/40 text-violet-300" />
    </div>
  );
}
