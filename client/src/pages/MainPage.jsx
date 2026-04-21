import { useMemo } from 'react';
import Header from '../components/Common/Header';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import SkillsTab from '../components/SkillsTab';
import ReportTab from '../components/ReportTab';
import HistoryTab from '../components/HistoryTab';
import BookmarksTab from '../components/BookmarksTab';
import CompareTab from '../components/CompareTab';
import { useAppStore } from '../store/store';

const TABS = ['Dashboard', 'Skills', 'Report', 'History', 'Bookmarks', 'Compare'];

export default function MainPage() {
  const { currentAnalysis, activeTab, setActiveTab, error } = useAppStore();

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'Skills':
        return <SkillsTab analysis={currentAnalysis} />;
      case 'Report':
        return <ReportTab analysis={currentAnalysis} />;
      case 'History':
        return <HistoryTab />;
      case 'Bookmarks':
        return <BookmarksTab />;
      case 'Compare':
        return <CompareTab />;
      case 'Dashboard':
      default:
        return <Dashboard analysis={currentAnalysis} />;
    }
  }, [activeTab, currentAnalysis]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-1.5 text-sm ${
                  activeTab === tab
                    ? 'bg-cyan-600 text-white'
                    : 'border border-slate-700 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {error ? (
            <div className="mb-4 rounded border border-rose-700 bg-rose-900/20 p-3 text-sm text-rose-300">
              {error}
            </div>
          ) : null}

          {tabContent}
        </main>
      </div>
    </div>
  );
}
