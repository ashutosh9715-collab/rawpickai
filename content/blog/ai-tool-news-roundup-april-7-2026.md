---
title: "AI Tool News Roundup — Week of April 7, 2026"
description: "This week's biggest AI launches: Cursor 3 rebuilt from scratch, Microsoft dropped 3 in-house AI models, Google released Gemma 4 open-source, and Sora got shut down. Everything you need to know."
slug: "/blog/ai-news-roundup-april-7-2026"
lastUpdated: "2026-04-05"
author: "Ash"
schema: "Article"
category: "News Roundup"
ogImage: "/images/og/ai-roundup-april-7.png"
trending: true
series: "Weekly Roundup"
---

# AI Tool News Roundup — Week of April 7, 2026

<div class="callout callout-roundup">
<strong>WEEKLY ROUNDUP #1:</strong> This is our first weekly AI tool news roundup. Every Friday, we'll cover the biggest launches, updates, and shutdowns in the AI tool space — with honest takes, not just press release summaries. Subscribe to get this in your inbox.
</div>

This was the most eventful week in AI tools since the GPT-5 launch. Three major product launches in three days, a high-profile shutdown, and a market share war that's reshaping how developers write code. Here's everything that happened, why it matters, and what you should actually do about it.

## The Big Three Launches

### 1. Cursor 3 — A Complete Rebuild (April 2)

<div class="news-card">

**What happened:** Cursor shipped version 3, and it's not an incremental update — it's a ground-up rebuild centered around AI agents.

**Key new features:**
- **Agents Window** — Run multiple AI agents in parallel on different tasks
- **Design Mode** — Click UI elements in a browser and annotate them for the AI to fix
- **Cloud Agents** — Offload heavy tasks to Cursor's servers for faster execution
- **Agent Tabs** — View multiple agent conversations side by side

**Why it matters:** Cursor is responding directly to Claude Code's 54% market share dominance. The parallel agents feature is Cursor's differentiator — Claude Code processes tasks sequentially. For frontend-heavy work, Design Mode is a genuine innovation that no competitor has matched yet.

**Our take:** This is the most significant AI coding tool update of 2026 so far. If you're a Cursor Pro subscriber, you get it automatically. If you're choosing between Cursor and Claude Code, this update narrows the gap significantly.

**Read more:** [Full Cursor 3 Review](/blog/cursor-3-review) | [Claude Code vs Cursor 3 vs Codex](/blog/claude-code-vs-cursor-vs-codex)

</div>

### 2. Microsoft MAI Models — Going Independent (April 2)

<div class="news-card">

**What happened:** Microsoft launched three in-house AI models through their MAI Superintelligence team led by Mustafa Suleyman:
- **MAI-Transcribe-1** — Speech-to-text in 25 languages, 2.5x faster than Azure Fast, at $0.36/hour (≈₹33.50)
- **MAI-Voice-1** — Voice generation that produces 60 seconds of audio in under 1 second
- **MAI-Image-2** — Text-to-image model that debuted #3 on Arena.ai leaderboard

**Why it matters:** Microsoft has been OpenAI's biggest customer and partner. Building competitive in-house models signals a strategic hedge. These aren't consumer products — they're enterprise infrastructure. But they'll likely power features in Teams, Office, and Windows within a year.

**Our take:** MAI-Transcribe-1 is the standout — fastest transcription at competitive pricing. The voice and image models are solid but face established competition from ElevenLabs and Midjourney respectively. The strategic significance outweighs the product significance right now.

**Read more:** [Full MAI Models Review](/blog/microsoft-mai-models-review)

</div>

### 3. Google Gemma 4 — Open Source Gets Serious (April 3)

<div class="news-card">

**What happened:** Google released Gemma 4, an open-source AI model family under Apache 2.0 license. Four sizes: E2B (runs on phones), E4B (runs on laptops), 26B MoE, and 31B Dense.

**Key specs:**
- Built from the same research as Gemini 3
- Natively multimodal (text + images + video)
- 140+ languages with strong Hindi support
- Up to 256K context window
- Runs on consumer hardware via Ollama

**Why it matters:** Gemma 4 is the most capable open-source model for Indian developers. Its Hindi language support is the best in the open-source space, and the Apache 2.0 license means unrestricted commercial use. The E4B model running on a laptop is genuinely useful — not a toy.

**Our take:** If you're an Indian developer building AI products, Gemma 4 should be your first evaluation. Free, capable, local, and with the best Indian language support available. It won't replace Claude for writing or ChatGPT for versatility, but for production deployment at scale, it's hard to beat free.

**Read more:** [Full Gemma 4 Review](/blog/gemma-4-review)

</div>

## The Big Shutdown

### Sora Standalone App — Discontinued (March 24)

<div class="news-card news-card-shutdown">

**What happened:** OpenAI shut down the standalone Sora app (sora.com) and its API on March 24. The reason: unsustainable compute costs. Downloads had fallen 67% from launch to February, and Disney reportedly pulled out of a $1 billion investment.

**What still works:** The Sora 2 model remains accessible through ChatGPT Plus ($20/mo) and ChatGPT Pro ($200/mo). You just can't use it as a standalone product or API anymore.

**What this means for AI video:** The market is shifting toward Runway Gen-4 Turbo, Pika 2.5, Kling 3.0, and Google Veo 3.1 as more sustainable alternatives. OpenAI's retreat from standalone video suggests that dedicated AI video generation is expensive to run at scale — and the subscription model (bundled into ChatGPT) is the only viable business model for now.

**Our take:** Sora's shutdown doesn't mean AI video is dead — it means the market is correcting from hype to reality. For content creators who need AI video today, [Runway](/review/runway) and [Pika](/review/pika) are the practical choices. We're publishing a full [Sora vs Runway vs Pika comparison](/blog/sora-vs-runway-vs-pika) this week.

</div>

## Other Notable Updates This Week

### Claude Code Hits $1B Revenue

Anthropic's Claude Code reached $1 billion in annualized revenue within just 6 months of launch — the fastest to this milestone in the AI coding space. The tool now holds 54% market share and a 46% "most loved" developer rating (more than double Cursor at 19%). The revenue milestone validates the terminal-first, quality-over-polish approach. Read our [Claude Code review](/review/claude-code).

### Composer 2 Built on Kimi K2.5

TechCrunch revealed that Cursor's Composer 2 model is built on top of Moonshot AI's Kimi K2.5, a Chinese open-source model. Cursor confirmed the relationship, stating that about 25% of Composer 2's foundation comes from Kimi K2.5, with the rest shaped by their own training. The disclosure raised transparency questions but doesn't change the model's practical performance. Read our [Composer 2 review](/blog/composer-2-review).

### Cursor Pro Usage Model Change

Cursor's Pro plan ($20/month, ≈₹1,860) now includes a $20 monthly credit pool for frontier model access. "Auto" mode — where Cursor picks the model (usually Composer 2) — is unlimited. Manually selecting Claude or GPT draws from credits. This is a smart economic model that gives users the best of both worlds: unlimited daily coding with Composer 2, premium quality on demand.

## What You Should Do This Week

<div class="action-items">

**If you're a developer:**
Try Cursor 3's Agents Window — even if you're a Claude Code user, the parallel agent paradigm is worth experiencing. Download Gemma 4 E4B via Ollama and test it with your codebase — you might be surprised how capable a free, local model has become.

**If you're a content creator:**
The Sora shutdown means evaluating alternatives now. Runway Gen-4 Turbo and Pika 2.5 are the front-runners. Don't wait for Sora to come back — the standalone product is gone.

**If you build AI products:**
Gemma 4 under Apache 2.0 is the most significant open-source release this year. If you're paying API costs for Claude or GPT in production, evaluate whether Gemma 4 can handle your use case at zero marginal cost. The Hindi/multilingual support makes it especially relevant for Indian market products.

**If you're watching your budget:**
Nothing has changed at the ₹1,860/month tier. Cursor Pro and Claude Code Pro are both excellent values. The free tiers of all these tools (Cursor Hobby, Claude Code Free, Gemma 4, NotebookLM) continue to improve. See our [best free AI tools guide](/best-of/best-free-ai-tools) for the full zero-cost stack.

</div>

## This Week's Scorecard

<div class="weekly-scorecard">

| Launch | Hype Level | Actual Impact | Our Rating |
|:-------|:-----------|:-------------|:-----------|
| Cursor 3 | Very High | High — parallel agents are a real paradigm shift | 9/10 |
| Microsoft MAI Models | Medium | Medium — enterprise-only limits immediate impact | 7/10 |
| Gemma 4 | High | High — best open-source model for Indian devs | 8.5/10 |
| Sora Shutdown | High (negative) | Medium — Sora 2 still lives inside ChatGPT | 6/10 (market impact) |
| Composer 2 Controversy | Low | Low — transparency issue, not a product issue | 4/10 |

</div>

## Pricing Snapshot — What Everything Costs in India This Week

For readers who want the numbers in one place:

<div class="pricing-snapshot">

| Tool / Service | Free Tier? | Pro Price (INR/month) | Value Rating |
|:---------------|:-----------|:---------------------|:-------------|
| Claude Code Pro | Yes (limited) | $20/mo (≈₹1,860) | Excellent |
| Cursor 3 Pro | Yes (limited) | $20/mo (≈₹1,860) | Excellent |
| ChatGPT Plus (includes Sora) | Yes (limited) | $20/mo (≈₹1,860) | Good |
| Gemini Advanced | Yes (generous) | $20/mo (≈₹1,860) + 2TB Drive | Great value |
| Runway Standard | 125 credits | $28/mo (≈₹2,604) | Good for video |
| Pika Starter | 150 credits | $8/mo (≈₹744) | Best budget video |
| Gemma 4 | Fully free (Apache 2.0) | ₹0 | Outstanding |
| Windsurf Free | Unlimited autocomplete | ₹0 / $15 Pro (≈₹1,395) | Best free coding |
| MAI-Transcribe-1 | No | $0.36/audio hour (≈₹33.50) | Competitive |

</div>

The ₹1,860/month tier remains the standard for premium AI tools. The real story this week is the expansion of genuinely capable free options — Gemma 4 and Windsurf Free together give developers a powerful zero-cost toolkit that didn't exist three months ago.

## Quick Takes — Things We're Watching

**Android AI integration is coming.** Gemma 4's E2B model runs natively on Android devices through AICore Developer Preview. For India's 600+ million Android users, this means on-device AI that works without internet. Expect app developers to start embedding Gemma 4 into apps over the coming months.

**The coding tool war is consolidating.** Claude Code (54%), Cursor (~20%), and Copilot (~15%) account for nearly 90% of the market. Smaller players like Tabnine, Amazon CodeWhisperer, and Replit's AI are fighting for the remaining 10%. The winner-take-most dynamic means switching costs are building — the earlier you invest in learning a tool, the harder it is to switch.

**Voice AI just got interesting.** Between MAI-Voice-1, ElevenLabs' continued improvements, and Google's text-to-speech advances, voice generation quality crossed the "sounds human to most listeners" threshold this year. The implications for content creators, podcasters, and accessibility tools are significant.

**Enterprise AI is splitting from consumer AI.** Microsoft's MAI models are enterprise-only. Gemma 4 targets developers, not end users. Cursor 3's most significant features (cloud agents, team plans) are business-focused. The tools consumers use (ChatGPT, Claude, Gemini) and the tools businesses build on are diverging into separate product categories.

## Coming Next Week

We're tracking several potential announcements: Meta is expected to release Llama 4 details, GitHub Copilot is reportedly preparing a major update to compete with Claude Code, and there are rumors of an Anthropic pricing change. We'll cover whatever drops in next Friday's roundup.

**Want the roundup in your inbox?** We're setting up a weekly newsletter. Follow [@rawpickai](https://twitter.com/rawpickai) for real-time updates between roundups.

## FAQ

**How do you decide what makes the roundup?**
We cover launches, updates, and shutdowns that directly affect how you use AI tools. Product announcements, pricing changes, significant model releases, and market shifts all qualify. We skip incremental updates and minor bug fixes.

**Are these tools available in India?**
All tools mentioned this week are accessible in India. Cursor, Claude Code, ChatGPT, and Gemini have no regional restrictions. Microsoft Foundry is available through Azure India regions. Gemma 4 is a download — no region lock.

**What's the single most important thing from this week?**
If you're a developer: try Cursor 3's Agents Window. If you're a content creator: evaluate Runway or Pika as Sora alternatives. If you build AI products: download and test Gemma 4. Each audience has a different headline story this week.

---

*This is the first edition of our weekly AI Tool News Roundup. Published every Friday. Last updated: April 5, 2026. Pricing at ₹93/USD.*
