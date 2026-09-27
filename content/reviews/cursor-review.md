---
title: "Cursor Review: What I Could Verify About the Editor and Agents"
description: "An evidence-led Cursor review with original interface and code screenshots, current pricing and product updates, and clear limits on what the tests establish."
slug: "/review/cursor"
lastUpdated: "2026-09-27"
evidenceDate: "2026 screenshots"
factsCheckedAt: "2026-09-27"
author: "Ash"
toolName: "Cursor"
developer: "Anysphere"
category: "Code Assistants"
pricingUSD: "Free; Pro starts at $20/mo"
freeTierLabel: "Limited Agent requests"
trending: true
---

# Cursor review: the editor, the agent workspace, and what still needs testing

Cursor is a coding tool built around AI assistance. It offers an editor based on VS Code and a newer workspace for directing agents across coding tasks. Those are related but different ways to work: in the editor you inspect and change code directly; with agents you describe a task and review the work they return. Which feels better depends on your project, your review habits, and how much control you want during an edit.

**Evidence note:** I have saved screenshots of Cursor's agent workspace, one TypeScript answer, and a pricing page. The older version of this article also described six weeks of project use, a FastAPI backend, a React frontend, autocomplete counts, and agent success rates. I do not have the repositories, test logs, suggestion log, or matched Copilot results available to substantiate those measurements on this page. I am not presenting them as verified benchmarks. The screenshots document an actual interaction with Cursor, not a current end-to-end project test.

## What the saved screenshots show

The workspace capture shows a New Agent entry, an Automations section, a repository area, and a prompt box with Plan selected. It also shows a Free Plan account. That is useful evidence of the product's agent-first interface, but an empty prompt box does not show an agent changing a repository or passing tests.

![Cursor agent workspace in a Free Plan account, showing New Agent, Automations, repositories and the Plan prompt box.](/images/blog/cursor-composer-interface.png)

I asked Cursor to “write a TypeScript function to validate an email address.” The saved response starts with constants for overall address length and local-part length, a regular expression, and a function that checks the input type before processing it. That is a concrete example of generating a code draft from a short instruction. The visible screen does not show the entire function, a compiler run, unit tests, or whether it handles edge cases such as internationalized domains.

![Cursor response to a TypeScript email-validation prompt, showing the start of the generated code but no compilation or test result.](/images/blog/cursor-composer-typescript-output.png)

The practical lesson is not that Cursor writes production-ready validators. It is that a short prompt can produce a structured starting point quickly. For code that will handle user input, I would still inspect the complete file, run the project's type checker and tests, and try cases the prompt did not mention. A polished answer in chat is not the same as a working change in a repository.

## Notes from earlier project work

The earlier review described using Cursor on a Python FastAPI backend and a Next.js frontend. Those project files are not included with this review, so the following are dated field notes rather than a reproducible benchmark.

One backend task was to add rate limiting to authentication routes using an existing Redis client, then add tests. This is a good example of what an agent needs to understand before editing: the project's middleware pattern, where the Redis client is initialized, how routes are registered, and how tests create requests. An agent that writes plausible middleware but misses any of those connections has not finished the task. My notes say Cursor proposed changes across those parts of the project, but I cannot show the diff and test run here to support a first-try success claim.

The React notes were more mixed. Generating a pricing card from a fairly specific brief was straightforward to review because the expected UI and calculations were concrete. Refactoring nested Zustand selectors was harder to judge from a polished response alone: a change can type-check yet still alter render behavior. That distinction is useful when deciding what to delegate. Small, well-scoped UI work is easier to inspect; state-management changes need a closer code review and tests that exercise updates.

The old article also described a date-handling migration and autocomplete comparisons with GitHub Copilot. Without the before-and-after repository, suggestion log, or matched setup, I cannot verify exact file counts, acceptance rates, or minutes saved. The defensible takeaway is narrower: review the agent's diff and test output for repository-wide changes, and measure autocomplete value on your own code rather than borrowing another developer's percentage.

## What changed since the older review

Cursor's [Cursor 3 announcement](https://cursor.com/blog/cursor-3) describes a unified workspace for local and cloud agents alongside the editor. Its [September 2026 changelog](https://cursor.com/changelog) adds Projects for coordinating longer work and, later in the month, Rollouts and Security Review for Teams and Enterprise. These are product announcements, not features I tested in a real project for this review.

That distinction matters because the old article treated Cursor mainly as an AI-enhanced VS Code alternative and judged it against autocomplete-focused competitors. A current buyer may also be choosing a multi-agent workspace, cloud execution, and review tooling. A historical autocomplete score cannot answer whether those newer workflows help your team ship correct code.

## Pricing and usage: check the work you actually do

Cursor's [official pricing page](https://cursor.com/pricing), checked September 27, 2026, lists Hobby as free with limited Agent requests, Pro starting at $20 per month, Teams starting at $40 per user per month, and Enterprise as custom priced. It also offers Pro+ and Ultra options. The page describes included model usage and says on-demand usage can continue after the included amount is consumed if enabled. Check the live checkout and usage settings for the exact plan, billing period, currency, and tax that apply to you.

![Cursor pricing page captured during the earlier review. It shows Hobby, Individual, Teams and Enterprise; verify live plan terms before buying.](/images/blog/cursor-pricing-2026.png)

The old article converted every tier into rupees at a fixed exchange rate and described individual requests as fixed “credits.” That is not a reliable way to budget a current account. The useful calculation is your own: run a representative week of Tab and Agent use, inspect the usage dashboard, note the models used, and compare the actual included usage and any on-demand setting with the plan price. An expensive model or a long agent run can change the economics.

## Where Cursor may fit

Cursor is worth trying if you want an editor and an agent workspace within the same product, prefer inspecting proposed code changes in context, or want to delegate contained coding tasks while keeping a review step. The saved TypeScript response demonstrates drafting, and Cursor's current documentation describes broader agent workflows. It does not establish that agents will reliably complete your own multi-file changes.

It may be less suitable if your team must remain in another IDE, your essential extensions behave differently in a VS Code fork, your code cannot be sent through the configured AI services, or your budget cannot absorb variable model usage. Those are not universal drawbacks proven by my screenshots. They are checks to run before switching an existing development workflow.

If you are comparing Cursor with GitHub Copilot or Claude Code, test the same repository task in each tool. Record the prompt, model, elapsed time, changed files, tests run, corrections required, and usage. An autocomplete suggestion count is not a substitute for that end-to-end evidence.

## My verdict

The saved evidence shows a clean agent workspace and one reasonably structured code draft. That is enough to make Cursor worth a trial for a developer curious about agent-assisted work. It is not enough to call Cursor the best code editor, claim a 70% autocomplete acceptance rate, or quote a 65% first-try agent success rate. I would make a purchasing decision only after a real task in my own repository, with the diff and test results reviewed and the usage cost recorded.

## Frequently asked questions

### Is Cursor free?

The official pricing page lists a Hobby plan with limited Agent requests. The Free Plan label is visible in my workspace screenshot. Check the current account limits before relying on it for daily development.

### How much does Cursor Pro cost?

The official pricing page checked September 27, 2026 lists Pro from $20 per month. Billing period, usage, taxes, and local currency affect the final charge.

### Is Cursor better than GitHub Copilot?

This review cannot establish a winner. The old numerical comparison did not preserve the suggestion log or matched test setup. Compare both on the same project and the same tasks, then inspect the changes and usage.

### Did the TypeScript function work?

The saved screenshot shows a generated answer, not a compiled or tested function. I would not use it in production without reviewing the complete implementation and testing edge cases.

### Does Cursor still support an editor as well as agents?

Yes. Cursor's current product materials describe the Cursor 3 agent workspace and the option to return to the editor. Which interface is right for you depends on whether you want direct editing, delegated work, or both.

---

*Original product screenshots: 2026. Pricing and product announcements checked: September 27, 2026. No current end-to-end agent run or matched competitor benchmark is documented here.*

**Related reading:** [Cursor vs GitHub Copilot](/comparison/cursor-vs-github-copilot) | [Claude Code review](/review/claude-code) | [Claude Code vs Cursor vs Codex](/blog/claude-code-vs-cursor-vs-codex)
