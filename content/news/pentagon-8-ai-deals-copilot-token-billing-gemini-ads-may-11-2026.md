---
title: "Pentagon Signs 8 AI Deals Without Anthropic, Copilot Moves to Token Billing, Gemini Eyes Ads"
description: "Pentagon partners with OpenAI, Google, SpaceX and 5 others for classified AI. GitHub Copilot switches to token billing June 1. Google eyes ads in Gemini."
slug: "/news/pentagon-8-ai-deals-copilot-token-billing-gemini-ads-may-11-2026"
lastUpdated: "2026-05-11"
author: "Ash"
category: "AI Industry"
---

# Pentagon Signs 8 AI Deals Without Anthropic, Copilot Moves to Token Billing, Gemini Eyes Ads

Three stories this week that directly affect what you pay for AI tools and who controls them. The US military just locked in eight AI providers while freezing out the company that refused to build autonomous weapons. GitHub is overhauling how Copilot charges you. And Google is openly discussing putting ads inside Gemini. Each story has real pricing and product implications.

![AI News May 11, 2026](/images/news/news-may-11-2026-hero.svg)

## Pentagon Signs AI Deals With 8 Companies, Cuts Out Anthropic

The Department of Defense announced agreements with eight tech companies to deploy AI across its classified networks: SpaceX, OpenAI, Google, Microsoft, Nvidia, Amazon Web Services, Oracle, and Reflection AI. Notably absent: Anthropic.

The backstory is significant. Anthropic refused to let the Pentagon use Claude for autonomous weapons or mass domestic surveillance. The Pentagon responded by designating Anthropic a "supply chain risk"  -  a label previously reserved for companies tied to foreign adversaries. Defense Secretary Pete Hegseth called Anthropic CEO Dario Amodei an "ideological lunatic" during congressional testimony. Anthropic sued, and a federal judge in California blocked the blacklisting in March. But the Pentagon moved ahead with competitors anyway.

The eight companies agreed that their AI tools can be used for any purpose the military deems lawful. That's exactly the clause Anthropic rejected. The Pentagon's GenAI.mil platform has already been used by 1.3 million DoD personnel in just five months.

Meanwhile, signs of reconciliation appeared. Dario Amodei visited the White House in April for a meeting with Chief of Staff Susie Wiles. Trump told CNBC a deal was "possible," adding that Anthropic has "high IQs." The Pentagon's CTO called Anthropic's Mythos model a "separate national security moment"  -  acknowledging its value even while maintaining the blacklist.

**My take:** This story matters for tool selection beyond the military context. Anthropic took a principled stand on autonomous weapons and is paying for it financially  -  their CFO warned the blacklisting could cost "multiple billions" in 2026 revenue. But the [SpaceX compute deal](/news/anthropic-spacex-colossus-google-mariner-shutdown-may-7-2026) and the potential [$900B valuation round](/news/anthropic-900b-valuation-apple-siri-settlement-five-eyes-agentic-ai-may-9-2026) show Anthropic doesn't need Pentagon money to survive. For anyone choosing between [Claude](/review/claude), [ChatGPT](/review/chatgpt), or [Gemini](/review/gemini), the question becomes: does an AI company's stance on military use affect your tool choice? For enterprise buyers with government clients, it might. For individual developers, the product quality comparison matters more.

## GitHub Copilot Switches to Token-Based Billing June 1

Starting June 1, GitHub Copilot is replacing its premium request system with token-based billing. Instead of counting each interaction as one request regardless of complexity, you'll pay based on actual token consumption  -  input, output, and cached tokens priced at each model's API rates.

The base subscription prices stay the same: [Copilot](/review/github-copilot) Pro at $10/mo (≈₹930/mo), Pro+ at $39/mo (≈₹3,627/mo), Business at $19/user/mo, Enterprise at $39/user/mo. Each plan includes "GitHub AI Credits" matching the subscription price  -  so Pro gets $10 worth of credits (1,000 AI Credits at $0.01 each). Code completions and Next Edit Suggestions remain unlimited and free.

The reason is simple math. GitHub CPO Mario Rodriguez explained that under the old system, a quick chat question cost the same as an autonomous coding session running for hours. The weekly cost of running Copilot has doubled since January. GitHub was subsidizing heavy users at 3-8x the token value of their subscription. That subsidy ends June 1.

Business and Enterprise customers get a promotional buffer: June through August, Business users get $30 in credits for their $19 subscription, and Enterprise gets $70 for $39. After August, credits match the subscription price exactly.

**My take:** This is the most significant pricing change in [AI coding tools](/best-of/best-ai-code-assistants) this year. If you mainly use Copilot for code completions and light chat, nothing changes  -  you might even save money. But if you run heavy agentic workflows, use frontier models like Claude Opus 4.7 ($5/$25 per million tokens) through Copilot, or do a lot of code reviews (which now consume both AI Credits and GitHub Actions minutes), your bill could spike. The practical advice: log into GitHub now, check the preview bill feature they launched in early May, and see what your April usage would have cost under the new model. If it's significantly more than your subscription, consider whether [Claude Code](/review/claude) or [Cursor](/review/cursor) at $20/mo flat gives you more predictable costs. The shift from flat-rate to usage-based pricing across AI tools  -  Anthropic did this for enterprise, now GitHub  -  tells you the "unlimited AI for $10" era is ending.

## Google Considering Ads in Gemini App

Google's chief business officer Philipp Schindler confirmed during Alphabet's Q1 2026 earnings call that ads could come to the [Gemini](/review/gemini) app. He said Google is testing an ad format in AI Mode first  -  sponsored results appearing at the bottom of AI-generated answers when you search for products. If that format works well, it would transfer to the standalone Gemini app.

Currently, the Gemini app is completely ad-free. Google offers a $20/mo AI Pro subscription (≈₹1,860/mo) for enhanced features. The free tier has remained clean since launch. Google hasn't shared what ads inside Gemini would look like, how they'd be labeled, or when they'd roll out.

Google isn't alone. [OpenAI launched ChatGPT self-serve ads](/news/white-house-ai-vetting-order-pennsylvania-character-ai-lawsuit-may-8-2026) for US small businesses this month. OpenAI's CFO Sarah Friar said ads wouldn't alter search results and that conversation data wouldn't be shared with advertisers. The race to monetize free chatbot tiers through advertising is officially underway.

**My take:** This is worth watching closely because it could reshape how AI tools recommend products  -  including the tools I review on this site. When I [compare AI tools](/comparisons), I test what they actually do, not what a sponsor pays to promote. If Gemini starts showing sponsored tool recommendations inside conversations, users will need to distinguish between what Gemini actually recommends and what someone paid to place there. The same concern applies to ChatGPT's new ads. For now, [Claude](/review/claude) remains the only major chatbot without an advertising product or plans for one. Whether that lasts depends on whether Anthropic's subscription and API revenue can sustain the business without ads. Based on their $30B+ ARR, it can  -  for now.

## Quick Hits

**Reflection AI is the wildcard in the Pentagon deal.** The two-year-old startup hasn't released a public model yet, raised $2B in October, and is backed by 1789 Capital (where Donald Trump Jr. is a partner). They're seeking a $25B valuation. Getting classified Pentagon access before shipping a product is unusual  -  political connections appear to matter as much as technical capability in government AI procurement.

**Apple stopped Vision Pro development.** After weak sales and high return rates, Apple has ended development of its $3,499 mixed reality headset. The device launched in February 2024 with significant developer interest but failed to find a mainstream audience. The spatial computing market remains niche.

**State AI regulation accelerating.** Colorado is about to pass a bill replacing the Colorado AI Act. Iowa signed a chatbot regulation law. New York's Assembly passed the AI Training Data Transparency Act. Hawaii passed an AI bill before closing its session. Expect 15+ states to have AI-specific laws by end of 2026.

*Published May 11, 2026. Prices at ≈₹93/USD.*
