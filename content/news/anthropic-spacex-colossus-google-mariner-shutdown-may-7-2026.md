---
title: "Anthropic Partners with SpaceX for 220K GPUs, Google Kills Project Mariner"
description: "Anthropic signs deal for SpaceX Colossus One data center, doubles Claude Code limits. Google quietly shuts down Project Mariner browser agent."
slug: "/news/anthropic-spacex-colossus-google-mariner-shutdown-may-7-2026"
lastUpdated: "2026-05-07"
author: "Ash"
category: "AI Industry"
---

# Anthropic Partners with SpaceX for 220K GPUs, Google Kills Project Mariner

Two headline stories today that signal where compute power and AI agents are heading in opposite directions. Anthropic is scaling up infrastructure through an unlikely alliance, while Google is consolidating away from standalone browser agents.

![AI News May 7, 2026](/images/news/news-may-7-2026-hero.svg)

## Anthropic Gets Full Access to SpaceX's Colossus One

Anthropic announced a deal with SpaceX to use the entire compute capacity at SpaceX's Colossus 1 data center in Memphis, Tennessee. That translates to over 300 megawatts of new capacity  -  roughly 220,000 NVIDIA GPUs  -  coming online within a month.

The immediate impact for users: Claude Code five-hour rate limits are doubling for Pro, Max, Team, and Enterprise plans. Peak-hour restrictions for Pro and Max accounts are gone. Claude Opus API rate limits are going up significantly.

This is a surprising partnership. Elon Musk previously called Anthropic "misanthropic and evil" and has publicly feuded with CEO Dario Amodei. But after meetings with the Anthropic team last week, Musk posted that he was "impressed" and that nobody "set off my evil detector." SpaceX did add a clause reserving the right to reclaim compute resources if Claude "harms humanity."

The backdrop: Anthropic reported 80x year-over-year growth in revenue and usage in Q1 2026. That explosive growth was causing reliability problems for Claude Pro and Max users. The company was reportedly considering dropping [Claude Code](/review/claude) access from the $20/mo Pro plan entirely. This deal averts that.

**My take:** If you've been hitting Claude Code rate limits regularly, this is the most meaningful update in months. The doubling is immediate, not a future promise. For tool pricing watchers, Anthropic now has compute agreements totaling over 10 GW across SpaceX, Amazon (5 GW), Google/Broadcom (5 GW), Microsoft/NVIDIA ($30B Azure capacity), and Fluidstack ($50B). That's more committed infrastructure than any other AI lab. The pricing implications are clear: Anthropic has no excuse to raise consumer prices when they're locking in this much capacity. Current Claude Pro at $20/mo (≈₹1,860/mo) should remain stable. If you're comparing Claude against [ChatGPT](/review/chatgpt) or [Gemini](/review/gemini), this infrastructure advantage is worth factoring in.

## Google Kills Project Mariner After 17 Months

Google quietly shut down Project Mariner on May 4  -  their experimental AI browser agent that could navigate websites autonomously, fill forms, book travel, and handle up to 10 web tasks simultaneously. The landing page now reads: "It was shut down on May 4th, 2026 and its technology voyaged to other Google products."

Mariner worked by taking screenshots of Chrome windows, using visual recognition to identify buttons and links, then clicking and typing like a human user. The approach was technically impressive but computationally expensive and error-prone compared to API-based agent approaches.

The technology is being folded into Gemini Agent and Chrome's Auto Browse feature. Google had already been moving staff off the Mariner team since March, redirecting them toward building a competitor to tools like OpenClaw.

**My take:** This isn't a failure  -  it's a strategic consolidation. Browser agents that visually "read" webpages consume 45x more tokens than API-based agents, according to a Reflex benchmark. The industry is moving toward agents that work through structured interfaces, not screenshot-and-click. If you were using Mariner through the $250/mo Google AI Ultra subscription, Gemini Agent is your replacement. For everyone else evaluating [AI coding tools](/best-of/best-ai-code-assistants) and agents, the takeaway is clear: command-line and API-first agents like Claude Code are winning over browser-based ones.

## Quick Hits

**OpenAI voice models now translate 70 languages live.** Three new voice models dropped, and Zillow reported a 26-point jump in call success rates during testing. Real-time voice translation is becoming commodity infrastructure.

**Vibe coding security crisis deepens.** Israeli cybersecurity firm RedAccess found 380,000 publicly accessible apps built with Lovable, Replit, Base44, and Netlify. About 5,000 contained sensitive corporate data including medical records, financial documents, and customer service conversations. Axios independently verified exposed apps from a shipping company, a UK health company, and a cabinet supplier. I've been tracking [vibe coding](/blog/what-is-vibe-coding) security closely  -  this is the story I've been warning about.

**Bain study:** AI-generated "digital twin" shoppers matched 90% of real customer research findings. The gap between AI-simulated and real consumer behavior is narrowing faster than most marketers expected.

*Published May 7, 2026. Prices at ≈₹93/USD.*
