---
title: "Zapier Review: A Copilot First Look, Pricing and Limits"
description: "An original Copilot setup test with screenshots, current billing context and an explicit distinction between a drafted Zap and a working automation."
slug: "/review/zapier"
lastUpdated: "2026-09-27"
evidenceDate: "May 2026"
factsCheckedAt: "2026-09-27"
author: "Ash"
toolName: "Zapier"
developer: "Zapier Inc."
category: "Automation"
pricingUSD: "Free; paid plans start at $19.99/mo billed annually"
freeTierLabel: "100 tasks/month"
trending: false
---

# Zapier review: what Copilot did and what still needed setup

Zapier connects apps through workflows called Zaps. I tested its natural-language Copilot by asking it to log HARO emails from Gmail in Google Sheets. It generated a useful workflow preview, but the screenshots show setup was not finished: Zapier still asked me to connect Gmail and Sheets before testing. So this is evidence that Copilot drafted a workflow, not that the automation ran successfully.

**Testing note:** The product screenshots and Copilot test are from May 2026. I checked Zapier's pricing and help documentation again on September 27, 2026. Product names, usage limits, task rates, and plan features change; the screenshots below document my test session, not necessarily today's interface.

## What changed since this test

Zapier's [current pricing page](https://zapier.com/pricing) says AI steps, code, and SDK usage now use the same task-based billing framework as other automation activity. Its [product updates](https://help.zapier.com/hc/en-us/categories/13951101412877-Product-updates) also record model-based pricing for AI by Zapier from June 2026. Both changes postdate my May Copilot screenshots. They affect how to estimate a live workflow's cost, but I have not rerun this HARO-to-Sheets setup under the newer billing rules.

## My Copilot test

I asked Copilot to watch for new Gmail messages with “HARO” in the subject and add the sender, subject, and received date to a Google Sheets row. The generated preview described the intended process and showed a Gmail trigger with a Sheets action. This was a sensible first draft of the workflow.

![Zapier Copilot preview for logging HARO emails in Google Sheets. The screen says setup is unfinished and asks to connect Gmail before testing.](/images/blog/zapier-copilot-haro.png)

The response summarized the trigger and action and listed the remaining setup steps: connect both accounts and select the spreadsheet and worksheet. The interface showed “Finish setup to test.” I did not capture a successful run, output row, or run history, so I cannot claim the workflow worked end to end or quantify the time it saved.

![Copilot's summary of the proposed HARO-to-Sheets workflow and the account connections still required.](/images/blog/zapier-copilot-response.png)

The practical takeaway from this test is modest but useful: Copilot can turn a plain-language request into a reviewable workflow outline. You still need to authorize the apps, confirm field mappings, and test with representative data before trusting it with real messages.

## What the other screenshots show

The Agents screen introduces a Meeting Prep Agent and displays an activity table. It helps show the product's agent interface, but this capture does not establish that I configured or evaluated this agent myself.

![Zapier Agents welcome screen with a Meeting Prep Agent and activity table.](/images/blog/zapier-agents-screen.png)

The MCP screen walks through connecting an AI assistant, selecting apps, and asking the assistant to take an action. It also shows a task counter. This is a useful setup overview, but I did not capture a completed MCP action from this test session.

![Zapier MCP setup screen showing AI clients, app selection, and a task counter.](/images/blog/zapier-mcp-screen.png)

## How Zapier pricing works now

Zapier's [pricing page](https://zapier.com/pricing), checked September 27, 2026, lists a Free plan with 100 tasks per month and two-step Zaps. Professional starts at $19.99 per month and Team at $69 per month when billed annually. Paid plans have task tiers, so the starting price is not a quote for every usage level.

![Zapier pricing page screenshot from May 2026. The capture shows Free, Professional, Team, and Enterprise plans; confirm current prices and features on Zapier's site.](/images/blog/zapier-pricing-page.png)

Zapier also automatically enrolls new accounts in a 14-day trial of paid features, according to its help center. The current trial documentation says an account does not auto-upgrade when the trial ends. Check the terms shown at signup, especially if you are testing more than one account or plan.

Zapier's task limits are important for budgeting. A successful action step usually uses tasks, while triggers and some built-in steps do not. The rate can vary for AI, code, and connector steps. The current pricing page says AI steps, code, and SDK usage share the same task pool.

If you reach the task allowance, new runs are held unless pay-per-task billing is enabled. Zapier's help page says it sends usage notifications as you approach the limit. This is different from the old claim that workflows always continue and immediately create overage charges. If pay-per-task billing is on, review its rate and cap before enabling workflows.

Zapier Agents use a separate activity measure in the current help material: it lists 400 activities per month on Free and 1,500 on Pro. Do not assume an activity is equivalent to a workflow task; check the usage definition for the product you plan to use.

## Integrations and where it may fit

Zapier's current site advertises more than 9,000 app integrations. That breadth can be valuable if your workflow depends on a specific SaaS app. Check the integration page for the exact trigger and action you need, though: an app appearing in the catalogue does not guarantee it supports every event or field you want.

Zapier may suit someone who wants a guided, no-code way to connect common business apps and is willing to review and test each workflow. Copilot can help draft the structure, as it did in my screenshot, but the user remains responsible for account authorization, field mapping, error handling, and testing.

It may be a poor fit if you need to predict costs without modeling task usage, run a workflow beyond your allowance without extra billing, or meet strict requirements that prohibit sending data through a hosted service. For those cases, compare the exact plan, data-handling terms, and workflow behavior with alternatives before moving sensitive or high-volume processes.

## What I cannot claim from this test

The captures do not support a ranking of Zapier against Make or n8n, an estimate of savings at a particular task volume, or a claim that its AI features outperform competitors. The current product's model and usage details differ from the older review, and I did not run matched tests in competing tools.

Third-party ratings and a few billing anecdotes do not establish how often a billing problem occurs. For a purchase decision, the more useful checks are the current task allowance, whether pay-per-task billing is enabled, and the estimate shown for the exact workflow you intend to run.

## The verdict

My Copilot test showed a useful workflow draft for filtering HARO email into a spreadsheet. Its value was in making the intended trigger, action, and missing setup steps visible; it did not save a working automation. Before relying on this workflow, connect both accounts, choose the exact spreadsheet, send a representative message, inspect the output row and run history, then check the task usage. Until that is done, this is a first look at setup, not a verdict on reliability or time saved.

## Frequently asked questions

### Is Zapier free?

Zapier's pricing page lists a Free plan with 100 tasks per month and two-step Zaps. A new account also receives a 14-day trial of paid features, according to the current help center. Confirm current signup terms before you start.

### How much does Zapier cost?

When checked on September 27, 2026, the pricing page listed Professional starting at $19.99 per month and Team starting at $69 per month with annual billing. Paid plans offer different task tiers, so the price depends on the allowance you choose.

### What is a Zapier task?

A task is generally counted when an action step completes successfully. Triggers and certain built-in steps do not count, while AI, code, and connector usage can have different rates. Check the current task-usage documentation for your workflow.

### What happens when I reach my task limit?

Runs can be held until the plan allowance resets or you upgrade. If you enable pay-per-task billing, workflows may continue and additional charges can apply. Review the billing setting and usage alerts in your account.

### Did Copilot make a working Zap in this review?

The screenshot shows a generated preview, not a completed test. Zapier still asked me to connect Gmail and Sheets. I do not have evidence here of a successful run or output row.

### Does Zapier support AI agents and MCP?

Zapier currently offers Agents and MCP products. The screenshots in this review show their interfaces and setup flow, but they do not document a completed agent or MCP task from my test session.

---

*Copilot and product screenshots: May 2026. Pricing and help documentation checked: September 27, 2026. Features and task rates may change.*

**Related reading:** [Claude review](/review/claude) | [ChatGPT review](/review/chatgpt) | [Claude Code review](/review/claude-code)
