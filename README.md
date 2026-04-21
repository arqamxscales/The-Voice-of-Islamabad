# The Voice of Islamabad - Web

**Tagline:** Independent News | Corporate Analysis | ABC Certified | Pakistan & Global

A modern, bilingual (English/Urdu) dynamic news platform built with Next.js, designed for weekly JSON/Markdown content updates and Vercel deployment.

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
- Admin-only content flow via Decap CMS (`/admin`)
- Vercel-ready setup
- Primary logo integration
- Realtime NewsData.io feed with images
- AI assistant widget for user queries
- Direct ad booking to WhatsApp (+923554776466)
- Demo account login flow

## Local Setup

1. Install dependencies:
   npm install
2. Run development server:
   npm run dev
3. Open:
   http://localhost:3000

## Environment Variables

Create a `.env.local` file:

- `NEWSDATA_API_KEY=your_newsdata_key`
- `OPENROUTER_API_KEY=optional_for_ai_chat`

If `OPENROUTER_API_KEY` is missing, chatbot runs in smart rule-based mode.

## Demo Login

- Email: `demo@voi.news`
- Password: `demo123`

## Content Editing (Weekly)

### Option B: Admin Panel (recommended)
- Deploy to Vercel
- Configure Decap CMS GitHub OAuth for your repository
- Open `/admin`
- Login and update posts/settings visually


## Notes

- Upload article images in `public/uploads`
- Post frontmatter must include:
  - `slug`, `date`, `category`, `coverImage`, `author`
  - `title_en`, `title_ur`, `excerpt_en`, `excerpt_ur`
