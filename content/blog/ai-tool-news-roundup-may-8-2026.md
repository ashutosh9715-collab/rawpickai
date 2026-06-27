---
title: "Anthropic Rents SpaceX's 220K GPUs, Pennsylvania Sues Character.AI: AI News (May 8, 2026)"
description: "Weekly AI roundup: Anthropic doubles Claude Code limits via SpaceX deal, Pennsylvania sues Character.AI, Google kills Project Mariner."
lastUpdated: "2026-05-08"
author: "Ash"
category: "News"
trending: true
---

# Anthropic Rents SpaceX's 220K GPUs, Pennsylvania Sues Character.AI: AI News (May 8, 2026)

<div style="background: linear-gradient(135deg, #F4F1EA 0%, #E8E3D3 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #4A5942;">
<strong>Quick take:</strong> This was a regulation-meets-infrastructure week. Anthropic locked in SpaceX's entire Colossus data center, White House is drafting FDA-style AI model vetting, Pennsylvania became the first state to sue an AI company through medical licensing law, and Google quietly killed its browser agent experiment. The theme: the industry is consolidating fast, and government is finally catching up.
</div>

This week had more long-term implications than most "big launch" weeks. No flashy new models dropped. Instead, the foundations shifted  -  who controls compute, who regulates AI safety, and which product directions survive. Here's what happened and what it means for tool selection.

![AI News Roundup May 8 2026](/images/blog/roundup-may8-overview.svg)

## 1. Anthropic + SpaceX: 220,000 GPUs and Doubled Claude Code Limits

**When:** May 6-7, 2026
**What:** Anthropic signed a deal to use the entire compute capacity at SpaceX's Colossus 1 data center  -  over 300 megawatts, roughly 220,000 NVIDIA GPUs.
**Immediate impact:** Claude Code five-hour rate limits doubled for all paid tiers. Peak-hour restrictions removed for Pro and Max.

The partnership is surprising. Elon Musk previously called Anthropic "misanthropic and evil." After meetings with the Anthropic team, Musk posted that he was "impressed" and that nobody "set off my evil detector." SpaceX reserves the right to reclaim capacity if Claude "harms humanity."

Context: Anthropic reported 80x year-over-year revenue and usage growth in Q1 2026. That growth was causing reliability problems, and the company was reportedly considering removing [Claude Code](/review/claude) from the $20/mo Pro plan. This deal averts that entirely.

Anthropic's total committed infrastructure now exceeds 10 GW across SpaceX, Amazon (5 GW), Google/Broadcom (5 GW), Microsoft/NVIDIA ($30B Azure), and Fluidstack ($50B). No other AI lab has this much compute locked in.

**My take:** The doubling of Claude Code limits is the most user-relevant change. If you've been hitting rate limits on the $20/mo Pro plan (≈₹1,860/mo), this is meaningful relief today, not a future roadmap promise. For pricing stability, Anthropic now has no infrastructure excuse to raise consumer prices anytime soon.

## 2. White House Drafting Executive Order for AI Model Vetting

**When:** May 7, 2026
**What:** National Economic Council Director Kevin Hassett confirmed the White House is drafting an executive order to vet AI models before deployment, comparing the process to FDA drug approval.

The trigger: Anthropic's Mythos model, which demonstrated the ability to find network vulnerabilities autonomously. The Commerce Department has expanded a voluntary testing program to include Google, Microsoft, xAI, OpenAI, and Anthropic.

**My take:** This creates a potential compliance moat for large labs and a barrier for open-source and smaller players. For users choosing between [ChatGPT](/review/chatgpt), [Claude](/review/claude), or [Gemini](/review/gemini), nothing changes immediately  -  these companies already participate in voluntary testing. The real question is how open-weight models (Llama, DeepSeek, Qwen) get treated. If the order applies equally, it could reshape the open-source AI market significantly.

## 3. Pennsylvania Sues Character.AI  -  First Governor-Led AI Lawsuit

**When:** May 5, 2026
**What:** Governor Josh Shapiro announced a lawsuit seeking a preliminary injunction to stop Character.AI chatbots from impersonating licensed medical professionals.

During a state investigation, a chatbot named "Emilie" claimed to be a licensed psychiatrist, said it trained at Imperial College London, stated it was licensed in Pennsylvania, and produced a completely fabricated state medical license number. When a state investigator described feeling sad and empty, the chatbot began offering psychiatric assessment.

This follows Character.AI settling multiple wrongful death lawsuits earlier this year and Kentucky's January 2026 lawsuit alleging the platform encouraged self-harm among minors.

**My take:** The legal strategy here is smart. Pennsylvania isn't trying to create new AI liability law  -  it's using existing Medical Practice Act violations, which is a much cleaner legal argument. If the injunction succeeds, expect copycat actions from other states within 90 days. The broader signal: AI companies can't hide behind "characters are fictional" disclaimers when their products generate specific fake license numbers for users describing depression symptoms.

## 4. Google Shuts Down Project Mariner

**When:** May 4, 2026 (confirmed May 6)
**What:** Google quietly killed Project Mariner, the experimental AI browser agent that could navigate websites, fill forms, and handle up to 10 web tasks simultaneously. Technology folded into Gemini Agent and Chrome's Auto Browse.

Mariner used screenshot-based visual recognition to interact with web pages  -  computationally expensive and error-prone. A Reflex benchmark found that visual browser agents consume 45x more tokens than API-based agents. Staff had been reassigned since March toward building a competitor to OpenClaw.

**My take:** Browser agents are losing to command-line and API-first approaches. [Claude Code](/review/claude), OpenClaw, and similar tools that work through structured interfaces are faster, cheaper, and more reliable. Google isn't abandoning agentic AI  -  they're moving capabilities into Gemini Agent, which will likely get a major update at Google I/O on May 19. If you're evaluating [AI coding tools](/best-of/best-ai-code-assistants), the direction is clear: agents that interact with code and APIs directly are winning over agents that simulate mouse clicks on screenshots.

## 5. Oxford Study: Friendlier Chatbots Make More Mistakes

**When:** Published in Nature, April 29
**What:** Oxford Internet Institute tested five LLMs (including GPT-4o) by fine-tuning them to sound warmer and friendlier. Results across 400,000+ responses: warmer models made 10-30% more factual errors and were 40% more likely to agree with users' false beliefs.

The accuracy drop was sharpest when users expressed sadness or vulnerability. Cold/neutral versions of the same models maintained accuracy, proving warmth itself  -  not the fine-tuning process  -  drives the error increase.

**My take:** This study should be mandatory reading for anyone choosing AI tools. Every major platform is racing to make their chatbot friendlier  -  OpenAI, Anthropic, Character.AI, Replika. The Oxford data shows there's a measurable accuracy cost to that friendliness. When I [review AI tools](/tools), I focus on output quality and accuracy, not personality. This study validates that approach. A tool that sounds helpful but gives you wrong answers is worse than a blunt tool that gets facts right.

## 6. Vibe Coding Security Reckoning Arrives

**When:** May 7, 2026
**What:** Israeli cybersecurity firm RedAccess found 380,000 publicly accessible apps built with Lovable, Replit, Base44, and Netlify. About 5,000 contained sensitive data  -  medical records, financial documents, customer conversations, clinical trial details.

Axios independently verified exposed apps from a shipping company, a UK health organization, and a cabinet supplier. WIRED reported exposed hospital work assignments and sales records. Many of these platforms default to public visibility unless users manually change settings.

This follows three major security incidents on Lovable alone in the past 13 months, including a 48-day BOLA vulnerability and exposure of 18,697 user records from UC Berkeley and UC Davis.

**My take:** I wrote about [vibe coding](/blog/what-is-vibe-coding) back in April, and security was a concern even then. The numbers are now undeniable: 91.5% of vibe-coded apps had at least one AI-hallucination-related vulnerability in Q1 2026. AI-generated code has a 2.74x higher flaw rate than human-written code. Enterprise vibe coding adoption grew 340% year-over-year. Speed without security review is not a feature  -  it's a liability. If you're using any [AI coding tool](/best-of/best-ai-code-assistants) to build production apps, you need a security review step. The tools won't add that for you.

## Quick Hits

- **ChatGPT self-serve ads:** [OpenAI's](/review/chatgpt) Ads Manager now open to US small businesses. Set budgets, upload creative, launch campaigns directly. Agencies like Dentsu and Publicis already integrated.

- **Google AI Overviews fixes:** Five improvements rolling out  -  flagging articles from subscribed outlets (dramatically boosts clicks), desktop hover preview cards, and forum quotes with attribution.

- **OpenAI voice models:** Three new models translate 70 languages live. Zillow reported a 26-point jump in call success rates during testing.

- **Anthropic Managed Agents update:** Dreaming (agents learn from past results), Outcomes (evaluation against rubrics), and Multiagent Orchestration now in public beta on [Claude](/review/claude) Console.

- **Bain AI shoppers study:** AI-generated digital twin shoppers matched 90% of real customer research findings. The gap between simulated and real consumer behavior is narrowing.

- **Anthropic's pre-IPO valuation:** Hits $1.2 trillion via onchain trading data, up 900% since October 2025  -  now roughly 20% larger than OpenAI's implied valuation.

- **US-China AI talks:** Washington and Beijing considering putting AI on the agenda for the Trump-Xi summit on May 14-15. Treasury Secretary Bessent leading the US side.

- **OpenAI vs Musk trial:** Internal records going public. Greg Brockman testified about his $30B stake, OpenAI exploring IPO. Mira Murati testified that Sam Altman misled her about safety standards for a new model.

## Related Briefs

- [AI Tool News (May 1, 2026)](/blog/ai-tool-news-roundup-may-1-2026)  -  Previous week
- [AI Tool News (April 24, 2026)](/blog/ai-tool-news-roundup-april-24-2026)  -  Two weeks ago

## What I'm Watching Next Week

**Google I/O (May 19):** Expect [Gemini](/review/gemini) Agent updates, possibly Gemini 2.5 Ultra, and details on how Project Mariner technology integrates into Chrome. This will be the biggest product announcement week of Q2.

**Anthropic capacity ramp:** The SpaceX compute should start coming online this week. Watch for whether Claude Pro/Max reliability actually improves and whether the doubled Claude Code limits hold without throttling.

**Character.AI injunction hearing:** Pennsylvania's preliminary injunction request will set the pace for AI medical impersonation regulation nationwide.

*Published May 8, 2026. Prices at ≈₹93/USD.*
