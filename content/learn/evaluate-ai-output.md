---
title: "How to Evaluate AI Output Quality"
description: "A methodology for assessing AI output: factual accuracy, instruction following, format quality, and consistency across runs. Includes a scoring rubric."
publishDate: "2026-06-24"
category: "AI Frameworks"
lastUpdated: "2026-06-24"
slug: "/learn/evaluate-ai-output"
author: "Ash"
---


Evaluating AI output quality means systematically measuring whether a model's response is accurate, follows instructions, stays consistent, and delivers the right format - before you trust it in production.

That last part matters. Most teams I talk to are still making AI tool decisions based on demos, Reddit threads, or a couple of test queries. That's not evaluation. That's vibes. And vibes don't hold up when the model starts hallucinating your client's product specs into a sales proposal.

I spent several months building and refining a personal evaluation methodology across dozens of tools. Some of what I built was good from the start. A lot of it was wrong, and I'll tell you exactly where. The method I'm sharing here is the one that actually survived contact with real use cases.

---

## Why Benchmark Scores Don't Tell You What You Need to Know

Benchmark scores measure performance on standardized tests - not on your actual tasks, your prompts, or your edge cases.

This sounds obvious when you say it out loud. But the AI industry has gotten very good at making benchmark scores feel like the whole story. A model scores 92% on MMLU and 87% on HumanEval, and suddenly it's positioned as the best reasoning model for enterprise use. That framing collapses the moment you try to use it for something specific.

Here's what I found when I started cross-referencing benchmark rankings against my own test results: the correlation is real but loose. A model in the top tier on MMLU is probably better than a model at the bottom tier. But among the top five or six models on any given leaderboard - the ones you're actually choosing between - benchmark scores tell you very little about which one will perform best on your task.

The [LMSYS Chatbot Arena](https://lmarena.ai/) is one of the more honest benchmarks out there because it uses blind human preference voting. It measures something real - which output humans prefer - rather than multiple-choice accuracy. Even there, the rankings shift significantly depending on the category you filter by.

<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="340" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">What Benchmarks Measure vs. What You Need</text>
  <!-- Two column layout -->
  <!-- Left column header -->
  <rect x="40" y="52" width="270" height="36" rx="8" fill="#6B7C5E"/>
  <text x="175" y="75" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Standard Benchmarks</text>
  <!-- Right column header -->
  <rect x="370" y="52" width="270" height="36" rx="8" fill="#96845A"/>
  <text x="505" y="75" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Your Real Evaluation Needs</text>
  <!-- Row 1 -->
  <rect x="40" y="100" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="175" y="123" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Fixed test sets from public datasets</text>
  <rect x="370" y="100" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="505" y="123" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Your actual prompts and use cases</text>
  <!-- Row 2 -->
  <rect x="40" y="148" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="175" y="171" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Multiple-choice or exact-match scoring</text>
  <rect x="370" y="148" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="505" y="171" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Judgment-based quality assessment</text>
  <!-- Row 3 -->
  <rect x="40" y="196" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="175" y="219" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">One-time score, static leaderboard</text>
  <rect x="370" y="196" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="505" y="219" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Consistency across repeated runs</text>
  <!-- Row 4 -->
  <rect x="40" y="244" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="175" y="267" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">General-purpose academic tasks</text>
  <rect x="370" y="244" width="270" height="38" rx="6" fill="#DDD8CE"/>
  <text x="505" y="267" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Domain-specific edge cases</text>
  <!-- Bottom note -->
  <text x="340" y="308" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Benchmark rank and task-specific quality often diverge in the top tier</text>
</svg>

Where I was wrong early on: I assumed that benchmark contamination was a niche concern. It's not. Several models have been caught training on benchmark test sets, which inflates their scores without improving their real-world behavior. The [MT-Bench paper from LMSYS](https://arxiv.org/abs/2306.05685) explicitly addresses this and is still the clearest academic treatment of AI evaluation methodology I've found.

The benchmark problem also applies to tool reviews - including my own early ones. I've since updated how we score tools at RawPickAI after realizing our initial methodology was too reliant on published numbers. You can read more about our [current methodology here](/methodology).

The bottom line: benchmarks are a starting point for eliminating obviously weak models, not a finishing point for making real decisions. Everything after that requires your own testing.

---

## The 5 Dimensions of AI Output Quality

AI output quality is not one thing - it is five distinct properties that can diverge significantly from each other even in the same model.

I learned this the hard way when I was evaluating tools for [our 2026 AI tools reality check study](/studies/2026-ai-tools-reality-check). A model I thought was excellent at writing turned out to be deeply inconsistent. A model I'd written off for creative tasks was extraordinary at following complex formatting instructions. Once I separated quality into its component dimensions, patterns started emerging that a single overall score would have buried.

Here are the five dimensions I use:

**1. Factual Accuracy** - Is the information in the output actually true? This includes not just obvious facts but subtle claims, statistics, dates, attributions, and technical details. The [hallucination problem](/blog/what-is-hallucination-in-ai) lives here.

**2. Instruction Following** - Did the model do what you asked? This is different from accuracy. A model can produce accurate text that doesn't follow your format, length, tone, or structural requirements. Instruction following measures compliance with the explicit task, not just the content quality.

**3. Consistency** - If you run the same prompt ten times, do you get outputs of similar quality each time? High variance is a real problem in production. A model with a 7/10 average but a 4-to-10 range is harder to work with than a model that reliably delivers 6/10.

**4. Format Quality** - Is the output structured, scannable, and appropriate for its intended use? This includes heading hierarchy, list usage, paragraph length, code block formatting, and whether the structure matches the task type.

**5. Relevance** - Does the output stay focused on what was asked, or does it drift into tangential content, unnecessary caveats, and padding? Relevance is especially important for long-form outputs where models tend to fill space with hedges and restatements.

<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="380" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">5 Dimensions of AI Output Quality</text>
  <!-- Radar / spoke layout with 5 labeled spokes -->
  <!-- Center -->
  <circle cx="340" cy="210" r="8" fill="#6B7C5E"/>
  <!-- Outer pentagon approximation - 5 points at 72° increments, starting top -->
  <!-- Top: Factual Accuracy -->
  <line x1="340" y1="202" x2="340" y2="80" stroke="#DDD8CE" stroke-width="1.5"/>
  <circle cx="340" cy="80" r="6" fill="#6B7C5E"/>
  <text x="340" y="62" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">Factual Accuracy</text>
  <!-- Top-right: Instruction Following (72°) -->
  <line x1="340" y1="202" x2="455" y2="120" stroke="#DDD8CE" stroke-width="1.5"/>
  <circle cx="455" cy="120" r="6" fill="#96845A"/>
  <text x="484" y="113" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="start">Instruction</text>
  <text x="484" y="129" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="start">Following</text>
  <!-- Bottom-right: Consistency (144°) -->
  <line x1="340" y1="202" x2="430" y2="305" stroke="#DDD8CE" stroke-width="1.5"/>
  <circle cx="430" cy="305" r="6" fill="#6B7C5E"/>
  <text x="444" y="302" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="start">Consistency</text>
  <!-- Bottom-left: Format Quality (216°) -->
  <line x1="340" y1="202" x2="250" y2="305" stroke="#DDD8CE" stroke-width="1.5"/>
  <circle cx="250" cy="305" r="6" fill="#96845A"/>
  <text x="236" y="302" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">Format Quality</text>
  <!-- Top-left: Relevance (288°) -->
  <line x1="340" y1="202" x2="225" y2="120" stroke="#DDD8CE" stroke-width="1.5"/>
  <circle cx="225" cy="120" r="6" fill="#6B7C5E"/>
  <text x="214" y="113" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="end">Relevance</text>
  <!-- Center label -->
  <text x="340" y="228" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Quality</text>
  <!-- Bottom note -->
  <text x="340" y="358" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Each dimension can score differently - a model strong on accuracy</text>
  <text x="340" y="372" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">may be weak on consistency or format</text>
</svg>

These five dimensions are not equally important for every task. For a legal research tool, factual accuracy and instruction following dominate. For a content drafting assistant, format quality and relevance matter more. For a production API integration, consistency may be the single most important factor because a flaky model is worse than a merely decent one.

When I look at the [best AI coding tools](/blog/best-ai-coding-tools-2026) specifically, I weight instruction following and consistency heavily because code has to be exactly right - a creative approximation is a bug.

The key move is deciding your dimension weights before you start testing, not after. If you pick weights after seeing the results, you'll unconsciously pick the weights that favor the model you already liked. That's not evaluation, that's rationalization.

---

## Building Your Own Evaluation Test Suite (The 20-Prompt Method)

A good evaluation test suite for AI output quality is a set of 20 prompts that together cover your most important use cases, your edge cases, and at least two adversarial inputs designed to break the model.

Twenty prompts is not a magic number. I arrived at it through iteration. Fewer than fifteen and you don't have enough signal to distinguish real patterns from noise. More than thirty and you hit diminishing returns on insight while significantly increasing the time cost of re-running the suite when you want to compare models. Twenty is the practical sweet spot for individual evaluators and small teams.

Here is how I structure the 20 prompts:

**Core task prompts (8 prompts)** - These are the prompts that represent your highest-frequency real-world tasks. If you're evaluating a tool for writing blog posts, these are eight representative blog post prompts across different topics, tones, and lengths. If you're evaluating a [coding assistant](/blog/best-ai-coding-tools-2026), these are eight representative code generation or debugging prompts.

**Format stress tests (4 prompts)** - These prompts have very specific formatting requirements: exact word counts, particular heading structures, specific output schemas, or unusual constraints. These reveal whether the model is actually following instructions or producing something that happens to match your instructions by coincidence.

**Edge cases (4 prompts)** - These cover scenarios you expect to come up rarely but that matter a lot when they do. Ambiguous requests, conflicting instructions, very long inputs, or domain-specific terminology that a generalist model might mishandle.

**Adversarial prompts (2 prompts)** - These are prompts designed to find failure modes. One that asks for information that's likely to trigger a confident hallucination. One that asks the model to do something that requires it to say "I don't know" or push back - and you're checking whether it does that gracefully or confabulates instead.

**Consistency check (2 prompts)** - These are two prompts you run three times each, not just once. The triple run is how you measure output variance. A model that gives you a great answer once but a mediocre answer the second and third time has a consistency problem you'd never catch with a single run.

<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="360" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">The 20-Prompt Test Suite Structure</text>
  <!-- Horizontal stacked bar sections -->
  <!-- Label column -->
  <text x="38" y="86" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="start">Core Tasks</text>
  <text x="38" y="136" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="start">Format Tests</text>
  <text x="38" y="186" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="start">Edge Cases</text>
  <text x="38" y="236" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="start">Adversarial</text>
  <text x="38" y="286" font-family="Georgia, serif" font-size="12" fill="#3A3228" text-anchor="start">Consistency</text>
  <!-- Bar track -->
  <rect x="155" y="68" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="155" y="68" width="384" height="28" rx="6" fill="#6B7C5E"/>
  <text x="347" y="87" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">8 prompts - 40%</text>
  <rect x="155" y="118" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="155" y="118" width="192" height="28" rx="6" fill="#96845A"/>
  <text x="251" y="137" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">4 prompts - 20%</text>
  <rect x="155" y="168" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="155" y="168" width="192" height="28" rx="6" fill="#6B7C5E"/>
  <text x="251" y="187" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">4 prompts - 20%</text>
  <rect x="155" y="218" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="155" y="218" width="96" height="28" rx="6" fill="#96845A"/>
  <text x="203" y="237" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">2 - 10%</text>
  <rect x="155" y="268" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="155" y="268" width="96" height="28" rx="6" fill="#6B7C5E"/>
  <text x="203" y="287" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">2 - 10%</text>
  <!-- Total label -->
  <text x="340" y="330" font-family="Georgia, serif" font-size="12" fill="#4A5942" text-anchor="middle" font-weight="bold">Total: 20 prompts (+ 4 repeat runs for consistency checks)</text>
  <text x="340" y="348" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Run the full suite on each model you're comparing</text>
</svg>

The mistake I made in my early evaluations was building task-specific test suites from scratch for every tool. That was unsustainable. The better move is to build one canonical test suite for each major use category you care about - writing, coding, research, summarization - and reuse it every time.

Store your test prompts in a plain text file or spreadsheet alongside the expected outputs or evaluation criteria. When a new model drops, you run the same suite. Your scores become directly comparable over time.

One thing I've watched [AI agent tools](/blog/what-is-an-ai-agent) struggle with that simpler models don't: multi-step consistency. An agent that's reasonably reliable on single prompts often shows compounding errors over a five-step task. For agents, I add a sixth prompt category: two multi-step tasks where I track error rates across each step, not just at the final output.

---

## How to Score Outputs Without Losing Your Mind

A scalable AI output scoring rubric applies consistent, pre-defined criteria to each dimension - and is simple enough that you can actually complete a full evaluation in under two hours.

The key word is consistent. The biggest failure mode in human evaluation is criteria drift, where you start scoring generously and get stricter as you go, or vice versa. Or you unconsciously apply different standards to different models because you already have a preference. The rubric exists to fight these biases.

I use a 1-to-5 scale for each of the five dimensions. Here's exactly what each score means:

**Factual Accuracy**
- 5: All verifiable claims are correct. No hallucinations detected on spot-check.
- 4: Minor inaccuracies in peripheral details. Core claims are correct.
- 3: At least one significant factual error, but main thrust is defensible.
- 2: Multiple significant errors, or one error that materially misleads.
- 1: Output is predominantly wrong, fabricated, or contradicts known facts.

**Instruction Following**
- 5: All specified requirements met - format, length, tone, constraints, structure.
- 4: Most requirements met. One minor deviation that doesn't affect usability.
- 3: Core task completed but meaningful requirements missed (wrong length, wrong format).
- 2: Several requirements ignored. Output needs significant rework to be usable.
- 1: Fundamental requirements not met. Model produced something different from what was asked.

**Consistency** (scored after three runs of the same prompt)
- 5: All three outputs are comparable quality. No run below 4/5 on other dimensions.
- 4: Two runs strong, one slightly weaker. Range stays within one point.
- 3: Noticeable variance. Best and worst runs differ by two points on key dimensions.
- 2: High variance. One run is clearly good; at least one run is poor.
- 1: Extreme variance. You cannot predict what quality you'll get on any given run.

**Format Quality**
- 5: Structure is optimal for the task. Headers, lists, paragraphs, code blocks all appropriately used.
- 4: Good structure with one unnecessary element or minor formatting oddity.
- 3: Functional but not well-structured. Reader has to work a little to parse it.
- 2: Poor structure that makes the content harder to use than it should be.
- 1: No meaningful structure. Wall of text, or structure that fights comprehension.

**Relevance**
- 5: Every sentence serves the task. No filler, no tangential content, no excessive hedging.
- 4: Mostly on-target with minor tangential content that doesn't hurt usability.
- 3: Noticeable padding or drift. Core content is there but surrounded by noise.
- 2: Significant portion of the output is not relevant to what was asked.
- 1: Output is mostly off-topic, or buried the relevant content in irrelevant material.

<svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="400" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Scoring Rubric - 5-Point Scale Per Dimension</text>
  <!-- Column headers -->
  <text x="120" y="62" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Dimension</text>
  <text x="245" y="62" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Score 1-2</text>
  <text x="390" y="62" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Score 3</text>
  <text x="545" y="62" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Score 4-5</text>
  <!-- Divider -->
  <line x1="40" y1="70" x2="640" y2="70" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Row 1: Factual Accuracy -->
  <rect x="40" y="78" width="160" height="52" rx="6" fill="#6B7C5E"/>
  <text x="120" y="101" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Factual</text>
  <text x="120" y="118" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Accuracy</text>
  <rect x="208" y="78" width="160" height="52" rx="6" fill="#DDD8CE"/>
  <text x="288" y="101" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Significant errors</text>
  <text x="288" y="116" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">or fabrications</text>
  <rect x="376" y="78" width="148" height="52" rx="6" fill="#DDD8CE"/>
  <text x="450" y="101" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">One error, core</text>
  <text x="450" y="116" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">claims defensible</text>
  <rect x="532" y="78" width="108" height="52" rx="6" fill="#DDD8CE"/>
  <text x="586" y="101" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">All claims</text>
  <text x="586" y="116" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">correct</text>
  <!-- Row 2: Instruction Following -->
  <rect x="40" y="140" width="160" height="52" rx="6" fill="#96845A"/>
  <text x="120" y="163" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Instruction</text>
  <text x="120" y="180" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Following</text>
  <rect x="208" y="140" width="160" height="52" rx="6" fill="#DDD8CE"/>
  <text x="288" y="163" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Key requirements</text>
  <text x="288" y="178" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">ignored</text>
  <rect x="376" y="140" width="148" height="52" rx="6" fill="#DDD8CE"/>
  <text x="450" y="163" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Core done, format</text>
  <text x="450" y="178" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">off</text>
  <rect x="532" y="140" width="108" height="52" rx="6" fill="#DDD8CE"/>
  <text x="586" y="163" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">All specs</text>
  <text x="586" y="178" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">met</text>
  <!-- Row 3: Consistency -->
  <rect x="40" y="202" width="160" height="52" rx="6" fill="#6B7C5E"/>
  <text x="120" y="232" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Consistency</text>
  <rect x="208" y="202" width="160" height="52" rx="6" fill="#DDD8CE"/>
  <text x="288" y="225" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">High variance,</text>
  <text x="288" y="240" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">unpredictable</text>
  <rect x="376" y="202" width="148" height="52" rx="6" fill="#DDD8CE"/>
  <text x="450" y="225" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">2-point range</text>
  <text x="450" y="240" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">across 3 runs</text>
  <rect x="532" y="202" width="108" height="52" rx="6" fill="#DDD8CE"/>
  <text x="586" y="225" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Stable across</text>
  <text x="586" y="240" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">all runs</text>
  <!-- Row 4: Format Quality -->
  <rect x="40" y="264" width="160" height="52" rx="6" fill="#96845A"/>
  <text x="120" y="287" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Format</text>
  <text x="120" y="304" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Quality</text>
  <rect x="208" y="264" width="160" height="52" rx="6" fill="#DDD8CE"/>
  <text x="288" y="287" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Poor structure,</text>
  <text x="288" y="302" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">hard to parse</text>
  <rect x="376" y="264" width="148" height="52" rx="6" fill="#DDD8CE"/>
  <text x="450" y="287" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Functional,</text>
  <text x="450" y="302" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">not optimal</text>
  <rect x="532" y="264" width="108" height="52" rx="6" fill="#DDD8CE"/>
  <text x="586" y="287" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Optimal for</text>
  <text x="586" y="302" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">task type</text>
  <!-- Row 5: Relevance -->
  <rect x="40" y="326" width="160" height="52" rx="6" fill="#6B7C5E"/>
  <text x="120" y="356" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Relevance</text>
  <rect x="208" y="326" width="160" height="52" rx="6" fill="#DDD8CE"/>
  <text x="288" y="349" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Significant filler</text>
  <text x="288" y="364" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">or off-topic drift</text>
  <rect x="376" y="326" width="148" height="52" rx="6" fill="#DDD8CE"/>
  <text x="450" y="349" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Minor padding,</text>
  <text x="450" y="364" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">core on-target</text>
  <rect x="532" y="326" width="108" height="52" rx="6" fill="#DDD8CE"/>
  <text x="586" y="349" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Every sentence</text>
  <text x="586" y="364" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">serves the task</text>
</svg>

The total score out of 25 gives you a comparable number, but I'd caution against averaging dimensions when your weights differ significantly. Instead, use a weighted score. For a writing assistant, I'd weight accuracy at 1.5x and consistency at 0.75x. For a research tool, accuracy at 2x. Define your weights up front, calculate them consistently, and the numbers will actually mean something.

One practical note: I do my first-pass scoring right after reading, before I look at any other tool's output. Comparative reading - reading Model A right next to Model B - introduces contrast effects that bias your scores. Score each output in isolation first, then compare.

---

## The Failure Modes I See Most Often - And How to Catch Them

The most common AI output failure modes follow predictable patterns, and most of them are detectable with targeted test prompts before you commit to a tool.

I've run hundreds of evaluation sessions at this point, and the same failure categories come up again and again. Knowing them in advance lets you design prompts specifically to surface them. This is the "adversarial" portion of your test suite in practice.

**Confident hallucination on low-coverage topics** - This is the one that costs people the most. Models are most likely to hallucinate on topics that are underrepresented in training data: obscure technical standards, local regulations, recent events near the knowledge cutoff, niche academic papers. The fix is to probe these areas specifically in your test suite. Ask about something you know well where a wrong answer would be obvious.

I catch this by including a question about a narrow technical topic in my domain with a known answer. If the model gets it right, I have more confidence. If it invents plausible-sounding details, I flag it immediately. This is directly connected to understanding [what hallucination is in AI](/blog/what-is-hallucination-in-ai) and how it originates from the model's token prediction process.

**Instruction override** - This is when a model ignores a specific constraint in your prompt because it thinks it knows better. You say "no bullet points" and it uses bullet points. You say "under 200 words" and it gives you 400. You say "respond only in JSON" and it adds a conversational preamble. Good [prompt engineering](/blog/what-is-prompt-engineering) reduces this, but some models are structurally worse at following constraints than others.

**Context window decay** - As a conversation or document gets longer, output quality tends to drop. This is a [context window](/blog/what-is-the-context-window) problem. The model handles the first few thousand tokens brilliantly and starts losing track of earlier instructions or key details as the context fills. Test this by giving the model a long document with a specific detail buried near the beginning, then asking about it 3,000 tokens later.

**Sycophancy** - This is when a model adjusts its answer based on what it thinks you want to hear rather than what's accurate. The classic test: give the model a wrong premise in your prompt ("As we know, the French Revolution began in 1802...") and see if it corrects you or accepts the bad framing. Models trained heavily with [RLHF](/blog/what-is-rlhf) can develop this failure mode because human raters often prefer agreeable-sounding answers.

**Over-hedging** - Some models have been trained to be so cautious that they hedge every claim to uselessness. "It might be the case that, depending on various factors, some people believe that..." is not useful output. A model that can't make a clear claim without four qualifying clauses is a relevance and format failure, even if the underlying information is correct.

<svg viewBox="0 0 680 390" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="390" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">Failure Mode Taxonomy</text>
  <!-- Taxonomy tree-style layout -->
  <!-- Root -->
  <rect x="250" y="52" width="180" height="40" rx="8" fill="#6B7C5E"/>
  <text x="340" y="77" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Output Failures</text>
  <!-- Branch lines from root -->
  <line x1="340" y1="92" x2="340" y2="116" stroke="#8A8577" stroke-width="1.5"/>
  <line x1="340" y1="116" x2="130" y2="116" stroke="#8A8577" stroke-width="1.5"/>
  <line x1="340" y1="116" x2="550" y2="116" stroke="#8A8577" stroke-width="1.5"/>
  <line x1="130" y1="116" x2="130" y2="134" stroke="#8A8577" stroke-width="1.5"/>
  <line x1="280" y1="116" x2="280" y2="134" stroke="#8A8577" stroke-width="1.5"/>
  <line x1="400" y1="116" x2="400" y2="134" stroke="#8A8577" stroke-width="1.5"/>
  <line x1="550" y1="116" x2="550" y2="134" stroke="#8A8577" stroke-width="1.5"/>
  <!-- Level 1 nodes: 4 categories -->
  <rect x="60" y="134" width="140" height="44" rx="8" fill="#96845A"/>
  <text x="130" y="153" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Accuracy</text>
  <text x="130" y="169" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Failures</text>
  <rect x="210" y="134" width="140" height="44" rx="8" fill="#96845A"/>
  <text x="280" y="153" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Compliance</text>
  <text x="280" y="169" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Failures</text>
  <rect x="330" y="134" width="140" height="44" rx="8" fill="#96845A"/>
  <text x="400" y="153" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Reliability</text>
  <text x="400" y="169" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Failures</text>
  <rect x="480" y="134" width="140" height="44" rx="8" fill="#96845A"/>
  <text x="550" y="153" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Quality</text>
  <text x="550" y="169" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Failures</text>
  <!-- Level 2 sub-nodes -->
  <line x1="130" y1="178" x2="130" y2="210" stroke="#8A8577" stroke-width="1.2"/>
  <rect x="60" y="210" width="140" height="36" rx="6" fill="#DDD8CE"/>
  <text x="130" y="226" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Hallucination</text>
  <text x="130" y="240" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Sycophancy</text>
  <line x1="280" y1="178" x2="280" y2="210" stroke="#8A8577" stroke-width="1.2"/>
  <rect x="210" y="210" width="140" height="36" rx="6" fill="#DDD8CE"/>
  <text x="280" y="226" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Instruction</text>
  <text x="280" y="240" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Override</text>
  <line x1="400" y1="178" x2="400" y2="210" stroke="#8A8577" stroke-width="1.2"/>
  <rect x="330" y="210" width="140" height="36" rx="6" fill="#DDD8CE"/>
  <text x="400" y="226" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Context Decay</text>
  <text x="400" y="240" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">High Variance</text>
  <line x1="550" y1="178" x2="550" y2="210" stroke="#8A8577" stroke-width="1.2"/>
  <rect x="480" y="210" width="140" height="36" rx="6" fill="#DDD8CE"/>
  <text x="550" y="226" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Over-Hedging</text>
  <text x="550" y="240" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Off-Topic Drift</text>
  <!-- Detection guidance -->
  <rect x="40" y="272" width="600" height="28" rx="8" fill="#DDD8CE"/>
  <text x="340" y="291" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Each failure type requires a specific test prompt to reliably surface it</text>
  <!-- Catch method boxes -->
  <rect x="40" y="310" width="140" height="52" rx="6" fill="#F4F1EA"/>
  <rect x="40" y="310" width="140" height="52" rx="6" fill="none" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="110" y="330" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Catch with:</text>
  <text x="110" y="348" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Wrong-premise</text>
  <text x="110" y="362" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">prompts</text>
  <rect x="190" y="310" width="140" height="52" rx="6" fill="none" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="260" y="330" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Catch with:</text>
  <text x="260" y="348" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Constraint-heavy</text>
  <text x="260" y="362" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">format prompts</text>
  <rect x="340" y="310" width="140" height="52" rx="6" fill="none" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="410" y="330" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Catch with:</text>
  <text x="410" y="348" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Long-context</text>
  <text x="410" y="362" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">recall prompts</text>
  <rect x="490" y="310" width="150" height="52" rx="6" fill="none" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="565" y="330" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Catch with:</text>
  <text x="565" y="348" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Triple-run</text>
  <text x="565" y="362" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">variance check</text>
</svg>

One failure mode I didn't expect to find as often as I did: format pollution from retrieval. Tools that use [RAG - retrieval-augmented generation](/blog/what-is-rag-retrieval-augmented-generation) sometimes pull in source text with inconsistent formatting and pass that noise into the output. The output looks sloppy not because the model is bad at formatting but because the retrieved chunks are. If you're evaluating a RAG-based tool, probe this specifically by asking questions where the answer requires synthesizing multiple retrieved chunks.

The sycophancy test is one I always run now because it has surprised me more than any other. Several highly-rated models will agree with a factually incorrect premise if you state it confidently enough. That's a serious problem for any use case where you're relying on the model to catch your mistakes.

---

## Automated Evaluation vs Human Evaluation - When to Use Each

Automated evaluation scales across hundreds of prompts quickly; human evaluation catches subtle quality problems that automated systems consistently miss.

The choice between them is not either/or. The question is which to use at which stage and for which dimensions. I've spent time testing both approaches - running the same 20-prompt test suite through automated LLM-as-judge scoring and through my own human scoring - and the correlation is real but imperfect.

Automated evaluation works well for:

- **Instruction following on structured outputs** - If you asked for JSON and the output is valid JSON, you can check that programmatically. If you asked for exactly 200 words, you can count. These are binary or near-binary checks that don't require judgment.

- **Regression testing** - Once you've established baseline human scores, automated evaluation can quickly flag when a model update degrades performance. You don't need human scoring to catch a regression; you need it to establish the baseline.

- **Scale** - If you're evaluating 50 prompts across 8 models, that's 400 outputs to score. Human scoring at that scale is time-prohibitive. Automated scoring with LLM judges (GPT-4 or Claude scoring the outputs of other models) is now a real practice with decent inter-rater reliability.

Human evaluation is irreplaceable for:

- **Subtlety** - Nuanced writing quality, appropriate tone, whether a claim feels plausible even if you can't immediately verify it. Automated evaluators miss things that any competent human reader would catch.

- **Adversarial cases** - Particularly sycophancy. An LLM judge is often just as susceptible to sycophancy as the model being evaluated. It will tend to rate agreeable-sounding outputs higher.

- **New task types** - When you're building rubrics for an unfamiliar use case, human evaluation has to come first. You can't automate what you haven't yet defined.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="320" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">When to Use Automated vs Human Evaluation</text>
  <!-- Two columns -->
  <!-- Automated column -->
  <rect x="40" y="52" width="280" height="36" rx="8" fill="#6B7C5E"/>
  <text x="180" y="75" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Automated Evaluation</text>
  <!-- Human column -->
  <rect x="360" y="52" width="280" height="36" rx="8" fill="#96845A"/>
  <text x="500" y="75" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Human Evaluation</text>
  <!-- Automated items -->
  <rect x="40" y="100" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="180" y="123" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Structured output validation</text>
  <rect x="40" y="146" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="180" y="169" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Regression testing at scale</text>
  <rect x="40" y="192" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="180" y="215" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Word count / format checks</text>
  <rect x="40" y="238" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="180" y="261" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">High-volume comparative scoring</text>
  <!-- Human items -->
  <rect x="360" y="100" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="500" y="123" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Tone and nuance assessment</text>
  <rect x="360" y="146" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="500" y="169" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Sycophancy detection</text>
  <rect x="360" y="192" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="500" y="215" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">New task type rubric-building</text>
  <rect x="360" y="238" width="280" height="36" rx="6" fill="#DDD8CE"/>
  <text x="500" y="261" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Adversarial prompt review</text>
  <!-- Bottom note -->
  <text x="340" y="300" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Best practice: human evaluation first, automated for regression and scale</text>
</svg>

The workflow I've settled on: human scoring for the first evaluation cycle, then automated scoring for subsequent cycles using the human scores as calibration anchors. If the automated scores diverge significantly from the human baseline on the same prompts, that's a signal I need to recalibrate my automated judge.

For teams evaluating [AI agents](/blog/what-is-an-ai-agent) rather than single-turn models, the automation calculus shifts. Agent evaluation often requires checking intermediate steps, not just final outputs. Automating intermediate-step evaluation is hard and expensive, which means human evaluation stays more central for agent workflows even at scale.

If you're deciding whether to invest in [cloud AI vs local AI](/blog/when-to-use-cloud-ai-vs-local-ai) for evaluation infrastructure, note that running LLM-as-judge evaluations locally is now practical for many teams. Local models like Llama 3.1 70B have decent inter-rater reliability for instruction-following and format checks, though they still lag on subtle quality distinctions.

---

## How RawPickAI Evaluates Tools - Our Methodology

RawPickAI's tool evaluation methodology applies the five-dimension rubric to a standardized 20-prompt test suite, weighted by the tool category, and cross-references the results against real-world user reports.

I want to be specific about this because "methodology" can mean anything from a rigorous protocol to "we tried it for a week." Here's what ours actually involves.

Every tool we review gets run through the same category-specific test suite. We maintain four suites: writing and content creation, coding and development, research and information retrieval, and general productivity. When a new tool launches, we select the suite that best matches its primary use case.

The five dimensions are scored by two evaluators independently and then compared. Where scores differ by more than one point, we discuss until we reach agreement. This reduces individual rater bias and catches cases where one evaluator missed something. If you've read our [comparison of Claude Opus 4.8 vs GPT-5.5](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026), you can see this methodology in action - that article was the first where we ran full parallel scoring.

We also track consistency over time. A tool that scores well in month one but degrades after a model update gets flagged. This is particularly relevant for tools that sit on top of underlying models they don't control - the API changes under them and the tool's effective quality changes without any visible product update.

For tools like [Cursor](/review/cursor) and [Perplexity](/review/perplexity), we run extended sessions that go beyond the 20-prompt suite because these tools have session-level behaviors - context persistence, memory, multi-turn coherence - that a 20-prompt snapshot doesn't capture.

<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="340" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="#4A5942" text-anchor="middle">RawPickAI Evaluation Pipeline</text>
  <!-- Pipeline stages left to right -->
  <!-- Stage 1 -->
  <rect x="30" y="68" width="110" height="80" rx="10" fill="#6B7C5E"/>
  <text x="85" y="100" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Select</text>
  <text x="85" y="116" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Test Suite</text>
  <text x="85" y="136" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">(by category)</text>
  <!-- Arrow -->
  <line x1="140" y1="108" x2="162" y2="108" stroke="#8A8577" stroke-width="2"/>
  <polygon points="162,103 172,108 162,113" fill="#8A8577"/>
  <!-- Stage 2 -->
  <rect x="172" y="68" width="110" height="80" rx="10" fill="#6B7C5E"/>
  <text x="227" y="100" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Run 20</text>
  <text x="227" y="116" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Prompts</text>
  <text x="227" y="136" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">(+ 4 repeat runs)</text>
  <!-- Arrow -->
  <line x1="282" y1="108" x2="304" y2="108" stroke="#8A8577" stroke-width="2"/>
  <polygon points="304,103 314,108 304,113" fill="#8A8577"/>
  <!-- Stage 3 -->
  <rect x="314" y="68" width="110" height="80" rx="10" fill="#96845A"/>
  <text x="369" y="100" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Dual</text>
  <text x="369" y="116" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Score</text>
  <text x="369" y="136" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">(2 evaluators)</text>
  <!-- Arrow -->
  <line x1="424" y1="108" x2="446" y2="108" stroke="#8A8577" stroke-width="2"/>
  <polygon points="446,103 456,108 446,113" fill="#8A8577"/>
  <!-- Stage 4 -->
  <rect x="456" y="68" width="110" height="80" rx="10" fill="#96845A"/>
  <text x="511" y="100" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Cross-check</text>
  <text x="511" y="116" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">User Reports</text>
  <text x="511" y="136" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">(real-world)</text>
  <!-- Arrow -->
  <line x1="566" y1="108" x2="588" y2="108" stroke="#8A8577" stroke-width="2"/>
  <polygon points="588,103 598,108 588,113" fill="#8A8577"/>
  <!-- Stage 5 -->
  <rect x="598" y="68" width="52" height="80" rx="10" fill="#6B7C5E"/>
  <text x="624" y="101" font-family="Georgia, serif" font-size="10" font-weight="bold" fill="#F4F1EA" text-anchor="middle">Final</text>
  <text x="624" y="117" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Score</text>
  <text x="624" y="133" font-family="Georgia, serif" font-size="9" fill="#DDD8CE" text-anchor="middle">/25</text>
  <!-- Category weights row -->
  <text x="340" y="192" font-family="Georgia, serif" font-size="12" font-weight="bold" fill="#4A5942" text-anchor="middle">Dimension Weights by Category</text>
  <!-- Writing weights -->
  <rect x="30" y="208" width="145" height="100" rx="8" fill="#DDD8CE"/>
  <text x="102" y="228" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Writing Tools</text>
  <text x="102" y="248" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Format: 1.5x</text>
  <text x="102" y="264" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Relevance: 1.5x</text>
  <text x="102" y="280" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Accuracy: 1x</text>
  <text x="102" y="296" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Instruction: 1x</text>
  <!-- Coding weights -->
  <rect x="184" y="208" width="145" height="100" rx="8" fill="#DDD8CE"/>
  <text x="256" y="228" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Coding Tools</text>
  <text x="256" y="248" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Instruction: 2x</text>
  <text x="256" y="264" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Consistency: 2x</text>
  <text x="256" y="280" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Accuracy: 1.5x</text>
  <text x="256" y="296" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Format: 0.5x</text>
  <!-- Research weights -->
  <rect x="338" y="208" width="145" height="100" rx="8" fill="#DDD8CE"/>
  <text x="410" y="228" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">Research Tools</text>
  <text x="410" y="248" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Accuracy: 2x</text>
  <text x="410" y="264" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Relevance: 1.5x</text>
  <text x="410" y="280" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Instruction: 1x</text>
  <text x="410" y="296" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Consistency: 1x</text>
  <!-- General weights -->
  <rect x="492" y="208" width="158" height="100" rx="8" fill="#DDD8CE"/>
  <text x="571" y="228" font-family="Georgia, serif" font-size="11" font-weight="bold" fill="#4A5942" text-anchor="middle">General Tools</text>
  <text x="571" y="248" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Equal weighting</text>
  <text x="571" y="264" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">All dimensions</text>
  <text x="571" y="280" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">scored at 1x</text>
  <text x="571" y="296" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">(baseline)</text>
</svg>

The real-world cross-check is the part I'm most proud of in this methodology. Evaluation in a lab tells you how a model performs on your specific prompts. It doesn't tell you how it performs across thousands of different user prompts with different levels of [prompt engineering skill](/blog/what-is-prompt-engineering). We collect user feedback, monitor community forums, and occasionally run user surveys as a check on our lab scores.

Where they diverge - where our lab scores say one thing and user reports say another - we investigate. Sometimes the discrepancy is because our test suite didn't capture the most common real-world use case. Sometimes it's because our prompts were too clean compared to how real users actually phrase things. Those discrepancies have improved our methodology more than anything else.

If you want to compare tools yourself before committing to a stack, our [tool comparison page](/tools/compare) lets you see our scores across dimensions side-by-side. And if you're building a multi-tool setup, the [AI tool stack guide](/blog/how-to-build-an-ai-tool-stack) covers how to think about quality requirements across different tools in the same workflow.

---

## Putting It All Together - Your First Evaluation in 3 Hours

Running a real evaluation of an AI tool for the first time is something most people overcomplicate. The process above is systematic but not slow. Here is the actual time cost:

- Building or adapting a 20-prompt test suite for your use case: 45 minutes the first time, 15 minutes for subsequent tools.
- Running the 20 prompts plus 4 consistency re-runs: 30-45 minutes depending on the tool's response speed.
- Scoring all outputs using the rubric: 45-60 minutes.
- Writing up your findings: 30 minutes.

That's roughly 2.5 to 3 hours for a complete, systematic evaluation. That's faster than reading all the blog posts and Reddit threads most people use to make the same decision - and far more accurate.

One more thing I want to address: the question of how often to re-evaluate. AI models update frequently. The model behind a tool you evaluated three months ago may have changed substantially. I re-run our full suite any time a tool announces a model update, changes its pricing in ways that affect feature availability, or shows up in user reports with significantly different behavior than our last evaluation.

If you're making high-stakes decisions about [AI ROI](/blog/how-to-calculate-roi-on-ai-tools) or [choosing between models for your business](/blog/how-to-choose-an-ai-model-for-your-business), building your own evaluation capability is not optional. Trusting someone else's scores - including ours - means trusting that their tasks align with yours, their weights match your use case, and their testing cadence is current. That's a lot to assume.

Build your own suite. Score it yourself. Re-run it. The method here is everything you need to get started.

---

## Frequently Asked Questions

**How many prompts do I need for a reliable AI evaluation?**

Twenty prompts is a practical minimum for a reliable evaluation when structured across core tasks, format tests, edge cases, adversarial inputs, and consistency checks. Below fifteen prompts you risk drawing conclusions from too little signal - one unusually good or bad output can skew your overall impression. Above thirty, the time cost increases faster than the insight gain. If you're evaluating a tool for a very narrow use case, you may get away with fewer; for broad general-purpose tools, consider going to 25-30.

**Can I trust LLM-as-judge automated scoring?**

LLM-as-judge scoring is reliable enough for regression testing and structured output validation, but should not replace human scoring for initial evaluations or for dimensions involving subtle quality judgments. The main risk is that the judge model shares failure modes with the model being evaluated - particularly sycophancy. Using a judge from a different model family than the one you're evaluating reduces this risk somewhat. Always calibrate your automated judge against human scores before relying on it independently.

**What's the difference between factual accuracy and hallucination?**

Factual accuracy is a dimension of output quality - a spectrum running from fully correct to fully wrong. Hallucination is a specific failure mode at the severe end of that spectrum, where the model produces confident, fluent, fabricated content with no grounding in real sources. You can have poor factual accuracy without hallucination (for example, a model that gets numbers slightly wrong but doesn't invent them from whole cloth). All hallucination is an accuracy failure, but not all accuracy failures are hallucination. The [detailed hallucination explainer](/blog/what-is-hallucination-in-ai) covers this distinction thoroughly.

**Should I evaluate open-source models differently than closed models?**

The evaluation rubric is the same, but there are additional dimensions worth tracking for [open-source vs closed AI](/blog/open-source-vs-closed-ai) comparisons: deployment consistency (self-hosted open-source models can vary based on quantization level and hardware), update cadence, and the behavior difference between base model and fine-tuned versions. For closed models, you're evaluating the API endpoint as a black box. For open-source, you may need to specify which version and configuration you tested, since the same model at different quantization levels can produce measurably different quality.

**How do I know if my test prompts are biased toward one model?**

The clearest signal of prompt bias is if one model consistently outperforms all others by a large margin across all categories. More subtle bias shows up when your prompts are phrased in ways that favor one model's training style - for example, very terse prompts tend to favor models trained on direct instruction-following, while elaborate contextual prompts tend to favor models trained on longer reasoning chains. To reduce bias, write prompts that represent how you actually communicate, not how you think the "best" model prefers to be prompted. Have someone else review your prompts before running the evaluation.

**How do I account for price differences when comparing models?**

The cleanest approach is to score quality first and separately, then apply a cost-effectiveness adjustment. Calculate cost per 1,000 quality-scored outputs at each model's pricing tier. The question shifts from "which model is best?" to "which model delivers the most quality per dollar at my usage volume?" Our [AI ROI calculator guide](/blog/how-to-calculate-roi-on-ai-tools) walks through this math in more detail for teams running these comparisons at scale.

**How often should I re-evaluate AI tools I'm already using?**

Re-evaluate any time a tool announces a model update, changes its pricing or tier structure in ways that affect feature availability, or generates user reports significantly diverging from your prior scores. At a minimum, I'd suggest a lightweight re-run (5-10 prompts from your core task set) every quarter. Full re-evaluation should happen at least annually. The AI space moves fast enough that a score from 18 months ago may reflect a tool that no longer exists in its prior form.
