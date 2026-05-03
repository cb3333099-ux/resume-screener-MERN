# 📊 AI-Based Resume Screener — Presentation Guide

This folder contains a Marp-based slide deck for the **AI-Based Resume Screening System** project.

---

## 📄 What the Presentation Covers

| Slide | Topic |
|-------|-------|
| 1 | **Introduction** — Project overview and target audience |
| 2 | **Abstract** — Summary and tech stack |
| 3 | **Problem Definition** — Real-world problems and solutions |
| 4 | **System Architecture** — High-level diagram and layer breakdown |
| 5 | **Workflow** — Step-by-step user journey |
| 6 | **System Requirements** — Functional and non-functional requirements |
| 7 | **Conclusion** — Summary and future scope |

---

## 🚀 How to Generate the PDF

### Prerequisites

Make sure you have **Node.js 18+** installed.

### Step 1 — Install dependencies

```bash
# From the repository root
npm install
```

### Step 2 — Generate the PDF

```bash
npm run generate-presentation
```

This runs **Marp CLI** on `presentation.md` and writes `presentation.pdf` to the repo root.

> **Windows PowerShell users:** the same command works as-is — no bash required.

### Output

```
presentation.pdf   ← generated in the repo root
```

---

## ✏️ How to Customize the Slides

Open `presentation.md` in any text editor and update the placeholders on Slide 1:

```markdown
**Your Name** | Date | Course / College
```

For example:

```markdown
**Jane Smith** | May 2025 | CS 401 — Capstone Project, State University
```

Save the file and re-run `npm run generate-presentation` to rebuild the PDF.

### Changing the Theme / Colors

The slide theme is configured in the YAML front-matter at the top of `presentation.md`:

```yaml
---
marp: true
theme: default
backgroundColor: #1a1a2e   ← dark navy background
color: #e0e0e0             ← light text
---
```

You can change `backgroundColor` and `color` to any hex values, or switch `theme` to `gaia` or `uncover` for different built-in Marp themes.

---

## 📁 File Reference

| File | Purpose |
|------|---------|
| `presentation.md` | Marp markdown source for all 7 slides |
| `presentation.pdf` | Generated output *(gitignored — regenerate locally)* |
| `PRESENTATION.md` | This guide |
| `package.json` | Root package with `generate-presentation` script |

---

## 🛠 Troubleshooting

| Issue | Fix |
|-------|-----|
| `marp: command not found` | Run `npm install` from the repo root first |
| PDF is blank / missing slides | Ensure you are in the repo root when running the command |
| Chromium download prompt | Marp CLI downloads Chromium on first run — allow it to complete |
| Permission error on Windows | Run PowerShell as Administrator, or use `npx marp` instead |

### Alternative: run with `npx` (no install needed)

```bash
npx @marp-team/marp-cli@latest presentation.md --pdf --output presentation.pdf
```
