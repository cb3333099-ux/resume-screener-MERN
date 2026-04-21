import { useEffect } from 'react';
import { useAppStore } from '../store/store';

export default function HistoryTab() {
  const { analyses, fetchAnalyses, deleteAnalysis, viewAnalysis } = useAppStore();

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  if (!analyses.length) return <p className="text-slate-400">No saved analyses yet.</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-800 text-left text-slate-300">
          <tr>
            <th className="p-3">Job</th>
            <th className="p-3">Company</th>
            <th className="p-3">Overall</th>
            <th className="p-3">Created</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {analyses.map((analysis) => (
            <tr key={analysis._id} className="border-t border-slate-800 text-slate-200">
              <td className="p-3">{analysis.jobTitle || 'Untitled role'}</td>
              <td className="p-3">{analysis.company || '-'}</td>
              <td className="p-3">{analysis.overallScore}</td>
              <td className="p-3">{new Date(analysis.createdAt).toLocaleString()}</td>
              <td className="space-x-2 p-3">
                <button
                  onClick={() => viewAnalysis(analysis)}
                  className="rounded border border-cyan-700 px-2 py-1 text-cyan-300"
                >
                  View
                </button>
                <button
                  onClick={() => deleteAnalysis(analysis._id)}
                  className="rounded border border-rose-700 px-2 py-1 text-rose-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
