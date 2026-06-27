---
title: "What Is the Model Context Protocol (MCP)?"
description: "MCP is an open standard by Anthropic that lets AI models connect to external tools, data sources, and services through a unified protocol."
publishDate: "2026-06-24"
category: "AI Concepts"
lastUpdated: "2026-06-24"
slug: "/learn/what-is-mcp"
author: "Ash"
---


If you follow AI tooling closely, you've probably heard "MCP" thrown around a lot lately. I spent several weeks testing it hands-on before writing this - running local MCP servers, wiring Claude Desktop up to GitHub and a local filesystem, and watching exactly where things clicked and where they fell apart.

This article is my attempt to explain what MCP actually is, why it exists, and who should pay close attention to it in 2026.

---

## What Is the Model Context Protocol?

The Model Context Protocol (MCP) is an open standard developed by Anthropic that defines a uniform way for AI models to connect with external tools, data sources, and services. Instead of each AI application building its own one-off connectors to every external system, MCP gives developers a shared "language" that any compliant host and server can speak.

Think of it like USB-C for AI integrations. Before a universal port standard, every device had its own proprietary cable. MCP is trying to do the same thing for AI - create one connector type that works everywhere.

The protocol was [announced by Anthropic](https://www.anthropic.com/news/model-context-protocol) in late 2024 and has been gaining traction through 2025 and into 2026. It is fully open-source, and you can explore the full spec at [modelcontextprotocol.io](https://modelcontextprotocol.io).

MCP sits in a category of infrastructure that most end-users never see directly. But if you care about [what AI agents can actually do](/blog/what-is-an-ai-agent), understanding MCP is now table stakes.

<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MCP as a universal connector between AI hosts and external services" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="280" rx="12" fill="#F4F1EA"/>
  <!-- Title -->
  <text x="340" y="36" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">MCP: One Protocol, Many Connections</text>
  <!-- Center node: AI Host -->
  <rect x="270" y="100" width="140" height="56" rx="10" fill="#6B7C5E"/>
  <text x="340" y="124" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA" text-anchor="middle">AI Host</text>
  <text x="340" y="143" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">(Claude Desktop, etc.)</text>
  <!-- Left nodes -->
  <rect x="40" y="68" width="130" height="44" rx="8" fill="#96845A"/>
  <text x="105" y="87" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">GitHub Server</text>
  <text x="105" y="103" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">MCP-compliant</text>
  <rect x="40" y="128" width="130" height="44" rx="8" fill="#96845A"/>
  <text x="105" y="147" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Filesystem Server</text>
  <text x="105" y="163" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">MCP-compliant</text>
  <rect x="40" y="188" width="130" height="44" rx="8" fill="#96845A"/>
  <text x="105" y="207" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Slack Server</text>
  <text x="105" y="223" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">MCP-compliant</text>
  <!-- Right nodes -->
  <rect x="510" y="68" width="130" height="44" rx="8" fill="#6B7C5E" fill-opacity="0.7"/>
  <text x="575" y="87" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Database Server</text>
  <text x="575" y="103" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">MCP-compliant</text>
  <rect x="510" y="128" width="130" height="44" rx="8" fill="#6B7C5E" fill-opacity="0.7"/>
  <text x="575" y="147" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Search Server</text>
  <text x="575" y="163" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">MCP-compliant</text>
  <rect x="510" y="188" width="130" height="44" rx="8" fill="#6B7C5E" fill-opacity="0.7"/>
  <text x="575" y="207" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Custom APIs</text>
  <text x="575" y="223" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">MCP-compliant</text>
  <!-- Connecting lines left -->
  <line x1="170" y1="90" x2="270" y2="118" stroke="#DDD8CE" stroke-width="2"/>
  <line x1="170" y1="150" x2="270" y2="128" stroke="#DDD8CE" stroke-width="2"/>
  <line x1="170" y1="210" x2="270" y2="145" stroke="#DDD8CE" stroke-width="2"/>
  <!-- Connecting lines right -->
  <line x1="410" y1="118" x2="510" y2="90" stroke="#DDD8CE" stroke-width="2"/>
  <line x1="410" y1="128" x2="510" y2="150" stroke="#DDD8CE" stroke-width="2"/>
  <line x1="410" y1="145" x2="510" y2="210" stroke="#DDD8CE" stroke-width="2"/>
  <!-- Protocol label -->
  <text x="340" y="250" font-family="system-ui, sans-serif" font-size="11" fill="#8A8577" text-anchor="middle">All connections use the same MCP protocol</text>
</svg>

The diagram above captures the core insight: once you have an MCP-compliant host, every compliant server just works. You do not rebuild the integration logic for each tool.

---

## Why MCP Exists - The Problem Before It

Before MCP, every AI application that wanted to talk to an external service had to build its own custom connector. A team building an AI coding assistant that needed GitHub access, Jira access, and a local filesystem connector had to write three completely separate integrations - each with its own authentication handling, data formatting, error logic, and maintenance burden.

Multiply that across dozens of AI products and dozens of external services, and you get an explosion of redundant work.

I ran into this personally when I was experimenting with GPT-4 function calling in early 2024. To get the model to read files, search the web, and call a custom API, I had to write separate schema definitions, separate parsing logic, and separate error handlers for each. And none of it was reusable across different AI backends - if I switched from GPT to Claude, I rewrote everything.

MCP solves this by standardizing the integration layer. The pattern is similar to what [RAG did for document retrieval](/blog/what-is-rag-retrieval-augmented-generation): instead of everyone inventing their own approach, a shared architecture emerges that the whole ecosystem can build on.

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Before and after comparison: custom integrations vs MCP" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="320" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Before MCP vs After MCP</text>
  <!-- BEFORE column -->
  <text x="170" y="62" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#96845A" text-anchor="middle">Before MCP</text>
  <rect x="30" y="74" width="280" height="210" rx="8" fill="#DDD8CE" fill-opacity="0.5"/>
  <!-- AI app boxes -->
  <rect x="50" y="88" width="80" height="32" rx="6" fill="#96845A"/>
  <text x="90" y="109" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">AI App A</text>
  <rect x="50" y="148" width="80" height="32" rx="6" fill="#96845A"/>
  <text x="90" y="169" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">AI App B</text>
  <rect x="50" y="208" width="80" height="32" rx="6" fill="#96845A"/>
  <text x="90" y="229" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">AI App C</text>
  <!-- Service boxes -->
  <rect x="220" y="88" width="72" height="32" rx="6" fill="#8A8577"/>
  <text x="256" y="109" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">GitHub</text>
  <rect x="220" y="148" width="72" height="32" rx="6" fill="#8A8577"/>
  <text x="256" y="169" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">Slack</text>
  <rect x="220" y="208" width="72" height="32" rx="6" fill="#8A8577"/>
  <text x="256" y="229" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">DB</text>
  <!-- Tangled lines before -->
  <line x1="130" y1="104" x2="220" y2="104" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="104" x2="220" y2="164" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="104" x2="220" y2="224" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="164" x2="220" y2="104" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="164" x2="220" y2="164" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="164" x2="220" y2="224" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="224" x2="220" y2="104" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="224" x2="220" y2="164" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="130" y1="224" x2="220" y2="224" stroke="#96845A" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="170" y="292" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">9 custom integrations</text>
  <!-- AFTER column -->
  <text x="510" y="62" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#6B7C5E" text-anchor="middle">After MCP</text>
  <rect x="370" y="74" width="280" height="210" rx="8" fill="#DDD8CE" fill-opacity="0.5"/>
  <!-- AI apps -->
  <rect x="390" y="88" width="80" height="32" rx="6" fill="#6B7C5E"/>
  <text x="430" y="109" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">AI App A</text>
  <rect x="390" y="148" width="80" height="32" rx="6" fill="#6B7C5E"/>
  <text x="430" y="169" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">AI App B</text>
  <rect x="390" y="208" width="80" height="32" rx="6" fill="#6B7C5E"/>
  <text x="430" y="229" font-family="system-ui, sans-serif" font-size="11" fill="#F4F1EA" text-anchor="middle">AI App C</text>
  <!-- MCP hub -->
  <rect x="496" y="150" width="60" height="40" rx="8" fill="#4A5942"/>
  <text x="526" y="175" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#F4F1EA" text-anchor="middle">MCP</text>
  <!-- Services right -->
  <rect x="582" y="88" width="50" height="32" rx="6" fill="#8A8577"/>
  <text x="607" y="109" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">GitHub</text>
  <rect x="582" y="148" width="50" height="32" rx="6" fill="#8A8577"/>
  <text x="607" y="169" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Slack</text>
  <rect x="582" y="208" width="50" height="32" rx="6" fill="#8A8577"/>
  <text x="607" y="229" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">DB</text>
  <!-- Clean lines after -->
  <line x1="470" y1="104" x2="496" y2="165" stroke="#6B7C5E" stroke-width="2"/>
  <line x1="470" y1="164" x2="496" y2="170" stroke="#6B7C5E" stroke-width="2"/>
  <line x1="470" y1="224" x2="496" y2="178" stroke="#6B7C5E" stroke-width="2"/>
  <line x1="556" y1="165" x2="582" y2="104" stroke="#6B7C5E" stroke-width="2"/>
  <line x1="556" y1="170" x2="582" y2="164" stroke="#6B7C5E" stroke-width="2"/>
  <line x1="556" y1="178" x2="582" y2="224" stroke="#6B7C5E" stroke-width="2"/>
  <text x="510" y="292" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">1 protocol, N connections</text>
</svg>

The "before" side of that diagram is not an exaggeration. The spaghetti of custom integrations is what developers were living with. The "after" side is what MCP is targeting.

The problem was not that integrations were impossible - it's that every team had to reinvent the same wheels, and the results were incompatible with each other.

---

## How MCP Works Under the Hood

MCP's architecture is built around three roles: hosts, clients, and servers. A **host** is the AI application the user interacts with - like Claude Desktop or a custom agent. A **client** is a component inside the host that manages connections to MCP servers. A **server** is an external process that exposes capabilities (tools, resources, or prompts) over the MCP protocol.

These three roles might sound abstract, so let me ground them with a concrete example from my own testing.

When I connected Claude Desktop to a local filesystem MCP server, Claude Desktop was the host. Internally, Claude Desktop was running an MCP client that opened a connection to the filesystem server I had running as a separate process on my machine. The server exposed "tools" (like reading a file, listing a directory) and "resources" (specific files or directories that could be loaded into context). Claude could then call those tools during a conversation, and the results came back through the protocol.

The three primitive types MCP servers can expose are worth knowing:

- **Tools** - callable functions the AI can invoke (read file, search docs, send a message)
- **Resources** - data that can be loaded into the model's [context window](/blog/what-is-the-context-window) (file contents, database rows)
- **Prompts** - reusable prompt templates the server can surface to the host

This maps closely to how [function calling works in large language models](/blog/what-is-a-large-language-model) - but with the added layer of a standardized protocol layer so any compliant server works with any compliant host.

<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MCP architecture: host, client, server, and the three primitive types" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="340" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">MCP Architecture</text>
  <!-- Host box -->
  <rect x="30" y="56" width="220" height="240" rx="10" fill="#DDD8CE" fill-opacity="0.6"/>
  <text x="140" y="78" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">Host</text>
  <text x="140" y="94" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">(Claude Desktop / your app)</text>
  <!-- LLM inside host -->
  <rect x="50" y="106" width="180" height="50" rx="8" fill="#6B7C5E"/>
  <text x="140" y="128" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">LLM Engine</text>
  <text x="140" y="146" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">reasoning + decisions</text>
  <!-- Client inside host -->
  <rect x="50" y="168" width="180" height="50" rx="8" fill="#96845A"/>
  <text x="140" y="190" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">MCP Client</text>
  <text x="140" y="208" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">manages connections</text>
  <!-- User inside host -->
  <rect x="50" y="230" width="180" height="44" rx="8" fill="#4A5942"/>
  <text x="140" y="257" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">User Interface</text>
  <!-- Arrow host to server -->
  <line x1="250" y1="190" x2="330" y2="190" stroke="#DDD8CE" stroke-width="2.5"/>
  <polygon points="330,185 340,190 330,195" fill="#DDD8CE"/>
  <text x="290" y="183" font-family="system-ui, sans-serif" font-size="9" fill="#8A8577" text-anchor="middle">JSON-RPC</text>
  <!-- Server box -->
  <rect x="340" y="56" width="310" height="240" rx="10" fill="#DDD8CE" fill-opacity="0.4"/>
  <text x="495" y="78" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#4A5942" text-anchor="middle">MCP Server</text>
  <text x="495" y="94" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">(GitHub / filesystem / Slack)</text>
  <!-- Tools -->
  <rect x="360" y="106" width="130" height="48" rx="8" fill="#6B7C5E" fill-opacity="0.8"/>
  <text x="425" y="126" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Tools</text>
  <text x="425" y="144" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">callable functions</text>
  <!-- Resources -->
  <rect x="500" y="106" width="130" height="48" rx="8" fill="#96845A" fill-opacity="0.8"/>
  <text x="565" y="126" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Resources</text>
  <text x="565" y="144" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">data / context</text>
  <!-- Prompts -->
  <rect x="360" y="168" width="270" height="48" rx="8" fill="#4A5942" fill-opacity="0.75"/>
  <text x="495" y="188" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#F4F1EA" text-anchor="middle">Prompts</text>
  <text x="495" y="206" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">reusable prompt templates</text>
  <!-- External data source label -->
  <rect x="360" y="228" width="270" height="44" rx="8" fill="#DDD8CE"/>
  <text x="495" y="248" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228" text-anchor="middle">External Data / Service</text>
  <text x="495" y="264" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">(GitHub API, local files, DB, etc.)</text>
  <!-- Footer note -->
  <text x="340" y="312" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Communication uses JSON-RPC 2.0 over stdio or HTTP with SSE</text>
</svg>

One detail I got wrong initially: I assumed MCP was HTTP-only. It is not. MCP supports both **stdio transport** (the server runs as a subprocess, communicating over standard input/output) and **HTTP+SSE transport** (for remote servers). The stdio option makes local development unusually low-friction - you can spin up a test server in a terminal and have Claude connect to it in under a minute.

The underlying message format is JSON-RPC 2.0. If you have worked with language servers (LSP) in code editors, the pattern will feel familiar - that is not a coincidence, MCP borrowed heavily from LSP's architecture.

---

## MCP vs API vs Plugin - What's the Difference?

MCP is often confused with traditional APIs and with plugin systems. They solve overlapping problems, but from very different angles.

A **traditional API** is a general-purpose interface for any software to call. It has no specific concept of AI context, no standard for describing what capabilities are available, and no shared session model. You can build AI integrations on top of APIs - but MCP is a layer on top of that, adding structure the AI ecosystem specifically needs.

**Plugin systems** (like OpenAI's original plugin framework) are closer to MCP but are typically tied to a single platform. OpenAI plugins only work with OpenAI models. An MCP server, by contrast, can be connected to any MCP-compliant host - Claude, a custom open-source agent, or a tool built by a third-party developer.

| | Traditional API | Plugin System | MCP |
|---|---|---|---|
| Platform-specific | No | Yes | No |
| AI-native design | No | Yes | Yes |
| Standardized | Varies | Proprietary | Open standard |
| Works across models | Yes (manual) | No | Yes |
| Describes capabilities | No | Partially | Yes |

The key distinction worth holding onto: MCP is AI-native and cross-platform. APIs are general-purpose. Plugins are AI-native but silo'd.

If you are thinking about [building an AI tool stack](/blog/how-to-build-an-ai-tool-stack), MCP is the piece that lets components from different vendors work together without custom glue code.

<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison of API vs Plugin vs MCP across four dimensions" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="260" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">API vs Plugin vs MCP</text>
  <!-- Dimension labels -->
  <text x="30" y="72" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">Cross-platform</text>
  <text x="30" y="112" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">AI-native</text>
  <text x="30" y="152" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">Open standard</text>
  <text x="30" y="192" font-family="system-ui, sans-serif" font-size="11" fill="#3A3228">Self-describing</text>
  <!-- Column headers -->
  <text x="290" y="52" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#8A8577" text-anchor="middle">API</text>
  <text x="440" y="52" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#96845A" text-anchor="middle">Plugin</text>
  <text x="590" y="52" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4A5942" text-anchor="middle">MCP</text>
  <!-- Track lines -->
  <rect x="230" y="60" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="380" y="60" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="530" y="60" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="230" y="100" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="380" y="100" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="530" y="100" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="230" y="140" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="380" y="140" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="530" y="140" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="230" y="180" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="380" y="180" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <rect x="530" y="180" width="120" height="16" rx="4" fill="#DDD8CE"/>
  <!-- API fills (partial) -->
  <rect x="230" y="60" width="96" height="16" rx="4" fill="#8A8577"/>
  <rect x="230" y="100" width="30" height="16" rx="4" fill="#8A8577"/>
  <rect x="230" y="140" width="60" height="16" rx="4" fill="#8A8577"/>
  <rect x="230" y="180" width="20" height="16" rx="4" fill="#8A8577"/>
  <!-- Plugin fills (mixed) -->
  <rect x="380" y="60" width="30" height="16" rx="4" fill="#96845A"/>
  <rect x="380" y="100" width="110" height="16" rx="4" fill="#96845A"/>
  <rect x="380" y="140" width="36" height="16" rx="4" fill="#96845A"/>
  <rect x="380" y="180" width="80" height="16" rx="4" fill="#96845A"/>
  <!-- MCP fills (full or near) -->
  <rect x="530" y="60" width="120" height="16" rx="4" fill="#6B7C5E"/>
  <rect x="530" y="100" width="120" height="16" rx="4" fill="#6B7C5E"/>
  <rect x="530" y="140" width="120" height="16" rx="4" fill="#6B7C5E"/>
  <rect x="530" y="180" width="120" height="16" rx="4" fill="#6B7C5E"/>
  <!-- Legend -->
  <rect x="230" y="222" width="12" height="12" rx="2" fill="#8A8577"/>
  <text x="248" y="233" font-family="system-ui, sans-serif" font-size="10" fill="#3A3228">API</text>
  <rect x="290" y="222" width="12" height="12" rx="2" fill="#96845A"/>
  <text x="308" y="233" font-family="system-ui, sans-serif" font-size="10" fill="#3A3228">Plugin</text>
  <rect x="360" y="222" width="12" height="12" rx="2" fill="#6B7C5E"/>
  <text x="378" y="233" font-family="system-ui, sans-serif" font-size="10" fill="#3A3228">MCP</text>
  <text x="500" y="233" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577">Bar = relative coverage</text>
</svg>

One more nuance: MCP is not a replacement for APIs. MCP servers themselves call APIs internally. What MCP standardizes is the layer between the AI model and those API-calling servers - not the APIs themselves.

---

## Real MCP Servers in the Wild - What I've Tested

The best way I know to understand MCP is to actually run servers. I spent time testing several of the official and community-built MCP servers, and I want to share what worked, what surprised me, and what I got wrong.

**Filesystem server** was my starting point. You point it at a directory, and Claude can read, write, and search files within that directory. My first assumption was that this would feel clunky - like pasting file contents into chat. I was wrong.

The experience of asking Claude "What's in my `src/components` directory and which files reference the `Button` component?" and getting an accurate, reasoned answer - without copying anything manually - changed how I thought about what [AI agents](/blog/what-is-an-ai-agent) can actually do in practice.

**GitHub MCP server** connects to the GitHub API and lets Claude search repos, read files, and list pull requests. The practical value here is real. During testing I asked Claude to summarize open PRs in a repository and flag any that had been waiting more than a week for review - it pulled the data, filtered correctly, and wrote a clear summary. That took under 30 seconds and would have taken me 5 minutes manually.

**Slack MCP server** gave me more mixed results. Searching message history worked well; posting messages worked but felt like it needed more guardrails around confirmation steps. I would not automate outbound Slack messages in production without adding a human-in-the-loop check.

**Brave Search server** was the sleeper hit. Connecting an AI model to live web search with MCP was significantly cleaner than the various RAG-over-web-results setups I had tried before. The results came through structured, the citations were clear, and the latency was acceptable for most use cases. This is worth knowing if you are exploring [RAG approaches](/blog/what-is-rag-retrieval-augmented-generation) for your own projects.

A few things I got wrong in my early testing:

1. I assumed all MCP servers needed to run on a remote server. Many of the most useful ones run locally as subprocesses - which means no cloud costs and no data leaving your machine.
2. I thought setting up a server required deep backend knowledge. The TypeScript and Python SDKs are far more approachable than I expected. I had a minimal working server in about 90 minutes with no prior MCP experience.
3. I overestimated how much context the AI retains between tool calls. MCP handles the tool-calling mechanics, but the model still has a finite [context window](/blog/what-is-the-context-window). Large resource reads can fill that window faster than you expect.

<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MCP server testing results across four dimensions" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="300" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">MCP Servers Tested: My Assessment</text>
  <!-- Column headers -->
  <text x="200" y="62" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#8A8577" text-anchor="middle">Setup Ease</text>
  <text x="320" y="62" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#8A8577" text-anchor="middle">Reliability</text>
  <text x="440" y="62" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#8A8577" text-anchor="middle">Practical Value</text>
  <text x="580" y="62" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#8A8577" text-anchor="middle">Privacy-safe</text>
  <!-- Row: Filesystem -->
  <text x="110" y="98" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#3A3228" text-anchor="middle">Filesystem</text>
  <rect x="148" y="82" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="148" y="82" width="98" height="24" rx="5" fill="#6B7C5E"/>
  <rect x="268" y="82" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="268" y="82" width="96" height="24" rx="5" fill="#6B7C5E"/>
  <rect x="388" y="82" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="388" y="82" width="100" height="24" rx="5" fill="#6B7C5E"/>
  <rect x="508" y="82" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="508" y="82" width="104" height="24" rx="5" fill="#6B7C5E"/>
  <!-- Row: GitHub -->
  <text x="110" y="138" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#3A3228" text-anchor="middle">GitHub</text>
  <rect x="148" y="122" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="148" y="122" width="80" height="24" rx="5" fill="#96845A"/>
  <rect x="268" y="122" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="268" y="122" width="90" height="24" rx="5" fill="#96845A"/>
  <rect x="388" y="122" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="388" y="122" width="100" height="24" rx="5" fill="#96845A"/>
  <rect x="508" y="122" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="508" y="122" width="70" height="24" rx="5" fill="#96845A"/>
  <!-- Row: Slack -->
  <text x="110" y="178" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#3A3228" text-anchor="middle">Slack</text>
  <rect x="148" y="162" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="148" y="162" width="72" height="24" rx="5" fill="#6B7C5E"/>
  <rect x="268" y="162" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="268" y="162" width="68" height="24" rx="5" fill="#6B7C5E"/>
  <rect x="388" y="162" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="388" y="162" width="78" height="24" rx="5" fill="#6B7C5E"/>
  <rect x="508" y="162" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="508" y="162" width="50" height="24" rx="5" fill="#6B7C5E"/>
  <!-- Row: Brave Search -->
  <text x="110" y="218" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#3A3228" text-anchor="middle">Brave Search</text>
  <rect x="148" y="202" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="148" y="202" width="88" height="24" rx="5" fill="#96845A"/>
  <rect x="268" y="202" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="268" y="202" width="94" height="24" rx="5" fill="#96845A"/>
  <rect x="388" y="202" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="388" y="202" width="96" height="24" rx="5" fill="#96845A"/>
  <rect x="508" y="202" width="104" height="24" rx="5" fill="#DDD8CE"/>
  <rect x="508" y="202" width="104" height="24" rx="5" fill="#96845A"/>
  <!-- Legend -->
  <rect x="148" y="252" width="14" height="14" rx="3" fill="#6B7C5E"/>
  <text x="168" y="264" font-family="system-ui, sans-serif" font-size="10" fill="#3A3228">Sage (strong)</text>
  <rect x="270" y="252" width="14" height="14" rx="3" fill="#96845A"/>
  <text x="290" y="264" font-family="system-ui, sans-serif" font-size="10" fill="#3A3228">Amber (good)</text>
  <rect x="390" y="252" width="14" height="14" rx="3" fill="#DDD8CE"/>
  <text x="410" y="264" font-family="system-ui, sans-serif" font-size="10" fill="#3A3228">Track = max score</text>
</svg>

The pattern I noticed across servers: the ones that do **read-only operations** work beautifully. The ones that write (posting to Slack, pushing to GitHub) need more thought around permissions and confirmation flows.

If you want a reference for how these servers fit into current AI tooling, our [best AI agents guide for 2026](/blog/best-ai-agents-2026) covers the full picture.

---

## Who Should Care About MCP?

MCP is relevant to three distinct groups, and the relevance looks very different for each.

**Developers building AI-powered products** have the most immediate reason to pay attention. If you are building anything that involves an AI model taking actions or reading external data - even a simple internal tool - MCP gives you a standard architecture to build on. Instead of writing custom integration logic, you build an MCP server once and any compliant host can use it.

This is especially true for teams evaluating [AI code assistants](/best-of/best-ai-code-assistants) or building [AI agent systems](/blog/what-is-an-ai-agent). MCP is becoming the default plumbing layer for how those tools connect to real-world data.

**AI power users** who use Claude Desktop or similar hosts daily are benefiting from MCP right now - many just do not know the term. When Claude Desktop connects to your filesystem or pulls in your calendar data, that connection probably runs over MCP. Understanding the protocol helps you configure it better, troubleshoot when things break, and evaluate which AI tools are building on open standards versus proprietary lock-in.

**Business decision-makers** evaluating AI investments should treat MCP support as a positive signal. Tools built on open standards are easier to replace, easier to integrate, and less likely to create vendor lock-in. If you are working through [how to choose an AI model for your business](/blog/how-to-choose-an-ai-model-for-your-business) or [building your AI tool stack](/blog/how-to-build-an-ai-tool-stack), ask vendors directly whether their integrations follow MCP or use proprietary protocols.

MCP is also directly relevant to [AI privacy considerations](/blog/ai-privacy-checklist-for-businesses). Because MCP servers can run locally, sensitive data does not have to transit through external cloud services. A local filesystem server, for example, keeps your files on your machine - the AI calls the tool, the tool runs locally, and the results come back to the model without your file contents ever touching a remote server.

<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three audience segments and their MCP relevance" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="240" rx="12" fill="#F4F1EA"/>
  <text x="340" y="34" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">Who MCP Matters To</text>
  <!-- Developers card -->
  <rect x="30" y="54" width="190" height="160" rx="10" fill="#6B7C5E"/>
  <text x="125" y="80" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA" text-anchor="middle">Developers</text>
  <text x="125" y="102" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Build once, works</text>
  <text x="125" y="117" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">across hosts</text>
  <text x="125" y="140" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Standard tool/resource</text>
  <text x="125" y="155" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">primitives</text>
  <text x="125" y="178" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">No custom glue code</text>
  <text x="125" y="200" font-family="system-ui, sans-serif" font-size="9" fill="#DDD8CE" text-anchor="middle">Relevance: HIGH</text>
  <!-- Power Users card -->
  <rect x="245" y="54" width="190" height="160" rx="10" fill="#96845A"/>
  <text x="340" y="80" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA" text-anchor="middle">Power Users</text>
  <text x="340" y="102" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Configure Claude</text>
  <text x="340" y="117" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Desktop servers</text>
  <text x="340" y="140" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Understand what's</text>
  <text x="340" y="155" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">running locally</text>
  <text x="340" y="178" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Evaluate tool quality</text>
  <text x="340" y="200" font-family="system-ui, sans-serif" font-size="9" fill="#DDD8CE" text-anchor="middle">Relevance: MEDIUM</text>
  <!-- Business card -->
  <rect x="460" y="54" width="190" height="160" rx="10" fill="#4A5942"/>
  <text x="555" y="80" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#F4F1EA" text-anchor="middle">Businesses</text>
  <text x="555" y="102" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Avoid vendor lock-in</text>
  <text x="555" y="125" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Open standard = </text>
  <text x="555" y="140" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">easier to swap tools</text>
  <text x="555" y="163" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">Privacy: local servers</text>
  <text x="555" y="178" font-family="system-ui, sans-serif" font-size="10" fill="#F4F1EA" text-anchor="middle">keep data on-prem</text>
  <text x="555" y="200" font-family="system-ui, sans-serif" font-size="9" fill="#DDD8CE" text-anchor="middle">Relevance: GROWING</text>
</svg>

One thing I want to flag for the business audience: MCP adoption is still uneven. Not every AI tool supports it. When evaluating tools in our [methodology](/methodology), we now specifically check for MCP compatibility as a forward-looking signal.

---

## The Limitations and Open Questions Around MCP

MCP shows real promise, but this article would be incomplete without the honest version of where it falls short.

**Adoption is concentrated around Claude and Anthropic's ecosystem.** As of mid-2026, MCP has strong adoption in Claude Desktop and a growing set of open-source tools. But some major AI platforms have not fully embraced it. OpenAI has its own tool-calling infrastructure; Google has its own. The "universal standard" story requires broader buy-in than currently exists.

**Security is not handled for you.** MCP defines how communication works but places the responsibility for access control and data scoping on the server developer. A poorly built MCP server can expose more data than intended or run tools without adequate confirmation steps. When I tested the filesystem server, it would happily read or write any file in the configured directory - including files I would not want an AI modifying accidentally.

This connects to a broader point about [AI hallucination risks](/blog/what-is-hallucination-in-ai). MCP removes some failure modes (the AI no longer has to guess at what data is available) but introduces new ones (a misunderstood tool call can have real-world consequences).

**Debugging is still immature.** When an MCP tool call fails, the error surfaces as a message in the conversation, not as a structured exception the host can automatically handle. I spent time in early testing not sure whether a failure was in my server code, the host configuration, the JSON-RPC transport, or something else. Better tooling is coming, but it is not fully there yet.

**Context window pressure is real.** Every resource you load through MCP consumes tokens in the [context window](/blog/what-is-the-context-window). For large codebases or databases, the naive approach of loading everything into context does not work. You need to think carefully about retrieval strategy - closer to what [RAG systems](/blog/what-is-rag-retrieval-augmented-generation) and [embeddings](/blog/what-is-embedding-in-ai) do - rather than treating MCP as a magic solution to the context problem.

<svg viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MCP limitations rated by severity and likelihood" style="width:100%;height:auto;max-width:700px;display:block;margin:2rem auto;">
  <rect width="680" height="280" rx="12" fill="#F4F1EA"/>
  <text x="340" y="32" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#4A5942" text-anchor="middle">MCP Limitations: Severity Assessment</text>
  <!-- Y axis label -->
  <text x="22" y="160" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Impact</text>
  <!-- X axis label -->
  <text x="340" y="270" font-family="system-ui, sans-serif" font-size="10" fill="#8A8577" text-anchor="middle">Likelihood to affect you</text>
  <!-- Axes -->
  <line x1="60" y1="50" x2="60" y2="245" stroke="#DDD8CE" stroke-width="1.5"/>
  <line x1="60" y1="245" x2="640" y2="245" stroke="#DDD8CE" stroke-width="1.5"/>
  <!-- Quadrant labels -->
  <text x="340" y="66" font-family="system-ui, sans-serif" font-size="9" fill="#DDD8CE" text-anchor="middle">HIGH IMPACT</text>
  <text x="340" y="238" font-family="system-ui, sans-serif" font-size="9" fill="#DDD8CE" text-anchor="middle">LOW IMPACT</text>
  <!-- Gridlines -->
  <line x1="60" y1="148" x2="640" y2="148" stroke="#DDD8CE" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="350" y1="50" x2="350" y2="245" stroke="#DDD8CE" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Bubbles -->
  <!-- Security gaps: high impact, high likelihood -->
  <circle cx="500" cy="88" r="28" fill="#96845A" fill-opacity="0.85"/>
  <text x="500" y="84" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#F4F1EA" text-anchor="middle">Security</text>
  <text x="500" y="97" font-family="system-ui, sans-serif" font-size="9" fill="#F4F1EA" text-anchor="middle">gaps</text>
  <!-- Context pressure: high impact, medium-high likelihood -->
  <circle cx="390" cy="110" r="26" fill="#6B7C5E" fill-opacity="0.85"/>
  <text x="390" y="106" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#F4F1EA" text-anchor="middle">Context</text>
  <text x="390" y="119" font-family="system-ui, sans-serif" font-size="9" fill="#F4F1EA" text-anchor="middle">pressure</text>
  <!-- Adoption gap: medium impact, medium likelihood -->
  <circle cx="230" cy="170" r="24" fill="#96845A" fill-opacity="0.6"/>
  <text x="230" y="166" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#F4F1EA" text-anchor="middle">Adoption</text>
  <text x="230" y="179" font-family="system-ui, sans-serif" font-size="9" fill="#F4F1EA" text-anchor="middle">gaps</text>
  <!-- Debug tooling: lower impact, medium likelihood -->
  <circle cx="380" cy="195" r="22" fill="#6B7C5E" fill-opacity="0.55"/>
  <text x="380" y="191" font-family="system-ui, sans-serif" font-size="9" font-weight="600" fill="#F4F1EA" text-anchor="middle">Debug</text>
  <text x="380" y="204" font-family="system-ui, sans-serif" font-size="9" fill="#F4F1EA" text-anchor="middle">tooling</text>
</svg>

**The open questions I am watching through the rest of 2026:**

Will other major AI providers (OpenAI, Google) adopt MCP or continue to build competing standards? If MCP stays Anthropic-centric, it will be useful but not transformative. If it achieves genuine cross-platform adoption - the way HTTP became the universal web protocol - it changes the economics of AI integration at scale.

Will a security framework emerge on top of MCP? Right now, each server developer handles this independently. A standard security layer would help enterprise adoption significantly.

For my own read on how MCP fits into the current tooling picture, I'd also point you to our [2026 AI tools reality check study](/studies/2026-ai-tools-reality-check) - which looks at how tools like this play out when organizations actually deploy them, versus how they look in demos.

---

## FAQ

**What does MCP stand for?**

MCP stands for Model Context Protocol. It is an open standard created by Anthropic that defines how AI models communicate with external tools, data sources, and services. The "context" in the name refers to the information the model can access and act on beyond its own training data.

**Is MCP only for Claude?**

No. MCP is an open standard, and any developer can build a compliant host or server. While Claude Desktop was the first major host to ship with MCP support, other tools have added support since the spec was published. The goal is cross-model, cross-platform compatibility - though Claude-based tools currently have the most mature MCP integration.

**Do I need to be a developer to use MCP?**

Not to benefit from it. If you use Claude Desktop with any connected servers, you are using MCP. But to build your own MCP servers or configure advanced setups, yes - some development knowledge helps. Anthropic provides SDKs in TypeScript and Python that make the initial setup accessible to developers without deep infrastructure experience.

**How is MCP different from OpenAI function calling?**

OpenAI function calling lets you define functions that a model can call during a conversation, within a single API session. MCP is a standalone transport protocol that governs how a separate process (the server) communicates with the AI host. MCP is cross-platform, designed to run as a persistent service, and includes resource and prompt primitives beyond just callable functions.

**Is MCP safe to use with sensitive data?**

It can be, but it depends on the server implementation. Local MCP servers (stdio transport) keep data on your machine and never send it to external services. Remote MCP servers over HTTP depend on the server operator's security practices. The protocol itself does not enforce data security - that is the responsibility of each server developer. For business use, our [AI privacy checklist](/blog/ai-privacy-checklist-for-businesses) is worth reading before deploying any MCP server with sensitive data.

**Where can I find existing MCP servers to use?**

Anthropic maintains a list of reference servers at [modelcontextprotocol.io](https://modelcontextprotocol.io), covering filesystem, GitHub, Slack, databases, web search, and more. A growing community ecosystem has also produced hundreds of additional servers. The official GitHub organization at github.com/modelcontextprotocol is the best starting point.

**How does MCP relate to fine-tuning?**

They solve different problems. [Fine-tuning](/blog/what-is-fine-tuning-in-ai) bakes knowledge or behavior into the model's weights. MCP gives the model dynamic access to external data and tools at inference time. You can use both: a fine-tuned model that also has MCP connections gets the best of static knowledge and live external access.

**Will MCP work with open-source AI models?**

Yes, in principle. MCP is a protocol specification, not a product. Any host application can implement MCP client support, regardless of which AI model it uses. Several open-source AI tool projects have already added MCP support, making it possible to use open-source models with MCP servers. See [our comparison of open-source vs closed AI](/blog/open-source-vs-closed-ai) for more context on the tradeoffs there.

**What programming languages can I use to build an MCP server?**

Anthropic publishes official SDKs for TypeScript/JavaScript and Python. Community SDKs exist for other languages including Go, Rust, and Java. The underlying protocol is language-agnostic (JSON-RPC 2.0 over stdio or HTTP), so any language with a JSON library can technically implement it.

**How does MCP handle authentication?**

MCP does not prescribe a single authentication mechanism. Each server implements its own auth - typically using API keys, OAuth tokens, or local permissions. For the stdio transport (local servers), the server inherits the filesystem permissions of the process that launched it. For remote HTTP servers, standard web authentication patterns apply.
