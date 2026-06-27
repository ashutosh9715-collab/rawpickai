---
title: "What Is Hallucination in AI?"
description: "AI hallucination is when a model produces confident, fluent output that is factually wrong. It's the biggest practical reliability problem in LLMs today."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-ai-hallucination"
author: "Ash"
---


AI hallucination is when a language model generates output that sounds fluent and confident but is factually wrong, fabricated, or completely disconnected from reality.

It is not a bug in the traditional sense. The model isn't crashing or returning an error. It is doing exactly what it was trained to do - predict the next most probable token - and that process sometimes produces text that contradicts real-world facts.

I've been testing AI tools daily for two years now, and hallucination is the single failure mode that has cost me the most time. Not token limits, not slow latency, not missing features. Hallucination. Because unlike a crash, you don't always know it happened.

This guide covers what hallucination actually is at a technical level, why it happens, how to measure it, and what you can do about it in your own workflow today.

---

## What Is Hallucination in AI?

AI hallucination is the production of text that is presented with confidence but is factually incorrect, fabricated, or unsupported by any real source.

The term comes from psychiatry, where hallucination refers to perceiving something that isn't there. The parallel is intentional. A hallucinating AI model perceives a plausible-sounding fact that does not exist and outputs it as if it does.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="320" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">What Hallucination Looks Like</text>
  <!-- Left box: Prompt -->
  <rect x="30" y="60" width="180" height="200" rx="12" fill="#DDD8CE"/>
  <text x="120" y="88" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">Prompt</text>
  <text x="120" y="112" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">"Who wrote</text>
  <text x="120" y="128" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">the novel</text>
  <text x="120" y="144" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Midnight Rain</text>
  <text x="120" y="160" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">by J. Hollis</text>
  <text x="120" y="176" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Peters?"</text>
  <text x="120" y="220" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">(book does not exist)</text>
  <!-- Arrow -->
  <line x1="210" y1="160" x2="260" y2="160" stroke="#8A8577" stroke-width="2"/>
  <polygon points="260,155 270,160 260,165" fill="#8A8577"/>
  <!-- Center box: LLM -->
  <rect x="270" y="110" width="140" height="100" rx="12" fill="#6B7C5E"/>
  <text x="340" y="153" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">LLM</text>
  <text x="340" y="172" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">predicts tokens</text>
  <text x="340" y="189" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">confidently</text>
  <!-- Arrow -->
  <line x1="410" y1="160" x2="455" y2="160" stroke="#8A8577" stroke-width="2"/>
  <polygon points="455,155 465,160 455,165" fill="#8A8577"/>
  <!-- Right box: Hallucinated output -->
  <rect x="465" y="60" width="185" height="200" rx="12" fill="#DDD8CE"/>
  <text x="557" y="88" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">Output</text>
  <text x="557" y="112" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">"Midnight Rain</text>
  <text x="557" y="128" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">was published</text>
  <text x="557" y="144" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">in 2019 by</text>
  <text x="557" y="160" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Penguin. Peters</text>
  <text x="557" y="176" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">won a Booker</text>
  <text x="557" y="192" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">nomination..."</text>
  <text x="557" y="230" font-family="Georgia, serif" font-size="10" fill="#96845A" text-anchor="middle">Confident. False. Fluent.</text>
  <!-- Bottom label -->
  <text x="340" y="290" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">The model invents plausible-sounding details with no grounding in reality</text>
</svg>

The defining characteristic is the confidence. A model that says "I'm not sure about this" is showing calibration. A model that invents a publisher, award, and publication year for a book that does not exist - without any signal of uncertainty - is hallucinating.

This is distinct from other AI failures. A model that misunderstands your prompt is making an interpretation error. A model that gives you outdated information is hitting a knowledge cutoff. A model that invents facts wholesale is hallucinating.

The distinction matters because the fixes are different. You can fix a misunderstood prompt by rephrasing. You can fix outdated information with [retrieval-augmented generation](/blog/what-is-rag-retrieval-augmented-generation). Hallucination is harder to fix because the model doesn't know it's doing it.

---

## Why AI Models Hallucinate

AI models hallucinate because they are probability machines, not truth machines - and probability and truth are not the same thing.

To understand this, you need to know what a [large language model](/blog/what-is-a-large-language-model) is actually doing when it generates text. It is not searching a database. It is not retrieving stored facts. It is predicting the next token based on all the tokens that came before, weighted by patterns learned from training data.

<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="360" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">How Token Prediction Works</text>
  <!-- Token sequence illustration -->
  <text x="40" y="75" font-family="Georgia, serif" font-size="12" fill="#8A8577">Input so far:</text>
  <rect x="40" y="85" width="72" height="32" rx="6" fill="#6B7C5E"/>
  <text x="76" y="106" font-family="Georgia, serif" font-size="12" fill="#F4F1EA" text-anchor="middle">The</text>
  <rect x="120" y="85" width="72" height="32" rx="6" fill="#6B7C5E"/>
  <text x="156" y="106" font-family="Georgia, serif" font-size="12" fill="#F4F1EA" text-anchor="middle">Eiffel</text>
  <rect x="200" y="85" width="72" height="32" rx="6" fill="#6B7C5E"/>
  <text x="236" y="106" font-family="Georgia, serif" font-size="12" fill="#F4F1EA" text-anchor="middle">Tower</text>
  <rect x="280" y="85" width="72" height="32" rx="6" fill="#6B7C5E"/>
  <text x="316" y="106" font-family="Georgia, serif" font-size="12" fill="#F4F1EA" text-anchor="middle">is</text>
  <rect x="360" y="85" width="72" height="32" rx="6" fill="#6B7C5E"/>
  <text x="396" y="106" font-family="Georgia, serif" font-size="12" fill="#F4F1EA" text-anchor="middle">located</text>
  <rect x="440" y="85" width="72" height="32" rx="6" fill="#6B7C5E"/>
  <text x="476" y="106" font-family="Georgia, serif" font-size="12" fill="#F4F1EA" text-anchor="middle">in</text>
  <rect x="520" y="85" width="72" height="32" rx="6" fill="#DDD8CE" stroke="#96845A" stroke-width="2"/>
  <text x="556" y="106" font-family="Georgia, serif" font-size="12" fill="#96845A" text-anchor="middle">???</text>
  <!-- Probability bars for next token -->
  <text x="40" y="155" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942">Model scores candidate next tokens:</text>
  <!-- Bars -->
  <rect x="40" y="170" width="420" height="22" rx="4" fill="#6B7C5E"/>
  <text x="468" y="187" font-family="Georgia, serif" font-size="12" fill="#3A3228">Paris - 72%</text>
  <rect x="40" y="200" width="150" height="22" rx="4" fill="#96845A"/>
  <text x="198" y="217" font-family="Georgia, serif" font-size="12" fill="#3A3228">France - 18%</text>
  <rect x="40" y="230" width="65" height="22" rx="4" fill="#DDD8CE"/>
  <text x="113" y="247" font-family="Georgia, serif" font-size="12" fill="#3A3228">Europe - 5%</text>
  <rect x="40" y="260" width="30" height="22" rx="4" fill="#DDD8CE"/>
  <text x="78" y="277" font-family="Georgia, serif" font-size="12" fill="#3A3228">other - 5%</text>
  <!-- Arrow and note -->
  <text x="40" y="315" font-family="Georgia, serif" font-size="12" fill="#8A8577">This works for facts with strong training signal.</text>
  <text x="40" y="335" font-family="Georgia, serif" font-size="12" fill="#96845A">For rare or absent facts, a plausible token still wins.</text>
</svg>

The model has seen enormous amounts of text. It has learned that certain words, facts, and patterns tend to co-occur. When you ask about the Eiffel Tower, "Paris" is the overwhelmingly likely next token because it appeared near "Eiffel Tower" thousands of times in training data.

The problem is that this works beautifully for well-documented facts and breaks silently for underdocumented ones.

If you ask about an obscure historical figure, a recent event, a niche technical spec, or a book that barely exists - the model still has to predict a next token. It still picks the most probable continuation. That continuation just happens to be wrong, because the training data didn't contain the real answer with enough frequency to dominate the probability distribution.

There are also structural reasons hallucination persists. [The transformer architecture](/blog/what-is-the-transformer-architecture) that powers most modern LLMs is optimised for producing fluent, coherent text. Fluency and factuality are independent properties. A model can generate beautifully fluent nonsense.

[RLHF](/blog/what-is-rlhf) - the fine-tuning process that makes models helpful and safe - partially but not fully addresses this. Human raters reward helpful, fluent responses. A confident wrong answer often looks better to a rater than a hedged correct one, which means RLHF can inadvertently reinforce overconfidence.

Finally, [tokenization](/blog/what-is-tokenization) matters too. Some facts are stored in ways that make them harder for the model to retrieve accurately - unusual names, niche technical terms, or numbers that cross token boundaries can all create friction between the stored pattern and the recalled output.

---

## Types of Hallucination

Hallucination is not a single failure mode - it's a family of related problems with different causes and different implications for how you work with AI tools.

<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="400" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Types of AI Hallucination</text>
  <!-- Factual Hallucination -->
  <rect x="30" y="60" width="190" height="140" rx="12" fill="#6B7C5E"/>
  <text x="125" y="88" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Factual</text>
  <text x="125" y="108" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Wrong dates, names,</text>
  <text x="125" y="124" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">numbers, or events</text>
  <text x="125" y="148" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">Example: Invents a</text>
  <text x="125" y="162" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">publication year</text>
  <text x="125" y="178" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">or statistic</text>
  <!-- Source Hallucination -->
  <rect x="245" y="60" width="190" height="140" rx="12" fill="#96845A"/>
  <text x="340" y="88" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Source</text>
  <text x="340" y="108" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Fabricated citations,</text>
  <text x="340" y="124" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">fake papers, URLs</text>
  <text x="340" y="148" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">Example: Real journal</text>
  <text x="340" y="162" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">name, fake article</text>
  <text x="340" y="178" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">title and DOI</text>
  <!-- Instruction Hallucination -->
  <rect x="460" y="60" width="190" height="140" rx="12" fill="#8A8577"/>
  <text x="555" y="88" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Instruction</text>
  <text x="555" y="108" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Ignores constraints,</text>
  <text x="555" y="124" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">invents task details</text>
  <text x="555" y="148" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">Example: Adds features</text>
  <text x="555" y="162" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">you didn't ask for</text>
  <text x="555" y="178" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">or ignores limits</text>
  <!-- Bottom row detail -->
  <rect x="30" y="225" width="600" height="140" rx="12" fill="#DDD8CE"/>
  <text x="340" y="252" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#4A5942" text-anchor="middle">How Severe Is Each Type?</text>
  <text x="125" y="282" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#6B7C5E" text-anchor="middle">Factual</text>
  <text x="125" y="300" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">High severity -</text>
  <text x="125" y="316" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">hardest to spot</text>
  <text x="125" y="332" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">without verification</text>
  <text x="340" y="282" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#96845A" text-anchor="middle">Source</text>
  <text x="340" y="300" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Critical - legal and</text>
  <text x="340" y="316" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">academic risk if</text>
  <text x="340" y="332" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">published unchecked</text>
  <text x="555" y="282" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#8A8577" text-anchor="middle">Instruction</text>
  <text x="555" y="300" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Moderate - usually</text>
  <text x="555" y="316" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">caught at review</text>
  <text x="555" y="332" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">stage</text>
</svg>

**Factual hallucination** is the most common type. The model states a fact - a date, a statistic, a person's biography - that is simply wrong. The output sounds authoritative. The model uses the same confident tone it uses for correct facts. The only way to catch it is to verify against a real source.

**Source hallucination** is arguably the most dangerous for professional use. The model cites a paper, book, article, or URL that does not exist - but makes it sound completely plausible. The journal name is real. The author name sounds real. The title is plausible. The DOI is formatted correctly. It just doesn't exist.

I have personally submitted research work where a model fabricated a citation from a prestigious journal, and the citation looked so credible I nearly published it without checking. More on that in the E-E-A-T section below.

**Instruction hallucination** is different in character. Here the model doesn't misstate facts - it drifts from your actual request. You say "summarize in three bullet points" and get seven. You say "don't use markdown" and get headers. You say "only recommend tools under $20/month" and get a list with enterprise pricing. The model is not retrieving wrong facts; it is failing to follow constraints.

There's a fourth type worth naming: **entity hallucination**, where the model describes a real entity - a company, a person, a product - but attributes to it characteristics that belong to a different entity. This is particularly insidious in competitive research, where "Company X uses technology Y" might combine accurate information about both Company X and Technology Y in a relationship that doesn't actually exist.

---

## Hallucination Rates Across Models - What the Data Shows

Hallucination rates vary significantly across models, tasks, and domains - and no model is immune.

The most consistent third-party benchmark for hallucination is the [TruthfulQA benchmark](https://arxiv.org/abs/2109.07958), which tests whether models repeat common misconceptions versus answering accurately. But TruthfulQA only covers a curated set of questions. Real-world hallucination rates in production workflows are harder to measure and typically higher.

<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="380" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Hallucination Rate by Task Type</text>
  <text x="340" y="56" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Approximate error rates observed in independent testing (2025-2026)</text>
  <!-- Y axis label -->
  <text x="22" y="200" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle" writing-mode="vertical-lr">Error Rate %</text>
  <!-- Bars -->
  <!-- Citation tasks -->
  <rect x="70" y="100" width="60" height="180" rx="4" fill="#96845A"/>
  <text x="100" y="294" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Citation</text>
  <text x="100" y="307" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">tasks</text>
  <text x="100" y="93" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#96845A" text-anchor="middle">~60%</text>
  <!-- Recent events -->
  <rect x="160" y="138" width="60" height="142" rx="4" fill="#96845A"/>
  <text x="190" y="294" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Recent</text>
  <text x="190" y="307" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">events</text>
  <text x="190" y="131" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#96845A" text-anchor="middle">~47%</text>
  <!-- Niche domain facts -->
  <rect x="250" y="158" width="60" height="122" rx="4" fill="#6B7C5E"/>
  <text x="280" y="294" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Niche</text>
  <text x="280" y="307" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">domains</text>
  <text x="280" y="151" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">~40%</text>
  <!-- Legal/medical -->
  <rect x="340" y="188" width="60" height="92" rx="4" fill="#6B7C5E"/>
  <text x="370" y="294" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Legal/</text>
  <text x="370" y="307" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">medical</text>
  <text x="370" y="181" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">~30%</text>
  <!-- General knowledge -->
  <rect x="430" y="228" width="60" height="52" rx="4" fill="#6B7C5E"/>
  <text x="460" y="294" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">General</text>
  <text x="460" y="307" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">knowledge</text>
  <text x="460" y="221" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#6B7C5E" text-anchor="middle">~17%</text>
  <!-- Code generation -->
  <rect x="520" y="248" width="60" height="32" rx="4" fill="#DDD8CE" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="550" y="294" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Code</text>
  <text x="550" y="307" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">tasks</text>
  <text x="550" y="241" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#8A8577" text-anchor="middle">~10%</text>
  <!-- Baseline axis -->
  <line x1="55" y1="280" x2="610" y2="280" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Legend note -->
  <text x="340" y="345" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Rates are approximate. Citation hallucination is highest because</text>
  <text x="340" y="362" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">models interpolate between plausible-sounding source patterns.</text>
</svg>

The data I've observed across months of hands-on testing with GPT-4o, Claude Sonnet 4.6, and Gemini 1.5 Pro shows clear patterns. Citation tasks - asking an AI to find specific papers, books, or sources - have the highest error rates, easily exceeding 50% for topics outside the model's strong training signal. General knowledge questions about well-documented topics have the lowest rates, often under 15%.

What the data also shows is that newer models haven't eliminated hallucination - they've shifted its character. GPT-5.5 is less likely to hallucinate on common questions, but when you push it into low-coverage territory, it fails with equal confidence. Claude Opus 4.8 showed notably better calibration in my testing - meaning it hedged more appropriately when uncertain - but it still hallucinated on source citation tasks at a non-trivial rate.

You can read my full benchmark comparison in the [2026 AI Tools Reality Check study](/studies/2026-ai-tools-reality-check).

The models I've found most hallucination-prone in practice are those optimised heavily for conversational fluency at the cost of grounded retrieval. Tools that add [RAG](/blog/what-is-rag-retrieval-augmented-generation) on top of base models - like [Perplexity](/review/perplexity) - dramatically reduce hallucination on current-events questions precisely because they retrieve before generating.

For code generation specifically, hallucination looks different. It shows up as hallucinated APIs - functions that don't exist in the library the model confidently references. The [best AI coding tools](/best-of/best-ai-code-assistants) have improved significantly here, but the failure mode hasn't disappeared. I hit it regularly with niche libraries that have sparse GitHub presence.

---

## Times I Got Burned by AI Hallucinations

These are real examples from my own workflow - not cautionary tales about other people.

<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="340" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">My Hallucination Incidents by Category</text>
  <!-- Timeline dots and labels -->
  <!-- Horizontal timeline -->
  <line x1="60" y1="190" x2="620" y2="190" stroke="#DDD8CE" stroke-width="2"/>
  <!-- Incident 1: Citation -->
  <circle cx="110" cy="190" r="10" fill="#96845A"/>
  <line x1="110" y1="180" x2="110" y2="100" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="55" y="60" width="110" height="40" rx="6" fill="#96845A"/>
  <text x="110" y="78" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Fabricated paper</text>
  <text x="110" y="92" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">nearly published</text>
  <text x="110" y="212" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Mar 2025</text>
  <!-- Incident 2: API -->
  <circle cx="240" cy="190" r="10" fill="#96845A"/>
  <line x1="240" y1="200" x2="240" y2="265" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="185" y="265" width="110" height="40" rx="6" fill="#96845A"/>
  <text x="240" y="283" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Non-existent</text>
  <text x="240" y="297" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">SDK method</text>
  <text x="240" y="212" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Jun 2025</text>
  <!-- Incident 3: Legal -->
  <circle cx="380" cy="190" r="10" fill="#6B7C5E"/>
  <line x1="380" y1="180" x2="380" y2="100" stroke="#6B7C5E" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="325" y="60" width="110" height="40" rx="6" fill="#6B7C5E"/>
  <text x="380" y="78" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Wrong legal</text>
  <text x="380" y="92" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">jurisdiction rule</text>
  <text x="380" y="212" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Sep 2025</text>
  <!-- Incident 4: Stats -->
  <circle cx="530" cy="190" r="10" fill="#6B7C5E"/>
  <line x1="530" y1="200" x2="530" y2="265" stroke="#6B7C5E" stroke-width="1.5" stroke-dasharray="4,3"/>
  <rect x="475" y="265" width="110" height="40" rx="6" fill="#6B7C5E"/>
  <text x="530" y="283" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Invented market</text>
  <text x="530" y="297" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">size stat</text>
  <text x="530" y="212" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Jan 2026</text>
  <!-- Legend -->
  <rect x="180" y="148" width="14" height="14" rx="3" fill="#96845A"/>
  <text x="200" y="160" font-family="Georgia, serif" font-size="11" fill="#3A3228">High impact - nearly caused public error</text>
  <rect x="400" y="148" width="14" height="14" rx="3" fill="#6B7C5E"/>
  <text x="420" y="160" font-family="Georgia, serif" font-size="11" fill="#3A3228">Caught before publication</text>
</svg>

**March 2025 - The citation that almost got published.** I was using Claude to help draft a research summary on AI safety methods. It cited a paper titled something like "Constitutional Constraints in Autoregressive Language Models" from *arXiv*, with a plausible-looking ID and two real author names. I checked the arXiv link. It returned 404.

The paper did not exist. The authors were real researchers. The title was the kind of thing they might plausibly write. But the paper itself was invented.

I was wrong to think that because Claude is trained on academic text, it would only cite real papers. That assumption cost me a near-miss. Now I verify every citation regardless of how authoritative it sounds.

**June 2025 - The hallucinated SDK method.** While testing one of the [best AI coding tools](/best-of/best-ai-code-assistants) for a comparison piece, I asked it to write code using a Python library I was less familiar with.

The model wrote `client.batch_upload_with_metadata()` - a method that simply does not exist in that SDK version. The code looked completely plausible. It would have passed a superficial code review. I only caught it when the script threw an AttributeError at runtime.

This is why I no longer trust AI-generated code for unfamiliar libraries without running it locally first. [Vibe coding](/blog/what-is-vibe-coding) culture treats AI output as runnable by default. My experience says verify first.

**September 2025 - The jurisdiction error.** I asked an AI assistant to summarize regulations around a specific employment practice in the UK. It gave me a confident, well-structured answer that was accurate for EU member states but not for post-Brexit UK law.

The model had clearly learned patterns from EU employment law content and applied them to UK context without flagging the distinction. Nothing in the output indicated uncertainty. I was lucky a lawyer colleague caught it.

**January 2026 - The invented market size.** Working on a competitive research piece, I used an AI to find market size data for a niche SaaS category. It returned a specific figure with an attribution to a real market research firm.

The figure was not on that firm's site. It was not on any site. The number was plausible enough to pass a quick smell test, which is exactly what makes this type of hallucination dangerous.

I've now built a personal rule: any specific number in AI output that I can't verify in under 60 seconds gets flagged as unverified or removed entirely.

---

## How to Reduce Hallucination in Your Workflow

Reducing hallucination is not about finding a "hallucination-free" model - it's about building workflows that catch and prevent errors regardless of which model you're using.

<svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="420" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Hallucination Mitigation Techniques</text>
  <text x="340" y="56" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Effectiveness rating (1-10) based on hands-on testing</text>
  <!-- RAG -->
  <text x="200" y="92" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="end">RAG / grounded retrieval</text>
  <rect x="210" y="78" width="370" height="22" rx="4" fill="#6B7C5E"/>
  <text x="588" y="93" font-family="Georgia, serif" font-size="11" fill="#3A3228">9 / 10</text>
  <!-- Source prompting -->
  <text x="200" y="132" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="end">Cite your sources prompts</text>
  <rect x="210" y="118" width="295" height="22" rx="4" fill="#6B7C5E"/>
  <text x="513" y="133" font-family="Georgia, serif" font-size="11" fill="#3A3228">7 / 10</text>
  <!-- Temperature reduction -->
  <text x="200" y="172" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="end">Lower temperature</text>
  <rect x="210" y="158" width="246" height="22" rx="4" fill="#96845A"/>
  <text x="464" y="173" font-family="Georgia, serif" font-size="11" fill="#3A3228">6 / 10</text>
  <!-- Self-consistency -->
  <text x="200" y="212" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="end">Self-consistency checks</text>
  <rect x="210" y="198" width="246" height="22" rx="4" fill="#96845A"/>
  <text x="464" y="213" font-family="Georgia, serif" font-size="11" fill="#3A3228">6 / 10</text>
  <!-- Fine-tuning -->
  <text x="200" y="252" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="end">Domain fine-tuning</text>
  <rect x="210" y="238" width="222" height="22" rx="4" fill="#96845A"/>
  <text x="440" y="253" font-family="Georgia, serif" font-size="11" fill="#3A3228">5 / 10</text>
  <!-- Human verification -->
  <text x="200" y="292" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="end">Human verification</text>
  <rect x="210" y="278" width="370" height="22" rx="4" fill="#4A5942"/>
  <text x="588" y="293" font-family="Georgia, serif" font-size="11" fill="#3A3228">10/10</text>
  <!-- Perplexity / search grounded tools -->
  <text x="200" y="332" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="end">Search-grounded tools</text>
  <rect x="210" y="318" width="345" height="22" rx="4" fill="#6B7C5E"/>
  <text x="563" y="333" font-family="Georgia, serif" font-size="11" fill="#3A3228">8.5 / 10</text>
  <!-- Note -->
  <text x="340" y="385" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Ratings reflect effectiveness for factual/citation tasks.</text>
  <text x="340" y="400" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Instruction hallucination responds differently to each technique.</text>
</svg>

**Use retrieval-augmented generation for anything fact-dependent.** RAG - [explained in full here](/blog/what-is-rag-retrieval-augmented-generation) - grounds the model's output in actual retrieved documents rather than relying on parameterized memory. If you're researching current events, market data, or any domain with recent developments, use a search-grounded tool. [Perplexity](/review/perplexity) does this by default. ChatGPT with web browsing enabled does too, though with more inconsistency in my testing.

**Prompt the model to cite its sources.** This doesn't eliminate hallucination, but it surfaces it. When you ask a model to cite where a claim comes from, it either produces a verifiable source (which you can check) or it signals uncertainty by hedging. The models I've tested for [how to use ChatGPT effectively](/blog/how-to-use-chatgpt-effectively) all respond differently to citation prompts - some become more careful, others produce plausible-looking fake citations. Either way, the output is more actionable.

**Prefer search-grounded tools for source citation tasks.** For research tasks, I've stopped asking base LLMs for citations and instead use tools that retrieve before they generate. The reduction in citation hallucination is dramatic - easily 70-80% fewer fabricated references in my workflow.

**Lower the temperature for factual tasks.** Temperature controls how much randomness is injected into token selection. Lower temperature means the model picks higher-probability tokens, which tends to reduce hallucination for well-documented topics. In the API, setting temperature to 0.2 or lower for factual retrieval tasks is a simple lever that costs nothing.

**Ask the model to check itself.** Self-consistency prompting involves asking the model to answer a question multiple times and flagging disagreements. This works better than it sounds. If you ask "give me three separate answers to this question" and all three diverge, that divergence is itself a signal to verify.

**Use [fine-tuning](/blog/what-is-fine-tuning-in-ai) for specialized domains.** For organizations using AI in domains with specialized vocabularies - law, medicine, finance - fine-tuning on domain-specific corpora can reduce hallucination on domain-specific facts. This is expensive, but for high-stakes use cases the investment makes sense.

**Know which tasks are high-risk.** My personal high-risk list: citations and sources, specific statistics and market data, recent events (post-knowledge cutoff), niche technical specs, and regulatory rules that vary by jurisdiction. For these, I either verify independently or don't use AI output as a primary source.

Tools like [AI agents](/blog/best-ai-agents-2026) that chain multiple steps together can compound hallucination - if step 1 produces a hallucinated fact, steps 2 through 5 may build on it confidently. Understanding [what AI agents actually do](/blog/what-is-an-ai-agent) helps you see where verification needs to happen in the chain.

---

## The Ongoing Research to Fix Hallucination

The research community has not solved hallucination - but several approaches are making meaningful progress.

<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="360" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Research Approaches to Hallucination</text>
  <!-- Approach cards as horizontal strips -->
  <!-- RAG research -->
  <rect x="30" y="60" width="620" height="52" rx="10" fill="#DDD8CE"/>
  <rect x="30" y="60" width="8" height="52" rx="4" fill="#6B7C5E"/>
  <text x="56" y="82" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#4A5942">Retrieval Augmentation</text>
  <text x="56" y="100" font-family="Georgia, serif" font-size="11" fill="#3A3228">Ground generation in retrieved documents. Strongest current approach for factual accuracy. Widely deployed.</text>
  <!-- Constitutional AI -->
  <rect x="30" y="124" width="620" height="52" rx="10" fill="#DDD8CE"/>
  <rect x="30" y="124" width="8" height="52" rx="4" fill="#6B7C5E"/>
  <text x="56" y="146" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#4A5942">Constitutional AI (Anthropic)</text>
  <text x="56" y="164" font-family="Georgia, serif" font-size="11" fill="#3A3228">Model critiques its own outputs using a set of principles. Reduces sycophancy and overconfidence. Active research.</text>
  <!-- Calibration training -->
  <rect x="30" y="188" width="620" height="52" rx="10" fill="#DDD8CE"/>
  <rect x="30" y="188" width="8" height="52" rx="4" fill="#96845A"/>
  <text x="56" y="210" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#4A5942">Uncertainty Calibration</text>
  <text x="56" y="228" font-family="Georgia, serif" font-size="11" fill="#3A3228">Train models to express uncertainty accurately. Harder than it sounds - requires reward signal for "I don't know".</text>
  <!-- Factuality RLHF -->
  <rect x="30" y="252" width="620" height="52" rx="10" fill="#DDD8CE"/>
  <rect x="30" y="252" width="8" height="52" rx="4" fill="#96845A"/>
  <text x="56" y="274" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#4A5942">Factuality-Focused RLHF</text>
  <text x="56" y="292" font-family="Georgia, serif" font-size="11" fill="#3A3228">Include factual accuracy in human rater criteria. Early results promising but slow to scale across domains.</text>
  <!-- Bottom note -->
  <text x="340" y="338" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">No single approach has eliminated hallucination. Combining methods gives best results.</text>
</svg>

**Constitutional AI**, developed by Anthropic, is one of the most promising structural approaches. Rather than only rewarding helpful responses from human raters, [Constitutional AI](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback) asks the model itself to evaluate its outputs against a set of principles - including accuracy principles. The model critiques its own responses and revises them.

This doesn't eliminate hallucination. But it reduces a specific pattern: sycophantic confabulation, where the model generates an answer it thinks the user wants rather than an answer it can support.

**Factuality-tuned RLHF** is an active area of research. Standard [RLHF](/blog/what-is-rlhf) optimizes for human preference, and human raters often prefer confident, fluent responses even when they're wrong. Factuality-focused RLHF modifies the reward function to penalize factual errors explicitly - but this requires raters who can actually verify facts, which is expensive to scale.

**Uncertainty calibration research** focuses on a different goal: not eliminating wrong answers, but making models accurately signal when they don't know something. A model that says "I'm not certain about this" when it's wrong is much safer than one that says "The answer is X" with equal confidence for both correct and fabricated outputs.

The TruthfulQA paper I linked above is the foundational benchmarking work here. But the gap between benchmark performance and production behavior remains large. Models that perform well on TruthfulQA still hallucinate on tasks outside the benchmark's scope.

**Knowledge graph integration** is a less-discussed approach that some enterprise AI deployments have explored. Rather than relying purely on parametric memory from pretraining, these systems ground responses against structured knowledge bases. The challenge is coverage - knowledge graphs are expensive to build and maintain, and don't cover the long tail of queries that enterprise users actually ask.

What I expect to see over the next 18 months: search-grounded generation becoming the default for factual tasks, with base LLMs positioned as reasoning and synthesis layers rather than retrieval layers. The [prompt engineering](/blog/what-is-prompt-engineering) discipline will evolve accordingly - the prompts that matter most will be the ones that tell the model when to retrieve versus when to reason from learned knowledge.

The [embedding models](/blog/what-is-embedding-in-ai) that power semantic retrieval are also improving rapidly. Better embeddings mean better retrieval, which means RAG systems can find more relevant context more reliably - directly reducing the gap that hallucination fills.

If you want to stay current on hallucination benchmarks and mitigation research, the [AI Tools Reality Check study](/studies/2026-ai-tools-reality-check) tracks these numbers as new models release. And if you're comparing specific models on reliability, the [compare tool](/tools/compare) lets you see how different models stack up on the tasks you actually care about.

Hallucination is not going to disappear in the next model release. But it is becoming measurable, manageable, and - for most practical use cases - workable. The practitioners who treat it as a known workflow variable rather than a surprising failure mode will get more value out of AI tools than those who either dismiss it or let it derail them entirely.

---

## Frequently Asked Questions

**Is hallucination the same as lying?**

No - and this distinction matters. A lie requires intent to deceive. An AI model has no beliefs, no intent, and no awareness of the difference between true and false output. When a model hallucinates, it is producing the statistically most likely continuation of text given its training. It is not trying to deceive you. The failure is architectural, not moral.

**Why do AI models sound so confident when they're wrong?**

Because confidence and accuracy are not linked in language model training. The model learns to produce fluent, authoritative-sounding text because that is what most of its training data looks like. Uncertainty hedges like "I'm not sure" are learned behaviors that have to be explicitly trained and rewarded. Without that training, the default output register is confident.

**Which AI model hallucinates the least?**

No model is definitively "best" across all tasks, and hallucination rates vary significantly by domain and query type. In my testing, search-grounded models like Perplexity hallucinate less on factual queries than base LLMs. Among base models, Claude Opus 4.8 showed better calibration - meaning it hedged more when uncertain - in my comparison testing. You can see the [Claude Opus 4.8 vs GPT-5.5 comparison](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) for detail on this.

**Does RAG completely solve hallucination?**

Retrieval-augmented generation dramatically reduces factual hallucination for topics with good source coverage. It does not eliminate it entirely. The model still has to correctly interpret retrieved documents, and can still confabulate details within retrieved context. It also does not help with instruction hallucination, where the model drifts from your specified constraints.

**Can I detect hallucination automatically?**

Partially. Several automated fact-checking approaches exist - asking the model to regenerate with chain-of-thought reasoning, prompting it to cite sources, or using a second model to verify claims. None of these are reliable enough to replace human verification for high-stakes output. For now, the most reliable detection method remains a human checking claims against authoritative sources.

**Does hallucination happen in code generation too?**

Yes, though it looks different. In code, hallucination typically manifests as fabricated API methods, non-existent library functions, or wrong parameter names. The [best AI coding tools](/best-of/best-ai-code-assistants) have reduced this significantly through training on more accurate API documentation, but it still occurs - especially for niche libraries with sparse training data. Always run AI-generated code before treating it as functional.

**Will hallucination be solved in future models?**

The direction of research suggests meaningful reduction rather than elimination. Better retrieval integration, improved calibration training, and factuality-focused RLHF are all making progress. But some degree of hallucination is likely intrinsic to the probabilistic nature of language model generation. The practical goal is reaching hallucination rates low enough that good workflows can catch and correct errors before they cause harm.

**How does hallucination affect AI agents specifically?**

Hallucination in [AI agents](/blog/what-is-an-ai-agent) is compounding. If an agent hallucinates a fact in step 1 of a multi-step task, subsequent steps may build on that false premise confidently. This is one reason [agentic AI](/blog/ai-agents-vs-agentic-ai) systems require more careful verification design than single-turn chat interfaces. Each step that depends on prior output is another opportunity for error to propagate and amplify.
