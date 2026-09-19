---
title: "Enterprise AI Cost Crisis: Microsoft Drops Claude Code, Uber Burned $3.4B"
description: "Microsoft cancels Claude Code licenses by June 30. Uber exhausted $3.4B AI budget in 4 months. One company spent $500M on Claude in a single month."
slug: "/news/enterprise-ai-cost-crisis-microsoft-claude-code-uber-may-30-2026"
lastUpdated: "2026-05-30"
author: "Ash"
category: "AI Industry"
---

# Enterprise AI Cost Crisis: Microsoft Drops Claude Code, Uber Burned $3.4B

![Enterprise AI Cost Crisis](/images/news/news-may-30-2026-hero.svg)

The first wave of enterprise AI adoption was driven by enthusiasm. The second wave, now underway in May 2026, is being shaped by what it costs. Three stories landed this week that, taken together, signal a fundamental reckoning in how companies pay for AI tools.

## Microsoft Cancels Claude Code Licenses

Microsoft started revoking internal [Claude Code](/review/claude-code) licenses for most employees in its Experiences and Devices division on May 14. The deadline for full transition is June 30, the end of Microsoft's fiscal year.

The division covers Windows, Microsoft 365, Outlook, Teams, and Surface engineers. These are among Microsoft's highest-output engineering teams. They adopted Claude Code heavily after the tool launched internally in December 2025.

The problem was per-engineer cost. Individual engineers were spending between $500 and $2,000 per month on tokens. At those rates, a 1,000-engineer division costs $500M to $2B per year at peak usage, versus $150-200 per engineer per year on a traditional seat license.

Microsoft is steering affected engineers to GitHub Copilot CLI as the internal replacement. GitHub is simultaneously moving all Copilot plans to usage-based billing via GitHub AI Credits starting June 1, which suggests Microsoft is standardizing on a consumption model it can forecast and cap rather than open-ended API token access.

The irony: Microsoft's CEO Satya Nadella has publicly claimed the company generates up to 30% of its code using AI. That claim and this cancellation can both be true. The tool worked. The billing model did not.

## The Numbers Behind the Crisis

![Enterprise AI Cost Numbers](/images/news/news-may-30-2026-cost-crisis.svg)

Uber told The Information in April that the company burned through its entire $3.4 billion 2026 AI budget within four months. Uber's CTO confirmed Claude Code adoption climbed from 32% to 84-95% of the company's roughly 5,000 engineers by April. Per-engineer costs reached $500 to $2,000 per month.

The most striking data point: an unnamed company accidentally spent $500 million on [Claude](/review/claude) in a single month after failing to set any employee usage limits. The figure surfaced on Polymarket and was reported by multiple outlets. It illustrates the structural problem with token-based pricing at enterprise scale.

FinOps teams managing AI spend doubled from 31% to 63% of companies within a year, according to industry data. That doubling happened because finance departments were not equipped to forecast token consumption when they approved AI rollouts in late 2025.

## What This Means for Anthropic

Anthropic is simultaneously closing a $900B+ valuation round and losing one of its most prominent enterprise customers.

The tension is real but the narrative overstates the problem. Microsoft's KPMG deal (276,000 employees deployed on Claude this week) is far larger than the Claude Code cancellation. The Experiences and Devices division cancellation covers a specific product at a specific price point, not all of Microsoft's Claude usage.

What the episode clarifies: enterprise AI deployment without governance infrastructure creates liabilities. The companies now surviving the cost reckoning are those that built controls early. The companies in trouble are those that let adoption outrun their financial management systems.

Anthropic's $10.9 billion Q2 revenue forecast would still deliver its first profitable quarter. The spend story cuts both ways: companies are cutting ungoverned usage while simultaneously building structured, governed deployments at higher total volume.

## Microsoft Build 2026: What Starts Tuesday

![Microsoft Build 2026 Preview](/images/news/news-may-30-2026-build.svg)

Microsoft Build 2026 runs June 2-3 in San Francisco. Free to stream at build.microsoft.com starting 9:30am PT Tuesday.

The context of the Claude Code cancellation makes Build's agenda more interesting. Microsoft is presenting its AI strategy to developers immediately after pulling a major AI coding tool. The keynote will focus on agentic AI, Azure AI Foundry, and GitHub Copilot - all Microsoft-controlled products rather than third-party tools.

Azure AI Foundry, expected to go generally available at Build, is Microsoft's answer to the fragmented AI toolchain. A single portal for building, training, and deploying models. If it delivers on that promise, Microsoft's incentive to rely on Anthropic's tools decreases.

Windows 12 is confirmed not appearing at Build. Microsoft is instead focusing on Windows 11 AI features and AI-capable silicon from Qualcomm, Intel, and AMD. A separate hardware event is teased for Computex in Taipei.

For Claude, Cursor, and [Claude Code](/review/claude-code) users: watch the GitHub Copilot announcements specifically. If Microsoft announces meaningful capability improvements to Copilot CLI, it directly affects the competitive case for Anthropic's products in the enterprise coding market.

## Micron Hits $1 Trillion on AI Chip Demand

One company having a very good week: Micron Technology. Its stock rose 88% over the past month, briefly crossing a $1 trillion market cap. Record sales of $23.86 billion in the last quarter, nearly triple the previous year.

The driver: AI memory chips (HBM and DRAM) that NVIDIA needs to run its AI systems. Banks are raising price targets to $1,625-1,750 per share ahead of the June 24 earnings report.

The AI chip story is the structural story underneath everything else happening in May 2026. The enterprise cost crisis is about software pricing. The infrastructure layer underneath - chips, data centers, power - continues to grow regardless.

## My Take

![My Take](/images/news/news-may-30-2026-take.svg)

The Microsoft story is the most important AI signal of May 2026. Not because it shows [Claude Code](/review/claude-code) is bad (engineers used it constantly because it was that good) but because it proves enterprise AI pricing is broken.

Token-based billing creates unlimited liability. A seat license is predictable. A token license scales with usage, and when a tool is genuinely useful, usage scales to the limit of what the tool can do. That is not a flaw in the tool. It is a mismatch between the pricing model and how enterprises budget.

The companies that solve this first - either by building usage governance early or by offering predictable pricing - will win the enterprise AI market. Everyone else will hit the Microsoft wall eventually.

For individual users on [Claude Pro](/review/claude) at $20/mo (≈₹1,860/mo): none of this affects you. The seat-based subscription model is exactly what enterprise IT teams now wish they had.

---

**Sources:** The Verge, Fortune, Storyboard18, The Next Web, Windows Central, FX Leaders, Tom's Guide, Windows News AI

**Related:** [Claude Code Review](/review/claude-code) | [Claude Review](/review/claude) | [KPMG + DeployCo News](/news/kpmg-claude-276k-openai-deployco-4b-may-28-2026) | [Opus 4.8 Released](/news/claude-opus-4-8-released-effort-control-mythos-teased-may-28-2026) | [Anthropic $30B Round](/news/anthropic-30b-round-closes-spacex-ipo-june-creativity-study-may-27-2026) | [Transparency Index](/tools/transparency-index)
