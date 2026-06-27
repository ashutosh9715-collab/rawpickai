---
title: "What Is an AI Agent?"
description: "An AI agent is a system that perceives its environment, decides on actions, and executes them autonomously to complete multi-step goals. Full explainer."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-an-ai-agent"
author: "Ash"
---


An AI agent is software that perceives its environment, decides what to do next, and then acts - repeating that loop until a goal is complete, without a human approving every single step.

That one sentence took me about six months of hands-on use to actually internalize. I kept conflating agents with chatbots, kept treating them as the same category of thing with a fancier name. They are not the same category at all, and the difference matters practically every time you reach for one.

This guide explains what AI agents actually are, how they work under the hood, where they break, and how to choose one for real work. I'll pull from specific tests I ran in early 2026, including a head-to-head comparison that produced some results I did not expect.

---

## What Is an AI Agent?

An AI agent is a system built around three repeating operations: perceive the environment, decide on an action, and execute that action - then start again.

The word "agent" comes from Latin *agere*, to do. The core idea is that an agent does things in the world, rather than just responding to prompts. That's the conceptual fork. A chatbot answers your question. An agent writes code, runs it, reads the error, rewrites the code, runs it again, and keeps going until the tests pass.

The internal mechanism looks like this:

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="360" fill="#F4F1EA" rx="12"/>

  <!-- Title -->
  <text x="350" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#4A5942">The Perceive - Decide - Act Loop</text>

  <!-- Center circle: LLM Brain -->
  <circle cx="350" cy="190" r="58" fill="#6B7C5E" opacity="0.15" stroke="#6B7C5E" stroke-width="2"/>
  <text x="350" y="186" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">LLM</text>
  <text x="350" y="204" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Brain</text>

  <!-- Node: Perceive (top-left) -->
  <rect x="60" y="70" width="140" height="64" rx="12" fill="#6B7C5E" opacity="0.18" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="130" y="98" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Perceive</text>
  <text x="130" y="116" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Read files, web, APIs</text>

  <!-- Node: Decide (top-right) -->
  <rect x="500" y="70" width="140" height="64" rx="12" fill="#96845A" opacity="0.18" stroke="#96845A" stroke-width="1.5"/>
  <text x="570" y="98" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Decide</text>
  <text x="570" y="116" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Choose next action</text>

  <!-- Node: Act (bottom) -->
  <rect x="270" y="295" width="160" height="50" rx="12" fill="#6B7C5E" opacity="0.28" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="350" y="316" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Act</text>
  <text x="350" y="334" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Run code, call APIs, write</text>

  <!-- Arrows: Perceive -> LLM -->
  <line x1="200" y1="102" x2="293" y2="165" stroke="#6B7C5E" stroke-width="2" marker-end="url(#arr)"/>
  <!-- Arrows: LLM -> Decide -->
  <line x1="407" y1="165" x2="500" y2="102" stroke="#96845A" stroke-width="2" marker-end="url(#arr2)"/>
  <!-- Arrows: Act -> Perceive (loop back) -->
  <path d="M 270 312 Q 80 310 130 134" stroke="#8A8577" stroke-width="1.5" fill="none" stroke-dasharray="5,4" marker-end="url(#arr3)"/>
  <!-- Arrows: Decide -> Act -->
  <line x1="570" y1="134" x2="420" y2="290" stroke="#96845A" stroke-width="2" marker-end="url(#arr2)"/>
  <!-- Arrows: LLM -> Act -->
  <line x1="350" y1="248" x2="350" y2="295" stroke="#6B7C5E" stroke-width="2" marker-end="url(#arr)"/>

  <!-- Loop label -->
  <text x="46" y="240" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">loops until</text>
  <text x="46" y="253" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">goal reached</text>

  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#6B7C5E"/>
    </marker>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#96845A"/>
    </marker>
    <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#8A8577"/>
    </marker>
  </defs>
</svg>

The perceive step means the agent reads something: a file, a web page, an API response, the output of a terminal command it just ran. The decide step is where the [large language model](/blog/what-is-a-large-language-model) picks the next action from a menu of available tools. The act step executes it.

Then the whole loop restarts. The output of the action becomes new perception, which feeds into the next decision. This continues until the agent decides the goal is complete - or until it hits a limit you've set, like a maximum number of steps or a timeout.

The key word in that last sentence is "decides." The agent is the one calling that. Not you.

---

## How AI Agents Work

The technical mechanism that makes modern AI agents possible is called the ReAct loop - short for Reasoning and Acting - and it was introduced in a 2022 paper that most working engineers absorbed only after it became the default pattern inside basically every agent framework.

The idea is simple: the model interleaves reasoning traces with tool calls. Instead of just generating an answer, it generates a thought ("I need to check whether this API endpoint exists"), then takes an action (calls the endpoint), then observes the result ("got a 404"), then generates another thought ("the endpoint moved in v2, I'll try /v2/users"), then acts again. Each thought-action-observation triplet is a step.

What makes this work is [tool use](/blog/what-is-prompt-engineering) - the model has access to a set of functions it can call: search the web, read a file, write code, execute code, call an API. These tools are described to the model in its system prompt, usually as JSON schemas. The model outputs a structured tool call; your framework intercepts it, runs the function, and feeds the result back into context. The model never actually "runs" anything - it requests that things be run, and your infrastructure does the running.

The memory side is worth understanding too. A basic agent only has its context window - it "remembers" what's happened in the current session because each step appends to the prompt. For longer tasks, that fills up fast. More sophisticated agents have external memory: vector stores they can write to and query, something like what [retrieval-augmented generation](/blog/what-is-rag-retrieval-augmented-generation) does for documents. Some have access to a persistent database that survives between sessions.

[Tokenization](/blog/what-is-tokenization) shapes everything here in ways that aren't obvious until you hit them. Every tool result that gets appended to context costs tokens. A browser agent that reads five web pages before making a decision might consume 15,000 tokens just on context. That adds up financially, and it can push older or cheaper models past their effective reasoning window even if the raw context limit hasn't been reached.

One thing I got wrong early on: I assumed that a more capable base model automatically made a better agent. It doesn't, or at least not directly. A great agent framework with tight tool definitions and disciplined context management will outperform a stronger model running in a poorly designed agentic loop. The scaffolding matters as much as the model.

<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="260" fill="#F4F1EA" rx="12"/>
  <text x="350" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">The ReAct Loop - One Agent Step</text>

  <!-- Step boxes along a timeline -->
  <!-- Step 1: Thought -->
  <rect x="30" y="60" width="118" height="70" rx="10" fill="#6B7C5E" opacity="0.18" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="89" y="88" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">1. Thought</text>
  <text x="89" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Model reasons</text>
  <text x="89" y="120" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">about next step</text>

  <!-- Arrow -->
  <line x1="148" y1="95" x2="176" y2="95" stroke="#DDD8CE" stroke-width="2" marker-end="url(#ra1)"/>

  <!-- Step 2: Action -->
  <rect x="176" y="60" width="118" height="70" rx="10" fill="#96845A" opacity="0.18" stroke="#96845A" stroke-width="1.5"/>
  <text x="235" y="88" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">2. Action</text>
  <text x="235" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Calls a tool</text>
  <text x="235" y="120" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">(search, run code)</text>

  <!-- Arrow -->
  <line x1="294" y1="95" x2="322" y2="95" stroke="#DDD8CE" stroke-width="2" marker-end="url(#ra1)"/>

  <!-- Step 3: Observe -->
  <rect x="322" y="60" width="118" height="70" rx="10" fill="#6B7C5E" opacity="0.18" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="381" y="88" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">3. Observe</text>
  <text x="381" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Tool result added</text>
  <text x="381" y="120" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">back to context</text>

  <!-- Arrow -->
  <line x1="440" y1="95" x2="468" y2="95" stroke="#DDD8CE" stroke-width="2" marker-end="url(#ra1)"/>

  <!-- Step 4: Decide -->
  <rect x="468" y="60" width="118" height="70" rx="10" fill="#96845A" opacity="0.18" stroke="#96845A" stroke-width="1.5"/>
  <text x="527" y="88" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">4. Decide</text>
  <text x="527" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Done or next</text>
  <text x="527" y="120" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">thought needed?</text>

  <!-- Arrow to repeat -->
  <line x1="586" y1="95" x2="614" y2="95" stroke="#DDD8CE" stroke-width="2" marker-end="url(#ra1)"/>

  <!-- Final: Repeat or End -->
  <rect x="614" y="70" width="68" height="50" rx="10" fill="#6B7C5E" opacity="0.30" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="648" y="92" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">Repeat</text>
  <text x="648" y="108" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">or stop</text>

  <!-- Loop-back arrow under the boxes -->
  <path d="M 648 120 Q 648 200 89 200 Q 40 200 40 130" stroke="#8A8577" stroke-width="1.5" fill="none" stroke-dasharray="5,4" marker-end="url(#ra3)"/>
  <text x="350" y="220" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Loop repeats until goal is met or step limit reached</text>

  <defs>
    <marker id="ra1" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#DDD8CE"/>
    </marker>
    <marker id="ra3" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L7,3 z" fill="#8A8577"/>
    </marker>
  </defs>
</svg>

---

## AI Agent vs AI Chatbot - The Key Difference

The single most important distinction between an AI agent and an AI chatbot is whether the system takes actions or only generates text.

A chatbot - even a very capable one - sits inside a single turn. You type something, it replies, the turn ends. It cannot do anything that persists in the world. It cannot send an email, modify a file, run a test suite, or browse a URL to check whether something changed. It generates text that describes those things, which you then go and do.

An agent crosses that boundary. It can take an action that changes the state of something external.

Here's a concrete illustration from my own work. I needed to audit 23 competitor product pages for pricing information. The chatbot path: I manually copy-paste each URL into ChatGPT, ask it to extract the pricing, wait for each response, and compile results myself. Total time: probably 90 minutes.

The agent path: I describe the task in natural language, specify the output format I want, and set it running. The agent browses each URL autonomously, extracts the data, handles cases where the page has a different structure, and writes the results to a spreadsheet. Total human time: maybe eight minutes of setup plus a review pass.

That's the practical gap. It's not about intelligence - the underlying [LLM](/blog/what-is-a-large-language-model) powering both might be identical. It's about whether the loop between perception and action runs inside the model's context or out in the actual world.

<svg viewBox="0 0 700 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="290" fill="#F4F1EA" rx="12"/>
  <text x="350" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#4A5942">Chatbot vs Agent - Key Differences</text>

  <!-- Headers -->
  <rect x="40" y="55" width="290" height="36" rx="8" fill="#6B7C5E" opacity="0.2"/>
  <text x="185" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">AI Chatbot</text>
  <rect x="370" y="55" width="290" height="36" rx="8" fill="#96845A" opacity="0.2"/>
  <text x="515" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">AI Agent</text>

  <!-- Row labels -->
  <text x="28" y="118" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Actions</text>
  <text x="28" y="158" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Memory</text>
  <text x="28" y="198" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Loop</text>
  <text x="28" y="238" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Output</text>

  <!-- Divider lines -->
  <line x1="40" y1="100" x2="660" y2="100" stroke="#DDD8CE" stroke-width="1"/>
  <line x1="40" y1="140" x2="660" y2="140" stroke="#DDD8CE" stroke-width="1"/>
  <line x1="40" y1="180" x2="660" y2="180" stroke="#DDD8CE" stroke-width="1"/>
  <line x1="40" y1="220" x2="660" y2="220" stroke="#DDD8CE" stroke-width="1"/>
  <line x1="355" y1="100" x2="355" y2="260" stroke="#DDD8CE" stroke-width="1"/>

  <!-- Chatbot column -->
  <text x="185" y="118" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">Generates text only</text>
  <text x="185" y="158" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">Single context window</text>
  <text x="185" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">One turn, then stops</text>
  <text x="185" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">A response to read</text>

  <!-- Agent column -->
  <text x="515" y="118" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">Calls tools, runs code</text>
  <text x="515" y="158" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">External + in-context</text>
  <text x="515" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">Loops until goal met</text>
  <text x="515" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">State changed in world</text>

  <line x1="40" y1="260" x2="660" y2="260" stroke="#DDD8CE" stroke-width="1"/>
</svg>

One nuance worth holding: "agentic" has become a marketing adjective that gets slapped on tools that aren't really autonomous in any meaningful sense. A chatbot that can search the web via one built-in function isn't the same as a full agent loop. See my longer breakdown in [AI agents vs agentic AI](/blog/ai-agents-vs-agentic-ai) if that distinction matters for your evaluation.

---

## Types of AI Agents in 2026

In 2026, AI agents fall into roughly four categories defined by what environment they operate in and what tools they have access to.

This is a taxonomy I built through hands-on testing across the [best AI agents of 2026](/blog/best-ai-agents-2026), not from vendor marketing - which tends to lump everything together in ways that obscure real capability differences.

**Coding agents** operate inside a development environment. They read code, write code, run terminals, execute tests, read error output, and loop until the code works. The best ones - Claude Code, Cursor's Composer, Devin - can complete multi-step engineering tasks like "add authentication to this Express app and write the tests" with minimal interruption. [Claude Code vs Cursor](/blog/claude-code-vs-cursor-3) covers how these compare on real tasks. Coding agents are the most mature category right now; the toolset is well-defined and the feedback loop (does the code run or not?) makes it easier to catch and correct errors.

**Browser agents** control a web browser: navigate to URLs, click buttons, fill forms, extract text, and react to what they see. The use cases include competitive research, form submission at scale, data extraction from sites without APIs, and QA testing of web apps. They work well and are increasingly production-ready, but they're also the most brittle - a website redesign can break an agent workflow overnight.

**Research agents** combine web search, document reading, and synthesis to answer complex questions. [Perplexity](/review/perplexity) has pioneered this space commercially. The better ones use something like [RAG](/blog/what-is-rag-retrieval-augmented-generation) internally to handle document-heavy tasks: they retrieve relevant chunks rather than shoving entire documents into context. I find research agents most useful for initial broad scans and competitor monitoring; I still do my own synthesis before acting on conclusions they generate.

**Orchestrator agents** coordinate other agents. Instead of one agent doing everything, an orchestrator breaks a goal into sub-tasks, dispatches them to specialist sub-agents, and assembles the results. This is where multi-agent frameworks like LangGraph and AutoGen live. It's also where things get complex fast - debugging a failure inside a three-level agent hierarchy is not fun.

<svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="320" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#4A5942">Four Agent Categories in 2026</text>

  <!-- Coding Agent -->
  <rect x="40" y="56" width="290" height="108" rx="12" fill="#6B7C5E" opacity="0.13" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="185" y="80" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Coding Agents</text>
  <text x="60" y="100" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Tools: terminal, editor, test runner</text>
  <text x="60" y="118" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Examples: Claude Code, Cursor</text>
  <text x="60" y="136" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Maturity: high</text>
  <text x="60" y="154" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Feedback loop: pass/fail tests</text>

  <!-- Browser Agent -->
  <rect x="370" y="56" width="290" height="108" rx="12" fill="#96845A" opacity="0.13" stroke="#96845A" stroke-width="1.5"/>
  <text x="515" y="80" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Browser Agents</text>
  <text x="390" y="100" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Tools: navigate, click, extract</text>
  <text x="390" y="118" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Examples: Operator, Browser Use</text>
  <text x="390" y="136" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Maturity: medium</text>
  <text x="390" y="154" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Risk: brittle on UI changes</text>

  <!-- Research Agent -->
  <rect x="40" y="186" width="290" height="108" rx="12" fill="#6B7C5E" opacity="0.13" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="185" y="210" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Research Agents</text>
  <text x="60" y="230" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Tools: search, read docs, RAG</text>
  <text x="60" y="248" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Examples: Perplexity, Gemini</text>
  <text x="60" y="266" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Maturity: medium-high</text>
  <text x="60" y="284" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Risk: hallucination chains</text>

  <!-- Orchestrator Agent -->
  <rect x="370" y="186" width="290" height="108" rx="12" fill="#96845A" opacity="0.13" stroke="#96845A" stroke-width="1.5"/>
  <text x="515" y="210" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">Orchestrators</text>
  <text x="390" y="230" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Tools: spawn sub-agents</text>
  <text x="390" y="248" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Examples: LangGraph, AutoGen</text>
  <text x="390" y="266" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Maturity: early</text>
  <text x="390" y="284" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Risk: complex debugging</text>
</svg>

There's a fifth emerging category worth flagging: voice agents, which run this loop in near-real-time over audio. They're interesting and early-stage enough that I'm watching rather than recommending yet.

If you want to explore the tools in each category, the [best AI coding tools roundup](/blog/best-ai-coding-tools-2026) covers the coding space thoroughly, and [best AI code assistants](/best-of/best-ai-code-assistants) breaks it down by use case.

---

## I Ran 4 AI Agents on the Same Task - Here's What Happened

The task was specific: starting from a blank directory, build a working REST API with three endpoints, a SQLite database, basic auth middleware, and a passing test suite. No scaffolding provided. Go.

I ran this in February 2026 across Claude Code, Cursor Composer 2.5, GitHub Copilot Workspace, and a LangChain-based custom agent I'd built over the previous two months. Same prompt, same machine, same starting conditions. I timed each run and graded output on three criteria: does it run without modification, do the tests pass, and is the auth actually secure (I checked for the most common JWT rotation bug).

**Claude Code** finished in 11 minutes. All three endpoints worked. Tests passed. The JWT implementation was complete, including refresh token rotation handled via a short-lived blacklist in SQLite - which was the specific thing I was testing for, because most implementations skip it. This was the outcome I was least expecting given that Claude Code was the one I'd used least going into the test.

**Cursor Composer 2.5** finished in 14 minutes. Endpoints worked. Tests passed. JWT refresh token rotation was absent - exactly the gap I'd seen in my earlier [Composer 2.5 review](/blog/composer-2-5-review). One additional pass with explicit instruction about the rotation edge case fixed it. Quality of the application logic was excellent; the auth hole is a known pattern at this point, not a surprise.

**GitHub Copilot Workspace** hit a wall at the 22-minute mark when it lost track of the database schema between the model definition step and the migration step. It created the SQLite table with one column name and wrote queries using a different column name. The tests it generated were testing against the wrong column and passing despite the mismatch - which is arguably worse than failing loudly. I had to restart and be significantly more prescriptive in the initial prompt to get a clean run.

**My custom LangChain agent** was the most interesting result. It completed the task in 31 minutes, which sounds worse, but it also generated the most extensive test coverage of the four - 23 tests vs Claude Code's 9. The difference was that I'd wired it to an evaluation loop that ran the tests after each major step and generated new tests to fill gaps. It was slower and cost more per run, but the output was more production-ready than any of the off-the-shelf options.

The conclusion I drew from this - and I was flat-out wrong about this before running it - is that "agent quality" is not a single axis. Claude Code wins on speed and correctness-out-of-the-box. My custom agent wins on test coverage and production readiness. Composer 2.5 wins on overall code quality for the non-auth portions. The right choice depends on what you're optimizing for, not on a single benchmark score.

I've kept a record of all four outputs in the [2026 AI tools reality check study](/studies/2026-ai-tools-reality-check) if you want to see the raw task outputs. That study also includes the exact prompts I used.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">4-Agent REST API Test Results</text>

  <!-- Column headers -->
  <text x="175" y="58" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Agent</text>
  <text x="330" y="58" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Time</text>
  <text x="450" y="58" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Tests</text>
  <text x="580" y="58" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Auth Secure?</text>

  <line x1="40" y1="66" x2="660" y2="66" stroke="#DDD8CE" stroke-width="1"/>

  <!-- Row 1: Claude Code -->
  <rect x="40" y="72" width="620" height="46" rx="6" fill="#6B7C5E" opacity="0.10"/>
  <text x="175" y="100" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Claude Code</text>
  <text x="330" y="100" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">11 min</text>
  <text x="450" y="100" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">9 (all pass)</text>
  <text x="580" y="100" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#6B7C5E" font-weight="700">Yes</text>

  <!-- Row 2: Composer 2.5 -->
  <rect x="40" y="122" width="620" height="46" rx="6" fill="#96845A" opacity="0.08"/>
  <text x="175" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Composer 2.5</text>
  <text x="330" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">14 min</text>
  <text x="450" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">11 (all pass)</text>
  <text x="580" y="150" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#96845A" font-weight="700">Partial</text>

  <!-- Row 3: Copilot Workspace -->
  <rect x="40" y="172" width="620" height="46" rx="6" fill="#6B7C5E" opacity="0.10"/>
  <text x="175" y="192" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Copilot</text>
  <text x="175" y="208" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Workspace</text>
  <text x="330" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">22 min+</text>
  <text x="450" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">Silent fail</text>
  <text x="580" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#96845A" font-weight="700">No</text>

  <!-- Row 4: Custom LangChain -->
  <rect x="40" y="222" width="620" height="46" rx="6" fill="#96845A" opacity="0.08"/>
  <text x="175" y="242" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Custom</text>
  <text x="175" y="258" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">LangChain</text>
  <text x="330" y="250" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">31 min</text>
  <text x="450" y="250" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#3A3228">23 (all pass)</text>
  <text x="580" y="250" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="#6B7C5E" font-weight="700">Yes</text>

  <text x="350" y="285" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">February 2026 - same prompt, same machine, same pass/fail criteria</text>
</svg>

---

## When AI Agents Go Wrong

The most predictable failure mode in AI agents is the hallucination chain - where a small incorrect assumption in step 3 propagates forward and gets amplified through steps 4, 5, and 6 until the agent has confidently built something entirely wrong.

This is different from a chatbot [hallucinating](/blog/what-is-hallucination-in-ai). When a chatbot makes something up, you read it, catch it, and correct it. When an agent hallucinates in step 3 of a 15-step workflow, it doesn't pause and show you the mistake. It acts on it. By step 8, the mistake has been built into the architecture. By step 12, there are four files that depend on the wrong assumption. The agent may still be confidently reporting progress.

I saw this happen during a research agent run in March 2026. I asked the agent to compile a comparison table of API pricing for six developer tools, pulling from their official documentation. In step 2, it read a cached version of one provider's pricing page that was eight months out of date. It noted this internally ("pricing page last updated October 2025") and then... continued using the data anyway, because nothing in my prompt told it to reject stale sources.

By the end of the run, the table was technically accurate for five of the six tools and confidently wrong for the sixth. I only caught it because I happened to know that one provider had repriced in January 2026. If I hadn't known that, the wrong number would have gone into my report.

<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="300" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#4A5942">Common Agent Failure Modes</text>

  <!-- Failure 1: Hallucination Chain -->
  <rect x="40" y="55" width="185" height="210" rx="12" fill="#6B7C5E" opacity="0.1" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="132" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Hallucination</text>
  <text x="132" y="94" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Chain</text>
  <text x="57" y="116" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Wrong fact in step 3</text>
  <text x="57" y="132" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">built into step 5</text>
  <text x="57" y="148" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">depended on in step 8</text>
  <text x="57" y="172" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Fix: checkpoints +</text>
  <text x="57" y="186" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">intermediate review</text>

  <!-- Failure 2: Tool Loop -->
  <rect x="257" y="55" width="185" height="210" rx="12" fill="#96845A" opacity="0.1" stroke="#96845A" stroke-width="1.5"/>
  <text x="350" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Infinite Tool</text>
  <text x="350" y="94" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Loop</text>
  <text x="274" y="116" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Agent retries same</text>
  <text x="274" y="132" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">failing action forever</text>
  <text x="274" y="148" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">burns tokens + budget</text>
  <text x="274" y="172" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Fix: max-step limits</text>
  <text x="274" y="186" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">and error escalation</text>

  <!-- Failure 3: Scope Creep -->
  <rect x="474" y="55" width="185" height="210" rx="12" fill="#6B7C5E" opacity="0.1" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="567" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Scope Creep</text>
  <text x="491" y="110" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Agent "helpfully"</text>
  <text x="491" y="126" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">refactors extra files</text>
  <text x="491" y="142" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">you didn't ask for</text>
  <text x="491" y="166" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Fix: scoped permissions</text>
  <text x="491" y="182" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">+ clear task bounds</text>

  <text x="350" y="285" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">All three improve dramatically with human checkpoints every 5-7 steps</text>
</svg>

The second failure mode is the infinite tool loop. An agent gets stuck trying the same action repeatedly because it keeps getting the same error and doesn't know how to change strategies. Without a max-step limit, it will keep going until it hits a rate limit, an API timeout, or your monthly budget cap. I've seen this burn $40 in API costs on a task that should have cost $0.30.

The third failure mode is more subtle: scope creep. A coding agent, asked to fix one bug, decides to "helpfully" refactor three related functions while it's in the neighborhood. The refactors might even be correct. But they're unreviewed changes to production code that you didn't ask for, didn't expect, and might not notice until they cause a problem downstream.

The common mitigation across all three: add human checkpoints. At every meaningful waypoint in a long agent task - after each major phase, before any destructive action - require the agent to surface what it's done and ask for confirmation before continuing. This destroys the speed advantage of full autonomy, but it dramatically reduces the blast radius when things go sideways.

For the hallucination problem specifically, [RLHF](/blog/what-is-rlhf) training has improved model behavior over time, and [fine-tuned](/blog/what-is-fine-tuning-in-ai) models on domain-specific tasks are more reliable than general-purpose ones. But no amount of training eliminates the risk entirely - any agent operating in the real world will eventually get something wrong.

---

## How to Pick the Right AI Agent for Your Work

The right framework for choosing an AI agent starts with one question: how bad is an undetected mistake?

If a mistake is caught immediately - the code either runs or it doesn't, the test either passes or it fails - you can tolerate a higher autonomy level and a less conservative agent setup. Coding agents with tight test suites are a good fit here.

If a mistake could propagate silently - a wrong number in a research report, an incorrect draft that gets sent - you want human checkpoints at every meaningful step, and you want to be running agents with verified-source tools rather than open-ended web access.

Here's the decision framework I use:

**For coding tasks:** Start with [Claude Code](/blog/claude-code-vs-cursor-3) or Cursor's [Composer 2.5](/blog/composer-2-5-review). Both are mature, well-tooled, and have established track records on multi-step engineering tasks. If you're deep in a specific editor, let that guide the choice. Check [best AI code assistants](/best-of/best-ai-code-assistants) for the full comparison.

**For research and synthesis:** Start with Perplexity for quick factual lookups. For deeper multi-source synthesis, a [Claude](/blog/claude-opus-4-7-review) or [GPT-based agent](/blog/how-to-use-chatgpt-effectively) with web access and explicit source verification steps is more reliable. Always verify any number or date the agent produces.

**For browser automation:** Expect brittleness. Start with a small-scope pilot before committing to a full workflow. UI changes will break your agent; build in monitoring.

**For orchestrated multi-agent tasks:** Only go here if you've already hit the ceiling of single-agent approaches. Multi-agent complexity is real and debugging is hard. Most tasks that feel like they need five agents can actually be completed by one agent with a better-structured prompt.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="340" fill="#F4F1EA" rx="12"/>
  <text x="350" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#4A5942">Agent Selection: Risk vs Autonomy</text>

  <!-- Y axis label -->
  <text x="22" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577" writing-mode="vertical-lr">Risk of Silent Error</text>

  <!-- X axis label -->
  <text x="400" y="320" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#8A8577">Autonomy Level</text>

  <!-- Axes -->
  <line x1="70" y1="60" x2="70" y2="290" stroke="#DDD8CE" stroke-width="2"/>
  <line x1="70" y1="290" x2="660" y2="290" stroke="#DDD8CE" stroke-width="2"/>

  <!-- Axis tick labels Y -->
  <text x="60" y="100" text-anchor="end" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">High</text>
  <text x="60" y="200" text-anchor="end" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Med</text>
  <text x="60" y="285" text-anchor="end" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Low</text>

  <!-- Axis tick labels X -->
  <text x="120" y="305" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Manual</text>
  <text x="280" y="305" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Assisted</text>
  <text x="450" y="305" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Semi-auto</text>
  <text x="610" y="305" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Full auto</text>

  <!-- Quadrant zones -->
  <!-- Top-left: high risk, low auto = chatbot + human review -->
  <rect x="75" y="65" width="280" height="105" rx="8" fill="#96845A" opacity="0.12"/>
  <text x="215" y="110" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Research + Finance</text>
  <text x="215" y="128" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Use checkpoints every step</text>

  <!-- Top-right: high risk, high auto = danger zone -->
  <rect x="375" y="65" width="280" height="105" rx="8" fill="#96845A" opacity="0.22"/>
  <text x="515" y="106" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Danger Zone</text>
  <text x="515" y="124" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">High risk + high auto</text>
  <text x="515" y="140" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">avoid until error-proofed</text>

  <!-- Bottom-left: low risk, low auto = unnecessary -->
  <rect x="75" y="185" width="280" height="95" rx="8" fill="#6B7C5E" opacity="0.08"/>
  <text x="215" y="228" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Over-cautious</text>
  <text x="215" y="246" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Low risk - can automate more</text>

  <!-- Bottom-right: low risk, high auto = sweet spot -->
  <rect x="375" y="185" width="280" height="95" rx="8" fill="#6B7C5E" opacity="0.22"/>
  <text x="515" y="228" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Sweet Spot</text>
  <text x="515" y="246" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Coding agents + test suites</text>
  <text x="515" y="262" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Low risk + verifiable output</text>
</svg>

A few other signals that help me choose:

If the task has a clear, machine-verifiable success condition (tests pass, linter is clean, the API returns 200), agents can run at high autonomy. If success is fuzzy ("the email sounds professional"), keep a human in the loop.

If the task touches production systems or external services, require explicit confirmation before any write or send action. The agent should read and plan autonomously, but act only with approval.

If you're new to a particular agent tool, start with a contained throwaway task rather than something real. I've used the [tools quiz](/tools/quiz) on this site to get initial recommendations, and the [compare tool](/tools/compare) to diff specific options head-to-head.

The underlying [transformer architecture](/blog/what-is-the-transformer-architecture) and [embedding](/blog/what-is-embedding-in-ai) systems that power agents have improved significantly, but the gap between capability and reliability in real-world tasks is still meaningful. The agents that work best in production are the ones with the most human judgment in the design of the loop, not the most autonomy in the execution of it.

For the most current roundup of what's actually worth using right now, the [best AI agents 2026](/blog/best-ai-agents-2026) list is where I keep my live recommendations. And if you're deciding between [AI chatbot alternatives](/best-of/best-chatgpt-alternatives) and full agent systems for your workflow, that comparison is worth reading before committing to a stack.

---

## Frequently Asked Questions

**What is the difference between an AI agent and a bot?**

A traditional bot follows a fixed script - if the user says X, do Y. An AI agent uses a language model to reason about what to do next, which means it can handle situations its developers didn't explicitly anticipate. The agent's behavior emerges from the model's reasoning, not from hardcoded rules. This makes agents more flexible but also less predictable than rule-based bots.

**Do AI agents need an internet connection?**

It depends on the tools the agent has access to. A coding agent running locally can operate entirely offline - it reads files, writes code, and runs tests on your machine. A research agent or browser agent needs internet access to do its job. Some agents have both local and web-based tools and decide which to use depending on the task.

**Are AI agents safe to use for sensitive work?**

With proper guardrails, yes - but the guardrails matter enormously. You should understand what tools your agent has access to, what data it can read and write, and whether it can take actions (like sending emails or making API calls) without confirmation. Most enterprise-grade agent platforms let you restrict permissions at a granular level. For sensitive tasks, I always require explicit human approval before any external action.

**How much do AI agents cost to run?**

Cost varies widely based on the model powering the agent, how many steps the task requires, and how much context is in each step. A simple 5-step coding task with a mid-tier model might cost $0.05. A complex 50-step research task using a top-tier model with long context windows can run $3-10. The biggest cost surprises come from loops that go longer than expected - always set step limits and budget caps when you're getting started.

**What programming languages do AI coding agents support?**

The major coding agents (Claude Code, Cursor Composer, GitHub Copilot Workspace) support every widely-used language. Python, TypeScript, JavaScript, Go, Rust, Java, Ruby, PHP - all covered. Where quality starts to differ is on niche languages and very domain-specific frameworks. For mainstream web and backend work, language support is not a meaningful differentiator.

**Can an AI agent replace a human developer?**

For well-scoped, clearly-specified tasks with verifiable outcomes, agents can complete them start to finish with minimal human input. For tasks involving ambiguous requirements, significant judgment calls, stakeholder communication, or architectural decisions that depend on organizational context, humans remain essential. The realistic 2026 picture is that agents handle a growing portion of implementation work, and developers spend more time on specification, review, and the tasks that require genuine understanding of business goals.

**What's the best AI agent for beginners?**

If you're a developer, Claude Code or Cursor's Composer are the most accessible starting points - they're integrated into development workflows you already have. If you're not a developer, Perplexity's research agent is the most approachable: low setup, immediate utility, and forgiving when your prompts aren't precise. Use the [tools quiz](/tools/quiz) to get a tailored recommendation based on your use case.

**How is an AI agent different from a workflow automation tool like Zapier?**

Zapier and similar tools connect predefined triggers to predefined actions - rigid pipelines you design in advance. An AI agent uses reasoning to decide which actions to take based on what it observes, which means it can handle situations that weren't anticipated at design time. The trade-off is that Zapier-style tools are highly reliable and easy to audit; agent workflows are more flexible but less predictable. For stable, repeating processes, workflow automation is often the better choice. For tasks with variability and judgment calls, agents add genuine value.

**What is a multi-agent system?**

A multi-agent system uses several agents working in coordination - typically an orchestrator agent that breaks down a goal and delegates sub-tasks to specialist agents. One agent might handle research, another handles writing, a third handles fact-checking. The orchestrator assembles the outputs. These systems are more powerful than single agents on complex goals but significantly harder to debug and monitor. For most teams, a single well-configured agent is a better starting point than a multi-agent architecture.

**Where can I read Anthropic's and OpenAI's official documentation on agents?**

Anthropic has published their agents overview at [anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents), which covers the patterns and tradeoffs in detail. OpenAI's agents documentation is at [platform.openai.com/docs/guides/agents](https://platform.openai.com/docs/guides/agents). Both are worth reading if you're building rather than just using agents - the mental models transfer across frameworks.
