# 🎯 THE VOICE OF ISLAMABAD - COMPLETE SETUP (30 MINS START TO LIVE)

> **Status:** ✅ Production Ready | **Last Updated:** April 24, 2026

---

## 📊 What You Have Now

### ✨ Features Implemented:
- ✅ **Real News Feed** - Live Pakistan news with real images
- ✅ **AI Chat Assistant** - Intelligent responses powered by GPT-3.5 or Llama
- ✅ **Auto-Update System** - Refreshes every 5 minutes automatically  
- ✅ **Real Images** - No placeholders, uses news source images + Unsplash
- ✅ **Live Timestamps** - Shows "2 mins ago" format
- ✅ **Bilingual Support** - Full English + Urdu interface
- ✅ **Ad Booking Integration** - WhatsApp direct messaging
- ✅ **Mobile Optimized** - 100% responsive design
- ✅ **Production Config** - Vercel-ready with optimizations

---

## 🚀 DEPLOY IN 3 PHASES (Total: ~30 mins)

---

## PHASE 1️⃣: GET API KEYS (10 MINS)

### Required: NewsData.io (FREE)
```
1. Go to: https://newsdata.io
2. Click "Sign Up Free" 
3. Verify email
4. Dashboard → Copy API Key
5. Save it somewhere safe
```
✅ Free tier: 200 requests/day  
✅ Includes images  
✅ Pakistan news available

### Optional: OpenAI or OpenRouter (For AI Chat)

**Option A - OpenAI (Best Quality):**
```
1. Go to: https://platform.openai.com
2. Sign up + add payment method (required)
3. API Keys → Create new secret key
4. Copy (you won't see it again)
```
💰 Cost: ~$0.0003 per chat message (~$5-20/month)

**Option B - OpenRouter (FREE Tier!):**
```
1. Go to: https://openrouter.ai
2. Sign in (use Google)
3. Keys → Create key
4. Copy and save
```
✅ Free Llama 3.1 model available  
💰 Or pay as you go (cheap)

**RECOMMENDATION:** Start with NewsData only. Add AI key later if needed.

---

## PHASE 2️⃣: SETUP & TEST LOCALLY (10 MINS)

### 1. Configure Environment
```bash
# Create .env.local in project root
touch .env.local

# Add your API keys:
cat > .env.local << 'EOF'
NEWSDATA_API_KEY=your_newsdata_key_here
OPENAI_API_KEY=your_openai_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_REVALIDATE_INTERVAL=300
EOF
```

### 2. Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

### 3. Test Features
```
✅ Live News Feed
   - Scroll down to see real news
   - Click refresh button
   - Should show timestamp

✅ AI Chat
   - Click chat button (bottom right)
   - Type "What's new in tech?"
   - Should respond intelligently

✅ Images
   - All should be real images
   - No placeholder text
   - Responsive on mobile

✅ Languages
   - Switch between English/Urdu
   - All text translates
```

### 4. Test Build
```bash
npm run build
npm run start

# Visit http://localhost:3000 again
```

✅ If everything works locally, you're ready to deploy!

---

## PHASE 3️⃣: DEPLOY TO VERCEL (10 MINS)

### Option A: Simple (GUI - Recommended)

**1. Push to GitHub**
```bash
git add .
git commit -m "Production ready: Real APIs, auto-update, AI chat"
git push origin main
```

**2. Connect Vercel**
- Go to: https://vercel.com/new
- Click "Import Git Repository"
- Select your GitHub repo
- Click "Import"

**3. Add Environment Variables**
- In Vercel project settings:
- Click "Environment Variables"
- Add each key:

```
NEWSDATA_API_KEY      →  your_key
OPENAI_API_KEY        →  your_key (if using)
OPENROUTER_API_KEY    →  your_key (if using)
```

**4. Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- See live URL at top!

---

### Option B: Command Line

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? → No
# - Project name: → voice-of-islamabad
# - Framework: → Next.js
# - Root directory: → ./
# - Add env vars when asked: → YES
#   Add: NEWSDATA_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY

# Get your live URL!
```

---

## 🎉 AFTER DEPLOYMENT

### Your Live Links:
```
GitHub:    https://github.com/YOUR_USERNAME/voice-of-islamabad
Live Site: https://voice-of-islamabad.vercel.app

(Or set custom domain in Vercel settings)
```

### Verify Everything Works:
```
✅ Visit your live URL
✅ Load news feed (might take 10s first load)
✅ Try AI chat
✅ Test ad booking button
✅ Switch languages
✅ Test on mobile
```

---

## 📈 OPTIMIZATION & CUSTOMIZATION

### Change Refresh Interval
In `.env.local` or Vercel env vars:
```
NEXT_PUBLIC_REVALIDATE_INTERVAL=300
# 300 = 5 mins
# 600 = 10 mins
# 180 = 3 mins
```

### Add Custom Domain
In Vercel Dashboard:
```
Settings → Domains → Add Domain
(Use your own domain like voiceofislamabad.pk)
```

### Monitor Performance
```
Vercel Dashboard → Analytics
- Page loads
- API usage
- Error tracking
```

### Change WhatsApp Number
In [LiveNewsFeed.tsx](components/LiveNewsFeed.tsx):
```
Replace: 923554776466
With:    your_whatsapp_number
```

---

## 🐛 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| **News feed empty** | Check NEWSDATA_API_KEY in Vercel env vars |
| **Build failed** | Run `npm run build` locally to see error |
| **Chat not responding** | OpenAI key optional. Try asking simpler question |
| **Images not loading** | Check browser console for CORS errors |
| **API rate limit hit** | NewsData.io: Wait for daily reset (UTC midnight) |
| **Env vars not working** | Redeploy after adding variables |

---

## 📞 SUPPORT LINKS

- **NewsData.io Issues:** https://newsdata.io/docs
- **OpenAI Help:** https://platform.openai.com/docs
- **OpenRouter:** https://openrouter.io/docs
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Help:** https://nextjs.org/docs

---

## 📋 FINAL CHECKLIST

Before announcing your site live:

- [ ] Get API keys (NewsData.io minimum)
- [ ] Create `.env.local`
- [ ] Test locally (`npm run dev`)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables
- [ ] Test live site
- [ ] Verify news feed loads
- [ ] Verify AI chat works
- [ ] Test on mobile
- [ ] Share links!

---

## 💡 PRO TIPS

1. **Keep .env.local secret** - Never commit to GitHub
2. **Monitor API usage** - Check dashboards weekly
3. **Set up alerts** - Get notified of errors
4. **Test before updating** - Always test locally first
5. **Backup API keys** - Store safely in password manager
6. **Keep dependencies updated** - Run `npm update` monthly

---

## 🎯 NEXT FEATURES (Easy Add-ons)

Once live, consider adding:
- [ ] Analytics (Google Analytics, Vercel Analytics)
- [ ] Comments system (Disqus, Utterances)
- [ ] Email newsletter (Mailchimp, Substack)
- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] Push notifications

---

## 📊 EXPECTED COSTS

| Service | Free | Used For |
|---------|------|----------|
| **NewsData.io** | 200/day | News articles |
| **Vercel** | Yes | Hosting |
| **OpenAI** | No | AI chat |
| **OpenRouter** | Yes (Llama) | AI chat alternative |
| **GitHub** | Yes | Code hosting |

**Monthly Budget:** $0-20 depending on AI choice

---

## 🚀 YOU'RE READY!

Everything is set up and production-ready. Just:

1. Get API keys (10 mins)
2. Configure locally (5 mins)
3. Deploy to Vercel (10 mins)
4. Share your live link!

**Total time: ~25-30 minutes**

---

## 📝 VERSION INFO

- **Next.js:** 15.0.0
- **React:** 18.3.1
- **NewsData.io API:** Latest
- **Deployment:** Vercel
- **Type:** Full-stack TypeScript
- **Status:** ✅ Production Ready

---

**Questions?** Check detailed guides:
- [QUICK_START.md](QUICK_START.md) - Quick reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment
- [API_KEYS.md](API_KEYS.md) - API key setup

---

**🎉 Good luck! Your news platform is ready to go live!**

*Made with ❤️ for The Voice of Islamabad*
