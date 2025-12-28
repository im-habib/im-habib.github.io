mkdir -p src && cd src

mkdir -p app/experience app/projects app/publications app/blog/[slug] app/cv
mkdir -p components content lib public/files

touch \
app/layout.tsx \
app/page.tsx \
app/globals.css \
app/experience/page.tsx \
app/projects/page.tsx \
app/publications/page.tsx \
app/blog/page.tsx \
app/blog/[slug]/page.tsx \
app/cv/page.tsx \
components/Shell.tsx \
components/Sidebar.tsx \
components/Card.tsx \
components/Tag.tsx \
components/LinkPill.tsx \
components/ThemeProvider.tsx \
components/ThemeToggle.tsx \
content/profile.json \
content/experience.json \
content/projects.json \
content/publications.json \
content/blogposts.json \
lib/schemas.ts \
lib/data.ts