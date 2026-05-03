---
marp: true
theme: default
paginate: true
backgroundColor: #1a1a2e
color: #e0e0e0
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    padding: 40px 60px;
  }
  h1 {
    color: #60a5fa;
    font-size: 2em;
    border-bottom: 2px solid #60a5fa;
    padding-bottom: 10px;
  }
  h2 {
    color: #93c5fd;
    font-size: 1.5em;
  }
  h3 {
    color: #a5f3fc;
  }
  strong {
    color: #fbbf24;
  }
  ul li, ol li {
    margin: 6px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    background: #1e3a5f;
    color: #93c5fd;
    padding: 8px 12px;
  }
  td {
    padding: 6px 12px;
    border-bottom: 1px solid #334155;
  }
  .title-slide h1 {
    font-size: 2.4em;
    border: none;
    text-align: center;
  }
---

<!-- _class: title-slide -->

# AI-Based Resume Screening System

### Smart Resume-to-JD Matching & ATS Analysis

**Your Name** | Date | Course / College

---

# Introduction

## What Is This Project?

A full-stack **MERN web application** that helps job applicants optimize their resumes for specific job descriptions.

**Key Highlights:**
- Analyzes resume PDFs against job descriptions automatically
- Provides instant, data-driven feedback on skill gaps
- Checks ATS (Applicant Tracking System) compatibility
- Offers prioritized improvement recommendations

**Who Benefits?**
- 🎓 Students / fresh graduates preparing applications
- 💼 Job seekers wanting to tailor resumes to JDs
- 🏢 HR teams needing quick candidate pre-screening

---

# Abstract

## Project Summary

> *"The Resume Screener is a full-stack web application that automates resume-to-job-description matching using keyword extraction and weighted scoring. It eliminates manual screening inefficiencies by providing data-driven insights on skill gaps, ATS compatibility, and tailored improvement recommendations."*

**Core Technology Stack:**
- **Frontend:** React 19 + Vite + Tailwind CSS
- **Backend:** Node.js + Express REST API
- **Database:** MongoDB Atlas
- **PDF Processing:** pdf-parse (extraction) + PDFKit (generation)

**Outcome:** A deployable, portfolio-ready MERN project that solves a real-world hiring problem without relying on paid AI APIs.

---

# Problem Definition

## Real-World Problems Solved

1. **Manual screening is slow & biased** — HR teams manually review hundreds of resumes per opening
2. **Candidates lack feedback** — Applicants don't know why their resume was rejected
3. **ATS rejections** — Poor formatting or missing keywords eliminate candidates before human review
4. **No skill gap awareness** — Job seekers can't easily see what's missing from their resume vs. a JD
5. **No actionable guidance** — Existing tools score resumes but don't explain *how* to improve them

## Our Solution

| Problem | Solution |
|---------|---------|
| Manual screening | Automated keyword extraction & scoring |
| No feedback loop | Prioritized recommendations with reasoning |
| ATS failures | ATS score + formatting warnings |
| Skill gap blindness | Categorized matched / missing / optional skills |

---

# System Architecture

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     Client (React SPA)                           │
│  Upload PDF │ Paste JD │ Dashboard │ Skills │ History │ Export   │
└──────────────────────┬───────────────────────────────────────────┘
                       │  REST API (Axios)
┌──────────────────────▼───────────────────────────────────────────┐
│                  Server (Express + Node.js)                       │
│  Routes → Controllers → Services → Utils                         │
│  /api/analyze  /api/analyses  /api/bookmarks  /api/export        │
└──────────────────────┬───────────────────────────────────────────┘
                       │  Mongoose ODM
┌──────────────────────▼───────────────────────────────────────────┐
│                   MongoDB Atlas (Cloud DB)                        │
│              Analysis Collection │ Bookmark Collection           │
└──────────────────────────────────────────────────────────────────┘
```

**Backend MVC Layers:** `controllers/` → `services/` → `models/` → `utils/`

---

# Workflow

## User Journey (Step-by-Step)

1. **Upload Resume** — Drag-and-drop PDF upload (multer middleware)
2. **Paste Job Description** — Enter JD text + optional job title / company
3. **Click Analyze** — `POST /api/analyze` triggers the pipeline:
   - pdf-parse extracts resume text
   - Skill dictionary matches keywords (with synonym normalization)
   - Scoring engine calculates weighted score
   - Section detector identifies experience / skills / education blocks
4. **View Dashboard** — Overall score, ATS score, skill match %, education match
5. **Explore Skills Tab** — Matched ✅ / Missing ❌ / Optional ⚡ skills by category
6. **Read Recommendations** — Top 5 prioritized tips (e.g., *"Add React project"*)
7. **Save to History** — Analysis stored in MongoDB; retrievable anytime
8. **Compare / Export** — Compare two JDs side-by-side, or export report as PDF / JSON

---

# System Requirements

## Functional Requirements

| Feature | Status |
|---------|--------|
| PDF upload & text extraction | ✅ |
| Resume vs JD keyword matching | ✅ |
| Multi-factor scoring (skill 50%, ATS 20%, experience 20%, education 10%) | ✅ |
| Skills grouped by category (Languages, Frontend, Backend, DB, DevOps, etc.) | ✅ |
| Skill synonyms (e.g., "JS" → "JavaScript") | ✅ |
| Prioritized recommendations | ✅ |
| Save / retrieve / delete analyses (History) | ✅ |
| Compare two analyses side-by-side | ✅ |
| Bookmark job descriptions | ✅ |
| Export analysis as PDF + JSON | ✅ |

## Non-Functional Requirements

- **Performance:** PDF analysis in < 2 seconds
- **Security:** Helmet.js + Zod validation + CORS
- **Usability:** Dark-themed Tailwind UI, responsive, tabbed interface
- **Reliability:** Graceful error handling & fallbacks for older records

---

# Conclusion

## Summary

✅ Built a **production-ready MERN application** that automates resume screening

✅ Implemented **multi-factor weighted scoring** (skills, ATS, experience, education)

✅ Delivered **grouped skill analysis** with synonym normalization — no paid AI APIs

✅ Added **full CRUD history**, bookmarks, comparison, and export (PDF + JSON)

✅ Secured with **Helmet, Zod validation, rate limiting, and CORS**

## Future Scope

- 🚀 **Cloud deployment** — Render (backend) + Vercel (frontend)
- 🔐 **User authentication** — Login-protected history and bookmarks
- 🤖 **LLM integration** — Use OpenAI API for deeper resume feedback
- 📊 **Analytics dashboard** — Track skill trends across multiple applications

> *"From a blank MERN boilerplate to a fully functional AI-assisted career tool — in one project."*
