# Project Report Customization Guide

This guide explains how to personalize the academic project report (`PROJECT_REPORT.md`), add screenshots, convert it to other formats, and prepare it for submission or presentation.

---

## 1. Filling in Student Details

Open `docs/PROJECT_REPORT.md` in any text editor or IDE. Search for the following placeholders and replace them with your own information.

| Placeholder | What to Replace It With |
|---|---|
| `[STUDENT_NAME]` | Your full name (e.g., *Rahul Sharma*) |
| `[COLLEGE]` | Name of your institution (e.g., *ABC Institute of Technology*) |
| `[GUIDE_NAME]` | Name of your project guide or mentor (e.g., *Prof. Priya Rao*) |
| `[DATE]` | Submission date (e.g., *May 2025*) |
| `[ROLL_NO]` | Your roll number or student ID |
| `[HOD_NAME]` | Head of Department's name (update if needed) |
| `[ACADEMIC_YEAR]` | Your academic year (e.g., *2024–2025*) |

**Quick way to do this in VS Code**:
1. Open `PROJECT_REPORT.md` in VS Code.
2. Press `Ctrl+H` (or `Cmd+H` on Mac) to open Find and Replace.
3. Type the placeholder in the "Find" field and your value in the "Replace" field.
4. Click "Replace All".

Repeat for each placeholder.

---

## 2. Adding Screenshots

Screenshots are marked in the report with placeholders like:

```
[SCREENSHOT_PLACEHOLDER: Home screen with file upload sidebar and empty dashboard]
```

### Step-by-Step Instructions

1. **Run the application** locally or access your deployed version.
2. **Take screenshots** of each screen mentioned in the report (Section 10 — Results and Screenshots).
3. **Save the screenshot** files in the `docs/screenshots/` directory (create this folder if it does not exist):
   ```
   docs/
   └── screenshots/
       ├── 01-home-screen.png
       ├── 02-dashboard.png
       ├── 03-skills-tab.png
       ├── 04-report-tab.png
       ├── 05-history-tab.png
       ├── 06-compare-tab.png
       └── 07-pdf-export.png
   ```
4. **Replace each placeholder** in the Markdown file with an image tag:
   ```markdown
   ![Home Screen](screenshots/01-home-screen.png)
   ```
   Replace the existing placeholder block with this image tag.

### Screenshot Tips

- Use a screen resolution of at least **1280×800** for clear screenshots.
- Use the browser's full-page screenshot feature (or a tool like **Fireshot** or **Lightshot**) to capture the entire page if needed.
- Crop screenshots to remove browser chrome (address bar, bookmarks bar) for a cleaner look.
- Add captions below each image using `*Caption text*` in Markdown.

---

## 3. Converting the Report to PDF or DOCX

### Option A — Convert to PDF Using Pandoc (Recommended)

[Pandoc](https://pandoc.org/) is a free, powerful document converter that supports Markdown → PDF and Markdown → DOCX.

**Install Pandoc**:
```bash
# macOS
brew install pandoc

# Ubuntu / Debian
sudo apt-get install pandoc

# Windows — download installer from https://pandoc.org/installing.html
```

**For PDF output**, you also need a LaTeX engine:
```bash
# macOS
brew install --cask mactex

# Ubuntu
sudo apt-get install texlive-full
```

**Convert to PDF**:
```bash
cd docs
pandoc PROJECT_REPORT.md -o PROJECT_REPORT.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=12pt \
  -V mainfont="Times New Roman"
```

**Convert to DOCX** (Microsoft Word):
```bash
pandoc PROJECT_REPORT.md -o PROJECT_REPORT.docx \
  --reference-doc=reference.docx
```

### Option B — Convert to PDF Using a Browser

1. Open `PROJECT_REPORT.md` in a Markdown preview tool:
   - **VS Code**: Install the "Markdown PDF" extension (by yzane), then right-click the Markdown file and select "Markdown PDF: Export (pdf)".
   - **Typora**: Open the file in Typora, then go to File → Export → PDF.
   - **Online**: Paste the content into [dillinger.io](https://dillinger.io) and export as PDF.

2. Alternatively, render the Markdown in a browser and use **Print → Save as PDF**:
   - Install [grip](https://github.com/joeyespo/grip): `pip install grip`
   - Run: `grip PROJECT_REPORT.md`
   - Open `http://localhost:6419` in your browser, then print to PDF.

### Option C — Convert to DOCX Using LibreOffice

1. First convert to HTML using Pandoc:
   ```bash
   pandoc PROJECT_REPORT.md -o PROJECT_REPORT.html
   ```
2. Open the HTML file in LibreOffice Writer.
3. Go to File → Save As → Choose DOCX format.

---

## 4. Formatting Tips for Submission

### Page Formatting
- **Paper size**: A4 (210 × 297 mm)
- **Margins**: 1 inch on all sides (some colleges require 1.5 inch on the left for binding)
- **Font**: Times New Roman, 12pt for body; 14pt bold for headings
- **Line spacing**: 1.5 or double spacing (check your college guidelines)
- **Page numbers**: Bottom center

### Section Formatting
- Each major section (Introduction, Objectives, etc.) should start on a new page.
- The Table of Contents should have clickable links (PDF feature, enabled by Pandoc automatically).
- Figures and tables should be numbered (Figure 1, Table 1, etc.) and captioned.

### Cover Page
- Print the cover page on a separate page, typically without a page number.
- In Pandoc PDF, you can use a custom title page template.

---

## 5. Presentation Tips

If you are presenting this report as part of a viva voce or project demonstration:

1. **Know the key sections**: Be prepared to explain the architecture diagram, the scoring algorithm formula, and the ER diagram in your own words.

2. **Demonstrate the running application**: Show the application live — upload a resume PDF, enter a job description, and walk the examiner through the results on each tab.

3. **Highlight the algorithm**: Explain the multi-factor scoring formula and why each weight was chosen (skills are most important → 40%, etc.).

4. **Discuss limitations honestly**: Examiners appreciate students who can critically evaluate their own work and suggest future improvements.

5. **Prepare for common questions**:
   - *How does PDF text extraction work?*
   - *What is the difference between matched, missing, and optional skills?*
   - *How is the ATS score calculated?*
   - *Why did you choose MongoDB over a relational database?*
   - *How would you add user authentication to this system?*

---

## 6. File Checklist Before Submission

- [ ] All `[PLACEHOLDER]` values replaced with real information
- [ ] Screenshots added and embedded in Section 10
- [ ] Cover page details correct (student name, guide name, college, date)
- [ ] Report converted to PDF or DOCX as required by your institution
- [ ] Page numbers added
- [ ] Table of Contents links working (if PDF)
- [ ] Figures and tables numbered and captioned
- [ ] References formatted in IEEE style
- [ ] Spelling and grammar checked

---

*For questions about the project codebase, refer to the main [README.md](../README.md).*
