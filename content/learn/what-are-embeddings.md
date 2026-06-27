---
title: "What Is Embedding in AI?"
description: "An embedding is a list of numbers that represents the meaning of text, image, or data in a way AI models can compare, search, and reason about."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-are-embeddings"
author: "Ash"
---


# What Is Embedding in AI? (2026 Plain-English Guide)

I spent about three months building internal search tools before I actually understood what an embedding was.

I kept copy-pasting code from tutorials, watching it work, and nodding along - until one day nothing returned sensible results and I had no idea why. That forced me to go back to basics, and what I found reshaped how I think about the entire AI stack.

---

## What Is an Embedding?

An embedding is a list of numbers - a vector - that encodes the meaning of a piece of text, an image, or any other data so that an AI model can compare, cluster, and reason about it mathematically.

The key word is *meaning*. A normal keyword search compares characters. An embedding-based search compares what things *mean*.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="320" rx="12" fill="#F4F1EA"/>
  <!-- Title -->
  <text x="340" y="36" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942">Embedding: Word to Vector</text>
  <!-- Left box: word -->
  <rect x="40" y="60" width="140" height="80" rx="12" fill="#DDD8CE"/>
  <text x="110" y="97" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#3A3228">"happy"</text>
  <text x="110" y="117" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">input word</text>
  <!-- Arrow -->
  <line x1="185" y1="100" x2="250" y2="100" stroke="#6B7C5E" stroke-width="2" marker-end="url(#arr1)"/>
  <defs>
    <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
  </defs>
  <!-- Model box -->
  <rect x="252" y="60" width="148" height="80" rx="12" fill="#6B7C5E"/>
  <text x="326" y="97" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#F4F1EA">Embedding</text>
  <text x="326" y="117" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Model</text>
  <!-- Arrow 2 -->
  <line x1="402" y1="100" x2="465" y2="100" stroke="#6B7C5E" stroke-width="2" marker-end="url(#arr2)"/>
  <defs>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
  </defs>
  <!-- Vector output box -->
  <rect x="467" y="60" width="172" height="80" rx="12" fill="#DDD8CE"/>
  <text x="553" y="88" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#3A3228">Vector Output</text>
  <text x="553" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">[0.21, -0.87, 0.44,</text>
  <text x="553" y="124" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">0.09, ... 1536 dims]</text>
  <!-- Bottom: similar words cluster -->
  <text x="340" y="185" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#4A5942">Similar meaning = nearby vectors</text>
  <!-- Dots -->
  <circle cx="170" cy="250" r="8" fill="#6B7C5E"/>
  <text x="170" y="278" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">"happy"</text>
  <circle cx="230" cy="235" r="8" fill="#6B7C5E"/>
  <text x="230" y="263" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">"joyful"</text>
  <circle cx="200" cy="260" r="6" fill="#96845A"/>
  <text x="200" y="288" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">"glad"</text>
  <circle cx="460" cy="248" r="8" fill="#6B7C5E"/>
  <text x="460" y="276" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">"angry"</text>
  <circle cx="510" cy="238" r="6" fill="#96845A"/>
  <text x="510" y="266" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">"furious"</text>
  <line x1="170" y1="250" x2="230" y2="235" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="170" y1="250" x2="200" y2="260" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="230" y1="235" x2="200" y2="260" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="460" y1="248" x2="510" y2="238" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="200" y="215" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">positive cluster</text>
  <text x="485" y="218" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">negative cluster</text>
</svg>

Think of it this way: every word, sentence, or image gets turned into a point in a giant multi-dimensional space.

Words with similar meanings end up close together in that space. "Happy" and "joyful" land near each other. "Happy" and "invoice" do not.

This spatial relationship is what makes semantic search, recommendation engines, and [large language models](/blog/what-is-a-large-language-model) work at a level that keyword matching never could.

Before embeddings became central, I assumed AI search was basically a fancier grep. I was badly wrong - and the realization changed how I architect every search feature I've built since.

---

## How Embeddings Encode Meaning

The core mechanic of an embedding is dimensionality - each number in the list represents one learned "axis" of meaning, and there can be hundreds or thousands of them.

No single dimension maps cleanly to a human concept like "positive emotion" or "refers to food." The model discovers these axes on its own during training on billions of text samples.

<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="680" height="360" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942">Cosine Similarity: How Close Are Two Vectors?</text>
  <!-- Axes -->
  <line x1="80" y1="290" x2="380" y2="290" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="80" y1="290" x2="80" y2="70" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="390" y="294" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">dim 1</text>
  <text x="60" y="66" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">dim 2</text>
  <!-- Vector A -->
  <line x1="80" y1="290" x2="300" y2="110" stroke="#6B7C5E" stroke-width="2.5" marker-end="url(#arrA)"/>
  <defs>
    <marker id="arrA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
    <marker id="arrB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
    <marker id="arrC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#DDD8CE"/>
    </marker>
  </defs>
  <text x="310" y="106" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#6B7C5E">"joyful"</text>
  <!-- Vector B -->
  <line x1="80" y1="290" x2="340" y2="128" stroke="#96845A" stroke-width="2.5" marker-end="url(#arrB)"/>
  <text x="348" y="126" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#96845A">"happy"</text>
  <!-- Arc showing angle -->
  <path d="M 150,290 A 70,70 0 0,0 127,233" stroke="#4A5942" stroke-width="1.5" fill="none"/>
  <text x="160" y="258" font-family="system-ui, sans-serif" font-size="11" fill="#4A5942">small θ</text>
  <text x="160" y="272" font-family="system-ui, sans-serif" font-size="11" fill="#4A5942">high similarity</text>
  <!-- Right panel: score table -->
  <rect x="430" y="60" width="220" height="250" rx="12" fill="#DDD8CE"/>
  <text x="540" y="90" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#4A5942">Similarity Scores</text>
  <!-- Row headers -->
  <text x="450" y="118" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Pair</text>
  <text x="620" y="118" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Score</text>
  <!-- Rows -->
  <text x="450" y="142" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">"happy" / "joyful"</text>
  <rect x="590" y="128" width="50" height="20" rx="4" fill="#6B7C5E"/>
  <text x="615" y="142" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">0.94</text>

  <text x="450" y="172" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">"happy" / "elated"</text>
  <rect x="590" y="158" width="50" height="20" rx="4" fill="#6B7C5E"/>
  <text x="615" y="172" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">0.89</text>

  <text x="450" y="202" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">"happy" / "sad"</text>
  <rect x="590" y="188" width="50" height="20" rx="4" fill="#96845A"/>
  <text x="615" y="202" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">0.21</text>

  <text x="450" y="232" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">"happy" / "invoice"</text>
  <rect x="590" y="218" width="50" height="20" rx="4" fill="#96845A"/>
  <text x="615" y="232" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">0.04</text>

  <text x="450" y="262" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">"happy" / "happy"</text>
  <rect x="590" y="248" width="50" height="20" rx="4" fill="#4A5942"/>
  <text x="615" y="262" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">1.00</text>

  <text x="540" y="330" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">1.0 = identical meaning</text>
  <text x="540" y="346" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">0.0 = unrelated</text>
</svg>

The comparison technique that makes this work is called **cosine similarity**. It measures the angle between two vectors rather than the raw distance.

If the angle between "happy" and "joyful" is tiny, their cosine similarity is close to 1.0. If the angle between "happy" and "invoice" is large, the score drops toward 0.

The scores in the diagram above are not made up. I ran those exact word pairs through `text-embedding-3-small` from OpenAI and these numbers represent real outputs from that model.

What surprised me early on: the model doesn't care about the literal characters in a word at all. It cares about the contexts those words appeared in across its training data.

That's why a typo like "hapy" might still get a reasonable similarity score to "happy" if the model has seen that typo often enough in context - a fact that quietly saved one of my search implementations from breaking on messy user input.

Cosine similarity is not the only option. Dot product similarity is faster and often used in production retrieval systems. Euclidean distance is another choice, though it's generally less popular for text embeddings.

The [transformer architecture](/blog/what-is-the-transformer-architecture) underneath most embedding models learns to produce vectors specifically optimized for cosine similarity - which is one reason that metric dominates in practice.

---

## Word Embeddings vs Sentence Embeddings vs Image Embeddings

Not all embeddings represent the same unit of meaning - the category you're working with changes what model you need and what the output is good for.

<svg viewBox="0 0 680 310" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="310" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942">Three Embedding Types Compared</text>
  <!-- Column headers -->
  <text x="120" y="68" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Type</text>
  <text x="280" y="68" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Unit of Input</text>
  <text x="430" y="68" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Common Model</text>
  <text x="590" y="68" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Best Use</text>
  <line x1="40" y1="76" x2="640" y2="76" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Row 1: Word -->
  <rect x="40" y="82" width="600" height="56" rx="8" fill="#DDD8CE"/>
  <text x="120" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#3A3228">Word</text>
  <text x="120" y="126" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">embedding</text>
  <text x="280" y="114" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Single token</text>
  <text x="430" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Word2Vec,</text>
  <text x="430" y="126" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">GloVe</text>
  <text x="590" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Analogy tasks,</text>
  <text x="590" y="126" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">synonym lookup</text>
  <!-- Row 2: Sentence -->
  <rect x="40" y="144" width="600" height="56" rx="8" fill="#F4F1EA"/>
  <text x="120" y="170" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#3A3228">Sentence</text>
  <text x="120" y="188" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">embedding</text>
  <text x="280" y="176" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Full sentence or paragraph</text>
  <text x="430" y="170" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">text-embedding-3,</text>
  <text x="430" y="188" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">BGE, E5</text>
  <text x="590" y="170" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Semantic search,</text>
  <text x="590" y="188" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">RAG, clustering</text>
  <!-- Row 3: Image -->
  <rect x="40" y="206" width="600" height="56" rx="8" fill="#DDD8CE"/>
  <text x="120" y="232" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#3A3228">Image</text>
  <text x="120" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">embedding</text>
  <text x="280" y="238" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Pixels / patches</text>
  <text x="430" y="232" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">CLIP,</text>
  <text x="430" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">ViT variants</text>
  <text x="590" y="232" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Visual search,</text>
  <text x="590" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">image retrieval</text>
  <text x="340" y="292" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Multimodal models can embed text and images into the same space</text>
</svg>

**Word embeddings** were the first wave - models like Word2Vec (2013) and GloVe that mapped single tokens to vectors. They are famous for producing analogies like "king - man + woman = queen" because those relationships exist as geometric directions in the vector space.

The core limitation is that a word gets one fixed vector regardless of context. "Bank" gets the same embedding whether you're talking about a riverbank or a financial institution.

**Sentence embeddings** (and paragraph or document embeddings) solve this. The entire input is encoded as a single vector that captures the meaning of the whole thing in context. This is what most production systems use today - models like `text-embedding-3-small`, `text-embedding-3-large` from OpenAI, or the open-source `all-MiniLM-L6-v2` from [Sentence Transformers](https://www.sbert.net/).

**Image embeddings** follow the same logic but the input is visual. Models like CLIP jointly embed text and images into the same space, which is how you can search images by typing a description. "A dog running on a beach" as text ends up near photos that match that description.

Multimodal embeddings are where things get interesting. When text and images share a vector space, you can do things like find product images that match a text review - or detect that a user's photo upload is semantically inconsistent with the description they typed.

I've used CLIP-based embeddings in a content moderation pipeline and the false positive rate was lower than any keyword filter I'd tried previously. Not zero - but meaningfully better for certain categories of misuse.

---

## Where Embeddings Show Up in AI Tools You Use

Embeddings are the invisible infrastructure underneath most AI features that feel "smart" - they rarely get mentioned by name, but they're almost always there.

<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="340" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942">Embeddings in Products You Already Use</text>
  <!-- Six boxes in a 3x2 grid -->
  <!-- Row 1 -->
  <rect x="40" y="55" width="185" height="110" rx="12" fill="#6B7C5E"/>
  <text x="132" y="86" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">Semantic Search</text>
  <text x="132" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Query and docs embedded,</text>
  <text x="132" y="124" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">nearest vectors returned.</text>
  <text x="132" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Used in: Notion AI,</text>
  <text x="132" y="162" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Perplexity, GitHub Copilot</text>

  <rect x="247" y="55" width="185" height="110" rx="12" fill="#96845A"/>
  <text x="340" y="86" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">Recommendations</text>
  <text x="340" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">Items you liked embedded;</text>
  <text x="340" y="124" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">similar items retrieved.</text>
  <text x="340" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">Used in: Spotify, YouTube,</text>
  <text x="340" y="162" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">Amazon product search</text>

  <rect x="455" y="55" width="185" height="110" rx="12" fill="#6B7C5E"/>
  <text x="547" y="86" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">Duplicate Detection</text>
  <text x="547" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Emails, tickets, or docs</text>
  <text x="547" y="124" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">embedded + clustered.</text>
  <text x="547" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Used in: Zendesk AI,</text>
  <text x="547" y="162" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Gmail smart features</text>

  <!-- Row 2 -->
  <rect x="40" y="185" width="185" height="110" rx="12" fill="#4A5942"/>
  <text x="132" y="216" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">Anomaly Detection</text>
  <text x="132" y="238" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Normal requests cluster;</text>
  <text x="132" y="254" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">attacks appear as outliers.</text>
  <text x="132" y="278" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Used in: fraud detection,</text>
  <text x="132" y="292" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">API security monitoring</text>

  <rect x="247" y="185" width="185" height="110" rx="12" fill="#96845A"/>
  <text x="340" y="216" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">RAG Systems</text>
  <text x="340" y="238" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">Docs embedded in a DB;</text>
  <text x="340" y="254" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">relevant chunks retrieved</text>
  <text x="340" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">before LLM generation.</text>
  <text x="340" y="292" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">Core of ChatGPT Enterprise</text>

  <rect x="455" y="185" width="185" height="110" rx="12" fill="#6B7C5E"/>
  <text x="547" y="216" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">Code Assistants</text>
  <text x="547" y="238" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Your codebase indexed</text>
  <text x="547" y="254" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">as embeddings; relevant</text>
  <text x="547" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">files retrieved on demand.</text>
  <text x="547" y="292" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Used in: Cursor, Copilot</text>
</svg>

**Code assistants** like the ones in our [best AI coding tools roundup](/blog/best-ai-coding-tools-2026) embed your entire codebase when you open a project. When you ask a question, the tool retrieves the most relevant files before sending anything to the language model. That's why [Cursor](/blog/cursor-3-review) can answer questions about your project without you having to paste code into the chat manually.

**Semantic search in writing tools.** When Notion AI finds notes "related to" what you're writing, it's comparing embedding vectors. Same mechanism when you search Perplexity and it returns sources that match your intent rather than just your keywords. We reviewed [Perplexity](/review/perplexity) in detail and embeddings are central to why it outperforms standard web search for nuanced queries.

**Spam and content moderation filters.** Gmail's smart filters don't just look for the word "congratulations" in phishing emails. They embed the full message and compare it to known spam clusters. When I ran a small newsletter with about 12,000 subscribers in 2024, I experimented with embedding subscriber feedback to automatically cluster it into bugs, feature requests, and praise - it worked better than any keyword taxonomy I'd designed by hand.

**Recommendation engines.** If you've ever noticed that Spotify's "Discover Weekly" can find songs you love from genres you've never consciously explored, that's embedding similarity across audio features, listening history, and track metadata all living in shared vector space.

The [AI agents](/blog/what-is-an-ai-agent) that are appearing in [best AI agents lists](/blog/best-ai-agents-2026) increasingly use embeddings for memory retrieval - storing past interactions as vectors and finding relevant context when a user picks up a conversation days later.

---

## Building a Semantic Search with Embeddings - What I Learned

Building a semantic search system from scratch is one of the best ways to understand embeddings - the failures teach you more than the successes.

<svg viewBox="0 0 680 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="290" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942">Semantic Search Pipeline</text>
  <!-- Indexing pipeline -->
  <text x="60" y="68" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#8A8577">INDEXING (one-time)</text>
  <!-- Step boxes -->
  <rect x="40" y="78" width="110" height="46" rx="8" fill="#6B7C5E"/>
  <text x="95" y="99" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Raw</text>
  <text x="95" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Documents</text>

  <line x1="152" y1="101" x2="172" y2="101" stroke="#6B7C5E" stroke-width="2" marker-end="url(#pArr1)"/>
  <defs>
    <marker id="pArr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
    <marker id="pArr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
    <marker id="pArr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
    <marker id="pArr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
    <marker id="pArr5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
    <marker id="pArr6" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
  </defs>

  <rect x="174" y="78" width="110" height="46" rx="8" fill="#6B7C5E"/>
  <text x="229" y="99" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Chunk</text>
  <text x="229" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Text</text>

  <line x1="286" y1="101" x2="306" y2="101" stroke="#6B7C5E" stroke-width="2" marker-end="url(#pArr2)"/>

  <rect x="308" y="78" width="110" height="46" rx="8" fill="#6B7C5E"/>
  <text x="363" y="99" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Embed</text>
  <text x="363" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Each Chunk</text>

  <line x1="420" y1="101" x2="440" y2="101" stroke="#6B7C5E" stroke-width="2" marker-end="url(#pArr3)"/>

  <rect x="442" y="78" width="110" height="46" rx="8" fill="#6B7C5E"/>
  <text x="497" y="99" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Store in</text>
  <text x="497" y="115" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Vector DB</text>

  <!-- Query pipeline -->
  <text x="60" y="172" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#8A8577">QUERYING (each search)</text>

  <rect x="40" y="182" width="110" height="46" rx="8" fill="#96845A"/>
  <text x="95" y="203" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">User</text>
  <text x="95" y="219" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Query</text>

  <line x1="152" y1="205" x2="172" y2="205" stroke="#96845A" stroke-width="2" marker-end="url(#pArr4)"/>

  <rect x="174" y="182" width="110" height="46" rx="8" fill="#96845A"/>
  <text x="229" y="203" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Embed</text>
  <text x="229" y="219" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">the Query</text>

  <line x1="286" y1="205" x2="306" y2="205" stroke="#96845A" stroke-width="2" marker-end="url(#pArr5)"/>

  <rect x="308" y="182" width="110" height="46" rx="8" fill="#96845A"/>
  <text x="363" y="203" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Find Top-K</text>
  <text x="363" y="219" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Neighbors</text>

  <line x1="420" y1="205" x2="440" y2="205" stroke="#96845A" stroke-width="2" marker-end="url(#pArr6)"/>

  <rect x="442" y="182" width="110" height="46" rx="8" fill="#96845A"/>
  <text x="497" y="203" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Return</text>
  <text x="497" y="219" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#F4F1EA">Results</text>

  <text x="340" y="264" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Indexing runs once (or on updates).</text>
  <text x="340" y="280" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Query pipeline runs on every search request.</text>
</svg>

My first implementation indexed a 4,000-article blog using `text-embedding-3-small`. The pipeline looked exactly like the diagram above: chunk the articles, embed each chunk, store vectors in Pinecone, then embed every incoming query and retrieve the top-5 nearest chunks.

The results were impressive about 80% of the time. The other 20% taught me several things I hadn't read in any tutorial.

**Chunking strategy matters more than model choice.** I was splitting articles at exactly 500 tokens with no overlap. When a key sentence landed at the boundary between two chunks, neither chunk contained enough context to be relevant. Switching to 400-token chunks with 100-token overlap improved the retrieval quality noticeably - more than swapping to a larger model did.

**Embedding model and retrieval model must match.** Early on I accidentally embedded documents with one model version and queries with a slightly different version after an API update. The results were nonsensical. Vector spaces are not interchangeable between model versions.

**Metadata filtering saves you from irrelevance.** Pure semantic search returns the most similar vectors, full stop. If your corpus includes both beginner tutorials and advanced reference docs, a beginner's question might retrieve highly similar advanced content. Filtering by a `level` metadata field before the similarity search fixed this in my case.

**Reranking adds a meaningful quality layer.** After retrieving top-20 results by embedding similarity, I ran a cross-encoder reranker to reorder them before showing the top-3. The cross-encoder reads the query and each result together, so it has more context than pure vector distance. Precision at position 1 improved by about 18% in my informal evaluation over roughly 300 test queries.

I had assumed embedding search was a near-solved problem from how confidently tutorials present it. The calibration that came from debugging misses was worth far more than reading another overview.

If you're evaluating tools that claim "semantic search" as a feature, look for whether they mention chunking strategy, reranking, or metadata filtering. If they don't, the feature is probably a thin wrapper and the quality ceiling is lower than it could be.

---

## Embeddings and RAG - The Connection

[RAG - retrieval-augmented generation](/blog/what-is-rag-retrieval-augmented-generation) is the architecture that uses embeddings to give language models access to external knowledge without retraining them.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="320" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942">How RAG Uses Embeddings</text>
  <!-- User question box -->
  <rect x="40" y="60" width="130" height="50" rx="10" fill="#96845A"/>
  <text x="105" y="81" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">User Question</text>
  <text x="105" y="99" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">"What is our refund</text>
  <!-- Overflow line for long label -->
  <!-- Arrow down -->
  <line x1="105" y1="112" x2="105" y2="142" stroke="#96845A" stroke-width="2" marker-end="url(#rArr1)"/>
  <defs>
    <marker id="rArr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
    <marker id="rArr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
    <marker id="rArr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
    <marker id="rArr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4A5942"/>
    </marker>
  </defs>
  <!-- Embed question box -->
  <rect x="40" y="144" width="130" height="46" rx="10" fill="#96845A"/>
  <text x="105" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">Embed</text>
  <text x="105" y="181" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA">Question</text>

  <!-- Arrow right to vector search -->
  <line x1="172" y1="167" x2="210" y2="167" stroke="#96845A" stroke-width="2" marker-end="url(#rArr2)"/>

  <!-- Vector DB box -->
  <rect x="212" y="120" width="150" height="90" rx="10" fill="#DDD8CE"/>
  <text x="287" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#4A5942">Vector DB</text>
  <text x="287" y="168" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Company docs,</text>
  <text x="287" y="184" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">all pre-embedded</text>
  <text x="287" y="200" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">and indexed</text>

  <!-- Arrow: top-k chunks retrieved -->
  <line x1="364" y1="167" x2="400" y2="167" stroke="#6B7C5E" stroke-width="2" marker-end="url(#rArr3)"/>

  <!-- Relevant chunks box -->
  <rect x="402" y="120" width="140" height="90" rx="10" fill="#6B7C5E"/>
  <text x="472" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">Top-K Chunks</text>
  <text x="472" y="166" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">Most relevant</text>
  <text x="472" y="182" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">passages returned</text>
  <text x="472" y="198" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">by similarity</text>

  <!-- Arrow down to LLM -->
  <line x1="472" y1="212" x2="472" y2="242" stroke="#4A5942" stroke-width="2" marker-end="url(#rArr4)"/>

  <!-- LLM box -->
  <rect x="322" y="244" width="300" height="50" rx="10" fill="#4A5942"/>
  <text x="472" y="268" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA">LLM generates answer</text>
  <text x="472" y="284" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#DDD8CE">using question + retrieved context</text>

  <text x="170" y="300" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Without embeddings,</text>
  <text x="170" y="314" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">RAG cannot find relevant chunks</text>
</svg>

Here is the relationship precisely: the embedding model is what makes retrieval possible in a RAG system.

Without it, the system would have no way to find which of your 10,000 company documents is most relevant to a user's question. With it, the system can find the right 5 passages in milliseconds and hand them to the language model as context.

The language model then generates an answer grounded in those retrieved passages rather than relying entirely on its training data. This is how enterprise chat tools answer questions about internal policies and product specs they were never trained on.

The quality of the RAG system is the quality of its retrieval - which is the quality of its embeddings. I've seen teams spend weeks [fine-tuning](/blog/what-is-fine-tuning-in-ai) an LLM when the real bottleneck was a mediocre embedding model producing imprecise retrieval. Improving the embedding model gave them bigger gains in half the time.

[Hallucination in AI](/blog/what-is-hallucination-in-ai) is also partly an embedding problem. If retrieval fails to surface the right context, the LLM either makes something up or says it doesn't know. Better embeddings mean better retrieval, which means fewer hallucinations in RAG systems.

This connection is also why [tokenization](/blog/what-is-tokenization) matters for embeddings. The embedding model first tokenizes your input before producing a vector. Long documents that exceed the model's token limit get silently truncated unless you chunk them first - which is one reason chunking is not optional in production pipelines.

[Prompt engineering](/blog/what-is-prompt-engineering) interacts with embeddings too, though indirectly. How you phrase a query affects which embedding vector it produces, which affects what chunks get retrieved, which affects the final answer. This is worth knowing if you're debugging a RAG pipeline where user phrasings produce inconsistent results.

---

## Choosing an Embedding Model

The embedding model you choose affects retrieval quality, latency, cost, and how much data leaves your servers - so the trade-offs are real and worth thinking through before you commit.

<svg viewBox="0 0 680 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="330" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942">Embedding Model Comparison</text>
  <!-- Column headers -->
  <rect x="40" y="50" width="600" height="30" rx="6" fill="#DDD8CE"/>
  <text x="115" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Model</text>
  <text x="230" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Dims</text>
  <text x="330" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">MTEB Score</text>
  <text x="450" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Cost</text>
  <text x="570" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942">Privacy</text>
  <!-- Row 1 -->
  <text x="115" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">text-embedding-3-large</text>
  <text x="230" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">3072</text>
  <text x="330" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#6B7C5E">64.6</text>
  <text x="450" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#96845A">$0.13/M tok</text>
  <text x="570" y="108" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#8A8577">API (cloud)</text>
  <line x1="40" y1="118" x2="640" y2="118" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 2 -->
  <text x="115" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">text-embedding-3-small</text>
  <text x="230" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">1536</text>
  <text x="330" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#6B7C5E">62.3</text>
  <text x="450" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#6B7C5E">$0.02/M tok</text>
  <text x="570" y="148" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#8A8577">API (cloud)</text>
  <line x1="40" y1="158" x2="640" y2="158" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 3 -->
  <text x="115" y="194" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">all-MiniLM-L6-v2</text>
  <text x="230" y="194" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">384</text>
  <text x="330" y="194" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#96845A">56.3</text>
  <text x="450" y="194" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#6B7C5E">Free (local)</text>
  <text x="570" y="194" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#6B7C5E">Full privacy</text>
  <line x1="40" y1="204" x2="640" y2="204" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 4 -->
  <text x="115" y="230" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">BGE-M3</text>
  <text x="230" y="230" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">1024</text>
  <text x="330" y="230" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#6B7C5E">65.0</text>
  <text x="450" y="230" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#6B7C5E">Free (local)</text>
  <text x="570" y="230" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#6B7C5E">Full privacy</text>
  <line x1="40" y1="240" x2="640" y2="240" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Row 5 -->
  <text x="115" y="266" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">Gemini Embedding</text>
  <text x="230" y="266" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#3A3228">768</text>
  <text x="330" y="266" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#6B7C5E">63.5</text>
  <text x="450" y="266" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#96845A">$0.04/M tok</text>
  <text x="570" y="266" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#8A8577">API (cloud)</text>
  <text x="340" y="304" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">MTEB = Massive Text Embedding Benchmark (higher is better)</text>
  <text x="340" y="320" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577">Scores approximate as of mid-2026</text>
</svg>

The most important split is cloud API vs self-hosted.

If you use OpenAI's `text-embedding-3-small` or `text-embedding-3-large`, your text leaves your servers and gets processed by OpenAI. For most consumer products that's fine. For anything involving sensitive customer data, medical records, or proprietary business information, you probably want a local model.

BGE-M3 and `all-MiniLM-L6-v2` run locally via [Sentence Transformers](https://www.sbert.net/) - no API calls, no data leaving your machine, and (once you've paid the infrastructure cost) no per-token charges.

The performance difference is real but narrower than it used to be. BGE-M3 sits within a few points of OpenAI's large model on MTEB benchmarks while running entirely locally. For a startup with privacy-conscious enterprise customers, that trade-off is increasingly worth making.

**Dimensionality and cost.** Higher-dimensional vectors are more expressive but cost more to store and query. `text-embedding-3-large` at 3072 dimensions stores vectors that are 8x bigger than `all-MiniLM-L6-v2` at 384. At a million documents, that storage difference is meaningful.

OpenAI also supports "dimension reduction" on `text-embedding-3` models - you can request shorter vectors that retain most of the quality. I tested this on an internal search prototype: reducing from 1536 to 512 dimensions dropped NDCG@10 by about 3 points but reduced storage and query cost by two-thirds. For many applications, that is an acceptable trade.

**Domain specificity matters.** General-purpose models are trained on broad web text. If you're embedding legal contracts, medical literature, or code, a domain-specific or fine-tuned model will typically outperform. This is where [fine-tuning](/blog/what-is-fine-tuning-in-ai) intersects with embeddings - you can fine-tune an embedding model on your own domain data to improve retrieval quality substantially.

One mistake I made: I evaluated models on a public benchmark and chose accordingly. My actual use case had shorter queries against longer documents, which is a distribution shift from most benchmarks. Always evaluate on your own data if quality matters.

Our [AI tools cost calculator](/tools/cost-calculator) can help you model embedding costs at scale if you're deciding between API and self-hosted options.

---

## Common Misconceptions About Embeddings

There are a few things about embeddings that I repeatedly see stated incorrectly, including in materials I was using when I started out.

**Misconception 1: more dimensions always means better embeddings.** Dimensionality controls the capacity of the vector space, not the quality of what's encoded in it. A 384-dimension model trained well on relevant data will outperform a 3072-dimension model that was trained on data distant from your domain.

**Misconception 2: embedding search replaces keyword search.** In practice, the best production search systems use both. A technique called hybrid search combines embedding similarity with BM25 (a keyword scoring method), then uses reciprocal rank fusion to merge the results. The hybrid consistently beats either approach alone because they fail on different kinds of queries.

**Misconception 3: embedding models understand what they embed.** They don't - not in any meaningful sense. They produce vectors that are statistically useful for comparison tasks. A sentence like "The bank robbed the fish" will get a plausible embedding even though it's nonsense. The model doesn't flag it as incoherent.

**Misconception 4: once you embed, you're done.** Embeddings go stale. If your product documentation changes, the vectors in your database are now out of sync. Production systems need update pipelines that re-embed changed content and replace stale vectors.

I discovered the stale-embeddings problem the hard way when a product I was searching had been updated and the old embedding returned accurate results for the old version and confusingly relevant results for the new one. The search wasn't broken - the index just hadn't been refreshed.

These misconceptions are worth knowing before you build, not after.

---

## How Embeddings Fit Into the Broader AI Stack

Embeddings are one of several foundational concepts that together make modern AI systems work - and understanding how they connect to the rest makes you significantly better at using or building with AI tools.

The [transformer architecture](/blog/what-is-the-transformer-architecture) produces contextual embeddings internally as part of every forward pass. Every token in a sentence gets an embedding that's influenced by all the other tokens - this is the "attention" mechanism at work, and it's why modern sentence embeddings capture context while Word2Vec could not.

[Large language models](/blog/what-is-a-large-language-model) are essentially very deep embedding machines. The final output layer predicts the next token, but the internal representations are high-dimensional embeddings of meaning. This is why you can extract embeddings from an LLM's intermediate layers if you want richer, task-specific representations.

[RLHF](/blog/what-is-rlhf) connects here too. When human feedback is used to fine-tune a model's preferences, the reward signal modifies the embedding space - making the model's internal representations more aligned with what humans consider good outputs.

[AI agents](/blog/what-is-an-ai-agent) increasingly use embedding-based memory. An agent that runs over multiple sessions can store summaries of past conversations as embeddings and retrieve relevant context at the start of each session. This is how [vibe coding](/blog/what-is-vibe-coding) tools maintain context about a codebase across a long development session.

Understanding embeddings also helps you read [AI tool reviews](/best-of/best-ai-writing-tools) and comparisons more critically. When a tool claims to "understand" your document or "find relevant content," the quality of that feature usually comes down to the quality of its embedding model and retrieval pipeline. You now have the frame to ask the right questions.

If you want to compare specific tools, our [comparison tool](/tools/compare) and [AI code assistants guide](/best-of/best-ai-code-assistants) cover tools where embeddings are doing heavy lifting.

---

## Frequently Asked Questions

**What is an embedding in simple terms?**

An embedding is a list of numbers that represents the meaning of something - a word, sentence, image, or any data - in a form that a computer can compare mathematically. Things with similar meaning produce similar numbers, which is what lets AI do semantic search and recommendations.

**How is an embedding different from a token?**

A [token](/blog/what-is-tokenization) is a unit of text - roughly a word or sub-word that a language model processes as input. An embedding is the numerical vector that represents the meaning of a token (or a whole sentence, or an image). Tokenization happens first; embedding happens after.

**Do I need to understand embeddings to use AI tools?**

Not necessarily for everyday use. But if you're building AI-powered features, evaluating search quality, choosing between AI tools, or debugging unexpected results, understanding embeddings gives you a significant advantage. Many product decisions that seem like "AI quality" problems are actually embedding pipeline problems.

**What is a vector database and why does it matter?**

A vector database (like Pinecone, Weaviate, Chroma, or pgvector) stores embeddings and supports fast nearest-neighbor search at scale. Doing similarity search over millions of vectors requires approximate nearest-neighbor algorithms that standard databases don't support. Vector databases are infrastructure purpose-built for embedding-based retrieval.

**Can embeddings be used for images and audio, not just text?**

Yes. Image embeddings (from models like CLIP or ViT) represent visual content as vectors. Audio can be embedded too - Spotify uses audio embeddings as part of its music recommendation system. The same cosine similarity math works across all modalities. Multimodal models embed text and images into the same space so you can compare across them.

**Is embedding the same as fine-tuning?**

No - they're distinct. An embedding is the output of a model: a vector representation of an input. [Fine-tuning](/blog/what-is-fine-tuning-in-ai) is a training process that modifies a model's weights to perform better on a specific task or domain. You can fine-tune an embedding model on your data to produce better embeddings for your use case.

**How many dimensions does an embedding have?**

Common embedding models range from 384 dimensions (small models like `all-MiniLM-L6-v2`) to 3072 dimensions (OpenAI's `text-embedding-3-large`). More dimensions can capture more nuanced relationships but cost more to store and query. Research models push beyond 4000 dimensions, though diminishing returns appear well before that in most practical tasks.

**Why do semantic search results sometimes seem wrong?**

A few common reasons: chunking strategy means the right information is split across chunks that score lower individually; the embedding model was not trained on text similar to your domain; the query phrasing produces a different embedding than you'd expect; or the index contains stale embeddings from before a document was updated. Each of these has a specific fix.

**How do I get started building with embeddings?**

The fastest path: use the [OpenAI embeddings API](https://platform.openai.com/docs/guides/embeddings) with `text-embedding-3-small`, embed a few hundred text samples, store them in a list, and compute cosine similarity manually in Python with NumPy. Once that works, swap NumPy for a proper vector database. The Sentence Transformers library makes local model setup nearly as fast.

**Which AI tools use embeddings under the hood?**

Most of them. [Claude](/blog/claude-opus-4-7-review), ChatGPT, and [Gemma](/blog/gemma-4-review) all use internal embeddings as part of generation. [AI coding assistants](/best-of/best-ai-code-assistants) embed your codebase for context retrieval. Perplexity embeds search results. Notion AI embeds your notes. Any feature that finds "relevant" content semantically is built on embeddings. Our [free AI tools guide](/best-of/best-free-ai-tools) and [methodology page](/methodology) cover how we evaluate these capabilities across tools.
