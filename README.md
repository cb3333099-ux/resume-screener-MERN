# Resume Screener MERN — AI/ATS Match Analyzer

A complete MERN stack web app that analyzes resume PDFs against job descriptions using pure Node.js keyword/heuristic scoring (no embeddings API).

## Folder Structure

```text
resume-screener-MERN/
├── server/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── analyzeController.js
│   │   └── exportController.js
│   ├── middleware/errorHandler.js
│   ├── models/
│   │   ├── Analysis.js
│   │   └── Bookmark.js
│   ├── routes/
│   │   ├── analyze.js
│   │   ├── analyses.js
│   │   ├── bookmarks.js
│   │   └── export.js
│   ├── services/
│   │   ├── extractionService.js
│   │   ├── pdfGenerator.js
│   │   └── scoringService.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── skillsDict.js
│   │   └── validation.js
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── api/client.js
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── ScoreCard.jsx
│   │   │   ├── BookmarksTab.jsx
│   │   │   ├── CompareTab.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── HistoryTab.jsx
│   │   │   ├── ReportTab.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SkillsTab.jsx
│   │   ├── pages/MainPage.jsx
│   │   ├── store/store.js
│   │   ├── styles/index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── sample-job-descriptions.md
└── README.md
```

## Features

- Resume PDF upload + job description input
- Scoring: overall, ATS, skills, experience, education
- Skills analysis: matched/missing/optional
- 3–5 prioritized recommendations
- MongoDB history persistence for analyses
- Job description bookmarks
- Side-by-side analysis compare view
- Export analysis report as PDF

## API Endpoints

- `POST /api/analyze`
- `POST /api/analyses`
- `GET /api/analyses`
- `GET /api/analyses/:id`
- `DELETE /api/analyses/:id`
- `POST /api/bookmarks`
- `GET /api/bookmarks`
- `DELETE /api/bookmarks/:id`
- `POST /api/export/pdf`

## Setup

### 1) Server

```bash
cd /home/runner/work/resume-screener-MERN/resume-screener-MERN/server
cp .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI` in `.env` when you have your connection string.

### 2) Client

```bash
cd /home/runner/work/resume-screener-MERN/resume-screener-MERN/client
cp .env.example .env
npm install
npm run dev
```

Client runs at `http://localhost:5173` and server runs at `http://localhost:5000`.

## Sample Testing Data

Use sample JDs in `sample-job-descriptions.md`. For a resume PDF, export any existing resume to PDF and upload in sidebar.

## Verification Checklist

- [x] Analyze endpoint returns complete ATS + match payload
- [x] Save/list/get/delete analyses from MongoDB
- [x] Save/list/delete bookmarks
- [x] Compare two saved analyses in UI
- [x] Export PDF report from current analysis
- [x] Dark themed Tailwind UI with tabs and charts
- [x] Pure Node keyword + weighted scoring (no embeddings)
