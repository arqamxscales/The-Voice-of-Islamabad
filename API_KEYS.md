# 🔑 API KEYS SETUP GUIDE

## Overview
This guide explains how to get each API key needed for your Voice of Islamabad website.

---

## 1️⃣ NewsData.io (REQUIRED - FREE)

**What it does:** Provides real Pakistan news articles with images

### Getting Your Key:
1. Visit: https://newsdata.io
2. Click **"Sign Up Free"** (no credit card required)
3. Create account with email
4. Go to **Dashboard** 
5. Copy your **API Key**

### In Your Code:
```env
NEWSDATA_API_KEY=your_actual_key_here
```

### Free Tier Limits:
- **200 requests/day** (auto-resets at midnight UTC)
- Real news data
- Includes images

### Testing Your Key:
```bash
curl "https://newsdata.io/api/1/latest?apikey=YOUR_KEY&country=pk&language=en&size=5"
```

---

## 2️⃣ OpenAI (OPTIONAL - PAID)

**What it does:** Powers advanced AI chat with GPT-3.5 Turbo

### Getting Your Key:
1. Visit: https://platform.openai.com
2. Click **"Sign up"**
3. Verify email & create account
4. **Add payment method** (required for API access)
5. Go to **API keys** (https://platform.openai.com/api-keys)
6. Click **"Create new secret key"**
7. Copy and save immediately (can't see again)

### In Your Code:
```env
OPENAI_API_KEY=sk-your_actual_key_starts_with_sk_here
```

### Cost Estimate:
- **GPT-3.5 Turbo:** ~$0.002 per 1K tokens
- Average chat response: ~150 tokens = $0.0003 per message
- **Recommended budget:** $5-20/month

### Testing Your Key:
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## 3️⃣ OpenRouter (OPTIONAL - FREE TIER + PAID)

**What it does:** Alternative AI provider with free models + cheaper paid options

### Getting Your Key:
1. Visit: https://openrouter.ai
2. Click **"Sign in"** (can use Google)
3. Go to **Keys** (https://openrouter.ai/keys)
4. Create a new key
5. Copy and save

### In Your Code:
```env
OPENROUTER_API_KEY=sk-or-your_actual_key_here
```

### FREE Models Available:
- `meta-llama/llama-3.1-8b-instruct:free`
- `meta-llama/llama-2-7b-chat:free`
- Great quality, completely free!

### Paid Models (Cheaper than OpenAI):
- Mistral: ~$0.00014 per message
- Llama 3.1: ~$0.0001 per message

### Testing Your Key:
```bash
curl https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

---

## 🎯 WHICH COMBINATION?

### **Budget Option (FREE):**
```env
NEWSDATA_API_KEY=your_newsdata_key
OPENROUTER_API_KEY=your_openrouter_key
# Use free Llama 3.1 model
```
**Cost:** Free  
**Chat Quality:** Very good  
**Setup:** 10 mins

### **Best Quality (PAID):**
```env
NEWSDATA_API_KEY=your_newsdata_key
OPENAI_API_KEY=your_openai_key
# Use GPT-3.5 Turbo
```
**Cost:** $5-20/month  
**Chat Quality:** Excellent  
**Setup:** 15 mins (needs payment method)

### **Balanced Option (HYBRID):**
```env
NEWSDATA_API_KEY=your_newsdata_key
OPENROUTER_API_KEY=your_openrouter_key
OPENAI_API_KEY=your_openai_key
# Try OpenAI first, fallback to OpenRouter
```
**Cost:** Variable  
**Chat Quality:** Excellent  
**Setup:** 20 mins

---

## ⚙️ ADDING KEYS TO YOUR PROJECT

### Local Development:
```bash
# 1. Create .env.local file in project root
touch .env.local

# 2. Add your keys
NEWSDATA_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
OPENROUTER_API_KEY=your_key_here

# 3. Test
npm run dev
```

### Production (Vercel):
1. Push code to GitHub
2. Go to https://vercel.com
3. Click your project
4. **Settings** → **Environment Variables**
5. Add each key:
   - Name: `NEWSDATA_API_KEY`
   - Value: `your_actual_key`
6. Repeat for other keys
7. Redeploy

⚠️ **IMPORTANT:** Never commit `.env.local` to Git. It's in `.gitignore` by default.

---

## 🔒 SECURITY BEST PRACTICES

### ✅ DO:
- Keep keys secret (don't share)
- Use `.env.local` for local development
- Add to Vercel environment variables for production
- Rotate keys regularly (at least quarterly)
- Use different keys for dev/production if possible

### ❌ DON'T:
- Commit `.env.local` to GitHub
- Share keys in emails
- Post in Discord/Slack
- Use in public repositories
- Log keys to console

---

## 🚨 TROUBLESHOOTING

### "News feed is empty"
**Check:**
1. `NEWSDATA_API_KEY` is correct in `.env.local`
2. API key is active (https://newsdata.io/dashboard)
3. Free tier quota not exceeded (200/day)
4. Check browser console for errors (F12)

### "Chat not responding with AI"
**Check:**
1. No OPENAI_API_KEY? That's OK! Falls back to rule-based
2. If you want AI: Get OpenRouter key (free option)
3. Check API key is correct
4. Check billing active (for OpenAI)
5. View Network tab in DevTools to see API response

### "API key rejected"
**Common fixes:**
1. Double-check you copied entire key (no extra spaces)
2. Key not activated yet (wait 5 mins after creation)
3. Wrong region? Check API provider settings
4. Copy-pasted from email? Some formatting issues - get from dashboard
5. Expired? Create new key in dashboard

---

## 💰 COST BREAKDOWN

| API | Free Tier | Cost | Usage |
|-----|-----------|------|-------|
| **NewsData.io** | 200 req/day | Free | News articles |
| **OpenAI GPT-3.5** | - | ~$0.0003/msg | Chat AI |
| **OpenRouter (Free Llama)** | Unlimited | Free | Chat AI |
| **OpenRouter (Paid)** | - | ~$0.0001/msg | Cheaper AI |

**Total Monthly Budget Options:**
- **Free Only:** $0 (NewsData + OpenRouter free)
- **Quality:** $5-10 (NewsData + OpenRouter paid)
- **Premium:** $10-20 (NewsData + OpenAI)

---

## 📝 QUICK REFERENCE

### Environment Variable Names (Exact):
```
NEWSDATA_API_KEY=          (required)
OPENAI_API_KEY=            (optional)
OPENROUTER_API_KEY=        (optional)
NEXT_PUBLIC_SITE_URL=      (optional, for branding)
```

### Where to Add Them:
- **Local:** `.env.local` (create in project root)
- **Production:** Vercel Dashboard → Environment Variables
- **GitHub:** DO NOT commit to repo

### Priority Order (Tested in Code):
1. OpenAI (best quality)
2. OpenRouter (free/cheap)
3. Rule-based fallback (always works)

---

## ✅ VALIDATION CHECKLIST

Before deploying, verify:
- [ ] NewsData API key works (test in dashboard)
- [ ] OpenAI/OpenRouter key works (if using)
- [ ] `.env.local` created locally
- [ ] Keys not in `.gitignore` (are excluded)
- [ ] Environment variables set in Vercel
- [ ] Local test works: `npm run dev`
- [ ] Chat responds (even without AI keys)
- [ ] News feed shows articles
- [ ] Images load properly

---

## 🆘 NEED HELP?

| Issue | Solution |
|-------|----------|
| Can't find API key | Check email spam for verification link |
| "Key rejected" error | Copy-paste from dashboard, not email |
| Free tier exceeded | Wait for reset (UTC midnight) or upgrade |
| No AI responses | That's OK! Rule-based fallback works |
| Payment declined | Check card details in payment settings |

---

**Last Updated:** April 24, 2026  
**Status:** Ready to Deploy ✅
