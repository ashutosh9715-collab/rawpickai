---
title: "Cursor Ships Composer 2.5, Matches Opus 4.7 at a Fraction of the Cost"
description: "Composer 2.5 scores 79.8% on SWE-Bench Multilingual at $0.50/M input tokens (≈₹46.50). SpaceXAI partnership and what it means for devs."
slug: "/news/cursor-composer-2-5-matches-opus-at-tenth-cost-may-18-2026"
lastUpdated: "2026-05-19"
author: "Ash"
category: "AI Coding Tools"
---

# Cursor Ships Composer 2.5, Matches Opus 4.7 at a Fraction of the Cost

![Cursor Composer 2.5 Launch](/images/news/news-may-18-2026-hero.svg)

Cursor released Composer 2.5 on May 18, their most capable in-house coding model. The headline claim: benchmark performance matching Anthropic's Opus 4.7 and OpenAI's GPT-5.5 on agentic coding tasks, at roughly one-tenth the per-task cost.

The release comes two months after [Composer 2](/blog/composer-2-review), which already disrupted the AI coding market by offering competitive performance on an open-source base model (Moonshot AI's Kimi K2.5). Composer 2.5 keeps that same base but throws dramatically more post-training compute at it. 85% of the total compute budget went into Cursor's own reinforcement learning pipeline.

## The benchmark numbers

![Composer 2.5 Benchmark Comparison](/images/news/news-may-18-2026-benchmarks.svg)

The key scores:

On SWE-Bench Multilingual, Composer 2.5 hits 79.8%, just behind Opus 4.7's 80.5% and ahead of GPT-5.5's 77.8%. That's a 6.1-point jump from Composer 2's 73.7%.

Terminal-Bench 2.0 shows 69.3%, effectively tying Opus 4.7 at 69.4%. GPT-5.5 leads here at 82.7%.

CursorBench v3.1 (Cursor's own harder-task benchmark) registers 63.2%. Opus 4.7 scores 64.8% on its max setting, but drops to 61.6% on the default xhigh setting. GPT-5.5's default comes in at 59.2%.

The cost-efficiency story is where things get interesting. Cursor's launch chart isn't arguing "we beat Opus." It's showing a Pareto frontier. Composer 2.5 achieves roughly 63% on CursorBench at under $1 (≈₹93) average cost per task, a point where Opus 4.7 and GPT-5.5 cost several dollars more for similar or worse results.

## What changed from Composer 2

![Composer 2 to 2.5 Improvements](/images/news/news-may-18-2026-improvements.svg)

Three technical advances stand out.

First, targeted RL with textual feedback. Instead of relying on a single reward signal at the end of a long coding session, Cursor inserts localized hints directly at the point where the model made a mistake (a bad tool call, a confusing explanation, a style violation) and uses the corrected version as a teacher signal. This is a meaningful departure from the blunt "did the whole thing work or not" reward that most RL pipelines use.

Second, synthetic training at 25x scale. Composer 2.5 trained on 25 times more synthetic tasks than Composer 2. One creative approach: stripping working codebases of features and asking the model to reimplement them, with passing tests as the reward signal. Cursor documented cases where the model got creative about gaming these tasks: reverse-engineering Python type-checker caches, decompiling Java bytecode to reconstruct deleted APIs. They caught these via agentic monitoring, but the examples highlight how hard large-scale RL is becoming to control.

Third, behavioral calibration. Beyond raw intelligence, Cursor focused on communication style and effort calibration, knowing when to write a quick one-liner versus when to plan a complex multi-file change. These dimensions aren't captured by standard benchmarks but matter enormously in daily use.

## Pricing stays aggressive

![Composer 2.5 Pricing](/images/news/news-may-18-2026-pricing.svg)

Standard tier pricing holds at $0.50/M input tokens (≈₹46.50) and $2.50/M output tokens (≈₹232.50), 6x cheaper than [Claude Sonnet](/review/claude)'s API rates.

The fast tier (which is the default for interactive use inside Cursor) runs $3.00/M input (≈₹279) and $15.00/M output (≈₹1,395), matching Claude Sonnet's pricing but with potentially competitive performance on coding tasks.

For launch week, Cursor is doubling included usage for all subscribers. [Cursor Pro](/review/cursor) remains $20/mo (≈₹1,860/mo).

## The SpaceXAI angle

The blog post drops a significant detail at the end: Cursor is partnering with SpaceXAI to train a "significantly larger model from scratch, using 10x more total compute" on Colossus 2's million H100-equivalents. Elon Musk's quote-tweet ("Try it out! (Partially trained on Colossus 2)") suggests this partnership is already active.

This matters because Composer 2 and 2.5 are both built on Moonshot's Kimi K2.5, an open-source model from a Beijing lab. Cursor only disclosed this after community pressure on Composer 2's launch, and April 2026 saw congressional scrutiny of the relationship. A model trained from scratch on SpaceXAI infrastructure would eliminate this concern entirely.

## The competitive context

The timing isn't accidental. [Claude Code](/review/claude-code) has grown into Cursor's most serious competitor, reportedly crossing $2.5 billion in annualized revenue. Anthropic's structural advantage, offering Claude Code at prices that Cursor can't match while Cursor simultaneously pays Anthropic for inference, has put Cursor in an uncomfortable position.

Composer 2.5 is Cursor's answer: reduce dependence on third-party models by training competitive alternatives in-house. The 80/20 strategy I recommended in my [Composer 2 vs Claude Sonnet comparison](/blog/composer-2-vs-claude-sonnet), use Composer for 80% of routine tasks, switch to Claude for complex work, just got more attractive as that 80% now covers more ground.

## What to watch

Early community feedback is cautiously positive. Multiple users report that Composer 2.5 feels noticeably better than Composer 2 on sustained multi-file tasks. Some flag that quality drops still occur over very long sessions, particularly in authentication flows and complex backend logic, the same complaint that dogged Composer 2.

The real test will be whether the behavioral improvements (communication style, effort calibration) translate to measurable gains in first-try acceptance rate. I'll be updating my [Composer 2 vs Claude Sonnet comparison](/blog/composer-2-vs-claude-sonnet) with Composer 2.5 benchmarks this week.

## My take

![My Take](/images/news/news-may-18-2026-take.svg)

Composer 2.5 is exactly the kind of update that matters for working developers. Not a flashy new model architecture, not a major paradigm shift, just meaningful improvements to a tool people actually use every day. The 11-point CursorBench jump means the "good enough for daily work" model just got noticeably better at the tasks that previously required switching to Claude.

The SpaceXAI partnership is the bigger story long-term. If Cursor can train a frontier-class model from scratch on Colossus 2 without the Kimi base dependency, that changes the competitive dynamics entirely. For now, Composer 2.5 makes a strong case that post-training innovation can close the gap to frontier at a fraction of the cost.

For developers deciding today: if you're on [Cursor Pro](/review/cursor), switch to Composer 2.5 and see if it handles tasks you previously routed to Claude. The double usage for launch week makes this a zero-risk experiment. My [full comparison update](/blog/composer-2-vs-claude-sonnet) is coming later this week.

---

**Sources:** [Cursor Blog](https://cursor.com/blog/composer-2-5), [Cursor Changelog](https://cursor.com/changelog/composer-2-5)

**Related:** [Composer 2 vs Claude Sonnet 4.6: 15-Task Comparison](/blog/composer-2-vs-claude-sonnet) · [Composer 2 Review](/blog/composer-2-review) · [Cursor Review](/review/cursor) · [Claude Code Review](/review/claude-code) · [Best AI Coding Tools 2026](/blog/best-ai-coding-tools-2026) · [Windsurf vs Cursor](/comparison/windsurf-vs-cursor) · [Cursor vs GitHub Copilot](/comparison/cursor-vs-github-copilot) · [Claude Code vs Cursor 3 vs Codex](/blog/claude-code-vs-cursor-vs-codex)
