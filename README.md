# The Voice of Islamabad - Web

**Tagline:** Independent News | Corporate Analysis | ABC Certified | Pakistan & Global

A modern, bilingual (English/Urdu) dynamic news platform built with Next.js, designed for weekly JSON/Markdown content updates and Netlify deployment.

## Implemented Requirements

- Next.js architecture
- Dynamic content from `content/site.json` + `content/posts/*.md`
- Weekly updates through Markdown/JSON editing
- Dedicated sections:
  - Home
  - News
  - Media
  - Business
  - Politics
  - Technology
  - About
  - Contact
- Auto-scrolling top news ticker
- Article page ad blocks (dedicated ad section)
- Bilingual UI (English + Urdu)
- Admin-only content flow via Decap CMS + Netlify Identity (`/admin`)
- Netlify-ready setup
- Primary logo integration

## Local Setup

1. Install dependencies:
   npm install
2. Run development server:
   npm run dev
3. Open:
   http://localhost:3000

## Content Editing (Weekly)

### Option B: Admin Panel (recommended)
- Deploy to Netlify
- Enable **Identity** and **Git Gateway** in Netlify dashboard
- Invite admin user
- Open `/admin`
- Login and update posts/settings visually


## Notes

- Upload article images in `public/uploads`
- Post frontmatter must include:
  - `slug`, `date`, `category`, `coverImage`, `author`
  - `title_en`, `title_ur`, `excerpt_en`, `excerpt_ur`
