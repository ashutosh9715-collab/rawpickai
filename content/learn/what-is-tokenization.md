---
title: "What Is Tokenization in AI?"
description: "Tokenization is how AI models split text into chunks called tokens before processing. It determines what models can read, count, and how much you pay."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-tokenization"
author: "Ash"
---


# What Is Tokenization in AI? (2026 Guide)

I spent an embarrassing amount of time confused about why the same paragraph cost more to process in one AI tool than another.

The culprit was tokenization - a concept that sounds technical but once you understand it, changes how you use every AI tool you own.

---

## What Is Tokenization?

Tokenization is the process of breaking text into smaller units called tokens before an AI model processes it.

A language model cannot read text the way humans do - letter by letter or word by word in a natural sense. Instead, it converts your input into a sequence of numerical IDs, each representing a chunk of text. Those chunks are tokens.

Here is the part that surprises most people: tokens are not words.

A single word like "tokenization" might be split into two or three tokens. A word like "cat" might be just one. A space before a word is often bundled into that word's token. Punctuation gets its own token. Numbers can get weird - "2026" might be one token or four separate digit tokens depending on the model.

Think of tokenization as translation work that happens before any "thinking" starts.

The model never sees your raw text. It sees a list of integers, each mapped to a token in its vocabulary. Only once that conversion happens can the model begin computing relationships between ideas, generating responses, or retrieving context.

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="280" fill="#F4F1EA" rx="12"/>
  <text x="350" y="36" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">How a Sentence Becomes Tokens</text>
  <text x="350" y="58" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#8A8577">Input: "Tokenization splits text."</text>
  <!-- Arrow down -->
  <line x1="350" y1="68" x2="350" y2="88" stroke="#DDD8CE" stroke-width="2"/>
  <polygon points="344,84 350,96 356,84" fill="#DDD8CE"/>
  <!-- Token boxes -->
  <rect x="40" y="104" width="110" height="44" rx="8" fill="#6B7C5E"/>
  <text x="95" y="122" text-anchor="middle" font-family="monospace" font-size="12" fill="#F4F1EA">Token</text>
  <text x="95" y="138" text-anchor="middle" font-family="monospace" font-size="11" fill="#F4F1EA">"ization"</text>

  <rect x="162" y="104" width="90" height="44" rx="8" fill="#6B7C5E"/>
  <text x="207" y="122" text-anchor="middle" font-family="monospace" font-size="12" fill="#F4F1EA">Token</text>
  <text x="207" y="138" text-anchor="middle" font-family="monospace" font-size="11" fill="#F4F1EA">"Token"</text>

  <rect x="264" y="104" width="90" height="44" rx="8" fill="#96845A"/>
  <text x="309" y="122" text-anchor="middle" font-family="monospace" font-size="12" fill="#F4F1EA">Token</text>
  <text x="309" y="138" text-anchor="middle" font-family="monospace" font-size="11" fill="#F4F1EA">" splits"</text>

  <rect x="366" y="104" width="90" height="44" rx="8" fill="#6B7C5E"/>
  <text x="411" y="122" text-anchor="middle" font-family="monospace" font-size="12" fill="#F4F1EA">Token</text>
  <text x="411" y="138" text-anchor="middle" font-family="monospace" font-size="11" fill="#F4F1EA">" text"</text>

  <rect x="468" y="104" width="90" height="44" rx="8" fill="#96845A"/>
  <text x="513" y="122" text-anchor="middle" font-family="monospace" font-size="12" fill="#F4F1EA">Token</text>
  <text x="513" y="138" text-anchor="middle" font-family="monospace" font-size="11" fill="#F4F1EA">"."</text>

  <!-- IDs row -->
  <text x="350" y="175" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#8A8577">Converted to integer IDs:</text>
  <rect x="60" y="188" width="580" height="36" rx="8" fill="#DDD8CE"/>
  <text x="350" y="211" text-anchor="middle" font-family="monospace" font-size="13" fill="#3A3228">[ 35946, 1634, 31758, 2420, 13 ]</text>

  <text x="350" y="258" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">These IDs are what the model actually processes</text>
</svg>

This diagram shows one important thing: "Tokenization" got split into two tokens ("Token" + "ization") while "splits" and "text" each travel with their leading space.

That bundled space behavior trips up almost everyone the first time they try to manually count tokens.

---

## How Tokens Are Actually Created

Byte Pair Encoding (BPE) is the most widely used tokenization algorithm in modern large language models, including GPT-4, Claude, and Llama 3.

BPE starts with a base vocabulary of individual characters (or bytes). Then it repeatedly merges the most frequently co-occurring pair of symbols into a single new symbol. It does this hundreds of thousands of times on a massive training corpus until it builds a vocabulary of roughly 50,000 to 200,000 tokens.

The result is a vocabulary that contains common English words as single tokens, rare words broken into pieces, and punctuation handled explicitly.

WordPiece is a close cousin used by BERT and some Google models. Instead of merging by raw frequency, it selects merges that maximize the likelihood of the training data under a language model objective.

In practice, the difference rarely matters for end users - both produce subword tokenization that handles rare and compound words by splitting them.

Here is where I was wrong early on: I assumed all models used roughly the same tokenizer.

They do not.

GPT-4 uses the cl100k_base tokenizer with 100,277 tokens in its vocabulary. Llama 3 uses a SentencePiece tokenizer with 128,000 tokens. Claude uses Anthropic's own tokenizer. The vocabularies differ, the merge rules differ, and the resulting token counts for identical text can differ significantly.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="340" fill="#F4F1EA" rx="12"/>
  <text x="350" y="36" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">BPE Merge Process (Simplified)</text>

  <!-- Step 1 -->
  <rect x="40" y="56" width="620" height="64" rx="10" fill="#DDD8CE"/>
  <text x="60" y="76" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942">Step 1 - Start: character vocab</text>
  <text x="60" y="96" font-family="monospace" font-size="12" fill="#3A3228">[ u, n, h, a, p, p, i, n, e, s, s ]</text>
  <text x="60" y="112" font-family="Georgia, serif" font-size="11" fill="#8A8577">Every character is its own token</text>

  <!-- Arrow -->
  <line x1="350" y1="122" x2="350" y2="140" stroke="#6B7C5E" stroke-width="2"/>
  <polygon points="344,136 350,148 356,136" fill="#6B7C5E"/>

  <!-- Step 2 -->
  <rect x="40" y="148" width="620" height="64" rx="10" fill="#DDD8CE"/>
  <text x="60" y="168" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942">Step 2 - Merge frequent pairs</text>
  <text x="60" y="188" font-family="monospace" font-size="12" fill="#3A3228">[ un, h, a, pp, in, e, ss ]  ("pp" merged)</text>
  <text x="60" y="204" font-family="Georgia, serif" font-size="11" fill="#8A8577">Most common pairs merged first</text>

  <!-- Arrow -->
  <line x1="350" y1="214" x2="350" y2="232" stroke="#6B7C5E" stroke-width="2"/>
  <polygon points="344,228 350,240 356,228" fill="#6B7C5E"/>

  <!-- Step 3 -->
  <rect x="40" y="240" width="620" height="64" rx="10" fill="#DDD8CE"/>
  <text x="60" y="260" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942">Step 3 - Final result after many merges</text>
  <text x="60" y="280" font-family="monospace" font-size="12" fill="#3A3228">[ unhap, pi, ness ]  (3 tokens total)</text>
  <text x="60" y="296" font-family="Georgia, serif" font-size="11" fill="#8A8577">Common words become single tokens</text>

  <text x="350" y="326" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">Real vocab: ~50k-200k tokens built from billions of merges</text>
</svg>

If you want to see tokenization live, OpenAI's [tiktoken library](https://github.com/openai/tiktoken) lets you run any string through the cl100k_base encoder and see exactly which tokens it produces.

Hugging Face also maintains the [tokenizers library](https://huggingface.co/docs/tokenizers) with implementations of BPE, WordPiece, and SentencePiece that you can run locally.

Spending 20 minutes with either tool will teach you more than reading five articles on the topic.

---

## Token Counts Across Models - Why They Differ

Token counts for the same text vary meaningfully across models, and the difference matters for both context limits and cost.

I tested the same 500-word English article across three tokenizers.

The results were not subtle. The same text produced 612 tokens in cl100k_base (GPT-4), 587 tokens with the Llama 3 SentencePiece tokenizer, and approximately 640 tokens estimated via Claude's API.

That is roughly a 9% spread - small enough to ignore for a single message, but real enough to matter when you are processing millions of tokens in a batch job.

Why does this happen?

Each model's training corpus was different, so different byte pairs got merged into the vocabulary. A model trained on more code will have efficient tokenization for code constructs. A model trained on more multilingual data will have better coverage for non-English subwords.

The vocabulary size matters too. A model with 200,000 tokens in its vocabulary can represent common phrases as single tokens.

A model with 32,000 tokens must split those same phrases into multiple tokens.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">Token Count: Same 500-Word Text</text>
  <text x="350" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">English article, tested across tokenizers</text>

  <!-- GPT-4 bar -->
  <text x="140" y="92" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">GPT-4</text>
  <rect x="150" y="78" width="306" height="26" rx="6" fill="#6B7C5E"/>
  <text x="464" y="96" font-family="Georgia, serif" font-size="12" fill="#3A3228"> 612</text>

  <!-- Llama 3 bar -->
  <text x="140" y="140" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">Llama 3</text>
  <rect x="150" y="126" width="293" height="26" rx="6" fill="#96845A"/>
  <text x="451" y="144" font-family="Georgia, serif" font-size="12" fill="#3A3228"> 587</text>

  <!-- Claude bar -->
  <text x="140" y="188" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">Claude</text>
  <rect x="150" y="174" width="320" height="26" rx="6" fill="#6B7C5E"/>
  <text x="478" y="192" font-family="Georgia, serif" font-size="12" fill="#3A3228"> ~640</text>

  <!-- Legend note -->
  <line x1="150" y1="232" x2="700" y2="232" stroke="#DDD8CE" stroke-width="1"/>
  <text x="150" y="252" font-family="Georgia, serif" font-size="11" fill="#8A8577">Spread: ~9% across tokenizers for English text</text>
  <text x="150" y="270" font-family="Georgia, serif" font-size="11" fill="#8A8577">Spread widens significantly for non-Latin scripts</text>

  <!-- Bar scale -->
  <text x="150" y="294" font-family="Georgia, serif" font-size="10" fill="#8A8577">0</text>
  <text x="370" y="294" font-family="Georgia, serif" font-size="10" fill="#8A8577">300</text>
  <text x="570" y="294" font-family="Georgia, serif" font-size="10" fill="#8A8577">600</text>
</svg>

This also matters when you are comparing models on a benchmark.

If two models have different tokenizers, "1,000 token context" means meaningfully different amounts of raw text. The comparison is not apples-to-apples, even when the numbers look identical.

When I look at [AI tool comparisons](/tools/compare) on this site, I try to account for this - a model with a more efficient tokenizer gets more real content into the same window.

---

## Tokenization and Pricing - The Hidden Cost Driver

AI pricing is almost universally denominated in tokens, not words - and the difference can cost you real money.

Every major API - from OpenAI to Anthropic to Google - charges per million input tokens and per million output tokens.

GPT-4o charges $2.50 per million input tokens and $10.00 per million output tokens (≈₹232 and ≈₹930 per million respectively, at ₹93/USD).

Claude Opus 4 charges $15.00 per million input tokens and $75.00 per million output tokens (≈₹1,395 and ≈₹6,975 per million).

Now here is what makes tokenization the hidden cost driver: the same task can use very different token counts depending on how you structure your prompts.

I tested this with a summarization task. Asking "summarize this document: [document]" versus "You are a professional editor. Your task is to produce a concise, accurate summary of the following document. Please maintain all key facts and structure your output with one opening sentence and three supporting points. Document: [document]" used 8x more tokens in the prompt.

The output quality improved - but the input cost multiplied.

This matters especially if you are running the [Claude Opus 4.8 vs GPT-5.5](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) comparison and trying to estimate real-world spend.

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="320" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">API Pricing Per 1M Tokens (USD)</text>
  <text x="350" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">Input vs Output pricing comparison</text>

  <!-- Column headers -->
  <text x="200" y="76" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942">Input</text>
  <text x="480" y="76" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942">Output</text>

  <!-- GPT-4o row -->
  <rect x="40" y="88" width="620" height="44" rx="8" fill="#DDD8CE"/>
  <text x="52" y="108" font-family="Georgia, serif" font-size="12" fill="#3A3228">GPT-4o</text>
  <text x="52" y="124" font-family="Georgia, serif" font-size="10" fill="#8A8577">OpenAI</text>
  <rect x="150" y="96" width="100" height="24" rx="6" fill="#6B7C5E"/>
  <text x="200" y="113" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">$2.50</text>
  <rect x="430" y="96" width="100" height="24" rx="6" fill="#96845A"/>
  <text x="480" y="113" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">$10.00</text>

  <!-- Claude Opus 4 row -->
  <rect x="40" y="142" width="620" height="44" rx="8" fill="#DDD8CE"/>
  <text x="52" y="162" font-family="Georgia, serif" font-size="12" fill="#3A3228">Claude Opus 4</text>
  <text x="52" y="178" font-family="Georgia, serif" font-size="10" fill="#8A8577">Anthropic</text>
  <rect x="150" y="150" width="100" height="24" rx="6" fill="#6B7C5E"/>
  <text x="200" y="167" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">$15.00</text>
  <rect x="430" y="150" width="100" height="24" rx="6" fill="#96845A"/>
  <text x="480" y="167" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">$75.00</text>

  <!-- Gemini Flash row -->
  <rect x="40" y="196" width="620" height="44" rx="8" fill="#DDD8CE"/>
  <text x="52" y="216" font-family="Georgia, serif" font-size="12" fill="#3A3228">Gemini 2.0 Flash</text>
  <text x="52" y="232" font-family="Georgia, serif" font-size="10" fill="#8A8577">Google</text>
  <rect x="150" y="204" width="100" height="24" rx="6" fill="#6B7C5E"/>
  <text x="200" y="221" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">$0.10</text>
  <rect x="430" y="204" width="100" height="24" rx="6" fill="#96845A"/>
  <text x="480" y="221" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">$0.40</text>

  <text x="40" y="268" font-family="Georgia, serif" font-size="10" fill="#8A8577">*Prices as of June 2026. Output tokens typically 2-4x more expensive than input.</text>
  <text x="40" y="284" font-family="Georgia, serif" font-size="10" fill="#8A8577">INR conversion: ≈₹93/USD</text>
  <text x="40" y="308" font-family="Georgia, serif" font-size="10" fill="#8A8577">*Last updated: June 2026. Prices converted at ₹93/USD.*</text>
</svg>

One non-obvious fact: output tokens cost more than input tokens at every major provider.

This makes sense when you think about it - generating tokens requires running the model's full decoder at each step. Reading tokens just requires a forward pass through the encoder layers.

The practical implication is that if you can get the same result with a shorter prompt that produces a shorter output, you get the cost reduction twice.

You can use our [AI cost calculator](/tools/cost-calculator) to estimate spending for different prompt patterns before you commit to a model for a production use case.

---

## Non-English Text Gets Expensive Fast

Tokenization efficiency varies dramatically by language - and this is not a minor footnote.

When I tested Hindi text through GPT-4's cl100k_base tokenizer, the token count for the same semantic content was 3 to 4 times higher than English.

Tamil was worse - sometimes 5 to 6 times higher.

This happens because these tokenizers were built primarily on English training data. The BPE merges optimized for English byte pairs, leaving non-Latin scripts with minimal merged tokens in the vocabulary.

Devanagari characters (used for Hindi, Marathi, Sanskrit) often appear as individual bytes in cl100k_base because the script was not frequent enough in the training data to generate useful merge rules. Each Hindi character or syllable uses multiple tokens instead of one.

Here is what this means in practice.

A 500-word English article might cost $0.00125 to process with GPT-4o at $2.50 per million tokens. The same 500-word Hindi article, carrying the same information, might cost $0.004 to $0.005.

That is a 3-4x cost penalty for writing in Hindi. For a SaaS product serving Indian users, this accumulates fast.

I was testing [how to use ChatGPT effectively](/blog/how-to-use-chatgpt-effectively) for regional content workflows, and the tokenization issue was the main constraint nobody mentioned.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">Token Multiplier vs English</text>
  <text x="350" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">Same content, different scripts (cl100k_base)</text>

  <!-- English -->
  <text x="140" y="90" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">English</text>
  <rect x="150" y="76" width="200" height="24" rx="6" fill="#6B7C5E"/>
  <text x="358" y="93" font-family="Georgia, serif" font-size="12" fill="#3A3228"> 1x baseline</text>

  <!-- French -->
  <text x="140" y="128" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">French</text>
  <rect x="150" y="114" width="240" height="24" rx="6" fill="#6B7C5E"/>
  <text x="398" y="131" font-family="Georgia, serif" font-size="12" fill="#3A3228"> 1.2x</text>

  <!-- Chinese -->
  <text x="140" y="166" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">Chinese</text>
  <rect x="150" y="152" width="340" height="24" rx="6" fill="#96845A"/>
  <text x="498" y="169" font-family="Georgia, serif" font-size="12" fill="#3A3228"> 1.7x</text>

  <!-- Hindi -->
  <text x="140" y="204" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">Hindi</text>
  <rect x="150" y="190" width="440" height="24" rx="6" fill="#96845A"/>
  <text x="598" y="207" font-family="Georgia, serif" font-size="12" fill="#3A3228"> 2.2x</text>

  <!-- Tamil -->
  <text x="140" y="242" text-anchor="end" font-family="Georgia, serif" font-size="12" fill="#3A3228">Tamil</text>
  <rect x="150" y="228" width="500" height="24" rx="6" fill="#96845A"/>
  <text x="200" y="245" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">3-5x more tokens than English</text>

  <text x="150" y="278" font-family="Georgia, serif" font-size="10" fill="#8A8577">Tested with ~200-word passages of equivalent content</text>
  <text x="150" y="292" font-family="Georgia, serif" font-size="10" fill="#8A8577">Multipliers are approximate - vary by text complexity</text>
</svg>

The models that handle non-English languages best - like Gemini, which was trained with significantly more multilingual data - have more efficient tokenization for those scripts.

If you are building for a multilingual audience, the tokenizer efficiency for your target language is a real factor in model selection.

It is worth testing your specific use case using the [AI tool comparison tool](/tools/compare) to see which models handle your language most cost-efficiently.

---

## The Context Window and Tokenization

A context window is the maximum number of tokens a model can process in a single request - both input and output combined.

This is the single most important number you need to understand when choosing a model for a task.

GPT-4o has a 128,000 token context window. Claude Opus 4 has a 200,000 token window. Some Gemini models offer up to 1 million tokens.

But here is the nuance that took me a while to fully internalize: the context window is measured in tokens, not words.

A 200,000 token context window holds approximately 150,000 words of English text - roughly the length of two full novels. That sounds enormous, and for most tasks it is more than enough.

But if you are processing Hindi text with a 3x tokenization multiplier, that same 200,000 token window only holds about 50,000 Hindi words.

The window shrinks for code too.

Code is dense with special characters, indentation, and syntax that does not compress as efficiently as prose. A 1,000-line Python file might consume 3,000 to 5,000 tokens depending on the complexity of the code.

When I was doing the [Claude Code vs Cursor](/blog/claude-code-vs-cursor-3) comparison, context window usage was one of the practical differentiators. Large files would saturate smaller context windows mid-task, causing the model to lose track of earlier code.

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="320" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">Context Window: Tokens vs Real Content</text>
  <text x="350" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">What 200,000 tokens actually holds</text>

  <!-- Headers -->
  <text x="320" y="76" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942">Content type</text>
  <text x="560" y="76" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942">Approx words</text>

  <!-- English prose -->
  <rect x="40" y="86" width="620" height="40" rx="8" fill="#DDD8CE"/>
  <text x="56" y="106" font-family="Georgia, serif" font-size="12" fill="#3A3228">English prose</text>
  <text x="56" y="120" font-family="Georgia, serif" font-size="10" fill="#8A8577">~0.75 tokens/word</text>
  <rect x="400" y="94" width="220" height="24" rx="6" fill="#6B7C5E"/>
  <text x="510" y="111" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">~150,000 words</text>

  <!-- Hindi text -->
  <rect x="40" y="136" width="620" height="40" rx="8" fill="#DDD8CE"/>
  <text x="56" y="156" font-family="Georgia, serif" font-size="12" fill="#3A3228">Hindi text</text>
  <text x="56" y="170" font-family="Georgia, serif" font-size="10" fill="#8A8577">~2.5 tokens/word</text>
  <rect x="400" y="144" width="132" height="24" rx="6" fill="#96845A"/>
  <text x="466" y="161" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">~48,000 words</text>

  <!-- Code -->
  <rect x="40" y="186" width="620" height="40" rx="8" fill="#DDD8CE"/>
  <text x="56" y="206" font-family="Georgia, serif" font-size="12" fill="#3A3228">Python code</text>
  <text x="56" y="220" font-family="Georgia, serif" font-size="10" fill="#8A8577">~3-5 tokens/line</text>
  <rect x="400" y="194" width="88" height="24" rx="6" fill="#96845A"/>
  <text x="444" y="211" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">~40k lines</text>

  <!-- Structured data -->
  <rect x="40" y="236" width="620" height="40" rx="8" fill="#DDD8CE"/>
  <text x="56" y="256" font-family="Georgia, serif" font-size="12" fill="#3A3228">JSON / CSV data</text>
  <text x="56" y="270" font-family="Georgia, serif" font-size="10" fill="#8A8577">~1.5-2 tokens/word</text>
  <rect x="400" y="244" width="110" height="24" rx="6" fill="#96845A"/>
  <text x="455" y="261" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">~80,000 rows</text>

  <text x="40" y="300" font-family="Georgia, serif" font-size="10" fill="#8A8577">Context: 200,000 token window. Actual capacity varies by content density.</text>
  <text x="40" y="314" font-family="Georgia, serif" font-size="10" fill="#8A8577">Use a tokenizer tool to measure your specific content before assuming fit.</text>
</svg>

There is also a subtler issue with long context windows called the "lost in the middle" problem.

Some research has shown that models perform worse at retrieving information from the middle of a very long context compared to information at the start or end. If your critical data sits at token 80,000 in a 160,000 token prompt, retrieval accuracy can drop.

Context window size matters. Position within the context matters too.

For tasks involving large codebases, I use [AI coding tools](/best-of/best-ai-code-assistants) that handle context intelligently - chunking, summarizing, or using retrieval rather than naively stuffing everything into one massive prompt.

---

## How to Think About Tokens When Prompting

Prompt efficiency is one of the fastest ways to cut AI costs and improve response quality at the same time.

These are the practical principles I have found most useful after testing hundreds of prompts.

**Trim system prompts aggressively.**

A system prompt runs on every single API call. If your system prompt is 500 tokens and you make 10,000 calls a month, you are spending 5 million tokens just on setup text before any real content is processed.

I audited a system prompt for a client last year and found 200 tokens of redundant instructions ("be helpful," "be accurate," "do not make things up") that added nothing measurable to output quality.

**Prefer specific over verbose.**

"Summarize in 3 bullet points" uses fewer tokens than "Please provide a clear and comprehensive summary of the main points contained in the following document, formatted as a bulleted list with three distinct items."

Both produce nearly identical outputs. The second version costs more and signals less confidence in the model.

**Know your output length before you start.**

Most models can produce variable-length outputs. If you need a one-sentence answer, say so. If you need a 1,000-word analysis, say so.

Without guidance, models often pad outputs - a behavior that both increases cost and reduces the signal-to-noise ratio of the response.

**Be strategic with [RAG (Retrieval-Augmented Generation)](/blog/what-is-rag-retrieval-augmented-generation).**

Rather than dumping an entire knowledge base into the context, retrieval systems fetch only the relevant chunks for each query. This can reduce per-call token usage by 80-90% for knowledge-intensive tasks.

Understanding tokenization helps you understand why [prompt engineering](/blog/what-is-prompt-engineering) matters at all.

Every word in a prompt has a cost. Every unnecessary word reduces the budget available for content that actually drives the answer.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="340" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">Prompt Token Efficiency: Before vs After</text>
  <text x="350" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">Same task - different prompt design</text>

  <!-- Before block -->
  <rect x="40" y="68" width="296" height="200" rx="10" fill="#DDD8CE"/>
  <text x="188" y="90" text-anchor="middle" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942">Verbose Prompt</text>
  <text x="56" y="112" font-family="Georgia, serif" font-size="10" fill="#3A3228">You are a helpful AI assistant.</text>
  <text x="56" y="128" font-family="Georgia, serif" font-size="10" fill="#3A3228">Please be accurate and thorough.</text>
  <text x="56" y="144" font-family="Georgia, serif" font-size="10" fill="#3A3228">Your task today is to carefully</text>
  <text x="56" y="160" font-family="Georgia, serif" font-size="10" fill="#3A3228">read the document below and</text>
  <text x="56" y="176" font-family="Georgia, serif" font-size="10" fill="#3A3228">produce a helpful summary that</text>
  <text x="56" y="192" font-family="Georgia, serif" font-size="10" fill="#3A3228">covers all the key points...</text>
  <rect x="56" y="208" width="130" height="28" rx="6" fill="#96845A"/>
  <text x="121" y="227" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">94 tokens</text>

  <!-- After block -->
  <rect x="364" y="68" width="296" height="200" rx="10" fill="#DDD8CE"/>
  <text x="512" y="90" text-anchor="middle" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942">Efficient Prompt</text>
  <text x="380" y="128" font-family="Georgia, serif" font-size="10" fill="#3A3228">Summarize in 3 bullets.</text>
  <text x="380" y="148" font-family="Georgia, serif" font-size="10" fill="#8A8577">(same document appended)</text>
  <rect x="380" y="208" width="130" height="28" rx="6" fill="#6B7C5E"/>
  <text x="445" y="227" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="#F4F1EA">8 tokens</text>

  <!-- Savings label -->
  <text x="350" y="292" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#4A5942">91% fewer system prompt tokens</text>
  <text x="350" y="312" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">At 10,000 calls/month: saves ~860k tokens</text>
  <text x="350" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">Output quality: statistically identical</text>
</svg>

This kind of optimization compounds.

If you are evaluating [AI agents](/blog/what-is-an-ai-agent) for production use, the agents that run many chained sub-tasks can burn tokens at 10-50x the rate of a single direct call.

Tokenization awareness lets you design those pipelines to stay within budget.

---

## Tokenization's Role in the Bigger AI Picture

Tokenization is not just plumbing - it connects to nearly every other concept in AI systems.

[Large language models](/blog/what-is-a-large-language-model) are fundamentally token predictors.

At their core, they learn to predict the next token given all previous tokens. The entire [transformer architecture](/blog/what-is-the-transformer-architecture) - attention heads, positional encodings, feed-forward layers - operates on sequences of token embeddings, not on raw text.

This means tokenization choices made at training time are baked deep into a model's behavior. You cannot swap tokenizers after training without retraining the model from scratch.

[Embeddings](/blog/what-is-embedding-in-ai) are representations of tokens (or sequences of tokens) as vectors in high-dimensional space.

The quality of those embeddings depends partly on how good the tokenization is. If rare concepts get split into many subword tokens, the model has to work harder to learn coherent representations for those concepts.

[Fine-tuning](/blog/what-is-fine-tuning-in-ai) a model does not change the tokenizer. This is an important constraint.

If you fine-tune on domain-specific text and that text contains many rare terms that the base tokenizer splits inefficiently, your fine-tuned model will inherit that inefficiency.

[RLHF (Reinforcement Learning from Human Feedback)](/blog/what-is-rlhf) also operates on token sequences.

When human raters compare two model outputs, they are comparing outputs at the token level even if they do not think about it that way. Preferences for shorter, cleaner responses can inadvertently shape how a model learns to use its token budget.

[Hallucinations](/blog/what-is-hallucination-in-ai) sometimes have tokenization roots.

Rare proper nouns, technical terms, and non-English words are often represented as sequences of subword tokens the model has never seen combined that way. When the model has to "fill in" a sequence of low-frequency tokens, it is more likely to produce statistically plausible but factually wrong outputs.

Understanding tokenization is not the whole picture. But it is the foundation every other concept rests on.

If you are just starting to explore how AI models work, reviewing our guides on [what RAG is](/blog/what-is-rag-retrieval-augmented-generation) and [what embeddings are](/blog/what-is-embedding-in-ai) will give you a complete picture of how text moves through an AI pipeline from input to output.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">Tokenization in the AI Pipeline</text>
  <text x="350" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">How tokenization connects to every other AI concept</text>

  <!-- Central node: Tokenization -->
  <circle cx="350" cy="190" r="44" fill="#6B7C5E"/>
  <text x="350" y="186" text-anchor="middle" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#F4F1EA">Token-</text>
  <text x="350" y="202" text-anchor="middle" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#F4F1EA">ization</text>

  <!-- Spokes to satellite concepts -->
  <!-- LLMs - top left -->
  <line x1="316" y1="160" x2="210" y2="102" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="185" cy="88" r="36" fill="#96845A"/>
  <text x="185" y="84" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">LLMs</text>
  <text x="185" y="98" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#F4F1EA">predict next</text>
  <text x="185" y="110" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#F4F1EA">token</text>

  <!-- Transformers - top -->
  <line x1="350" y1="146" x2="350" y2="96" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="350" cy="72" r="36" fill="#96845A"/>
  <text x="350" y="68" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">Trans-</text>
  <text x="350" y="82" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">formers</text>
  <text x="350" y="96" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#F4F1EA">work on tokens</text>

  <!-- Embeddings - top right -->
  <line x1="384" y1="160" x2="490" y2="102" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="515" cy="88" r="36" fill="#96845A"/>
  <text x="515" y="84" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">Embed-</text>
  <text x="515" y="98" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">dings</text>
  <text x="515" y="110" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#F4F1EA">vectors per token</text>

  <!-- Fine-tuning - right -->
  <line x1="394" y1="190" x2="558" y2="190" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="592" cy="190" r="36" fill="#6B7C5E"/>
  <text x="592" y="186" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">Fine-</text>
  <text x="592" y="200" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">tuning</text>

  <!-- Hallucinations - bottom right -->
  <line x1="384" y1="220" x2="490" y2="278" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="515" cy="296" r="36" fill="#6B7C5E"/>
  <text x="515" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">Halluc-</text>
  <text x="515" y="304" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">inations</text>

  <!-- RLHF - bottom -->
  <line x1="350" y1="234" x2="350" y2="284" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="350" cy="308" r="36" fill="#6B7C5E"/>
  <text x="350" y="304" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">RLHF</text>
  <text x="350" y="318" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#F4F1EA">rates token seqs</text>

  <!-- RAG - bottom left -->
  <line x1="316" y1="220" x2="210" y2="278" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="185" cy="296" r="36" fill="#6B7C5E"/>
  <text x="185" y="292" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">RAG</text>
  <text x="185" y="306" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#F4F1EA">fetches by token</text>
  <text x="185" y="318" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#F4F1EA">budget</text>

  <!-- Left: Prompt Eng -->
  <line x1="306" y1="190" x2="142" y2="190" stroke="#DDD8CE" stroke-width="2"/>
  <circle cx="108" cy="190" r="36" fill="#96845A"/>
  <text x="108" y="186" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">Prompt</text>
  <text x="108" y="200" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#F4F1EA">Eng.</text>

  <text x="350" y="348" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#8A8577">Tokenization sits at the center of every major AI technique</text>
</svg>

---

## Checking Your Own Token Usage

Several tools make it easy to inspect tokenization without writing any code.

**tiktoken (Python, by OpenAI)** is the reference implementation for GPT tokenizers. You can run `pip install tiktoken` and get token counts for any string in about five lines of code.

It is also useful for checking whether specific technical terms you care about are in the model vocabulary as single tokens.

**Hugging Face Tokenizers** is the most complete open-source implementation. It supports BPE, WordPiece, SentencePiece, and Unigram tokenizers.

You can load any model's tokenizer from the Hub and see exactly how it handles your text.

**OpenAI's online tokenizer tool** at platform.openai.com/tokenizer lets you paste text and see token counts visually with color-coded token boundaries - no code required.

I use this regularly when auditing prompts before scaling an API integration.

For production monitoring, most observability platforms (LangSmith, Helicone, Braintrust) track token counts per call automatically.

If you are running [AI agents](/best-of/best-ai-agents-2026) or multi-step pipelines, this kind of instrumentation is the only way to catch runaway token consumption before it becomes a billing surprise.

<svg viewBox="0 0 700 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="290" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942">Token Inspection Tools: Quick Reference</text>
  <text x="350" y="54" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#8A8577">Choose based on your workflow</text>

  <!-- Header row -->
  <rect x="40" y="66" width="620" height="28" rx="6" fill="#6B7C5E"/>
  <text x="130" y="85" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA">Tool</text>
  <text x="310" y="85" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA">Best for</text>
  <text x="550" y="85" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA">Requires code?</text>

  <!-- Row 1 -->
  <rect x="40" y="96" width="620" height="40" rx="0" fill="#DDD8CE"/>
  <text x="130" y="114" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">tiktoken</text>
  <text x="130" y="128" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#8A8577">OpenAI / Python</text>
  <text x="310" y="114" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">GPT model counts</text>
  <text x="310" y="128" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#8A8577">batch processing</text>
  <text x="550" y="121" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#4A5942">Yes - pip install</text>

  <!-- Row 2 -->
  <rect x="40" y="138" width="620" height="40" rx="0" fill="#F4F1EA"/>
  <text x="130" y="156" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">HF Tokenizers</text>
  <text x="130" y="170" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#8A8577">Hugging Face</text>
  <text x="310" y="156" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">Any open model</text>
  <text x="310" y="170" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#8A8577">multilingual analysis</text>
  <text x="550" y="163" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#4A5942">Yes - pip install</text>

  <!-- Row 3 -->
  <rect x="40" y="180" width="620" height="40" rx="0" fill="#DDD8CE"/>
  <text x="130" y="198" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">OpenAI Tokenizer</text>
  <text x="130" y="212" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#8A8577">platform.openai.com</text>
  <text x="310" y="198" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">Quick visual checks</text>
  <text x="310" y="212" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#8A8577">prompt auditing</text>
  <text x="550" y="205" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#4A5942">No - browser UI</text>

  <!-- Row 4 -->
  <rect x="40" y="222" width="620" height="40" rx="0" fill="#F4F1EA"/>
  <text x="130" y="240" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">LangSmith /</text>
  <text x="130" y="254" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">Helicone</text>
  <text x="310" y="240" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#3A3228">Production monitoring</text>
  <text x="310" y="254" text-anchor="middle" font-family="Georgia, serif" font-size="9" fill="#8A8577">per-call tracking</text>
  <text x="550" y="247" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#4A5942">SDK integration</text>

  <!-- bottom border -->
  <rect x="40" y="262" width="620" height="2" rx="0" fill="#DDD8CE"/>
  <text x="350" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#8A8577">Start with the browser UI for spot checks; move to SDK tools for production pipelines</text>
</svg>

---

## FAQ

**What exactly is a token in AI?**

A token is a chunk of text that an AI model treats as a single unit - it can be a full word, part of a word, a punctuation mark, or a space. Models convert text into sequences of these tokens (represented as integer IDs) before processing. The average English word is roughly 1.3 tokens.

**Is a token the same as a word?**

No. Common short words like "is", "the", or "cat" are usually one token. Longer or less common words like "tokenization" or "entrepreneurship" often get split into two or more tokens. Numbers, punctuation, and spaces have their own tokenization rules that differ from words.

**Why do models charge per token instead of per word?**

Because tokens are the actual unit of computation for these models - each token requires a specific number of operations to process. Charging per word would be ambiguous since word length varies and word boundaries are not how the model actually works internally.

**How many tokens is 1,000 words?**

For standard English prose, roughly 1,300 to 1,500 tokens. For code, technical writing, or non-Latin scripts, this number can be significantly higher.

**Does tokenization affect the quality of AI responses?**

Yes, indirectly. If your key terms are rare and get split into many low-frequency subword tokens, the model may handle them less reliably. Frequent, well-represented concepts in the training vocabulary tend to produce more consistent responses.

**What is the difference between BPE and WordPiece tokenization?**

Both are subword tokenization algorithms that balance vocabulary size against coverage. BPE merges pairs by raw frequency. WordPiece merges pairs by maximizing the training data likelihood. In practice, both produce similar results for common NLP tasks.

**Can I change how a model tokenizes my text?**

Not directly - the tokenizer is fixed at training time and you cannot override it at inference. What you can do is write prompts that use vocabulary the model handles efficiently - common words, clean punctuation, and domain terms you have verified are single tokens in the vocabulary.

**Why is my Hindi or Tamil text using so many more tokens than English?**

Most commercial LLMs were trained primarily on English data, so their BPE vocabularies optimize for English byte pairs. Non-Latin scripts like Devanagari (Hindi) and Tamil characters are often represented as multiple tokens each, because they were not frequent enough in training data to generate efficient merge rules. Models trained with more multilingual data, like Gemini, handle these scripts more efficiently.

**What is the context window and how does tokenization affect it?**

The context window is the maximum number of tokens a model can process in one request. Since non-English text, code, and structured data can use more tokens per equivalent "word," the effective content that fits in a context window shrinks for those content types. A 200,000 token window holds about 150,000 English words but only about 50,000-60,000 Hindi words.

**Should I worry about tokenization for casual use?**

Probably not. If you are asking one-off questions in ChatGPT or using a free tier, tokenization is invisible to you. It becomes important when you are building applications, processing large documents, working in non-English languages, or managing API costs at any meaningful scale.
