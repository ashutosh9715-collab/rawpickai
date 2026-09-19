# RawPickAI

> 🌐 **Live site**: [https://rawpickai.com](https://rawpickai.com)

Independent AI tool reviews and comparisons. We test every tool ourselves and score them honestly. INR pricing, hands-on testing, no sponsored rankings.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3 + CSS variables
- **Language**: TypeScript
- **Deploy**: Vercel
- **Newsletter**: Loops.so
- **Analytics**: Google Analytics + Vercel Analytics + Speed Insights

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer + Analytics)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles + design system
│   ├── review/[slug]/          # Individual tool review pages
│   ├── comparison/[slug]/      # Comparison pages (x-vs-y)
│   ├── best-of/[slug]/         # Best-of listicle pages
│   ├── blog/[slug]/            # Blog posts
│   ├── category/[slug]/        # Category listing pages
│   └── tools/                  # Interactive tools (calculators, quiz, etc.)
├── components/
│   ├── Navbar.tsx              # Sticky navigation with search
│   ├── Footer.tsx              # Site footer with newsletter signup
│   ├── PageHero.tsx            # Hero with author avatar + breadcrumbs
│   ├── TableOfContents.tsx     # Floating TOC for long-form content
│   ├── RelatedPosts.tsx        # Related content cards
│   ├── StickyBottomBar.tsx     # Sticky read-next bar
│   └── Search.tsx              # Site-wide search
├── content/
│   ├── reviews/                # Tool review markdown files
│   ├── comparisons/            # Comparison markdown files
│   ├── best-of/                # Best-of list markdown files
│   └── blog/                   # Blog post markdown files
├── data/
│   └── tools.ts                # Tool data + categories
└── lib/
    └── content.ts              # Content loading helpers
```

## Adding New Content

### New Tool Review
1. Create `content/reviews/[tool-slug]-review.md`
2. Add frontmatter (title, description, slug, lastUpdated, scores, etc.)
3. Page auto-generates at `/review/[tool-slug]`

### New Blog Post
1. Create `content/blog/[post-slug].md`
2. Add frontmatter
3. Page auto-generates at `/blog/[post-slug]`

### New Comparison or Best-of
1. Create file in `content/comparisons/` or `content/best-of/`
2. Add appropriate frontmatter
3. Auto-routed via `[slug]` pages

## Content Guidelines (SEO)

- Minimum 1500 words per review
- Hands-on testing required
- INR pricing alongside USD
- TL;DR section in first 200 words
- FAQ section answering search queries
- Update `lastUpdated` when refreshing content
- Internal link density: 5-8 links per 1000 words
- Max 1 new post per day to avoid spam flags

## Deploy

The site auto-deploys to Vercel on push to `main` branch.

```bash
git add .
git commit -m "your message"
git push origin main
```

## Links

- 🌐 **Production**: [rawpickai.com](https://rawpickai.com)
- 📊 **Analytics**: Google Analytics (G-TN528FMYR7)
- 🔍 **Search Console**: [Google Search Console](https://search.google.com/search-console)
- 📧 **Newsletter**: Powered by Loops.so
