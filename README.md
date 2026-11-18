
# MbiseCAD — Personal Portfolio Website

<p align="center">
  <img src="icons/mbisecad-mark.png" alt="MbiseCAD Logo" width="100">
</p>

<h3 align="center">Practical Ideas. Useful Technology.</h3>

<p align="center">
  <a href="https://onesmo3.github.io">Visit Official Website</a> •
  <a href="https://github.com/Onesmo3">GitHub Profile</a>
</p>

**MbiseCAD** is an independent technology brand and software development portfolio created by **Onesmo Komba**.

This website showcases practical software applications, engineering calculators, Android tools and digital solutions developed under the MbiseCAD brand.

> **Program pamoja drawing.**

---

## 🌐 Official Website

**https://onesmo3.github.io**

The website is built as a responsive static portfolio and hosted using GitHub Pages.

## 🚀 Featured Projects

### 1. FDT Calculator
An offline Sand Cone Field Density Test calculator designed for civil engineering field and laboratory work.

- Platform: Android
- Category: Civil Engineering
- [Download APK](https://drive.google.com/file/d/1pfBmaiHFa2_1s1471nV9opbD_p_WuLFt/view?usp=drivesdk)
- [View Source Code](https://github.com/Onesmo3/FDTCalculator)

### 2. Salary Calculator
An Android application designed to calculate salary estimates using Tanzania-related payroll parameters.

- Platform: Android
- Category: Finance & Productivity
- [Download APK](https://drive.google.com/file/d/1A5WQy_G2CgaFk5lJ-83B8U-H1wg8xvQA/view?usp=drivesdk)
- [Find on GitHub](https://github.com/Onesmo3?tab=repositories)

### 3. ToDoList
A task-management application designed to help users organise activities and manage everyday tasks.

- Platform: Android
- Category: Productivity
- [Download APK](https://drive.google.com/file/d/1IDmyuLoMqn1oRq9Y16sAUbTruL3OjY_b/view?usp=drivesdk)
- [Find on GitHub](https://github.com/Onesmo3?tab=repositories)

### 4. MDDCalc
A calculator application developed to support soil compaction and Maximum Dry Density (MDD) workflows.

- Platform: Android
- Category: Civil Engineering
- [Download APK](https://drive.google.com/file/d/1bcKDc5vq7shc47YhtPxCBYrmg8pyQi-m/view?usp=drivesdk)

### 5. Live TV
An Android live-TV player application that uses playlist sources to access available streams.

- Platform: Android
- Category: Media
- [Download APK](https://drive.google.com/file/d/1sD_qbrTBcD0KZuTK9-Yahp0u1bMCgnyg/view?usp=drivesdk)

*Channel availability depends on playlist sources, stream availability and device compatibility.*

### 6. Civil Lab Tools
Practical civil engineering laboratory calculators and quality-control utilities for field and laboratory work.

- Category: Engineering & Quality Control
- Status: Live — 5 tools available, more planned
- [Open Civil Lab Tools](https://onesmo3.github.io/civil-lab-tools.html)
- Available now: moisture content, MDD & OMC compaction, sieve analysis (grading, GM & GC), CBR (soaked swell, CBR at 2.5 mm and 5.0 mm, and CBR at 95% MDD), and Atterberg limits (cone-penetration liquid limit, plastic limit, plasticity index, linear shrinkage and shrinkage product)
- Each calculator includes a printable report, CSV export, and saves its working data in the browser.

---

## ✨ Website Features

- Responsive design for mobile, tablet and desktop.
- Dark and light theme switching.
- Project showcase with application download links.
- Source-code links to GitHub repositories.
- Civil Lab Tools hub with automatic ready/planned counts.
- Lab calculators with save/resume, printable reports and CSV export.
- About and contact sections.
- Lightweight static website.
- No backend or database required.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Theme switching and interactions |
| Canvas API | Grading, compaction, CBR and penetration–moisture curves |
| Browser localStorage | Saving lab sheets on the device |
| GitHub | Source-code hosting |
| GitHub Pages | Website deployment |
| Google Drive | APK distribution |

## 📁 Repository Structure

```text
onesmo3.github.io/
│
├── index.html                 # portfolio home
├── civil-lab-tools.html       # Civil Lab Tools hub
├── README.md
│
├── assets/
│   ├── shared.css             # site-wide styles + print rules
│   ├── home.css               # portfolio-only styles
│   ├── shared.js              # theme, footer year, tool counts
│   └── tool-kit.js            # storage, CSV/JSON export, print helper
│
├── tools/
│   ├── moisture-content.html
│   ├── mdd-omc.html
│   ├── sieve-analysis.html
│   ├── cbr.html
│   └── atterberg.html
│
└── icons/
    ├── mbisecad-mark.png
    ├── mbisecad.png
    ├── fdt-calculator.png
    ├── salary-calculator.png
    ├── todolist.png
    ├── mddcalc.png
    ├── livetv.png
    └── civil-lab-tools.png
```

## 💻 Run Locally

You can run this website locally without installing additional dependencies.

1. Clone the repository:

```bash
git clone https://github.com/Onesmo3/onesmo3.github.io.git
```

2. Open the project folder.
3. Open `index.html` in your browser.

You can also use a local development server in your preferred code editor.

## 🚀 GitHub Pages Deployment

This repository uses GitHub Pages.

To publish changes:

1. Open repository Settings.
2. Navigate to Pages.
3. Under Build and deployment, select Deploy from a branch.
4. Choose the `main` branch.
5. Select `/(root)` as the folder.
6. Save your settings.

The website will be available at:

**https://onesmo3.github.io**

## 🔄 Updating the Website

To maintain the portfolio:

1. Update project information in `index.html`.
2. Verify all APK download links.
3. Add or update lab tools in `tools/` and link them from `civil-lab-tools.html`.
4. Update application descriptions and icons when necessary.
5. Add new projects when they are ready to showcase.
6. Commit and push changes to GitHub.
7. Verify the published website after deployment.

Always test download links before publishing them. The Civil Lab Tools ready count is calculated automatically from the tool links in the hub.

## 🔒 Lab data

Civil Lab Tools run entirely in the browser. Test data is saved only in the browser's local storage on the device, and CSV/PDF reports are generated locally. No lab data is sent to a server.

## 🎯 MbiseCAD Vision

MbiseCAD focuses on building practical digital solutions that address real-world needs.

Our interests include:

- Android application development.
- Civil engineering calculators.
- Laboratory and quality-control tools.
- Productivity applications.
- Software experimentation and continuous learning.

The goal is to combine engineering knowledge, technology and creativity to build useful tools.

## 👨‍💻 Author

**Onesmo Komba**

Founder & Developer — MbiseCAD

- Website: https://onesmo3.github.io
- GitHub: https://github.com/Onesmo3

---

<p align="center">
  <strong>MbiseCAD</strong><br>
  Program pamoja drawing.<br>
  <em>Learning • Building • Sharing</em>
</p>

<p align="center">
  © 2026 Onesmo Komba. All rights reserved.
</p>
