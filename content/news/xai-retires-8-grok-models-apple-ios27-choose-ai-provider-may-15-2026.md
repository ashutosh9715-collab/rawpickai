---
title: "xAI Retires 8 Grok Models Today, Apple iOS 27 Will Let You Pick Claude Over ChatGPT"
description: "xAI kills 8 Grok API models, redirects to Grok 4.3 at higher prices. Apple iOS 27 Extensions let users choose Claude, Gemini, or Grok as default AI."
slug: "/news/xai-retires-8-grok-models-apple-ios27-choose-ai-provider-may-15-2026"
lastUpdated: "2026-05-15"
author: "Ash"
category: "AI Industry"
---

# xAI Retires 8 Grok Models Today, Apple iOS 27 Will Let You Pick Claude Over ChatGPT

Two stories today about choice and control. xAI is narrowing choice by killing off 8 models and funneling everyone to Grok 4.3 at higher prices. Apple is expanding choice by letting iPhone users swap out ChatGPT for Claude, Gemini, or Grok across the entire operating system. One company is consolidating. The other is opening up. Both moves reshape who controls the AI you use every day.

![AI News May 15, 2026](/images/news/news-may-15-2026-hero.svg)

## xAI Retires 8 Grok Models at Noon Today

Effective 12:00 PM PT today, xAI is retiring 8 models from the Grok API: grok-4-1-fast-reasoning, grok-4-1-fast-non-reasoning, grok-4-fast-reasoning, grok-4-fast-non-reasoning, grok-4-0709, grok-code-fast-1, grok-3, and grok-imagine-image-pro. All text model requests will automatically redirect to Grok 4.3.

The pricing impact is real. Grok 4.3 is priced at $1.25 per million input tokens and $2.50 per million output tokens. Developers who were using cheaper legacy models will see their API bills increase — in some cases significantly. The redirect means your code won't break, but your costs will change without you changing a line of code.

xAI's stated reason: they want to "focus fully on the newest generation." Grok 4.3 includes a 1 million token context window, three reasoning effort levels (low, medium, high), and what xAI calls the "fastest, most intelligent model we've ever built." It tops leaderboards in agentic tool calling and instruction following.

The practical advice for developers: don't rely on the automatic redirect. Explicitly set your model to grok-4.3 and choose your reasoning effort level, otherwise you'll get low reasoning by default (for former reasoning models) or no reasoning (for former non-reasoning models), and you'll pay Grok 4.3 rates either way.

![xAI Model Retirement Details](/images/news/news-may-15-2026-grok-retirement.svg)

**My take:** Model lifecycle management is becoming a real operational burden. xAI, OpenAI, Google, and Anthropic are all deprecating models faster than most teams can test replacements. If you're building on any AI API, treat model names as temporary — your code should be ready to swap models with a config change, not a rewrite. For pricing comparison, Grok 4.3 at $1.25/$2.50 per million tokens is competitive with [Claude](/review/claude) Sonnet 4.6 ($3/$15) and significantly cheaper than Claude Opus ($15/$75). It's cheaper than [ChatGPT](/review/chatgpt) GPT-4o ($2.50/$10) on input but comparable on output. The real question is whether Grok 4.3's quality justifies switching from established tools.

## Apple iOS 27 Extensions: Choose Your AI Provider

Apple is preparing to let users choose their AI provider across iOS 27, iPadOS 27, and macOS 27. An "Extensions" menu in Settings will let you assign preferred models — [Claude](/review/claude), [Gemini](/review/gemini), Grok, or [ChatGPT](/review/chatgpt) — to handle specific Apple Intelligence tasks.

This is the most significant change to AI distribution since ChatGPT launched. Currently, ChatGPT has an exclusive position inside Siri and Apple Intelligence. Under the new system, you could set Claude as your default for writing help, Gemini for search queries, and Grok for coding advice. Each provider brings its own voice, personality, and capability profile.

The backstory: Elon Musk's xAI sued Apple and OpenAI in August 2025, alleging the ChatGPT-Siri exclusive deal was anticompetitive. Apple is reportedly building Extensions partly in response to that lawsuit and EU DMA requirements. Google's [Gemini](/review/gemini) already holds a privileged position through a multi-year, roughly $1 billion per year contract that powers the core Siri experience. The question is whether third-party Extensions will have enough API surface to be competitive with Gemini's native integration.

WWDC 2026 on June 8 will reveal the technical details. Developer sessions on June 9 will show whether Extensions are a real competitive framework or a minimal compliance gesture.

**My take:** For the 2+ billion iPhone users worldwide, this changes everything about how AI tools compete. Right now, if you want [Claude](/review/claude) on your iPhone, you download a separate app. Under iOS 27, Claude could be your default writing assistant, accessible from any text field, any app, system-wide. That's the consumer distribution Anthropic has never had. For tool comparison, this makes the "which AI should I use" question much more personal — you'll be able to test all four providers on the same device, in the same workflows, and switch with a toggle. Our [compare tool](/tools/compare) already lets you see scores side-by-side; iOS 27 Extensions will let you experience the differences firsthand.

## Quick Hits

**Google I/O is Monday.** Four days away. The Android Show previews from this week suggest major [Gemini](/review/gemini) updates are coming. Expect a next-gen model, deeper details on Gemini Intelligence, and possibly Veo 4 for video generation.

**May 2026 AI layoff total: 8,000+ confirmed** across Cloudflare (1,100), Cisco (4,000), and ongoing cuts at Meta, Microsoft, and Amazon. All while posting record or near-record revenue. The pattern — revenue up, headcount down, stock up — is now the default playbook in Big Tech.

**OpenEvidence says two-thirds of US physicians now use its AI-powered medical search tool.** That's roughly 650,000 doctors in the US and 1.2 million internationally. AI in healthcare is no longer experimental — it's becoming standard workflow.

*Published May 15, 2026. Prices at ≈₹93/USD.*
