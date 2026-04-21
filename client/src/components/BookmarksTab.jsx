import { useEffect } from 'react';
import { useAppStore } from '../store/store';

export default function BookmarksTab() {
  const { bookmarks, fetchBookmarks, deleteBookmark, loadBookmarkToForm, setActiveTab } = useAppStore();

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  if (!bookmarks.length) return <p className="text-slate-400">No bookmarks saved yet.</p>;

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <div key={bookmark._id} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">{bookmark.jobTitle || 'Untitled role'}</h3>
              <p className="text-xs text-slate-400">{bookmark.company || 'No company'}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  loadBookmarkToForm(bookmark);
                  setActiveTab('Dashboard');
                }}
                className="rounded border border-cyan-700 px-2 py-1 text-xs text-cyan-300"
              >
                Load to Form
              </button>
              <button
                onClick={() => deleteBookmark(bookmark._id)}
                className="rounded border border-rose-700 px-2 py-1 text-xs text-rose-300"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="mt-2 line-clamp-3 text-sm text-slate-300">{bookmark.jobDescriptionText}</p>
        </div>
      ))}
    </div>
  );
}
