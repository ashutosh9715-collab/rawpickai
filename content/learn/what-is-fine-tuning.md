---
title: "What Is Fine-Tuning in AI?"
description: "Fine-tuning takes a pre-trained AI model and trains it further on your specific data so it performs better on your exact use case. Plain-English guide."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-fine-tuning"
author: "Ash"
---


Fine-tuning in AI means taking a model that has already been trained on massive general data and training it further on a smaller, specific dataset - so it learns your domain, your tone, your terminology.

Think of it as the difference between hiring a smart generalist and sending them through a three-month onboarding in your company. The knowledge they brought on day one doesn't disappear. You just layered something specific on top of it.

I've spent a lot of time testing fine-tuned models - both ones I built myself and ones built by teams I've worked with. Some worked brilliantly. One flopped badly, and I'll tell you exactly why later. This guide captures what I actually learned, not just what the documentation says.

Fine-tuning is one of those topics where the gap between "what the docs say" and "what actually happens when you run it" is surprisingly wide. The technical process is well-documented. The practical judgment - when to do it, how to scope it, how to know if it worked - is not.

That judgment is what this guide is really about.

---

## What Is Fine-Tuning? (The Real Definition)

**Fine-tuning** is a training technique where a pre-trained [large language model](/blog/what-is-a-large-language-model) is updated on a curated, task-specific dataset to shift its behavior toward a target domain or output style.

The base model already "knows" grammar, reasoning patterns, world knowledge, and language structure - because it was trained on billions of tokens from books, code, websites, and more. Fine-tuning doesn't erase that. It adjusts the model's weights so the distribution of outputs tilts toward what you actually need.

Here's the part most explainers miss: fine-tuning changes the model's parameters permanently (for that version of the model). It's not just a prompt. It's not memory. The model itself becomes different.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="320" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">How Fine-Tuning Works</text>

  <!-- Base Model Box -->
  <rect x="30" y="70" width="170" height="80" rx="12" fill="#6B7C5E"/>
  <text x="115" y="106" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#F4F1EA">Pre-Trained</text>
  <text x="115" y="124" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#F4F1EA">Base Model</text>

  <!-- Arrow 1 -->
  <line x1="200" y1="110" x2="250" y2="110" stroke="#96845A" strokeWidth="2.5" markerEnd="url(#arrow)"/>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
  </defs>

  <!-- Training Data Box -->
  <rect x="250" y="56" width="170" height="50" rx="12" fill="#DDD8CE"/>
  <text x="335" y="78" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Your Domain Data</text>
  <text x="335" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">(500 - 50k examples)</text>

  <!-- Arrow from data down -->
  <line x1="335" y1="106" x2="335" y2="140" stroke="#96845A" strokeWidth="2.5" markerEnd="url(#arrow)"/>

  <!-- Training Process Box -->
  <rect x="250" y="140" width="170" height="50" rx="12" fill="#96845A"/>
  <text x="335" y="162" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#F4F1EA">Weight Updates</text>
  <text x="335" y="179" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#F4F1EA">(gradient descent)</text>

  <!-- Arrow 2 -->
  <line x1="420" y1="165" x2="470" y2="165" stroke="#96845A" strokeWidth="2.5" markerEnd="url(#arrow)"/>

  <!-- Fine-tuned Model Box -->
  <rect x="470" y="125" width="170" height="80" rx="12" fill="#4A5942"/>
  <text x="555" y="160" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#F4F1EA">Fine-Tuned</text>
  <text x="555" y="178" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#F4F1EA">Model</text>

  <!-- Labels below -->
  <text x="115" y="175" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">General knowledge</text>
  <text x="555" y="230" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Domain-specialized</text>
  <text x="555" y="246" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">model weights</text>

  <!-- Caption -->
  <text x="340" y="295" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">The base model's weights are updated, not discarded.</text>
</svg>

The key mental model: a base model has general capability, and fine-tuning redirects that capability toward a specific output distribution.

It's distinct from [prompt engineering](/blog/what-is-prompt-engineering), where you guide the model through instructions at inference time - no weight changes happen. And it's distinct from [RAG (Retrieval-Augmented Generation)](/blog/what-is-rag-retrieval-augmented-generation), where you attach external knowledge at query time.

Fine-tuning changes the model itself. That's what makes it both powerful and risky.

There are actually a few different things people mean when they say "fine-tuning," and it helps to distinguish them:

**Supervised fine-tuning (SFT)** is the most common type. You provide labeled input-output pairs and train the model to replicate the output pattern. This is what most teams mean when they say "I fine-tuned a model."

**Instruction fine-tuning** is a specific form of SFT where the training data consists of instruction-following examples - often what turns a raw pre-trained model into a chat assistant. GPT-4's ability to follow instructions is partly a product of this process applied at scale.

**RLHF (Reinforcement Learning from Human Feedback)** is a more complex form of fine-tuning where the model is trained using human preference ratings rather than just correct examples. This is how most production chat models are aligned for safety and helpfulness. I cover this in detail in the [RLHF explainer](/blog/what-is-rlhf).

When most developers and teams talk about fine-tuning for a specific use case, they mean supervised fine-tuning. That's the version with accessible tooling, clear data formats, and predictable costs. That's also the version this guide focuses on.

---

## Fine-Tuning vs Prompting vs RAG - The Decision Map

The three most common ways to specialize a model are prompting, RAG, and fine-tuning. They solve different problems and have very different costs.

I want to be clear that I got this wrong the first few times I thought about it. My instinct was always to reach for fine-tuning when I wanted better outputs. That was the wrong default.

<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="380" fill="#F4F1EA" rx="12"/>
  <text x="340" y="36" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">Prompting vs RAG vs Fine-Tuning</text>

  <!-- Column headers -->
  <rect x="30" y="55" width="190" height="36" rx="8" fill="#6B7C5E"/>
  <text x="125" y="79" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="#F4F1EA">Prompting</text>

  <rect x="245" y="55" width="190" height="36" rx="8" fill="#96845A"/>
  <text x="340" y="79" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="#F4F1EA">RAG</text>

  <rect x="460" y="55" width="190" height="36" rx="8" fill="#4A5942"/>
  <text x="555" y="79" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="#F4F1EA">Fine-Tuning</text>

  <!-- Row: Setup cost -->
  <text x="16" y="122" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Setup cost</text>
  <rect x="30" y="105" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="125" y="126" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Minutes</text>
  <rect x="245" y="105" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="340" y="126" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Hours to days</text>
  <rect x="460" y="105" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="555" y="126" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Days to weeks</text>

  <!-- Row: Updates knowledge -->
  <text x="16" y="162" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Updates knowledge</text>
  <rect x="30" y="145" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="125" y="166" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">No</text>
  <rect x="245" y="145" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="340" y="166" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Yes - at query time</text>
  <rect x="460" y="145" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="555" y="166" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Yes - baked in</text>

  <!-- Row: Changes style/tone -->
  <text x="16" y="202" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Changes style/tone</text>
  <rect x="30" y="185" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="125" y="206" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Partially</text>
  <rect x="245" y="185" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="340" y="206" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">No</text>
  <rect x="460" y="185" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="555" y="206" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Yes - deeply</text>

  <!-- Row: $ Cost -->
  <text x="16" y="242" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">$ Cost</text>
  <rect x="30" y="225" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="125" y="246" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Inference only</text>
  <rect x="245" y="225" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="340" y="246" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Infra + retrieval</text>
  <rect x="460" y="225" width="190" height="32" rx="6" fill="#DDD8CE"/>
  <text x="555" y="246" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Training + hosting</text>

  <!-- Row: Best for -->
  <text x="16" y="282" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Best for</text>
  <rect x="30" y="265" width="190" height="48" rx="6" fill="#6B7C5E" opacity="0.15"/>
  <text x="125" y="284" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">Format &amp; behavior</text>
  <text x="125" y="300" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">control</text>
  <rect x="245" y="265" width="190" height="48" rx="6" fill="#96845A" opacity="0.15"/>
  <text x="340" y="284" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">Grounding in</text>
  <text x="340" y="300" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">live documents</text>
  <rect x="460" y="265" width="190" height="48" rx="6" fill="#4A5942" opacity="0.15"/>
  <text x="555" y="284" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">Stable style,</text>
  <text x="555" y="300" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">format, or domain</text>

  <text x="340" y="360" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Try prompting first. Add RAG if you need fresh data. Fine-tune when both fail.</text>
</svg>

Here's my decision rule, refined through actual projects:

**Start with prompting.** A well-crafted system prompt with good examples (few-shot prompting) fixes 70% of "the model doesn't do what I want" problems. Before you spend days fine-tuning, spend two hours on a better prompt.

**Add RAG if your problem is knowledge.** If the model doesn't know your internal docs, your product catalog, or your recent data - that's a retrieval problem, not a training problem. RAG is cheaper and keeps your data fresh. Check out my deeper explanation of [what RAG is](/blog/what-is-rag-retrieval-augmented-generation) if you want to understand that option better.

**Fine-tune when the issue is style, format, or consistent behavior** that prompting can't reliably produce. If the model keeps breaking your output schema, ignoring tone rules, or reverting to generic phrasing even with detailed system prompts - fine-tuning is the right fix.

The overlap that trips people up: fine-tuning does NOT replace RAG for knowledge injection. A fine-tuned model still won't know your Q2 2026 earnings release unless you give it that text at inference time.

One more nuance worth naming: you can combine all three. A fine-tuned model that also uses a RAG retrieval pipeline and a structured system prompt is not unusual in production systems. Think of them as layers, not alternatives. Fine-tune for consistent format and tone, use RAG to inject current knowledge, and use the system prompt for runtime behavior control. Each layer handles what it's good at.

---

## How Fine-Tuning Actually Works

The training process behind fine-tuning uses the same fundamental algorithm as the original pre-training - gradient descent - applied to a much smaller dataset, with a much lower learning rate.

Here's the flow broken down into its actual steps.

**Step 1 - Data preparation.** You assemble a dataset of input-output pairs. Each example shows the model the kind of prompt it will receive and the kind of response it should produce. Quality matters far more than quantity here. A dataset of 500 well-written, on-target examples consistently outperforms 5,000 sloppy ones.

**Step 2 - Tokenization.** Your training examples are converted into tokens - the numeric IDs a model uses internally. If you want to understand exactly how that process works, my piece on [what tokenization is](/blog/what-is-tokenization) covers it in detail.

**Step 3 - Forward pass and loss computation.** For each training example, the model predicts the next token. The difference between its prediction and the correct token is measured as a loss value (typically cross-entropy loss).

**Step 4 - Backpropagation.** The error signal travels backward through the model's layers. Each weight gets a small nudge proportional to how much it contributed to the error.

**Step 5 - Iteration.** This repeats across multiple "epochs" - passes through the full training set - until the loss stabilizes.

<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="260" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">Training Loss Over Epochs</text>
  <text x="340" y="52" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Typical fine-tuning run on ~1,000 examples (3B parameter model)</text>

  <!-- Y axis -->
  <line x1="80" y1="70" x2="80" y2="210" stroke="#DDD8CE" strokeWidth="1.5"/>
  <!-- X axis -->
  <line x1="80" y1="210" x2="640" y2="210" stroke="#DDD8CE" strokeWidth="1.5"/>

  <!-- Y labels -->
  <text x="70" y="75" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">2.4</text>
  <text x="70" y="110" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">1.8</text>
  <text x="70" y="145" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">1.2</text>
  <text x="70" y="180" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">0.6</text>

  <!-- Grid lines -->
  <line x1="80" y1="75" x2="640" y2="75" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="80" y1="110" x2="640" y2="110" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="80" y1="145" x2="640" y2="145" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="80" y1="180" x2="640" y2="180" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>

  <!-- Training loss curve (drops steeply then flattens) -->
  <polyline points="80,75 160,95 240,118 320,140 400,158 480,167 560,172 640,174"
    fill="none" stroke="#6B7C5E" strokeWidth="2.5" strokeLinejoin="round"/>

  <!-- Validation loss curve (drops then slightly rises = overfitting risk) -->
  <polyline points="80,80 160,99 240,122 320,143 400,158 480,165 560,169 640,175"
    fill="none" stroke="#96845A" strokeWidth="2" strokeDasharray="5,3" strokeLinejoin="round"/>

  <!-- X axis labels (epochs) -->
  <text x="80" y="228" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">0</text>
  <text x="240" y="228" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">1</text>
  <text x="400" y="228" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">2</text>
  <text x="560" y="228" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">3</text>
  <text x="640" y="228" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">4</text>
  <text x="360" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Epochs</text>

  <!-- Legend -->
  <line x1="100" y1="95" x2="130" y2="95" stroke="#6B7C5E" strokeWidth="2.5"/>
  <text x="136" y="99" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">Training loss</text>
  <line x1="240" y1="95" x2="270" y2="95" stroke="#96845A" strokeWidth="2" strokeDasharray="5,3"/>
  <text x="276" y="99" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">Validation loss</text>
</svg>

One thing that surprised me: the learning rate matters enormously. Too high and you overwrite what the model already knew (a problem called catastrophic forgetting, which I'll cover later). Too low and the model barely updates at all. Most fine-tuning APIs handle this with defaults that are safe but conservative.

The [transformer architecture](/blog/what-is-the-transformer-architecture) underpinning modern LLMs means fine-tuning can be done efficiently using methods like LoRA (Low-Rank Adaptation) - where instead of updating all the model's billions of parameters, you add small trainable "adapter" layers. This cuts compute cost dramatically while preserving most of the performance gain.

Full fine-tuning updates every parameter. Parameter-efficient fine-tuning (PEFT) methods like LoRA update a tiny fraction. For most practical use cases in 2026, LoRA-style fine-tuning is the standard approach.

Here's why LoRA works: instead of modifying the model's existing weight matrices directly, LoRA adds pairs of small matrices (the "low-rank" part of the name) that are multiplied together to approximate the weight update. During training, only these small matrices learn. During inference, they're merged back into the full model. The original weights are never changed - the entire update lives in the adapter layers.

A LoRA run on a 7B model might train 20-40 million parameters instead of the full 7 billion. That's 0.3-0.5% of total parameters. Yet for most task-specific fine-tuning, the quality difference between LoRA and full fine-tuning is small - often under 5% on task-relevant benchmarks.

The practical implication: LoRA fine-tuning takes less memory (you can run it on consumer GPUs in some cases), less time, and less money. It's also easier to mix: you can train multiple LoRA adapters for different tasks and swap them at inference time without maintaining multiple full model copies.

Understanding how [tokenization](/blog/what-is-tokenization) works helps here too - because LoRA training efficiency is partly about how efficiently training data gets packed into token sequences. Wasted padding tokens are wasted compute.

---

## What Fine-Tuning Costs (Real Numbers)

Fine-tuning costs depend on three variables: model size, dataset size, and whether you use a managed service or self-host.

I'm going to give you real numbers from actual runs, not marketing estimates.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="320" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">Fine-Tuning Cost Comparison</text>
  <text x="340" y="52" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">1,000 training examples, 3 epochs</text>

  <!-- Y axis -->
  <line x1="200" y1="70" x2="200" y2="250" stroke="#DDD8CE" strokeWidth="1.5"/>
  <!-- X axis -->
  <line x1="200" y1="250" x2="640" y2="250" stroke="#DDD8CE" strokeWidth="1.5"/>

  <!-- Y labels -->
  <text x="190" y="75" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">$500</text>
  <text x="190" y="115" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">$200</text>
  <text x="190" y="180" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">$50</text>
  <text x="190" y="230" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">$5</text>

  <!-- Gridlines -->
  <line x1="200" y1="75" x2="640" y2="75" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="200" y1="115" x2="640" y2="115" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="200" y1="180" x2="640" y2="180" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="200" y1="230" x2="640" y2="230" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>

  <!-- Bars -->
  <!-- GPT-4o mini -->
  <rect x="220" y="225" width="72" height="25" rx="6" fill="#6B7C5E"/>
  <text x="256" y="265" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">GPT-4o mini</text>
  <text x="256" y="219" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="bold" fill="#6B7C5E">~$5</text>

  <!-- Llama 3.1 8B self-host -->
  <rect x="318" y="190" width="72" height="60" rx="6" fill="#96845A"/>
  <text x="354" y="265" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">Llama 3.1 8B</text>
  <text x="354" y="280" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">(cloud GPU)</text>
  <text x="354" y="184" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="bold" fill="#96845A">~$40</text>

  <!-- GPT-4o full -->
  <rect x="416" y="120" width="72" height="130" rx="6" fill="#6B7C5E" opacity="0.7"/>
  <text x="452" y="265" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">GPT-4o</text>
  <text x="452" y="280" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">(full FT)</text>
  <text x="452" y="114" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="bold" fill="#4A5942">~$200</text>

  <!-- Large model full FT -->
  <rect x="514" y="78" width="72" height="172" rx="6" fill="#4A5942" opacity="0.7"/>
  <text x="550" y="265" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">70B model</text>
  <text x="550" y="280" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">(full FT)</text>
  <text x="550" y="72" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="bold" fill="#4A5942">~$500+</text>

  <text x="340" y="305" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Estimates for 1k examples, 3 epochs. Hosting costs are separate.</text>
</svg>

**Managed APIs (easiest path):** OpenAI's fine-tuning for GPT-4o mini runs around $3-8 for a 1,000-example dataset with three epochs. GPT-4o full fine-tuning is roughly $150-250 for the same dataset. These are one-time training costs - you then pay per token for inference, at a slight premium over the base model.

**Self-hosted open models:** Renting an A100 GPU on RunPod or Lambda Labs costs $1.50-3.50/hour. Fine-tuning a 7B-8B model (Llama 3.1, Mistral, Gemma) on 1,000 examples at three epochs takes roughly 1-3 hours. So $5-10 for training. The bigger cost is if you then host it - that's $200-600/month depending on GPU tier.

**Enterprise-scale fine-tuning (50k+ examples, large models):** Budget $2,000-20,000 for training runs, plus hosting. At that scale, the ROI question becomes very important.

The hidden cost most people undercount is data preparation. Getting 1,000 high-quality training pairs takes real human time. If you're paying a contractor at $30/hour and it takes 40 hours to clean and format your dataset, that's $1,200 - more than the compute.

There's also an ongoing inference cost premium to account for. On OpenAI's API, fine-tuned model inference is typically priced 20-50% higher per token than the base model. If you're running high volume, that premium compounds. The calculation to do before committing: (base model inference cost per month) vs. (fine-tuned model inference cost per month + training amortized over 6 months). Sometimes the premium inference cost wipes out the benefit of switching to a smaller fine-tuned model.

All prices in USD. INR equivalents at ₹93/USD: GPT-4o mini training ≈₹465-744, GPT-4o full training ≈₹13,950-23,250.

*Last updated: June 2026. Prices converted at ₹93/USD.*

The total cost question is really: training cost + data prep cost + ongoing inference cost. The "training is cheap" framing is only true if you already have clean data.

For most small-to-mid projects, GPT-4o mini fine-tuning through the [OpenAI fine-tuning API](https://platform.openai.com/docs/guides/fine-tuning) is the most practical starting point. For teams needing more control or lower per-token inference costs, open-source models on cloud GPUs make more sense.

---

## When Fine-Tuning Makes Sense (and When It Doesn't)

Fine-tuning makes sense when you have a stable, well-defined output pattern that a base model consistently fails to reproduce through prompting alone.

Let me give you concrete scenarios where fine-tuning has actually been worth the cost, and where it hasn't.

**Fine-tuning wins when:**

The output format is non-negotiable and complex. If you need a model to always return JSON in a very specific nested schema, and few-shot prompting keeps producing small deviations that break your parser - fine-tuning on 300-500 correct examples often solves this completely.

You're running millions of tokens per day and want to move to a smaller model. If you're paying for GPT-4o on a high-volume task but a fine-tuned GPT-4o mini would perform equivalently on your specific use case, the inference cost savings compound fast. I've seen teams cut their monthly AI costs by 60-70% this way.

You have a distinctive tone that prompting can't hold across long outputs. Brand voice and writing style drift in longer generations no matter how detailed your system prompt. Fine-tuning this into a smaller model produces more consistent output.

**Fine-tuning is the wrong tool when:**

Your data changes frequently. A fine-tuned model knows what was in its training set at training time. If you're trying to give it access to current prices, recent news, or live document updates - that's a RAG problem, full stop. Check my comparison piece on [AI agents vs agentic AI](/blog/ai-agents-vs-agentic-ai) if you're thinking about retrieval pipelines.

You don't have enough data yet. The "you need at least X examples" number varies by task complexity, but I've found 50-100 examples is the real floor for simple formatting tasks, and 500+ for anything involving nuanced language style. Below that, few-shot prompting is almost always better.

You're still exploring. Fine-tuning commits you to a specific behavior. If you're in the "figuring out what the output should look like" phase, use [prompt engineering](/blog/what-is-prompt-engineering) to iterate fast, then fine-tune once the output pattern is locked.

<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="300" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">Fine-Tuning Decision Flow</text>

  <!-- Start -->
  <rect x="265" y="55" width="150" height="36" rx="12" fill="#6B7C5E"/>
  <text x="340" y="78" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#F4F1EA">Start here</text>
  <line x1="340" y1="91" x2="340" y2="110" stroke="#DDD8CE" strokeWidth="1.5"/>

  <!-- Q1 -->
  <rect x="190" y="110" width="300" height="36" rx="8" fill="#DDD8CE"/>
  <text x="340" y="133" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Does prompting solve it?</text>
  <line x1="250" y1="128" x2="120" y2="175" stroke="#DDD8CE" strokeWidth="1.5"/>
  <line x1="430" y1="128" x2="560" y2="175" stroke="#DDD8CE" strokeWidth="1.5"/>

  <text x="170" y="155" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#6B7C5E">Yes</text>
  <text x="510" y="155" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#96845A">No</text>

  <!-- Left: use prompting -->
  <rect x="50" y="175" width="140" height="40" rx="8" fill="#6B7C5E"/>
  <text x="120" y="192" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#F4F1EA">Use prompting</text>
  <text x="120" y="207" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#F4F1EA">Stop here</text>

  <!-- Q2: is it a knowledge problem? -->
  <rect x="458" y="175" width="185" height="40" rx="8" fill="#DDD8CE"/>
  <text x="550" y="192" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">Knowledge gap?</text>
  <text x="550" y="208" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">(data it doesn't have)</text>
  <line x1="510" y1="215" x2="390" y2="255" stroke="#DDD8CE" strokeWidth="1.5"/>
  <line x1="590" y1="215" x2="630" y2="255" stroke="#DDD8CE" strokeWidth="1.5"/>

  <text x="455" y="240" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#6B7C5E">Yes</text>
  <text x="620" y="240" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#96845A">No</text>

  <!-- Yes: RAG -->
  <rect x="310" y="255" width="130" height="32" rx="8" fill="#96845A"/>
  <text x="375" y="276" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#F4F1EA">Use RAG</text>

  <!-- No: Fine-tune -->
  <rect x="590" y="255" width="70" height="32" rx="8" fill="#4A5942"/>
  <text x="625" y="276" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#F4F1EA">Fine-tune</text>
</svg>

The cleanest signal that fine-tuning is right: you have a prompt that works 80% of the time, but you need it to work 99% of the time, and you have examples of the correct behavior. That's the exact problem fine-tuning solves.

---

## My Fine-Tuning Experiment That Failed First

I want to share a real story because I think it illustrates a mistake a lot of people make.

In early 2025, I was working on a project to make a customer support model respond in a specific structured format - a short empathy sentence, then a bulleted resolution list, then a closing offer. It seemed perfect for fine-tuning.

I built a dataset of about 200 examples. I ran the fine-tuning job. The model came out... worse than the base model.

Here's what I got wrong. My 200 examples were all I had - and about 60 of them were edge cases where I'd written the "ideal" response myself, not pulled from actual good conversations. The model learned those slightly off examples as signal. It learned my personal quirks in the format, including a few inconsistencies I hadn't noticed.

The second problem: I hadn't tested the base model with a well-crafted prompt first. When I finally did that - after the fine-tuning failure - a structured system prompt with three few-shot examples got me 85% of the way there in 20 minutes.

The fine-tuning would have solved the remaining 15%, but I had to do the prompt work first anyway. You need good examples for your training data, which means you need to know what "good" looks like, which means you've essentially already done the prompt work.

What I should have done: nail the prompt first. Use those prompt outputs as training data. Then fine-tune with 500+ examples of the prompt working correctly.

That's the sequence that actually works. Build prompt, validate it, use its outputs as training data, fine-tune to remove the prompt dependency.

This process connects directly to the [RLHF approach](/blog/what-is-rlhf) that underlies how production AI models are preference-trained - the feedback signal matters more than the raw volume of examples.

<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="240" fill="#F4F1EA" rx="12"/>
  <text x="340" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">The Correct Sequence</text>
  <text x="340" y="50" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">What I should have done from the start</text>

  <!-- Step boxes -->
  <rect x="30" y="70" width="130" height="60" rx="10" fill="#DDD8CE"/>
  <text x="95" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Write prompt</text>
  <text x="95" y="114" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">+ few-shot examples</text>

  <line x1="160" y1="100" x2="195" y2="100" stroke="#96845A" strokeWidth="2" markerEnd="url(#arr2)"/>
  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
  </defs>

  <rect x="195" y="70" width="130" height="60" rx="10" fill="#DDD8CE"/>
  <text x="260" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Validate outputs</text>
  <text x="260" y="114" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Fix prompt til solid</text>

  <line x1="325" y1="100" x2="360" y2="100" stroke="#96845A" strokeWidth="2" markerEnd="url(#arr2)"/>

  <rect x="360" y="70" width="130" height="60" rx="10" fill="#DDD8CE"/>
  <text x="425" y="90" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Use prompt outputs</text>
  <text x="425" y="108" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">as training data</text>
  <text x="425" y="122" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">(500+ examples)</text>

  <line x1="490" y1="100" x2="525" y2="100" stroke="#96845A" strokeWidth="2" markerEnd="url(#arr2)"/>

  <rect x="525" y="70" width="130" height="60" rx="10" fill="#6B7C5E"/>
  <text x="590" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#F4F1EA">Fine-tune</text>
  <text x="590" y="114" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#F4F1EA">the model</text>

  <!-- What I actually did (wrong path) -->
  <text x="340" y="160" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fontWeight="bold" fill="#96845A">What I did instead (wrong)</text>
  <rect x="195" y="175" width="130" height="44" rx="10" fill="#96845A" opacity="0.3"/>
  <text x="260" y="194" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Skip to fine-tuning</text>
  <text x="260" y="210" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">with 200 noisy examples</text>

  <line x1="325" y1="197" x2="370" y2="197" stroke="#96845A" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arr2)"/>

  <rect x="370" y="175" width="130" height="44" rx="10" fill="#96845A" opacity="0.3"/>
  <text x="435" y="197" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Worse than</text>
  <text x="435" y="213" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">base model</text>
</svg>

The mistake cost me two weeks. The lesson was clear: a fine-tuned model is only as good as the quality signal in its training data. If you don't know what a great response looks like in writing, you can't teach a model to produce one.

I now treat every fine-tuning project as starting with a prompt engineering phase. That's not optional - it's the mechanism by which I discover what "good" means. The resulting prompt examples become my seed training data, and that's the foundation the fine-tuning builds on.

---

## The Risks Nobody Talks About

Fine-tuning carries real risks that don't show up in the vendor documentation, and most tutorials skip past them.

**Catastrophic forgetting** is the most well-known. When you fine-tune a model heavily on a narrow domain, it can lose performance on tasks it previously handled well.

<svg viewBox="0 0 680 290" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="290" fill="#F4F1EA" rx="12"/>
  <text x="340" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">Risk: Catastrophic Forgetting</text>
  <text x="340" y="50" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Performance before vs after fine-tuning (same base model)</text>

  <!-- Y axis -->
  <line x1="160" y1="65" x2="160" y2="230" stroke="#DDD8CE" strokeWidth="1.5"/>
  <!-- X axis -->
  <line x1="160" y1="230" x2="640" y2="230" stroke="#DDD8CE" strokeWidth="1.5"/>

  <!-- Y labels -->
  <text x="148" y="70" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">100%</text>
  <text x="148" y="113" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">75%</text>
  <text x="148" y="155" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">50%</text>
  <text x="148" y="198" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">25%</text>

  <!-- Grid lines -->
  <line x1="160" y1="70" x2="640" y2="70" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="160" y1="113" x2="640" y2="113" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="160" y1="155" x2="640" y2="155" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>
  <line x1="160" y1="198" x2="640" y2="198" stroke="#DDD8CE" strokeWidth="0.5" strokeDasharray="4,4"/>

  <!-- Task labels -->
  <text x="250" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">Target task</text>
  <text x="400" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">Reasoning</text>
  <text x="550" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#3A3228">General Q&amp;A</text>

  <!-- Before bars (grouped left) -->
  <rect x="215" y="100" width="38" height="130" rx="5" fill="#6B7C5E"/>
  <rect x="365" y="83" width="38" height="147" rx="5" fill="#6B7C5E"/>
  <rect x="515" y="90" width="38" height="140" rx="5" fill="#6B7C5E"/>

  <!-- After bars (grouped right) -->
  <rect x="257" y="69" width="38" height="161" rx="5" fill="#96845A"/>
  <rect x="407" y="128" width="38" height="102" rx="5" fill="#96845A"/>
  <rect x="557" y="138" width="38" height="92" rx="5" fill="#96845A"/>

  <!-- Legend -->
  <rect x="200" y="270" width="14" height="10" rx="2" fill="#6B7C5E"/>
  <text x="220" y="280" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">Before FT</text>
  <rect x="320" y="270" width="14" height="10" rx="2" fill="#96845A"/>
  <text x="340" y="280" fontFamily="Georgia,serif" fontSize="11" fill="#3A3228">After FT</text>
  <text x="480" y="280" textAnchor="end" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">(heavy overfitting scenario)</text>
</svg>

Catastrophic forgetting happens most often when the learning rate is too high, the dataset is too narrow, or you train for too many epochs. The fix is to use a lower learning rate, add diversity to your training data, and watch validation loss on a held-out set.

**Data leakage into the model** is the risk fewer people think about. When you fine-tune with proprietary data - customer records, internal documents, PII - that information can become part of the model's weights. In rare cases, adversarial prompts can extract fragments of training data from a fine-tuned model. This is documented in academic research and has real compliance implications for regulated industries.

Before fine-tuning with sensitive data, you need to know: who controls that model afterward? If you're using an API provider's fine-tuning service, you need to read their data handling policies carefully. The [OpenAI fine-tuning docs](https://platform.openai.com/docs/guides/fine-tuning) address this, but the responsibility for what you put in the training data is yours.

**Overfitting** is when the model becomes excellent on your training examples but brittle on anything slightly different. Signs of overfitting: training loss keeps falling, but validation loss starts rising. The model produces exactly the outputs you trained it on, but fails on edge cases. The fix is early stopping (stop training when validation loss bottoms out) and a more diverse training set.

**Bias amplification** is subtle and worth naming. If your training data has systematic biases - even ones you didn't notice - fine-tuning will make those biases more pronounced, not less. A model trained on your customer support transcripts will learn the assumptions baked into those transcripts.

I've written about how [AI hallucination](/blog/what-is-hallucination-in-ai) is a related problem in base models - fine-tuning doesn't eliminate hallucination, and can sometimes create confident-sounding hallucinations in a new domain if the model learned a confident tone from your training data without learning the underlying knowledge.

---

## Fine-Tuning in Practice: The 2026 Ecosystem

The practical reality of fine-tuning in 2026 is that the tools have gotten much more accessible, but the conceptual decisions haven't gotten easier.

**The managed API route** is now mature. OpenAI, together with other providers, offers fine-tuning through simple API calls. You upload a JSONL file of training examples, kick off a job, and get back a model ID. No GPU management, no CUDA debugging. This is the right starting point for most teams.

**Open-source fine-tuning** has also become significantly more accessible. Hugging Face's PEFT library and tools like Axolotl and LLaMA Factory handle the LoRA setup, quantization, and training loop for you. If you're comfortable running Python scripts, you can fine-tune a 7B model on a rented A100 for under $20.

**The model size question in 2026:** Larger base models fine-tune better from smaller datasets. A 70B model fine-tuned on 200 examples will often outperform a 7B model fine-tuned on the same 200 examples - because the larger model already has richer internal representations to build on. But the inference cost is proportionally higher.

The teams I've seen get the best ROI from fine-tuning are the ones running [AI coding tools](/best-of/best-ai-code-assistants) or writing tools where the output schema is tightly defined. Tools like those reviewed in [best AI writing tools](/best-of/best-ai-writing-tools) often use fine-tuned models under the hood for specific task types.

**Embeddings and fine-tuning are sometimes confused.** Fine-tuning changes model weights. [Embedding models](/blog/what-is-embedding-in-ai) convert text into numeric vectors for similarity search. You can fine-tune an embedding model on domain-specific text to improve retrieval quality - that's a separate technique from fine-tuning a generative model. Both are valid, both matter, but they solve different problems.

If you're researching which AI tools have invested in fine-tuned capabilities, the [RawPickAI 2026 AI tools reality check study](/studies/2026-ai-tools-reality-check) covers how several major platforms handle this under the hood.

<svg viewBox="0 0 680 270" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="270" fill="#F4F1EA" rx="12"/>
  <text x="340" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">Fine-Tuning Options in 2026</text>
  <text x="340" y="50" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Effort vs control trade-off by approach</text>

  <!-- Y axis label (no transform on text) -->
  <text x="14" y="145" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">C</text>
  <text x="14" y="157" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">o</text>
  <text x="14" y="169" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">n</text>
  <text x="14" y="181" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">t</text>
  <!-- X axis label -->
  <text x="340" y="258" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Effort / Setup Complexity</text>

  <!-- Axes -->
  <line x1="60" y1="65" x2="60" y2="230" stroke="#DDD8CE" strokeWidth="1.5"/>
  <line x1="60" y1="230" x2="630" y2="230" stroke="#DDD8CE" strokeWidth="1.5"/>

  <!-- Y ticks -->
  <text x="50" y="72" textAnchor="end" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">High</text>
  <text x="50" y="150" textAnchor="end" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">Med</text>
  <text x="50" y="228" textAnchor="end" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">Low</text>

  <!-- X ticks -->
  <text x="100" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">Low</text>
  <text x="340" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">Medium</text>
  <text x="580" y="248" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#8A8577">High</text>

  <!-- Bubbles: effort (x), control (y) -->
  <!-- Managed API (low effort, low control) -->
  <circle cx="130" cy="195" r="32" fill="#6B7C5E" opacity="0.85"/>
  <text x="130" y="191" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#F4F1EA">Managed</text>
  <text x="130" y="204" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#F4F1EA">API (OpenAI)</text>

  <!-- LoRA on cloud GPU (medium effort, medium control) -->
  <circle cx="330" cy="140" r="36" fill="#96845A" opacity="0.85"/>
  <text x="330" y="136" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#F4F1EA">LoRA / PEFT</text>
  <text x="330" y="149" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#F4F1EA">cloud GPU</text>

  <!-- Full fine-tune on own infra (high effort, high control) -->
  <circle cx="535" cy="85" r="38" fill="#4A5942" opacity="0.85"/>
  <text x="535" y="81" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#F4F1EA">Full FT</text>
  <text x="535" y="94" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#F4F1EA">own infra</text>
</svg>

The three tiers of the 2026 fine-tuning ecosystem each serve different team profiles. Managed APIs suit product teams who want a working fine-tuned model fast without ML engineering overhead. LoRA on cloud GPUs suits teams with Python skills who want more model choice and lower per-token inference costs. Full fine-tuning on owned infrastructure suits companies with data security requirements or very high inference volume.

One thing I've seen trip up teams: confusing what fine-tuning can control (output style, format, domain tone) with what it can't (factual accuracy, up-to-date knowledge, reasoning depth). Understanding [what hallucination is in AI](/blog/what-is-hallucination-in-ai) helps set realistic expectations for what a fine-tuned model will and won't fix. You can fine-tune away hallucination patterns caused by poor tone matching, but you can't fine-tune in accurate facts the base model never learned.

---

## Practical Steps to Start Your First Fine-Tune

Starting your first fine-tuning project is less intimidating than it looks if you follow a structured process.

**First: define the task exactly.** Write out 5 perfect input-output pairs before you write any code or upload anything. If you can't write 5 examples you're confident about, the task isn't defined enough to fine-tune.

**Second: build your dataset in JSONL format.** For chat-style models, each line is a JSON object with a "messages" array containing system, user, and assistant turns. For the OpenAI API, the format is documented and consistent. Aim for at least 100 examples before spending money on a training run.

**Third: split your data.** Keep 10-20% as a validation set that never enters training. This is how you detect overfitting. If you put everything in training, you have no way to know if your model is actually learning the pattern or memorizing examples.

**Fourth: start with fewer epochs than you think you need.** Three epochs is often enough. More epochs = more risk of overfitting. Let the validation loss guide you, not intuition about "more training = better."

**Fifth: test adversarially.** After training, don't just run your model on examples that look like training data. Probe it with edge cases, weird formats, out-of-distribution inputs. That's how you discover if you've overfit or created unexpected behavior.

<svg viewBox="0 0 680 310" xmlns="http://www.w3.org/2000/svg" width="100%" style={{maxWidth:"680px",display:"block",margin:"2rem auto"}}>
  <rect width="680" height="310" fill="#F4F1EA" rx="12"/>
  <text x="340" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#4A5942">First Fine-Tune: Checklist</text>

  <!-- Step rows -->
  <!-- Step 1 -->
  <rect x="30" y="50" width="36" height="36" rx="8" fill="#6B7C5E"/>
  <text x="48" y="74" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#F4F1EA">1</text>
  <rect x="78" y="50" width="572" height="36" rx="8" fill="#DDD8CE"/>
  <text x="364" y="68" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Define the task. Write 5 perfect examples before any code.</text>
  <text x="364" y="82" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">If you can't write 5 confident examples, the task is not ready.</text>

  <!-- Step 2 -->
  <rect x="30" y="100" width="36" height="36" rx="8" fill="#6B7C5E"/>
  <text x="48" y="124" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#F4F1EA">2</text>
  <rect x="78" y="100" width="572" height="36" rx="8" fill="#DDD8CE"/>
  <text x="364" y="118" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Build dataset in JSONL. Include system, user, and assistant turns.</text>
  <text x="364" y="132" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">Target 100+ examples before the first training run.</text>

  <!-- Step 3 -->
  <rect x="30" y="150" width="36" height="36" rx="8" fill="#6B7C5E"/>
  <text x="48" y="174" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#F4F1EA">3</text>
  <rect x="78" y="150" width="572" height="36" rx="8" fill="#DDD8CE"/>
  <text x="364" y="168" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Split data: keep 10-20% as a held-out validation set.</text>
  <text x="364" y="182" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">This is your overfitting detector.</text>

  <!-- Step 4 -->
  <rect x="30" y="200" width="36" height="36" rx="8" fill="#96845A"/>
  <text x="48" y="224" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#F4F1EA">4</text>
  <rect x="78" y="200" width="572" height="36" rx="8" fill="#DDD8CE"/>
  <text x="364" y="218" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Train with 3 epochs max. Watch validation loss - stop early if it rises.</text>
  <text x="364" y="232" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">More epochs = more overfitting risk.</text>

  <!-- Step 5 -->
  <rect x="30" y="250" width="36" height="36" rx="8" fill="#96845A"/>
  <text x="48" y="274" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fontWeight="bold" fill="#F4F1EA">5</text>
  <rect x="78" y="250" width="572" height="36" rx="8" fill="#DDD8CE"/>
  <text x="364" y="268" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill="#3A3228">Test adversarially. Edge cases, weird formats, out-of-distribution inputs.</text>
  <text x="364" y="282" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fill="#8A8577">If it breaks on edge cases, you've overfit.</text>
</svg>

There's a sixth step I didn't list on the checklist, because it's really a mindset: **measure before you claim success.** Human evaluators rating 50-100 examples before and after fine-tuning give you the only real signal that matters. A loss curve that looks clean doesn't automatically mean real-world improvement.

I've seen teams celebrate a training run that reduced loss by 40% - only to discover the model was now extremely confident and wrong in ways the base model had been uncertain and correct. Loss tracks training-set fit, not task performance. Those are related but not the same.

**How to handle failures when they happen.** The most common fine-tuning failures and their causes:

If the model outputs training-set phrases verbatim - you have fewer than 200 examples, or you ran too many epochs. The model memorized instead of learned.

If the model ignores your target format on long outputs - the training examples were all short. Add longer examples that demonstrate the format holding across 400+ token responses.

If the model regresses on tasks it previously handled - you need a more diverse training set. Include 10-15% "general" examples (outside your target domain) to preserve broad capability.

If quality is inconsistent across topics - your training data was inconsistent. Audit 20 random examples and look for format drift, tone changes, or correctness issues in the training set itself.

If you want to understand the broader AI ecosystem these techniques fit into, the [best AI agents guide for 2026](/blog/best-ai-agents-2026) shows how fine-tuned models are increasingly powering [AI agent](/blog/what-is-an-ai-agent) behaviors. And if you're evaluating AI coding assistants that use fine-tuning, the [Claude Code vs Cursor comparison](/blog/claude-code-vs-cursor-3) and [best AI coding tools 2026](/blog/best-ai-coding-tools-2026) cover how fine-tuning factors into real tool performance.

One final thing I want to emphasize: the quality of your evaluation matters as much as the quality of your training data. You need a way to measure whether your fine-tuned model is actually better on your task - not just a gut feeling. Build a small human evaluation set, and score it before and after fine-tuning. That's the only way to know if the cost was worth it.

For readers who want to compare current top models before deciding which to fine-tune, the [Claude Opus 4 review](/blog/claude-opus-4-7-review) and the [model comparison piece](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) are good starting points for understanding base model capabilities.

---

## Frequently Asked Questions

**How many examples do I need to fine-tune a model?**

The minimum viable dataset depends heavily on task complexity. For simple, consistent formatting tasks, 100-200 high-quality examples can be enough to see improvement. For nuanced style, tone, or domain knowledge, 500-2,000 examples is a more realistic target. Quality beats quantity every time - 300 clean, consistent examples outperform 3,000 inconsistent ones.

**Does fine-tuning make a model smarter?**

No - and this is one of the most common misconceptions. Fine-tuning redirects existing capability; it doesn't add new reasoning ability. A fine-tuned GPT-4o mini won't reason better than GPT-4o on complex problems. It will produce outputs that more consistently match your target distribution. Think of it as specialization, not intelligence amplification.

**Can I fine-tune any model?**

Not all models expose fine-tuning access. OpenAI allows fine-tuning on GPT-4o, GPT-4o mini, and selected other models. Open-source models (Llama, Mistral, Gemma families) can be fine-tuned by anyone with the right hardware or cloud access. Closed models like Claude, Gemini, and others have limited or no public fine-tuning APIs as of mid-2026, though enterprise agreements sometimes include this.

**How long does fine-tuning take?**

For managed API providers (like OpenAI), a small job of 500-1,000 examples typically completes in 15-45 minutes. For self-hosted runs on cloud GPUs, a 7B model on 1,000 examples at three epochs takes 1-3 hours. Larger models (70B) at scale can take days. The actual compute time is often shorter than the data preparation time.

**Will fine-tuning remove a model's safety guardrails?**

This is a real risk and an active area of research. Fine-tuning on certain types of content can degrade safety behavior, even unintentionally. Reputable fine-tuning APIs include safeguards in the training pipeline. If you're fine-tuning open-source models without guardrails, you take on full responsibility for the model's behavior.

**Is fine-tuning the same as training from scratch?**

No - they're very different in scale and cost. Training a model from scratch means starting with random weights and processing hundreds of billions of tokens over weeks on thousands of GPUs. Fine-tuning starts from existing weights and adjusts them on thousands to millions of tokens over hours or days. The cost difference is roughly 100x to 10,000x, depending on model size.

**What file format do I need for fine-tuning data?**

For most managed APIs, JSONL (JSON Lines) format is standard - one JSON object per line. Each object typically contains a "messages" array with system, user, and assistant turns. Some APIs use simple "prompt" and "completion" pairs for older-style completions endpoints. Always check your specific provider's documentation format before building your dataset.

**Can I fine-tune a model on my private data without sharing it?**

Yes - with caveats. If you fine-tune through an API provider, your data is transmitted to their servers. You need to review their data handling policy. If you self-host the training run on your own infrastructure (or a private cloud instance), the data never leaves your environment. For very sensitive data, self-hosted fine-tuning is the safer choice.

**How do I know if my fine-tuned model is actually better?**

Build a held-out evaluation set before you start training - 50-100 examples that don't go into the training data. Score the base model and your fine-tuned model on this set using either automated metrics (like exact match rate on structured outputs) or human rating. If the fine-tuned model doesn't measurably improve on this set, the fine-tuning didn't work.

**What's the difference between fine-tuning and few-shot prompting?**

Few-shot prompting includes example input-output pairs directly in the prompt at inference time - no weight changes occur. Fine-tuning bakes those patterns into the model's weights through training. Few-shot prompting is faster to iterate, but uses up context window space and adds token costs per call. Fine-tuning has upfront cost but produces a leaner inference-time prompt and more consistent behavior on long outputs.
