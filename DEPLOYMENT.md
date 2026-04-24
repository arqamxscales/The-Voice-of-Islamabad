# Voice of Islamabad - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git
- GitHub account
- Vercel account
- API Keys:
  - NewsData.io (get free at https://newsdata.io)
  - OpenAI or OpenRouter (optional, for advanced AI)

---

## 📋 Step 1: Environment Setup

Create `.env.local` in your project root:

```bash
cp .env.example .env.local
```

Fill in your API keys:

```env
# Required
NEWSDATA_API_KEY=your_newsdata_key_here

# Optional (for advanced AI - use one or both)
OPENAI_API_KEY=your_openai_key_here
OPENROUTER_API_KEY=your_openrouter_key_here

# Optional
NEXT_PUBLIC_SITE_URL=https://voiceofislamabad.pk
```

### Getting API Keys

**NewsData.io (FREE):**
1. Go to https://newsdata.io
2. Sign up free
3. Copy your API key
4. Can fetch up to 200 articles/day for free

**OpenAI (PAID):**
1. Go to https://platform.openai.com
2. Create account & add payment method
3. Create API key in Settings → API Keys
4. Use `gpt-3.5-turbo` for cost efficiency

**OpenRouter (FREE TIER AVAILABLE):**
1. Go to https://openrouter.ai
2. Sign up free
3. Copy your API key
4. Uses various free/cheap models

---

## 📝 Step 2: Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

Test the features:
- Live news feed (auto-updates every 5 mins)
- AI chat assistant (uses API keys)
- Ad booking integration
- Multi-language (EN/UR)

---

## 🔧 Step 3: GitHub Setup

```bash
# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/voice-of-islamabad.git

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Voice of Islamabad website with real APIs"

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Make sure `.env.local` is in `.gitignore` (it should be by default)

---

## 🌐 Step 4: Deploy to Vercel

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Set project name: voice-of-islamabad
# - Framework: Next.js
# - Root directory: ./
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select your repository
5. Environment variables → Add all from `.env.local`
6. Deploy

---

## 🔑 Vercel Environment Variables

Add these in Vercel Dashboard (Settings → Environment Variables):

```
NEWSDATA_API_KEY = your_key
OPENAI_API_KEY = your_key (optional)
OPENROUTER_API_KEY = your_key (optional)
NEXT_PUBLIC_SITE_URL = https://your-domain.vercel.app
NEXT_PUBLIC_REVALIDATE_INTERVAL = 300
```

⚠️ **IMPORTANT:** Variables starting with `NEXT_PUBLIC_` are exposed to browser. Don't put secrets there.

---

## 📊 Features Included

✅ **Real-time News**
- Fetches from NewsData.io API
- Auto-updates every 5 minutes
- Real images from news sources
- Fallback to Unsplash if missing

✅ **Advanced AI Chat**
- Uses OpenAI GPT-3.5 or OpenRouter
- Intelligent responses
- Ad booking detection
- Contact information quick links
- Bilingual support (English/Urdu)

✅ **Auto-Update System**
- Configurable refresh intervals
- Manual refresh button
- Last update timestamp
- Cache optimization

✅ **Responsive Design**
- Mobile-optimized
- All devices supported
- Touch-friendly buttons
- Dark/Light mode ready

---

## 🐛 Troubleshooting

**News feed empty?**
- Check `NEWSDATA_API_KEY` is set correctly
- Verify API key is active on NewsData.io
- Check rate limit (200/day free tier)

**Chat not responding?**
- If no AI response: Check OPENAI_API_KEY or OPENROUTER_API_KEY
- Should fallback to rule-based responses automatically
- Check network tab in browser DevTools

**Deployment failed?**
- Ensure all environment variables are set
- Check `vercel.json` is valid JSON
- Run `npm run build` locally to test

---

## 📈 Production Optimization

### Image Optimization
- Already using real news images
- Fallback to Unsplash CDN
- Next.js auto-optimizes with <Image> tag

### Caching Strategy
```
API responses: 5 mins (300s) 
Stale-while-revalidate: 10 mins
Browser cache: 1 hour
```

### API Rate Limits
- NewsData.io: 200 req/day (free)
- OpenAI: 3 req/min (free trial)
- OpenRouter: Varies by model

---

## 🔗 Final Links

After deployment, you'll have:

**GitHub:** `https://github.com/YOUR_USERNAME/voice-of-islamabad`
**Live Site:** `https://your-domain.vercel.app`
**Vercel Dashboard:** `https://vercel.com/dashboard`

---

## 💡 Next Steps

1. **Custom Domain:** In Vercel → Settings → Domains
2. **Analytics:** Vercel Web Analytics (free)
3. **Monitoring:** Set up error tracking
4. **SEO:** Update `robots.txt` and `sitemap.xml`
5. **SSL:** Automatic with Vercel

---

## 📞 Support

- **Issues?** Create a GitHub issue
- **API Problems?** Check respective API docs
- **Vercel Help:** https://vercel.com/docs

---

**Last Updated:** April 2026
**Status:** Production Ready ✅
