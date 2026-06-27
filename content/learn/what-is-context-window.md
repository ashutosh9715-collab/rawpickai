---
title: "What Is the Context Window in AI?"
description: "The context window is the maximum amount of text an AI model can read and reason about in one request. It determines memory, cost, and task complexity."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-context-window"
author: "Ash"
---


The context window is the single most practical concept in AI that most people learn about by hitting its limit instead of reading about it first.

I did the same. I pasted a long document into Claude, got a truncation warning halfway through, and spent twenty minutes wondering why the model kept forgetting what I'd written at the top. That confusion prompted me to dig into how context windows actually work - and what I found changed how I use every AI tool I test.

This guide is the explanation I wish I'd had before that moment.

---

## What Is the Context Window?

The context window is the maximum amount of text - measured in tokens - that an AI model can process in a single request, including both the input you provide and the output the model generates.

Think of it as the model's working memory. Everything the model can "see" and reason about in one session lives inside that window. Anything outside it is invisible.

When you send a message to an AI, you're not talking to a system with persistent memory by default. You're handing it a document. That document is your entire conversation history, any files you've attached, any system instructions from the application, and your current message - all stacked together. The context window is the maximum size that document can be.

This matters immediately for practical work. If your window is 128,000 tokens and your conversation history plus your new request uses 130,000, the model either refuses to respond or silently drops some of the earlier content - depending on how the app is built.

The word "token" is worth pausing on. Tokens are not exactly words. They're chunks of text that can be a whole word, part of a word, or a punctuation mark. As a rough rule, 1,000 tokens is approximately 750 words in English. The [tokenization](/blog/what-is-tokenization) system varies slightly by model, which is why context limits are always stated in tokens rather than words.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="38" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Inside a Context Window</text>
  <!-- Main window box -->
  <rect x="40" y="58" width="620" height="240" rx="12" fill="#DDD8CE"/>
  <!-- System prompt block -->
  <rect x="56" y="72" width="588" height="44" rx="8" fill="#96845A" opacity="0.75"/>
  <text x="350" y="90" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA" text-anchor="middle">System Prompt / App Instructions</text>
  <text x="350" y="107" font-family="sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Set by the application - invisible to you - counts against your limit</text>
  <!-- Conversation history block -->
  <rect x="56" y="122" width="588" height="50" rx="8" fill="#6B7C5E" opacity="0.75"/>
  <text x="350" y="141" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Previous Conversation History</text>
  <text x="350" y="159" font-family="sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Every prior message in the session, growing with each turn</text>
  <!-- Attached files block -->
  <rect x="56" y="178" width="280" height="50" rx="8" fill="#96845A" opacity="0.55"/>
  <text x="196" y="197" font-family="sans-serif" font-size="12" font-weight="bold" fill="#3A3228" text-anchor="middle">Attached Files / Docs</text>
  <text x="196" y="215" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">PDFs, code, pasted text</text>
  <!-- Current message block -->
  <rect x="364" y="178" width="280" height="50" rx="8" fill="#6B7C5E" opacity="0.45"/>
  <text x="504" y="197" font-family="sans-serif" font-size="12" font-weight="bold" fill="#3A3228" text-anchor="middle">Your Current Message</text>
  <text x="504" y="215" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">The prompt you just sent</text>
  <!-- Output block -->
  <rect x="56" y="234" width="588" height="44" rx="8" fill="#4A5942" opacity="0.55"/>
  <text x="350" y="253" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Model Output</text>
  <text x="350" y="271" font-family="sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Response tokens also count against the window limit</text>
  <!-- Label -->
  <text x="350" y="325" font-family="sans-serif" font-size="12" fill="#8A8577" text-anchor="middle">All blocks together must fit inside the context limit</text>
  <text x="350" y="345" font-family="sans-serif" font-size="12" fill="#96845A" font-weight="bold" text-anchor="middle">Exceed it - and something gets cut</text>
</svg>

---

## Context Window Sizes Across Models in 2026

Context window sizes have expanded faster than almost any other AI benchmark over the past three years - from GPT-3's 4,096 tokens in 2020 to Gemini 1.5 Pro's 1 million tokens today.

Here's where the major models sit as of mid-2026:

| Model | Context Window | Approximate Pages |
|---|---|---|
| Gemini 1.5 Pro | 1,000,000 tokens | ~750 pages |
| Gemini 1.5 Flash | 1,000,000 tokens | ~750 pages |
| Claude 3.5 Sonnet | 200,000 tokens | ~150 pages |
| GPT-4o | 128,000 tokens | ~96 pages |
| Llama 3.1 70B | 128,000 tokens | ~96 pages |
| Mistral Large | 128,000 tokens | ~96 pages |

The table looks clean, but the practical differences are sharper than the numbers suggest.

A 200K window means you can paste an entire novel, a full codebase, or 40 research papers into a single session and ask questions across all of it. A 128K window is generous for most tasks but hits limits when you're doing document-heavy legal or financial analysis.

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="380" rx="12" fill="#F4F1EA"/>
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Context Window Sizes - Mid 2026</text>
  <text x="350" y="56" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">(tokens, in thousands)</text>
  <!-- Bars - max bar width proportional to 1000K -->
  <!-- Gemini 1.5 Pro - 1000K -->
  <rect x="80" y="78" width="560" height="34" rx="6" fill="#6B7C5E"/>
  <text x="88" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA">Gemini 1.5 Pro</text>
  <text x="648" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">1,000K</text>
  <!-- Gemini 1.5 Flash - 1000K -->
  <rect x="80" y="120" width="560" height="34" rx="6" fill="#6B7C5E" opacity="0.75"/>
  <text x="88" y="142" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA">Gemini 1.5 Flash</text>
  <text x="648" y="142" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">1,000K</text>
  <!-- Claude 3.5 Sonnet - 200K -->
  <rect x="80" y="162" width="112" height="34" rx="6" fill="#96845A"/>
  <text x="88" y="184" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA">Claude 3.5</text>
  <text x="648" y="184" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">200K</text>
  <!-- GPT-4o - 128K -->
  <rect x="80" y="204" width="72" height="34" rx="6" fill="#96845A" opacity="0.75"/>
  <text x="88" y="226" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA">GPT-4o</text>
  <text x="648" y="226" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">128K</text>
  <!-- Llama 3.1 70B - 128K -->
  <rect x="80" y="246" width="72" height="34" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="88" y="268" font-family="sans-serif" font-size="12" font-weight="bold" fill="#F4F1EA">Llama 3.1 70B</text>
  <text x="648" y="268" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">128K</text>
  <!-- Mistral Large - 128K -->
  <rect x="80" y="288" width="72" height="34" rx="6" fill="#96845A" opacity="0.45"/>
  <text x="88" y="310" font-family="sans-serif" font-size="12" font-weight="bold" fill="#3A3228">Mistral Large</text>
  <text x="648" y="310" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">128K</text>
  <!-- X axis line -->
  <line x1="80" y1="340" x2="640" y2="340" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Scale markers -->
  <text x="80" y="356" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">0</text>
  <text x="360" y="356" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">500K</text>
  <text x="640" y="356" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">1M</text>
</svg>

I'll say plainly: the 1M token window from Gemini is impressive on paper, but in testing for our [2026 AI tools reality check](/studies/2026-ai-tools-reality-check), I found that throwing 800K tokens at a model doesn't automatically produce better answers. More on that in the section below on why bigger isn't always better.

For most business users trying to [choose an AI model for their work](/blog/how-to-choose-an-ai-model-for-your-business), the 128K-200K range covers the overwhelming majority of real tasks.

---

## What Actually Fits in a Context Window?

The context window is not an abstract concept - it maps directly to concrete volumes of text, code, and documents you work with every day.

Here's a practical breakdown based on the rough conversion of 1,000 tokens = approximately 750 words:

**Text documents**
- 128K tokens holds about 96,000 words - a full-length novel like The Great Gatsby with room to spare.
- 200K tokens holds roughly two novels back to back, or a full PhD thesis.
- 1M tokens holds approximately 10 full novels.

**Code files**
- A single Python file is typically 200-2,000 tokens depending on length.
- A complete medium-sized codebase (10,000 lines of code) runs roughly 30,000-50,000 tokens.
- A large production repo with 100,000+ lines can exceed even a 200K window.

**PDFs and reports**
- A 20-page research report is typically 10,000-15,000 tokens.
- A 100-page financial filing is roughly 60,000-80,000 tokens.
- A full 300-page annual report will likely approach or exceed 128K on its own.

The tricky part is that you're not just fitting your document - you're fitting the document plus all prior conversation turns plus the model's output.

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="400" rx="12" fill="#F4F1EA"/>
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">What Fits in Common Context Sizes?</text>
  <!-- Column headers -->
  <text x="210" y="64" font-family="sans-serif" font-size="12" font-weight="bold" fill="#6B7C5E" text-anchor="middle">128K tokens</text>
  <text x="440" y="64" font-family="sans-serif" font-size="12" font-weight="bold" fill="#96845A" text-anchor="middle">200K tokens</text>
  <text x="620" y="64" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">1M tokens</text>
  <!-- Dividers -->
  <line x1="330" y1="50" x2="330" y2="370" stroke="#DDD8CE" stroke-width="1"/>
  <line x1="530" y1="50" x2="530" y2="370" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row backgrounds alternating -->
  <rect x="20" y="75" width="660" height="54" rx="6" fill="#DDD8CE" opacity="0.4"/>
  <rect x="20" y="173" width="660" height="54" rx="6" fill="#DDD8CE" opacity="0.4"/>
  <rect x="20" y="271" width="660" height="54" rx="6" fill="#DDD8CE" opacity="0.4"/>
  <!-- Row labels col 1 -->
  <text x="30" y="96" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942">Books</text>
  <text x="30" y="113" font-family="sans-serif" font-size="10" fill="#8A8577">~750 words</text>
  <text x="30" y="127" font-family="sans-serif" font-size="10" fill="#8A8577">per 1K tokens</text>
  <text x="30" y="150" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942">Code repos</text>
  <text x="30" y="167" font-family="sans-serif" font-size="10" fill="#8A8577">~2K tokens</text>
  <text x="30" y="181" font-family="sans-serif" font-size="10" fill="#8A8577">per file avg</text>
  <text x="30" y="196" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942">PDFs (20pp)</text>
  <text x="30" y="213" font-family="sans-serif" font-size="10" fill="#8A8577">~12K tokens</text>
  <text x="30" y="227" font-family="sans-serif" font-size="10" fill="#8A8577">each</text>
  <text x="30" y="242" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942">Annual reports</text>
  <text x="30" y="259" font-family="sans-serif" font-size="10" fill="#8A8577">~70K tokens</text>
  <text x="30" y="273" font-family="sans-serif" font-size="10" fill="#8A8577">100 pages</text>
  <text x="30" y="294" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942">Chat history</text>
  <text x="30" y="311" font-family="sans-serif" font-size="10" fill="#8A8577">grows per</text>
  <text x="30" y="325" font-family="sans-serif" font-size="10" fill="#8A8577">turn</text>
  <!-- 128K column -->
  <text x="210" y="100" font-family="sans-serif" font-size="12" fill="#6B7C5E" font-weight="bold" text-anchor="middle">1 full novel</text>
  <text x="210" y="160" font-family="sans-serif" font-size="12" fill="#6B7C5E" font-weight="bold" text-anchor="middle">~60 files</text>
  <text x="210" y="210" font-family="sans-serif" font-size="12" fill="#6B7C5E" font-weight="bold" text-anchor="middle">~10 reports</text>
  <text x="210" y="255" font-family="sans-serif" font-size="12" fill="#6B7C5E" font-weight="bold" text-anchor="middle">1-2 filings</text>
  <text x="210" y="300" font-family="sans-serif" font-size="12" fill="#6B7C5E" font-weight="bold" text-anchor="middle">~400 turns</text>
  <!-- 200K column -->
  <text x="440" y="100" font-family="sans-serif" font-size="12" fill="#96845A" font-weight="bold" text-anchor="middle">2 novels</text>
  <text x="440" y="160" font-family="sans-serif" font-size="12" fill="#96845A" font-weight="bold" text-anchor="middle">~100 files</text>
  <text x="440" y="210" font-family="sans-serif" font-size="12" fill="#96845A" font-weight="bold" text-anchor="middle">~16 reports</text>
  <text x="440" y="255" font-family="sans-serif" font-size="12" fill="#96845A" font-weight="bold" text-anchor="middle">2-3 filings</text>
  <text x="440" y="300" font-family="sans-serif" font-size="12" fill="#96845A" font-weight="bold" text-anchor="middle">~650 turns</text>
  <!-- 1M column -->
  <text x="615" y="100" font-family="sans-serif" font-size="12" fill="#4A5942" font-weight="bold" text-anchor="middle">10+ novels</text>
  <text x="615" y="160" font-family="sans-serif" font-size="12" fill="#4A5942" font-weight="bold" text-anchor="middle">500+ files</text>
  <text x="615" y="210" font-family="sans-serif" font-size="12" fill="#4A5942" font-weight="bold" text-anchor="middle">80+ reports</text>
  <text x="615" y="255" font-family="sans-serif" font-size="12" fill="#4A5942" font-weight="bold" text-anchor="middle">10+ filings</text>
  <text x="615" y="300" font-family="sans-serif" font-size="12" fill="#4A5942" font-weight="bold" text-anchor="middle">3,000+ turns</text>
  <!-- Footer -->
  <text x="350" y="360" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Figures approximate - token counts vary by language and formatting</text>
  <text x="350" y="378" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Use /tools/cost-calculator to estimate your use case</text>
</svg>

One pattern I see consistently when testing [AI code assistants](/best-of/best-ai-code-assistants): developers underestimate how fast context fills up during a long coding session. Each file you paste, each error message you include, each explanation the model generates - it all accumulates. A 128K window can fill up in under an hour of intensive coding work.

Understanding how [tokenization](/blog/what-is-tokenization) works helps you estimate your usage more precisely. Some languages are more token-efficient than others - English prose runs around 1.3 tokens per word, while code with lots of indentation and special characters can run higher.

---

## Why Bigger Isn't Always Better

A larger context window sounds like an unambiguous improvement. After extensive testing, I can tell you it's more complicated than that.

The core problem is what researchers call the "lost in the middle" effect. Studies have shown that models often perform worse at retrieving information that appears in the middle of a very long context compared to information at the beginning or end.

This is counterintuitive. If I hand you a 1,000-page document and ask you about page 500, you don't get an answer from a model with perfect 1M-token recall - you get an answer from a model that has mild attention drift in the middle of its context.

There are a few other practical downsides worth knowing:

**Cost scales with tokens.** Most AI APIs price per token - both input and output. If you're stuffing 900K tokens into every request, the cost of each call can be 7-10x higher than using a 128K model for the same task. Running cost estimates before committing to a workflow is worth doing - the [AI tools cost calculator](/tools/cost-calculator) can help with this.

**Latency increases.** Processing 1 million tokens takes more time than processing 128K tokens. For interactive use where you want a fast response, a massive context can slow things down noticeably.

**Attention quality isn't uniform.** The [transformer architecture](/blog/what-is-the-transformer-architecture) uses attention mechanisms that have to distribute their capacity across all tokens in the window. More tokens means each individual token gets slightly less attention. For most tasks this doesn't matter - but for tasks requiring precise recall of specific details buried in a huge document, it can.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">The Lost in the Middle Effect</text>
  <text x="350" y="54" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Model recall accuracy by document position</text>
  <!-- Chart axes -->
  <line x1="80" y1="280" x2="640" y2="280" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="80" y1="80" x2="80" y2="280" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Y axis labels -->
  <text x="70" y="84" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">100%</text>
  <text x="70" y="134" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">80%</text>
  <text x="70" y="184" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">60%</text>
  <text x="70" y="234" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">40%</text>
  <!-- Y axis grid lines -->
  <line x1="80" y1="134" x2="640" y2="134" stroke="#DDD8CE" stroke-width="0.8" stroke-dasharray="4,4"/>
  <line x1="80" y1="184" x2="640" y2="184" stroke="#DDD8CE" stroke-width="0.8" stroke-dasharray="4,4"/>
  <line x1="80" y1="234" x2="640" y2="234" stroke="#DDD8CE" stroke-width="0.8" stroke-dasharray="4,4"/>
  <!-- X axis labels -->
  <text x="80" y="298" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Start</text>
  <text x="220" y="298" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">25%</text>
  <text x="360" y="298" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Middle</text>
  <text x="500" y="298" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">75%</text>
  <text x="640" y="298" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">End</text>
  <!-- U-shape recall curve -->
  <polyline
    points="80,90 150,104 220,140 290,188 360,218 430,196 500,140 570,98 640,88"
    fill="none" stroke="#6B7C5E" stroke-width="3" stroke-linejoin="round"/>
  <!-- Shaded area under curve -->
  <polygon
    points="80,90 150,104 220,140 290,188 360,218 430,196 500,140 570,98 640,88 640,280 80,280"
    fill="#6B7C5E" opacity="0.12"/>
  <!-- Highlight middle dip annotation -->
  <circle cx="360" cy="218" r="6" fill="#96845A"/>
  <line x1="360" y1="212" x2="360" y2="175" stroke="#96845A" stroke-width="1.5" stroke-dasharray="3,3"/>
  <rect x="280" y="148" width="160" height="26" rx="6" fill="#96845A" opacity="0.15"/>
  <text x="360" y="162" font-family="sans-serif" font-size="11" fill="#96845A" text-anchor="middle" font-weight="bold">Accuracy drops here</text>
  <text x="360" y="176" font-family="sans-serif" font-size="10" fill="#96845A" text-anchor="middle">middle of context</text>
  <!-- Label start/end peaks -->
  <text x="110" y="82" font-family="sans-serif" font-size="10" fill="#6B7C5E" font-weight="bold">Strong</text>
  <text x="594" y="80" font-family="sans-serif" font-size="10" fill="#6B7C5E" font-weight="bold">Strong</text>
  <!-- Source note -->
  <text x="350" y="336" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Pattern from Liu et al. - Stanford 2023 - Lost in the Middle</text>
</svg>

My honest take after a year of testing: for most knowledge work tasks - summarizing a report, drafting based on a brief, reviewing a codebase - 128K to 200K is enough. The 1M window matters when you need everything in one request - like analyzing an entire legal case file or indexing a large codebase without [RAG](/blog/what-is-rag-retrieval-augmented-generation) infrastructure.

If you want to go deeper on the actual research: the original "Lost in the Middle" paper from Stanford is [available on arXiv](https://arxiv.org/abs/2307.03172) and is readable even without a machine learning background.

---

## How I Hit the Context Limit and What Broke

I want to share a specific incident because it illustrates something the documentation doesn't tell you.

I was using Claude to refactor a medium-sized Python project - about 3,500 lines across 12 files. I pasted all the files at the start of the session with detailed instructions about architecture and naming conventions. For the first 45 minutes, the outputs were excellent.

Then I noticed something odd. The model started ignoring constraints I'd set at the beginning.

It began using snake_case for variables in places where I'd explicitly specified camelCase. It started adding imports I'd said to avoid. When I pointed this out, it acknowledged the instruction - then repeated the mistake on the next file.

I assumed the model was hallucinating or drifting. It took me another 30 minutes to realize what was actually happening: I'd passed the 128K context limit. The application was using a sliding window approach, which meant the earliest messages - including my initial architecture instructions - were being silently dropped to make room for the growing conversation.

The model wasn't ignoring me. It literally couldn't see my original instructions anymore.

This experience is what I call "the context cliff." The degradation isn't abrupt - it's gradual and subtle, which makes it much harder to catch than a hard error. If you're doing any long-form work with [AI agents](/blog/what-is-an-ai-agent), this is a failure mode worth planning for explicitly.

<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="330" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">The Context Cliff - Session Timeline</text>
  <!-- Timeline base -->
  <line x1="60" y1="160" x2="640" y2="160" stroke="#DDD8CE" stroke-width="2"/>
  <!-- Phase 1: Good -->
  <rect x="60" y="136" width="170" height="48" rx="8" fill="#6B7C5E" opacity="0.2"/>
  <rect x="60" y="136" width="170" height="8" rx="4" fill="#6B7C5E"/>
  <text x="145" y="158" font-family="sans-serif" font-size="11" fill="#4A5942" text-anchor="middle" font-weight="bold">0-20 min</text>
  <text x="145" y="174" font-family="sans-serif" font-size="11" fill="#6B7C5E" text-anchor="middle">Results are great</text>
  <!-- Phase 2: Drift -->
  <rect x="240" y="136" width="170" height="48" rx="8" fill="#96845A" opacity="0.2"/>
  <rect x="240" y="136" width="170" height="8" rx="4" fill="#96845A"/>
  <text x="325" y="158" font-family="sans-serif" font-size="11" fill="#4A5942" text-anchor="middle" font-weight="bold">20-40 min</text>
  <text x="325" y="174" font-family="sans-serif" font-size="11" fill="#96845A" text-anchor="middle">Subtle drift starts</text>
  <!-- Phase 3: Cliff -->
  <rect x="420" y="136" width="220" height="48" rx="8" fill="#96845A" opacity="0.35"/>
  <rect x="420" y="136" width="220" height="8" rx="4" fill="#96845A"/>
  <text x="530" y="158" font-family="sans-serif" font-size="11" fill="#4A5942" text-anchor="middle" font-weight="bold">40+ min</text>
  <text x="530" y="174" font-family="sans-serif" font-size="11" fill="#96845A" text-anchor="middle">Instructions gone silently</text>
  <!-- Context fill bar above timeline -->
  <text x="30" y="104" font-family="sans-serif" font-size="11" fill="#8A8577" font-weight="bold">Context:</text>
  <rect x="110" y="88" width="510" height="20" rx="6" fill="#DDD8CE"/>
  <rect x="110" y="88" width="200" height="20" rx="6" fill="#6B7C5E" opacity="0.6"/>
  <text x="210" y="102" font-family="sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle" font-weight="bold">40% - Good</text>
  <rect x="310" y="88" width="140" height="20" rx="6" fill="#96845A" opacity="0.7"/>
  <text x="378" y="102" font-family="sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle" font-weight="bold">80% - Warning</text>
  <rect x="450" y="88" width="170" height="20" rx="6" fill="#96845A"/>
  <text x="534" y="102" font-family="sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle" font-weight="bold">100% - Cliff</text>
  <!-- What dropped label -->
  <text x="350" y="220" font-family="sans-serif" font-size="12" fill="#3A3228" text-anchor="middle">What got dropped when the window filled:</text>
  <text x="350" y="242" font-family="sans-serif" font-size="11" fill="#96845A" text-anchor="middle">Initial architecture rules - naming rules - file structure notes</text>
  <text x="350" y="262" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">The model never said anything was missing.</text>
  <text x="350" y="278" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">It just quietly stopped following them.</text>
  <!-- Advice -->
  <rect x="80" y="296" width="540" height="24" rx="6" fill="#6B7C5E" opacity="0.12"/>
  <text x="350" y="312" font-family="sans-serif" font-size="11" fill="#4A5942" text-anchor="middle">Watch your token counter - set a checkpoint at 70% fill</text>
</svg>

After that incident, I started tracking context usage explicitly during long sessions. Most frontends show a token counter - start watching it around 70% fill. That's when I now pause to either summarize earlier context or start a fresh session.

For users who've hit similar walls with tools like [Cursor](/review/cursor) or other [AI code assistants](/best-of/best-ai-code-assistants), the solution is usually the same: shorter sessions with clearer handoffs, not bigger windows.

---

## Context Window vs Memory vs RAG

This is the section that took me the longest to get right, because I conflated all three terms for months.

The context window, memory, and [retrieval-augmented generation](/blog/what-is-rag-retrieval-augmented-generation) solve different versions of the same underlying problem: how does an AI model know things?

Let me separate them clearly.

**The context window** is what the model can see right now, in this request. It's transient. When the session ends, it's gone. It's like the model's desk - things on the desk are accessible instantly, but nothing gets filed away automatically.

**Memory** refers to mechanisms that persist information across sessions. Some AI products (ChatGPT with memory enabled, Claude with Projects, etc.) save facts from past conversations and inject them back into future sessions. This is application-level behavior, not a property of the underlying model. The saved memories eventually get added to the context window of future requests - so memory is really "saved context that gets injected automatically."

**RAG** - retrieval-augmented generation - is a different architectural approach entirely. Instead of fitting all your documents into the context window, RAG indexes your documents externally, then retrieves only the most relevant chunks at query time and places those chunks in the context. It's like having a filing cabinet next to the model's desk - instead of reading all 500 files, you fetch only the three files most relevant to the current question.

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="380" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Context vs Memory vs RAG</text>
  <!-- Three columns -->
  <!-- Context Window column -->
  <rect x="30" y="55" width="195" height="280" rx="12" fill="#6B7C5E" opacity="0.1"/>
  <rect x="30" y="55" width="195" height="10" rx="6" fill="#6B7C5E"/>
  <text x="127" y="83" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">Context Window</text>
  <text x="127" y="108" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Scope:</text>
  <text x="127" y="124" font-family="sans-serif" font-size="11" fill="#6B7C5E" text-anchor="middle" font-weight="bold">This request only</text>
  <text x="127" y="150" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">How it works:</text>
  <text x="127" y="166" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Everything packed</text>
  <text x="127" y="182" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">into one prompt</text>
  <text x="127" y="208" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Limit:</text>
  <text x="127" y="224" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">128K - 1M tokens</text>
  <text x="127" y="250" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Best for:</text>
  <text x="127" y="266" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Single-session tasks</text>
  <text x="127" y="282" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">with bounded docs</text>
  <!-- Memory column -->
  <rect x="252" y="55" width="195" height="280" rx="12" fill="#96845A" opacity="0.1"/>
  <rect x="252" y="55" width="195" height="10" rx="6" fill="#96845A"/>
  <text x="349" y="83" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">Memory</text>
  <text x="349" y="108" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Scope:</text>
  <text x="349" y="124" font-family="sans-serif" font-size="11" fill="#96845A" text-anchor="middle" font-weight="bold">Across sessions</text>
  <text x="349" y="150" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">How it works:</text>
  <text x="349" y="166" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Saved facts injected</text>
  <text x="349" y="182" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">into future context</text>
  <text x="349" y="208" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Limit:</text>
  <text x="349" y="224" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Varies by product</text>
  <text x="349" y="250" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Best for:</text>
  <text x="349" y="266" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Ongoing assistant</text>
  <text x="349" y="282" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">use and preferences</text>
  <!-- RAG column -->
  <rect x="474" y="55" width="196" height="280" rx="12" fill="#4A5942" opacity="0.08"/>
  <rect x="474" y="55" width="196" height="10" rx="6" fill="#4A5942"/>
  <text x="572" y="83" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">RAG</text>
  <text x="572" y="108" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Scope:</text>
  <text x="572" y="124" font-family="sans-serif" font-size="11" fill="#4A5942" text-anchor="middle" font-weight="bold">Any size corpus</text>
  <text x="572" y="150" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">How it works:</text>
  <text x="572" y="166" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Retrieves relevant</text>
  <text x="572" y="182" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">chunks at query time</text>
  <text x="572" y="208" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Limit:</text>
  <text x="572" y="224" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Essentially unlimited</text>
  <text x="572" y="250" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Best for:</text>
  <text x="572" y="266" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Large knowledge bases</text>
  <text x="572" y="282" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">and enterprise search</text>
  <!-- Footer -->
  <text x="350" y="352" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">RAG and memory both ultimately inject content into the context window</text>
  <text x="350" y="368" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">The context window is always the final layer</text>
</svg>

The important insight here: RAG doesn't replace the context window. It manages what goes into it. If your codebase has 10 million tokens of content and your model has a 200K window, RAG decides which 200K tokens of that codebase are most relevant to the current question and places those in the window.

This is why RAG doesn't simply become obsolete because Gemini has a 1M token window. Fitting 1M tokens is expensive and slow. RAG is often cheaper and faster for large knowledge bases, even when the alternative would technically fit.

I've covered RAG in depth at [what is retrieval-augmented generation](/blog/what-is-rag-retrieval-augmented-generation) if you want to go deeper on how the retrieval side works.

For context on how embeddings power the retrieval side of RAG, [what is embedding in AI](/blog/what-is-embedding-in-ai) covers that clearly.

For business users deciding between approaches, [how to build an AI tool stack](/blog/how-to-build-an-ai-tool-stack) has a section on when to architect RAG versus just extending context. And if you're thinking about data privacy implications of sending documents to large-context models, the [AI privacy checklist](/blog/ai-privacy-checklist-for-businesses) is worth reading alongside this.

---

## How to Work Efficiently Within Context Limits

Understanding the context window is only useful if it changes how you work. Here are the practices that have made the biggest difference in my day-to-day testing of AI tools.

**Start sessions with anchored instructions.** Put your most important constraints and context at the very top of the session, before any files or documents. If the context window fills up, apps typically drop content from the middle of the conversation history - not the very beginning. Your initial system-level instructions are the last thing to get cut.

**Be selective about what you paste.** Before pasting a 50-page document, ask whether you need all 50 pages or just the relevant sections. Trimming a document from 30,000 tokens to 8,000 tokens doesn't just save cost - it gives the model a cleaner signal with less noise to reason through. This connects directly to good [prompt engineering](/blog/what-is-prompt-engineering) practice: less is often more.

**Use explicit handoff prompts when resetting.** When you need to start a new session to clear the context, write a concise summary of everything important before you go. I keep a running list during long sessions: key decisions made, constraints established, outstanding questions. A good handoff prompt might run 500-800 tokens and can replace 20,000 tokens of conversation history.

**Watch the token counter.** Most AI frontends show you current context usage. I set a mental checkpoint at 70% - at that point I evaluate whether to continue or summarize and reset. Waiting until 95% means you're reacting to drift rather than preventing it.

**Structure your prompts to put critical info near the top and bottom.** Given the lost-in-the-middle effect, if you have to include a long document, put your specific question before it and your most critical constraints after it. Sandwiching the document between your instructions helps the model attend to both.

**For recurring workflows, use system prompts properly.** If you use an AI tool daily for the same type of task, invest time in writing a clean system prompt that stays at the top of every session. Good [prompt engineering](/blog/what-is-prompt-engineering) here multiplies across every session you run.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Context Efficiency - Key Practices</text>
  <!-- Practice 1 -->
  <rect x="40" y="54" width="300" height="72" rx="10" fill="#6B7C5E" opacity="0.1"/>
  <rect x="40" y="54" width="10" height="72" rx="5" fill="#6B7C5E"/>
  <text x="62" y="76" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942">Anchor instructions first</text>
  <text x="62" y="94" font-family="sans-serif" font-size="11" fill="#8A8577">Top of session is last to be cut</text>
  <text x="62" y="110" font-family="sans-serif" font-size="11" fill="#8A8577">when the window overflows</text>
  <!-- Practice 2 -->
  <rect x="360" y="54" width="300" height="72" rx="10" fill="#96845A" opacity="0.1"/>
  <rect x="360" y="54" width="10" height="72" rx="5" fill="#96845A"/>
  <text x="382" y="76" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942">Trim before pasting</text>
  <text x="382" y="94" font-family="sans-serif" font-size="11" fill="#8A8577">Relevant sections only -</text>
  <text x="382" y="110" font-family="sans-serif" font-size="11" fill="#8A8577">cut headers and appendices</text>
  <!-- Practice 3 -->
  <rect x="40" y="142" width="300" height="72" rx="10" fill="#96845A" opacity="0.1"/>
  <rect x="40" y="142" width="10" height="72" rx="5" fill="#96845A"/>
  <text x="62" y="164" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942">Set a 70% checkpoint</text>
  <text x="62" y="182" font-family="sans-serif" font-size="11" fill="#8A8577">At 70% fill: continue,</text>
  <text x="62" y="198" font-family="sans-serif" font-size="11" fill="#8A8577">summarize, or start fresh</text>
  <!-- Practice 4 -->
  <rect x="360" y="142" width="300" height="72" rx="10" fill="#6B7C5E" opacity="0.1"/>
  <rect x="360" y="142" width="10" height="72" rx="5" fill="#6B7C5E"/>
  <text x="382" y="164" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942">Write handoff prompts</text>
  <text x="382" y="182" font-family="sans-serif" font-size="11" fill="#8A8577">800 tokens of summary</text>
  <text x="382" y="198" font-family="sans-serif" font-size="11" fill="#8A8577">beats 20K of history</text>
  <!-- Practice 5 -->
  <rect x="40" y="230" width="300" height="72" rx="10" fill="#4A5942" opacity="0.08"/>
  <rect x="40" y="230" width="10" height="72" rx="5" fill="#4A5942"/>
  <text x="62" y="252" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942">Sandwich your document</text>
  <text x="62" y="270" font-family="sans-serif" font-size="11" fill="#8A8577">Question before the doc,</text>
  <text x="62" y="286" font-family="sans-serif" font-size="11" fill="#8A8577">constraints after it</text>
  <!-- Practice 6 -->
  <rect x="360" y="230" width="300" height="72" rx="10" fill="#4A5942" opacity="0.08"/>
  <rect x="360" y="230" width="10" height="72" rx="5" fill="#4A5942"/>
  <text x="382" y="252" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942">Use RAG for big corpora</text>
  <text x="382" y="270" font-family="sans-serif" font-size="11" fill="#8A8577">If corpus exceeds 200K</text>
  <text x="382" y="286" font-family="sans-serif" font-size="11" fill="#8A8577">tokens, retrieval wins</text>
  <!-- Footer -->
  <text x="350" y="338" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Use the /tools/quiz to find the right model for your workflow</text>
</svg>

One more thing worth adding: context management is one of the biggest differentiators between AI tools that feel productive and ones that feel like fighting a system. When I'm comparing tools for our [best AI agents roundup](/blog/best-ai-agents-2026), how gracefully a tool handles context limits - whether it warns you, summarizes automatically, or lets you set up persistent system prompts - is a serious evaluation criterion.

The best tools I've reviewed make context management nearly invisible. The worst ones let you discover the limit by producing subtly broken outputs. If you're evaluating tools for your team and context management matters to your workflow, the [methodology page](/methodology) explains how we test for this specifically.

If you're choosing between models for a business use case that involves long documents, [how to evaluate AI output quality](/blog/how-to-evaluate-ai-output-quality) covers the specific tests I run to check for context degradation before recommending a tool.

---

## Frequently Asked Questions

**What is the context window in simple terms?**

The context window is the maximum amount of text an AI model can read and reason about in a single session. Think of it as the model's short-term memory - everything it can "see" at once. Anything outside the window is invisible to the model.

**How many tokens are in a typical context window?**

As of mid-2026, most frontier models offer between 128,000 and 1,000,000 tokens. GPT-4o and most Llama variants sit at 128K, Claude 3.5 Sonnet offers 200K, and Gemini 1.5 Pro and Flash both offer 1 million tokens. Smaller and older models may have 4K-32K windows.

**Does the context window reset between conversations?**

Yes. By default, every new conversation starts with an empty context window. Anything from a previous session is gone unless the application has an explicit memory system that injects saved information into new sessions.

**What happens when you hit the context limit?**

It depends on the application. Some will refuse to process your request and show an error. Others use a sliding window - dropping the oldest messages silently to make room. A few will summarize earlier content automatically. The most dangerous behavior is the silent sliding window, because the model keeps responding but has lost earlier context without telling you.

**Does a bigger context window cost more?**

Yes, in most cases. API pricing is typically based on input and output tokens, so a request using 500K tokens costs significantly more than one using 50K tokens. For applications that use large context windows in every request, the costs can add up quickly. The [cost calculator tool](/tools/cost-calculator) can help you model this for your specific use case.

**Is the context window the same as the model's memory?**

Not exactly. The context window is temporary and resets each session. Memory, in the product sense, refers to information that persists between sessions and gets injected into future context windows. Memory is application-level behavior built on top of the context window, not a replacement for it.

**What is the "lost in the middle" problem?**

Research has shown that AI models recall information from the beginning and end of a long context more accurately than from the middle. When you fill a 200K context with a very long document, the model may give less accurate answers about content that falls in the middle portion of the document. This is one reason why a massive context window doesn't automatically produce better results.

**What's the difference between context window and RAG?**

The context window is how much text the model can see at once. [RAG](/blog/what-is-rag-retrieval-augmented-generation) - retrieval-augmented generation - is a technique for managing what gets placed in that window. Instead of stuffing an entire knowledge base into the context, RAG retrieves only the most relevant chunks at query time. They complement each other rather than competing.

**How does the context window affect AI agents?**

Context management is one of the core challenges in building [AI agents](/blog/what-is-an-ai-agent) that run long tasks autonomously. As an agent executes multiple steps, its conversation history grows. Without careful context management, long-running agents hit limits and lose track of their initial instructions. The [model context protocol](/blog/what-is-the-model-context-protocol-mcp) is one architectural approach to addressing this for agentic systems.

**Can I increase the context window for a model I'm using?**

No - the context window is a fixed property of the model architecture and is set at training time. You can choose a model with a larger context window, but you can't expand the window of an existing model. What you can do is manage your use of the available window more efficiently, or implement RAG to work around the limit for large document sets.

**How do I check how much context I've used?**

Most AI frontends show a token counter or context usage indicator somewhere in the interface. If you're using the API directly, the response object includes token usage data. For long sessions, I recommend checking your usage at regular intervals - most applications start having issues at 80-90% of the context limit, not just at 100%.

**What context window size do I actually need?**

For most knowledge work - drafting, summarizing, answering questions from a report - 128K is sufficient. If you regularly work with very long documents (100+ pages), 200K becomes valuable. Only if you need to analyze entire codebases or large document sets in a single request without RAG infrastructure do you need 1M tokens. For help thinking through your specific use case, the [AI tools quiz](/tools/quiz) asks the right questions to match you with an appropriate tool.
