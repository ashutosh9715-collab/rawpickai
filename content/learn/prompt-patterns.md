---
title: "The 10 Prompt Patterns That Always Work"
description: "Ten reusable prompt structures that reliably improve AI output: role priming, constraint stacking, persona split, chain-of-thought, and more."
publishDate: "2026-06-24"
category: "AI Skills"
lastUpdated: "2026-06-24"
slug: "/learn/prompt-patterns"
author: "Ash"
---


Most prompts fail before the model even starts generating. Not because the model is bad - but because the prompt gives it nothing to work with.

I've been building with AI tools since early 2023 and have written more prompts than I can count. What I've learned is that improvement doesn't come from longer prompts or more forceful phrasing. It comes from recognizing patterns - specific structural moves that reliably shift the model toward better output.

The 10 patterns in this article are model-agnostic. They work across ChatGPT, Claude, Gemini, and any capable large language model. Some you may already use instinctively. A few will change how you think about prompting entirely.

This is not a beginner's guide. These patterns are worth knowing even if you prompt daily.

---

## Why Most Prompts Underperform

The single biggest gap in most prompts is missing context - the model doesn't know who it's writing for, what it already knows, or what "good" looks like in this situation.

That gap is predictable. [Large language models](/blog/what-is-a-large-language-model) generate text by predicting what should come next given their training and your input. If your input is sparse, the model fills the context gap with statistical averages - the most generic version of whatever you asked for.

The second gap is format ambiguity. You know you want a clear, structured, actionable answer. The model doesn't know that unless you say so.

The third gap - and the sneakiest - is the absence of constraints. When a model has no constraints, it optimizes for coverage over precision. It hedges. It qualifies. It adds caveats you didn't need. That's not laziness; it's the model doing what an unconstrained system does.

These three gaps - context, format, and constraints - are what the 10 patterns in this article are designed to close.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" font-family="Georgia, serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">The Three Gaps That Hurt Most Prompts</text>

  <!-- Gap 1: Context -->
  <rect x="40" y="58" width="190" height="200" rx="12" fill="#DDD8CE"/>
  <text x="135" y="84" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">Context Gap</text>
  <text x="135" y="108" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Model doesn't know</text>
  <text x="135" y="126" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">who it's writing for</text>
  <text x="135" y="152" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Result:</text>
  <text x="135" y="170" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Generic output that</text>
  <text x="135" y="188" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">fits no one exactly</text>
  <rect x="60" y="215" width="150" height="28" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="135" y="234" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Fix: Role + Audience</text>

  <!-- Gap 2: Format -->
  <rect x="255" y="58" width="190" height="200" rx="12" fill="#DDD8CE"/>
  <text x="350" y="84" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">Format Gap</text>
  <text x="350" y="108" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Model doesn't know</text>
  <text x="350" y="126" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">what "good" looks like</text>
  <text x="350" y="152" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Result:</text>
  <text x="350" y="170" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Wall of text or wrong</text>
  <text x="350" y="188" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">structure for the task</text>
  <rect x="275" y="215" width="150" height="28" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="350" y="234" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Fix: Format Enforcer</text>

  <!-- Gap 3: Constraints -->
  <rect x="470" y="58" width="190" height="200" rx="12" fill="#DDD8CE"/>
  <text x="565" y="84" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">Constraint Gap</text>
  <text x="565" y="108" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Model defaults to</text>
  <text x="565" y="126" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">maximum coverage</text>
  <text x="565" y="152" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Result:</text>
  <text x="565" y="170" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Hedged, bloated, overly</text>
  <text x="565" y="188" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">qualified responses</text>
  <rect x="490" y="215" width="150" height="28" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="565" y="234" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Fix: Constraint Stack</text>

  <text x="350" y="278" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">All three gaps are closable with the right prompt structure</text>
</svg>

Understanding [what prompt engineering actually is](/blog/what-is-prompt-engineering) helps here. It isn't about coaxing or tricking a model. It's about giving the prediction system enough signal to land in the right part of its output space.

The patterns below are exactly that: structured ways to give the model the signal it needs.

---

## Patterns 1-3: Setting Up the Model

Setting up the model well is the part of any prompt with the highest return on effort. The first few sentences of your prompt set the probability distribution for everything that follows - and these three patterns are the most reliable way to do that setup well.

### Pattern 1: The Role Primer

The Role Primer sets a professional identity for the model before you give it any task. It works because models have learned from vast amounts of professional writing, and activating a specific role - with relevant expertise and perspective - steers the generation toward patterns from that domain.

This isn't about playing pretend. It's about narrowing the model's reference space from "everything I know" to "what someone with this background and these concerns would say."

The difference in output quality can be dramatic. I asked Claude to analyze a startup pitch deck first with no role, then with a role primer. The second response surfaced concerns about market size assumptions and dilution structure that the first version never mentioned.

**Template:**

```
You are a [specific professional role] with [X years / deep experience] in [domain].
You specialize in [specific sub-area].
You are known for [key quality: directness / nuance / practical advice / etc.].

[Your actual task here]
```

**Example in use:**

```
You are a senior UX researcher with 12 years of experience in B2B SaaS.
You specialize in enterprise onboarding flows.
You are known for identifying friction points that engineering teams overlook.

Review this onboarding sequence and identify where users are most likely to drop off.
[Paste sequence here]
```

---

### Pattern 2: The Expert Persona

The Expert Persona is a sharper version of the Role Primer - it names a specific archetype rather than a generic professional category. Instead of "a marketing expert," you invoke "a direct response copywriter who has written for B2C e-commerce since 2015."

The specificity matters because generic roles still leave a wide distribution. Specific personas narrow it significantly.

Where this surprised me: I started using Expert Persona prompts when asking models to review technical writing. Adding "you approach technical documentation the way a developer advocate would - optimizing for time-to-first-success, not completeness" changed the entire lens of the critique. The model stopped suggesting more detail and started suggesting where to cut.

**Template:**

```
Take on the perspective of [specific archetype with context].
This person [key belief or approach that defines how they think].
They would describe their approach as: [short quote-style characterization].

With that lens, [your task].
```

**Example in use:**

```
Take on the perspective of a venture-backed founder who has raised and failed twice before their third exit.
This person views every business decision through the lens of capital efficiency and runway.
They would describe their approach as: "I assume things will cost twice as much and take three times longer."

With that lens, review this product roadmap and flag where we are being optimistic to the point of risk.
```

---

### Pattern 3: The Constraint Stack

The Constraint Stack is not one instruction - it is a list of specific, explicit constraints that pre-rules out the output qualities you don't want. It works because unconstrained models optimize for "good on average." Constraints shift the optimization toward "good for this specific need."

I use this pattern on almost every long-form generation task. The key is being specific: not "keep it brief" but "under 300 words." Not "avoid jargon" but "assume the reader has no background in AI."

The constraint that unlocks the most improvement is often the format constraint. Adding "use bullet points only for lists of 3 or more items, not for prose" cuts AI-flavored bulleted writing almost entirely.

**Template:**

```
[Core task]

Constraints:
- Length: [exact number or range]
- Tone: [specific adjectives - not "professional" but "direct and unhedged"]
- Format: [specific structure instructions]
- Avoid: [specific things to exclude]
- Audience: [who will read this and what they already know]
```

**Example in use:**

```
Write a product update email for our design tool's new collaboration feature.

Constraints:
- Length: 150-200 words
- Tone: warm but efficient - no marketing fluff
- Format: one-paragraph body, a single call to action, no bullet lists
- Avoid: words like "excited," "thrilled," "proud to announce"
- Audience: existing users who are already using the product daily
```

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="320" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" font-family="Georgia, serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Patterns 1-3: Setup Stack</text>

  <!-- Timeline / funnel layout -->
  <!-- Step 1 -->
  <rect x="40" y="56" width="190" height="230" rx="12" fill="#6B7C5E" opacity="0.15"/>
  <rect x="40" y="56" width="190" height="230" rx="12" fill="none" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="135" y="82" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">1. Role Primer</text>
  <text x="135" y="106" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Sets professional</text>
  <text x="135" y="122" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">identity + domain</text>
  <line x1="80" y1="148" x2="190" y2="148" stroke="#DDD8CE" stroke-width="1"/>
  <text x="135" y="172" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Narrows from</text>
  <text x="135" y="188" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">"all knowledge"</text>
  <text x="135" y="204" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">to "domain knowledge"</text>
  <rect x="60" y="224" width="150" height="46" rx="6" fill="#6B7C5E" opacity="0.25"/>
  <text x="135" y="244" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Broad expert</text>
  <text x="135" y="260" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">framing</text>

  <!-- Arrow 1 -->
  <text x="255" y="176" font-family="Georgia, serif" font-size="18" fill="#96845A" text-anchor="middle">+</text>

  <!-- Step 2 -->
  <rect x="270" y="56" width="160" height="230" rx="12" fill="#96845A" opacity="0.12"/>
  <rect x="270" y="56" width="160" height="230" rx="12" fill="none" stroke="#96845A" stroke-width="1.5"/>
  <text x="350" y="82" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">2. Expert Persona</text>
  <text x="350" y="106" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Adds specific</text>
  <text x="350" y="122" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">archetype + belief</text>
  <line x1="290" y1="148" x2="410" y2="148" stroke="#DDD8CE" stroke-width="1"/>
  <text x="350" y="172" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Narrows from</text>
  <text x="350" y="188" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">"domain knowledge"</text>
  <text x="350" y="204" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">to "this perspective"</text>
  <rect x="290" y="224" width="120" height="46" rx="6" fill="#96845A" opacity="0.25"/>
  <text x="350" y="244" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Specific lens</text>
  <text x="350" y="260" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">applied</text>

  <!-- Arrow 2 -->
  <text x="448" y="176" font-family="Georgia, serif" font-size="18" fill="#96845A" text-anchor="middle">+</text>

  <!-- Step 3 -->
  <rect x="462" y="56" width="200" height="230" rx="12" fill="#6B7C5E" opacity="0.15"/>
  <rect x="462" y="56" width="200" height="230" rx="12" fill="none" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="562" y="82" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">3. Constraint Stack</text>
  <text x="562" y="106" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Rules out unwanted</text>
  <text x="562" y="122" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">output qualities</text>
  <line x1="482" y1="148" x2="642" y2="148" stroke="#DDD8CE" stroke-width="1"/>
  <text x="562" y="172" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Narrows from</text>
  <text x="562" y="188" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">"this perspective"</text>
  <text x="562" y="204" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">to "this exact output"</text>
  <rect x="482" y="224" width="160" height="46" rx="6" fill="#4A5942" opacity="0.7"/>
  <text x="562" y="244" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Precise, constrained</text>
  <text x="562" y="260" font-family="Georgia, serif" font-size="10" fill="#F4F1EA" text-anchor="middle">output</text>

  <text x="350" y="304" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Each pattern narrows the model's output space one step further</text>
</svg>

These three patterns stack well together. You can use all three in a single prompt preamble - role, then persona specifics, then constraints - and the cumulative effect is substantially better than any one of them alone. I'll show you how to combine them later.

---

## Patterns 4-6: Shaping the Output

Once the model knows who it is and what you want, these three patterns control how the output is structured, who it's aimed at, and what it leaves out. Output shaping is where a lot of experienced prompters stop investing - and where there's still a lot of gain available.

### Pattern 4: The Format Enforcer

The Format Enforcer gives the model an exact structural template to fill rather than leaving structure to chance. It works because models are excellent at completing patterns - if you show them the shape of the output you want, they fill it reliably.

This is different from saying "use headers." That instruction is vague enough that the model still makes dozens of micro-decisions about structure. A Format Enforcer eliminates those decisions by providing the skeleton.

**Template:**

```
Produce your response in exactly this format:

## [Section 1 name]
[1-2 sentence description of what goes here]

## [Section 2 name]
[1-2 sentence description of what goes here]

## [Section 3 name]
[1-2 sentence description of what goes here]

Do not add sections beyond what is listed above.
Do not include a conclusion or summary unless it appears above.
```

**Example in use:**

```
Analyze this marketing email using exactly this format:

## First Impression
What a reader notices in the first 3 seconds - subject line, preview text, opening sentence.

## Core Message
What the email is trying to say - one sentence.

## Friction Points
Up to 3 specific places where a reader might disengage or be confused.

## One Change
The single edit that would improve the email most.

Do not add sections beyond what is listed above.
```

---

### Pattern 5: The Audience Anchor

The Audience Anchor tells the model exactly who will read the output - their knowledge level, context, and what they care about. It works because the same information needs to be explained very differently depending on who's receiving it, and models calibrate this well when given specifics.

What surprises most people: the audience anchor affects not just vocabulary but argument structure. When I anchor a technical explanation to "a VP of Sales who has sat through 20 AI vendor demos this year," the model stops explaining basics and starts addressing skepticism. That shift doesn't happen from tone instructions alone.

**Template:**

```
Write this for: [specific audience description]
They already know: [what you can skip]
They do not know: [what needs to be explained]
What they care most about: [their primary concern]
What they are likely skeptical of: [their objection or resistance]
```

**Example in use:**

```
Write a one-page brief on AI agents for this audience:

Write this for: operations directors at mid-market companies (200-2000 employees)
They already know: basic AI tools exist, they've used ChatGPT personally
They do not know: the difference between an LLM and an agent, or how agents make decisions
What they care most about: cost savings and whether this affects headcount
What they are likely skeptical of: vendor promises about automation rates
```

You can read more about [what AI agents actually are](/blog/what-is-an-ai-agent) to understand why anchoring explanations to audience assumptions matters so much for this topic specifically.

---

### Pattern 6: The Negative Space

The Negative Space pattern explicitly tells the model what not to include. It counteracts the model's tendency toward completeness - its instinct to cover every angle, add every caveat, and hedge every claim.

Most people think adding more instruction makes prompts better. This pattern proves the opposite can be true.

The most useful negative space instructions I've found: "Do not use the word 'important' or 'key' to frame list items." "Do not end with a summary of what was just written." "Do not mention limitations unless they are directly relevant to the question asked." Each of these cuts predictable filler patterns that appear in AI output when left unchecked.

**Template:**

```
[Your task]

Do not include:
- [Specific content type to exclude]
- [Phrasing patterns to avoid]
- [Structural elements you don't want]
- [Topics that are adjacent but not relevant]

If you find yourself including any of the above, revise before responding.
```

**Example in use:**

```
Write a summary of the key findings from this user research report.

Do not include:
- Background on why the research was conducted
- Methodology details (sample size, recruitment, etc.)
- Hedged language like "it seems" or "this may suggest"
- A section on limitations or future research
- Any restatement of findings in a conclusion

If you find yourself including any of the above, revise before responding.
```

<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="260" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" font-family="Georgia, serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Patterns 4-6: Output Shaping</text>

  <!-- Horizontal bar chart style layout showing what each pattern controls -->

  <!-- Pattern 4 row -->
  <text x="160" y="76" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="end">Format Enforcer</text>
  <rect x="172" y="60" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="172" y="60" width="380" height="28" rx="6" fill="#6B7C5E" opacity="0.7"/>
  <text x="362" y="79" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Controls structure of output</text>
  <text x="618" y="79" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">79%</text>

  <!-- Pattern 5 row -->
  <text x="160" y="126" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="end">Audience Anchor</text>
  <rect x="172" y="110" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="172" y="110" width="310" height="28" rx="6" fill="#96845A" opacity="0.7"/>
  <text x="327" y="129" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Controls calibration + depth</text>
  <text x="618" y="129" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">65%</text>

  <!-- Pattern 6 row -->
  <text x="160" y="176" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="end">Negative Space</text>
  <rect x="172" y="160" width="480" height="28" rx="6" fill="#DDD8CE"/>
  <rect x="172" y="160" width="420" height="28" rx="6" fill="#6B7C5E" opacity="0.5"/>
  <text x="382" y="179" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Controls what is excluded</text>
  <text x="618" y="179" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">88%</text>

  <text x="172" y="218" font-family="Georgia, serif" font-size="10" fill="#8A8577">Less impact</text>
  <text x="648" y="218" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="end">More impact</text>
  <line x1="172" y1="208" x2="648" y2="208" stroke="#DDD8CE" stroke-width="1"/>

  <text x="350" y="244" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Rough estimate of impact on output quality from personal testing across 200+ prompts</text>
</svg>

These three patterns are the ones I end up explaining most when someone shows me their prompts and asks why the output feels off. The issue is almost never the core task instruction. It's the absence of format, audience, or exclusion signals around it.

---

## Patterns 7-8: Improving Reasoning

These two patterns are specifically for tasks where you need the model to think carefully, not just produce fluent output. They're the patterns with the most impact when the task involves analysis, judgment, or evaluating trade-offs.

### Pattern 7: Chain-of-Thought

Chain-of-thought prompting asks the model to show its reasoning before delivering a conclusion. It works because the act of generating intermediate reasoning steps actually improves the final answer - the model can catch its own errors mid-generation when reasoning is visible.

This is well-established in AI research. But most people apply it too broadly. Chain-of-thought helps most with multi-step reasoning tasks: math, logic puzzles, comparative analysis, and decisions with several interdependent variables. It helps less for simple generation tasks where the reasoning isn't really the bottleneck.

The wrong way to use it: "Think step by step." That phrase has become so common in training data that it barely signals anything specific anymore. The right way: describe the reasoning steps you actually want.

**Template:**

```
[Task]

Before giving your answer, work through the following:
1. [Reasoning step 1 - what to consider first]
2. [Reasoning step 2 - what to evaluate next]
3. [Reasoning step 3 - how to weigh the above]

Then give your final answer.
```

**Example in use:**

```
Should we migrate our analytics pipeline from BigQuery to DuckDB?

Before giving your answer, work through the following:
1. Identify what type of workload our pipeline primarily handles
   (we process ~50M rows daily, mostly aggregations, occasional ad-hoc queries)
2. Evaluate the cost and performance implications of each option at this scale
3. Identify the top 2 migration risks specific to our setup

Then give your recommendation, with a one-paragraph rationale.
```

Understanding how [context windows](/blog/what-is-the-context-window) work helps explain why chain-of-thought succeeds: by generating reasoning tokens first, the model builds a richer context that the final answer tokens are conditioned on.

---

### Pattern 8: The Steel-Man

The Steel-Man pattern asks the model to construct the strongest possible version of a position you might disagree with - or to argue against your own plan. It works because models default toward agreement and completion. Without explicit instruction, they'll validate your premise, fill in your gaps charitably, and rarely push back on flawed reasoning.

This is where I've consistently gotten the most value from prompting that I couldn't get from just thinking harder myself. Running a steel-man on a product decision I'd already made surfaced a distribution concern I had explained away. Running it on a draft strategy memo before sending it to a client identified a logical leap I'd been making without realizing it.

The key is asking for the strongest version of the opposing argument, not just "potential downsides." Weak steel-men are useless.

**Template:**

```
I'm going to share [a plan / position / argument].
Your job is not to evaluate it - your job is to construct the strongest possible case against it.
Assume someone who is smart, experienced, and deeply concerned would make this case.
Do not qualify your steel-man with "but on the other hand." Just build the case.

[Your plan or position]
```

**Example in use:**

```
I'm going to share our go-to-market plan for an AI writing tool.
Your job is not to evaluate it - your job is to construct the strongest possible case against it.
Assume someone who is a veteran B2B SaaS operator who has watched this category fail before.
Do not qualify your steel-man with "but on the other hand." Just build the case.

[Our plan: targeting mid-market content teams, pricing at $49/seat, differentiating on brand voice training]
```

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="280" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" font-family="Georgia, serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">When to Use Reasoning Patterns</text>

  <!-- 2x2 grid -->
  <!-- Axes labels -->
  <text x="350" y="60" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Task Complexity</text>
  <text x="350" y="75" font-family="Georgia, serif" font-size="10" fill="#DDD8CE" text-anchor="middle">Low ─────────────────────── High</text>

  <text x="50" y="175" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Judgment</text>
  <text x="50" y="189" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Required</text>

  <!-- Quadrant boxes -->
  <!-- Top left: Low complexity, Low judgment -->
  <rect x="100" y="86" width="240" height="80" rx="8" fill="#DDD8CE"/>
  <text x="220" y="116" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Simple generation</text>
  <text x="220" y="134" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">No reasoning pattern needed</text>
  <text x="220" y="152" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Patterns 1-6 sufficient</text>

  <!-- Top right: High complexity, Low judgment -->
  <rect x="356" y="86" width="300" height="80" rx="8" fill="#6B7C5E" opacity="0.2"/>
  <rect x="356" y="86" width="300" height="80" rx="8" fill="none" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="506" y="116" font-family="Georgia, serif" font-size="11" font-weight="700" fill="#4A5942" text-anchor="middle">Multi-step analysis</text>
  <text x="506" y="134" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Use Chain-of-Thought</text>
  <text x="506" y="152" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Pattern 7</text>

  <!-- Bottom left: Low complexity, High judgment -->
  <rect x="100" y="178" width="240" height="80" rx="8" fill="#DDD8CE"/>
  <text x="220" y="208" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Opinion / recommendation</text>
  <text x="220" y="226" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Use Steel-Man to pressure-test</text>
  <text x="220" y="244" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Pattern 8</text>

  <!-- Bottom right: High complexity, High judgment -->
  <rect x="356" y="178" width="300" height="80" rx="8" fill="#96845A" opacity="0.2"/>
  <rect x="356" y="178" width="300" height="80" rx="8" fill="none" stroke="#96845A" stroke-width="1.5"/>
  <text x="506" y="208" font-family="Georgia, serif" font-size="11" font-weight="700" fill="#4A5942" text-anchor="middle">Complex decisions</text>
  <text x="506" y="226" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Chain-of-Thought + Steel-Man</text>
  <text x="506" y="244" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Patterns 7 + 8 together</text>
</svg>

These two patterns have made me more skeptical of my own reasoning in a productive way. When I run a steel-man before I finalize a decision, I'm essentially running adversarial QA on my own thinking. That's not something I was doing well by myself.

---

## Patterns 9-10: Advanced Control

These are the patterns I reach for when standard prompting isn't getting me where I need to go - when the task is too complex for a single shot, or when I need the model to hold two distinct, non-overlapping perspectives at once.

### Pattern 9: Iterative Decomposition

Iterative Decomposition breaks a complex task into sequential sub-tasks, each building on the previous output. It works because large, complex tasks overwhelm a single prompt's ability to hold all the constraints simultaneously. When you ask the model to plan, research, draft, and polish in one shot, it satisfies all those demands partially instead of any of them fully.

The pattern has two modes. The first is prompted decomposition, where you tell the model the stages explicitly and execute them in sequence. The second is assisted decomposition, where you ask the model to suggest the stages before executing - useful when you're not sure what the right sub-tasks are.

This pairs well with [how AI agents work](/blog/what-is-an-ai-agent) - multi-step agentic pipelines are essentially Iterative Decomposition at scale, automated.

**Template:**

```
We are going to complete [complex task] in stages.
Do not attempt to do all stages at once.

Stage 1: [What to produce in stage 1]
Stop after Stage 1. Wait for my go-ahead before continuing.

[After you respond to Stage 1]:
Stage 2: Based on Stage 1 output, [what to produce in Stage 2]
Stop after Stage 2.

[Continue as needed]
```

**Example in use:**

```
We are going to write a detailed competitive analysis in stages.

Stage 1: Given these 5 competitors [list], identify the top 3 differentiators
each uses in their positioning. Do not analyze strategy yet.
Stop after Stage 1.

Stage 2: Based on what you found, identify where two or more competitors
are making the same claim. These are commoditized features - flag them.
Stop after Stage 2.

Stage 3: Now identify where the market has a gap - a positioning claim
none of the 5 competitors are making but that buyers likely care about.
```

---

### Pattern 10: The Persona Split

The Persona Split asks the model to simultaneously hold two distinct perspectives on the same question and to argue from both without collapsing into a single view. It works because most AI output defaults to synthesis - it finds the middle ground, the nuanced view, the "it depends." Sometimes you need the extremes clearly stated before you can find the right position.

This pattern is especially useful in decision-making: ask a Persona Split between "the person who would definitely do this" and "the person who would definitely not," then read both arguments before making your choice. The model's ability to inhabit distinct perspectives is one of the capabilities most people underuse.

Where this surprised me most: I ran a Persona Split on whether to add a pricing page to a new product site before launch. The "yes" persona and the "no" persona produced clearly different arguments, neither of which was what I would have written myself. The "no" persona surfaced an anchoring concern I hadn't considered.

**Template:**

```
I need you to hold two distinct personas simultaneously.

Persona A: [Name and description - someone who would strongly advocate FOR this]
Persona B: [Name and description - someone who would strongly advocate AGAINST this]

For the following question, present both perspectives in full.
Do not reconcile them. Do not add a "the truth is somewhere in between" conclusion.
Label each section clearly.

Question: [Your question]
```

**Example in use:**

```
I need you to hold two distinct personas simultaneously.

Persona A: A growth-focused startup operator who believes shipping fast and learning
from users is always better than planning. They value momentum above all else.

Persona B: A senior engineering lead who has seen fast shipping create years of
technical debt and believes decisions made without a plan always cost more later.

For the following question, present both perspectives in full.
Do not reconcile them. Do not add a conclusion.

Question: Should we build this feature in-house or use an off-the-shelf API?
```

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" font-family="Georgia, serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Patterns 9-10: Advanced Control</text>

  <!-- Iterative Decomposition - left side, vertical flow -->
  <text x="175" y="62" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="middle">Iterative Decomposition</text>
  <text x="175" y="78" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Sequential stages, each building</text>

  <rect x="60" y="90" width="230" height="36" rx="8" fill="#6B7C5E" opacity="0.7"/>
  <text x="175" y="113" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Stage 1: Foundation output</text>

  <line x1="175" y1="126" x2="175" y2="142" stroke="#6B7C5E" stroke-width="2"/>
  <polygon points="170,142 175,154 180,142" fill="#6B7C5E"/>

  <rect x="60" y="154" width="230" height="36" rx="8" fill="#6B7C5E" opacity="0.5"/>
  <text x="175" y="177" font-family="Georgia, serif" font-size="11" fill="#3A3228" text-anchor="middle">Stage 2: Refine + build</text>

  <line x1="175" y1="190" x2="175" y2="206" stroke="#6B7C5E" stroke-width="2"/>
  <polygon points="170,206 175,218 180,206" fill="#6B7C5E"/>

  <rect x="60" y="218" width="230" height="36" rx="8" fill="#4A5942" opacity="0.8"/>
  <text x="175" y="241" font-family="Georgia, serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Stage 3: Final output</text>

  <text x="175" y="276" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Each stage focuses fully</text>

  <!-- Divider -->
  <line x1="350" y1="50" x2="350" y2="280" stroke="#DDD8CE" stroke-width="1.5" stroke-dasharray="6,4"/>

  <!-- Persona Split - right side, side-by-side -->
  <text x="525" y="62" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="middle">The Persona Split</text>
  <text x="525" y="78" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Two views, no synthesis</text>

  <rect x="364" y="90" width="150" height="160" rx="8" fill="#6B7C5E" opacity="0.15"/>
  <rect x="364" y="90" width="150" height="160" rx="8" fill="none" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="439" y="114" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="middle">Persona A</text>
  <text x="439" y="134" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Advocate FOR</text>
  <text x="439" y="152" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Full argument</text>
  <text x="439" y="168" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">from this view</text>
  <text x="439" y="190" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">No hedging</text>
  <text x="439" y="208" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">No "but"</text>
  <text x="439" y="232" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">allowed</text>

  <rect x="526" y="90" width="150" height="160" rx="8" fill="#96845A" opacity="0.15"/>
  <rect x="526" y="90" width="150" height="160" rx="8" fill="none" stroke="#96845A" stroke-width="1.5"/>
  <text x="601" y="114" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="middle">Persona B</text>
  <text x="601" y="134" font-family="Georgia, serif" font-size="10" fill="#3A3228" text-anchor="middle">Advocate AGAINST</text>
  <text x="601" y="152" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">Full argument</text>
  <text x="601" y="168" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">from that view</text>
  <text x="601" y="190" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">No hedging</text>
  <text x="601" y="208" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">No "but"</text>
  <text x="601" y="232" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">allowed</text>

  <text x="525" y="276" font-family="Georgia, serif" font-size="10" fill="#8A8577" text-anchor="middle">You synthesize - not the model</text>
</svg>

The Persona Split is the pattern I recommend most to people who feel like AI responses always sound the same. The sameness comes from the model's default drive toward synthesis. Take that drive away explicitly, and you unlock a different kind of output.

---

## How to Combine Patterns

The compound prompt approach is where these patterns become seriously powerful. Each pattern addresses a different failure mode - layering them addresses multiple failure modes at once.

A well-constructed compound prompt typically has three layers: a setup layer (Patterns 1-3), a shaping layer (Patterns 4-6), and optionally a reasoning layer (Patterns 7-8). You don't always need all three. But you almost always need at least two.

Here's a compound prompt that uses Pattern 1 (Role Primer), Pattern 3 (Constraint Stack), Pattern 4 (Format Enforcer), and Pattern 5 (Audience Anchor):

```
You are a principal product designer with 10 years of experience in B2B SaaS.
You specialize in dashboard design and data visualization for non-technical users.

Write a critique of this dashboard design for:
Audience: a VP of Product who designed it themselves and is emotionally invested in it.
They know: UX fundamentals, they care about user clarity, they're open to feedback if it's specific.
They do not know: data visualization best practices or accessibility standards.

Constraints:
- Under 400 words
- Every critique must include a specific suggested fix
- Do not soften feedback with phrases like "you might consider" - be direct
- No praise unless it is specific and relevant

Format:
## What's Working (if anything)
[Specific, brief]

## The Three Biggest Issues
[Issue 1: problem + specific fix]
[Issue 2: problem + specific fix]
[Issue 3: problem + specific fix]

## The One Thing to Fix First
[Single highest-priority recommendation in 1-2 sentences]
```

That prompt uses four patterns across 14 lines. The output it produces is dramatically more useful than any single-pattern or no-pattern version.

The compounding principle also applies across conversation turns. If you use Iterative Decomposition (Pattern 9), you can add a Steel-Man (Pattern 8) at a critical stage to pressure-test the direction before proceeding. The patterns aren't just combinable in a single prompt - they're composable across a workflow.

If you want to go deeper on structuring complex workflows for AI, the [how to structure documents for AI analysis](/blog/how-to-structure-documents-for-ai-analysis) article covers the document-side of this. And [how to debug AI output](/blog/how-to-debug-ai-output) is worth reading if your compound prompts start producing inconsistent results - it's usually a specific failure mode you can diagnose.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;border-radius:12px">
  <rect width="700" height="340" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" font-family="Georgia, serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">How Patterns Layer in a Compound Prompt</text>

  <!-- Layer 1: Setup -->
  <rect x="40" y="52" width="620" height="72" rx="10" fill="#6B7C5E" opacity="0.15"/>
  <rect x="40" y="52" width="620" height="72" rx="10" fill="none" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="66" y="76" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942">Layer 1: Setup</text>
  <text x="66" y="96" font-family="Georgia, serif" font-size="11" fill="#3A3228">Who the model is, what perspective it holds, what world it's operating in</text>
  <text x="66" y="113" font-family="Georgia, serif" font-size="10" fill="#8A8577">Patterns: Role Primer (1) + Expert Persona (2)</text>

  <!-- Layer 2: Shape -->
  <rect x="40" y="138" width="620" height="72" rx="10" fill="#96845A" opacity="0.12"/>
  <rect x="40" y="138" width="620" height="72" rx="10" fill="none" stroke="#96845A" stroke-width="1.5"/>
  <text x="66" y="162" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942">Layer 2: Shape</text>
  <text x="66" y="182" font-family="Georgia, serif" font-size="11" fill="#3A3228">How the output looks, who it's for, and what it deliberately excludes</text>
  <text x="66" y="199" font-family="Georgia, serif" font-size="10" fill="#8A8577">Patterns: Constraint Stack (3) + Format Enforcer (4) + Audience Anchor (5) + Negative Space (6)</text>

  <!-- Layer 3: Reason -->
  <rect x="40" y="224" width="620" height="72" rx="10" fill="#6B7C5E" opacity="0.1"/>
  <rect x="40" y="224" width="620" height="72" rx="10" fill="none" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="66" y="248" font-family="Georgia, serif" font-size="12" font-weight="700" fill="#4A5942">Layer 3: Reason (optional)</text>
  <text x="66" y="268" font-family="Georgia, serif" font-size="11" fill="#3A3228">How the model thinks through the task before answering</text>
  <text x="66" y="285" font-family="Georgia, serif" font-size="10" fill="#8A8577">Patterns: Chain-of-Thought (7) + Steel-Man (8) - add when judgment matters</text>

  <text x="350" y="320" font-family="Georgia, serif" font-size="11" fill="#8A8577" text-anchor="middle">Advanced: Iterative Decomposition (9) + Persona Split (10) replace Layer 3 for complex tasks</text>
</svg>

One more thing about combining patterns: start with two, not six. Adding all 10 patterns to a single prompt creates instruction overload. The model tries to satisfy all constraints simultaneously and satisfies none of them completely. Build up from two well-chosen patterns, test the result, then add a third if needed.

---

## The Patterns I Reach for Most Often

If I had to rank these 10 by real-world utility across the range of tasks I do daily, here's where I actually land.

The Constraint Stack (Pattern 3) is the one I add to almost everything. It's the lowest-effort, highest-return pattern in the set. Writing three constraint lines at the end of any prompt costs 30 seconds and consistently improves output. No other pattern has that ratio.

The Negative Space (Pattern 6) is the one that surprises people most. Adding explicit exclusions feels counterintuitive - why spend words telling the model what not to do? But AI output has predictable filler patterns that appear reliably when you don't exclude them. The patterns of filler are learnable, and once you know them, the Negative Space pattern becomes a tool for cutting them systematically.

The Steel-Man (Pattern 8) is the one I use most deliberately. I don't use it on routine tasks. I use it specifically before decisions I've already started to commit to - when I know I'm at risk of confirmation bias. Running a steel-man when I feel confident, not when I feel uncertain, is a habit that has actually changed outcomes for me.

Iterative Decomposition (Pattern 9) is indispensable for long documents. If I'm producing anything over 1,000 words or with more than three distinct structural components, I always decompose it. Single-shot long-form generation has too many failure modes. Staged generation with review points catches them early.

The Persona Split (Pattern 10) I use sparingly but when I use it, I use it hard. It's best for genuine dilemmas where I feel pulled in two directions. The model's ability to hold two sincere, non-hedged positions simultaneously is something I can't replicate by just thinking about the problem longer.

For the Role Primer and Expert Persona (Patterns 1 and 2), I've noticed that the specificity of the persona matters far more than the prestige of the role. "A senior consultant" helps less than "a consultant who has worked specifically with bootstrapped SaaS companies on their first enterprise sales motion." The richer the persona, the more the output reflects something I couldn't have written by just describing the task.

If you're newer to structured prompting, [how to write better AI prompts](/blog/how-to-write-better-ai-prompts) covers foundational technique that pairs well with these patterns. And if you're evaluating which model to use for pattern-heavy prompting, [our model comparison](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) is worth reading - different models respond to these patterns differently, particularly chain-of-thought and persona work.

The honest version of my ranking: I reach for Patterns 3, 6, 7, 8, and 9 in about 80% of the prompts that matter. The other five are essential in the right situations. Knowing when to use them - and when they're overkill - is the actual skill.

Understanding [RLHF](/blog/what-is-rlhf) and how models are trained to be helpful also changes how you think about some of these patterns. The model's tendency toward agreement and synthesis isn't a bug - it's what humans rewarded during training. Patterns like Steel-Man and Persona Split work precisely by overriding those trained tendencies for specific tasks.

That's the honest picture of where these patterns sit in my actual workflow. Not every prompt needs all 10. But every prompt is better for knowing all 10 exist.

---

## Frequently Asked Questions

**Do these patterns work the same way across all AI models?**

Mostly yes, with notable variation in Patterns 7 and 8. Chain-of-thought prompting shows the clearest benefit on models that have been specifically trained for reasoning tasks - Claude and GPT-4-class models respond well. Steel-Man works on all capable models but the quality of the opposing argument varies significantly. For the output shaping patterns (4, 5, 6), the behavior is very consistent across models.

**How long should my prompts actually be?**

Long enough to include the patterns you need, no longer. A well-constructed compound prompt with three patterns is typically 150-250 words. If your setup layer exceeds 300 words, you are probably over-specifying and should test whether the extra detail actually changes the output. You can read more about this in [how to use ChatGPT effectively](/blog/how-to-use-chatgpt-effectively) - the length principle holds across models.

**Can I save these as reusable templates?**

Yes, and this is how most experienced prompters work. The patterns become reusable when you save the structural wrapper and swap in the specific task. The Constraint Stack, Format Enforcer, and Audience Anchor templates in particular are designed to be parameterized - the structure stays constant, only the specifics change. Several [AI tool stacks](/blog/how-to-build-an-ai-tool-stack) include prompt management tools specifically for storing and reusing templates at scale.

**Does the order of patterns in a prompt matter?**

Yes, particularly for the setup layer. Role and persona instructions should come first because they set the interpretive frame for everything that follows. If you put constraints before the role, the model processes the task without the persona context first, which weakens the persona effect. The practical order that works best: role/persona first, then task, then constraints and format, then any reasoning instructions.

**What's the difference between Chain-of-Thought and just asking the model to "think carefully"?**

Chain-of-thought specifies the reasoning steps explicitly. "Think carefully" is too vague to reliably change behavior - it's now common enough in training data that models treat it as a general instruction with minimal specific effect. Specifying the actual steps (what to consider, in what order, before what conclusion) is what produces the measurable improvement. The research on this distinction is well-documented; the [original chain-of-thought paper from Google Research](https://arxiv.org/abs/2201.11903) is still worth reading if you want the underlying mechanism.

**When should I not use these patterns?**

For simple, one-shot generation tasks where the output is easy to correct if it's wrong - short summaries, quick rewrites, single-sentence requests - the overhead of structuring a multi-pattern prompt isn't worth it. Apply patterns when the stakes are higher: long documents, reasoning tasks, decisions with consequences, or any prompt you'll run many times. The [AI model selection guide](/blog/how-to-choose-an-ai-model-for-your-business) covers the task complexity question from a different angle, which helps calibrate when full prompting overhead is warranted.

**How do I know if my prompt is the problem versus the model itself?**

Run the same task with the same prompt on two different models. If both produce poor output, the prompt is likely the issue. If one model succeeds and the other fails, it's a model capability question. You can also try removing pattern layers one at a time to isolate which instruction is causing problems. For systematic debugging, [how to debug AI output](/blog/how-to-debug-ai-output) covers the diagnostic process in detail.

**Are there tasks where none of these patterns help?**

The patterns work at the level of prompting - they can't fix fundamental gaps in what a model knows or can do. If you're asking a model to reason about very recent events, highly specialized domains with limited training data, or tasks that require genuine multi-step tool use, prompt patterns reach their ceiling. For those cases, [RAG](/blog/what-is-rag-retrieval-augmented-generation) and [fine-tuning](/blog/what-is-fine-tuning-in-ai) are the approaches worth investigating - they work at the level of what the model knows, not just how you ask.
