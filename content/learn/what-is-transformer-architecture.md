---
title: "What Is the Transformer Architecture?"
description: "The transformer architecture is a neural network design that uses self-attention to process all input tokens simultaneously, replacing sequential models."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-transformer-architecture"
author: "Ash"
---


The transformer architecture is a neural network design that processes all input tokens simultaneously using a mechanism called self-attention, rather than reading them one by one in sequence.

That single shift - from sequential to parallel processing - is what made GPT-4, Claude, Gemini, and virtually every major AI system you use today possible. Understanding transformers means understanding the engine under almost every [large language model](/blog/what-is-a-large-language-model) in production.

I've spent the last two years testing AI tools professionally for this site, and the more I dug into why some models outperformed others, the more I kept running into the same answer: transformer design choices. This article is my attempt to explain the architecture clearly, without pretending it's simpler than it is - but also without unnecessary math.

---

## What Is the Transformer Architecture?

The transformer architecture is a deep learning framework introduced in the 2017 paper ["Attention Is All You Need"](https://arxiv.org/abs/1706.03762) by Vaswani et al., built entirely around a mechanism called self-attention instead of recurrence or convolution.

Before transformers, most sequence models had to read text the way you'd read a sentence aloud - one word at a time, left to right, carrying a running "memory" of what came before. Transformers threw that approach out entirely.

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="320" rx="12" fill="#F4F1EA"/>
  <!-- Title -->
  <text x="350" y="36" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="700" fill="#4A5942">Transformer: Core Idea</text>
  <!-- Sequential (old) -->
  <rect x="40" y="60" width="270" height="220" rx="12" fill="#DDD8CE"/>
  <text x="175" y="85" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Sequential (RNN)</text>
  <!-- tokens -->
  <rect x="55" y="100" width="50" height="32" rx="6" fill="#96845A"/>
  <text x="80" y="121" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Token 1</text>
  <rect x="55" y="150" width="50" height="32" rx="6" fill="#96845A"/>
  <text x="80" y="171" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Token 2</text>
  <rect x="55" y="200" width="50" height="32" rx="6" fill="#96845A"/>
  <text x="80" y="221" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Token 3</text>
  <rect x="55" y="250" width="50" height="32" rx="6" fill="#96845A"/>
  <text x="80" y="271" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Token 4</text>
  <!-- arrows -->
  <line x1="80" y1="132" x2="80" y2="150" stroke="#8A8577" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="80" y1="182" x2="80" y2="200" stroke="#8A8577" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="80" y1="232" x2="80" y2="250" stroke="#8A8577" stroke-width="2" marker-end="url(#arr)"/>
  <!-- label -->
  <text x="150" y="190" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">One at a time.</text>
  <text x="150" y="206" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Slow. Forgets</text>
  <text x="150" y="222" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">early context.</text>
  <!-- Parallel (transformer) -->
  <rect x="380" y="60" width="290" height="220" rx="12" fill="#DDD8CE"/>
  <text x="525" y="85" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Parallel (Transformer)</text>
  <!-- 4 tokens in a row -->
  <rect x="392" y="110" width="50" height="32" rx="6" fill="#6B7C5E"/>
  <text x="417" y="131" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Tok 1</text>
  <rect x="452" y="110" width="50" height="32" rx="6" fill="#6B7C5E"/>
  <text x="477" y="131" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Tok 2</text>
  <rect x="512" y="110" width="50" height="32" rx="6" fill="#6B7C5E"/>
  <text x="537" y="131" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Tok 3</text>
  <rect x="572" y="110" width="50" height="32" rx="6" fill="#6B7C5E"/>
  <text x="597" y="131" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Tok 4</text>
  <!-- attention lines -->
  <line x1="417" y1="142" x2="477" y2="175" stroke="#4A5942" stroke-width="1.2" opacity="0.6"/>
  <line x1="417" y1="142" x2="537" y2="175" stroke="#4A5942" stroke-width="1.2" opacity="0.6"/>
  <line x1="417" y1="142" x2="597" y2="175" stroke="#4A5942" stroke-width="1.2" opacity="0.6"/>
  <line x1="477" y1="142" x2="537" y2="175" stroke="#4A5942" stroke-width="1.2" opacity="0.6"/>
  <line x1="477" y1="142" x2="597" y2="175" stroke="#4A5942" stroke-width="1.2" opacity="0.6"/>
  <line x1="537" y1="142" x2="597" y2="175" stroke="#4A5942" stroke-width="1.2" opacity="0.6"/>
  <!-- attention label -->
  <rect x="430" y="175" width="180" height="32" rx="6" fill="#96845A" opacity="0.7"/>
  <text x="520" y="196" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Self-Attention Layer</text>
  <text x="525" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">All tokens see each other</text>
  <text x="525" y="251" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">simultaneously. Fast.</text>
  <!-- arrow marker -->
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 z" fill="#8A8577"/>
    </marker>
  </defs>
</svg>

Instead of passing a hidden state forward one step at a time, the transformer asks: "for every token in this sequence, how much should every other token influence its meaning?" It computes those relationships all at once.

The result: token 1 and token 512 can directly influence each other without the signal degrading through 511 intermediate steps. This is the fundamental capability that older models could never match cleanly.

---

## Before Transformers - Why RNNs Failed at Scale

Recurrent Neural Networks (RNNs) were the dominant approach for processing language before 2017, and they had one deep structural flaw - they were forced to compress an entire passage of text into a single fixed-size vector before generating output.

Imagine summarizing a 5,000-word essay into a single Post-it note, then using only that note to answer questions. That's essentially what an RNN decoder was working with.

<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="280" rx="12" fill="#F4F1EA"/>
  <text x="350" y="32" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">Why RNNs Hit a Wall</text>
  <!-- Timeline bar -->
  <rect x="40" y="80" width="620" height="14" rx="6" fill="#DDD8CE"/>
  <!-- degradation fill -->
  <rect x="40" y="80" width="200" height="14" rx="6" fill="#6B7C5E"/>
  <rect x="240" y="80" width="180" height="14" rx="6" fill="#96845A" opacity="0.7"/>
  <rect x="420" y="80" width="240" height="14" rx="6" fill="#DDD8CE"/>
  <!-- labels -->
  <text x="140" y="73" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4A5942">Tokens 1-50</text>
  <text x="140" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Good recall</text>
  <text x="330" y="73" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4A5942">Tokens 50-150</text>
  <text x="330" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Fading fast</text>
  <text x="540" y="73" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4A5942">Tokens 150+</text>
  <text x="540" y="108" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#8A8577">Nearly gone</text>
  <!-- Problems list -->
  <rect x="40" y="130" width="190" height="120" rx="10" fill="#DDD8CE"/>
  <text x="135" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Core Limitation</text>
  <text x="135" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Vanishing gradients</text>
  <text x="135" y="188" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Can't parallelize</text>
  <text x="135" y="206" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Bottleneck vector</text>
  <text x="135" y="224" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Slow training</text>
  <!-- LSTM improvement -->
  <rect x="260" y="130" width="190" height="120" rx="10" fill="#DDD8CE"/>
  <text x="355" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">LSTM Patch</text>
  <text x="355" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Gated memory cells</text>
  <text x="355" y="188" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Longer context</text>
  <text x="355" y="206" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Still sequential</text>
  <text x="355" y="224" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Hit ceiling ~500 tok</text>
  <!-- Transformer solution -->
  <rect x="480" y="130" width="190" height="120" rx="10" fill="#6B7C5E" opacity="0.25"/>
  <text x="575" y="150" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Transformer Fix</text>
  <text x="575" y="170" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">No recurrence</text>
  <text x="575" y="188" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Full parallelism</text>
  <text x="575" y="206" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Direct token links</text>
  <text x="575" y="224" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Scales to 1M+ tok</text>
</svg>

LSTMs (Long Short-Term Memory networks) tried to fix this with gating mechanisms that could selectively "remember" or "forget" information. They helped a lot.

But they still couldn't be parallelized efficiently because step N still depended on step N-1. Training a large LSTM on modern GPU clusters was like trying to fill a swimming pool one cup at a time - technically possible, practically painful.

The paper that changed everything - "Attention Is All You Need" - proposed removing recurrence entirely. No more sequential dependence.

The authors showed that a pure attention mechanism, stacked deep enough, could outperform the best LSTMs of the time on translation benchmarks. And it could be trained dramatically faster because all positions in the sequence could be processed simultaneously on parallel hardware.

I want to be honest about what "attention" had been before 2017. The concept existed in older models as a small add-on to help RNN decoders focus on relevant encoder outputs. The Vaswani et al. paper didn't invent attention - they made it the entire architecture. That's the leap.

---

## Self-Attention: The Core Idea

Self-attention is the mechanism by which each token in a sequence computes a weighted sum of all other tokens' representations, using learned similarity scores to decide how much each token should "attend to" each other token.

The name is slightly confusing - "self" here means the sequence is attending to itself, not to a separate encoder output. Every token is simultaneously a query (what am I looking for?), a key (what do I offer?), and a value (what information do I carry?).

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="360" rx="12" fill="#F4F1EA"/>
  <text x="350" y="30" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">Attention Score Matrix</text>
  <text x="350" y="48" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#8A8577">How much each token attends to others</text>
  <!-- Sentence: "The cat sat down" -->
  <!-- Row labels (left) -->
  <text x="60" y="108" text-anchor="end" font-family="sans-serif" font-size="12" fill="#3A3228">The</text>
  <text x="60" y="158" text-anchor="end" font-family="sans-serif" font-size="12" fill="#3A3228">cat</text>
  <text x="60" y="208" text-anchor="end" font-family="sans-serif" font-size="12" fill="#3A3228">sat</text>
  <text x="60" y="258" text-anchor="end" font-family="sans-serif" font-size="12" fill="#3A3228">down</text>
  <!-- Column labels (top) -->
  <text x="120" y="80" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#3A3228">The</text>
  <text x="220" y="80" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#3A3228">cat</text>
  <text x="320" y="80" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#3A3228">sat</text>
  <text x="420" y="80" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#3A3228">down</text>
  <!-- Matrix cells - attention scores as filled rects -->
  <!-- Row: The -->
  <rect x="80" y="88" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.85"/>
  <text x="120" y="113" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.55</text>
  <rect x="180" y="88" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.60"/>
  <text x="220" y="113" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.30</text>
  <rect x="280" y="88" width="80" height="40" rx="6" fill="#DDD8CE"/>
  <text x="320" y="113" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#8A8577">0.10</text>
  <rect x="380" y="88" width="80" height="40" rx="6" fill="#DDD8CE"/>
  <text x="420" y="113" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#8A8577">0.05</text>
  <!-- Row: cat -->
  <rect x="80" y="138" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.55"/>
  <text x="120" y="163" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.28</text>
  <rect x="180" y="138" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.90"/>
  <text x="220" y="163" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.62</text>
  <rect x="280" y="138" width="80" height="40" rx="6" fill="#96845A" opacity="0.55"/>
  <text x="320" y="163" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.07</text>
  <rect x="380" y="138" width="80" height="40" rx="6" fill="#DDD8CE"/>
  <text x="420" y="163" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#8A8577">0.03</text>
  <!-- Row: sat -->
  <rect x="80" y="188" width="80" height="40" rx="6" fill="#DDD8CE"/>
  <text x="120" y="213" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#8A8577">0.08</text>
  <rect x="180" y="188" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.70"/>
  <text x="220" y="213" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.40</text>
  <rect x="280" y="188" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.85"/>
  <text x="320" y="213" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.44</text>
  <rect x="380" y="188" width="80" height="40" rx="6" fill="#DDD8CE"/>
  <text x="420" y="213" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#8A8577">0.08</text>
  <!-- Row: down -->
  <rect x="80" y="238" width="80" height="40" rx="6" fill="#DDD8CE"/>
  <text x="120" y="263" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#8A8577">0.05</text>
  <rect x="180" y="238" width="80" height="40" rx="6" fill="#DDD8CE"/>
  <text x="220" y="263" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#8A8577">0.10</text>
  <rect x="280" y="238" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.80"/>
  <text x="320" y="263" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.50</text>
  <rect x="380" y="238" width="80" height="40" rx="6" fill="#6B7C5E" opacity="0.65"/>
  <text x="420" y="263" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#F4F1EA">0.35</text>
  <!-- Legend -->
  <rect x="500" y="90" width="170" height="200" rx="10" fill="#DDD8CE"/>
  <text x="585" y="110" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Score Key</text>
  <rect x="515" y="122" width="24" height="14" rx="4" fill="#6B7C5E" opacity="0.9"/>
  <text x="548" y="134" font-family="sans-serif" font-size="10" fill="#3A3228">High attention</text>
  <rect x="515" y="146" width="24" height="14" rx="4" fill="#96845A" opacity="0.6"/>
  <text x="548" y="158" font-family="sans-serif" font-size="10" fill="#3A3228">Medium</text>
  <rect x="515" y="170" width="24" height="14" rx="4" fill="#DDD8CE"/>
  <text x="548" y="182" font-family="sans-serif" font-size="10" fill="#3A3228">Low attention</text>
  <text x="585" y="210" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Each row sums</text>
  <text x="585" y="224" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">to 1.0 (softmax)</text>
  <text x="585" y="252" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">"cat" attends most</text>
  <text x="585" y="266" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">to itself (0.62)</text>
  <!-- query key value note -->
  <text x="350" y="310" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Q · K^T scores are scaled, then softmaxed</text>
  <text x="350" y="328" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">to get weights. Then multiplied by V.</text>
</svg>

Here's how it actually works at a mechanical level. For each token, the model learns three linear projections called Query (Q), Key (K), and Value (V).

The attention score between two tokens is the dot product of one's Query vector and the other's Key vector, divided by the square root of the dimension size (to prevent the scores from getting too large). Those raw scores are passed through softmax so they sum to 1.0 across the row.

The final representation for each token is then a weighted combination of all Value vectors - where "all" really means all, including its own.

Multi-head attention extends this by running several attention computations in parallel with different learned Q/K/V projections. Each "head" can specialize - one head might track syntactic relationships, another might track coreference, another might handle positional proximity.

Nobody programs those specializations in explicitly. The model learns them during training through gradient descent.

One thing that tripped me up early: attention scores are computed from learned weights, not hard-coded rules. So when people say "the model knows 'cat' refers to the subject," that knowing is distributed across millions of floating-point parameters, not a lookup table.

---

## The Full Transformer Stack

The transformer architecture consists of an encoder stack that converts input tokens into contextual representations and (in sequence-to-sequence models) a decoder stack that generates output tokens one at a time using both self-attention and cross-attention to the encoder output.

Understanding the full picture requires separating the original encoder-decoder design from the variants that came after.

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="420" rx="12" fill="#F4F1EA"/>
  <text x="350" y="30" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">The Transformer Stack</text>
  <!-- Encoder column -->
  <text x="185" y="58" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Encoder</text>
  <!-- Input Embedding -->
  <rect x="60" y="70" width="250" height="38" rx="8" fill="#DDD8CE"/>
  <text x="185" y="94" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#3A3228">Input Embedding + Pos. Encoding</text>
  <!-- Encoder layer (repeated N times) -->
  <rect x="60" y="120" width="250" height="180" rx="10" fill="#6B7C5E" opacity="0.18"/>
  <text x="185" y="142" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Encoder Layer × N</text>
  <!-- sub blocks -->
  <rect x="75" y="150" width="220" height="34" rx="6" fill="#6B7C5E" opacity="0.55"/>
  <text x="185" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Multi-Head Self-Attention</text>
  <rect x="75" y="194" width="220" height="24" rx="6" fill="#DDD8CE"/>
  <text x="185" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Add &amp; Norm</text>
  <rect x="75" y="228" width="220" height="34" rx="6" fill="#96845A" opacity="0.55"/>
  <text x="185" y="250" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Feed-Forward Network</text>
  <rect x="75" y="272" width="220" height="24" rx="6" fill="#DDD8CE"/>
  <text x="185" y="289" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Add &amp; Norm</text>
  <!-- Encoder output -->
  <rect x="60" y="312" width="250" height="34" rx="8" fill="#6B7C5E" opacity="0.35"/>
  <text x="185" y="334" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Context Representations</text>
  <!-- Decoder column -->
  <text x="535" y="58" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#4A5942">Decoder</text>
  <rect x="400" y="70" width="260" height="38" rx="8" fill="#DDD8CE"/>
  <text x="530" y="94" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#3A3228">Output Embed + Pos. Encoding</text>
  <!-- Decoder layer -->
  <rect x="400" y="120" width="260" height="220" rx="10" fill="#96845A" opacity="0.12"/>
  <text x="530" y="142" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Decoder Layer × N</text>
  <rect x="415" y="150" width="230" height="34" rx="6" fill="#6B7C5E" opacity="0.55"/>
  <text x="530" y="172" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Masked Self-Attention</text>
  <rect x="415" y="194" width="230" height="24" rx="6" fill="#DDD8CE"/>
  <text x="530" y="211" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Add &amp; Norm</text>
  <rect x="415" y="228" width="230" height="34" rx="6" fill="#96845A" opacity="0.55"/>
  <text x="530" y="250" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#F4F1EA">Cross-Attention (Enc→Dec)</text>
  <rect x="415" y="272" width="230" height="24" rx="6" fill="#DDD8CE"/>
  <text x="530" y="289" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Add &amp; Norm</text>
  <!-- FFN in decoder -->
  <rect x="415" y="306" width="230" height="24" rx="6" fill="#DDD8CE"/>
  <text x="530" y="323" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#3A3228">Feed-Forward + Add &amp; Norm</text>
  <!-- Output -->
  <rect x="400" y="348" width="260" height="34" rx="8" fill="#96845A" opacity="0.35"/>
  <text x="530" y="370" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Linear + Softmax → Token</text>
  <!-- Cross-attention arrow -->
  <line x1="310" y1="329" x2="400" y2="260" stroke="#4A5942" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.7"/>
  <text x="345" y="300" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A5942">context</text>
  <!-- Bottom note -->
  <text x="350" y="406" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">GPT = decoder-only. BERT = encoder-only. T5 = both.</text>
</svg>

Let me walk through the key components.

**Positional encoding** is added to the input embeddings before anything else. Since self-attention treats all positions equally by default, the model needs a way to know that token 1 came before token 2. The original paper used sine and cosine functions of different frequencies. Modern models use learned positional encodings or more sophisticated schemes like RoPE (Rotary Position Embedding), which handles longer sequences better.

**The encoder layer** runs two sub-operations in sequence. First, multi-head self-attention over all input positions. Then a position-wise feed-forward network (FFN) - two linear layers with a nonlinearity in between, applied identically to each token's representation. Both sub-layers use residual connections (add the input back to the output) followed by layer normalization. Residual connections are critical: without them, gradients vanish in deep stacks.

**The decoder layer** adds a third sub-operation: cross-attention over the encoder's output. The decoder's queries come from the decoder's own representations, but the keys and values come from the encoder. This is how the decoder "reads" the source when generating translations or summaries.

**Decoder-only models** - like the GPT series, Claude, and Llama - skip the encoder entirely. They just stack decoder layers (without cross-attention, since there's no encoder output to attend to) and train to predict the next token. This turns out to be surprisingly powerful for open-ended generation tasks. Most of the models you interact with when you use tools like [Claude Opus 4](/blog/claude-opus-4-7-review) or [GPT-5](/blog/claude-opus-4-8-vs-gpt-5-5-review-2026) are decoder-only transformers.

**Encoder-only models** like BERT generate rich contextual representations of text but don't produce tokens autoregressively. They're used for classification, embedding generation, and retrieval tasks. If you've worked with [embeddings in AI](/blog/what-is-embedding-in-ai), you've probably used an encoder-only model's output directly.

The feed-forward layer is often underappreciated in popular explanations. It's actually where a huge amount of factual knowledge appears to be stored - research into model interpretability suggests the FFN layers function as a kind of key-value memory. Attention routes information to the right place; FFN processes and stores it.

---

## Why Transformers Scaled So Well

Transformers scaled so well because their architecture maps cleanly onto how modern accelerators (GPUs and TPUs) actually work - massively parallel matrix multiplication - and because their performance continued improving predictably as model size, data, and compute increased.

The scaling story is one of the most important things to understand about the current AI moment.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="300" rx="12" fill="#F4F1EA"/>
  <text x="350" y="28" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">Scaling Laws: Performance vs. Compute</text>
  <!-- Axes -->
  <line x1="80" y1="240" x2="640" y2="240" stroke="#DDD8CE" stroke-width="2"/>
  <line x1="80" y1="60" x2="80" y2="240" stroke="#DDD8CE" stroke-width="2"/>
  <!-- Axis labels -->
  <text x="360" y="268" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#8A8577">Training Compute (log scale)</text>
  <text x="18" y="140" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Perf-</text>
  <text x="18" y="154" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">orm-</text>
  <text x="18" y="168" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">ance</text>
  <!-- RNN curve (flattens) -->
  <polyline points="80,220 160,190 240,175 320,168 400,165 480,163 560,162 640,162" fill="none" stroke="#96845A" stroke-width="2.5" stroke-dasharray="6,3"/>
  <text x="500" y="157" font-family="sans-serif" font-size="10" fill="#96845A">RNN/LSTM</text>
  <text x="500" y="169" font-family="sans-serif" font-size="10" fill="#96845A">(hits ceiling)</text>
  <!-- Transformer curve (keeps going) -->
  <polyline points="80,230 160,200 240,170 320,138 400,108 480,82 560,62 620,48" fill="none" stroke="#6B7C5E" stroke-width="2.5"/>
  <text x="500" y="76" font-family="sans-serif" font-size="10" fill="#6B7C5E">Transformer</text>
  <text x="500" y="88" font-family="sans-serif" font-size="10" fill="#6B7C5E">(keeps scaling)</text>
  <!-- Milestone markers -->
  <circle cx="200" cy="182" r="5" fill="#6B7C5E"/>
  <text x="200" y="175" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">BERT</text>
  <text x="200" y="165" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">2018</text>
  <circle cx="300" cy="145" r="5" fill="#6B7C5E"/>
  <text x="300" y="138" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">GPT-3</text>
  <text x="300" y="128" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">2020</text>
  <circle cx="420" cy="100" r="5" fill="#6B7C5E"/>
  <text x="420" y="93" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">GPT-4</text>
  <text x="420" y="83" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#8A8577">2023</text>
  <circle cx="560" cy="58" r="5" fill="#4A5942"/>
  <text x="560" y="51" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#3A3228">2025+</text>
  <!-- Note -->
  <text x="350" y="286" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Chinchilla (2022) refined optimal token-to-parameter ratios</text>
</svg>

The key insight from OpenAI's 2020 scaling laws paper (Kaplan et al.) was that loss improved as a smooth power law function of model size, dataset size, and training compute. The curve didn't flatten.

That predictability was invaluable. It meant you could estimate how good a model would be before training it, just by knowing the compute budget. It also meant every dollar spent on scale reliably bought capability improvement.

RNNs didn't exhibit clean scaling laws. Their performance plateaued as you added parameters because the sequential bottleneck was the constraint - not parameter count.

The transformer's attention mechanism has a quadratic cost with sequence length (every token attending to every other token), which creates a real engineering challenge at long contexts. But it doesn't create a ceiling on model capability the way recurrence did.

Three scaling dimensions compound in transformers. First: parameters (width and depth of the model). Second: training tokens (how much data the model sees). Third: context window (how many tokens the model can attend to at inference). Modern models like Gemini 1.5 and GPT-4o stretched context windows to 128k-1M tokens while maintaining strong performance on long-document tasks - something that would have been technically impossible with RNN architectures.

Emergent capabilities are a real and somewhat strange phenomenon in this space. Models trained purely to predict the next token started exhibiting behaviors - few-shot reasoning, arithmetic, code generation, analogy completion - that weren't explicitly optimized for and that appeared relatively suddenly as scale crossed certain thresholds. Nobody fully understands why, though there are good mechanistic hypotheses about circuits forming in the attention layers.

If you're using [AI coding tools](/blog/best-ai-coding-tools-2026) or working with [AI agents](/blog/what-is-an-ai-agent) today, the capabilities you rely on largely trace back to transformer scaling hitting these emergence thresholds.

---

## Where My Mental Model Was Wrong

The biggest mistake in my early understanding of transformers was thinking that attention "knows" what to focus on in a meaningful, deliberate sense - when in reality, it learns statistical patterns from training data with no explicit understanding of meaning.

I'm sharing this because I see the same mistake everywhere in AI writing, and it leads people to misunderstand why these models fail in the ways they do.

When a model [hallucinates](/blog/what-is-hallucination-in-ai) a fake citation or confidently states wrong information, it's not "confused" or "distracted" - it's doing exactly what it was trained to do, predicting plausible continuations. The attention mechanism is finding statistically relevant tokens, not logically relevant ones.

Here are four specific places my mental model was wrong.

**Wrong belief 1:** "The model reads the prompt and then generates."

Actually, at inference, the transformer processes the entire prompt in one forward pass to build key-value representations, then generates tokens one at a time - but each new token is appended to the context, and the model runs another (partial) forward pass. It's not reading-then-writing; it's an autoregressive loop where each output becomes part of the next input.

**Wrong belief 2:** "Deeper = better at long-range dependencies."

Depth (more layers) improves the richness of representations, but the ability to relate distant tokens comes from the attention mechanism, which is present at every layer. A 2-layer transformer already connects token 1 to token 512 directly. Depth adds compositional complexity, not range.

**Wrong belief 3:** "More parameters means more knowledge."

Parameters store patterns, not facts in a lookup table. A model can "know" something from training that it fails to retrieve correctly under slight rephrasing because the access pattern (the exact sequence of tokens that activates the relevant circuit) wasn't in the training distribution. This is why [fine-tuning](/blog/what-is-fine-tuning-in-ai) on domain-specific data often outperforms a much larger general model for narrow tasks.

**Wrong belief 4:** "Transformers understand context the way humans do."

This one is harder to unpack, but important. Human context understanding is active - we update our mental model as we read. Transformer attention is computed once per token position (well, once per layer), and the "context understanding" is frozen into the attention pattern for that forward pass. The model can't go back and re-read after learning something new mid-generation without explicit mechanisms (like retrieval or tool calls). This is exactly why [RAG (Retrieval-Augmented Generation)](/blog/what-is-rag-retrieval-augmented-generation) exists - to compensate for the fact that the model's knowledge is static at inference time.

I spent a lot of time testing [Cursor 3](/blog/cursor-3-review) and [Claude Code vs Cursor](/blog/claude-code-vs-cursor-3) for coding tasks, and the failure modes I observed almost always traced back to these misunderstandings. The model would confidently use an outdated API or invent a non-existent function - not because the attention mechanism failed, but because the training data didn't include the correction, and the model had no mechanism to flag its own uncertainty.

Understanding transformers correctly means accepting that they are extraordinarily powerful pattern-completion engines that can simulate reasoning-like behavior - without being reasoning systems in the way humans are.

---

## What Comes After Transformers? (2026 Alternatives)

As of mid-2026, the post-transformer field is real but not settled - several alternative architectures have demonstrated competitive results at specific tasks, but transformers remain dominant in production deployments for general-purpose language modeling.

The main challengers fall into two categories: state space models and hybrid architectures.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="700" height="340" rx="12" fill="#F4F1EA"/>
  <text x="350" y="28" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="700" fill="#4A5942">Architecture Comparison: 2026</text>
  <!-- Header row -->
  <rect x="20" y="44" width="155" height="28" rx="6" fill="#DDD8CE"/>
  <text x="97" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Property</text>
  <rect x="183" y="44" width="120" height="28" rx="6" fill="#6B7C5E" opacity="0.3"/>
  <text x="243" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Transformer</text>
  <rect x="311" y="44" width="120" height="28" rx="6" fill="#96845A" opacity="0.3"/>
  <text x="371" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Mamba/SSM</text>
  <rect x="439" y="44" width="120" height="28" rx="6" fill="#DDD8CE"/>
  <text x="499" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">Hybrid</text>
  <rect x="567" y="44" width="115" height="28" rx="6" fill="#DDD8CE"/>
  <text x="624" y="63" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#4A5942">RWKV</text>
  <!-- Row 1 -->
  <text x="97" y="95" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Context scaling</text>
  <text x="243" y="95" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Quadratic</text>
  <text x="371" y="95" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Linear</text>
  <text x="499" y="95" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Mixed</text>
  <text x="624" y="95" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Linear</text>
  <line x1="20" y1="106" x2="680" y2="106" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 2 -->
  <text x="97" y="127" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Training quality</text>
  <text x="243" y="127" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Best</text>
  <text x="371" y="127" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Near-best</text>
  <text x="499" y="127" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Competitive</text>
  <text x="624" y="127" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Good</text>
  <line x1="20" y1="138" x2="680" y2="138" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 3 -->
  <text x="97" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Inference cost</text>
  <text x="243" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">High (KV cache)</text>
  <text x="371" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Low</text>
  <text x="499" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Medium</text>
  <text x="624" y="159" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Very Low</text>
  <line x1="20" y1="170" x2="680" y2="170" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 4 -->
  <text x="97" y="191" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Recall at 128k+</text>
  <text x="243" y="191" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Strong</text>
  <text x="371" y="191" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Weaker</text>
  <text x="499" y="191" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Good</text>
  <text x="624" y="191" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Weaker</text>
  <line x1="20" y1="202" x2="680" y2="202" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 5 -->
  <text x="97" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Ecosystem</text>
  <text x="243" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Massive</text>
  <text x="371" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Growing</text>
  <text x="499" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Emerging</text>
  <text x="624" y="223" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Niche</text>
  <line x1="20" y1="234" x2="680" y2="234" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 6 -->
  <text x="97" y="255" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Production use</text>
  <text x="243" y="255" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Dominant</text>
  <text x="371" y="255" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Limited</text>
  <text x="499" y="255" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Testing</text>
  <text x="624" y="255" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3A3228">Niche</text>
  <!-- Note -->
  <text x="350" y="288" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">SSM = State Space Model. Data as of mid-2026.</text>
  <text x="350" y="304" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Hybrid = attention layers + SSM layers interleaved.</text>
  <text x="350" y="320" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#8A8577">Jamba (AI21), Zamba, Griffin are current hybrid examples.</text>
</svg>

**State Space Models (SSMs) and Mamba** are the most-discussed alternatives. Introduced in the Mamba paper by Gu and Dao (2023), SSMs process sequences by maintaining a compressed hidden state that evolves as new tokens arrive - similar to RNNs in spirit, but with much smarter state update equations derived from control theory.

The key advantage: inference scales linearly with sequence length instead of quadratically. For very long contexts (say, 100k+ tokens), this is a real cost savings at deployment. The disadvantage: SSMs tend to lose information from distant positions more aggressively than transformers do, which hurts on tasks requiring precise recall of content from much earlier in the context.

**Mamba-2** (2024) improved on the original by making the state space matrices structured in a way that allows efficient GPU computation, closing some of the quality gap with transformers.

**Hybrid architectures** interleave attention layers with SSM layers, trying to capture the best of both. Jamba (from AI21 Labs) and Griffin (from Google DeepMind) are real deployed examples. The intuition is: use attention for tasks requiring precise token-level recall, use SSM layers for efficient sequence processing where exact recall is less critical.

**RWKV** (pronounced "RWaKuV") takes a different approach - it reformulates attention to run as a recurrent network at inference while still being trainable like a transformer in parallel. Version 6 achieved near-transformer quality on several benchmarks while using a fraction of the inference memory.

My honest assessment after tracking this for about 18 months: transformers are not going away. The ecosystem advantage is enormous - virtually every framework, tool, and hardware optimization in [AI coding assistants](/best-of/best-ai-code-assistants) and [AI agents](/blog/best-ai-agents-2026) assumes transformer-compatible architectures.

What's more likely is that hybrid architectures gradually take market share at the edges - long-context inference-heavy use cases where the quadratic cost is a real production problem - while pure transformer models remain the standard for general capability benchmarks and frontier model training.

The biggest wild card is hardware. If specialized chips (like those being developed for SSM inference) become commercially viable, the cost equation changes. We document these shifts in our ongoing [2026 AI tools reality check](/studies/2026-ai-tools-reality-check).

---

## How Transformers Connect to Everything You Use

The transformer architecture is the foundation layer beneath virtually every modern AI product, from the [large language models](/blog/what-is-a-large-language-model) powering chatbots to the retrieval systems behind [RAG applications](/blog/what-is-rag-retrieval-augmented-generation).

If you've been following the [vibe coding trend](/blog/what-is-vibe-coding), you're using transformer-based code models. If you've tried [prompt engineering](/blog/what-is-prompt-engineering), you've been optimizing the input to a transformer's attention mechanism.

Even [tokenization](/blog/what-is-tokenization) - the way text gets split before it enters any model - was designed specifically around how transformer embeddings work. The subword tokenization schemes like BPE (Byte Pair Encoding) that GPT uses exist partly because transformers handle fixed-vocabulary discrete tokens much more cleanly than character-level input.

[RLHF (Reinforcement Learning from Human Feedback)](/blog/what-is-rlhf), the technique used to align ChatGPT, Claude, and Gemini to follow instructions helpfully, is layered on top of transformer-pretrained models. The transformer provides the base capability; RLHF steers the output toward human preferences.

Understanding the transformer stack clarifies why some AI behaviors exist. Why do models have a [context window limit](/blog/what-is-a-large-language-model)? Quadratic attention cost plus memory constraints. Why do models sometimes fail to follow instructions buried in a long middle section of a document? Attention, while theoretically full-context, learns to weight certain positions more than others during training - leading to the "lost in the middle" phenomenon researchers documented in 2023.

Why does [fine-tuning](/blog/what-is-fine-tuning-in-ai) work so well for narrow domains? Because the transformer's parameters encode statistical patterns, and domain-specific fine-tuning updates those patterns toward the target distribution efficiently.

If you want to compare current models side by side in terms of capabilities that flow from their transformer design choices, our [comparison tool](/tools/compare) lets you filter by context window, architecture variant, and benchmark category. Our [quiz tool](/tools/quiz) can help you figure out which model fits your specific use case.

I've reviewed most of the major frontier models - [Gemma 4](/blog/gemma-4-review), [Claude Opus 4](/blog/claude-opus-4-7-review), [Composer 2.5](/blog/composer-2-5-review) - and the architectural nuances show up clearly in how they handle edge cases. Our [methodology](/methodology) page explains how I test and weight those factors if you want to see how architecture choices translate to real-world performance differences.

For most people using AI tools, the transformer architecture is invisible infrastructure. But it explains the ceiling of what's possible, the shape of the failure modes, and the direction that capability improvements are coming from.

---

## FAQ

**What is the transformer architecture in simple terms?**

The transformer is a type of neural network that reads all the words in a sentence at the same time (rather than one at a time) and uses a mechanism called attention to figure out which words are most relevant to each other. That ability to process everything in parallel made it much faster to train than older approaches, and it turned out to produce dramatically better results at scale.

**Why is it called the "transformer"?**

The name comes from the paper title "Attention Is All You Need" (2017), but the authors chose "transformer" to describe how the model transforms input representations through successive layers of attention and feed-forward operations. It's not named after electrical transformers - the naming is functional, not analogical.

**What is the difference between an encoder and a decoder transformer?**

An encoder-only transformer (like BERT) takes in a sequence and produces a rich representation of it - useful for classification, embeddings, and retrieval. A decoder-only transformer (like GPT, Claude, Llama) generates new tokens autoregressively, one at a time, conditioned on what came before. The original transformer used both: an encoder for the source language and a decoder for the target language in translation tasks.

**What are the main weaknesses of transformers?**

The core limitation is quadratic scaling with sequence length - attending every token to every other token gets very expensive as context grows. There are also questions about sample efficiency (transformers need enormous amounts of training data), interpretability (it's hard to explain why a specific output was generated), and susceptibility to [hallucination](/blog/what-is-hallucination-in-ai) when the model is asked about topics underrepresented in training data.

**What is multi-head attention?**

Multi-head attention runs several attention computations in parallel using different sets of learned Q/K/V weight matrices, then concatenates and linearly projects the results. Each "head" can learn to attend to different aspects of the input - one head might focus on syntactic relationships, another on semantic similarity, another on positional proximity. The multiple heads are what gives the model the ability to capture several types of relationships simultaneously.

**Are transformers and LLMs the same thing?**

Not quite. A large language model is a model trained at scale on language data to predict tokens. Most modern LLMs use the transformer architecture, but the terms aren't synonymous. You could (in theory) build an LLM on a different architecture - and as SSM-based models improve, some future LLMs may not be pure transformers. The [LLM explainer](/blog/what-is-a-large-language-model) on this site covers the distinction in more depth.

**What is positional encoding in a transformer?**

Since self-attention has no built-in sense of order (attending from position 1 to position 100 looks the same as attending from position 100 to position 1), transformers add a positional signal to each token's embedding before it enters the attention layers. The original paper used sine/cosine functions. Modern models often use learned positional embeddings or Rotary Position Embedding (RoPE), which handles very long sequences more cleanly.

**What is the KV cache?**

At inference, for each generated token, the transformer recomputes attention over the entire context. The KV cache stores the Key and Value tensors from previous positions so they don't need to be recomputed every step - only the new token's K and V need to be added. This is what makes autoregressive generation practically fast. The cache grows with context length, which is one reason long-context inference is memory-intensive.

**Is Mamba better than transformers in 2026?**

For specific use cases - particularly long-context inference where memory and speed matter more than absolute top-tier recall - Mamba and hybrid architectures have real advantages. For general-purpose language modeling quality at the frontier, transformers still dominate benchmarks and have the ecosystem depth to match. The gap has narrowed, but "better" depends heavily on what you're optimizing for. See the comparison table in the "What Comes After Transformers" section above.

**What is the connection between transformers and AI agents?**

Most [AI agents](/blog/what-is-an-ai-agent) are transformer-based language models wrapped in scaffolding that lets them use tools, remember context across steps, and act on their environment. The transformer provides the core reasoning and language capability; the agent framework provides the planning and action loop. Understanding the transformer's context window and attention behavior explains a lot about why agents fail in specific ways - like losing track of earlier instructions in a long agent loop. Our [AI agents explainer](/blog/what-is-an-ai-agent) covers the agent layer in detail.
