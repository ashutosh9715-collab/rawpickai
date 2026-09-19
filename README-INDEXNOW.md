# IndexNow Setup

IndexNow tells Bing/Yandex/Seznam to crawl your URLs immediately. Free, official protocol.

This repo is **public**, so the IndexNow key is served dynamically from a Vercel environment variable via middleware (`src/middleware.ts`). The key never enters git.

## One-time setup

### 1. Generate a key

```bash
openssl rand -hex 16
```

Example: `a3f8c91d4e5b6a7f8c91d4e5b6a7f8c9`. Save it.

### 2. Add it to Vercel

In Vercel dashboard → your `rawpickai` project → **Settings → Environment Variables → Add New**:

| Field | Value |
|---|---|
| Name | `INDEXNOW_KEY` |
| Value | `a3f8c91d4e5b6a7f8c91d4e5b6a7f8c9` (your actual key) |
| Environments | ✓ Production ✓ Preview ✓ Development |

Click Save. Then trigger a new deploy (push any commit, or click "Redeploy" on the latest deployment).

### 3. Add it to your local shell

Add this line to your `~/.zshrc`:

```bash
export INDEXNOW_KEY=a3f8c91d4e5b6a7f8c91d4e5b6a7f8c9
```

Then reload:

```bash
source ~/.zshrc
echo $INDEXNOW_KEY  # should print your key
```

### 4. Verify the key file is live

After Vercel redeploys, visit in your browser:

```
https://rawpickai.com/a3f8c91d4e5b6a7f8c91d4e5b6a7f8c9.txt
```

You should see your key as plain text. **If you get 404, double-check the Vercel env var is set and you've redeployed.**

Also verify your existing files still work (the middleware should not affect them):
- `https://rawpickai.com/robots.txt` ✓
- `https://rawpickai.com/llms.txt` ✓
- `https://rawpickai.com/llms-full.txt` ✓

### 5. Sign up for Bing Webmaster Tools

Go to **bing.com/webmasters**, add `rawpickai.com`. Use "Import from Google Search Console" to verify ownership in 30 seconds. This dashboard is where you'll see IndexNow submissions and Bing crawl data.

## Submitting URLs

### After every deploy, run:

```bash
node scripts/indexnow.mjs
```

This fetches your sitemap and submits all URLs at once.

### Or submit specific URLs:

```bash
node scripts/indexnow.mjs https://rawpickai.com/review/manus-ai
```

You can pass multiple URLs as separate arguments.

## Expected output

```
Fetching sitemap: https://rawpickai.com/sitemap.xml
Found 115 URLs in sitemap
✅ Batch 1/1: 115 URLs accepted (200)
```

## Troubleshooting

| Error | Fix |
|---|---|
| `INDEXNOW_KEY environment variable not set` | `export INDEXNOW_KEY=...` in your shell |
| `403` from IndexNow | Visit `https://rawpickai.com/<key>.txt` in a browser. If 404, your Vercel env var isn't set or you haven't redeployed. |
| `422` from IndexNow | A URL doesn't start with `https://rawpickai.com/` |
| `429` from IndexNow | Slow down — wait an hour, don't resubmit aggressively |

## What to expect

- Within 1 hour: Bing starts crawling submitted URLs
- Within 24 hours: Bing Webmaster Tools dashboard shows submissions
- Within 1 week: New posts indexed by Bing (vs. 2-4 weeks without)
- Traffic impact: small but free. Bing/Yahoo are 5-10% of search market. Worth it.

## Security notes

- The IndexNow key is intentionally low-sensitivity. Worst case if leaked: someone submits weird URLs on your behalf, Bing notices, key gets disabled, you generate a new one.
- Even so — never paste your key into a commit, README, or `.env.example` file.
- The middleware in `src/middleware.ts` is what makes this safe for public repos.
