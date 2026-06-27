---
title: "What Is Prompt Engineering?"
description: "Prompt engineering is the practice of crafting inputs to an AI model to reliably get better outputs. It's part skill, part science, all learnable."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-prompt-engineering"
author: "Ash"
---


Prompt engineering is the practice of crafting inputs to AI models so that the outputs are more accurate, more useful, and more consistent. I've been doing this - obsessively, at times embarrassingly - since early 2023, and the gap between a thoughtless prompt and a well-engineered one still surprises me.

This guide covers everything from the foundational techniques to the honest truth about where prompt engineering matters in 2026 and where it matters less than the hype suggests.

---

## What Is Prompt Engineering?

Prompt engineering is the discipline of designing, testing, and refining the text you give an AI model to get reliably better outputs. It treats AI input as something you craft rather than something you type and hope for the best.

The term sounds technical. It isn't always.

Sometimes prompt engineering is as simple as adding "explain your reasoning step by step" to a question you were already asking. Sometimes it's a structured multi-step workflow with role-setting, examples, and output format instructions.

The sophistication scales with the task.

What it never is: a magic trick. Every technique here is explainable, testable, and improvable.

That's what makes it a skill rather than guesswork.

Prompt engineering sits at the intersection of [what large language models can actually do](/blog/what-is-a-large-language-model) and what you're asking them to do. When those two things don't match - when your prompt assumes the model understands context it can't see, or expects reasoning it hasn't been asked to do - you get mediocre output.

Prompt engineering is how you close that gap.

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="320" fill="#F4F1EA" rx="12"/>
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">What Prompt Engineering Actually Is</text>

  <!-- Left box: No Engineering -->
  <rect x="40" y="60" width="180" height="200" rx="12" fill="#DDD8CE"/>
  <text x="130" y="88" font-family="sans-serif" font-size="12" font-weight="600" fill="#3A3228" text-anchor="middle">No Engineering</text>
  <rect x="56" y="100" width="148" height="30" rx="6" fill="#96845A" opacity="0.5"/>
  <text x="130" y="119" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Vague query</text>
  <text x="130" y="152" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">No context</text>
  <text x="130" y="172" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">No format</text>
  <text x="130" y="192" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">No examples</text>
  <rect x="56" y="215" width="148" height="28" rx="6" fill="#96845A" opacity="0.7"/>
  <text x="130" y="233" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Generic output</text>

  <!-- Arrow -->
  <line x1="230" y1="160" x2="290" y2="160" stroke="#8A8577" stroke-width="2"/>
  <polygon points="290,155 302,160 290,165" fill="#8A8577"/>
  <text x="266" y="150" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">add</text>
  <text x="266" y="163" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">craft</text>
  <text x="266" y="176" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">refine</text>

  <!-- Right box: With Engineering -->
  <rect x="310" y="60" width="350" height="200" rx="12" fill="#6B7C5E" opacity="0.12"/>
  <rect x="310" y="60" width="350" height="200" rx="12" fill="none" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="485" y="88" font-family="sans-serif" font-size="12" font-weight="600" fill="#4A5942" text-anchor="middle">With Prompt Engineering</text>

  <rect x="326" y="100" width="148" height="30" rx="6" fill="#6B7C5E" opacity="0.6"/>
  <text x="400" y="119" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Role + context</text>

  <rect x="484" y="100" width="160" height="30" rx="6" fill="#6B7C5E" opacity="0.6"/>
  <text x="564" y="119" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Format instructions</text>

  <rect x="326" y="148" width="148" height="30" rx="6" fill="#6B7C5E" opacity="0.4"/>
  <text x="400" y="167" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Worked examples</text>

  <rect x="484" y="148" width="160" height="30" rx="6" fill="#6B7C5E" opacity="0.4"/>
  <text x="564" y="167" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Reasoning steps</text>

  <rect x="326" y="215" width="318" height="28" rx="6" fill="#4A5942" opacity="0.8"/>
  <text x="485" y="233" font-family="sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Specific, reliable, useful output</text>

  <text x="350" y="298" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Prompt engineering is what happens between those two boxes.</text>
</svg>

The clearest definition I've found: a prompt engineer is someone who understands that an AI model is a probabilistic system that responds to its input distribution - and who designs inputs accordingly.

You don't need to know the math. But you do need to understand that the model is doing sophisticated pattern matching against everything it was trained on, and your prompt is the signal that steers where it lands in that space.

The discipline has roots in academic NLP research - papers on few-shot learning, chain-of-thought reasoning, and instruction tuning all contributed to what practitioners now call prompt engineering. But the practice outgrew the research papers quickly.

By 2024, most teams building on top of AI models were doing some version of prompt engineering whether they called it that or not.

One more framing that I find useful: think of a language model as an extremely well-read collaborator who has no memory of previous conversations and no ability to ask clarifying questions unless you explicitly tell them to. Everything they need to do their best work has to be in the prompt.

That mental model makes it intuitive why specificity matters so much - you're not having a dynamic back-and-forth, you're writing a brief.

---

## The Core Techniques That Actually Work

The core techniques in prompt engineering break into three tiers by complexity - zero-shot, few-shot, and chain-of-thought. Understanding all three is the foundation of everything else.

### Zero-Shot Prompting

This is the starting point. You give the model a task and no examples - you just ask.

"Summarize this article in three bullet points."
"Classify this email as spam or not spam."
"Write a product description for a standing desk."

Zero-shot works well for tasks the model has seen many variants of during training. It falls apart when the task is unusual, the output format matters a lot, or the model needs to handle edge cases you haven't described.

Most casual AI users only ever use zero-shot. That's why most casual AI users think AI tools are inconsistent and unreliable.

There's also an important nuance here that most beginner guides skip: zero-shot performance varies significantly by model size and training. A frontier model like Claude Opus 4.8 or GPT-5.5 handles zero-shot tasks far better than smaller models do, because they've been trained on vastly more examples of what "good" looks like across hundreds of task types.

If you're working with a smaller or more specialized model, zero-shot fails faster - and you'll reach for few-shot much sooner.

### Few-Shot Prompting

Few-shot prompting gives the model examples of what you want before asking it to do the task. The examples don't need to be huge - two or three is usually enough to establish a pattern.

Here's why this works at a fundamental level: [large language models](/blog/what-is-a-large-language-model) learn by recognizing patterns in sequences. When you provide examples in your prompt, you're not teaching the model anything new - you're activating the patterns that match your examples and steering the model's output distribution toward that format and style.

The practical implication is that example quality matters more than example quantity. One precise, representative example beats three mediocre ones.

When I was testing few-shot prompting for a classification task last year, switching from vague examples to examples that showed tricky edge cases cut my error rate roughly in half - even though I used the same number of examples.

### Chain-of-Thought Prompting

Chain-of-thought (CoT) prompting asks the model to show its reasoning process before giving an answer. The original research paper from Google (2022) showed that simply adding "Let's think step by step" to a prompt measurably improved performance on math and logical reasoning tasks.

The mechanism makes sense when you think about it. A model that has to write out its reasoning before committing to an answer is doing something similar to how humans work through problems - the act of writing out intermediate steps creates checkpoints where errors can be caught or avoided.

For [AI agents](/blog/what-is-an-ai-agent) doing multi-step tasks, chain-of-thought isn't optional. It's the structure that makes complex reasoning reliable.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="340" fill="#F4F1EA" rx="12"/>
  <text x="350" y="36" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Three Core Prompt Techniques</text>

  <!-- Zero-shot -->
  <rect x="30" y="55" width="190" height="250" rx="12" fill="#DDD8CE"/>
  <text x="125" y="80" font-family="sans-serif" font-size="13" font-weight="600" fill="#4A5942" text-anchor="middle">Zero-Shot</text>
  <text x="125" y="98" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">No examples given</text>
  <rect x="44" y="108" width="162" height="52" rx="8" fill="#F4F1EA"/>
  <text x="125" y="127" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">"Classify this email</text>
  <text x="125" y="143" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">as spam or not."</text>
  <line x1="125" y1="172" x2="125" y2="200" stroke="#8A8577" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="120,200 125,212 130,200" fill="#8A8577"/>
  <rect x="44" y="218" width="162" height="52" rx="8" fill="#96845A" opacity="0.25"/>
  <text x="125" y="238" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Works for common tasks.</text>
  <text x="125" y="254" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Unreliable on edge</text>
  <text x="125" y="267" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">cases or niche formats.</text>

  <!-- Few-shot -->
  <rect x="255" y="55" width="190" height="250" rx="12" fill="#DDD8CE"/>
  <text x="350" y="80" font-family="sans-serif" font-size="13" font-weight="600" fill="#4A5942" text-anchor="middle">Few-Shot</text>
  <text x="350" y="98" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">2-3 examples provided</text>
  <rect x="269" y="108" width="162" height="52" rx="8" fill="#F4F1EA"/>
  <text x="350" y="122" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">"Example 1: [spam]</text>
  <text x="350" y="136" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Example 2: [not spam]</text>
  <text x="350" y="150" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Now classify this:"</text>
  <line x1="350" y1="172" x2="350" y2="200" stroke="#8A8577" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="345,200 350,212 355,200" fill="#8A8577"/>
  <rect x="269" y="218" width="162" height="52" rx="8" fill="#6B7C5E" opacity="0.25"/>
  <text x="350" y="238" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">More consistent output.</text>
  <text x="350" y="254" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Example quality drives</text>
  <text x="350" y="267" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">result quality.</text>

  <!-- Chain-of-Thought -->
  <rect x="480" y="55" width="190" height="250" rx="12" fill="#DDD8CE"/>
  <text x="575" y="80" font-family="sans-serif" font-size="13" font-weight="600" fill="#4A5942" text-anchor="middle">Chain-of-Thought</text>
  <text x="575" y="98" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Reasoning shown first</text>
  <rect x="494" y="108" width="162" height="52" rx="8" fill="#F4F1EA"/>
  <text x="575" y="122" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">"Think step by step,</text>
  <text x="575" y="136" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">then give your final</text>
  <text x="575" y="150" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">answer."</text>
  <line x1="575" y1="172" x2="575" y2="200" stroke="#8A8577" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="570,200 575,212 580,200" fill="#8A8577"/>
  <rect x="494" y="218" width="162" height="52" rx="8" fill="#4A5942" opacity="0.2"/>
  <text x="575" y="238" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Best for reasoning,</text>
  <text x="575" y="254" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">math, and multi-step</text>
  <text x="575" y="267" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">analysis tasks.</text>

  <text x="350" y="318" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Most professional workflows combine all three.</text>
</svg>

Beyond these three fundamentals, there are a handful of techniques worth knowing:

**Role prompting** sets a persona or expertise frame before the task. "You are a senior tax attorney reviewing this contract for liability exposure" gives the model a different activation pattern than "review this contract." It's not always necessary, but for specialized domains it consistently helps.

**Self-consistency** runs the same prompt multiple times and aggregates or votes on the best answer. It sounds expensive - it is, slightly - but for high-stakes outputs it's one of the most reliable quality improvements you can make.

**ReAct (Reason + Act)** interleaves reasoning and action in a loop, which is how most modern [AI agents](/blog/what-is-an-ai-agent) are structured. The model thinks, acts, observes the result, thinks again. This is the architecture underneath [many of the best AI agents in 2026](/blog/best-ai-agents-2026).

**Prompt chaining** breaks a complex task into a sequence of simpler prompts, where the output of one becomes the input of the next. It's a structural technique rather than a phrasing technique. Instead of asking the model to write, research, and edit all at once, you prompt it to research first, then write from those notes, then critique and revise. Each step stays within the model's reliable competence zone.

**Constrained decoding and output format specification** is increasingly important in production systems. Asking a model to respond in strict JSON, or to fill a specific template, isn't just a formatting preference - it's a way of forcing the model's probability distribution toward structured outputs that can be parsed and acted on by downstream code. This is where prompt engineering intersects directly with software engineering for anyone building applications on top of AI models. If you're evaluating tools that do this well, the [best AI code assistants roundup](/best-of/best-ai-code-assistants) covers how several tools handle structured output in practice.

---

## How Output Quality Changes With Prompt Quality

Output quality from the same AI model on the same task can vary enormously depending on how that task is prompted. This isn't theoretical - I've run enough side-by-side tests to be specific about the gaps.

I spent about six weeks in early 2026 systematically testing prompt variations across three task categories: code generation, structured data extraction, and analytical writing. Same underlying model (Claude Sonnet 4.6), same underlying tasks, different prompts.

The variation in output quality was larger than I expected before I started.

For code generation, the biggest single improvement came from adding explicit output constraints before the task description. Not "write a Python function to parse CSV files" - but "Write a Python function to parse CSV files. Requirements: handle missing values by returning None for that field, raise ValueError if the file has no header row, return a list of dicts, and include a docstring with a usage example."

The constrained prompt produced working, edge-case-handling code on the first pass roughly 70% of the time. The unconstrained version: around 35%.

For structured data extraction - pulling specific fields from unstructured text - few-shot examples were the biggest lever. Zero-shot extraction from messy real-world text (customer service tickets, informal emails) had roughly 60% field accuracy in my testing.

Adding three examples with correct and slightly tricky cases pushed that above 85%. The model wasn't learning; it was matching the pattern I'd established.

For analytical writing, the order of instructions mattered more than I expected. Putting format requirements after the content task produced prose that was then awkwardly formatted at the end.

Putting format requirements first - before describing the content task - produced output that integrated format naturally throughout. This one counterintuitive finding changed how I structure almost every writing prompt I write now.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="32" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Output Quality: Weak vs Strong Prompts</text>
  <text x="350" y="52" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Same model, same task, different prompt quality (my 6-week test, n=120 tasks)</text>

  <!-- Y axis label (split to avoid transform) -->
  <text x="14" y="145" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Task</text>
  <text x="14" y="158" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">success</text>
  <text x="14" y="171" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">rate (%)</text>

  <!-- Y axis -->
  <line x1="70" y1="70" x2="70" y2="240" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Y ticks -->
  <text x="62" y="244" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">0</text>
  <text x="62" y="202" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">25</text>
  <text x="62" y="160" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">50</text>
  <text x="62" y="118" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">75</text>
  <text x="62" y="76" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="end">100</text>

  <!-- Grid lines -->
  <line x1="70" y1="202" x2="670" y2="202" stroke="#DDD8CE" stroke-width="0.75" stroke-dasharray="4,3"/>
  <line x1="70" y1="160" x2="670" y2="160" stroke="#DDD8CE" stroke-width="0.75" stroke-dasharray="4,3"/>
  <line x1="70" y1="118" x2="670" y2="118" stroke="#DDD8CE" stroke-width="0.75" stroke-dasharray="4,3"/>
  <line x1="70" y1="76" x2="670" y2="76" stroke="#DDD8CE" stroke-width="0.75" stroke-dasharray="4,3"/>

  <!-- Group 1: Code Generation -->
  <text x="175" y="258" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Code Generation</text>
  <!-- Weak bar: 35% -->
  <rect x="110" y="101" width="55" height="139" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="137" y="97" font-family="sans-serif" font-size="10" fill="#96845A" text-anchor="middle">35%</text>
  <!-- Strong bar: 70% -->
  <rect x="175" y="101" width="55" height="139" rx="6" fill="#6B7C5E" opacity="0.85"/>
  <!-- Strong bar height = 70% of 168px = 117.6 -->
  <rect x="175" y="122" width="55" height="118" rx="6" fill="#6B7C5E" opacity="0.85"/>
  <text x="202" y="118" font-family="sans-serif" font-size="10" fill="#4A5942" text-anchor="middle">70%</text>

  <!-- Group 2: Data Extraction -->
  <text x="370" y="258" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Data Extraction</text>
  <!-- Weak bar: 60% -->
  <rect x="310" y="140" width="55" height="100" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="337" y="136" font-family="sans-serif" font-size="10" fill="#96845A" text-anchor="middle">60%</text>
  <!-- Strong bar: 85% -->
  <rect x="375" y="97" width="55" height="143" rx="6" fill="#6B7C5E" opacity="0.85"/>
  <text x="402" y="93" font-family="sans-serif" font-size="10" fill="#4A5942" text-anchor="middle">85%</text>

  <!-- Group 3: Analytical Writing -->
  <text x="570" y="258" font-family="sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">Analytical Writing</text>
  <!-- Weak bar: 42% -->
  <rect x="510" y="169" width="55" height="71" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="537" y="165" font-family="sans-serif" font-size="10" fill="#96845A" text-anchor="middle">42%</text>
  <!-- Strong bar: 78% -->
  <rect x="575" y="108" width="55" height="132" rx="6" fill="#6B7C5E" opacity="0.85"/>
  <text x="602" y="104" font-family="sans-serif" font-size="10" fill="#4A5942" text-anchor="middle">78%</text>

  <!-- Legend -->
  <rect x="500" y="62" width="14" height="10" rx="2" fill="#96845A" opacity="0.6"/>
  <text x="518" y="72" font-family="sans-serif" font-size="10" fill="#3A3228">Weak prompt</text>
  <rect x="580" y="62" width="14" height="10" rx="2" fill="#6B7C5E" opacity="0.85"/>
  <text x="598" y="72" font-family="sans-serif" font-size="10" fill="#3A3228">Strong prompt</text>
</svg>

What I was measuring as "task success" is admittedly subjective - I defined it as "output I could use without meaningful revision." That definition is imperfect. But the directional finding is consistent enough that I'm confident in the pattern even if the exact percentages would shift with different evaluators.

The one finding I want to flag separately: the model matters less than you think, until it doesn't. For routine tasks - summarization, classification, standard code - a well-crafted prompt on a mid-tier model beats a lazy prompt on a frontier model.

I've seen this play out enough times that I now check prompts before checking models when output is disappointing.

For harder reasoning tasks - complex analysis, multi-step technical work, tasks requiring deep domain knowledge - the model ceiling matters more and prompting matters less. At some point you've done everything you can with the prompt and the model simply doesn't have the capability for the task.

Knowing which situation you're in saves a lot of time.

---

## Prompt Engineering for Different AI Tools

Prompt engineering principles are universal, but the nuances vary significantly across Claude, ChatGPT, and Gemini - and getting those nuances right makes a real difference in daily use.

I've run roughly the same workflows across all three for about a year. The differences in how they respond to prompt structure are real and consistent enough to be worth documenting.

**Claude** (especially Claude 3.5 Sonnet and [Claude Opus 4.7](/blog/claude-opus-4-7-review)) responds particularly well to explicit reasoning instructions and to prompts that provide genuine context about why you're asking something. It handles long, detailed prompts without losing track of earlier instructions - which matters if you're writing system prompts with many constraints. Claude also tends to surface its own uncertainty, which is useful in workflows where you'd rather get a hedged answer than a confident wrong one.

When I'm using Claude for writing tasks, I've found that giving it a sentence about the audience and the purpose - not just the task - produces measurably better first drafts. Something like "This is for a technical audience who already knows the basics but needs a clear decision framework" shifts the output in ways that a format instruction alone doesn't achieve.

**ChatGPT** (GPT-4o and later) is more pattern-completion oriented in my experience. It benefits from examples more than Claude does in similar tasks, and it handles highly structured templates well.

For tasks where you have a very specific output format in mind, scaffolding that format explicitly in the prompt - including placeholder text where the model should fill in content - tends to produce cleaner results with GPT than with Claude.

One thing I've noticed: ChatGPT tends to be more sycophantic early in a conversation, meaning it sometimes agrees with incorrect premises before correcting itself later. Explicitly asking it to flag assumptions before answering - "tell me if any of my assumptions seem wrong before you answer" - is a prompt habit worth building for critical tasks.

**Gemini** (Gemini 1.5 Pro and later, reviewed alongside [Gemma 4](/blog/gemma-4-review)) handles multimodal prompts and very long contexts differently than either Claude or ChatGPT. Its 1 million token context window is real, but how you structure information across that window matters.

Gemini tends to weight more recent information in a very long prompt, which means burying your key constraints deep in a long document can cause them to be underweighted. Important instructions: put them late, or repeat them at the end.

Across all three, the fundamentals are consistent: specific beats vague, format instructions before content tasks, and examples are almost always worth including for tasks you run repeatedly.

If you're comparing these tools and want a structured view, the [AI tools compare page](/tools/compare) is a good starting point. The [best ChatGPT alternatives](/best-of/best-chatgpt-alternatives) roundup also covers some less obvious options worth knowing about.

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="280" fill="#F4F1EA" rx="12"/>
  <text x="350" y="32" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Prompt Nuances by AI Tool</text>

  <!-- Header row -->
  <rect x="30" y="48" width="150" height="28" rx="6" fill="#DDD8CE"/>
  <text x="105" y="67" font-family="sans-serif" font-size="11" font-weight="600" fill="#3A3228" text-anchor="middle">Dimension</text>
  <rect x="192" y="48" width="148" height="28" rx="6" fill="#4A5942" opacity="0.8"/>
  <text x="266" y="67" font-family="sans-serif" font-size="11" font-weight="600" fill="#F4F1EA" text-anchor="middle">Claude</text>
  <rect x="352" y="48" width="148" height="28" rx="6" fill="#6B7C5E" opacity="0.8"/>
  <text x="426" y="67" font-family="sans-serif" font-size="11" font-weight="600" fill="#F4F1EA" text-anchor="middle">ChatGPT</text>
  <rect x="512" y="48" width="158" height="28" rx="6" fill="#96845A" opacity="0.8"/>
  <text x="591" y="67" font-family="sans-serif" font-size="11" font-weight="600" fill="#F4F1EA" text-anchor="middle">Gemini</text>

  <!-- Row 1 -->
  <rect x="30" y="84" width="150" height="36" rx="4" fill="#F4F1EA"/>
  <text x="105" y="100" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Long system</text>
  <text x="105" y="113" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">prompts</text>
  <rect x="192" y="84" width="148" height="36" rx="4" fill="#DDD8CE"/>
  <text x="266" y="106" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Handles very well</text>
  <rect x="352" y="84" width="148" height="36" rx="4" fill="#DDD8CE"/>
  <text x="426" y="100" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Handles well,</text>
  <text x="426" y="113" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">prefers structure</text>
  <rect x="512" y="84" width="158" height="36" rx="4" fill="#DDD8CE"/>
  <text x="591" y="100" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Put key rules</text>
  <text x="591" y="113" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">at the end</text>

  <!-- Row 2 -->
  <rect x="30" y="126" width="150" height="36" rx="4" fill="#F4F1EA"/>
  <text x="105" y="142" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Responds to</text>
  <text x="105" y="155" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">few-shot examples</text>
  <rect x="192" y="126" width="148" height="36" rx="4" fill="#DDD8CE"/>
  <text x="266" y="148" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Good</text>
  <rect x="352" y="126" width="148" height="36" rx="4" fill="#DDD8CE"/>
  <text x="426" y="148" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Very strong</text>
  <rect x="512" y="126" width="158" height="36" rx="4" fill="#DDD8CE"/>
  <text x="591" y="148" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Good</text>

  <!-- Row 3 -->
  <rect x="30" y="168" width="150" height="36" rx="4" fill="#F4F1EA"/>
  <text x="105" y="184" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Context window</text>
  <text x="105" y="197" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">reliability</text>
  <rect x="192" y="168" width="148" height="36" rx="4" fill="#DDD8CE"/>
  <text x="266" y="190" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Strong</text>
  <rect x="352" y="168" width="148" height="36" rx="4" fill="#DDD8CE"/>
  <text x="426" y="190" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Good, shorter ctx</text>
  <rect x="512" y="168" width="158" height="36" rx="4" fill="#DDD8CE"/>
  <text x="591" y="184" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Largest context,</text>
  <text x="591" y="197" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">recency bias</text>

  <text x="350" y="248" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Observations from repeated testing across writing, code, and analysis tasks.</text>
</svg>

One area where model differences are most stark is in how they handle ambiguity. Claude tends to ask a clarifying question when a prompt is underspecified - or at least flag its assumptions.

ChatGPT tends to pick an interpretation and run with it, which can be faster but means you sometimes get a confident answer to the wrong question.

Gemini's behavior here is more variable depending on which version and interface you're using.

For workflows where ambiguity is common - like generating content from rough briefs, or writing code from vague requirements - this behavioral difference matters for how you write your prompts. With ChatGPT, you might need to explicitly ask it to state its assumptions before answering.

With Claude, you sometimes need to tell it to just proceed rather than asking for clarification when you'd rather have a best-guess first draft.

A note on [AI coding tools specifically](/blog/best-ai-coding-tools-2026): prompt engineering for code generation has its own layer of nuance. The way you describe the environment, the constraints, and the expected behavior of the function matters more than many tutorials acknowledge.

I cover this more directly in the context of tools like [Cursor](/blog/cursor-3-review) and its models.

---

## Prompts I Thought Were Good (But Weren't)

The most useful thing I can share about prompt engineering is the specific ways I've been wrong about it. These mistakes took time to surface because the outputs seemed reasonable - they just weren't as good as they could have been.

**Mistake 1: Confusing length with specificity.**

For a long time I thought longer prompts were better prompts. More detail, more context, more constraints - that should produce better output, right?

Sometimes. But I've found that length without structure is often worse than a shorter, well-organized prompt.

A 400-word prompt that buries the most important constraint in the middle of paragraph three often performs worse than a 150-word prompt with the key instruction front-loaded. The model processes the entire prompt, but certain patterns carry more weight than others - particularly the first and last parts of the context window.

When I was writing prompts for [AI writing tools](/best-of/best-ai-writing-tools), I consistently got better outputs after I started putting the most important format and quality constraint in the first sentence, not after paragraphs of context-setting.

**Mistake 2: Assuming context I'd already provided would stay active.**

In long conversations, I assumed the model remembered and weighted earlier context equally with recent messages. It doesn't always - depending on the model and the context window implementation, earlier instructions can lose salience.

This caused real problems when I was doing iterative editing: I'd give the model an initial style guide, then ask for multiple rounds of edits, and by round three or four, the style guidance was being ignored.

The fix was simple once I understood it: re-state critical constraints before each request in a long conversation, or use system prompts where the tool supports them.

**Mistake 3: Writing prompts that assumed the model would infer my obvious intent.**

The most consistent error new prompt engineers make - including me, early on - is assuming that what's obvious to a human is obvious to the model. "Make this better" is a real thing people type.

Better how - more concise, more persuasive, better structured, more technically accurate? The model will pick something, but it might not pick what you meant.

I thought this was obvious advice until I caught myself writing "improve this paragraph" about six months ago and being surprised when the model made it longer when I'd wanted it shorter.

The model wasn't wrong. I was.

**Mistake 4: Not testing prompts systematically.**

The most expensive prompt engineering mistake I made was treating prompt writing as a one-shot activity. Write a prompt, it seems to work, move on.

The problem: prompts that seem to work on the first five uses often fail in subtle ways on the sixth, because the first five happened to be the easy cases.

Systematic prompt testing - running the same prompt across a range of realistic inputs including edge cases - is how you find these failures before they matter. It's not glamorous, but it's the thing that separates prompts that work from prompts that seem to work.

**Mistake 5: Ignoring the model's own uncertainty signals.**

One thing I underweighted early on was treating hedged language in model outputs as just a verbal tic rather than information. When a model says "I'm not certain, but..." or "this might vary depending on..." that's usually meaningful signal, not filler.

I trained myself to treat those hedges as flags to verify rather than phrases to skim past.

The flip side: some models are poorly calibrated and express high confidence about things they're actually wrong about. [AI hallucination](/blog/what-is-hallucination-in-ai) is a real issue in specific domains, and learning which domains your model handles reliably vs. where it tends to confabulate is part of developing good prompt engineering judgment. You adjust the prompts and verification steps accordingly.

If you're serious about prompt quality for anything you're going to use repeatedly, the [2026 AI tools reality check](/studies/2026-ai-tools-reality-check) has methodological notes on how to structure this kind of evaluation.

<svg viewBox="0 0 700 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="270" fill="#F4F1EA" rx="12"/>
  <text x="350" y="32" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Common Prompt Engineering Mistakes</text>

  <!-- Mistake 1 -->
  <rect x="30" y="52" width="310" height="80" rx="10" fill="#96845A" opacity="0.15"/>
  <rect x="30" y="52" width="6" height="80" rx="3" fill="#96845A"/>
  <text x="52" y="73" font-family="sans-serif" font-size="12" font-weight="600" fill="#4A5942">Length over structure</text>
  <text x="52" y="91" font-family="sans-serif" font-size="10" fill="#3A3228">Long but unorganized prompts</text>
  <text x="52" y="107" font-family="sans-serif" font-size="10" fill="#3A3228">often underperform shorter,</text>
  <text x="52" y="121" font-family="sans-serif" font-size="10" fill="#3A3228">well-structured ones.</text>

  <!-- Mistake 2 -->
  <rect x="360" y="52" width="310" height="80" rx="10" fill="#96845A" opacity="0.15"/>
  <rect x="360" y="52" width="6" height="80" rx="3" fill="#96845A"/>
  <text x="382" y="73" font-family="sans-serif" font-size="12" font-weight="600" fill="#4A5942">Assuming context persists</text>
  <text x="382" y="91" font-family="sans-serif" font-size="10" fill="#3A3228">Earlier instructions lose salience</text>
  <text x="382" y="107" font-family="sans-serif" font-size="10" fill="#3A3228">in long sessions. Restate</text>
  <text x="382" y="121" font-family="sans-serif" font-size="10" fill="#3A3228">key constraints each time.</text>

  <!-- Mistake 3 -->
  <rect x="30" y="148" width="310" height="80" rx="10" fill="#96845A" opacity="0.15"/>
  <rect x="30" y="148" width="6" height="80" rx="3" fill="#96845A"/>
  <text x="52" y="169" font-family="sans-serif" font-size="12" font-weight="600" fill="#4A5942">Inferring obvious intent</text>
  <text x="52" y="187" font-family="sans-serif" font-size="10" fill="#3A3228">The model will pick something</text>
  <text x="52" y="203" font-family="sans-serif" font-size="10" fill="#3A3228">when you're vague. It just</text>
  <text x="52" y="219" font-family="sans-serif" font-size="10" fill="#3A3228">might not match your intent.</text>

  <!-- Mistake 4 -->
  <rect x="360" y="148" width="310" height="80" rx="10" fill="#96845A" opacity="0.15"/>
  <rect x="360" y="148" width="6" height="80" rx="3" fill="#96845A"/>
  <text x="382" y="169" font-family="sans-serif" font-size="12" font-weight="600" fill="#4A5942">One-shot testing</text>
  <text x="382" y="187" font-family="sans-serif" font-size="10" fill="#3A3228">Prompts that work for the</text>
  <text x="382" y="203" font-family="sans-serif" font-size="10" fill="#3A3228">easy cases often fail on</text>
  <text x="382" y="219" font-family="sans-serif" font-size="10" fill="#3A3228">edge cases. Test broadly.</text>
</svg>

---

## System Prompts vs User Prompts - What's the Difference?

A system prompt is a set of instructions given to an AI model before the conversation starts, typically by the application or developer building on top of the model. A user prompt is what you type during the conversation itself.

This distinction matters more than most guides acknowledge.

When you use Claude through claude.ai or ChatGPT through the web interface, there's almost always a system prompt running that you can't see. It sets the model's tone, constrains certain behaviors, and establishes the context for everything you type.

The model's responses are shaped by both the system prompt and your input - and the system prompt typically carries more weight when there's a conflict.

If you're using an AI tool and it seems to resist certain requests or keep defaulting to a particular style, there's usually a system prompt behind that behavior.

For developers and anyone building workflows on top of [AI assistants](/category/ai-assistants), the system prompt is the most powerful prompt engineering lever available. You can:

- Set a persistent role or expertise frame that applies to every conversation
- Specify output formats that the model maintains without being asked each time
- Constrain the scope of what the model will answer
- Inject context (about a product, a codebase, a user's preferences) that the model treats as baseline knowledge

The relationship between system prompts and [RAG (retrieval-augmented generation)](/blog/what-is-rag-retrieval-augmented-generation) is worth understanding if you're building anything serious. System prompts handle static, persistent context - things the model should always know.

RAG handles dynamic, query-specific context pulled from a database at runtime. In sophisticated applications, both are used together.

There's also a concept of "meta-prompting" - using a model to help you write and improve prompts. I've found this surprisingly useful for tasks where I know what I want the output to look like but I'm struggling to articulate the right instructions.

Describing the problem to the model and asking it to help draft a prompt for a different task often produces better starting points than anything I'd write from scratch.

<svg viewBox="0 0 700 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="290" fill="#F4F1EA" rx="12"/>
  <text x="350" y="32" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">System Prompt vs User Prompt Flow</text>

  <!-- Developer layer -->
  <rect x="40" y="52" width="200" height="56" rx="10" fill="#4A5942" opacity="0.85"/>
  <text x="140" y="76" font-family="sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">System Prompt</text>
  <text x="140" y="94" font-family="sans-serif" font-size="10" fill="#DDD8CE" text-anchor="middle">Set by developer/app</text>

  <!-- Arrow 1 -->
  <line x1="248" y1="80" x2="288" y2="80" stroke="#8A8577" stroke-width="1.5"/>
  <polygon points="288,75 300,80 288,85" fill="#8A8577"/>

  <!-- Model box -->
  <rect x="305" y="42" width="130" height="200" rx="10" fill="#6B7C5E" opacity="0.2"/>
  <rect x="305" y="42" width="130" height="200" rx="10" fill="none" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="370" y="72" font-family="sans-serif" font-size="12" font-weight="600" fill="#4A5942" text-anchor="middle">AI Model</text>
  <text x="370" y="92" font-family="sans-serif" font-size="10" fill="#6B7C5E" text-anchor="middle">Processes both</text>
  <text x="370" y="106" font-family="sans-serif" font-size="10" fill="#6B7C5E" text-anchor="middle">inputs together</text>
  <text x="370" y="130" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">System prompt</text>
  <text x="370" y="144" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">typically wins</text>
  <text x="370" y="158" font-family="sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">on conflicts</text>

  <!-- User prompt -->
  <rect x="40" y="150" width="200" height="56" rx="10" fill="#96845A" opacity="0.7"/>
  <text x="140" y="174" font-family="sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">User Prompt</text>
  <text x="140" y="192" font-family="sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">What you type in chat</text>

  <!-- Arrow 2 -->
  <line x1="248" y1="178" x2="288" y2="145" stroke="#8A8577" stroke-width="1.5"/>
  <polygon points="285,137 296,143 283,150" fill="#8A8577"/>

  <!-- Output -->
  <rect x="460" y="110" width="200" height="56" rx="10" fill="#DDD8CE"/>
  <text x="560" y="134" font-family="sans-serif" font-size="12" font-weight="600" fill="#4A5942" text-anchor="middle">Response</text>
  <text x="560" y="152" font-family="sans-serif" font-size="10" fill="#3A3228" text-anchor="middle">Shaped by both inputs</text>

  <!-- Arrow out -->
  <line x1="440" y1="138" x2="458" y2="138" stroke="#8A8577" stroke-width="1.5"/>
  <polygon points="458,133 470,138 458,143" fill="#8A8577"/>

  <text x="350" y="262" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">Apps you use have system prompts running invisibly behind every message.</text>
</svg>

One practical implication for power users: if a consumer AI tool supports a custom instructions feature (Claude's custom instructions, ChatGPT's custom instructions, etc.), use it as your personal system prompt layer. Instructions that you want the model to apply consistently - preferred response length, topics you work on, context about your role - go there once rather than getting re-typed every session.

For a look at how this differs across tools, the [how to use ChatGPT effectively guide](/blog/how-to-use-chatgpt-effectively) covers the ChatGPT-specific implementation, and the [Claude vs Cursor comparison](/blog/claude-code-vs-cursor-3) shows how these concepts translate into coding tool workflows.

---

## Will Prompt Engineering Matter in 2027? (Honest Take)

Prompt engineering will still matter in 2027, but the skills that matter will shift - and some of what people spend time on today will become irrelevant.

Here's the honest picture as I see it.

The techniques that will matter less: low-level tricks for coaxing basic capability out of models that lack it. If you're spending energy figuring out how to get a model to not write in a list format when you didn't ask for one, or getting it to stop starting every sentence with "Certainly!", those are failure modes that better-trained models are eliminating.

The prompting effort required for routine tasks will keep decreasing as model defaults get better.

The techniques that will matter more: structural prompting for complex multi-step workflows, prompt design for [AI agent](/blog/what-is-an-ai-agent) pipelines, and evaluation methodology. As models get more capable, the tasks people use them for get more ambitious - and more ambitious tasks create new prompting challenges that didn't exist before.

The prompting skill required for an agentic workflow coordinating five tools and writing code that needs to actually run is completely different from the prompting skill required to write a good email.

There's also a meta-shift happening around [what fine-tuning can and can't do](/blog/what-is-fine-tuning-in-ai). Fine-tuning a model on your specific domain can reduce the prompting overhead for routine tasks within that domain significantly.

But fine-tuning doesn't eliminate the need for thoughtful prompt design in novel situations - it relocates and narrows it.

One concrete shift that changes the picture in 2026: multimodal prompting. As models handle images, audio, and structured data natively, the craft of prompting expands beyond text.

Describing what you want the model to do with an image, or how to interpret a table alongside a question, introduces new prompt design challenges that text-only prompt engineers haven't had to think about.

The [Claude Opus 4.7 vs GPT-5.5 comparison](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) covers how the frontier models handle multimodal tasks in practice, which gives useful context for how prompting differs in those settings.

The other shift worth watching is the rise of evaluation-first workflows. Rather than writing a prompt and asking "does this seem good?", serious teams are building eval harnesses before they write their first prompt - defining success criteria, collecting test cases, and running systematic comparisons.

This makes prompt engineering much more scientific and much less dependent on intuition. It's also where I've seen the biggest quality gains in teams I've worked with.

You don't need a formal ML background to do this; you need clear thinking about what "good" means for your specific task.

My honest take: prompt engineering as a standalone job title will largely disappear. The people doing this work will be called ML engineers, product engineers, or AI developers - and prompt engineering will be one skill among many they bring to building AI systems.

But the skill itself will still matter, and people who have it will build better systems than those who don't.

What I'm less sure about: whether large-scale automation of prompt generation and optimization - which several companies are building - will shift the equation faster than I expect. I'm watching this closely.

If [RLHF](/blog/what-is-rlhf) and related techniques get good enough at automatically discovering optimal prompts for a given task, the human-written prompt might become the rough draft rather than the final product.

That would be a meaningful shift worth watching closely. We'd be doing meta-prompt engineering - writing prompts about how to prompt - rather than the object-level work we do today.

I'm not certain this happens at scale by 2027, but I'm not ruling it out either.

For now, the skill is real, learnable, and worth the investment - especially if you're working with [AI agents](/blog/best-ai-agents-2026) or building anything that goes beyond casual use.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="30" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Prompt Engineering: What Stays, What Changes</text>

  <!-- Timeline axis -->
  <line x1="60" y1="240" x2="640" y2="240" stroke="#DDD8CE" stroke-width="2"/>
  <text x="60" y="260" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">2024</text>
  <text x="250" y="260" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">2025</text>
  <text x="440" y="260" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">2026</text>
  <text x="630" y="260" font-family="sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">2027</text>

  <!-- Declining skill: basic tricks -->
  <path d="M60,80 Q250,100 440,160 T630,210" stroke="#96845A" stroke-width="2.5" fill="none" stroke-dasharray="6,3"/>
  <text x="90" y="70" font-family="sans-serif" font-size="10" fill="#96845A">Basic output tricks</text>
  <text x="90" y="83" font-family="sans-serif" font-size="10" fill="#96845A">(declining value)</text>

  <!-- Growing skill: agent/structural prompting -->
  <path d="M60,200 Q250,190 440,140 T630,80" stroke="#6B7C5E" stroke-width="2.5" fill="none"/>
  <text x="500" y="72" font-family="sans-serif" font-size="10" fill="#6B7C5E">Agent + structural</text>
  <text x="500" y="85" font-family="sans-serif" font-size="10" fill="#6B7C5E">prompting (rising)</text>

  <!-- Flat skill: eval methodology -->
  <path d="M60,155 Q250,150 440,148 T630,145" stroke="#4A5942" stroke-width="2.5" fill="none" stroke-dasharray="2,2"/>
  <text x="200" y="135" font-family="sans-serif" font-size="10" fill="#4A5942">Evaluation skills</text>
  <text x="200" y="148" font-family="sans-serif" font-size="10" fill="#4A5942">(stays critical)</text>

  <!-- Legend -->
  <line x1="40" y1="280" x2="65" y2="280" stroke="#96845A" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="70" y="284" font-family="sans-serif" font-size="10" fill="#96845A">Basic tricks</text>
  <line x1="160" y1="280" x2="185" y2="280" stroke="#6B7C5E" stroke-width="2"/>
  <text x="190" y="284" font-family="sans-serif" font-size="10" fill="#6B7C5E">Agent prompting</text>
  <line x1="295" y1="280" x2="320" y2="280" stroke="#4A5942" stroke-width="2" stroke-dasharray="2,2"/>
  <text x="325" y="284" font-family="sans-serif" font-size="10" fill="#4A5942">Eval methodology</text>
</svg>

The tools and models evolve fast. The underlying logic of how to give a machine good instructions - be specific, provide context, structure your request, test the output - that logic is more durable than any specific technique.

---

## FAQ

**What is prompt engineering in simple terms?**

Prompt engineering is the practice of writing better instructions for AI models to get more useful outputs. It's the difference between typing a vague question and giving the model the context, format, and constraints it needs to give you something you can actually use. Anyone can learn the basics in an afternoon; the depth takes time.

**Do you need to know how to code to do prompt engineering?**

No. The core skills are analytical writing and clear thinking - figuring out what you actually want, then expressing it precisely. That said, if you're doing prompt engineering for [AI coding tools](/best-of/best-ai-code-assistants) or building agentic workflows, some programming knowledge helps you work with API access and system prompts more effectively.

**What is the difference between a system prompt and a user prompt?**

A system prompt is set by the developer or application before the conversation starts and typically defines the model's role, constraints, and behavior. A user prompt is what you type during the conversation. Both are processed together, but system prompts usually take priority when there's a conflict. Most consumer AI apps run a system prompt you never see.

**What is few-shot prompting?**

Few-shot prompting means including a small number of examples in your prompt to show the model what output you want before asking it to do the task. Instead of just describing what you want, you demonstrate it with two or three concrete examples. It's one of the most reliable ways to improve output consistency for structured tasks.

**Is there a difference between prompting ChatGPT vs Claude vs Gemini?**

The core techniques work across all three, but there are nuances worth knowing. Claude handles long, detailed prompts with many constraints well. ChatGPT benefits particularly from few-shot examples and explicit output templates. Gemini's long-context window is real, but it weights recent information more heavily in very long prompts, so key instructions should appear toward the end. The [compare tool](/tools/compare) lets you run the same prompt across models to see the differences directly.

**What makes a prompt engineering skill valuable vs what models just do automatically?**

Models are increasingly good at common tasks with minimal prompting. What still requires skill: multi-step workflows where earlier outputs feed later steps, tasks requiring specific output formats that need to be maintained exactly, agentic systems where prompts define tool use and decision logic, and any domain where the model's defaults don't match your quality bar. The skill shifts upmarket as models improve.

**How do you test whether a prompt is actually good?**

Run it on a range of inputs, not just the easy cases you wrote it for. Include edge cases, ambiguous inputs, and inputs where the model might reasonably give a different kind of answer. Track what percentage of outputs meet your standard. If you can't define what "meeting your standard" means clearly enough to check it consistently, that's usually the first thing to fix.

**What is chain-of-thought prompting and when should I use it?**

Chain-of-thought prompting asks the model to show its reasoning before giving a final answer - often through a phrase like "think step by step." It's most useful for tasks that involve logic, math, multi-step analysis, or decisions with several interdependent factors. For simple retrieval or classification tasks, it adds overhead without much benefit.

**Will AI models eventually make prompt engineering unnecessary?**

Partly, and over time. Models are getting better at inferring intent from underspecified prompts. But as models get more capable, people use them for more ambitious tasks - and more ambitious tasks create new prompting challenges. The skill evolves rather than disappears. Understanding [how transformers work](/blog/what-is-the-transformer-architecture) and [what tokenization does](/blog/what-is-tokenization) gives you a more durable mental model of why certain prompting patterns work, which ages better than memorizing specific tricks.

**Where should I start if I want to improve my prompt engineering?**

Start with Anthropic's prompt engineering guide and OpenAI's prompt engineering documentation - both are the most current primary sources for their respective models. Beyond that: pick one task you do repeatedly with AI, write the clearest possible prompt for it, test it across at least ten realistic inputs, and note where it fails. Fix those failure modes one at a time. That loop - write, test, fix - is the actual practice of prompt engineering, and no tutorial replaces doing it.

---

*Want to go deeper on how these models work under the hood? The [large language model explainer](/blog/what-is-a-large-language-model), [tokenization guide](/blog/what-is-tokenization), and [transformer architecture overview](/blog/what-is-the-transformer-architecture) are good next reads. For practical tool comparisons that use prompt engineering as part of the evaluation criteria, see the [AI tools methodology page](/methodology).*

*External references: [Anthropic's prompt engineering guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) | [OpenAI prompt engineering documentation](https://platform.openai.com/docs/guides/prompt-engineering)*
