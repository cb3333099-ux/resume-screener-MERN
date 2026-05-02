function SkillChip({ item, tone }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs ${tone}`}>{item}</span>
  );
}

function SkillGroup({ title, items, tone }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => <SkillChip key={item} item={item} tone={tone} />)
        ) : (
          <span className="text-sm text-slate-400">None detected</span>
        )}
      </div>
    </div>
  );
}

function CategorySection({ category, matched, missing, optional }) {
  const hasAny =
    (matched?.length ?? 0) + (missing?.length ?? 0) + (optional?.length ?? 0) > 0;
  if (!hasAny) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-300">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {matched?.map((s) => (
          <SkillChip key={s} item={s} tone="bg-emerald-900/40 text-emerald-300" />
        ))}
        {missing?.map((s) => (
          <SkillChip key={s} item={s} tone="bg-rose-900/40 text-rose-300" />
        ))}
        {optional?.map((s) => (
          <SkillChip key={s} item={s} tone="bg-violet-900/40 text-violet-300" />
        ))}
      </div>
    </div>
  );
}

export default function SkillsTab({ analysis }) {
  if (!analysis) return <p className="text-slate-400">Run an analysis to view skill matching.</p>;

  const byCategory = analysis.skills?.byCategory;

  if (byCategory) {
    // Collect all category names across matched/missing/optional
    const allCategories = [
      ...new Set([
        ...Object.keys(byCategory.matched ?? {}),
        ...Object.keys(byCategory.missing ?? {}),
        ...Object.keys(byCategory.optional ?? {}),
      ]),
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> Matched
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-500" /> Missing
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-violet-500" /> Optional
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allCategories.map((cat) => (
            <CategorySection
              key={cat}
              category={cat}
              matched={byCategory.matched?.[cat] ?? []}
              missing={byCategory.missing?.[cat] ?? []}
              optional={byCategory.optional?.[cat] ?? []}
            />
          ))}
        </div>
      </div>
    );
  }

  // Fallback: flat arrays (older data from DB)
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SkillGroup title="Matched Skills" items={analysis.skills.matched} tone="bg-emerald-900/40 text-emerald-300" />
      <SkillGroup title="Missing Skills" items={analysis.skills.missing} tone="bg-rose-900/40 text-rose-300" />
      <SkillGroup title="Optional Skills" items={analysis.skills.optional} tone="bg-violet-900/40 text-violet-300" />
    </div>
  );
}
