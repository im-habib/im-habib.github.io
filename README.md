Academic Folio — Usage Guide

This document explains how to customize and maintain the Academic Folio project.

The site is data-driven:
	•	No CMS
	•	No database
	•	No MDX
	•	All content lives in JSON files
	•	UI and theme are handled centrally

⸻

1. Project Structure (What matters)

src/
├── app/
│   ├── page.tsx              # Home (summary + stories)
│   ├── cv/page.tsx           # Full CV
│   ├── projects/page.tsx
│   ├── publications/page.tsx
│   └── experience/page.tsx
│
├── components/
│   ├── Card.tsx
│   ├── SectionHeader.tsx
│   ├── Sidebar.tsx
│   ├── SidebarItem.tsx
│   └── Tag.tsx
│
├── content/                  # 🔴 MAIN CONTENT (edit here)
│   ├── profile.json
│   ├── home.json
│   ├── education.json
│   ├── experience.json
│   ├── projects.json
│   └── publications.json
│
├── lib/
│   ├── data.ts               # JSON loaders
│   └── schemas.ts            # Zod validation
│
└── app/globals.css            # Theme + colors

If you only want to update content, you will edit files in:

src/content/


⸻

2. Profile (profile.json)

This file controls:
	•	Name
	•	Title
	•	Sidebar content
	•	Social links
	•	CV link

Required fields

{
  "name": {
    "full": "Your Full Name",
    "title": "PhD Researcher"
  },
  "bio": "Long bio used on homepage",
  "bio_short": "Short bio used in sidebar",
  "avatar": "/avatar.png"
}

Optional (auto-hidden if missing)

{
  "affiliation": {
    "institution": "University Name",
    "department": "Department",
    "location": "City, Country"
  },
  "contact": {
    "email": "you@email.com"
  },
  "social": {
    "github": "https://github.com/username",
    "google_scholar": "https://scholar.google.com/...",
    "orcid": "https://orcid.org/...",
    "pubmed": "https://pubmed.ncbi.nlm.nih.gov/..."
  },
  "cv": {
    "pdf": "/cv.pdf"
  }
}

🔹 If a field is missing or empty → it will not render

⸻

3. Home Page Content (home.json)

Controls the main route (/).

Summary section

{
  "summary": {
    "headline": "Short academic headline",
    "body": [
      "Paragraph one.",
      "Paragraph two.",
      "Paragraph three."
    ]
  }
}

	•	Appears at the top of /
	•	Keep it concise and academic

⸻

Stories section

Each story includes:
	•	Title
	•	Multiple paragraphs
	•	Images (queries only)
	•	Link to “read more” page

{
  "stories": [
    {
      "id": "unique-id",
      "title": "Story title",
      "body": [
        "Paragraph one.",
        "Paragraph two."
      ],
      "href": "/projects/some-project",
      "images": [
        "image search query 1",
        "image search query 2"
      ]
    }
  ]
}

🔹 Images are descriptive queries, not URLs
🔹 Currently rendered using placeholders (safe for static export)

⸻

4. Education (education.json)

[
  {
    "id": "phd",
    "degree": "PhD in Biomedical Engineering",
    "institution": "University Name",
    "location": "City, Country",
    "start_date": "2024",
    "end_date": "Present",
    "details": [
      "Research focus line",
      "Thesis topic"
    ]
  }
]


⸻

5. Experience (experience.json)

Supports industry and academic experience.

[
  {
    "id": "job-1",
    "type": "industry",
    "role": "Software Engineer",
    "organization": "Company Name",
    "location": "Remote",
    "start_date": "2021",
    "end_date": "Present",
    "highlights": [
      "Achievement one",
      "Achievement two"
    ],
    "links": {
      "company": "https://company.com"
    }
  }
]

Valid type values:
	•	"industry"
	•	"academic"

⸻

6. Projects (projects.json)

[
  {
    "id": "project-1",
    "type": "research",
    "title": "Project Title",
    "summary": "Short summary paragraph",
    "period": {
      "start": "2023",
      "end": "2024"
    },
    "impact": [
      "Key result",
      "Key result"
    ],
    "links": {
      "github": "https://github.com/...",
      "paper": "https://arxiv.org/..."
    }
  }
]

Valid type values:
	•	"research"
	•	"engineering"
	•	"side"

⸻

7. Publications (publications.json)

[
  {
    "id": "paper-1",
    "title": "Paper Title",
    "authors": ["You", "Coauthor"],
    "venue": "Conference / Journal",
    "year": 2025,
    "links": {
      "paper": "https://arxiv.org/...",
      "doi": "https://doi.org/..."
    }
  }
]

Links are optional.

⸻

8. Theme & Colors

Themes are handled via CSS variables only.
	•	Light / Dark mode supported
	•	No inline colors in components

Edit:

src/app/globals.css

Key variables:

:root {
  --background
  --foreground
  --surface
  --border
  --link
}

html.dark {
  --background
  --foreground
  ...
}


⸻

9. Deployment (GitHub Pages)

This project uses:
	•	Static export
	•	GitHub Actions
	•	Yarn 4 + Corepack

Required config

next.config.mjs:

export default {
  output: "export",
  images: { unoptimized: true },
  basePath: "/academic-folio",
  assetPrefix: "/academic-folio/"
};

Workflow

.github/workflows/pages.yml
(Already provided and configured for Yarn 4)

⸻

10. What NOT to do

❌ Don’t add API routes
❌ Don’t use getServerSideProps
❌ Don’t use dynamic runtime data
❌ Don’t hardcode content in JSX
❌ Don’t use inline styles for colors

This is a static academic site, by design.

⸻

11. Recommended Workflow
	1.	Edit JSON in src/content/
	2.	Run locally:

yarn dev


	3.	Commit & push to main
	4.	GitHub Actions deploys automatically
