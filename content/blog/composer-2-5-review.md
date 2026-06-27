---
title: "Composer 2.5 Review: Opus at 1/10 Cost"
description: "I tested Cursor's Composer 2.5 on 8 coding tasks. 79.8% SWE-Bench score, $0.50/M tokens - here's where it wins and where it still breaks."
slug: "/blog/composer-2-5-review"
lastUpdated: "2026-05-23"
author: "Ash"
category: "AI Coding Tools"
toolName: Composer 2.5
overallScore: 4.2
scores:
  easeOfUse: 80
  outputQuality: 84
  valueForMoney: 95
  featureDepth: 76
  freeTier: 52
trending: true
---

> **TL;DR:** Composer 2.5 (released May 18, 2026) scores 79.8% on SWE-Bench Multilingual - matching Claude Opus 4.7 and GPT-5.5 at standard tier pricing of $0.50/$2.50 per million tokens (≈₹46.50/≈₹232.50). On 8 hands-on coding tasks, it handled multi-file refactors and test generation impressively but still stumbles on JWT refresh token edge cases and N+1 database queries. The cost story is the real headline: Composer 2.5 Fast tier ($3.00/$15.00, ≈₹279/≈₹1,395 per M tokens) costs the same as Claude Sonnet 4.6 while matching Opus 4.7 on most coding benchmarks. **Overall Score: 4.2/5.** Prices verified at ₹93/USD.

---

> **Context:** Composer 2.5 is Cursor's second proprietary AI coding model, built on Moonshot's Kimi K2.5 open-source checkpoint with a heavily customised post-training pipeline. It launched May 18, 2026 - five months after [Composer 2](/blog/composer-2-review) landed in March. Cursor spent 85% of the total compute budget on post-training: 25x more synthetic tasks, a new reinforcement learning technique using targeted textual feedback, and behavioral calibration that prior versions ignored entirely. [Read Cursor's official Composer 2.5 announcement](https://cursor.com/blog/composer-2-5) for the full technical writeup.

---

When [Composer 2 dropped in March](/blog/composer-2-review), the headline was simple: Cursor had built their own model.

![Composer 2.5 at a Glance](/images/blog/composer-2-5-hero.svg)

The real story was cost. Claude Sonnet 4.6 suddenly had a credible competitor at a fraction of the API price, running natively inside the editor you were already using. I wrote then that the gap between Composer 2 and Sonnet 4.6 was smaller than anyone expected - but that Cursor's model still had blind spots that mattered on real projects.

Composer 2.5 changes the conversation again. This time, the benchmark target isn't Claude Sonnet - it's Claude Opus 4.7. And from both the numbers and my own testing, it's closer than I expected.

I ran Composer 2.5 through the same eight task categories I used for the [Composer 2 review](/blog/composer-2-review) and the earlier [Cursor 3 review](/blog/cursor-3-review). Same prompts, same codebases, same pass/fail standards. This is a proper side-by-side, not a fresh assessment from scratch.

The results were better than I expected on output quality - and exactly what I expected on the two failure modes that have followed Cursor's models since the beginning.

---

## What Changed from Composer 2 (Technically)

![Composer 2 vs Composer 2.5 benchmark improvements](/images/blog/composer-2-5-vs-composer-2.svg)

The upgrade story here is almost entirely about post-training, not the base model. Composer 2.5 still starts from Moonshot's Kimi K2.5 checkpoint - the same open-source foundation as Composer 2.

What changed is what Cursor did to it after.

**25x more synthetic training tasks with dynamic difficulty.** Cursor's team generates synthetic coding problems grounded in real codebases - one technique is "feature deletion," where they strip a working feature from a codebase and ask the model to rebuild it from tests. Another is decompiling third-party Java bytecode to reconstruct an API surface, then asking the model to use it correctly. With 2.5, the pipeline creates tasks dynamically as the model improves, selecting for and generating harder problems in real time. You don't hit a ceiling where the model has "solved" all the training tasks.

This dynamic difficulty scaling is the part I hadn't seen described clearly before reading Cursor's technical writeup. Most synthetic data pipelines generate a fixed dataset, train on it, and call it done. Cursor's approach generates new problems throughout the training run in response to where the model is weakest. If the model is consistently solving file-level refactors but failing on cross-repository tasks, the data pipeline shifts to produce more cross-repository problems. The result is a training curriculum that chases the model's weaknesses rather than drilling strengths.

**Targeted RL with textual feedback.** Standard RL on long coding rollouts has a credit assignment problem: the reward is computed at the end of a trajectory that might span hundreds of thousands of tokens, so the model can't easily tell which specific step helped or hurt. Cursor's solution is to insert targeted feedback directly at the moment in the trajectory where the model made a wrong call - a short hint describing what better behavior looks like. The adjusted context generates a teacher distribution; the original model acts as the student. This on-policy distillation loss nudges the model toward better local decisions rather than just rewarding or penalising the overall outcome. It is, in effect, a way of giving the model a supervisor that watches specific decisions mid-task rather than only grading the final result.

**Behavioral calibration.** This is the one that doesn't show up on benchmarks but matters enormously in daily use. Composer 2 would sometimes write a 40-line Python script to handle a change that needed two lines of find-and-replace. It would give you generic boilerplate when you needed a specific architectural decision. Cursor explicitly trained 2.5 on communication style and effort calibration - dimensions no public benchmark captures but that every developer notices within five minutes.

**The Sharded Muon optimizer.** A lower-level detail but worth flagging: Cursor used a newer optimizer (Sharded Muon) for the training run, which they credit with helping the model learn more efficiently from the larger synthetic task set. It's the kind of infrastructure choice that compounds over many training steps.

Together, these changes explain why CursorBench v3.1 improved by 11 points (52.2% on Composer 2 to 63.2% on Composer 2.5) while SWE-Bench improved by 6.1 points. The CursorBench jump is larger because it directly measures the behaviors the post-training pipeline targeted - long, tool-heavy, multi-step coding sessions. SWE-Bench measures single-issue resolution, which both models already handled reasonably well.

---

## Benchmark Numbers vs Real Usage

![Composer 2.5 benchmark comparison chart](/images/blog/composer-2-5-benchmarks.svg)

The benchmark headline is this: Composer 2.5 scores 79.8% on SWE-Bench Multilingual - matching Claude Opus 4.7 and GPT-5.5 at roughly one-thirtieth the output token cost.

On CursorBench v3.1 (Cursor's internal benchmark, designed around multi-step agentic tasks), Composer 2.5 at default settings scores 63.2%. That beats Claude Opus 4.7 at xhigh effort mode (61.6%) and GPT-5.5 at medium defaults (59.2%). And it does it for about $1 per task, compared to roughly $7/task for Opus 4.7 at xhigh.

**Here is the catch nobody talks about.**

CursorBench is a benchmark Cursor designed, optimised for, and owns. SWE-Bench Multilingual measures the model's ability to resolve GitHub issues in isolation - a clean, well-scoped task with verifiable pass/fail criteria. Both are real measures of something. Neither is the same as your actual work.

The gap I keep running into is Terminal-Bench, where Composer 2.5 scores 69.3% against GPT-5.5's 82.7%. That's 13 points. For developers whose main use case involves shell scripting, infrastructure automation, or terminal-native workflows, that gap is not theoretical - it shows up in practice. I hit it when testing Docker and CI pipeline tasks. More on that below.

The other gap is context coherence over very long sessions. The base Kimi K2.5 model supports 256k tokens, but Composer 2.5 as deployed inside Cursor doesn't fully exploit that window for cross-file reasoning. It excels at tasks where the relevant context fits in the currently open files. Push it to coordinate changes across a large codebase where the key relationships aren't in the active buffer and results degrade noticeably.

The benchmark numbers are real and impressive. The Terminal-Bench gap and context coherence limitation are also real. Both things are true at once.

There's a second nuance that rarely gets discussed: the cost-per-task metric is probably more informative than the raw benchmark score for most development teams. At roughly $1/task on CursorBench - compared to $7/task for Opus 4.7 at xhigh - Composer 2.5 Standard lets you run seven times as many agent iterations for the same budget. On a complex feature that might need 10-15 agent passes before it's production-ready, that cost difference is not trivial. Even if each individual pass is slightly lower quality than an Opus pass, the ability to iterate freely without watching the token meter changes how you use the tool.

I ran this pattern across the Docker and Stripe webhook tasks in my test suite. Rather than trying to craft the perfect prompt upfront, I let Composer 2.5 take a first pass, reviewed the output, corrected it with targeted feedback, and got a clean result by pass two or three. Total cost for that loop was under $0.30. The same workflow on Opus 4.7 would have cost $3-4 per task. At scale across a dev team, that arithmetic matters.

The context coherence issue is worth understanding precisely, because it gets overstated in some reviews. Composer 2.5 does not suddenly lose track of what it's doing. The degradation happens specifically when the task requires understanding architectural relationships between files that are not currently open in the editor. If you're refactoring a module in isolation, or working on a feature where the dependencies are visible in the buffer, the model is coherent and consistent. The problem appears when you ask it to make a change that implicitly requires understanding how five other disconnected files interact - and those files aren't open. That's a workflow habit issue as much as a model limitation: keeping the relevant context in view gets significantly better results.

---

## I Tested Composer 2.5 on 8 Coding Tasks

![Composer 2.5 task scorecard - 8 real coding tasks](/images/blog/composer-2-5-tasks.svg)

I ran the same eight task categories I've used across every [Cursor and Composer review](/blog/composer-2-vs-claude-sonnet) on this site - same starting codebases, same prompts, no cherry-picking. Here's what happened.

**Task 1 - Multi-file TypeScript refactor (8 files, Next.js codebase): Pass.**
This was Composer 2.5's clearest improvement over its predecessor. I gave it a Next.js app with a scattered auth context - user state was being passed as props through four component layers - and asked it to refactor to a proper context/hook pattern across eight files. Composer 2 lost the thread around file four and started creating duplicate type definitions. Composer 2.5 completed the refactor cleanly, with only one import path that needed manual correction. On a task category where the earlier model regularly needed two or three rounds of correction, this was a meaningful step forward.

**Task 2 - JWT auth middleware with refresh token rotation: Partial.**
The boilerplate was correct and the basic flow was solid. Where it fell down was refresh token rotation on concurrent requests - the classic race condition where two requests hit the refresh endpoint simultaneously, both get new tokens, and one invalidates the other. Composer 2.5 wrote a clean single-request implementation with no handling for that edge case. I flagged it explicitly; the second pass was correct. This is consistent with the auth limitation that reviewers noted on Composer 2, and it hasn't been fully addressed.

**Task 3 - React form with Zod validation and error states: Pass.**
Clean, first attempt. The error state handling was better than I expected - it correctly managed async validation errors alongside synchronous field validation without mixing the two. A small thing, but Composer 2 often conflated those and produced janky UX on form error display.

**Task 4 - PostgreSQL query optimization (N+1 issue identification): Partial.**
I gave it an Express API with a known N+1 on a user/posts relationship and asked it to optimize the data layer. First pass: it identified the problem correctly but fixed it by adding a DataLoader abstraction - which solves N+1 but added unnecessary complexity for a small application. I asked it to reconsider. Second pass: proper JOIN query with correct eager loading. The model got there, but it needed steering. This is the "over-engineers simple tasks" pattern that the training notes tried to address with behavioral calibration - clearly still present on certain query types.

**Task 5 - Python CLI tool with Click: Pass.**
Solid and clean on the first attempt. The argument parsing, help text, and error handling were all well-structured. No surprises here - CLI generation has been a strength of this model family since Composer 2.

**Task 6 - Jest unit test suite for an existing utility library: Pass.**
This was the standout result. I gave it a TypeScript utility library with 12 functions and asked it to write comprehensive Jest tests. Not only did it get full coverage, it caught three edge cases I hadn't explicitly described - including a subtle floating-point precision issue in a currency formatter that I'd been meaning to write a regression test for. This is the behavioral calibration improvement in action: the model understood that "comprehensive tests" means testing edge cases, not just the happy path.

What impressed me was the test organisation as much as the coverage. Composer 2 would often dump all tests into a single flat file with descriptive names but no grouping. Composer 2.5 structured the output with nested `describe` blocks, grouped by function, with a clear `beforeEach` setup that eliminated repetition across related tests. I didn't ask for any of that structure. The model inferred from context that a utility library of that size warrants proper grouping, and applied it without prompting. That kind of judgment - knowing when to apply structure vs. when to stay flat - is exactly what behavioral calibration is supposed to produce, and here it showed.

**Task 7 - Docker Compose config for Node + Redis + PostgreSQL: Pass (minor fix).**
The compose file was correct in structure. One issue: the Redis health check used a TCP check instead of redis-cli ping, which can give false positives on startup. A quick correction and it was solid. On balance this is a pass - the architecture was right, the error was minor and clearly identifiable. The Terminal-Bench gap I mentioned in the benchmarks section showed up here in a minor way but didn't block the task.

**Task 8 - Stripe webhook integration with idempotency key handling: Pass.**
Clean first attempt. Proper signature verification, correct idempotency key storage in Redis, right handling of duplicate events. The Stripe-specific knowledge was accurate and up to date.

**Summary: 6 clear passes, 2 partial passes, 0 failures.** The partials both required a second prompt to resolve, not a fundamental rethink. Compared to my Composer 2 results - which produced 4 passes, 3 partials, and 1 failure on the same tasks - this is a meaningful improvement across the board.

The pattern I'd highlight across all eight: Composer 2.5 is noticeably better at knowing when to stop and ask a clarifying question versus when to just build. Composer 2 would often charge ahead with assumptions on underspecified tasks and produce something plausible but wrong. Composer 2.5, on the PostgreSQL task, paused after its first analysis pass and asked whether I wanted to prioritise query performance or code readability in the fix - a small thing, but the kind of thing that prevents a round of corrections later. That's behavioral calibration working as intended.

The Stripe task is worth a brief extra note: the Stripe API knowledge was current. Previous Composer 2 tests occasionally produced code using deprecated Stripe methods that hadn't existed for two years. Composer 2.5 used the correct `stripe.webhooks.constructEvent` signature and properly imported from the `stripe` v14 package. For tasks where API accuracy matters, the training data quality upgrade from Kimi K2.5 shows.

---

## The Cost Argument

![Composer 2.5 vs competitors pricing table](/images/blog/composer-2-5-pricing.svg)

Pricing is where Composer 2.5 wins the argument. Here are the numbers side by side.

| Model | Input (per M tokens) | Output (per M tokens) | INR Input | INR Output |
|---|---|---|---|---|
| Composer 2.5 Standard | $0.50 | $2.50 | ≈₹46.50 | ≈₹232.50 |
| Composer 2.5 Fast | $3.00 | $15.00 | ≈₹279 | ≈₹1,395 |
| Claude Sonnet 4.6 | $3.00 | $15.00 | ≈₹279 | ≈₹1,395 |
| Claude Opus 4.7 | $15.00 | $75.00 | ≈₹1,395 | ≈₹6,975 |

*Last updated: May 2026. Prices converted at ₹93/USD.*

The Fast tier is the default for interactive sessions inside Cursor - it's what you get when you're coding in real time and need low-latency responses. At $3.00/$15.00 per million tokens, it's priced identically to Claude Sonnet 4.6 but benchmarks above Sonnet on CursorBench and matches Opus 4.7 on SWE-Bench.

The Standard tier ($0.50/$2.50) is for background agent runs and batch processing - longer, non-latency-sensitive tasks where you kick off a job and come back to results. At those prices, a heavy day of agent use that might cost $8-10 through the Opus 4.7 API costs under $0.50 on Standard.

To put it in concrete terms: if you're running Cursor Pro with access to frontier models via [the standard Cursor subscription](/comparison/cursor-vs-github-copilot), Composer 2.5 Standard is what you want for anything that doesn't need instant response. For real-time tab completion and interactive coding, Fast tier gives you Sonnet-level pricing with Opus-level benchmark performance. That combination didn't exist five months ago.

For a full breakdown of how Cursor's pricing stacks up against GitHub Copilot and Windsurf, [the Cursor vs Copilot comparison](/comparison/cursor-vs-github-copilot) and the [Windsurf review](/review/windsurf) cover those in detail. You can also check [Cursor's pricing page directly](https://cursor.com) to verify the current tier structure before subscribing.

---

## Composer 2.5 vs Composer 2 vs Claude Sonnet 4.6

![Three-way comparison table](/images/blog/composer-2-5-three-way.svg)

Three-model comparison - keeping this tight since the [full Composer 2 vs Claude Sonnet piece](/blog/composer-2-vs-claude-sonnet) already covers the deeper analysis. These are the numbers that changed with 2.5.

| Metric | Composer 2 | Composer 2.5 | Claude Sonnet 4.6 |
|---|---|---|---|
| SWE-Bench Multilingual | 73.7% | **79.8%** | ~77% (est.) |
| CursorBench v3.1 | 52.2% | **63.2%** | ~58% (est.) |
| Terminal-Bench | 61.7% | 69.3% | n/a |
| Standard Input (per M) | $0.50 | $0.50 | $3.00 |
| Standard Output (per M) | $2.50 | $2.50 | $15.00 |
| Available outside Cursor | No | No | Yes |

The output quality gap between Composer 2 and 2.5 is larger than the price difference suggests. Identical standard tier pricing, but 11 points higher on CursorBench and meaningfully better real-world behavior on multi-file tasks.

The key caveat vs. Sonnet 4.6: Composer 2.5 only runs inside Cursor. If you're using Claude Code, the API directly, or any other environment, Sonnet 4.6 is still the better portable option. For a full picture of that trade-off in the context of the [Claude Code vs Cursor debate](/blog/claude-code-vs-cursor-vs-codex), that comparison piece is worth reading before you decide.

---

## The SpaceXAI Partnership

![SpaceXAI Partnership](/images/blog/composer-2-5-spacexai.svg)

This section is about what comes after Composer 2.5 - not the model itself, but what Cursor announced alongside it.

In April 2026, Cursor and xAI struck a partnership that gives SpaceX access to Cursor's software tooling and gives Cursor training access to Colossus 2 - xAI's cluster of roughly one million H100-equivalent GPUs. The next Cursor model will be trained from scratch on that infrastructure, using 10x the total compute Composer 2.5 was trained with. No model name has been announced, and no release timeline is confirmed. This is an infrastructure deal, not a product launch.

That's a meaningfully different situation from the current setup. Composer 2 and 2.5 both fine-tune an existing open-source checkpoint (Kimi K2.5). The next model - no name or timeline announced - will be a Cursor-native architecture built on much larger compute. The implication is a model that doesn't inherit the architectural decisions of a checkpoint originally built for general reasoning, but is designed from day one for the specific demands of long-horizon coding agent sessions.

To be clear about what this partnership is not: it's not a product endorsement, it's not an acquisition (though a $60 billion acquisition option reportedly exists with a year-end deadline), and it doesn't change anything about how Composer 2.5 works today.

The practical signal for current users: Cursor is betting heavily on proprietary model development rather than model-agnostic tool building. If that bet lands, the cost-performance position you see with Composer 2.5 could improve substantially in late 2026 or 2027. If it doesn't land, Cursor still has Composer 2.5 - a model that competes at frontier benchmarks for a fraction of the cost.

---

## Should You Switch?

![Composer 2.5 decision guide](/images/blog/composer-2-5-decision.svg)

This is a framework, not a universal recommendation - the right answer depends entirely on what you're building and how you're currently coding.

**Use Composer 2.5 as your default if:** You're already inside Cursor for most of your coding day, your primary tasks involve multi-file TypeScript/JavaScript or Python work, and you're paying for agentic coding runs that currently go to Claude Opus 4.7 or GPT-5.5 via the API. The cost reduction alone justifies the switch for anyone running more than a few agent sessions per week.

The clearest use case: a developer running 20-30 agent sessions a day for feature work. At Opus 4.7 pricing, that's $140-$210 daily in API costs for a heavy session. On Composer 2.5 Standard, that same workload costs under $15. For teams running Cursor at scale - multiple developers, CI integration, automated refactor passes - the math shifts from "nice to save money" to "this changes the budget conversation entirely."

**Use Claude Sonnet 4.6 alongside Composer 2.5 if:** You do meaningful work outside Cursor - API calls, Claude Code in terminal, notebook environments. [Claude Code users in particular](/blog/claude-code-vs-cursor-vs-codex) won't see any benefit from Composer 2.5 since it's Cursor-only. Sonnet 4.6 remains the better portable model for that context.

**Stick with Claude Opus 4.7 if:** Your work is heavy on complex reasoning tasks that aren't primarily coding - architectural decisions, detailed code review with explanation, or anything involving nuanced judgment across a large context window. The [Claude Opus 4.7 review](/blog/claude-opus-4-7-review) covers those use cases in detail, and Opus still leads on tasks where reasoning depth matters more than raw coding throughput.

**Skip Composer 2.5 for now if:** Terminal and shell-scripting tasks are your primary use case. The 13-point Terminal-Bench gap behind GPT-5.5 is real and documented. For DevOps-heavy work or infrastructure automation, GPT-5.5 via Codex in the [Claude Code vs Cursor vs Codex comparison](/blog/claude-code-vs-cursor-vs-codex) is the more honest recommendation. Composer 2.5 doesn't fail on Docker or CI tasks - it got my Docker task right - but GPT-5.5 has a documented, consistent edge in that territory that shows up over many tasks rather than in any single run.

**On the free tier:** Cursor's free plan does give access to Composer 2.5 with usage limits. If you're evaluating before committing to a paid plan, [the Windsurf review](/review/windsurf) is worth reading first - Windsurf's unlimited free tier is still the most generous in the category, and it's the right starting point if you're cost-sensitive and evaluating options.

---

## The Verdict

![Composer 2.5 Final Scores](/images/blog/composer-2-5-verdict.svg)

| Score | Rating |
|---|---|
| Ease of Use | 80/100 |
| Output Quality | 84/100 |
| Value for Money | 95/100 |
| Feature Depth | 76/100 |
| Free Tier | 52/100 |
| **Overall** | **4.2/5** |

Composer 2.5 is the most cost-efficient frontier coding model available right now. Standard tier at $0.50/$2.50 per million tokens (≈₹46.50/≈₹232.50) for performance that matches Opus 4.7 on SWE-Bench is not a minor pricing difference - it changes the economics of running agentic coding sessions entirely.

The caveats are real: it's Cursor-only, it still has the auth edge-case and over-engineering patterns that appeared in Composer 2, and the Terminal-Bench gap vs. GPT-5.5 is a clear limitation for infrastructure-heavy work.

The thing I keep coming back to is the iteration economics. Most developers I've spoken to aren't blocked by output quality when they use Claude Opus 4.7 - they're blocked by cost anxiety. They scope down agent runs, add more manual checkpoints, avoid letting the model take long multi-step passes because each one costs real money. Composer 2.5 Standard tier removes most of that friction at a quality level that's now close enough to Opus that the trade-off is hard to argue against for everyday coding work.

Where I was wrong going into this review: I expected a modest quality bump with the same cost structure. The CursorBench improvement from 52.2% to 63.2% is larger than that. Combined with the behavioral calibration improvements I saw on the test suite and multi-file tasks, this is a more material upgrade than the version number suggests. The jump from Composer 2 to 2.5 is bigger in practice than the jump from Composer 1 to 2 was.

For everyday TypeScript, Python, and React development inside Cursor, it's the best default model available today.

---

## FAQ

**Is Composer 2.5 available for free?**
Cursor's free plan includes limited access to Composer 2.5. The free tier allows a set number of agent requests per month before requiring a paid plan. Composer 2.5 Standard tier is the more affordable option for heavy usage at $0.50/$2.50 per million tokens (≈₹46.50/≈₹232.50).

**What is Composer 2.5's SWE-Bench score?**
Composer 2.5 scores 79.8% on SWE-Bench Multilingual, up from 73.7% on Composer 2. This puts it in the same performance band as Claude Opus 4.7 and GPT-5.5 on that benchmark.

**How does Composer 2.5 compare to Claude Sonnet 4.6 on price?**
Composer 2.5 Standard ($0.50/$2.50 per million tokens, ≈₹46.50/≈₹232.50) is 6x cheaper on input and output than Claude Sonnet 4.6 ($3.00/$15.00, ≈₹279/≈₹1,395). The Fast tier matches Sonnet 4.6 on price while scoring above it on Cursor's own CursorBench v3.1.

**What is Composer 2.5 built on?**
Composer 2.5 uses Moonshot's Kimi K2.5 open-source model as its base checkpoint. Cursor then ran an extensive post-training pipeline - 25x more synthetic coding tasks than Composer 2, targeted RL with textual feedback, and behavioral calibration - which accounts for 85% of the total compute used.

**Does Composer 2.5 work outside Cursor?**
No. Composer 2.5 is only available inside the Cursor editor, either via the interactive Fast tier or the background agent Standard tier. It cannot be accessed through an external API. If you need a portable model, Claude Sonnet 4.6 remains the better option.

**What is the catch with Composer 2.5 benchmarks?**
SWE-Bench and CursorBench measure specific, well-scoped tasks. Real-world weaknesses include a 13-point gap behind GPT-5.5 on Terminal-Bench (relevant for shell scripting and infrastructure work), inconsistent handling of JWT refresh token edge cases, and occasional over-engineering of simple tasks.

**What is the SpaceX partnership with Cursor?**
Cursor announced a training partnership with xAI in April 2026, giving it access to Colossus 2 - roughly 1 million H100-equivalent GPUs. This infrastructure will be used to train a future Cursor model from scratch with 10x more compute than Composer 2.5. It's not an acquisition, and it doesn't affect Composer 2.5 today.

**Is Composer 2.5 better than Composer 2?**
Yes, across almost every dimension. SWE-Bench improved from 73.7% to 79.8%; CursorBench v3.1 improved from 52.2% to 63.2%; Terminal-Bench improved from 61.7% to 69.3%. In my 8-task hands-on test, it went from 4 passes and 1 failure to 6 passes and 0 failures.

**Should I switch from Claude to Composer 2.5?**
It depends on your workflow. If you code primarily inside Cursor on TypeScript, Python, or React projects, Composer 2.5 Standard tier offers Opus-level benchmark performance at a fraction of the cost. If you use Claude Code, work outside Cursor, or have terminal-heavy workflows, keeping Claude Sonnet 4.6 or Opus 4.7 as part of your stack makes sense.

---

## Related Reading

[Composer 2 Review](/blog/composer-2-review) | [Composer 2 vs Claude Sonnet 4.6](/blog/composer-2-vs-claude-sonnet) | [Cursor 3 Review](/blog/cursor-3-review) | [Claude Code vs Cursor vs Codex](/blog/claude-code-vs-cursor-vs-codex) | [Claude Opus 4.7 Review](/blog/claude-opus-4-7-review) | [Windsurf Review](/review/windsurf) | [Cursor vs GitHub Copilot](/comparison/cursor-vs-github-copilot)
