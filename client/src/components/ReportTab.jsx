import { useAppStore } from '../store/store';

export default function ReportTab({ analysis }) {
  const { saveCurrentAnalysis, exportPdf } = useAppStore();

  if (!analysis) return <p className="text-slate-400">Run an analysis to generate recommendations.</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">Recommendations</h3>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <li key={`${rec.text}-${index}`} className="rounded border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200">
              <span
                className={`mr-2 rounded px-2 py-0.5 text-xs ${
                  rec.priority === 'High'
                    ? 'bg-rose-900/50 text-rose-200'
                    : rec.priority === 'Medium'
                      ? 'bg-amber-900/40 text-amber-200'
                      : 'bg-slate-700 text-slate-200'
                }`}
              >
                {rec.priority}
              </span>
              {rec.text}
            </li>
          ))}
        </ul>
      </div>

      {!!analysis.atsWarnings.length && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-200">ATS Warnings</h3>
          <ul className="list-inside list-disc text-sm text-slate-300">
            {analysis.atsWarnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={saveCurrentAnalysis}
          className="rounded bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
        >
          Save Analysis
        </button>
        <button
          onClick={exportPdf}
          className="rounded border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
