# Search recovery controls

Implemented on 2026-09-19 as the reversible first phase of the RawPickAI content cleanup.

## Current index policy

- 3 of 53 review pages remain indexable after the evidence audit: DeeVid AI, Gumloop, and Zapier.
- The other 50 reviews are `noindex, follow` and excluded from the sitemap until they gain verifiable first-hand evidence.
- 22 of 28 blog posts are `noindex, follow`; 6 remain indexable.
- 10 of 15 comparisons are `noindex, follow`; 5 remain indexable.
- All 27 Learn articles are `noindex, follow`.
- All 27 news articles are `noindex, follow`.
- All 9 best-of articles are `noindex, follow`.
- No source articles were deleted.

The allowlists are in `src/lib/indexing.ts`. Noindexed articles are excluded from the main sitemap. The separate news sitemap is no longer advertised in `robots.txt`.

Review audit detail and reproducible measurements are in `audit/review-audit.md`, `audit/review-evidence.csv`, and `scripts/audit-review-evidence.cjs`.

The homepage, primary navigation, and footer no longer promote the noindexed Best-of, Learn, or News archives. Version-specific Composer content was also removed from the homepage in favor of an evergreen entity review. Unsupported blanket claims about testing frequency and monthly freshness were replaced with the evidence standard retained reviews are expected to meet. Unlinked publication name-drops were removed pending verifiable citations.

## Why this is reversible

Pages remain accessible to direct visitors and crawlers can still follow their links. After a page passes the first-hand evidence audit, add its slug to the relevant allowlist or revise the group policy, rebuild, verify its robots meta tag, and return it to the sitemap.

Do not add a page back solely because its prose was rewritten. It must have verifiable testing, accurate dates and prices, original evidence, working links, and a durable purpose.

## Verified build results

- Reviews: 3 index, 50 noindex
- Blog: 6 index, 22 noindex
- Comparisons: 5 index, 10 noindex
- Best-of: 0 index, 9 noindex
- Learn: 0 index, 27 noindex
- News: 0 index, 27 noindex
- Category hub/pages: noindex and excluded from the sitemap while the review set is rebuilt
- Production build: passed
