import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ScoreCard from './Common/ScoreCard';

const COLORS = ['#06b6d4', '#f97316', '#a78bfa'];

function MatchBanner({ matchPercentage, matched, missing }) {
  const color =
    matchPercentage >= 75
      ? 'border-emerald-700 bg-emerald-900/20'
      : matchPercentage >= 50
        ? 'border-amber-700 bg-amber-900/20'
        : 'border-rose-700 bg-rose-900/20';
  const textColor =
    matchPercentage >= 75
      ? 'text-emerald-300'
      : matchPercentage >= 50
        ? 'text-amber-300'
        : 'text-rose-300';
  const barColor =
    matchPercentage >= 75
      ? 'bg-emerald-500'
      : matchPercentage >= 50
        ? 'bg-amber-500'
        : 'bg-rose-500';

  return (
    <div className={`rounded-xl border p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">JD Match</p>
          <p className={`mt-1 text-4xl font-bold ${textColor}`}>{matchPercentage}%</p>
          <p className="mt-1 text-xs text-slate-400">
            {matched} matched · {missing} missing
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Keyword coverage</p>
        </div>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, matchPercentage))}%` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard({ analysis }) {
  if (!analysis) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">Upload a resume PDF and paste a job description, then click <strong className="text-slate-200">Analyze</strong> to see results.</p>
      </div>
    );
  }

  const matchPercentage = analysis.matchPercentage ?? analysis.skillMatchScore;

  const pieData = [
    { name: 'Matched', value: analysis.skills.matched.length },
    { name: 'Missing', value: analysis.skills.missing.length },
    { name: 'Optional', value: analysis.skills.optional.length },
  ];

  const barData = [
    { label: 'Overall', score: analysis.overallScore },
    { label: 'ATS', score: analysis.atsScore },
    { label: 'Skills', score: analysis.skillMatchScore },
    { label: 'Experience', score: analysis.experience.score },
    { label: 'Education', score: analysis.education.score },
  ];

  return (
    <div className="space-y-6">
      <MatchBanner
        matchPercentage={matchPercentage}
        matched={analysis.skills.matched.length}
        missing={analysis.skills.missing.length}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ScoreCard title="Overall" value={analysis.overallScore} subtitle="0-100" showBar />
        <ScoreCard title="ATS Score" value={analysis.atsScore} subtitle="0-100" showBar />
        <ScoreCard title="Skill Score" value={analysis.skillMatchScore} subtitle={`${analysis.skills.matched.length} matched`} showBar />
        <ScoreCard
          title="Experience"
          value={analysis.experience.candidateYears}
          subtitle={`${analysis.experience.status} (req. ${analysis.experience.requiredYears} yrs)`}
        />
      </div>

      {analysis.hasSections && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-200">Resume Sections Detected</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(analysis.hasSections).map(([section, present]) => (
              <span
                key={section}
                className={`rounded-full px-3 py-1 text-xs capitalize ${
                  present
                    ? 'bg-emerald-900/40 text-emerald-300'
                    : 'bg-rose-900/40 text-rose-300'
                }`}
              >
                {present ? '✓' : '✗'} {section}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-72 rounded-xl border border-slate-700 bg-slate-900 p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-200">Skills Breakdown</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90}>
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 rounded-xl border border-slate-700 bg-slate-900 p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-200">Category Scores</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="label" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="score" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
