---
title: "What Is RAG (Retrieval-Augmented Generation)?"
description: "RAG is a technique that connects an LLM to external documents so it can answer questions from real sources, not just training data. Full explainer."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-rag"
author: "Ash"
---


There's a pattern I keep seeing in teams that are frustrated with their AI setups: they've tried a powerful model, the model sounds confident, and then it gets something completely wrong - a fact that changed six months ago, a policy they updated last quarter, a product spec the model has never seen.

The fix isn't a smarter model. The fix is RAG.

I've built RAG pipelines into three different internal tools over the past year - a customer support assistant, a documentation search system, and a codebase question-answering tool.

The gap between a well-built RAG system and a bare LLM on knowledge-heavy tasks is not subtle. In this guide I'll explain exactly how RAG works, where it beats alternatives like fine-tuning, and - importantly - where it still falls short.

---

## What Is RAG?

**Retrieval-Augmented Generation (RAG) is a technique that gives a language model access to an external knowledge base at query time, so its answers can be grounded in real documents rather than relying solely on what it learned during training.**

The term was coined by Meta AI researchers Patrick Lewis and colleagues in their 2020 paper [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401). The core insight was elegant: rather than trying to bake all world knowledge into model weights, let the model retrieve relevant passages on demand and condition its response on those passages.

Think of it as the difference between a person answering from memory versus a person answering after quickly looking something up. The second person has a narrower chance of confabulating - they have the source document right in front of them.

That's the RAG promise. In practice it delivers, with some caveats I'll get into.

<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="280" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="340" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">What Is RAG? - The Core Concept</text>
  <!-- Three boxes -->
  <!-- Box 1: LLM alone -->
  <rect x="32" y="60" width="180" height="160" rx="12" fill="#DDD8CE"/>
  <text x="122" y="90" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">LLM Alone</text>
  <text x="122" y="112" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Answers from</text>
  <text x="122" y="128" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">training weights</text>
  <text x="122" y="152" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#96845A">Knowledge cutoff</text>
  <text x="122" y="168" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#96845A">May hallucinate</text>
  <text x="122" y="184" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#96845A">No private data</text>
  <!-- Divider arrow -->
  <text x="258" y="145" text-anchor="middle" font-family="system-ui,sans-serif" font-size="24" fill="#8A8577">+</text>
  <text x="258" y="165" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">RAG</text>
  <!-- Box 2: Knowledge Base -->
  <rect x="288" y="60" width="180" height="160" rx="12" fill="#DDD8CE"/>
  <text x="378" y="90" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Knowledge Base</text>
  <text x="378" y="112" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Your documents,</text>
  <text x="378" y="128" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">PDFs, databases</text>
  <text x="378" y="152" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">Always up to date</text>
  <text x="378" y="168" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">Your private data</text>
  <text x="378" y="184" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">Verifiable sources</text>
  <!-- Result arrow -->
  <text x="510" y="140" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" fill="#8A8577">→</text>
  <!-- Box 3: Result -->
  <rect x="528" y="60" width="120" height="160" rx="12" fill="#6B7C5E"/>
  <text x="588" y="90" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">RAG Output</text>
  <text x="588" y="114" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Grounded</text>
  <text x="588" y="130" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">in sources</text>
  <text x="588" y="154" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Citable</text>
  <text x="588" y="170" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Fresh</text>
  <text x="588" y="186" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Private-data</text>
  <text x="588" y="202" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">aware</text>
  <!-- Caption -->
  <text x="340" y="252" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">RAG = LLM reasoning + real-time document retrieval</text>
</svg>

RAG matters most when your question depends on information the model couldn't have learned during training - either because it's private (your internal docs, your customer data), or because it's recent (anything after the training cutoff), or because precision matters and you need a citable source.

For a lot of teams, this covers the majority of what they actually want AI to do.

---

## The RAG Pipeline Step by Step

**The RAG pipeline is a three-stage sequence: a user query is used to retrieve relevant document chunks from a vector store, those chunks are inserted into the model's context window alongside the question, and the model generates a response grounded in that retrieved material.**

Breaking it down in detail - because each stage has its own failure modes that I've personally hit.

**Stage 1: Indexing (offline)**

Before any queries happen, your documents are processed into a searchable form. The pipeline reads each source document (PDF, HTML page, database record, whatever), splits it into chunks (typically 200-800 tokens each), and runs each chunk through an embedding model to produce a vector - a list of numbers that encodes the semantic meaning of that chunk.

Those vectors get stored in a vector database - Pinecone, Weaviate, Chroma, pgvector, and others are common choices. This index is your knowledge base.

The chunking strategy matters a lot here and almost nobody talks about it enough.

Chunk too large and you're retrieving big paragraphs where only one sentence was relevant, which dilutes the signal. Chunk too small and you lose the surrounding context that makes the relevant sentence meaningful.

**Stage 2: Retrieval (at query time)**

When a user sends a question, the same embedding model turns that question into a vector. The vector database then performs a similarity search - finding the N chunks whose vectors are closest to the query vector.

"Closest" here means semantically similar, not keyword-matching. A question like "when does the warranty expire?" will retrieve chunks about "product coverage period" and "guarantee duration" even if those exact words aren't in the question.

Most implementations retrieve 3-10 chunks.

Too few and you might miss the right document. Too many and you're padding the context with noise that confuses the model.

**Stage 3: Generation**

The retrieved chunks get assembled into a prompt - usually structured as "Here are some relevant documents: [chunks]. Based only on these documents, answer the following question: [user query]."

The LLM then generates its response. Because the answer source is right there in the prompt, the model can cite it, quote it, and most importantly - it can say "I don't know" when the retrieved chunks don't contain the answer.

That last point is underrated. A well-instructed RAG system that says "I couldn't find that in the documents" is more valuable than a hallucinating model that sounds confident about the wrong answer.

<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="340" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="340" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">The RAG Pipeline - Step by Step</text>

  <!-- Stage 1: Offline Indexing -->
  <rect x="24" y="56" width="190" height="240" rx="12" fill="#DDD8CE"/>
  <text x="119" y="82" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Stage 1: Indexing</text>
  <text x="119" y="98" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">(offline, one-time)</text>
  <!-- Step labels -->
  <rect x="40" y="110" width="160" height="30" rx="6" fill="#6B7C5E"/>
  <text x="120" y="129" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Load documents</text>
  <text x="119" y="158" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <rect x="40" y="166" width="160" height="30" rx="6" fill="#6B7C5E"/>
  <text x="120" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Chunk into pieces</text>
  <text x="119" y="214" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <rect x="40" y="222" width="160" height="30" rx="6" fill="#6B7C5E"/>
  <text x="120" y="241" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Embed into vectors</text>
  <text x="119" y="270" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <text x="119" y="288" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Store in vector DB</text>

  <!-- Arrow between stages -->
  <text x="232" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" fill="#96845A">→</text>

  <!-- Stage 2: Retrieval -->
  <rect x="248" y="56" width="190" height="240" rx="12" fill="#DDD8CE"/>
  <text x="343" y="82" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Stage 2: Retrieval</text>
  <text x="343" y="98" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">(at query time)</text>
  <rect x="264" y="110" width="160" height="30" rx="6" fill="#96845A"/>
  <text x="344" y="129" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">User sends query</text>
  <text x="343" y="158" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <rect x="264" y="166" width="160" height="30" rx="6" fill="#96845A"/>
  <text x="344" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Embed the query</text>
  <text x="343" y="214" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <rect x="264" y="222" width="160" height="30" rx="6" fill="#96845A"/>
  <text x="344" y="241" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Similarity search</text>
  <text x="343" y="270" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <text x="343" y="288" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Top-K chunks returned</text>

  <!-- Arrow between stages -->
  <text x="456" y="180" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" fill="#96845A">→</text>

  <!-- Stage 3: Generation -->
  <rect x="472" y="56" width="184" height="240" rx="12" fill="#DDD8CE"/>
  <text x="564" y="82" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Stage 3: Generation</text>
  <text x="564" y="98" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">(LLM call)</text>
  <rect x="488" y="110" width="152" height="30" rx="6" fill="#4A5942"/>
  <text x="564" y="129" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Build prompt with</text>
  <!-- line 2 for long label -->
  <text x="564" y="143" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">chunks + question</text>
  <text x="564" y="170" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <rect x="488" y="178" width="152" height="30" rx="6" fill="#4A5942"/>
  <text x="564" y="197" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">LLM reads context</text>
  <text x="564" y="224" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <rect x="488" y="232" width="152" height="30" rx="6" fill="#4A5942"/>
  <text x="564" y="251" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Grounded answer</text>
  <text x="564" y="277" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#8A8577">↓</text>
  <text x="564" y="295" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">with citations</text>

  <!-- Bottom note -->
  <text x="340" y="320" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Indexing runs once (or on doc update). Retrieval + Generation run on every query.</text>
</svg>

This three-stage process looks simple written out.

The complexity is in the tuning - chunk size, embedding model choice, how many chunks to retrieve, how you format the retrieved context in the prompt. Each of those decisions has a measurable impact on answer quality.

If you're building RAG and it's giving mediocre results, the problem is almost always in one of those tuning decisions, not in the fundamental approach.

---

## Why LLMs Need RAG

**LLMs need RAG because they have two structural problems - a knowledge cutoff and a tendency to hallucinate - and both problems get worse the more you ask the model to work with specific, verifiable facts.**

Let me be precise about each.

The knowledge cutoff is literal: a model trained on data through December 2024 simply has no information about anything that happened in 2025 or 2026.

You can't reason about what you don't know.

Every major LLM - GPT-5, Claude Opus 4, Gemini - has this problem. The training data closes at some point, and the world keeps moving.

The [hallucination problem](/blog/what-is-hallucination-in-ai) is more insidious. LLMs generate text by predicting what comes next given their training. When they don't know the answer, they don't say so - they generate plausible-sounding text that fills the gap. The model has no internal alarm bell that says "I'm guessing now." From the outside, a confident correct answer and a confident hallucination look identical.

<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="300" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">Two Core LLM Problems RAG Solves</text>

  <!-- Problem 1 box -->
  <rect x="36" y="54" width="280" height="210" rx="12" fill="#DDD8CE"/>
  <text x="176" y="82" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#96845A">Problem 1: Knowledge Cutoff</text>
  <text x="176" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Model knows nothing after</text>
  <text x="176" y="122" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">its training end date</text>
  <text x="176" y="148" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Examples affected:</text>
  <text x="176" y="166" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">- Current prices or rates</text>
  <text x="176" y="182" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">- New product releases</text>
  <text x="176" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">- Updated regulations</text>
  <text x="176" y="220" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">RAG fix: retrieve today's docs</text>
  <text x="176" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">and inject into context</text>

  <!-- Problem 2 box -->
  <rect x="364" y="54" width="280" height="210" rx="12" fill="#DDD8CE"/>
  <text x="504" y="82" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#96845A">Problem 2: Hallucination</text>
  <text x="504" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Model generates plausible</text>
  <text x="504" y="122" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">but wrong facts confidently</text>
  <text x="504" y="148" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Examples affected:</text>
  <text x="504" y="166" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">- Specific citations/dates</text>
  <text x="504" y="182" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">- Technical specifications</text>
  <text x="504" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">- Company-specific data</text>
  <text x="504" y="220" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">RAG fix: ground answers in</text>
  <text x="504" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">retrieved source documents</text>

  <text x="340" y="280" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">RAG doesn't eliminate hallucination entirely - but it gives the model an anchor.</text>
</svg>

There's a third problem that gets less attention: private data. Your company's internal documentation, your customer records, your proprietary research - none of that is in any model's training data.

Fine-tuning can address this (more on that shortly), but it's slow, expensive, and the data can drift. RAG lets you update the knowledge base without retraining anything.

This is why tools like [Perplexity](/review/perplexity) built their entire product around RAG. Every Perplexity query retrieves live web pages before generating an answer.

You can see the sources, click through to verify, and the answer reflects what's actually on the web today - not what the model learned a year ago.

The underlying LLM in a RAG system matters less than people think.

A well-built RAG pipeline with a mid-tier model often outperforms a frontier model answering from memory on factual question-answering tasks. The retrieval step is doing most of the heavy lifting.

---

## RAG vs Fine-Tuning - Which to Choose?

**The choice between RAG and fine-tuning comes down to what problem you're actually solving: RAG is for knowledge access, fine-tuning is for behavior change.**

This is a distinction I got wrong for longer than I'd like to admit.

When I was building the codebase Q&A tool I mentioned at the top, my first instinct was to fine-tune. I had thousands of code examples and documentation pages - surely feeding all that into a training run would produce a better coding assistant?

It didn't work well. The fine-tuned model was better at mimicking our codebase's style, but it still couldn't accurately answer "what does function X in file Y do?" - because fine-tuning doesn't reliably inject retrievable facts.

It adjusts the model's behavior patterns, not its ability to recall specific content.

RAG, on the other hand, can answer that exact question because the relevant file is in the vector store. When the user asks about function X, the relevant file chunk gets retrieved and the model reads it right there.

Here's how I think about the decision now:

| Use case | Better approach |
|---|---|
| "Answer questions about our docs" | RAG |
| "Know our latest pricing" | RAG |
| "Sound like our brand voice" | Fine-tuning |
| "Always respond in JSON format" | Fine-tuning |
| "Know our internal product deeply" | RAG + maybe fine-tuning |
| "Reduce hallucination on facts" | RAG |
| "Follow specific instructions reliably" | Fine-tuning or [prompt engineering](/blog/what-is-prompt-engineering) |

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="320" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">RAG vs Fine-Tuning - Decision Grid</text>

  <!-- Column headers -->
  <rect x="200" y="52" width="180" height="32" rx="8" fill="#6B7C5E"/>
  <text x="290" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">RAG</text>
  <rect x="400" y="52" width="180" height="32" rx="8" fill="#96845A"/>
  <text x="490" y="72" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">Fine-Tuning</text>

  <!-- Row labels and dots -->
  <!-- Row 1 -->
  <text x="186" y="104" text-anchor="end" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Factual Q&amp;A</text>
  <circle cx="290" cy="100" r="10" fill="#6B7C5E"/>
  <text x="290" y="105" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#F4F1EA">✓</text>
  <circle cx="490" cy="100" r="10" fill="#DDD8CE"/>
  <text x="490" y="105" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#8A8577">~</text>

  <!-- Row 2 -->
  <text x="186" y="134" text-anchor="end" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Real-time data</text>
  <circle cx="290" cy="130" r="10" fill="#6B7C5E"/>
  <text x="290" y="135" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#F4F1EA">✓</text>
  <circle cx="490" cy="130" r="10" fill="#DDD8CE"/>
  <text x="490" y="135" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#8A8577">✗</text>

  <!-- Row 3 -->
  <text x="186" y="164" text-anchor="end" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Private documents</text>
  <circle cx="290" cy="160" r="10" fill="#6B7C5E"/>
  <text x="290" y="165" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#F4F1EA">✓</text>
  <circle cx="490" cy="160" r="10" fill="#DDD8CE"/>
  <text x="490" y="165" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#8A8577">~</text>

  <!-- Row 4 -->
  <text x="186" y="194" text-anchor="end" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Response style</text>
  <circle cx="290" cy="190" r="10" fill="#DDD8CE"/>
  <text x="290" y="195" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#8A8577">~</text>
  <circle cx="490" cy="190" r="10" fill="#96845A"/>
  <text x="490" y="195" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#F4F1EA">✓</text>

  <!-- Row 5 -->
  <text x="186" y="224" text-anchor="end" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Output format</text>
  <circle cx="290" cy="220" r="10" fill="#DDD8CE"/>
  <text x="290" y="225" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#8A8577">~</text>
  <circle cx="490" cy="220" r="10" fill="#96845A"/>
  <text x="490" y="225" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#F4F1EA">✓</text>

  <!-- Row 6 -->
  <text x="186" y="254" text-anchor="end" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Easy to update</text>
  <circle cx="290" cy="250" r="10" fill="#6B7C5E"/>
  <text x="290" y="255" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#F4F1EA">✓</text>
  <circle cx="490" cy="250" r="10" fill="#DDD8CE"/>
  <text x="490" y="255" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="#8A8577">✗</text>

  <!-- Legend -->
  <text x="340" y="295" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">✓ = well-suited   ~ = partial   ✗ = poor fit</text>
</svg>

Fine-tuning shines when you need to change how the model behaves - its tone, its output format, the specific task framing it follows.

It's not great at injecting specific facts. If you train a model to know your Q3 product prices, you'll need to retrain it when Q4 prices change.

RAG updates are trivial by comparison. Delete the old document from the vector store, add the new one, done.

No training run, no GPU time.

The most powerful setups I've seen combine both: fine-tune for behavior and format, RAG for knowledge.

That said, for most teams, RAG alone gets you most of the way there. Fine-tuning is a later optimization, not a first step.

For a deeper look at fine-tuning specifically, the [fine-tuning explainer](/blog/what-is-fine-tuning-in-ai) on this site covers the mechanics in detail.

---

## Where I Built a RAG System and What Broke

<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="220" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">Real Build - Failure Points Found</text>
  <!-- Timeline line -->
  <line x1="80" y1="120" x2="600" y2="120" stroke="#DDD8CE" stroke-width="3"/>
  <!-- Stage 1 -->
  <circle cx="130" cy="120" r="18" fill="#6B7C5E"/>
  <text x="130" y="125" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Start</text>
  <text x="130" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Prototype</text>
  <text x="130" y="163" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">worked fine</text>
  <!-- Stage 2 - failure -->
  <circle cx="265" cy="120" r="18" fill="#96845A"/>
  <text x="265" y="125" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Fail 1</text>
  <text x="265" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">Chunk</text>
  <text x="265" y="163" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">boundaries</text>
  <text x="265" y="94" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Fix: sliding</text>
  <text x="265" y="105" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">window chunks</text>
  <!-- Stage 3 - failure -->
  <circle cx="400" cy="120" r="18" fill="#96845A"/>
  <text x="400" y="125" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Fail 2</text>
  <text x="400" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">Vocab</text>
  <text x="400" y="163" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">mismatch</text>
  <text x="400" y="94" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Fix: cross-encoder</text>
  <text x="400" y="105" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">reranker added</text>
  <!-- Stage 4 - failure -->
  <circle cx="535" cy="120" r="18" fill="#96845A"/>
  <text x="535" y="125" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#F4F1EA">Fail 3</text>
  <text x="535" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">Wrong context</text>
  <text x="535" y="163" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">used anyway</text>
  <text x="535" y="94" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Fix: relevance</text>
  <text x="535" y="105" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">threshold added</text>
  <!-- Caption -->
  <text x="340" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Customer support RAG - production failure timeline (2025)</text>
</svg>

**The gap between RAG working in a demo and RAG working reliably in production is real - and I hit almost every version of it before getting to a system I was happy with.**

The first RAG project I built was a customer support assistant for a SaaS product. The use case seemed perfect: the company had a large help center with hundreds of articles, and support agents were spending hours answering questions that were already documented.

RAG would let the AI answer those questions directly, citing the relevant help article.

The initial prototype worked well in my tests. I put in 200 help articles, queried them with questions I invented, got accurate answers with citations.

I showed it to the team and they liked it.

Then we connected it to real customer queries.

The first failure I hit: **chunk boundary problems.** A customer asked "how do I export my data in CSV format?" The relevant help article had a section on CSV export, but that section spanned a chunk boundary - the first half of the instructions was in one chunk, the second half in the next.

My retrieval was pulling only one of those chunks. The answer was incomplete and looked like a bug to the customer.

Fix: I moved to a sliding window chunking approach, where chunks overlap by 20% with their neighbors. The same content appears in multiple chunks, so boundary splits don't cause information loss.

The second failure: **query-document vocabulary mismatch.** Customers asked questions using their own language ("how do I get my spreadsheet out of here?") while our help docs used product terminology ("export as CSV from the Data Management panel"). The semantic similarity was low enough that the wrong chunks kept getting retrieved.

Fix: I added a reranking step. After the initial vector retrieval pulls 20 candidates, a cross-encoder reranker re-scores each chunk against the original query.

The cross-encoder is slower but dramatically better at catching semantic matches that the embedding model missed. Retrieval accuracy went from roughly 71% to 89% on my test set.

The third failure was the one that took longest to diagnose: **confident wrong answers when no good context existed.** If a customer asked about a feature we hadn't documented yet, the retriever would return whatever chunks scored highest - even if they weren't actually relevant. The model would then synthesize an answer from those irrelevant chunks and present it confidently.

Fix: I added a relevance threshold. If the top retrieved chunk scored below a certain similarity score, the system would decline to answer and escalate to a human agent instead of generating from noise.

None of these problems are exotic. They're predictable.

But you don't see them in demos because demos use carefully matched query-document pairs. Production traffic is messier.

---

## Real-World RAG Use Cases

**RAG is deployed today across industries anywhere that accurate, sourced, up-to-date answers matter more than creative generation - and that covers a very wide range of applications.**

The categories I've seen work reliably in practice:

**Enterprise knowledge bases.** The most common application. A company's internal documentation (HR policies, engineering runbooks, product specs, sales playbooks) gets indexed into a RAG system. Employees ask questions in natural language instead of hunting through Confluence or Notion. The AI answers from the actual current docs. When a policy changes, the document is updated in the knowledge base - no model retraining required.

This is where I've personally seen the most consistent ROI. The setup is relatively simple (the docs already exist), the use case is well-defined (answer employee questions accurately), and the failure mode is obvious (wrong answer from a stale doc is quickly caught).

**Legal and compliance research.** Law firms and compliance teams use RAG to query contract libraries, regulatory filings, and case law. The critical requirement here - answer must be traceable to a specific source document - is exactly what RAG provides. The [best AI coding tools of 2026](/blog/best-ai-coding-tools-2026) share this traceability requirement at the compliance layer too, since regulated industries need audit trails.

**Customer-facing support.** The use case I built above. RAG-backed support systems can handle a high proportion of Tier 1 tickets (questions answered in existing docs) and escalate anything that needs human judgment. The quality bar here is high - customer-facing errors are costly - but a well-tuned RAG system with a confidence threshold handles it well.

**Research assistants.** Tools like [Perplexity](/review/perplexity) are essentially RAG at internet scale. The retrieval step fetches live web pages; the generation step synthesizes across them. The same pattern works internally with research papers, competitive intelligence databases, or any corpus of long documents. For deeper work, pairing RAG with an [AI agent](/blog/what-is-an-ai-agent) that can iteratively retrieve and reason gives you something closer to a research analyst than a simple Q&A bot.

**Code search and documentation.** This is where I've gotten the most surprising results. Indexing a large codebase and its docs into a RAG system, then asking "what does the payment processor module do?" or "where is user authentication handled?" - the answers are better than grep, faster than searching GitHub, and more contextual than a traditional doc site. The [best AI code assistants](/best-of/best-ai-code-assistants) are increasingly incorporating RAG-style retrieval natively.

<svg viewBox="0 0 680 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="290" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">RAG Use Cases - Adoption by Industry</text>

  <!-- Y axis label -->
  <text x="20" y="85" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">High</text>
  <text x="20" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Low</text>
  <line x1="50" y1="60" x2="50" y2="230" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="50" y1="230" x2="650" y2="230" stroke="#DDD8CE" stroke-width="1.5"/>

  <!-- Bars -->
  <!-- Enterprise KB -->
  <rect x="66" y="80" width="80" height="150" rx="6" fill="#6B7C5E"/>
  <text x="106" y="248" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Enterprise</text>
  <text x="106" y="260" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Knowledge</text>
  <text x="106" y="75" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">Very High</text>

  <!-- Legal -->
  <rect x="178" y="110" width="80" height="120" rx="6" fill="#6B7C5E"/>
  <text x="218" y="248" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Legal &amp;</text>
  <text x="218" y="260" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Compliance</text>
  <text x="218" y="105" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">High</text>

  <!-- Customer support -->
  <rect x="290" y="100" width="80" height="130" rx="6" fill="#96845A"/>
  <text x="330" y="248" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Customer</text>
  <text x="330" y="260" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Support</text>
  <text x="330" y="95" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">High</text>

  <!-- Research -->
  <rect x="402" y="130" width="80" height="100" rx="6" fill="#96845A"/>
  <text x="442" y="248" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Research</text>
  <text x="442" y="260" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Assistants</text>
  <text x="442" y="125" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">Medium</text>

  <!-- Code Search -->
  <rect x="514" y="150" width="80" height="80" rx="6" fill="#DDD8CE"/>
  <text x="554" y="248" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Code</text>
  <text x="554" y="260" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Search</text>
  <text x="554" y="145" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">Growing</text>

  <text x="340" y="283" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Based on production deployment patterns observed across teams in 2025-2026</text>
</svg>

One use case I'd flag as underrated: **meeting and conversation intelligence.** Call transcripts, meeting notes, Slack thread dumps - all of this is unstructured text that's traditionally been searchable only by keyword. RAG over your conversation history ("what did we decide about the Q3 roadmap?") is surprisingly practical and takes an afternoon to set up with modern tooling.

---

## The Limits of RAG

**RAG reduces errors from knowledge gaps and outdated training data, but it doesn't make an LLM fundamentally more reliable - and several categories of problems that people expect RAG to fix, it simply doesn't.**

I've seen teams oversell RAG internally and then get burned when the limitations showed up. Here's what I'd tell anyone deploying it.

**Retrieval failures cascade.** If the retrieval step returns the wrong chunks - because the query was ambiguous, the embeddings didn't match, or the relevant document wasn't indexed - the generation step will produce a wrong answer confidently. The model doesn't know it got bad context. It works with what it has. In my customer support system, about 8% of queries consistently retrieved the wrong context even after tuning. Those queries needed a different approach (hybrid BM25 + vector search helped) but some never fully resolved.

**Multi-document reasoning is hard.** If the answer to a question requires synthesizing information from five different documents, RAG struggles. You can retrieve all five, but fitting them in context while preserving the reasoning chain is difficult. The model tends to summarize each document individually rather than integrate across them. This is a genuine architectural limit - not a tuning problem.

**Long documents don't chunk cleanly.** A 50-page technical specification doesn't decompose into tidy independent chunks. Dependencies run across sections, and key definitions early in the document are needed to interpret sections later. Naive chunking loses these relationships. Better chunking strategies (hierarchical, document-aware) help but add complexity.

**RAG can't fix the underlying model's reasoning limits.** If the model can't do multi-step logic or handle complex inference, having better sources doesn't fix that. The retrieved context supplies the facts; the model still has to reason with them. This is why [prompt engineering](/blog/what-is-prompt-engineering) still matters even in a RAG system - how you structure the retrieved context in the prompt changes how well the model uses it.

**Embedding models are not neutral.** The embedding model you use encodes a specific semantic space. Queries and documents that don't share vocabulary tend to have low similarity even when they're topically related. Domain-specific jargon is the classic failure case - medical terminology, legal Latin, code identifiers. Fine-tuned domain-specific embedding models help, but they're less available and more work to operate.

**The "lost in the middle" problem persists.** Research has shown that LLMs attending to long context windows reliably attend to the beginning and end of the context but lose track of information in the middle. If your most relevant retrieved chunk is the fourth of eight chunks in the prompt, the model may effectively ignore it. This is not a RAG problem specifically but it bites RAG deployments because you're building exactly these long, multi-chunk contexts.

<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="280" fill="#F4F1EA" rx="12"/>
  <text x="340" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">RAG Limitation Severity - Practical Assessment</text>

  <!-- Header row -->
  <text x="200" y="58" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Limitation</text>
  <text x="450" y="58" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Severity</text>
  <text x="580" y="58" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Fixable?</text>
  <line x1="36" y1="64" x2="644" y2="64" stroke="#DDD8CE" stroke-width="1"/>

  <!-- Row 1 -->
  <text x="50" y="86" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Retrieval failures cascade</text>
  <!-- Severity bar -->
  <rect x="360" y="74" width="160" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="360" y="74" width="128" height="16" rx="4" fill="#96845A"/>
  <text x="580" y="88" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">Partially</text>

  <!-- Row 2 -->
  <text x="50" y="116" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Multi-doc reasoning</text>
  <rect x="360" y="104" width="160" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="360" y="104" width="144" height="16" rx="4" fill="#96845A"/>
  <text x="580" y="118" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#96845A">Hard</text>

  <!-- Row 3 -->
  <text x="50" y="146" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Chunking long docs</text>
  <rect x="360" y="134" width="160" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="360" y="134" width="96" height="16" rx="4" fill="#6B7C5E"/>
  <text x="580" y="148" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">Yes, with work</text>

  <!-- Row 4 -->
  <text x="50" y="176" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Model reasoning limits</text>
  <rect x="360" y="164" width="160" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="360" y="164" width="160" height="16" rx="4" fill="#96845A"/>
  <text x="580" y="178" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#96845A">No</text>

  <!-- Row 5 -->
  <text x="50" y="206" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Lost-in-the-middle</text>
  <rect x="360" y="194" width="160" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="360" y="194" width="112" height="16" rx="4" fill="#6B7C5E"/>
  <text x="580" y="208" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">Partially</text>

  <!-- Row 6 -->
  <text x="50" y="236" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Domain vocabulary gap</text>
  <rect x="360" y="224" width="160" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="360" y="224" width="80" height="16" rx="4" fill="#6B7C5E"/>
  <text x="580" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6B7C5E">Yes</text>

  <text x="340" y="264" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Severity bar = relative impact in production deployments</text>
</svg>

None of these are arguments against using RAG. They're arguments for building with eyes open.

The teams I've seen get burned are the ones who treated RAG as a magic solution that makes any LLM reliably factual. The teams that are satisfied with their RAG systems are the ones who built in evaluation loops, monitored retrieval quality separately from generation quality, and treated it as an ongoing system to tune rather than a one-time integration.

---

## How RAG Connects to the Broader AI Stack

<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;margin:2rem 0;">
  <!-- Background -->
  <rect width="680" height="260" fill="#F4F1EA" rx="12"/>
  <text x="340" y="30" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">RAG in the AI Stack - Dependencies</text>
  <!-- Central RAG node -->
  <rect x="270" y="100" width="140" height="50" rx="10" fill="#6B7C5E"/>
  <text x="340" y="121" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">RAG System</text>
  <text x="340" y="139" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#F4F1EA">retrieve + generate</text>
  <!-- Surrounding nodes -->
  <!-- Transformer -->
  <rect x="30" y="50" width="130" height="42" rx="8" fill="#DDD8CE"/>
  <text x="95" y="68" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#4A5942">Transformer</text>
  <text x="95" y="84" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">foundation model</text>
  <line x1="160" y1="71" x2="270" y2="115" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Embeddings -->
  <rect x="30" y="150" width="130" height="42" rx="8" fill="#DDD8CE"/>
  <text x="95" y="168" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#4A5942">Embeddings</text>
  <text x="95" y="184" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">semantic vectors</text>
  <line x1="160" y1="171" x2="270" y2="135" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Tokenization -->
  <rect x="520" y="50" width="130" height="42" rx="8" fill="#DDD8CE"/>
  <text x="585" y="68" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#4A5942">Tokenization</text>
  <text x="585" y="84" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">text splitting</text>
  <line x1="520" y1="71" x2="410" y2="115" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- LLM -->
  <rect x="520" y="150" width="130" height="42" rx="8" fill="#DDD8CE"/>
  <text x="585" y="168" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#4A5942">LLM</text>
  <text x="585" y="184" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">answer generation</text>
  <line x1="520" y1="171" x2="410" y2="135" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- AI Agents (above) -->
  <rect x="258" y="44" width="164" height="42" rx="8" fill="#96845A"/>
  <text x="340" y="62" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#F4F1EA">AI Agents</text>
  <text x="340" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#F4F1EA">use RAG as a tool</text>
  <line x1="340" y1="86" x2="340" y2="100" stroke="#96845A" stroke-width="1.5"/>
  <!-- Prompt Engineering (below) -->
  <rect x="240" y="170" width="200" height="42" rx="8" fill="#96845A"/>
  <text x="340" y="188" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#F4F1EA">Prompt Engineering</text>
  <text x="340" y="204" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#F4F1EA">structures retrieved context</text>
  <line x1="340" y1="170" x2="340" y2="150" stroke="#96845A" stroke-width="1.5"/>
  <!-- Caption -->
  <text x="340" y="240" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">RAG depends on and integrates with every major AI concept</text>
</svg>

**RAG doesn't exist in isolation - it sits in the middle of a larger ecosystem of AI components, and understanding those connections helps you build better systems and make better tooling decisions.**

The [transformer architecture](/blog/what-is-the-transformer-architecture) is the foundation that makes RAG possible. Both the LLM generating the answer and the embedding model doing retrieval are transformer-based models.

The embedding model maps text into a vector space where semantic similarity is geometrically meaningful - this is [embedding in AI](/blog/what-is-embedding-in-ai) in action.

The [tokenization](/blog/what-is-tokenization) process matters for RAG specifically because it determines how text gets split before embedding. Chunk boundaries that fall mid-sentence or mid-word can degrade embedding quality because the tokenizer's sense of meaning is disrupted.

[AI agents](/blog/what-is-an-ai-agent) often use RAG as one of their tools. An agent that can call a RAG retrieval step when it needs to look something up - alongside other tools like web search, code execution, or database queries - is significantly more capable than either alone. Tools like those in the [best AI agents 2026](/blog/best-ai-agents-2026) roundup are increasingly using this architecture. For a side-by-side on how agents and agentic AI differ in practice, the [AI agents vs agentic AI](/blog/ai-agents-vs-agentic-ai) piece is useful context.

[RLHF](/blog/what-is-rlhf) (Reinforcement Learning from Human Feedback) is less directly connected to RAG, but it shapes the generation model's instruction-following. A well-RLHF-trained model is better at following the RAG prompt's instruction to "answer only from the provided documents" - it's more reliably constrained to the retrieved context rather than falling back on its training data when the context is thin.

[Large language models](/blog/what-is-a-large-language-model) are the core reasoning component of every RAG system. The better the base model, the better it is at extracting the relevant answer from retrieved context, handling contradictions across chunks, and knowing when to say "I don't see the answer in these documents."

There's a reason so many tools in the [best AI writing tools](/best-of/best-ai-writing-tools) and [best free AI tools](/best-of/best-free-ai-tools) categories are quietly adding RAG under the hood. The pattern has matured enough that it's no longer an exotic architecture - it's the baseline expectation for any AI product that needs to be factually reliable.

For teams evaluating whether to build RAG themselves or buy a product with RAG built in, the [AI tools reality check study](/studies/2026-ai-tools-reality-check) has the most current data on how well different approaches actually perform. Our [tool comparison tool](/tools/compare) can also help you put specific products side by side if you're at the vendor selection stage.

---

## Frequently Asked Questions

**What does RAG stand for?**

RAG stands for Retrieval-Augmented Generation. The retrieval step pulls relevant documents, the augmentation step adds them to the model's context, and generation is what the LLM does with that enriched context.

**Do I need to fine-tune a model to use RAG?**

No. RAG works with any LLM through the standard API - Claude, GPT-5, Gemini, or open-source models like Llama. You don't modify the model at all.

You modify what goes into the prompt. This is one of the reasons RAG is appealing: you can swap the underlying model without rebuilding the retrieval system.

**What's a vector database and do I need one?**

A vector database stores embeddings (numerical representations of text) and enables fast similarity search across them. You need one for any RAG system of meaningful scale.

Common options include Pinecone, Weaviate, Qdrant, Chroma, and pgvector (for teams already on PostgreSQL). For very small document sets (under a few thousand chunks), you can skip the database and do brute-force similarity search in memory, but that doesn't scale.

**How is RAG different from giving the model a big system prompt with all your docs?**

Technically, stuffing all your documents into the context is a form of retrieval - just without the retrieval step. For small document sets that fit in the context window, it can work.

The problem is cost (you're paying for every token of documentation on every query) and context length (most document sets are too large to fit). RAG retrieves only the relevant 3-10 chunks per query, keeping context lean and costs manageable.

**Can RAG hallucinate?**

Yes, though less often than a bare LLM on factual questions. RAG can still hallucinate if the retrieved context contains incorrect information, if the model misreads the retrieved text, or if it generates beyond what the context supports. A well-designed system instructs the model to stay strictly within the retrieved context and decline to answer when the context is insufficient - but this requires careful prompt design, not just adding retrieval. See the [hallucination explainer](/blog/what-is-hallucination-in-ai) for the mechanics of why models confabulate even with context available.

**What embedding model should I use?**

For general English text, OpenAI's text-embedding-3-large and Cohere's Embed v3 are strong defaults. For multilingual content, consider models fine-tuned for multilingual embedding.

For domain-specific content (medical, legal, code), domain-fine-tuned embedding models improve retrieval quality noticeably. The embedding model matters more than most teams realize when setting up RAG for the first time.

**How do I evaluate if my RAG system is working?**

Separately track retrieval quality and generation quality. For retrieval: given a test set of queries with known relevant documents, what percentage of the time does your retriever return the right chunk in the top K results? For generation: given correct retrieved context, does the model produce an accurate answer? Most retrieval failures masquerade as generation failures. If you only measure final answer accuracy, you won't know where to fix things.

**Is RAG the same as web search in AI tools?**

It's the same pattern applied to a different data source. When [Perplexity](/review/perplexity) or a [ChatGPT](/blog/how-to-use-chatgpt-effectively) web-search mode retrieves web pages to answer a question, that's RAG with the public internet as the knowledge base.

Internal RAG uses your private documents instead. The architecture is identical; the data source differs.

**What about agentic RAG?**

Agentic RAG is RAG where the retrieval step is controlled by an [AI agent](/blog/what-is-an-ai-agent) rather than happening automatically on every query. The agent decides when to retrieve, what to query for, and whether to refine its retrieval based on what it gets back.

This enables more complex workflows - iterative retrieval, multi-hop reasoning, fallback to different data sources.

It's more powerful but also more complex to build and debug. The [best AI agents 2026](/blog/best-ai-agents-2026) post covers several tools that implement this pattern.

**How long does it take to build a basic RAG system?**

A working prototype for a reasonably well-structured document set - PDFs, markdown files, or web pages - takes a developer one to three days with modern frameworks like LangChain, LlamaIndex, or Haystack.

Getting from prototype to reliable production quality takes significantly longer: evaluation setup, chunking refinement, reranker integration, and monitoring can add weeks. Budget accordingly.

For teams that want a faster path, check the [tools quiz](/tools/quiz) for a recommendation based on your specific use case.
