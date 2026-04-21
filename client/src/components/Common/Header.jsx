export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
      <h1 className="text-xl font-semibold text-slate-100">Resume Screener MERN — AI/ATS Match Analyzer</h1>
      <p className="text-sm text-slate-400">
        Upload resume + job description to evaluate ATS readiness and job fit.
      </p>
    </header>
  );
}
