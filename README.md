# RawPickAI — Independent AI Tool Reviews & Comparisons

A Next.js 14 site for reviewing, comparing, and discovering AI tools.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4 + CSS variables
- **Fonts**: Outfit (display) + Space Mono (data/mono)
- **Language**: TypeScript
- **Deploy**: Vercel

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
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles + design system
│   ├── tool/[slug]/        # Individual tool review pages
│   ├── compare/[slug]/     # Comparison pages (x-vs-y)
│   ├── best/[slug]/        # Best-of listicle pages
│   └── category/[slug]/    # Category listing pages
├── components/
│   ├── Navbar.tsx           # Sticky navigation
│   ├── Footer.tsx           # Site footer
│   └── ui.tsx               # Reusable UI components
├── data/
│   └── tools.ts             # Tool data + categories
└── lib/
    └── types.ts             # TypeScript interfaces
```

## Adding a New Tool

1. Add tool data to `src/data/tools.ts` following the `Tool` interface
2. The page auto-generates at `/tool/[slug]`
3. Add to relevant best-of lists and comparison pages

## Design System

CSS variables defined in `globals.css`:
- `--primary`: #6366F1 (indigo)
- `--green`: #22c55e (success)
- `--red`: #ef4444 (error)
- `--font-sans`: Outfit
- `--font-mono`: Space Mono

## Content Guidelines (SEO)

- Minimum 1200 words per tool review
- Include genuine first-hand testing observations
- Update `lastUpdated` when refreshing content
- Add FAQ schema via structured data
- Scale at 8-12 pages/week max

## Deploy to Vercel

```bash
# Connect to GitHub and deploy
npx vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for auto-deploys.
