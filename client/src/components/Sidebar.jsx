import { useAppStore } from '../store/store';

export default function Sidebar() {
  const { form, setFormField, clearForm, analyzeResume, saveBookmark, loading } = useAppStore();

  return (
    <aside className="w-full space-y-4 border-r border-slate-800 bg-slate-950 p-4 lg:w-80">
      <h2 className="text-lg font-semibold text-slate-200">Inputs</h2>

      <label className="block text-sm text-slate-300">
        Resume PDF
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => setFormField('resumePdf', event.target.files?.[0] || null)}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2 text-sm"
        />
      </label>

      <label className="block text-sm text-slate-300">
        Job Title
        <input
          value={form.jobTitle}
          onChange={(event) => setFormField('jobTitle', event.target.value)}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2 text-sm"
          placeholder="Frontend Engineer"
        />
      </label>

      <label className="block text-sm text-slate-300">
        Company
        <input
          value={form.company}
          onChange={(event) => setFormField('company', event.target.value)}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2 text-sm"
          placeholder="Acme Inc"
        />
      </label>

      <label className="block text-sm text-slate-300">
        Job Description
        <textarea
          value={form.jobDescriptionText}
          onChange={(event) => setFormField('jobDescriptionText', event.target.value)}
          className="mt-1 h-48 w-full rounded border border-slate-700 bg-slate-900 p-2 text-sm"
          placeholder="Paste job description here..."
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={analyzeResume}
          disabled={loading}
          className="rounded bg-cyan-600 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-500 disabled:opacity-60"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
        <button
          onClick={clearForm}
          className="rounded border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-900"
        >
          Clear
        </button>
      </div>

      <button
        onClick={saveBookmark}
        className="w-full rounded border border-emerald-700 px-3 py-2 text-sm text-emerald-300 hover:bg-emerald-900/20"
      >
        Save JD Bookmark
      </button>
    </aside>
  );
}
