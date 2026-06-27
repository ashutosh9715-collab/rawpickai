---
title: "What Is a Large Language Model?"
description: "A large language model (LLM) is a neural network trained on billions of text tokens to predict and generate human language. Plain-English explainer."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-an-llm"
author: "Ash"
---


Large language models are the engine behind nearly every AI tool you've used in the last three years. If you've chatted with Claude, asked ChatGPT to explain something, or let Copilot finish a line of code, you've experienced an LLM at work - but you may not know exactly what's happening underneath.

This guide explains what LLMs actually are, how they work, where they fall short, and what I got wrong about them when I first started testing AI tools seriously. No machine learning degree required.

---

## What Is a Large Language Model?

A large language model is a neural network trained on massive amounts of text data to understand and generate human language by predicting what word (or token) comes next.

That one sentence contains the full definition. But each part of it matters, so let's unpack it.

The "large" refers to parameters - the numerical weights inside the network that encode what the model has learned. Modern LLMs have hundreds of billions of these.

GPT-4 is estimated to have around 1.8 trillion parameters. The scale isn't accidental - it's what separates LLMs from the earlier, smaller language models that could barely finish a sentence coherently.

The "language model" part has a specific technical meaning. A language model assigns probabilities to sequences of words.

Given the phrase "the cat sat on the," a language model predicts what comes next - "mat," "floor," "roof" - with a probability attached to each option. An LLM does this prediction at a scale and quality that produces fluent, contextually accurate text.

What makes LLMs surprising, even to researchers who built them, is that training a model to predict the next word - a task that sounds almost trivial - ends up teaching the model an enormous amount about the world.

To predict text accurately, the model must learn grammar, facts, reasoning patterns, coding conventions, and even tone. The prediction task is a kind of universal forcing function.

For a deeper technical foundation, the [transformer architecture](/blog/what-is-the-transformer-architecture) is the specific neural network design that made LLMs possible. Worth reading alongside this piece.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="340" rx="12" fill="#F4F1EA"/>
  <!-- Title -->
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">What Makes an LLM "Large"?</text>
  <!-- Three pillars -->
  <!-- Pillar 1: Data -->
  <rect x="60" y="60" width="170" height="220" rx="12" fill="#6B7C5E" opacity="0.12"/>
  <rect x="60" y="60" width="170" height="6" rx="3" fill="#6B7C5E"/>
  <text x="145" y="100" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">Training Data</text>
  <text x="145" y="124" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Trillions of</text>
  <text x="145" y="140" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">text tokens</text>
  <text x="145" y="168" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Books, web pages,</text>
  <text x="145" y="184" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">code, papers</text>
  <text x="145" y="208" font-family="sans-serif" font-size="22" fill="#6B7C5E" text-anchor="middle">📄</text>
  <text x="145" y="252" font-family="sans-serif" font-size="11" fill="#96845A" font-weight="bold" text-anchor="middle">Scale: ~15T tokens</text>
  <!-- Pillar 2: Parameters -->
  <rect x="265" y="60" width="170" height="220" rx="12" fill="#96845A" opacity="0.12"/>
  <rect x="265" y="60" width="170" height="6" rx="3" fill="#96845A"/>
  <text x="350" y="100" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">Parameters</text>
  <text x="350" y="124" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Billions of</text>
  <text x="350" y="140" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">learned weights</text>
  <text x="350" y="168" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Encode knowledge,</text>
  <text x="350" y="184" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">patterns, reasoning</text>
  <text x="350" y="208" font-family="sans-serif" font-size="22" fill="#96845A" text-anchor="middle">⚙️</text>
  <text x="350" y="252" font-family="sans-serif" font-size="11" fill="#96845A" font-weight="bold" text-anchor="middle">Scale: 70B - 1.8T+</text>
  <!-- Pillar 3: Compute -->
  <rect x="470" y="60" width="170" height="220" rx="12" fill="#6B7C5E" opacity="0.12"/>
  <rect x="470" y="60" width="170" height="6" rx="3" fill="#6B7C5E"/>
  <text x="555" y="100" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">Compute</text>
  <text x="555" y="124" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">GPU clusters</text>
  <text x="555" y="140" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">running for months</text>
  <text x="555" y="168" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Training a frontier</text>
  <text x="555" y="184" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">model costs $50M+</text>
  <text x="555" y="208" font-family="sans-serif" font-size="22" fill="#6B7C5E" text-anchor="middle">🖥️</text>
  <text x="555" y="252" font-family="sans-serif" font-size="11" fill="#96845A" font-weight="bold" text-anchor="middle">Scale: 10K+ GPUs</text>
  <!-- Bottom note -->
  <text x="350" y="308" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">All three must scale together - more data alone doesn't produce better models</text>
</svg>

---

## How LLMs Actually Work

An LLM generates text by repeatedly solving the same question: given everything I've seen so far, what is the most likely next token?

A token is not quite the same as a word - it's a chunk of text that could be a word, part of a word, or a punctuation mark. The word "tokenization" might be split into "token" and "ization."

The text "ChatGPT" might be a single token. Understanding [what tokenization is](/blog/what-is-tokenization) in detail helps explain why LLMs sometimes behave oddly on unusual words or non-English text.

Here's the training process at a high level. The model starts with random parameters and sees a sentence like "The sky is blue."

It looks at "The sky is" and predicts the next token. Its prediction is compared to the actual next word ("blue").

The error between prediction and reality is calculated, and the parameters are adjusted - just slightly - to make the right prediction more likely next time. This process runs billions of times across trillions of tokens.

By the end, the parameters have been nudged into a configuration that captures a surprising amount of human knowledge.

The mechanism that makes this work at scale is the transformer - specifically, a component called the attention mechanism. Attention allows the model to look back at every previous token in a sequence and decide which ones are most relevant for predicting the next one.

When generating the word "her" in a long paragraph, the model can attend to the name mentioned twenty sentences earlier.

This is very different from older recurrent neural networks, which processed tokens one by one and struggled to remember things from far back in a sequence. The transformer processes all tokens simultaneously and uses attention to weigh long-range dependencies.

That architectural change - described in the 2017 paper [Attention Is All You Need](https://arxiv.org/abs/1706.03762) - is what unlocked modern LLMs.

After pre-training on raw text, most LLMs go through a second stage called fine-tuning. This is where the model's behavior is refined - shaped to follow instructions, avoid harmful outputs, and respond helpfully.

The most common technique is reinforcement learning from human feedback (RLHF), which I've covered in depth in the [RLHF explainer](/blog/what-is-rlhf).

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">How LLM Training Works</text>
  <!-- Step boxes with connecting arrows -->
  <!-- Step 1 -->
  <rect x="30" y="65" width="130" height="80" rx="10" fill="#6B7C5E" opacity="0.15"/>
  <rect x="30" y="65" width="130" height="4" rx="2" fill="#6B7C5E"/>
  <text x="95" y="92" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">1. Raw Text</text>
  <text x="95" y="110" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Books, web, code</text>
  <text x="95" y="126" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">~15T tokens</text>
  <!-- Arrow 1 -->
  <line x1="162" y1="105" x2="188" y2="105" stroke="#DDD8CE" stroke-width="2"/>
  <polygon points="188,100 196,105 188,110" fill="#DDD8CE"/>
  <!-- Step 2 -->
  <rect x="198" y="65" width="130" height="80" rx="10" fill="#6B7C5E" opacity="0.15"/>
  <rect x="198" y="65" width="130" height="4" rx="2" fill="#6B7C5E"/>
  <text x="263" y="92" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">2. Tokenize</text>
  <text x="263" y="110" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Split into chunks</text>
  <text x="263" y="126" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">subword units</text>
  <!-- Arrow 2 -->
  <line x1="330" y1="105" x2="356" y2="105" stroke="#DDD8CE" stroke-width="2"/>
  <polygon points="356,100 364,105 356,110" fill="#DDD8CE"/>
  <!-- Step 3 -->
  <rect x="366" y="65" width="130" height="80" rx="10" fill="#96845A" opacity="0.15"/>
  <rect x="366" y="65" width="130" height="4" rx="2" fill="#96845A"/>
  <text x="431" y="92" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">3. Predict Next</text>
  <text x="431" y="110" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Model guesses</text>
  <text x="431" y="126" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">next token</text>
  <!-- Arrow 3 -->
  <line x1="498" y1="105" x2="524" y2="105" stroke="#DDD8CE" stroke-width="2"/>
  <polygon points="524,100 532,105 524,110" fill="#DDD8CE"/>
  <!-- Step 4 -->
  <rect x="534" y="65" width="130" height="80" rx="10" fill="#96845A" opacity="0.15"/>
  <rect x="534" y="65" width="130" height="4" rx="2" fill="#96845A"/>
  <text x="599" y="92" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">4. Adjust</text>
  <text x="599" y="110" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Compare to truth</text>
  <text x="599" y="126" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">update weights</text>
  <!-- Loop arrow back -->
  <path d="M 664 145 Q 664 175 350 185 Q 36 195 36 145" stroke="#DDD8CE" stroke-width="2" fill="none" stroke-dasharray="6,3"/>
  <polygon points="36,145 30,140 36,134" fill="#DDD8CE"/>
  <text x="350" y="178" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Repeat billions of times</text>
  <!-- Fine-tuning section -->
  <rect x="30" y="215" width="640" height="115" rx="10" fill="#6B7C5E" opacity="0.08"/>
  <text x="350" y="238" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">After Pre-training: Fine-tuning</text>
  <!-- Fine-tuning steps inline -->
  <rect x="50" y="250" width="180" height="60" rx="8" fill="#F4F1EA"/>
  <text x="140" y="272" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">Supervised Fine-tune</text>
  <text x="140" y="290" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Learn to follow</text>
  <text x="140" y="304" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">instructions</text>
  <rect x="260" y="250" width="180" height="60" rx="8" fill="#F4F1EA"/>
  <text x="350" y="272" font-family="sans-serif" font-size="11" font-weight="bold" fill="#96845A" text-anchor="middle">RLHF</text>
  <text x="350" y="290" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Humans rank outputs,</text>
  <text x="350" y="304" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">model improves</text>
  <rect x="470" y="250" width="180" height="60" rx="8" fill="#F4F1EA"/>
  <text x="560" y="272" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">Aligned Model</text>
  <text x="560" y="290" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Helpful, honest,</text>
  <text x="560" y="304" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">ready to deploy</text>
</svg>

---

## The Scale That Makes LLMs Different

Scale is not just a feature of LLMs - it's the defining variable that separates them from all prior approaches to language AI.

The relationship between scale and capability is nonlinear. Small models get better at the tasks you train them on when you add more parameters.

But LLMs above a certain size threshold start demonstrating what researchers call emergent abilities - skills that weren't explicitly trained and that appear almost suddenly as the model crosses a scale boundary. Chain-of-thought reasoning, multilingual translation, code generation, and analogical reasoning all emerged in this way.

The GPT-3 paper (2020) was the first to show this pattern clearly at public scale.

Here are rough numbers for context on current frontier models.

| Model | Parameters (estimated) | Context Window |
|---|---|---|
| GPT-2 (2019) | 1.5B | 1,024 tokens |
| GPT-3 (2020) | 175B | 4,096 tokens |
| GPT-4 (2023) | ~1.8T | 128K tokens |
| Claude Opus 4 (2025) | undisclosed | 200K tokens |
| Gemma 4 (2026) | varies (MoE) | 128K tokens |

Parameter counts for recent frontier models are often not disclosed. What we do know is that the context window - how much text the model can read and reference at once - has grown dramatically.

The compute required to train these models is staggering. Frontier model training runs typically require tens of thousands of GPUs running for months.

The cost sits somewhere between $50 million and $200 million per training run. This is not an exaggeration.

The practical implication is that the barrier to training a frontier LLM from scratch is extremely high. Most companies working with LLMs are fine-tuning existing models rather than training new ones - which is where [fine-tuning](/blog/what-is-fine-tuning-in-ai) comes in as a critical concept.

Mixture-of-Experts (MoE) architecture is how some recent models achieve large parameter counts without proportionally large compute costs. Rather than activating all parameters for every token, MoE models route each token to a subset of specialized "expert" networks.

Google's Gemma 4 uses this approach. I covered it in the [Gemma 4 review](/blog/gemma-4-review) if you want the performance breakdown.

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="380" rx="12" fill="#F4F1EA"/>
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">LLM Scale: Parameter Growth</text>
  <text x="350" y="54" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Estimated parameters, 2018 - 2026</text>
  <!-- Y axis label -->
  <text x="22" y="200" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Params</text>
  <!-- Axes -->
  <line x1="80" y1="320" x2="660" y2="320" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="80" y1="80" x2="80" y2="320" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Y axis labels -->
  <text x="70" y="320" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="end">1M</text>
  <text x="70" y="272" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="end">1B</text>
  <text x="70" y="224" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="end">100B</text>
  <text x="70" y="176" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="end">500B</text>
  <text x="70" y="128" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="end">1T+</text>
  <!-- Grid lines -->
  <line x1="80" y1="272" x2="660" y2="272" stroke="#DDD8CE" stroke-width="0.8" stroke-dasharray="4,3"/>
  <line x1="80" y1="224" x2="660" y2="224" stroke="#DDD8CE" stroke-width="0.8" stroke-dasharray="4,3"/>
  <line x1="80" y1="176" x2="660" y2="176" stroke="#DDD8CE" stroke-width="0.8" stroke-dasharray="4,3"/>
  <line x1="80" y1="128" x2="660" y2="128" stroke="#DDD8CE" stroke-width="0.8" stroke-dasharray="4,3"/>
  <!-- Data points: x positions for years 2018-2026, y positions (log scale approximation) -->
  <!-- BERT 2018: 340M -->
  <circle cx="130" cy="278" r="5" fill="#6B7C5E"/>
  <text x="130" y="298" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">BERT</text>
  <text x="130" y="310" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">2018</text>
  <!-- GPT-2 2019: 1.5B -->
  <circle cx="210" cy="268" r="5" fill="#6B7C5E"/>
  <text x="210" y="298" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">GPT-2</text>
  <text x="210" y="310" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">2019</text>
  <!-- GPT-3 2020: 175B -->
  <circle cx="290" cy="232" r="5" fill="#6B7C5E"/>
  <text x="290" y="298" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">GPT-3</text>
  <text x="290" y="310" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">2020</text>
  <!-- PaLM 2022: 540B -->
  <circle cx="410" cy="172" r="5" fill="#96845A"/>
  <text x="410" y="298" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">PaLM</text>
  <text x="410" y="310" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">2022</text>
  <!-- GPT-4 2023: ~1.8T -->
  <circle cx="490" cy="120" r="5" fill="#96845A"/>
  <text x="490" y="298" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">GPT-4</text>
  <text x="490" y="310" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">2023</text>
  <!-- Frontier 2026 -->
  <circle cx="610" cy="100" r="5" fill="#96845A"/>
  <text x="610" y="298" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">Frontier</text>
  <text x="610" y="310" font-family="sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">2026</text>
  <!-- Trend line -->
  <polyline points="130,278 210,268 290,232 410,172 490,120 610,100" stroke="#6B7C5E" stroke-width="2" fill="none" stroke-dasharray="0"/>
  <!-- Emergent abilities callout -->
  <rect x="300" y="120" width="200" height="50" rx="8" fill="#96845A" opacity="0.12"/>
  <rect x="300" y="120" width="200" height="3" rx="1.5" fill="#96845A"/>
  <text x="400" y="140" font-family="sans-serif" font-size="10" font-weight="bold" fill="#4A5942" text-anchor="middle">Emergent abilities appear</text>
  <text x="400" y="157" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">above ~100B parameters</text>
  <line x1="340" y1="120" x2="310" y2="175" stroke="#96845A" stroke-width="1.5" stroke-dasharray="3,2"/>
</svg>

---

## What LLMs Can and Cannot Do

The most useful mental model for working with LLMs is to think of them as very good pattern matchers trained on a snapshot of human-generated text - not as databases, calculators, or reasoning engines.

What they actually do well is significant. They produce fluent, contextually appropriate text at a speed and scale no human team could match.

They can summarize long documents, draft copy in different tones, explain technical concepts at different levels, write and debug code, translate between languages, and answer factual questions - all well enough to be useful in production contexts.

The [AI writing tools roundup](/best-of/best-ai-writing-tools) and [AI coding assistants comparison](/best-of/best-ai-code-assistants) on this site go deeper on specific tool performance.

Their limitations, however, are real and worth understanding clearly.

**LLMs hallucinate.** They generate plausible-sounding text even when they have no reliable information on a topic. This is not a bug that will be fully fixed - it's a consequence of the next-token prediction training objective. The model doesn't have a "don't know" signal. It produces text that pattern-matches to "answering a question," whether or not the content is accurate. The [hallucination explainer](/blog/what-is-hallucination-in-ai) covers this in depth.

**LLMs don't have real-time information by default.** A base LLM knows only what was in its training data, which has a cutoff date. This is why retrieval-augmented generation (RAG) exists - it pulls in current information at query time. The [RAG explainer](/blog/what-is-rag-retrieval-augmented-generation) explains how this works in practice.

**LLMs can't reliably do precise arithmetic.** This sounds counterintuitive given how useful they are at explaining math. But performing a multi-step calculation accurately is a different task from explaining the concept of multiplication. Models can and do make arithmetic errors, especially on large numbers or multi-step computations.

**LLMs don't have persistent memory across conversations by default.** Each conversation starts fresh. Memory features in tools like ChatGPT or Claude are bolt-on features, not native to the underlying model.

The tools you use daily have built systems around these limitations - [AI agents](/blog/what-is-an-ai-agent) that can browse the web and run code, [RAG pipelines](/blog/what-is-rag-retrieval-augmented-generation) that provide current information, and careful [prompt engineering](/blog/what-is-prompt-engineering) techniques that improve output reliability.

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="380" rx="12" fill="#F4F1EA"/>
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">LLM Capabilities vs Limitations</text>
  <!-- Can Do column -->
  <rect x="40" y="60" width="290" height="290" rx="10" fill="#6B7C5E" opacity="0.08"/>
  <rect x="40" y="60" width="290" height="5" rx="2.5" fill="#6B7C5E"/>
  <text x="185" y="88" font-family="sans-serif" font-size="13" font-weight="bold" fill="#6B7C5E" text-anchor="middle">What LLMs Do Well</text>
  <!-- Can do items -->
  <circle cx="65" cy="115" r="4" fill="#6B7C5E"/>
  <text x="78" y="119" font-family="sans-serif" font-size="11" fill="#3A3228">Generate fluent text at scale</text>
  <circle cx="65" cy="145" r="4" fill="#6B7C5E"/>
  <text x="78" y="149" font-family="sans-serif" font-size="11" fill="#3A3228">Summarize long documents</text>
  <circle cx="65" cy="175" r="4" fill="#6B7C5E"/>
  <text x="78" y="179" font-family="sans-serif" font-size="11" fill="#3A3228">Write and debug code</text>
  <circle cx="65" cy="205" r="4" fill="#6B7C5E"/>
  <text x="78" y="209" font-family="sans-serif" font-size="11" fill="#3A3228">Translate between languages</text>
  <circle cx="65" cy="235" r="4" fill="#6B7C5E"/>
  <text x="78" y="239" font-family="sans-serif" font-size="11" fill="#3A3228">Explain complex concepts</text>
  <circle cx="65" cy="265" r="4" fill="#6B7C5E"/>
  <text x="78" y="269" font-family="sans-serif" font-size="11" fill="#3A3228">Draft in different tones</text>
  <circle cx="65" cy="295" r="4" fill="#6B7C5E"/>
  <text x="78" y="299" font-family="sans-serif" font-size="11" fill="#3A3228">Answer factual questions</text>
  <circle cx="65" cy="325" r="4" fill="#6B7C5E"/>
  <text x="78" y="329" font-family="sans-serif" font-size="11" fill="#3A3228">Classify and categorize text</text>
  <!-- Cannot Do column -->
  <rect x="370" y="60" width="290" height="290" rx="10" fill="#96845A" opacity="0.08"/>
  <rect x="370" y="60" width="290" height="5" rx="2.5" fill="#96845A"/>
  <text x="515" y="88" font-family="sans-serif" font-size="13" font-weight="bold" fill="#96845A" text-anchor="middle">Key Limitations</text>
  <!-- Cannot do items -->
  <circle cx="395" cy="115" r="4" fill="#96845A"/>
  <text x="408" y="119" font-family="sans-serif" font-size="11" fill="#3A3228">Hallucinations - outputs false facts</text>
  <circle cx="395" cy="145" r="4" fill="#96845A"/>
  <text x="408" y="149" font-family="sans-serif" font-size="11" fill="#3A3228">No real-time information</text>
  <circle cx="395" cy="175" r="4" fill="#96845A"/>
  <text x="408" y="179" font-family="sans-serif" font-size="11" fill="#3A3228">Unreliable arithmetic</text>
  <circle cx="395" cy="205" r="4" fill="#96845A"/>
  <text x="408" y="209" font-family="sans-serif" font-size="11" fill="#3A3228">No persistent memory</text>
  <circle cx="395" cy="235" r="4" fill="#96845A"/>
  <text x="408" y="239" font-family="sans-serif" font-size="11" fill="#3A3228">Inconsistent on edge cases</text>
  <circle cx="395" cy="265" r="4" fill="#96845A"/>
  <text x="408" y="269" font-family="sans-serif" font-size="11" fill="#3A3228">Can reflect training bias</text>
  <circle cx="395" cy="295" r="4" fill="#96845A"/>
  <text x="408" y="299" font-family="sans-serif" font-size="11" fill="#3A3228">No causal understanding</text>
  <circle cx="395" cy="325" r="4" fill="#96845A"/>
  <text x="408" y="329" font-family="sans-serif" font-size="11" fill="#3A3228">Context window limits apply</text>
</svg>

---

## Where I Was Wrong About LLMs

I want to be honest about the assumptions I carried into testing AI tools that turned out to be wrong - because they're common assumptions, and they led me to misuse early LLMs in ways that were frustrating and avoidable.

**Assumption 1: More detailed prompts always produce better outputs.**

My early workflow was to write extremely long, detailed prompts with every constraint I could think of specified upfront. This seemed logical.

In practice, it often made outputs worse - the model would overfit to the constraints I'd specified and miss the underlying intent. I started getting better results when I gave shorter, clearer prompts and iterated - asking for a draft, then correcting specific problems rather than trying to pre-specify everything.

The skill of prompting is less about specification length and more about clarity of intent. The [prompt engineering guide](/blog/what-is-prompt-engineering) on this site covers this properly.

**Assumption 2: LLMs reason like humans, just faster.**

This is the most consequential wrong assumption. I treated LLMs as fast, smart colleagues.

When an LLM gave me a confident wrong answer, I assumed it was a knowledge gap - easily fixed by giving it the right information.

The actual failure mode is different. LLMs produce text that is statistically consistent with plausible responses, not text that's grounded in verified truth.

When I tested early LLMs on factual questions in domains I knew well - software architecture, specific historical events, medical dosing - the confident wrong answers weren't knowledge gaps. They were pattern matches to "what a confident answer looks like."

I now treat LLM outputs on factual questions as drafts that need verification, not final answers. That shift in mental model made me considerably more effective at using these tools.

**Assumption 3: Bigger always means better.**

When I started testing the tools on this site, I defaulted to the largest model available for every task. Context summarization, classification, short-form copy, quick code snippets - all running on frontier models because surely bigger was better.

In practice, smaller models are faster, cheaper, and often good enough for many tasks. The [free AI tools roundup](/best-of/best-free-ai-tools) includes capable smaller models that handle a majority of common tasks without the latency or cost of frontier models.

**Assumption 4: Hallucinations are a temporary problem being solved.**

I expected hallucination rates to hit near-zero as models scaled. That hasn't happened.

Hallucinations have reduced on common knowledge tasks, but on niche topics, recent events, and specific numerical claims, frontier models in 2026 still produce plausible-sounding wrong information at rates that require systematic verification.

The architectural reason - next-token prediction doesn't natively encode "this claim is uncertain" - means hallucinations are a fundamental characteristic of the approach, not a bug that will simply disappear with more scale.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Four LLM Misconceptions</text>
  <!-- Timeline / misconception cards layout -->
  <!-- Card 1 -->
  <rect x="30" y="55" width="305" height="120" rx="10" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <rect x="30" y="55" width="305" height="4" rx="2" fill="#96845A"/>
  <text x="50" y="80" font-family="sans-serif" font-size="11" font-weight="bold" fill="#96845A">Myth: Longer prompts = better output</text>
  <text x="50" y="100" font-family="sans-serif" font-size="10" fill="#8A8577">What I believed:</text>
  <text x="50" y="116" font-family="sans-serif" font-size="10" fill="#3A3228">Specify every constraint upfront</text>
  <text x="50" y="138" font-family="sans-serif" font-size="10" fill="#8A8577">Reality:</text>
  <text x="50" y="154" font-family="sans-serif" font-size="10" fill="#3A3228">Clarity beats length. Iterate instead.</text>
  <!-- Card 2 -->
  <rect x="365" y="55" width="305" height="120" rx="10" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <rect x="365" y="55" width="305" height="4" rx="2" fill="#96845A"/>
  <text x="385" y="80" font-family="sans-serif" font-size="11" font-weight="bold" fill="#96845A">Myth: LLMs reason like humans</text>
  <text x="385" y="100" font-family="sans-serif" font-size="10" fill="#8A8577">What I believed:</text>
  <text x="385" y="116" font-family="sans-serif" font-size="10" fill="#3A3228">Confident output = correct output</text>
  <text x="385" y="138" font-family="sans-serif" font-size="10" fill="#8A8577">Reality:</text>
  <text x="385" y="154" font-family="sans-serif" font-size="10" fill="#3A3228">Confidence ≠ accuracy. Always verify.</text>
  <!-- Card 3 -->
  <rect x="30" y="205" width="305" height="120" rx="10" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <rect x="30" y="205" width="305" height="4" rx="2" fill="#6B7C5E"/>
  <text x="50" y="230" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6B7C5E">Myth: Bigger is always better</text>
  <text x="50" y="250" font-family="sans-serif" font-size="10" fill="#8A8577">What I believed:</text>
  <text x="50" y="266" font-family="sans-serif" font-size="10" fill="#3A3228">Always use the largest model</text>
  <text x="50" y="288" font-family="sans-serif" font-size="10" fill="#8A8577">Reality:</text>
  <text x="50" y="304" font-family="sans-serif" font-size="10" fill="#3A3228">Small models handle most tasks fine</text>
  <!-- Card 4 -->
  <rect x="365" y="205" width="305" height="120" rx="10" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <rect x="365" y="205" width="305" height="4" rx="2" fill="#6B7C5E"/>
  <text x="385" y="230" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6B7C5E">Myth: Hallucinations being solved</text>
  <text x="385" y="250" font-family="sans-serif" font-size="10" fill="#8A8577">What I believed:</text>
  <text x="385" y="266" font-family="sans-serif" font-size="10" fill="#3A3228">Scale will eliminate hallucinations</text>
  <text x="385" y="288" font-family="sans-serif" font-size="10" fill="#8A8577">Reality:</text>
  <text x="385" y="304" font-family="sans-serif" font-size="10" fill="#3A3228">Structural to next-token prediction</text>
</svg>

---

## How LLMs Power the AI Tools You Use Every Day

LLMs are the reasoning layer inside almost every AI product released since 2022 - but what you interact with is rarely a bare LLM.

Most AI tools wrap the LLM with additional systems that handle things the model can't do natively. Understanding these layers helps you use the tools more effectively.

**Chatbots and AI assistants** - ChatGPT, Claude, Gemini - are LLMs with a conversation management layer, a system prompt that defines behavior, optional web search and tool use, and memory features. When you're talking to Claude, you're talking to an LLM that's been fine-tuned and constrained by a system prompt. The [guide on how to use ChatGPT effectively](/blog/how-to-use-chatgpt-effectively) covers how to work with this architecture rather than against it.

**AI coding tools** like Cursor, GitHub Copilot, and Claude Code take the same underlying LLMs and wrap them in an editor-native experience. They feed the LLM your code, open files, and project context as part of every request.

The LLM's output is parsed and applied as code edits. The [best AI coding tools list](/best-of/best-ai-code-assistants) covers the full range.

For a detailed head-to-head, the [Claude Code vs Cursor comparison](/blog/claude-code-vs-cursor-3) and [Cursor review](/blog/cursor-3-review) are worth reading.

**AI agents** take LLMs a step further by giving them tools - the ability to browse the web, run code, call APIs, and interact with software. The model generates not just text but action plans, executes those plans, observes results, and updates its behavior.

The distinction between a chatbot and an agent is meaningful, and the [AI agents explainer](/blog/what-is-an-ai-agent) covers it properly. For a roundup of what's available, the [best AI agents for 2026](/blog/best-ai-agents-2026) is the most current overview on this site.

**AI search tools** like Perplexity combine LLMs with live web retrieval. When you ask a question, the tool retrieves recent web pages and passes them to the LLM as context.

The LLM synthesizes the retrieved text into an answer - this is RAG in production. You can read a full assessment in the [Perplexity review](/review/perplexity).

**AI writing tools** vary from simple completion interfaces - still useful - to sophisticated multi-step workflows. The [best AI writing tools](/best-of/best-ai-writing-tools) overview covers the spectrum.

What's common across all these categories is that the LLM is doing the generation. The scaffolding around it - retrieval, tool use, memory, fine-tuning - determines whether that generation is useful for a specific task.

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="380" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">LLM as the Core Layer</text>
  <text x="350" y="52" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">How different AI products build on the same foundation</text>
  <!-- Central LLM box -->
  <rect x="250" y="150" width="200" height="80" rx="12" fill="#6B7C5E" opacity="0.2"/>
  <rect x="250" y="150" width="200" height="5" rx="2.5" fill="#6B7C5E"/>
  <text x="350" y="183" font-family="sans-serif" font-size="14" font-weight="bold" fill="#4A5942" text-anchor="middle">LLM Core</text>
  <text x="350" y="202" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Transformer + fine-tuning</text>
  <text x="350" y="218" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">GPT-5, Claude 4, Gemini, etc.</text>
  <!-- Product nodes around center -->
  <!-- Chatbots -->
  <rect x="30" y="75" width="150" height="60" rx="8" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="105" y="99" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">AI Chatbots</text>
  <text x="105" y="115" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">ChatGPT, Claude,</text>
  <text x="105" y="128" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Gemini</text>
  <line x1="180" y1="105" x2="250" y2="170" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Coding tools -->
  <rect x="30" y="225" width="150" height="60" rx="8" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="105" y="249" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">AI Coding Tools</text>
  <text x="105" y="265" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Cursor, Copilot,</text>
  <text x="105" y="278" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Claude Code</text>
  <line x1="180" y1="255" x2="250" y2="210" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- AI Agents -->
  <rect x="520" y="75" width="150" height="60" rx="8" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="595" y="99" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">AI Agents</text>
  <text x="595" y="115" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">With tools, web,</text>
  <text x="595" y="128" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">code execution</text>
  <line x1="520" y1="105" x2="450" y2="170" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- AI Search -->
  <rect x="520" y="225" width="150" height="60" rx="8" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="595" y="249" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">AI Search</text>
  <text x="595" y="265" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Perplexity,</text>
  <text x="595" y="278" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">search + RAG</text>
  <line x1="520" y1="255" x2="450" y2="210" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Writing tools -->
  <rect x="270" y="295" width="160" height="60" rx="8" fill="#F4F1EA" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="350" y="319" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">AI Writing Tools</text>
  <text x="350" y="335" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Jasper, Copy.ai,</text>
  <text x="350" y="348" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Claude, etc.</text>
  <line x1="350" y1="295" x2="350" y2="230" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
</svg>

---

## LLMs vs Older AI

LLMs are not the first approach to building AI systems that work with language - they're the one that finally worked well enough to matter at scale.

Understanding what came before helps clarify what LLMs actually changed.

**Rule-based systems** (1970s - 2000s) encoded knowledge explicitly. A rule-based chatbot for customer support might contain hundreds of if/then rules: if the user says "cancel," respond with "I can help you with cancellation. What is your order number?"

These systems were reliable within their rules and completely brittle outside them. They required experts to write and maintain every rule.

They couldn't handle language they hadn't seen before.

**Statistical NLP** (2000s - 2015) moved away from handwritten rules toward learning patterns from text data. Tools like sentiment classifiers, basic machine translation, and keyword extractors used probabilistic methods over word frequencies.

Better than rule-based systems, but limited in the complexity of language they could handle. They treated words as independent units and lost meaning the moment sentences got complex.

**Early neural networks for NLP** (2015 - 2018) used recurrent architectures (RNNs, LSTMs) to process sequences of words while maintaining a "state" that carried information forward. These could handle longer dependencies and beat statistical methods substantially on translation and classification tasks.

Their failure mode was forgetting information from the beginning of long sequences.

**Transformers and LLMs** (2017 - present) replaced sequential processing with attention over all tokens simultaneously. This removed the forgetting problem and enabled training at a scale that produced qualitatively different behavior.

The table below captures the key differences for practical purposes.

| Approach | Knowledge Source | Flexibility | Failure Mode |
|---|---|---|---|
| Rule-based | Hand-coded by experts | Very low | Breaks on new phrasing |
| Statistical NLP | Frequency patterns | Low | Loses sentence meaning |
| Early neural NLP | Learned from data | Medium | Forgets long context |
| LLMs | Massive data + scale | High | Hallucination, cost |

The thing I'd flag here is that "better" doesn't mean "always preferable." Rule-based systems are deterministic - the same input always produces the same output, which matters in compliance, medical, and safety contexts.

LLMs are probabilistic. For applications where you need explainability, auditability, or zero tolerance for hallucination, simpler systems may be the right choice even in 2026.

For comparisons between specific current tools rather than historical approaches, the [ChatGPT alternatives roundup](/best-of/best-chatgpt-alternatives) covers the current competitive field. And if you're interested in how these tools perform on specific tasks, the [2026 AI tools reality check](/studies/2026-ai-tools-reality-check) is our most rigorous independent evaluation.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">AI Approaches: Timeline Comparison</text>
  <!-- Axis -->
  <line x1="80" y1="310" x2="650" y2="310" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Era labels on axis -->
  <text x="130" y="328" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">1970-2000</text>
  <text x="270" y="328" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">2000-2015</text>
  <text x="420" y="328" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">2015-2018</text>
  <text x="570" y="328" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">2017-present</text>
  <!-- Era lines -->
  <line x1="200" y1="302" x2="200" y2="316" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="350" y1="302" x2="350" y2="316" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="500" y1="302" x2="500" y2="316" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Bar 1: Rule-based -->
  <rect x="60" y="240" width="140" height="62" rx="8" fill="#DDD8CE"/>
  <rect x="60" y="240" width="140" height="5" rx="2.5" fill="#8A8577"/>
  <text x="130" y="262" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Rule-Based</text>
  <text x="130" y="279" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Deterministic,</text>
  <text x="130" y="293" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">brittle on new input</text>
  <!-- Bar 2: Statistical NLP -->
  <rect x="210" y="200" width="140" height="102" rx="8" fill="#6B7C5E" opacity="0.3"/>
  <rect x="210" y="200" width="140" height="5" rx="2.5" fill="#6B7C5E" opacity="0.7"/>
  <text x="280" y="222" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Statistical NLP</text>
  <text x="280" y="239" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Bag-of-words,</text>
  <text x="280" y="255" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">loses sentence</text>
  <text x="280" y="271" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">structure</text>
  <text x="280" y="293" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">+Flexibility</text>
  <!-- Bar 3: Early Neural -->
  <rect x="360" y="155" width="140" height="147" rx="8" fill="#6B7C5E" opacity="0.5"/>
  <rect x="360" y="155" width="140" height="5" rx="2.5" fill="#6B7C5E"/>
  <text x="430" y="177" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Early Neural</text>
  <text x="430" y="194" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">RNNs, LSTMs,</text>
  <text x="430" y="210" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">seq-to-seq</text>
  <text x="430" y="236" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Forgets long</text>
  <text x="430" y="252" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">context</text>
  <text x="430" y="290" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">++Flexibility</text>
  <!-- Bar 4: LLMs -->
  <rect x="510" y="80" width="140" height="222" rx="8" fill="#96845A" opacity="0.4"/>
  <rect x="510" y="80" width="140" height="5" rx="2.5" fill="#96845A"/>
  <text x="580" y="102" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">LLMs</text>
  <text x="580" y="119" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Transformers,</text>
  <text x="580" y="135" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">attention at scale</text>
  <text x="580" y="165" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Emergent abilities,</text>
  <text x="580" y="181" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">fluent generation,</text>
  <text x="580" y="197" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">multilingual</text>
  <text x="580" y="225" font-family="sans-serif" font-size="10" fill="#96845A" text-anchor="middle">Trade-off:</text>
  <text x="580" y="241" font-family="sans-serif" font-size="10" fill="#96845A" text-anchor="middle">hallucination risk</text>
  <text x="580" y="290" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">+++Flexibility</text>
  <!-- Y-axis label -->
  <text x="24" y="200" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Capability</text>
  <line x1="80" y1="80" x2="80" y2="310" stroke="#DDD8CE" stroke-width="1.5"/>
</svg>

---

## LLMs and What Comes Next

The field has not settled. LLMs as deployed in 2026 have meaningful architectural similarities to GPT-3 from 2020, even though the performance gap is enormous.

Several directions are active areas of development.

**Multimodal models** process not just text but images, audio, and video. GPT-4o, Claude 3.5 Sonnet, and Gemini Ultra are multimodal. This matters because many real tasks involve understanding an image alongside text - a medical image, a code screenshot, a chart.

**Reasoning models** - sometimes called "o1-style" or "thinking" models - run extended chains of thought before producing an answer. They trade speed and cost for improved accuracy on difficult multi-step problems. The [Claude Opus 4 vs GPT-5.5 comparison](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) covers the current frontier on reasoning capability.

**Agentic architectures** give LLMs the ability to take actions over multiple steps - browsing, coding, running tests, calling APIs. The distinction between [AI agents and agentic AI](/blog/ai-agents-vs-agentic-ai) is worth understanding if you're evaluating tools in this category.

**Smaller, specialized models** are increasingly competitive with larger general-purpose ones on specific tasks. A 7B parameter model fine-tuned on medical literature may outperform a 70B general model on medical questions. [Embeddings](/blog/what-is-embedding-in-ai) and domain-specific fine-tuning are core techniques here.

If you want to understand how one specific model family compares to another right now, the [model comparison tool](/tools/compare) and the [AI tool quiz](/tools/quiz) are the most efficient starting points on this site.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="34" font-family="sans-serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">LLM Development Directions</text>
  <!-- Radar-style layout: center hub with spokes -->
  <!-- Center -->
  <circle cx="350" cy="195" r="40" fill="#6B7C5E" opacity="0.2"/>
  <circle cx="350" cy="195" r="40" fill="none" stroke="#6B7C5E" stroke-width="2"/>
  <text x="350" y="189" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Foundation</text>
  <text x="350" y="205" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">LLM Core</text>
  <!-- Top: Reasoning -->
  <line x1="350" y1="155" x2="350" y2="95" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="270" y="55" width="160" height="50" rx="8" fill="#F4F1EA" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="350" y="77" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">Reasoning Models</text>
  <text x="350" y="93" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Chain-of-thought, o1-style</text>
  <!-- Right: Multimodal -->
  <line x1="388" y1="175" x2="465" y2="140" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="465" y="110" width="160" height="55" rx="8" fill="#F4F1EA" stroke="#96845A" stroke-width="1.5"/>
  <text x="545" y="133" font-family="sans-serif" font-size="11" font-weight="bold" fill="#96845A" text-anchor="middle">Multimodal</text>
  <text x="545" y="150" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Text + image + audio</text>
  <!-- Bottom right: Agents -->
  <line x1="385" y1="225" x2="450" y2="270" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="450" y="265" width="185" height="55" rx="8" fill="#F4F1EA" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="542" y="287" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">Agentic Systems</text>
  <text x="542" y="304" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Multi-step, tool use</text>
  <!-- Bottom left: Small models -->
  <line x1="315" y1="225" x2="250" y2="270" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="65" y="265" width="185" height="55" rx="8" fill="#F4F1EA" stroke="#96845A" stroke-width="1.5"/>
  <text x="157" y="287" font-family="sans-serif" font-size="11" font-weight="bold" fill="#96845A" text-anchor="middle">Small + Specialized</text>
  <text x="157" y="304" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Fine-tuned for tasks</text>
  <!-- Left: RAG -->
  <line x1="312" y1="175" x2="235" y2="140" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="75" y="110" width="160" height="55" rx="8" fill="#F4F1EA" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="155" y="133" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">RAG + Memory</text>
  <text x="155" y="150" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Real-time knowledge</text>
</svg>

---

## FAQ

**What is a large language model in simple terms?**

A large language model is an AI system trained on billions of text examples to predict and generate human language. It works by repeatedly asking "what word comes next?" across massive datasets until its predictions are accurate enough to produce useful, fluent text.

The "large" refers to the number of parameters - the numerical weights the model learns - which often number in the hundreds of billions.

**What is the difference between an LLM and ChatGPT?**

ChatGPT is a product built on top of an LLM (GPT-4 or GPT-5, depending on the version). The LLM is the underlying model - the neural network that generates text.

ChatGPT adds a conversation interface, a system prompt, optional web search, memory features, and usage limits. Think of the LLM as an engine and ChatGPT as the car built around it.

The same engine (GPT-4) also powers the API used by thousands of other applications.

**How do LLMs learn?**

LLMs learn through a training process called self-supervised learning. They see text with a word hidden, predict what the hidden word is, compare their prediction to the real answer, and adjust their internal parameters to be more accurate next time.

This process runs billions of times across trillions of words. The model never needs a human to label each example - the text itself provides the supervision signal.

**Why do LLMs hallucinate?**

Hallucination happens because LLMs are trained to predict plausible next tokens, not to represent verified facts. When asked about something the model has limited training data on, it generates text that pattern-matches to "a confident answer" rather than responding with uncertainty.

The model has no internal flag for "I don't know." This is structural to next-token prediction training, not a fixable bug in a particular model version.

**What is the difference between an LLM and a chatbot?**

A traditional chatbot uses rule-based logic or simple pattern matching to select pre-written responses. It can only handle inputs it was explicitly programmed to recognize.

An LLM-powered chatbot generates responses dynamically by predicting the best continuation of the conversation - it can handle phrasing it has never seen before. The quality gap between rule-based chatbots and LLM chatbots is enormous, which is why the term "chatbot" now usually refers to LLM-powered systems.

**How many parameters does a large language model have?**

This varies widely. Models considered "large" typically start at around 7 billion parameters.

Mid-size models run 70 billion to 200 billion. Frontier models like GPT-4 are estimated at around 1.8 trillion parameters (using a mixture-of-experts architecture, so not all parameters are active at once).

Exact numbers for most frontier models are not publicly disclosed.

**Can LLMs understand images?**

Multimodal LLMs can process both text and images. Models like GPT-4o, Claude 3.5, and Gemini Ultra accept image inputs and generate text responses about them.

They're trained on text-image pairs in addition to text-only data. This is a significant extension of the original transformer architecture, which processed only text.

**What is the context window of an LLM?**

The context window is the maximum amount of text an LLM can read and reference at once. Early models like GPT-2 had a context window of about 1,000 tokens (roughly 750 words).

Current frontier models support 128,000 to 200,000 tokens - equivalent to one or two full novels. A larger context window means the model can maintain coherence across longer documents, conversations, or codebases.

**What is the difference between an LLM and a search engine?**

A search engine retrieves documents from an index that match your query. It finds existing content and shows it to you.

An LLM generates new text by predicting what words should come next given your input and its training. Search engines are deterministic - the same query returns the same links.

LLMs are generative - the same prompt can produce different outputs. Modern AI search tools like Perplexity combine both: they retrieve documents and then use an LLM to synthesize them into a direct answer.

**Are LLMs the same as AGI?**

No. Artificial general intelligence (AGI) refers to an AI system that can perform any intellectual task a human can, with general reasoning ability that transfers across arbitrary domains.

LLMs are impressive pattern matchers, but they have clear limitations - hallucination, no persistent memory, inability to verify claims, poor arithmetic without tools. Most AI researchers do not consider current LLMs to be AGI.

The definition of AGI is itself contested, and claims about whether specific systems qualify should be treated with skepticism.

**What is the best LLM available in 2026?**

"Best" depends on your task. Claude Opus 4, GPT-5.5, and Gemini Ultra compete at the frontier on reasoning and writing tasks.

The [Claude Opus 4 vs GPT-5.5 comparison](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) covers the current state in detail. For coding specifically, the [best AI coding tools](/best-of/best-ai-code-assistants) go deeper.

For a tailored recommendation based on your specific use case, try the [AI tool quiz](/tools/quiz).

---

*For methodology on how we test and score AI tools, see the [methodology page](/methodology). All tool assessments on this site are independent - we accept no payment for positive coverage.*
