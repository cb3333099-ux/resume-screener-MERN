import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ScoreCard from './Common/ScoreCard';

const COLORS = ['#06b6d4', '#f97316', '#a78bfa'];

export default function Dashboard({ analysis }) {
  if (!analysis) {
    return <p className="text-slate-400">Run an analysis to view dashboard metrics.</p>;
  }

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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ScoreCard title="Overall" value={analysis.overallScore} subtitle="0-100" />
        <ScoreCard title="ATS Score" value={analysis.atsScore} subtitle="0-100" />
        <ScoreCard title="Skill Score" value={analysis.skillMatchScore} subtitle={`${analysis.skills.matched.length} matched`} />
        <ScoreCard
          title="Experience"
          value={analysis.experience.candidateYears}
          subtitle={`${analysis.experience.status} (required ${analysis.experience.requiredYears})`}
        />
      </div>

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
