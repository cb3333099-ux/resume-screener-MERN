import { create } from 'zustand';
import api from '../api/client';

const initialForm = {
  resumePdf: null,
  jobDescriptionText: '',
  jobTitle: '',
  company: '',
};

export const useAppStore = create((set, get) => ({
  form: initialForm,
  activeTab: 'Dashboard',
  loading: false,
  error: '',
  currentAnalysis: null,
  analyses: [],
  bookmarks: [],

  setActiveTab: (activeTab) => set({ activeTab }),
  setFormField: (key, value) =>
    set((state) => ({ form: { ...state.form, [key]: value } })),
  clearForm: () => set({ form: initialForm }),

  analyzeResume: async () => {
    const { form } = get();
    if (!form.resumePdf || !form.jobDescriptionText.trim()) {
      set({ error: 'Resume PDF and job description are required.' });
      return;
    }

    set({ loading: true, error: '' });
    try {
      const formData = new FormData();
      formData.append('resumePdf', form.resumePdf);
      formData.append('jobDescriptionText', form.jobDescriptionText);
      if (form.jobTitle) formData.append('jobTitle', form.jobTitle);
      if (form.company) formData.append('company', form.company);

      const { data } = await api.post('/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      set({ currentAnalysis: data, activeTab: 'Dashboard' });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to analyze resume.' });
    } finally {
      set({ loading: false });
    }
  },

  saveCurrentAnalysis: async () => {
    const { currentAnalysis } = get();
    if (!currentAnalysis) return;

    set({ loading: true, error: '' });
    try {
      const { data } = await api.post('/analyses', currentAnalysis);
      set((state) => ({ analyses: [data, ...state.analyses], activeTab: 'History' }));
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to save analysis.' });
    } finally {
      set({ loading: false });
    }
  },

  fetchAnalyses: async () => {
    try {
      const { data } = await api.get('/analyses');
      set({ analyses: data });
    } catch {
      set({ error: 'Failed to load analyses.' });
    }
  },

  deleteAnalysis: async (id) => {
    try {
      await api.delete(`/analyses/${id}`);
      set((state) => ({ analyses: state.analyses.filter((item) => item._id !== id) }));
    } catch {
      set({ error: 'Failed to delete analysis.' });
    }
  },

  viewAnalysis: (analysis) => set({ currentAnalysis: analysis, activeTab: 'Dashboard' }),

  saveBookmark: async () => {
    const { form } = get();
    if (!form.jobDescriptionText.trim()) {
      set({ error: 'Job description is required to create bookmark.' });
      return;
    }
    try {
      const { data } = await api.post('/bookmarks', {
        jobTitle: form.jobTitle,
        company: form.company,
        jobDescriptionText: form.jobDescriptionText,
      });
      set((state) => ({ bookmarks: [data, ...state.bookmarks], activeTab: 'Bookmarks' }));
    } catch {
      set({ error: 'Failed to save bookmark.' });
    }
  },

  fetchBookmarks: async () => {
    try {
      const { data } = await api.get('/bookmarks');
      set({ bookmarks: data });
    } catch {
      set({ error: 'Failed to load bookmarks.' });
    }
  },

  deleteBookmark: async (id) => {
    try {
      await api.delete(`/bookmarks/${id}`);
      set((state) => ({ bookmarks: state.bookmarks.filter((item) => item._id !== id) }));
    } catch {
      set({ error: 'Failed to delete bookmark.' });
    }
  },

  loadBookmarkToForm: (bookmark) =>
    set((state) => ({
      form: {
        ...state.form,
        jobTitle: bookmark.jobTitle || '',
        company: bookmark.company || '',
        jobDescriptionText: bookmark.jobDescriptionText || '',
      },
    })),

  exportPdf: async () => {
    const { currentAnalysis } = get();
    if (!currentAnalysis) return;

    try {
      const response = await api.post(
        '/export/pdf',
        { analysisId: currentAnalysis._id, analysis: currentAnalysis },
        { responseType: 'blob' }
      );

      const file = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume-analysis-report.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      set({ error: 'Failed to export PDF report.' });
    }
  },
}));
