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
- Skills analysis: matched/missing/optional grouped by category (Languages, Frontend, Backend, Databases, Cloud, DevOps, Testing, ML/Data, Methodologies)
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
cd server
cp .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI` in `server/.env` to your MongoDB connection string (Atlas or local).

### 2) Client

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Client runs at `http://localhost:5173` and server runs at `http://localhost:5000`.
`VITE_API_URL` can be set as either `http://localhost:5000` or `http://localhost:5000/api`.

## Sample Testing Data

Use sample JDs in `sample-job-descriptions.md`. For a resume PDF, export any existing resume to PDF and upload in sidebar.

## Project Report

A comprehensive academic project report is available in the `docs/` folder:

- **[Project Report (Markdown)](docs/PROJECT_REPORT.md)** — Full 43-page academic report covering introduction, objectives, literature survey, system design, architecture diagrams, database schemas, API documentation, algorithm pseudocode, test cases, and references.
- **[Report Customization Guide](docs/REPORT_GUIDE.md)** — Instructions for filling in student details, adding screenshots, converting to PDF/DOCX, and formatting for submission.

## Verification Checklist

- [x] Analyze endpoint returns complete ATS + match payload with `skills.byCategory` groupings
- [x] Skills tab displays matched/missing/optional chips grouped by category (Languages, Frontend, Backend, etc.)
- [x] Graceful fallback to flat skill arrays for older saved analyses
- [x] Save/list/get/delete analyses from MongoDB
- [x] Save/list/delete bookmarks
- [x] Compare two saved analyses in UI
- [x] Export PDF report from current analysis
- [x] Dark themed Tailwind UI with tabs and charts
- [x] Pure Node keyword + weighted scoring (no embeddings)
