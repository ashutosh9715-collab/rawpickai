---
title: "Claude Opus 4.8 Released: Sharper Judgment, Effort Control, Mythos Teased"
description: "Anthropic launches Opus 4.8 with 69.2% agentic coding, 4x fewer missed code flaws, and user effort control. Same pricing. Plus Mythos 1 coming October."
slug: "/news/claude-opus-4-8-released-effort-control-mythos-teased-may-28-2026"
lastUpdated: "2026-05-28"
author: "Ash"
category: "AI Assistants"
---

# Claude Opus 4.8 Released: Sharper Judgment, Effort Control, Mythos Teased

![Claude Opus 4.8 Launch](/images/news/news-may-28b-2026-hero.svg)

Anthropic released Claude Opus 4.8 today, six weeks after Opus 4.7's April launch. The upgrade delivers meaningful benchmark improvements across agentic coding, knowledge work, and computer use, while fixing the comment verbosity and tool-calling issues that frustrated Opus 4.7 users. Same pricing. Available now on claude.ai, Claude Code, AWS, Google Cloud, Microsoft Foundry, and GitHub Copilot.

The bigger news might be what Anthropic teased alongside the launch: Claude Mythos 1, described as an "even larger and more powerful" model targeting October 2026, which would coincide with Anthropic's planned IPO.

## The benchmark improvements

![Opus 4.8 vs 4.7 vs GPT-5.5](/images/news/news-may-28b-2026-benchmarks.svg)

The numbers tell a clear story. Agentic coding (SWE-bench) jumped from 64.3% to 69.2%, passing GPT-5.5's 67.1%. Multidisciplinary reasoning with tools (TAU-bench) moved from 54.7% to 57.9%. Computer use hit 83.4% on Online-Mind2Web, making Opus 4.8 the strongest browser agent model available, ahead of both Opus 4.7 (82.8%) and GPT-5.5 (78.9%). Knowledge work scored 1890 on BrowseComp, up from 1753.

These aren't dramatic leaps. They're the kind of consistent, incremental improvements that matter more for daily reliability than for benchmark headlines. The real upgrade is qualitative: Opus 4.8 is 4x less likely than 4.7 to miss flaws in code it produces and less prone to making unsupported claims about its output quality.

## What actually changed for users

![Honesty Improvements](/images/news/news-may-28b-2026-honesty.svg)

Opus 4.7 had specific pain points that working developers complained about. It was verbose in code comments, inconsistent in tool calling, and sometimes confidently wrong about the quality of its own output. Cognition (the company behind Devin) confirmed that 4.8 "fixes the comment-verbosity and tool-calling issues we saw with 4.7" and produces a "noticeably better signal-to-noise ratio."

Anthropic's alignment assessments show highest-ever prosocial trait scores with substantially lower rates of misaligned behavior compared to 4.7. In plain terms: the model is more honest about what it doesn't know and more consistent in how it uses tools.

For [Claude Code](/review/claude-code) users specifically, this addresses the biggest daily friction. When Claude confidently says "this code works" but it doesn't, that costs debugging time. A model that flags its own uncertainties is more useful than one that scores 5% higher on benchmarks.

## New features launching alongside 4.8

![New Features](/images/news/news-may-28b-2026-features.svg)

**Effort control:** Users on claude.ai and Cowork can now select how much thinking effort Claude applies to each task. Low effort is faster with lower rate-limit usage. High is the default balance. Max applies deepest reasoning. This is a practical quality-of-life feature: you don't need Max effort for "summarize this email" but you do for "debug this authentication flow."

**Dynamic workflows in Claude Code:** A research preview feature that lets Claude Code tackle very large-scale problems by working independently for longer. This is the agentic coding direction Anthropic has been building toward, where Claude doesn't just answer questions but runs multi-step engineering workflows autonomously.

**Fast mode 3x cheaper:** Running Opus 4.8 at 2.5x speed now costs three times less than the equivalent fast mode on previous models. For high-volume tasks where speed matters more than maximum depth, this makes the per-task economics significantly better.

## Pricing unchanged

Opus 4.8 API pricing stays at $5 per million input tokens (≈₹465) and $25 per million output tokens (≈₹2,325), with up to 90% savings through prompt caching and 50% through batch processing. [Claude Pro](/review/claude) remains $20/mo (≈₹1,860/mo) for consumer users. [Claude Max](/review/claude) stays at $100/mo (≈₹9,300/mo).

No price increase on a model upgrade is increasingly rare. OpenAI raised GPT-5 pricing above GPT-4. Google restructured its entire tier system at I/O. Anthropic holding pricing across three Opus versions (4.6, 4.7, 4.8) sends a strong signal about their confidence in the enterprise revenue base supporting consumer pricing.

## Mythos 1: the October tease

Anthropic teased Claude Mythos 1 alongside the Opus 4.8 launch. Inc. Magazine reports it as "an even larger and more powerful version of Claude" targeting October 2026. Geeky Gadgets reported that leaked details suggest "significant advancements in visual understanding, coding and reasoning" but noted a potential 30% increase in token consumption.

October 2026 is also when Anthropic plans its IPO at $900B+. Launching a frontier model right before going public is the same playbook OpenAI ran with GPT-4 before their valuation discussions. The model becomes the IPO narrative.

## What this means for your workflow

For [Claude](/review/claude) users on Pro or Max: you're automatically on Opus 4.8. Test the effort control feature immediately. It'll save you rate limits on simple tasks and give you better results on complex ones.

For [Cursor](/review/cursor) users: Opus 4.8 is available as a backend model. The agentic coding improvement from 64.3% to 69.2% narrows the gap with [Composer 2.5](/blog/composer-2-5-review)'s in-house model even further. Test both on your specific tasks.

For [Claude Code](/review/claude-code) users: Dynamic workflows is the feature to watch. If it delivers on the "very large-scale problems" promise, it changes what you can delegate to Claude Code versus what requires manual work.

I'll be running the full benchmark comparison and updating our [Claude review](/review/claude) with Opus 4.8 scores this week. The [Composer 2 vs Claude Sonnet comparison](/blog/composer-2-vs-claude-sonnet) also needs updating since 4.8's agentic coding gains affect the "when to switch to Claude" recommendation.

## My take

![My Take](/images/news/news-may-28b-2026-take.svg)

Opus 4.8 is the "reliability update" that working developers needed. The benchmark jumps are modest in isolation, but "4x fewer missed code flaws" and effort control address the actual daily frustrations with 4.7 that benchmark numbers don't capture. This is Anthropic listening to users rather than chasing leaderboard positions.

The Mythos 1 tease for October is the bigger signal. Anthropic now has a clear roadmap: incremental Opus updates every 6-8 weeks for reliability, plus a frontier Mythos model to anchor the IPO narrative. If Mythos delivers the "significant advancements" the leaks suggest, the gap between Anthropic and OpenAI on raw capability could flip entirely.

For users deciding today: if you're on [Claude Pro](/review/claude) at $20/mo (≈₹1,860/mo), you just got a free upgrade. Try effort control on Low for simple tasks and watch your rate limits last longer. If you're on [Cursor](/review/cursor), test Opus 4.8 against Composer 2.5 on your actual codebase. The benchmarks say Opus wins, but your workflow will tell you which one saves more time.

---

**Sources:** [Anthropic Blog](https://www.anthropic.com/news/claude-opus-4-8), [9to5Mac](https://9to5mac.com/2026/05/28/anthropic-upgrades-claude-with-new-opus-4-8-model-heres-whats-new/), [Inc. Magazine](https://www.inc.com/ben-sherry/anthropic-says-its-latest-claude-model-is-the-most-honest-yet/91351657), [BeInCrypto](https://beincrypto.com/claude-opus-4-8-anthropic/), [AWS](https://aws.amazon.com/about-aws/whats-new/2026/05/claude-opus-4.8-aws/), [GitHub Changelog](https://github.blog/changelog/2026-05-28-claude-opus-4-8-is-generally-available-for-github-copilot/)

**Related:** [Claude Review](/review/claude) · [Claude Code Review](/review/claude-code) · [Composer 2.5 Review](/blog/composer-2-5-review) · [Composer 2 vs Claude Sonnet](/blog/composer-2-vs-claude-sonnet) · [Cursor Review](/review/cursor) · [Transparency Index](/tools/transparency-index) · [KPMG + DeployCo News](/news/kpmg-claude-276k-openai-deployco-4b-may-28-2026) · [Anthropic $30B Round](/news/anthropic-30b-round-closes-spacex-ipo-june-creativity-study-may-27-2026)
