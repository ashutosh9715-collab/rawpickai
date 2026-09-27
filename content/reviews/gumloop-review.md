---
title: "Gumloop Review: An Early Look at Agents, Workflows and Pricing"
description: "A dated first look at Gumloop's agent and workflow interfaces, with original screenshots, current product context and clear limits on what was tested."
slug: "/review/gumloop"
lastUpdated: "2026-09-27"
evidenceDate: "May 2026"
factsCheckedAt: "2026-09-27"
author: "Ash"
toolName: "Gumloop"
developer: "Gumloop Inc."
category: "AI agents"
pricingUSD: "Pro starts at $37/mo; confirm current free and trial terms"
freeTierLabel: "Check current signup terms"
trending: false
---

# Gumloop review: an early look at agents and workflows

Gumloop combines AI agents, model selection, connected apps, and a visual workflow builder. In my May 2026 account, the interface made it easy to find agent and workflow tools, and to choose among several model providers. The main caution is that the product and its billing have changed since then. My screenshots show an earlier version, and they do not document a complete workflow run with measured results.

**Testing note:** The screenshots and account observations in this review are from May 2026. One account screen showed 5.7k credits against a 5.0k allowance, so the balance included a 700-credit bonus. I checked Gumloop's public pricing page and current help material again on September 27, 2026. I have not retested the current agent experience or run a controlled comparison with Zapier, Make, or n8n.

## What changed since this test

Gumloop's [current pricing page](https://www.gumloop.com/pricing) presents agents as the main product and labels workflows “Legacy.” Its [Agent Tasks announcement](https://www.gumloop.com/blog/introducing-agent-tasks) explains that an agent can run on a schedule or app event without a separate workflow. That changes how to read my May screenshots: the workflow canvas remains a record of what I explored, but it may not be the best starting point for a new customer now. This is a documented product change, not a feature I retested.

## What the screenshots show

The home screen is organized around agents, skills, files, apps, history, and workflows. My account screen showed a 5.7k credit balance and an upgrade prompt. These are useful records of the version I used, not proof that the same allowance or navigation is available to new accounts now.

![Gumloop account home screen from May 2026, showing Agents, Skills, Apps, Workflows, and 5.7k credits against a 5.0k allowance.](/images/blog/gumloop-home.png)

An agent settings screen exposes controls for model choice, triggers, connected apps, skills, subagents, and abilities such as web search. It gives a sense of the configuration surface, but the screenshot does not show an agent completing a task.

![Gumloop agent settings screen from May 2026, with model, trigger, app, skill, and ability controls.](/images/blog/gumloop-dashboard.png)

The workflow builder uses a canvas rather than a simple linear checklist. Its prompt box offers examples for meeting preparation, contact enrichment, and a Slackbot. This lowers the barrier to getting started, although the screenshot shows example prompts, not a generated or successfully run workflow.

![Gumloop workflow canvas from May 2026 with example prompts for meeting preparation, contact enrichment, and a Slackbot.](/images/blog/gumloop-workflow-builder.png)

The Agent node screen has a Loop Mode toggle and four output fields. That suggests controls for repeated processing and passing different results to later nodes, but I did not test those behaviors systematically.

![Gumloop Agent workflow node from May 2026, showing Loop Mode and four output fields.](/images/blog/gumloop-agent-node.png)

The node library screenshot shows AI-related options such as Ask AI, Agent, Extract Data, Categorizer, Generate Image, AI Web Research, Analyze Image, and Analyze Video, alongside app-specific nodes. The exact catalogue can change as Gumloop updates its product.

![Gumloop workflow node library captured in May 2026.](/images/blog/gumloop-ai-nodes.png)

The model picker in my screenshot listed recommended options including GPT-5.4 Mini, Claude 4.8 Opus, and Gemini 3.5 Flash, plus provider categories. Treat those names as a historical capture, not a current model list. Model availability changes quickly, and selecting a model in a menu does not demonstrate its comparative quality.

![Gumloop model picker from May 2026. Model names shown are historical and may no longer be available.](/images/blog/gumloop-model-selection.png)

## What I can and cannot conclude

The screenshots support a few practical observations:

- The interface brought agents, workflows, app connections, skills, and model selection together in one product.
- The visual canvas exposes how a workflow is arranged, while the prompt box gives examples of what a builder can ask it to create.
- The account I used displayed a 5.7k balance, including a bonus above the 5.0k figure shown as the plan allowance.
- The builder and agent screens expose meaningful configuration, so a new user should expect more concepts to learn than in a basic trigger-and-action automation tool.

I do not have a screenshot of a completed workflow run, its output, or its credit usage. The available evidence cannot establish whether a prompt-built workflow worked correctly, how much that run cost, or whether Gumloop is cheaper or better than Zapier for a particular workload. A buyer should test one real agent task and inspect its output, run history, and credit usage before relying on it.

## Pricing and credits

Gumloop's public pricing page, checked September 27, 2026, lists Pro from $37 per month with 20,000 included monthly credits and a 14-day free Pro trial. It also lists Enterprise as custom priced. The page I checked did not clearly present the same standalone Free tier visible in my May screenshot. Gumloop's recent public materials have described a free 5,000-credit tier, so availability and signup terms are not clear from the materials I could verify. Check the live signup and billing screens before relying on a free allowance.

![Gumloop pricing screen captured in May 2026, showing a Free plan with 5k credits per month and Pro at $37 per month with 20k+ credits.](/images/blog/gumloop-pricing-page.png)

The billing model also needs a fresh look before estimating workflow cost. Current Gumloop help documentation says AI usage is token-based and describes fixed per-node costs for non-AI workflow nodes, tool-call charges, and a one-credit base cost for a workflow run. Non-AI steps should not be assumed free. Check the current cost estimate for your specific task rather than multiplying steps using an old example.

If you connect your own model-provider API key, Gumloop says Pro or higher is required and the AI-model portion uses fewer Gumloop credits; other charges still apply. That option may change the economics, but it does not make the workflow free. Review Gumloop's [current pricing](https://www.gumloop.com/pricing) and [BYOK billing explanation](https://support.gumloop.com/articles/6092974036-how-do-i-use-my-own-llm-api-key-in-gumloop) before building a cost estimate.

For readers in India, the displayed plan is in USD. The amount charged in INR can vary with exchange rates, taxes, and payment-provider fees, so I have removed the old fixed rupee conversions.

## Who might consider Gumloop

Gumloop is worth exploring if you want to build AI agents or combine model calls with app connections in a visual interface. The May screenshots show that it offered both an agent configuration screen and a separate workflow canvas. Whether the current product fits your workflow depends on the integrations, controls, and plan limits available now.

It may not be the right choice if you need a simple, well-documented automation between a couple of apps, if a specific integration is essential, or if you need predictable costs before testing. Confirm the current app catalogue, trial terms, data handling, and credit estimate against your own use case.

## The verdict

My May 2026 screenshots show an interface with substantial control over agents, model choice, connected apps, and workflow nodes. The trade-off is visible too: there are more concepts to configure than in a simple trigger-and-action tool. They do not establish run reliability, output quality, or cost. With agents now foregrounded and workflows labelled Legacy in the current pricing page, I would start a trial with one representative agent task and record its result and credit usage before choosing a plan. This is a first look, not a performance verdict.

## Frequently asked questions

### Does Gumloop have a free plan?

My May 2026 account screen showed a 5,000-credit allowance plus a 700-credit bonus. The current pricing page I checked highlights a 14-day Pro trial and a paid Pro plan, while other recent Gumloop materials have described a free tier. Confirm what is offered when you sign up.

### How much does Gumloop cost?

The public pricing page checked September 27, 2026 lists Pro from $37 per month with 20,000 monthly credits, and custom Enterprise pricing. Confirm the current plan and any trial or usage charges before subscribing.

### How does Gumloop charge for workflow runs?

Current help material describes token-based AI usage as well as workflow, tool-call, and node costs. Costs depend on the model and work performed. Inspect the current estimate for your workflow; the older claim that non-AI steps were all free is not reliable for current billing.

### Which models does Gumloop support?

The model picker screenshot in this review shows provider categories and specific models available in May 2026. Model lists change, so check the live picker and do not rely on the historical names here.

### Is Gumloop better than Zapier?

I have not run a matched workflow in both products, so this review does not declare a winner. Compare the current integrations, setup effort, run behavior, and actual cost for the same task.

---

*Product screenshots and account observations: May 2026. Pricing and help material checked: September 27, 2026. Features and billing may change.*

**Related reading:** [Zapier review](/review/zapier) | [Claude review](/review/claude) | [Claude Code review](/review/claude-code)
