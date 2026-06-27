---
title: "What Is Mixture of Experts (MoE)?"
description: "Mixture of Experts is an architecture where only a subset of a model's parameters activate per token, making very large models faster and cheaper to run."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-mixture-of-experts"
author: "Ash"
---


Mixture of Experts (MoE) is an AI architecture where a model contains many specialized sub-networks called "experts," but only a small fraction of them activate for any given input token - making the model far more efficient to run than its total parameter count would suggest.

That single idea - conditional computation - is why Mixtral 8x7B can match GPT-3.5's quality while using roughly the same compute per token as a 12B dense model. It's why GPT-4's inference costs are lower than you'd expect from a model at that capability level. And it's why MoE has quietly become one of the most important architectural decisions in frontier AI.

I've spent the last year running MoE and dense models side by side across writing, coding, and reasoning tasks, and the practical tradeoffs are more nuanced than most explainers let on. This article covers what MoE actually does, how the routing mechanism works, where it wins and where it struggles, and when the architecture actually matters for how you choose your tools.

---

## What Is Mixture of Experts?

Mixture of Experts is an architecture in which a [large language model](/blog/what-is-a-large-language-model) routes each input token through only a small subset of its available neural network modules (the "experts"), rather than passing every token through all parameters in the network.

The concept predates modern deep learning. The original MoE framework was described by Jacobs, Jordan, Nowlan, and Hinton in 1991 - the idea being that different experts specialize in different regions of the input space, and a gating network learns to select the right expert for each input. What changed in the last few years is applying this idea inside transformer feed-forward layers at enormous scale, which turned a 30-year-old idea into the architecture powering some of the most capable models alive.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="30" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942">Sparse MoE: How Parameters Activate</text>
  <!-- Token input -->
  <rect x="290" y="50" width="120" height="36" rx="8" fill="#6B7C5E"/>
  <text x="350" y="73" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">Input Token</text>
  <!-- Arrow down to router -->
  <line x1="350" y1="86" x2="350" y2="114" stroke="#8A8577" stroke-width="2" marker-end="url(#arrowMoe)"/>
  <!-- Router box -->
  <rect x="265" y="114" width="170" height="36" rx="8" fill="#96845A"/>
  <text x="350" y="137" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">Router / Gating Network</text>
  <!-- Experts row -->
  <text x="350" y="175" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Selects top-2 of 8 experts</text>
  <!-- 8 expert boxes -->
  <!-- Expert 1 (active) -->
  <rect x="28" y="190" width="68" height="50" rx="8" fill="#6B7C5E"/>
  <text x="62" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#F4F1EA">Expert 1</text>
  <text x="62" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">ACTIVE</text>
  <!-- Expert 2 (inactive) -->
  <rect x="108" y="190" width="68" height="50" rx="8" fill="#DDD8CE"/>
  <text x="142" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Expert 2</text>
  <text x="142" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">skip</text>
  <!-- Expert 3 (inactive) -->
  <rect x="188" y="190" width="68" height="50" rx="8" fill="#DDD8CE"/>
  <text x="222" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Expert 3</text>
  <text x="222" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">skip</text>
  <!-- Expert 4 (inactive) -->
  <rect x="268" y="190" width="68" height="50" rx="8" fill="#DDD8CE"/>
  <text x="302" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Expert 4</text>
  <text x="302" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">skip</text>
  <!-- Expert 5 (active) -->
  <rect x="348" y="190" width="68" height="50" rx="8" fill="#6B7C5E"/>
  <text x="382" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#F4F1EA">Expert 5</text>
  <text x="382" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">ACTIVE</text>
  <!-- Expert 6 (inactive) -->
  <rect x="428" y="190" width="68" height="50" rx="8" fill="#DDD8CE"/>
  <text x="462" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Expert 6</text>
  <text x="462" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">skip</text>
  <!-- Expert 7 (inactive) -->
  <rect x="508" y="190" width="68" height="50" rx="8" fill="#DDD8CE"/>
  <text x="542" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Expert 7</text>
  <text x="542" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">skip</text>
  <!-- Expert 8 (inactive) -->
  <rect x="588" y="190" width="68" height="50" rx="8" fill="#DDD8CE"/>
  <text x="622" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Expert 8</text>
  <text x="622" y="228" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">skip</text>
  <!-- Router lines to active experts -->
  <line x1="320" y1="150" x2="62" y2="190" stroke="#6B7C5E" stroke-width="2" opacity="0.8"/>
  <line x1="380" y1="150" x2="382" y2="190" stroke="#6B7C5E" stroke-width="2" opacity="0.8"/>
  <!-- Light lines to inactive -->
  <line x1="350" y1="150" x2="142" y2="190" stroke="#DDD8CE" stroke-width="1" opacity="0.5"/>
  <line x1="350" y1="150" x2="222" y2="190" stroke="#DDD8CE" stroke-width="1" opacity="0.5"/>
  <line x1="350" y1="150" x2="302" y2="190" stroke="#DDD8CE" stroke-width="1" opacity="0.5"/>
  <line x1="350" y1="150" x2="462" y2="190" stroke="#DDD8CE" stroke-width="1" opacity="0.5"/>
  <line x1="350" y1="150" x2="542" y2="190" stroke="#DDD8CE" stroke-width="1" opacity="0.5"/>
  <line x1="350" y1="150" x2="622" y2="190" stroke="#DDD8CE" stroke-width="1" opacity="0.5"/>
  <!-- Combine arrow -->
  <line x1="62" y1="240" x2="300" y2="278" stroke="#6B7C5E" stroke-width="2" marker-end="url(#arrowMoe)"/>
  <line x1="382" y1="240" x2="400" y2="278" stroke="#6B7C5E" stroke-width="2" marker-end="url(#arrowMoe)"/>
  <!-- Output box -->
  <rect x="255" y="282" width="190" height="36" rx="8" fill="#4A5942"/>
  <text x="350" y="305" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">Weighted Output</text>
  <!-- Bottom label -->
  <text x="350" y="342" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">6 of 8 experts use zero compute for this token.</text>
  <defs>
    <marker id="arrowMoe" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 z" fill="#8A8577"/>
    </marker>
  </defs>
</svg>

Here's the core mechanic. In a standard [transformer architecture](/blog/what-is-the-transformer-architecture), every token passes through every parameter in the feed-forward layers - the network is "dense." In an MoE model, the feed-forward layers are replaced with a collection of parallel expert networks (each structurally identical, but with separate learned weights) plus a small routing network.

For each token, the router computes a score for every expert, selects the top-K (usually 2), sends the token through just those experts, and combines the outputs in proportion to the routing weights. The other N-K experts don't run at all for that token - their parameters exist in memory, but contribute zero floating-point operations.

A model described as "8x7B" (like Mixtral) has 8 experts each of 7B parameters each, for 56B total parameters. But with top-2 routing, only about 12-14B parameters activate per token forward pass. You get the expressivity of a 56B model at something closer to the inference cost of a 13B model.

This is the reason MoE has attracted so much engineering attention: it's one of the few architectural moves that expands model capacity without a proportional increase in inference cost.

---

## How the Router Decides Which Experts to Activate

The router is a small linear layer that maps each token's hidden representation to a score for each expert, and those scores determine which experts process that token.

In practice, the routing mechanism looks like this. Given a token's hidden state vector, the router applies a learned weight matrix to produce a logit per expert. Those logits pass through a softmax to get probabilities. Then the model takes the top-K experts by probability, normalizes those K weights so they sum to 1, computes each selected expert's output, and returns their weighted sum.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="300" rx="12" fill="#F4F1EA"/>
  <text x="350" y="28" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">Router: Score to Selection</text>
  <!-- Step labels along top -->
  <rect x="30" y="44" width="130" height="28" rx="6" fill="#DDD8CE"/>
  <text x="95" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">1. Token Vector</text>
  <rect x="190" y="44" width="130" height="28" rx="6" fill="#DDD8CE"/>
  <text x="255" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">2. Expert Scores</text>
  <rect x="350" y="44" width="130" height="28" rx="6" fill="#DDD8CE"/>
  <text x="415" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">3. Softmax</text>
  <rect x="510" y="44" width="160" height="28" rx="6" fill="#6B7C5E"/>
  <text x="590" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">4. Top-K Selected</text>
  <!-- Arrows between steps -->
  <line x1="160" y1="58" x2="190" y2="58" stroke="#8A8577" stroke-width="1.5" marker-end="url(#arrowR)"/>
  <line x1="320" y1="58" x2="350" y2="58" stroke="#8A8577" stroke-width="1.5" marker-end="url(#arrowR)"/>
  <line x1="480" y1="58" x2="510" y2="58" stroke="#8A8577" stroke-width="1.5" marker-end="url(#arrowR)"/>
  <!-- Bar chart of expert scores (step 2) -->
  <text x="95" y="98" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">d-dim hidden</text>
  <text x="95" y="112" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">state vector</text>
  <!-- Scores bars -->
  <rect x="192" y="188" width="18" height="50" rx="3" fill="#DDD8CE"/>
  <text x="201" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E1</text>
  <text x="201" y="183" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">0.4</text>
  <rect x="216" y="158" width="18" height="80" rx="3" fill="#96845A"/>
  <text x="225" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E2</text>
  <text x="225" y="153" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#96845A">0.8</text>
  <rect x="240" y="208" width="18" height="30" rx="3" fill="#DDD8CE"/>
  <text x="249" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E3</text>
  <text x="249" y="203" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">0.2</text>
  <rect x="264" y="168" width="18" height="70" rx="3" fill="#6B7C5E"/>
  <text x="273" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E4</text>
  <text x="273" y="163" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#6B7C5E">0.7</text>
  <rect x="288" y="218" width="18" height="20" rx="3" fill="#DDD8CE"/>
  <text x="297" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E5</text>
  <text x="297" y="213" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">0.1</text>
  <!-- Softmax bars (probabilities) -->
  <rect x="355" y="193" width="18" height="45" rx="3" fill="#DDD8CE"/>
  <text x="364" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E1</text>
  <rect x="379" y="153" width="18" height="85" rx="3" fill="#96845A"/>
  <text x="388" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E2</text>
  <rect x="403" y="213" width="18" height="25" rx="3" fill="#DDD8CE"/>
  <text x="412" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E3</text>
  <rect x="427" y="163" width="18" height="75" rx="3" fill="#6B7C5E"/>
  <text x="436" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E4</text>
  <rect x="451" y="225" width="18" height="13" rx="3" fill="#DDD8CE"/>
  <text x="460" y="251" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E5</text>
  <!-- Top-K result -->
  <rect x="515" y="100" width="160" height="44" rx="8" fill="#96845A" opacity="0.85"/>
  <text x="595" y="122" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Expert 2 (weight 0.53)</text>
  <text x="595" y="137" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#F4F1EA">selected</text>
  <rect x="515" y="154" width="160" height="44" rx="8" fill="#6B7C5E" opacity="0.85"/>
  <text x="595" y="176" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Expert 4 (weight 0.47)</text>
  <text x="595" y="191" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#F4F1EA">selected</text>
  <rect x="515" y="208" width="160" height="36" rx="8" fill="#DDD8CE"/>
  <text x="595" y="226" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">E1, E3, E5: skipped</text>
  <text x="595" y="239" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">zero compute</text>
  <!-- Bottom note -->
  <text x="350" y="278" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Top-2 routing is most common. Top-1 is used in some efficient variants.</text>
  <defs>
    <marker id="arrowR" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
      <path d="M0,0 L0,7 L7,3.5 z" fill="#8A8577"/>
    </marker>
  </defs>
</svg>

The elegance here is that the routing is fully differentiable end-to-end - the whole thing trains by gradient descent like any other transformer component. The model learns both what each expert should specialize in and when to route to it, purely from training signal.

That said, there's a well-known instability problem: without constraints, the router tends to collapse toward always using the same one or two experts, leaving the others undertrained. This is called "expert collapse" or "load imbalance," and every MoE implementation has to solve it.

Google's Switch Transformer paper (2021) - [available on arxiv](https://arxiv.org/abs/2101.03961) - introduced an auxiliary load-balancing loss that penalizes the router for routing too many tokens to the same expert. During training, a fraction of the total loss comes from this auxiliary term, which encourages the router to spread tokens more evenly across experts. The Mixtral paper uses a similar approach, and most production MoE implementations follow the same pattern.

Another technique is adding small random noise to the routing logits during training. This breaks symmetry early in training before the router has a chance to establish a dominant-expert habit.

Some newer MoE variants also use "expert choice" routing, where instead of each token choosing its top-K experts, each expert chooses its top-K tokens from the batch. This guarantees perfect load balance by construction, at the cost of some routing flexibility.

One thing that often surprises people: the learned routing patterns are not as interpretable as you'd hope. You can visualize which experts get routed which tokens, and there are some broad patterns (different experts do tend toward different token types or domains), but it's not a clean "Expert 3 handles math, Expert 7 handles code" split. The specialization is subtler and distributed.

---

## MoE vs Dense Models - The Efficiency Trade-off

In an MoE model, the ratio of total parameters to active parameters per token is the key efficiency metric - and that ratio determines both the quality ceiling and the deployment cost.

Dense models activate all their parameters for every token. A 70B dense model runs 70B parameters per forward pass per token - that's the compute cost, and also roughly the memory you need on-chip for inference (in practice, weight quantization reduces this). An MoE model with 70B total parameters but top-2 routing across 8 experts activates roughly 17-18B parameters per token, cutting inference FLOPs by about 75%.

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="320" rx="12" fill="#F4F1EA"/>
  <text x="350" y="28" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">Total Params vs Active Params Per Token</text>
  <!-- Y axis label -->
  <text x="22" y="110" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Params</text>
  <text x="22" y="124" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">(billions)</text>
  <!-- Axes -->
  <line x1="70" y1="250" x2="650" y2="250" stroke="#DDD8CE" stroke-width="2"/>
  <line x1="70" y1="60" x2="70" y2="250" stroke="#DDD8CE" stroke-width="2"/>
  <!-- Y gridlines and labels -->
  <line x1="70" y1="210" x2="650" y2="210" stroke="#DDD8CE" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="58" y="214" text-anchor="end" font-family="sans-serif" font-size="10" fill="#8A8577">20B</text>
  <line x1="70" y1="170" x2="650" y2="170" stroke="#DDD8CE" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="58" y="174" text-anchor="end" font-family="sans-serif" font-size="10" fill="#8A8577">40B</text>
  <line x1="70" y1="130" x2="650" y2="130" stroke="#DDD8CE" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="58" y="134" text-anchor="end" font-family="sans-serif" font-size="10" fill="#8A8577">60B</text>
  <line x1="70" y1="90" x2="650" y2="90" stroke="#DDD8CE" stroke-width="1" stroke-dasharray="4,4"/>
  <text x="58" y="94" text-anchor="end" font-family="sans-serif" font-size="10" fill="#8A8577">80B</text>
  <!-- Group 1: Llama 3 70B dense -->
  <rect x="100" y="90" width="55" height="160" rx="6" fill="#96845A"/>
  <text x="127" y="108" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">Total</text>
  <text x="127" y="120" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">70B</text>
  <rect x="165" y="90" width="55" height="160" rx="6" fill="#6B7C5E"/>
  <text x="192" y="108" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">Active</text>
  <text x="192" y="120" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">70B</text>
  <text x="149" y="268" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Dense 70B</text>
  <text x="149" y="280" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">(e.g. Llama 3)</text>
  <!-- Group 2: Mixtral 8x7B -->
  <rect x="270" y="70" width="55" height="180" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="297" y="88" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">Total</text>
  <text x="297" y="100" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">~46B</text>
  <rect x="335" y="184" width="55" height="66" rx="6" fill="#6B7C5E"/>
  <text x="362" y="200" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">Active</text>
  <text x="362" y="214" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">~13B</text>
  <text x="315" y="268" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Mixtral 8x7B</text>
  <text x="315" y="280" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">(MoE)</text>
  <!-- Group 3: Hypothetical large MoE -->
  <rect x="490" y="62" width="55" height="188" rx="6" fill="#96845A" opacity="0.4"/>
  <text x="517" y="80" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">Total</text>
  <text x="517" y="92" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">~500B+</text>
  <rect x="555" y="202" width="55" height="48" rx="6" fill="#6B7C5E" opacity="0.8"/>
  <text x="582" y="218" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">Active</text>
  <text x="582" y="230" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">~20B</text>
  <text x="528" y="268" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Large MoE</text>
  <text x="528" y="280" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">(frontier scale)</text>
  <!-- Legend -->
  <rect x="100" y="296" width="14" height="10" rx="2" fill="#96845A" opacity="0.7"/>
  <text x="120" y="305" font-family="sans-serif" font-size="10" fill="#8A8577">Total parameters (in memory)</text>
  <rect x="340" y="296" width="14" height="10" rx="2" fill="#6B7C5E"/>
  <text x="360" y="305" font-family="sans-serif" font-size="10" fill="#8A8577">Active per token (compute cost)</text>
</svg>

The trade-off is not symmetric, though. Total parameters still matter for memory at inference time. To run Mixtral 8x7B, you still need to load all ~46B parameters into GPU VRAM - even though only ~13B will activate for each token. The unused experts can't be stored on disk during inference, because the routing decision is made at runtime. This is what makes MoE models difficult to self-host on consumer hardware despite their competitive inference speeds in cloud settings.

For a dense model like Llama 3 70B at half-precision (FP16), you need about 140GB of VRAM. Mixtral 8x7B at FP16 needs roughly 90GB - still substantial, though you get the effective capacity of a much larger model.

Here's the quality story. On most standard benchmarks, Mixtral 8x7B outperformed the original Llama 2 70B despite using fewer active parameters per token. Why? Because during training, the model sees more diverse parameter configurations - different experts develop different statistical strengths, and the routing mechanism learns to combine them appropriately. The model has effectively learned from a larger parameter space even if it uses less of it at inference time.

This is the key insight that doesn't show up in a simple FLOP count comparison. MoE models can punch above their active-parameter weight during inference because their training was more parameter-rich.

The tradeoff starts to go the other way in latency-sensitive, single-user scenarios. If you're running one query at a time on local hardware, expert routing adds overhead. The real throughput advantage of MoE shows up in high-concurrency server deployments where you're batching many requests simultaneously - in that setting, the reduced active-parameter count translates directly to higher tokens-per-second and lower cost per token.

---

## Real MoE Models in 2026

The clearest confirmation that MoE works at the frontier is that most of the most capable models currently available use it - even if the companies behind them haven't officially confirmed the architecture.

Here's what we know and what we can reasonably infer as of mid-2026.

**Mixtral 8x22B and 8x7B (Mistral AI)** are the most architecturally transparent MoE models available. Mistral released both with documentation confirming the number of experts, top-K routing (K=2), and the load-balancing approach. Mixtral 8x22B has approximately 141B total parameters, activating around 39B per token. It represents one of the clearest proof points that MoE scales well - it outperforms many dense models two to three times its active-parameter size on coding and reasoning tasks.

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="280" rx="12" fill="#F4F1EA"/>
  <text x="350" y="26" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">MoE Models in 2026</text>
  <!-- Header row -->
  <rect x="20" y="38" width="160" height="26" rx="5" fill="#DDD8CE"/>
  <text x="100" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Model</text>
  <rect x="186" y="38" width="100" height="26" rx="5" fill="#DDD8CE"/>
  <text x="236" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Experts</text>
  <rect x="292" y="38" width="100" height="26" rx="5" fill="#DDD8CE"/>
  <text x="342" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Total Params</text>
  <rect x="398" y="38" width="100" height="26" rx="5" fill="#DDD8CE"/>
  <text x="448" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Active/Token</text>
  <rect x="504" y="38" width="175" height="26" rx="5" fill="#DDD8CE"/>
  <text x="591" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Confirmed?</text>
  <!-- Row 1 -->
  <rect x="20" y="70" width="660" height="30" rx="4" fill="#6B7C5E" opacity="0.08"/>
  <text x="100" y="90" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Mixtral 8x7B</text>
  <text x="236" y="90" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">8 (top-2)</text>
  <text x="342" y="90" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">~46B</text>
  <text x="448" y="90" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">~13B</text>
  <text x="591" y="90" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6B7C5E">Yes (open weights)</text>
  <!-- Row 2 -->
  <text x="100" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Mixtral 8x22B</text>
  <text x="236" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">8 (top-2)</text>
  <text x="342" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">~141B</text>
  <text x="448" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">~39B</text>
  <text x="591" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6B7C5E">Yes (open weights)</text>
  <!-- Row 3 -->
  <rect x="20" y="130" width="660" height="30" rx="4" fill="#6B7C5E" opacity="0.08"/>
  <text x="100" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">GPT-4 (rumored)</text>
  <text x="236" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">~16 (top-2)</text>
  <text x="342" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">~1.8T (est.)</text>
  <text x="448" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">~220B (est.)</text>
  <text x="591" y="150" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#96845A">Leaked/Inferred</text>
  <!-- Row 4 -->
  <text x="100" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Gemini Ultra</text>
  <text x="236" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Unknown</text>
  <text x="342" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Undisclosed</text>
  <text x="448" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Undisclosed</text>
  <text x="591" y="180" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#96845A">Strongly inferred</text>
  <!-- Row 5 -->
  <rect x="20" y="190" width="660" height="30" rx="4" fill="#6B7C5E" opacity="0.08"/>
  <text x="100" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">DeepSeek-V3</text>
  <text x="236" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">256 (top-8)</text>
  <text x="342" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">671B</text>
  <text x="448" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">37B</text>
  <text x="591" y="210" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#6B7C5E">Yes (open weights)</text>
  <!-- Note -->
  <text x="350" y="254" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">GPT-4 architecture estimates based on reported leaks. Not official.</text>
  <text x="350" y="268" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">DeepSeek-V3 uses fine-grained expert segmentation with shared experts.</text>
</svg>

**GPT-4** is widely believed to be an MoE model based on information that leaked through various channels in 2023. The commonly cited numbers - 8 experts, 220B active parameters, roughly 1.8T total - have never been confirmed by OpenAI, and should be treated as informed estimates rather than facts. What is evident from the API's inference behavior is that it's far more capable than what a dense 220B model would typically produce, which is consistent with MoE architecture giving you frontier-quality output at a fraction of the parameter activation cost.

**Gemini Ultra** (and likely the broader Gemini 1.5 and 2.0 family) is strongly inferred to use MoE based on Google's research trajectory. The Switch Transformer paper came from Google Brain, as did follow-up work on GLaM and other MoE systems. It would be architecturally surprising if Gemini's frontier models didn't incorporate MoE. Google hasn't published specifics, which is normal for closed frontier systems.

**DeepSeek-V3** is arguably the most architecturally interesting openly documented MoE deployment. It uses 256 "fine-grained" experts with top-8 routing, plus two "shared experts" that always activate regardless of routing scores. This split between routed and shared experts is a newer design choice that helps maintain a consistent base capability while still getting specialization benefits. With 671B total parameters but only 37B active per token, it achieves near-frontier performance at a fraction of the inference cost.

The broader trend is clear. If you're comparing models for your [business use case](/blog/how-to-choose-an-ai-model-for-your-business), most frontier models are now MoE under the hood - which means understanding MoE helps you understand why inference costs vary so much between providers even when capability is similar.

---

## The Catch: MoE Models Are Harder to Deploy

MoE architecture introduces three deployment challenges that don't exist with dense models: memory requirements that exceed what the active-parameter count suggests, load balancing complexity in production, and communication overhead in multi-GPU setups.

Let me go through each one, because they're why you can't just assume "MoE = cheaper to run" in all contexts.

<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="310" rx="12" fill="#F4F1EA"/>
  <text x="350" y="28" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">MoE Deployment Challenges</text>
  <!-- Challenge 1: Memory -->
  <rect x="28" y="46" width="196" height="230" rx="10" fill="#DDD8CE"/>
  <text x="126" y="68" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Memory Load</text>
  <!-- Memory bar -->
  <rect x="58" y="82" width="136" height="130" rx="6" fill="#F4F1EA"/>
  <rect x="58" y="82" width="136" height="130" rx="6" fill="none" stroke="#8A8577" stroke-width="1"/>
  <!-- All experts in memory -->
  <rect x="66" y="90" width="120" height="18" rx="4" fill="#6B7C5E" opacity="0.5"/>
  <text x="126" y="103" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">Expert 1-8 in VRAM</text>
  <rect x="66" y="112" width="120" height="12" rx="3" fill="#96845A" opacity="0.4"/>
  <rect x="66" y="128" width="120" height="12" rx="3" fill="#96845A" opacity="0.4"/>
  <rect x="66" y="144" width="120" height="12" rx="3" fill="#96845A" opacity="0.4"/>
  <rect x="66" y="160" width="120" height="12" rx="3" fill="#96845A" opacity="0.4"/>
  <rect x="66" y="176" width="120" height="14" rx="3" fill="#DDD8CE"/>
  <text x="126" y="188" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">All loaded</text>
  <!-- Caption -->
  <text x="126" y="228" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">All params in RAM</text>
  <text x="126" y="242" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">even if 75% idle</text>
  <text x="126" y="258" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">per-token</text>
  <!-- Challenge 2: Load balance -->
  <rect x="252" y="46" width="196" height="230" rx="10" fill="#DDD8CE"/>
  <text x="350" y="68" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Load Balancing</text>
  <!-- Uneven bars -->
  <rect x="268" y="182" width="22" height="40" rx="4" fill="#6B7C5E" opacity="0.6"/>
  <text x="279" y="235" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E1</text>
  <rect x="296" y="82" width="22" height="140" rx="4" fill="#96845A"/>
  <text x="307" y="235" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E2</text>
  <text x="307" y="76" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#96845A">overloaded</text>
  <rect x="324" y="172" width="22" height="50" rx="4" fill="#6B7C5E" opacity="0.6"/>
  <text x="335" y="235" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E3</text>
  <rect x="352" y="200" width="22" height="22" rx="4" fill="#6B7C5E" opacity="0.4"/>
  <text x="363" y="235" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E4</text>
  <rect x="380" y="190" width="22" height="32" rx="4" fill="#6B7C5E" opacity="0.6"/>
  <text x="391" y="235" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">E5</text>
  <!-- latency label -->
  <text x="350" y="252" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Hot expert creates</text>
  <text x="350" y="264" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">latency spikes</text>
  <text x="350" y="276" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">aux loss helps, not solves</text>
  <!-- Challenge 3: Multi-GPU -->
  <rect x="476" y="46" width="196" height="230" rx="10" fill="#DDD8CE"/>
  <text x="574" y="68" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Multi-GPU Comms</text>
  <!-- GPU nodes -->
  <rect x="492" y="82" width="70" height="44" rx="6" fill="#6B7C5E" opacity="0.5"/>
  <text x="527" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#F4F1EA">GPU 1</text>
  <text x="527" y="114" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">Experts 1-4</text>
  <rect x="590" y="82" width="70" height="44" rx="6" fill="#96845A" opacity="0.5"/>
  <text x="625" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#F4F1EA">GPU 2</text>
  <text x="625" y="114" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#F4F1EA">Experts 5-8</text>
  <!-- Network arrow -->
  <line x1="562" y1="104" x2="590" y2="104" stroke="#3A3228" stroke-width="2" marker-end="url(#arrowD)"/>
  <text x="576" y="142" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">Token routing</text>
  <text x="576" y="154" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">across network</text>
  <text x="574" y="190" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">All-to-all comms</text>
  <text x="574" y="204" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">per MoE layer</text>
  <text x="574" y="252" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Network bandwidth</text>
  <text x="574" y="264" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">becomes bottleneck</text>
  <defs>
    <marker id="arrowD" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
      <path d="M0,0 L0,7 L7,3.5 z" fill="#3A3228"/>
    </marker>
  </defs>
</svg>

**Memory problem.** As covered above, all expert parameters stay in VRAM the entire time. A useful mental model: MoE reduces compute cost (FLOPs), not memory cost (VRAM). If you're evaluating whether a model fits on a given GPU cluster, you need to think about total parameters, not active parameters. For providers running at scale, this often means using expert parallelism across multiple nodes, adding infrastructure complexity that dense model deployments don't need.

**Load balancing at inference.** The auxiliary load-balancing loss during training helps ensure reasonably even expert utilization, but it's not a guarantee. At inference time, when you're processing real-world request distributions, you can still see hot experts - experts that get routed most tokens for a given input type. If experts are spread across different GPUs (as they are in large deployments), a hot expert creates a compute bottleneck on its GPU while other GPUs sit idle. Production MoE serving systems often implement capacity buffers and overflow mechanisms to handle this.

**Cross-GPU communication.** In large-scale deployment, different experts typically live on different GPUs. That means every MoE layer requires an all-to-all communication step: tokens that got routed to Expert 5 need to be sent from wherever they originated to the GPU that holds Expert 5, then the result needs to come back. This all-to-all communication is expensive in terms of network bandwidth and adds latency. The Switch Transformer paper documented this overhead as one of the main engineering challenges at scale.

These challenges are solvable - Mixtral runs fine in production at Mistral and through the major API providers - but they explain why "MoE is more efficient" isn't a universal statement. It's more efficient when you have the infrastructure to handle it.

For most people choosing tools rather than building them, the practical implication is: MoE models you access via API are priced competitively and run fast in the cloud. MoE models you try to self-host on local hardware are harder to run than their active-parameter count suggests. If you're thinking through [when to use cloud AI vs local AI](/blog/when-to-use-cloud-ai-vs-local-ai), MoE architecture is a genuine factor in that decision.

---

## What I Noticed Testing MoE vs Dense Models Side-by-Side

I've been running structured side-by-side tests comparing MoE and dense models across the same task categories since early 2025, and there are a few patterns I've noticed that most benchmark comparisons miss.

The short version: MoE models are not just "cheaper dense models." They have a distinct behavioral fingerprint, and once you know what to look for, it's recognizable.

<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="330" rx="12" fill="#F4F1EA"/>
  <text x="350" y="26" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">My Task-by-Task Findings: MoE vs Dense</text>
  <!-- Category column headers -->
  <rect x="20" y="38" width="200" height="26" rx="5" fill="#DDD8CE"/>
  <text x="120" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Task Type</text>
  <rect x="226" y="38" width="130" height="26" rx="5" fill="#6B7C5E" opacity="0.3"/>
  <text x="291" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">MoE</text>
  <rect x="362" y="38" width="130" height="26" rx="5" fill="#96845A" opacity="0.3"/>
  <text x="427" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Dense</text>
  <rect x="498" y="38" width="182" height="26" rx="5" fill="#DDD8CE"/>
  <text x="589" y="56" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">My Observation</text>
  <!-- Rows -->
  <rect x="20" y="68" width="660" height="28" rx="3" fill="#6B7C5E" opacity="0.06"/>
  <text x="120" y="87" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Code generation</text>
  <text x="291" y="87" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6B7C5E">Strong</text>
  <text x="427" y="87" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Strong</text>
  <text x="589" y="87" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Comparable at top tier</text>
  <line x1="20" y1="96" x2="680" y2="96" stroke="#DDD8CE" stroke-width="1"/>
  <text x="120" y="115" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Long-form writing</text>
  <text x="291" y="115" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Inconsistent voice</text>
  <text x="427" y="115" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6B7C5E">More consistent</text>
  <text x="589" y="115" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Dense wins on style</text>
  <line x1="20" y1="124" x2="680" y2="124" stroke="#DDD8CE" stroke-width="1"/>
  <rect x="20" y="124" width="660" height="28" rx="3" fill="#6B7C5E" opacity="0.06"/>
  <text x="120" y="143" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Multi-domain Q&amp;A</text>
  <text x="291" y="143" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6B7C5E">Strong</text>
  <text x="427" y="143" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Strong</text>
  <text x="589" y="143" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">MoE slight edge</text>
  <line x1="20" y1="152" x2="680" y2="152" stroke="#DDD8CE" stroke-width="1"/>
  <text x="120" y="171" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Instruction following</text>
  <text x="291" y="171" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Occasional drift</text>
  <text x="427" y="171" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6B7C5E">More reliable</text>
  <text x="589" y="171" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Dense more consistent</text>
  <line x1="20" y1="180" x2="680" y2="180" stroke="#DDD8CE" stroke-width="1"/>
  <rect x="20" y="180" width="660" height="28" rx="3" fill="#6B7C5E" opacity="0.06"/>
  <text x="120" y="199" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Factual recall</text>
  <text x="291" y="199" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6B7C5E">Strong breadth</text>
  <text x="427" y="199" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Strong depth</text>
  <text x="589" y="199" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Depends on domain</text>
  <line x1="20" y1="208" x2="680" y2="208" stroke="#DDD8CE" stroke-width="1"/>
  <text x="120" y="227" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Reasoning chains</text>
  <text x="291" y="227" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Variable</text>
  <text x="427" y="227" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6B7C5E">More stable</text>
  <text x="589" y="227" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Dense more predictable</text>
  <line x1="20" y1="236" x2="680" y2="236" stroke="#DDD8CE" stroke-width="1"/>
  <rect x="20" y="236" width="660" height="28" rx="3" fill="#6B7C5E" opacity="0.06"/>
  <text x="120" y="255" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Throughput / cost</text>
  <text x="291" y="255" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#6B7C5E">Better (API)</text>
  <text x="427" y="255" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Higher cost</text>
  <text x="589" y="255" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">MoE wins clearly</text>
  <!-- Footnote -->
  <text x="350" y="292" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Based on personal testing: Mixtral 8x22B vs Llama 3 70B,</text>
  <text x="350" y="306" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">DeepSeek-V3 vs Qwen-72B, across 200+ prompts per category.</text>
</svg>

The most consistent pattern I noticed was in long-form writing. When I gave Mixtral 8x22B a 3,000-word essay to write with a specific voice and style, it would drift more than a comparably capable dense model like Llama 3 70B. The middle sections would subtly shift tone - sometimes toward more formal language, sometimes losing thread of the introduced metaphors. My working hypothesis is that different sections of the text were routing through different expert configurations, and the stylistic consistency wasn't fully maintained across those switches.

I was wrong to assume this would be a universal problem. When I tested the same models on factual question-answering across diverse domains - law, biology, software engineering, history in the same session - the MoE model handled the domain shifts more smoothly. The routing that created inconsistency in long-form writing seemed to actually help when the task required broad domain knowledge across sections.

The instruction following observation surprised me more. On complex multi-step instructions with many constraints ("write X but avoid Y, in style Z, with format W"), the dense models I tested were more reliably compliant on all constraints simultaneously. My guess - and it's a guess - is that multi-constraint compliance benefits from all parameters working on the same representation, rather than specialist sub-networks that may optimize differently on different constraints.

For the use cases I actually care about day-to-day - coding assistance, structured writing, research tasks - the MoE vs dense distinction became a non-factor at the frontier level. [GPT-4](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) (likely MoE) and [Claude Opus 4](/blog/claude-mythos-explained-anthropic-unreleased-model) (dense, or at least differently scaled) felt different in practice, but the difference wasn't primarily explainable by architecture. Training data, RLHF, and post-training alignment matter at least as much.

Where the architecture difference showed up clearly was in cost and throughput. Running Mixtral 8x22B for batch processing tasks via API cost me roughly 40-60% less than comparable dense models at similar quality, and throughput was noticeably higher. For [AI tool stacks built around high-volume automation](/blog/how-to-build-an-ai-tool-stack), that cost difference compounds significantly.

The honest summary: MoE models are better value for money at medium-to-large scale, occasionally weaker on stylistic consistency tasks, and roughly comparable on most benchmark tasks to similarly capable dense models. Understanding this helped me stop treating architecture as the primary variable and start focusing on the right evaluation criteria for each use case. Our [AI output quality evaluation guide](/blog/how-to-evaluate-ai-output-quality) covers how to build those criteria systematically.

---

## When MoE Architecture Matters for Choosing Your AI Tool

MoE architecture directly affects your tool choice in four specific situations, and matters very little in most others.

Let me be specific about when it's actually a relevant variable.

**Situation 1: High-volume API usage with cost constraints.** If you're making millions of API calls per month - for content generation, data extraction, [RAG pipelines](/blog/what-is-rag-retrieval-augmented-generation), or [AI agent workflows](/blog/what-is-an-ai-agent) - the MoE efficiency advantage translates directly into your invoice. Mistral's Mixtral models are priced significantly below comparable dense models on a per-token basis. DeepSeek-V3 is even more aggressively priced. If you're building something where inference cost scales with usage, MoE-based models are worth evaluating carefully on your specific tasks before defaulting to a more expensive dense model.

**Situation 2: Self-hosting vs cloud deployment decisions.** If you're evaluating [open-source vs closed AI](/blog/open-source-vs-closed-ai) and considering running models locally, MoE architecture significantly affects hardware requirements. A 46B-parameter MoE model needs as much VRAM as a 46B dense model - not as much as a 13B model - even though inference compute is closer to a 13B model. For on-premises deployments, the memory requirement matters more than the compute efficiency. This is a real consideration in [AI privacy decisions](/blog/ai-privacy-checklist-for-businesses) where you need to run models locally.

**Situation 3: Diverse multi-domain workloads.** If your use case spans dramatically different domains - technical writing, legal analysis, code debugging, and creative tasks in the same pipeline - there's a credible theoretical argument that MoE models handle this better due to expert specialization. My testing supports this hypothesis partially: MoE models did better on cross-domain breadth tasks than on single-domain depth tasks. It's not a guaranteed win, but worth testing.

**Situation 4: Evaluating a model's capabilities vs its cost.** When you look at a model like Mixtral 8x22B scoring competitively against much larger dense models on benchmarks, understanding MoE explains why that's possible. Without that context, you might incorrectly conclude either that the parameter count is misleading or that the benchmarks are gamed. Neither - the model has full large-model capacity because it trained all 141B parameters, it just uses fewer at inference. This affects how you interpret [model comparison data](/tools/compare).

<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="260" rx="12" fill="#F4F1EA"/>
  <text x="350" y="26" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">Does MoE Architecture Matter for You?</text>
  <!-- Decision flow -->
  <!-- Q1 -->
  <rect x="240" y="42" width="220" height="38" rx="8" fill="#6B7C5E"/>
  <text x="350" y="58" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">High-volume API usage</text>
  <text x="350" y="73" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">or cost-sensitive?</text>
  <!-- Yes branch -->
  <line x1="240" y1="61" x2="140" y2="100" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="172" y="96" font-family="sans-serif" font-size="10" fill="#6B7C5E">YES</text>
  <rect x="40" y="104" width="180" height="36" rx="8" fill="#6B7C5E" opacity="0.25"/>
  <text x="130" y="120" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">MoE matters a lot.</text>
  <text x="130" y="134" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Compare Mixtral, DeepSeek.</text>
  <!-- No branch -->
  <line x1="460" y1="61" x2="560" y2="100" stroke="#8A8577" stroke-width="1.5"/>
  <text x="516" y="96" font-family="sans-serif" font-size="10" fill="#8A8577">NO</text>
  <!-- Q2 -->
  <rect x="460" y="104" width="220" height="38" rx="8" fill="#96845A" opacity="0.6"/>
  <text x="570" y="120" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Self-hosting / local</text>
  <text x="570" y="134" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">deployment?</text>
  <!-- Q2 Yes -->
  <line x1="460" y1="123" x2="360" y2="160" stroke="#96845A" stroke-width="1.5"/>
  <text x="392" y="155" font-family="sans-serif" font-size="10" fill="#96845A">YES</text>
  <rect x="220" y="162" width="180" height="36" rx="8" fill="#96845A" opacity="0.2"/>
  <text x="310" y="178" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">MoE matters for VRAM.</text>
  <text x="310" y="192" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Total params = RAM needed.</text>
  <!-- Q2 No -->
  <line x1="680" y1="123" x2="640" y2="162" stroke="#8A8577" stroke-width="1.5"/>
  <text x="664" y="157" font-family="sans-serif" font-size="10" fill="#8A8577">NO</text>
  <rect x="490" y="162" width="190" height="36" rx="8" fill="#DDD8CE"/>
  <text x="585" y="178" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Architecture is secondary.</text>
  <text x="585" y="192" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Focus on outputs and price.</text>
  <!-- Bottom note -->
  <text x="350" y="232" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">For most API users: evaluate on task quality first,</text>
  <text x="350" y="246" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">then use our /tools/compare to check cost at your volume.</text>
</svg>

For the vast majority of people using AI tools - whether for coding, writing, research, or [AI assistant tasks](/category/ai-assistants) - the MoE vs dense distinction will not be the most important variable in your decision. [Prompt engineering](/blog/what-is-prompt-engineering) quality, [context window size](/blog/what-is-the-context-window), and whether the model has been fine-tuned for your domain will all matter more in practice.

Where MoE knowledge pays off concretely is when you're reading model cards, evaluating API pricing, or making infrastructure decisions for a product. Understanding that a model's "total parameters" and "effective compute per query" can diverge by a factor of 4-8x means you're less likely to be misled by parameter count as a quality proxy.

You can explore how different models compare on this dimension using our [model comparison tool](/tools/compare), or if you're not sure what architecture tier fits your use case, the [AI tool quiz](/tools/quiz) can narrow it down based on your actual requirements.

MoE is one of the concepts that separates someone who reads AI headlines from someone who can evaluate AI tools with real technical grounding. It's not complicated once the core mechanic clicks - only some parameters activate per token - but that one insight unlocks a whole layer of understanding about why frontier models are priced the way they are and why some models punch above their inference cost.

---

## FAQ

**What is Mixture of Experts in simple terms?**

Mixture of Experts is an AI architecture where a model contains many specialized sub-networks ("experts"), but only activates a small fraction of them for each token it processes. The rest sit idle. This means a very large model can answer questions while using far less compute than its total size would suggest.

**How is MoE different from a regular (dense) neural network?**

In a dense model, every token passes through every parameter. In an MoE model, a small routing network first decides which 2-4 "expert" sub-networks are most appropriate for each token, then only those experts run. The parameters of all other experts exist in memory but contribute zero compute for that token. The difference is called "sparse activation."

**Why does MoE save compute but not memory?**

The routing decision happens at inference time, so all experts must be loaded into VRAM before any token is processed - you can't know in advance which experts will be needed. Compute savings come from only running chosen experts. Memory savings don't materialize because you still need all parameters available at a moment's notice.

**What is top-K routing in MoE?**

Top-K routing means each token is sent to the K experts with the highest routing scores. K=2 (top-2) is the most common setting, used in Mixtral. Some models use K=1 for maximum efficiency or K=8 for more capacity. Higher K means more experts activate per token, more compute, but potentially better quality.

**Does MoE cause hallucinations more often?**

There's no strong evidence that MoE architecture causes more [hallucination](/blog/what-is-hallucination-in-ai) than dense models at equivalent capability levels. Hallucination is primarily a function of training data, post-training alignment, and model size relative to task difficulty. MoE models that score higher on benchmarks than smaller dense models tend to hallucinate less, as you'd expect from the capability difference.

**Is GPT-4 an MoE model?**

OpenAI has never officially confirmed GPT-4's architecture. Leaked information and technical analysis strongly suggest it uses a mixture-of-experts design with approximately 8 experts, but these numbers should be treated as estimates rather than facts. The performance-to-cost ratio of GPT-4 via API is consistent with MoE efficiency, but so are other architectural choices.

**What is "expert collapse" in MoE training?**

Expert collapse is when the routing network learns to always send tokens to the same one or two experts, leaving the remaining experts with no gradient signal and making them untrained. This defeats the purpose of having multiple experts. It's solved with auxiliary load-balancing losses that penalize the router for uneven token distribution, and by adding random noise to routing logits early in training.

**Can I run MoE models locally?**

Yes, but you need as much VRAM as the total parameter count requires - not just the active-parameter count. Mixtral 8x7B (~46B total parameters) requires about 90GB VRAM in FP16, similar to a dense 46B model. Quantized versions (4-bit or 8-bit) reduce this substantially: a Q4 quantization of Mixtral 8x7B can run on around 26GB, which fits on a high-end consumer GPU or a pair of standard ones. See our [cloud AI vs local AI guide](/blog/when-to-use-cloud-ai-vs-local-ai) for more on the infrastructure decision.

**How do I know if a model uses MoE architecture?**

Open-weight models like Mixtral usually document their architecture in the model card. Closed models like GPT-4 rarely confirm architecture officially. Indirect signals include: unusually competitive performance relative to reported active parameters, pricing below what the total parameter count would normally justify, and technical blog posts from the company referencing sparse activation or conditional computation. The absence of confirmation doesn't mean dense - most closed frontier models are cagey about architecture details.

**Does MoE affect how I should prompt a model?**

Not significantly. The routing happens at the sub-layer level and is opaque to users. Your prompts interact with the model the same way regardless of whether it's MoE or dense. The practical difference shows up in quality patterns (as described in the testing section above) rather than in how you need to write prompts. Understanding [prompt engineering](/blog/what-is-prompt-engineering) is the same skill regardless of the underlying architecture.

**How does MoE relate to the transformer architecture?**

MoE is an extension to the [transformer architecture](/blog/what-is-the-transformer-architecture), not a replacement for it. In a standard transformer, each layer contains an attention sub-layer and a feed-forward network (FFN) sub-layer. In an MoE transformer, the FFN sub-layer is replaced by a collection of FFN experts plus a router. The attention mechanism, residual connections, layer normalization, and everything else about the transformer stays the same. MoE is best understood as an upgrade to one component of the transformer, not a different architecture altogether.

**What's the difference between MoE and fine-tuning?**

[Fine-tuning](/blog/what-is-fine-tuning-in-ai) is a training technique that updates a model's parameters on a specific dataset. MoE is an architectural design choice about how parameters are organized and activated. They're independent - you can fine-tune an MoE model, and fine-tuning a dense model doesn't make it an MoE model. Some fine-tuning approaches (like mixture-of-experts LoRA adapters) borrow MoE ideas, but that's a separate pattern.
