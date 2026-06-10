# AykarInfotech — Payment Page

A clean, secure payment checkout page powered by NOWPayments.

## Features
- Accept crypto payments (Bitcoin, Ethereum, USDT, 200+ coins)
- Card payments via Guardarian (once approved)
- Preset + custom amounts
- Mobile-responsive dark UI

---

## Deploy to Vercel (Step-by-Step)

### Step 1 — Push to GitHub
1. Create a new repo at github.com
2. Upload all these files to the repo
3. Or run in terminal:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/aykarinfotech.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to **vercel.com** and sign in with GitHub
2. Click **"New Project"**
3. Import your **aykarinfotech** GitHub repo
4. Click **"Deploy"** (Vercel auto-detects Next.js)

### Step 3 — Add Environment Variables
In Vercel dashboard → Your Project → **Settings → Environment Variables**:

| Key | Value |
|-----|-------|
| `NOWPAYMENTS_API_KEY` | Your API key from NOWPayments dashboard |
| `NEXT_PUBLIC_BASE_URL` | `https://your-project.vercel.app` |

### Step 4 — Redeploy
After adding env variables, go to **Deployments → Redeploy**

---

## Your API Key
Found in: NOWPayments Dashboard → Settings → Payments → API Keys
Your key starts with: `5WQS...`

## Local Development
```bash
npm install
cp .env.example .env.local
# Edit .env.local with your API key
npm run dev
```

Open http://localhost:3000
