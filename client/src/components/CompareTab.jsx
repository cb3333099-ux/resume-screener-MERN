import { useMemo, useState } from 'react';
import { useAppStore } from '../store/store';
import ScoreCard from './Common/ScoreCard';

function AnalysisSelect({ label, value, onChange, analyses }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
      >
        <option value="">Select analysis</option>
        {analyses.map((analysis) => (
          <option key={analysis._id} value={analysis._id}>
            {analysis.jobTitle || 'Untitled'} - {new Date(analysis.createdAt).toLocaleDateString()}
          </option>
        ))}
      </select>
    </label>
  );
}

function ComparisonCard({ analysis }) {
  if (!analysis) return <p className="text-slate-500">Select analysis</p>;

  return (
    <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-100">{analysis.jobTitle || 'Untitled role'}</h3>
      <p className="text-xs text-slate-400">{analysis.company || '-'}</p>
      <div className="grid grid-cols-2 gap-2">
        <ScoreCard title="Overall" value={analysis.overallScore} />
        <ScoreCard title="ATS" value={analysis.atsScore} />
        <ScoreCard title="Skill" value={analysis.skillMatchScore} />
        <ScoreCard title="Exp" value={analysis.experience.score} />
      </div>
    </div>
  );
}

export default function CompareTab() {
  const { analyses } = useAppStore();
  const [leftId, setLeftId] = useState('');
  const [rightId, setRightId] = useState('');

  const [leftAnalysis, rightAnalysis] = useMemo(() => {
    return [
      analyses.find((a) => a._id === leftId),
      analyses.find((a) => a._id === rightId),
    ];
  }, [analyses, leftId, rightId]);

  if (!analyses.length) return <p className="text-slate-400">Save analyses first to compare.</p>;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <AnalysisSelect label="Analysis A" value={leftId} onChange={setLeftId} analyses={analyses} />
        <AnalysisSelect label="Analysis B" value={rightId} onChange={setRightId} analyses={analyses} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ComparisonCard analysis={leftAnalysis} />
        <ComparisonCard analysis={rightAnalysis} />
      </div>
    </div>
  );
}
