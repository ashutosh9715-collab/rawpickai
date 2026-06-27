---
title: "Karpathy Joins Anthropic's Pre-Training Team, Gemini 3.5 Flash API Goes GA"
description: "OpenAI co-founder Andrej Karpathy joins Anthropic to use Claude to build Claude. Gemini 3.5 Flash hits GA at $1.50/M input tokens with 1M context."
slug: "/news/karpathy-joins-anthropic-gemini-flash-ga-may-23-2026"
lastUpdated: "2026-05-23"
author: "Ash"
category: "AI Industry"
---

# Karpathy Joins Anthropic's Pre-Training Team, Gemini 3.5 Flash API Goes GA

![Karpathy Joins Anthropic](/images/news/news-may-23-2026-hero.svg)

The biggest talent move of 2026 happened on Monday and it's still reverberating through the industry. Andrej Karpathy, one of the original 11 co-founders of OpenAI and former director of AI at Tesla, announced he's joining Anthropic. Separately, Google's Gemini 3.5 Flash API is now generally available with pricing that undercuts most of the competition.

## Karpathy to Anthropic: the full picture

![Karpathy's Journey](/images/news/news-may-23-2026-karpathy.svg)

Karpathy posted the announcement on X on May 19: "I've joined Anthropic. I think the next few years at the frontier of LLMs will be especially formative. I am very excited to join the team here and get back to R&D."

He's joining the pre-training team under Nick Joseph. His specific role: building a new team focused on using [Claude](/review/claude) to accelerate pre-training research. That's Claude helping train the next version of Claude. It's recursive, it's ambitious, and it signals that Anthropic believes AI-assisted research, not just raw compute, is how you stay competitive.

Karpathy's background makes this hire uniquely significant. He co-founded OpenAI in 2015, left in 2017 to lead Tesla's FSD and Autopilot programs for five years, briefly returned to OpenAI in 2023, then left again in 2024 to start Eureka Labs (an AI education startup). He also created the popular "Neural Networks: Zero to Hero" course that's trained thousands of developers.

His name came up repeatedly during the Musk v. OpenAI trial that ended the same week. The timing of his move feels deliberate: joining Anthropic on the same day a jury unanimously rejected Musk's lawsuit against his former company.

## The talent war is real

![OpenAI to Anthropic Pipeline](/images/news/news-may-23-2026-talent.svg)

Karpathy is the latest in a pattern. Anthropic was founded in 2021 by Dario and Daniela Amodei, both former OpenAI executives. John Schulman, another OpenAI co-founder, joined Anthropic in 2024. Ross Nordeen, a founding member of xAI and ex-Tesla, joined Anthropic earlier in May 2026.

Other major OpenAI departures include former chief scientist Ilya Sutskever (who co-founded Safe Superintelligence) and former CTO Mira Murati (who founded Thinking Machines). The brain drain from OpenAI is now a documented pattern, and Anthropic is the primary destination.

For [Claude](/review/claude) users, this is unambiguously good news. Karpathy is one of the few researchers who can bridge LLM theory with large-scale training practice. His work on the pre-training team directly affects the quality of the next Claude model.

## Gemini 3.5 Flash: GA pricing revealed

![Flash API Pricing](/images/news/news-may-23-2026-flash-pricing.svg)

Google's Gemini 3.5 Flash API is now generally available. The pricing: $1.50 per million input tokens (≈₹140) and $9.00 per million output tokens (≈₹837), with a 1 million token context window.

For context: [Claude](/review/claude) Sonnet 4.6 costs $3.00/$15.00 per million tokens with 200K context. GPT-5.5 Mini is $1.50/$6.00 with 128K context. Gemini 3.5 Flash matches or beats both on price while offering 5x to 8x the context window.

The performance claim from I/O holds up: 76.2% on Terminal-Bench 2.1, beating Gemini 3.1 Pro on coding and agentic tasks. That means Flash-tier pricing with Pro-tier (or better) performance, plus the largest context window in the market.

For developers choosing a backend model for [Cursor](/review/cursor) or similar tools, this is worth testing. The 1M context window alone makes it viable for tasks that previously required expensive long-context models.

The pricing war is getting more aggressive every week. When we published the [2026 AI Tools Reality Check](/studies/2026-ai-tools-reality-check) in April, the $16-30/mo (≈₹1,488-2,790/mo) sweet spot was already clear. API pricing drops like this are what make that consumer-level sweet spot sustainable.

## What's happening in the wider market

A few other developments worth tracking this week:

Adobe, Canva, and CapCut all announced [Gemini](/review/google-gemini) integrations that let users access their image and video editing tools directly within the Gemini app. This is Google's play to make Gemini the hub for creative work, not just chat.

GitHub disclosed that attackers compromised an employee device through a malicious VS Code extension, gaining access to internal repositories. For developers relying on [coding AI tools](/blog/best-ai-coding-tools-2026), this is a reminder that the development toolchain itself is an attack surface.

The Google May 2026 core update continues rolling out. Ranking volatility is expected through June 4.

## My take

![My Take](/images/news/news-may-23-2026-take.svg)

Karpathy joining Anthropic to build a team that uses Claude to make Claude better is the most interesting hire in AI this year. It's not just about adding a famous researcher. It's about a specific thesis: that AI-assisted research, not brute-force compute, is the faster path to better models. If that thesis is correct, Anthropic's $1.25B/mo compute bill to SpaceX becomes an investment in bootstrapping, not just a cost of doing business.

For developers, the Gemini 3.5 Flash pricing at $1.50/M input with 1M context is the best price-to-performance ratio in the API market right now. The practical question isn't whether Flash is good enough (it is, for most tasks), but whether Google's API reliability and developer experience match the pricing. That's what I'll be testing in the [Gemini review](/review/google-gemini) update.

The pattern from the past week is consistent: the cost of intelligence keeps falling while the quality floor keeps rising. Every week, the "good enough" model gets cheaper. That's exactly what the $16-30/mo sweet spot in our [study](/studies/2026-ai-tools-reality-check) predicted.

---

**Sources:** [VentureBeat](https://venturebeat.com/technology/andrej-karpathy-announces-hes-joining-anthropic), [TechCrunch](https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/), [CNBC](https://www.cnbc.com/2026/05/19/anthropic-hires-openai-cofounder-andrej-karpathy-former-tesla-ai-lead.html), [Axios](https://www.axios.com/2026/05/19/anthropic-openai-karpathy-andrej-claude), [LLM Stats](https://llm-stats.com/ai-news)

**Related:** [Claude Review](/review/claude) · [Google Gemini Review](/review/google-gemini) · [Cursor Review](/review/cursor) · [Claude Code Review](/review/claude-code) · [2026 AI Tools Reality Check](/studies/2026-ai-tools-reality-check) · [Transparency Index](/tools/transparency-index) · [Anthropic $10.9B Revenue](/news/anthropic-10-9b-revenue-first-profit-openai-ipo-may-22-2026) · [Composer 2.5 News](/news/cursor-composer-2-5-matches-opus-at-tenth-cost-may-18-2026)
