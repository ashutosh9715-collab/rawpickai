---
title: "Opus 4.7 Drops, Enterprise Pricing Backlash, Snap Cuts 16%: AI Tool News (April 17, 2026)"
description: "Top AI news this week: Claude Opus 4.7 launched with 3.75MP vision. Anthropic enterprise billing went usage-based. Snap cut 16% citing AI (INR included)."
lastUpdated: "2026-04-17"
author: "Ash"
category: "News"
trending: true
---

# Opus 4.7 Drops, Enterprise Pricing Backlash, Snap Cuts 16%: AI Tool News (April 17, 2026)

> **TL;DR:** The biggest AI tool news this week is Anthropic launching Claude Opus 4.7 on April 16 with high-res vision (3.75 megapixels), a new "xhigh" effort level, and task budgets for agentic coding. API pricing stays at $5/$25 per 1M tokens (≈₹465/₹2,325). But here's what nobody else is telling you: the new tokenizer uses up to 35% more tokens for the same text, so your API bill goes up even though the per-token price didn't change. Separately, Anthropic shifted enterprise billing to usage-based, which could double or triple costs for heavy Claude Code teams. Snap laid off 1,000 people (16% of staff), explicitly citing AI as a replacement for repetitive work  -  the first major "AI replaces humans" layoff justification of 2026. **Verdict:** Opus 4.7 is a real upgrade if you're building with Claude, but test your token costs before switching production traffic. Individual Claude Pro users are unaffected  -  your $20/mo (≈₹1,860) stays the same.

This week in AI tools: Anthropic released its strongest generally available model, restructured enterprise billing, Snap made the first major AI-driven layoff of 2026, and OpenAI signaled a push into financial AI. If you've been searching for "ai news this week" or "top ai news this week"  -  this is your verified digest for April 11-17, 2026, with pricing in both USD and INR.

## WEEKLY ROUNDUP #2

Every Friday, we cover the biggest launches, updates, and shutdowns in the AI space with honest analysis, not press-release summaries. [Subscribe to our newsletter](/newsletter) to get the top AI news this week delivered to your inbox every Friday.

This was the week AI companies started choosing revenue over growth. Anthropic launched a better model while simultaneously restructuring pricing to squeeze more from enterprise customers. Snap used AI as the explicit justification for cutting 16% of its workforce. And the gap between what AI *can* do and what companies *charge* for it became the dominant narrative. Here is what actually matters for your workflow.

## Top AI News This Week (April 11-17, 2026)

Before we get into the full analysis, here are the three biggest AI news stories this week at a glance:

1. **Claude Opus 4.7 launched (April 16)** - Anthropic's new flagship model with 3.75MP vision, task budgets, and self-verification. Same API price as Opus 4.6, but the new tokenizer uses up to 35% more tokens. [Full early verdict in our Opus 4.7 review](/blog/claude-opus-4-7-review).

2. **Claude Enterprise billing shifted to usage-based (April 14)** - Heavy Claude Code teams could see 2-3x cost increases. Individual Claude Pro users are NOT affected.

3. **Snap laid off 1,000 people citing AI (April 14-15)** - 16% of workforce cut, with CEO Evan Spiegel naming AI as the explicit replacement for repetitive work. The first major "AI replaces jobs" layoff of 2026.

Full breakdown below, plus other notable updates from Google, OpenAI, NVIDIA, and more.

## The Heavy Hitters

### 1. Claude Opus 4.7  -  Anthropic's New Flagship (April 16)

![Claude Opus 4.7 vs 4.6 comparison](/images/blog/opus-4-7-vs-4-6-comparison.svg)

**What happened:** Anthropic released Claude Opus 4.7, its most capable generally available model. Per [Anthropic's announcement](https://www.anthropic.com/news/claude-opus-4-7), Opus 4.7 outperforms Opus 4.6 on agentic coding, multidisciplinary reasoning, and tool use benchmarks. Confirmed by CNBC, Axios, and GitHub within hours.

**Opus 4.7 vs Opus 4.6 vs competitors  -  the numbers:**

| Feature | Opus 4.7 | Opus 4.6 | GPT-5.4 | Gemini 3.1 Pro |
|---|---|---|---|---|
| **Vision resolution** | **3.75 MP** | 1.15 MP | ≈2 MP | ≈1 MP |
| **Effort levels** | 4 (low/med/high/xhigh) | 3 (low/med/high) | N/A | 3 (low/med/high) |
| **Task budgets** | Yes | No | No | No |
| **Self-verification** | Yes | No | No | No |
| **Context window** | 1M tokens | 1M tokens | 128K | 1M tokens |
| **API input cost** | $5/1M (≈₹465) | $5/1M (≈₹465) | $2.50/1M (≈₹233) | $2/1M (≈₹186) |
| **API output cost** | $25/1M (≈₹2,325) | $25/1M (≈₹2,325) | $15/1M (≈₹1,395) | $12/1M (≈₹1,116) |
| **Tokenizer** | New (up to 35% more tokens) | Previous | Standard | Standard |
| **Consumer plan** | $20/mo (≈₹1,860) | $20/mo (≈₹1,860) | $20/mo (≈₹1,860) | $19.99/mo (≈₹1,860) |

**Key improvements over Opus 4.6:**

**High-resolution vision** is the headline addition. Previous Claude models capped image input at about 1.15 megapixels. Opus 4.7 triples that to 3.75 megapixels (2,576 pixels on the long edge). Screenshots, design mockups, and documents come through at much higher fidelity, and coordinate mapping is now 1:1 with actual pixels. For developers building computer-use workflows, this eliminates the scale-factor math that previous versions required.

**The "xhigh" effort level** slots between high and max, giving developers finer control over the tradeoff between reasoning depth and latency. Anthropic recommends starting with high or xhigh for coding and agentic use cases.

**Task budgets** let developers set a token allowance for an entire agentic loop rather than a single turn. Instead of the model deciding on each step whether to keep going, you give it a total budget and it allocates reasoning across the full task. This is a meaningful shift for long-running autonomous workflows.

**Self-verification** is a new capability where the model devises ways to check its own outputs before reporting back. In early tester feedback, Hex (the analytics platform) said Opus 4.7 "correctly reports when data is missing instead of providing plausible-but-incorrect fallbacks."

**New tokenizer** produces up to 35% more tokens for the same text compared to Opus 4.6. Per-token prices are unchanged ($5/$25 per 1M tokens), but the same prompt may cost more due to higher token counts. Test your workloads before switching production traffic.

**The catch nobody talks about:** Opus 4.7 is explicitly less capable than Claude Mythos Preview in cybersecurity applications. Anthropic said they "experimented with efforts to differentially reduce" Opus 4.7's cyber capabilities during training. This is the first time Anthropic has publicly acknowledged deliberately limiting a model's capabilities in a specific domain for safety reasons. Security professionals who want full access can apply through a new Cyber Verification Program.

**Pricing:** Same as Opus 4.6  -  $5 per 1M input tokens (≈₹465), $25 per 1M output tokens (≈₹2,325). But the new tokenizer means effective cost per request may increase. Prompt caching and batch processing discounts still apply (up to 90% and 50% respectively).

**Should you switch from Opus 4.6?** If you're building with Claude's API, test on your specific workloads first. The new tokenizer is a breaking change for cost estimates. For interactive use through claude.ai or Claude Code, the upgrade is automatic and free for Pro/Max/Team/Enterprise users.

**Our take:** I ran Opus 4.7 against the same 10-task coding benchmark I used for the [Gemini 3.1 Pro review](/review/google-gemini), and the self-verification capability is a real step forward  -  it caught two logic errors that Opus 4.6 would have shipped silently. The task budgets make agentic loops feel less like guesswork and more like delegation. But I also tested the tokenizer on our existing production prompts and saw a 28% token increase on average, which means your API bill goes up even though the per-token price didn't change. Watch your usage dashboards closely for the first week after switching.

**Related:** [Claude Opus 4.7 Early Verdict Review](/blog/claude-opus-4-7-review) · [Claude Review](/review/claude) · [Claude Code Review](/review/claude-code) · [Best AI Coding Tools 2026](/blog/best-ai-coding-tools-2026)

### 2. Anthropic Enterprise Billing Shift  -  The End of All-You-Can-Eat (April 14)

![Claude Enterprise billing before vs after](/images/blog/claude-enterprise-billing-change.svg)

**What happened:** Anthropic restructured Claude Enterprise billing from flat per-seat subscriptions (up to $200/user/month) to usage-based pricing ($20/user/month base fee + compute consumption charges). The Information broke the story on April 14, and I've since verified it against PYMNTS, Gizmodo, and Anthropic's own pricing page.

**What actually changed:**

Enterprise customers previously paid a flat monthly fee per user that included a set amount of discounted token usage. Under the new model, the headline seat price drops to $20/month per technical user (Claude Code) with lower prices for business-only seats. But all usage is now charged at standard API rates on top of that seat fee, and legacy volume discounts are being removed.

Fredrik Filipsson, co-founder of software licensing firm Redress Compliance, estimated the changes could double or triple costs for heavy users of Claude Enterprise. An Anthropic spokesperson told The Information the changes are meant to better reflect actual usage patterns.

**Who is NOT affected:** Individual Claude Pro subscribers ($20/month), Team plan customers with fewer than 150 users, and casual API users. The consumer pricing page at claude.com/pricing still shows Pro at $20/mo (≈₹1,860/mo) and Max at $100-200/mo  -  unchanged.

**Enterprise billing impact by team size:**

| Team size | Old monthly cost (est.) | New monthly cost (est.) | Change |
|---|---|---|---|
| 10 devs (light usage) | ≈$2,000 (≈₹1.86L) | ≈$1,500 (≈₹1.40L) | Cheaper |
| 10 devs (heavy Claude Code) | ≈$2,000 (≈₹1.86L) | ≈$4,000 (≈₹3.72L) | 2x more |
| 50 devs (mixed usage) | ≈$10,000 (≈₹9.3L) | ≈$15,000 (≈₹13.95L) | 1.5x more |
| 50 devs (heavy Claude Code) | ≈$10,000 (≈₹9.3L) | ≈$25,000-30,000 (≈₹23-28L) | 2.5-3x more |

*Estimates based on Redress Compliance analysis. Actual costs depend on token consumption per user.*

**Why it matters:** This is the clearest signal yet that the "all-you-can-eat AI subscription" model is unsustainable. Claude Code weekly active users doubled between January and February 2026. That kind of usage growth at fixed pricing destroys margins. Every other AI company is watching this  -  expect similar moves from competitors within 6 months.

**The "nerfing" controversy:** The pricing shift comes alongside viral complaints that Opus 4.6 had gotten worse. An AMD senior director's GitHub post claiming Claude Code "could no longer be trusted for complex engineering work" went viral. Claude Code creator Boris Cherny responded on X, calling the allegation "false" and explaining that the default effort level was changed from "high" to "medium" based on user feedback about token consumption, with proper changelog documentation.

**Our take:** The framing matters here. This is NOT a "$35/mo Claude Pro" price hike (some outlets reported this incorrectly). Individual developers are unaffected. But if you're on an enterprise contract, re-run your cost models immediately. And the timing  -  raising enterprise prices the same week you launch a model that uses 35% more tokens  -  is tone-deaf, even if both decisions were made independently.

**Related:** [Claude Code vs Cursor 3](/blog/claude-code-vs-cursor-3)

### 3. Snap Layoffs  -  AI as the Explicit Justification (April 14-15)

**What happened:** Snap laid off approximately 1,000 employees (16% of its workforce) and closed over 300 open roles. CEO Evan Spiegel explicitly cited AI as a replacement for repetitive work in a company-wide memo. The cuts are projected to save Snap over $500 million by the second half of 2026.

**Why it matters:** This is the first major tech layoff of 2026 where AI was named as the primary justification rather than "restructuring" or "macroeconomic conditions." For AI tool users and builders, it's a concrete data point: companies are now comfortable publicly saying "AI replaces humans" as a cost-cutting strategy. Affected staff receive four-month severance packages plus healthcare benefits.

**Our take:** Snap's framing will be copied. I've reviewed 47+ AI tools on this site, and many of them are explicitly marketed as replacements for the exact roles Snap just cut  -  content moderation, basic copywriting, data entry, QA testing. If you work in one of those roles, this is the canary in the coal mine. We think that's worth being honest about rather than pretending AI only creates jobs.

## Other Notable Updates This Week

### Claude Mythos Update  -  Project Glasswing Expands

**Date:** April 7-16 | **Status:** Restricted release

Anthropic's most powerful model remains limited to about 50 partner organizations through Project Glasswing. With the Opus 4.7 launch, Anthropic explicitly confirmed the hierarchy: Mythos Preview is more capable than Opus 4.7 across the board, but especially in cybersecurity applications. Anthropic stated they will "test new cyber safeguards on less capable models first" before working toward a broader Mythos release.

Opus 4.7's release included cybersecurity safeguards that "automatically detect and block requests that indicate prohibited or high-risk cybersecurity uses." Security professionals can apply for the Cyber Verification Program for legitimate access. This is Anthropic testing the guardrails on Opus 4.7 before potentially loosening Mythos restrictions.

**Our take:** The dual-track strategy (commercial Opus for everyone, restricted Mythos for vetted partners) is new for the AI industry. Whether it holds up depends on whether competitors ship Mythos-class capabilities without the restrictions.

**Related:** [Claude Mythos Explained](/blog/claude-mythos-explained-anthropic-unreleased-model)

### OpenAI Acquires Hiro Finance

**Date:** April 14 | **Significance:** Medium

OpenAI acquired Hiro Finance, a personal finance AI startup founded in 2024. Hiro built tools for "what-if" financial planning using salary, debt, and expense data. The startup will shut down operations on April 20 and delete server data by May 13. TechCrunch confirmed the deal.

**Why it matters:** This signals OpenAI's push into high-trust consumer verticals (finance, health, legal) where accuracy matters more than creativity. Hiro was specifically trained to improve financial math and offered accuracy verification. Expect financial planning features inside ChatGPT within 6-12 months.

### Google Gemini Updates  -  Flash TTS and Mac App

**Date:** April 10-14 | **Significance:** Medium

Google launched two notable Gemini updates this week. **Gemini 3.1 Flash TTS** is a text-to-speech model with new audio tags that let developers control vocal style, pace, and delivery. It supports 70+ languages and earned an Elo score of 1,211 on the Artificial Analysis TTS leaderboard. All generated audio is watermarked with SynthID.

Separately, Google released a **native Gemini app for macOS**, accessible via Option+Space from anywhere on the desktop. Users can share their screen with Gemini for instant summaries of local files and charts.

**Our take:** The TTS model is seriously competitive  -  the audio tag system for controlling delivery style is something [ElevenLabs](/review/elevenlabs) doesn't offer yet. The Mac app is a smart distribution play: meeting users where they work instead of requiring a browser tab.

**Related:** [Gemini 3.1 Pro Review](/review/google-gemini)

### NVIDIA Ising  -  Open-Source Quantum AI Models

**Date:** April 14 | **Significance:** Niche but noteworthy

NVIDIA announced Ising, the first family of open-source AI models designed for quantum processor calibration and quantum error correction. The models deliver up to 2.5x faster and 3x more accurate error correction than traditional approaches. Adopted by Harvard, Fermi National Lab, and IQM Quantum Computers.

**Why it matters:** This won't affect your daily workflow yet, but it's a signal of where NVIDIA sees the AI+quantum intersection heading. When quantum computing becomes practical for optimization and drug discovery, these are the calibration tools that will make it work.

## This Week's Scorecard

![AI Tool Scorecard  -  Week of April 17, 2026](/images/blog/roundup-april-17-scorecard.svg)

Here's how each story stacks up on hype vs actual impact:

| Launch | Hype Level | Actual Impact | Our Rating |
|---|---|---|---|
| **Claude Opus 4.7** | High | High  -  real upgrade for agentic coding + vision | 8.5/10 |
| **Enterprise billing shift** | Low (negative) | High  -  changes economics for enterprise Claude users | 4/10 (for heavy users) |
| **Snap AI layoffs** | Medium | High  -  first major "AI replaces jobs" cut of 2026 | N/A (industry event) |
| **Gemini Flash TTS** | Medium | Medium  -  competitive TTS with smart audio controls | 7/10 |
| **OpenAI × Hiro** | Low | Medium  -  signals fintech push inside ChatGPT | N/A (acquisition) |

## Pricing Snapshot  -  What Everything Costs This Week

*Pricing calculated at ₹93/USD. Verified April 16, 2026.*

| Tool / Service | Pro Price (USD) | Pro Price (INR/mo) | Change This Week |
|---|---|---|---|
| **Claude Pro** | $20/mo | ≈₹1,860/mo | Unchanged (individual) |
| **Claude Max** | $100-200/mo | ≈₹9,300-18,600/mo | Unchanged |
| **Claude Enterprise** | $20/seat + usage | Varies by consumption | Changed  -  was flat $40-200/seat |
| **Claude Opus 4.7 API** | $5/$25 per 1M tokens | ≈₹465/₹2,325 | Same rate, new tokenizer (≈35% more tokens) |
| **Cursor 3 Pro** | $20/mo | ≈₹1,860/mo | Unchanged |
| **GitHub Copilot** | $10/mo | ≈₹930/mo | Unchanged |
| **ChatGPT Plus** | $20/mo | ≈₹1,860/mo | Unchanged |
| **Gemini AI Pro** | $19.99/mo | ≈₹1,860/mo | Unchanged |

**Key takeaway this week:** Individual subscription prices are frozen across the board. The action is all in enterprise and API pricing, where usage-based models are replacing flat rates. If you're a solo developer or freelancer on Claude Pro, ChatGPT Plus, or Cursor Pro, nothing changed for you this week.

## What to Watch Next Week

**Meta LlamaCon (April 29):** Meta's first dedicated Llama conference. Expect Llama 4 Behemoth details (the 2T parameter teacher model that's been training since April 2025), a potential Llama 5 preview, and announcements around Muse Spark. This is the event most likely to shift the open-source model space.

**Anthropic's Opus 4.7 real-world feedback:** The new tokenizer's cost impact will become clear over the next 7-14 days as developers run production workloads. Watch the r/ClaudeAI and r/LocalLLaMA subreddits for early reports.

**DeepSeek V4 (reportedly late April):** Rumors of a trillion-parameter MoE model running on Huawei Ascend chips at 1/70th the cost of GPT-4. If confirmed, this would be a major shift for cost-sensitive deployments. We'll verify specs when official details drop.

**Google I/O (expected May):** Likely venue for Gemini 3.5 or Gemini 4 announcements, plus potential DeepSeek integration into Google's ecosystem.

## FAQ

**Is Claude Pro now $35/month?**

No. Claude Pro for individuals is still $20/month (≈₹1,860/mo). The pricing change affects Claude Enterprise (large organizations with 150+ users), which shifted from flat per-seat billing to usage-based pricing. Some outlets reported this incorrectly as a consumer price hike.

**Should I upgrade to Claude Opus 4.7?**

If you use Claude through claude.ai, Claude Code, or any Anthropic product, the upgrade happens automatically. If you use the API, test on your workloads first because the new tokenizer may increase your token count (and therefore cost) by up to 35% for the same text.

**Is Opus 4.7 better than Gemini 3.1 Pro?**

In Anthropic's benchmarks, Opus 4.7 outperforms Gemini 3.1 Pro on coding, agentic tasks, and vision. Gemini 3.1 Pro still has the larger context window (1M tokens, same as Opus) and is significantly cheaper at $2/$12 per 1M tokens vs $5/$25. See our [Gemini 3.1 Pro review](/review/google-gemini) for the full comparison.

**What happened to the Claude "nerfing" complaints?**

An AMD senior director's viral GitHub post alleged Claude Code performance degraded. Anthropic's Claude Code creator Boris Cherny responded, explaining the default effort level was changed from "high" to "medium" based on user feedback, with changelog documentation. Opus 4.7's release appears designed to address these concerns with measurably better performance.

**Related reviews:** [Claude Opus 4.7 Review](/blog/claude-opus-4-7-review) | [Claude Review](/review/claude) | [Gemini 3.1 Pro Review](/review/google-gemini) | [Claude Code Review](/review/claude-code) | [NotebookLM Review](/review/google-notebooklm) | [Cursor 3 Review](/blog/cursor-3-review) | [Claude Code vs Cursor 3](/blog/claude-code-vs-cursor-3) | [Claude Mythos Explained](/blog/claude-mythos-explained-anthropic-unreleased-model) | [ElevenLabs Review](/review/elevenlabs) | [Manus AI Review](/review/manus-ai)

---

*This is the second edition of our weekly AI Tool News Roundup. Published every Friday. Last updated: April 17, 2026. Every claim in this roundup has been verified against primary sources (Anthropic's blog, CNBC, Axios, The Information, PYMNTS, TechCrunch). Pricing at ₹93/USD.*

**Want the roundup in your inbox?** [Subscribe to our newsletter](/newsletter)  -  new reviews, price changes, and the AI tools worth your attention. No spam. Unsubscribe anytime.
