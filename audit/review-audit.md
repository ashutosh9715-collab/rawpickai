# Review evidence audit

Audited 2026-09-19. This is a recovery classification, not a permanent judgment on a product or URL.

## Decision standard

A review remains indexable only when the repository contains evidence of a real first-hand session: original raster screenshots from a logged-in product or generated outputs, identifiable tasks or prompts, observed limitations, and a product-level URL that can be updated without changing the slug.

Generated SVG scorecards, pricing diagrams, long word count, first-person phrasing, or claims that a tool was tested are not sufficient by themselves. A noindexed page remains accessible and can return after an evidence-led rewrite.

## Results

- **Keep indexed (3):** DeeVid AI, Gumloop, Zapier.
- **Improve before reindexing (21):** promising test detail, but no original raster evidence in the repository.
- **Park as noindex (29):** insufficient evidence for recovery priorities.
- **Merge (0):** the review URLs are already product/entity URLs rather than version URLs. Any future product rename or shutdown must be verified before redirecting.

### Keep indexed

| Slug | Original raster evidence | Why it stays |
|---|---:|---|
| `deevid-ai` | 6 | Logged-in pricing interface, generated outputs, model comparison, exact test prompt, and tracked credit consumption. |
| `gumloop` | 9 | Logged-in dashboard, workflow builder, model selection, node library, pricing, and described workflow edits. |
| `zapier` | 6 | Logged-in Copilot, Agents, MCP, pricing, and Zap-editor screens tied to described automation tests. |

### Improve before reindexing

`adobe-firefly`, `beautiful-ai`, `bolt-new`, `canva-ai`, `chatgpt`, `cursor`, `dalle3`, `figma-ai`, `github-copilot`, `google-notebooklm`, `google-slides-gemini`, `grammarly`, `jasper`, `kling-ai`, `lovable`, `manus-ai`, `microsoft-copilot`, `midjourney`, `notion-ai`, `perplexity`, `powerpoint-copilot`

Each page needs, at minimum: three original screenshots or outputs, the tested plan and date, repeatable tasks/prompts, observed results, limitations, and current pricing/version verification. Remove any claim that cannot be traced to that evidence. Reindex one page only after the rewrite is complete.

### Park as noindex

`amazon-codewhisperer`, `claude-code`, `claude`, `coda-ai`, `copyai`, `descript`, `elevenlabs`, `gamma`, `google-gemini`, `heygen`, `ideogram`, `leonardo-ai`, `looka`, `luma-dream-machine`, `meta-ai`, `mistral-le-chat`, `murf-ai`, `otter-ai`, `pika`, `runway`, `rytr`, `semrush-ai`, `stable-diffusion`, `stable-video-diffusion`, `surfer-seo`, `tabnine`, `windsurf`, `writesonic`, `youcom`

These pages should not be rewritten in bulk. Revisit only when RawPickAI can run and document a genuine test session or when meaningful direct/referral demand justifies the work.

## Machine-readable evidence

- `audit/review-evidence.csv`
- `audit/review-evidence.json`
- Reproducible audit script: `scripts/audit-review-evidence.cjs`

The automated score is a triage aid, not the indexing rule. Original evidence was visually inspected before the three-page allowlist was selected.
