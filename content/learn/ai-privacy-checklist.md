---
title: "AI Privacy Checklist for Businesses"
description: "20 questions to ask before deploying any AI tool at your company: data training policies, residency, retention, employee use, and vendor contracts."
publishDate: "2026-06-24"
category: "AI Frameworks"
lastUpdated: "2026-06-24"
slug: "/learn/ai-privacy-checklist"
author: "Ash"
---


Before your company deploys any AI tool, someone needs to ask 20 specific questions - and get written answers to at least 15 of them before a contract gets signed.

I learned this the hard way. In early 2025, I helped a mid-size marketing agency evaluate an AI writing tool.

We were weeks into the pilot before anyone thought to ask whether the vendor was training on client content. The answer was: yes, by default.

The opt-out required a support ticket and took 30 days to process. By then, three client briefs had already been ingested.

This checklist exists so that doesn't happen to you.

It covers AI privacy from five angles: vendor evaluation, data handling mechanics, internal policy, red flags I've encountered testing real tools, and a step-by-step review process you can actually run. This is not a compliance document.

It's a practical guide for anyone who has to make real decisions about real tools.

---

## Why AI Privacy Is Different From Regular Software Privacy

The fundamental difference between AI privacy and regular software privacy is that AI tools can learn from your data and encode it into model weights - making "deletion" a truly complicated concept.

With a standard SaaS tool, deleting your data is relatively clean. The database rows get removed, the backups cycle out, and the data is gone.

With AI tools - especially those that allow fine-tuning or that use your interactions to improve the model - deletion is much harder to guarantee. A piece of confidential information that was used in a training run may be encoded in the model's weights in ways that are difficult or impossible to reverse.

This is not hypothetical. Researchers demonstrated in 2023 that large language models can reproduce training data verbatim under certain prompting conditions.

The paper from Google DeepMind showed that models memorize training examples at measurable rates.

This creates three categories of risk that don't exist with regular software:

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="340" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="350" y="36" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">AI Privacy vs. Regular Software Privacy</text>
  <!-- Column headers -->
  <rect x="40" y="56" width="190" height="36" rx="8" fill="#6B7C5E" opacity="0.2"/>
  <text x="135" y="79" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Risk Category</text>
  <rect x="245" y="56" width="190" height="36" rx="8" fill="#96845A" opacity="0.15"/>
  <text x="340" y="79" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Regular SaaS</text>
  <rect x="450" y="56" width="210" height="36" rx="8" fill="#6B7C5E" opacity="0.3"/>
  <text x="555" y="79" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">AI Tools</text>
  <!-- Row 1 -->
  <rect x="40" y="102" width="620" height="58" rx="8" fill="#DDD8CE" opacity="0.4"/>
  <text x="135" y="126" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">Data Deletion</text>
  <text x="135" y="143" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">How final is it?</text>
  <text x="340" y="134" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Rows removed, backups cycle</text>
  <text x="555" y="126" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">May persist in model weights</text>
  <text x="555" y="143" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">hard to guarantee</text>
  <!-- Row 2 -->
  <rect x="40" y="170" width="620" height="58" rx="8" fill="#DDD8CE" opacity="0.2"/>
  <text x="135" y="194" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">Data Residency</text>
  <text x="135" y="211" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Where does it go?</text>
  <text x="340" y="202" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Known server region</text>
  <text x="555" y="194" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Training may use other regions</text>
  <text x="555" y="211" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">inference vs. training differ</text>
  <!-- Row 3 -->
  <rect x="40" y="238" width="620" height="58" rx="8" fill="#DDD8CE" opacity="0.4"/>
  <text x="135" y="262" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">Third-Party Sharing</text>
  <text x="135" y="279" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Who else sees it?</text>
  <text x="340" y="270" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Listed in DPA, auditable</text>
  <text x="555" y="262" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Subprocessors for GPU compute</text>
  <text x="555" y="279" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">often undisclosed</text>
</svg>

The second major difference is inference logs. Every time someone at your company prompts an AI tool, that prompt is processed somewhere.

Many vendors log those prompts - for abuse detection, quality improvement, or debugging. That log is a record of your team's work, your client names, your internal context, and your strategic thinking.

The third difference is the gap between what the marketing page says and what the terms of service actually allow. I've read enough AI vendor ToS documents at this point to know: the two rarely match completely.

The checklist below is designed to surface that gap before you sign anything.

I'd also flag that AI privacy intersects heavily with where the model runs. If you're deciding between cloud and local deployment, [this comparison of cloud AI vs. local AI](/blog/when-to-use-cloud-ai-vs-local-ai) is worth reading alongside this guide.

[The open-source vs. closed AI tradeoffs](/blog/open-source-vs-closed-ai) matter here too - because self-hosted open-source models give you the strongest privacy guarantees by default.

---

## The 5 Data Risk Categories in AI Tools

Every AI tool your business uses creates risk across five distinct data categories - and each one requires a different set of questions.

Understanding these categories is the foundation of everything else in this checklist. When I evaluate a vendor now, I map each of these five buckets explicitly before moving to the Q&A phase.

It takes about 20 minutes and it has saved me from several near-misses.

<svg viewBox="0 0 700 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="420" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="350" y="34" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">5 AI Data Risk Categories</text>
  <!-- Category 1 -->
  <rect x="40" y="54" width="620" height="62" rx="10" fill="#6B7C5E" opacity="0.12" stroke="#6B7C5E" stroke-width="1"/>
  <text x="64" y="78" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">1. Training Data</text>
  <text x="64" y="96" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Does vendor use your prompts/content to train or fine-tune models?</text>
  <rect x="570" y="66" width="72" height="26" rx="6" fill="#96845A" opacity="0.25"/>
  <text x="606" y="83" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#3A3228">HIGH RISK</text>
  <!-- Category 2 -->
  <rect x="40" y="128" width="620" height="62" rx="10" fill="#6B7C5E" opacity="0.08" stroke="#DDD8CE" stroke-width="1"/>
  <text x="64" y="152" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">2. Inference Logs</text>
  <text x="64" y="170" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Are prompts and responses stored? For how long? Who can access them?</text>
  <rect x="570" y="140" width="72" height="26" rx="6" fill="#96845A" opacity="0.25"/>
  <text x="606" y="157" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#3A3228">HIGH RISK</text>
  <!-- Category 3 -->
  <rect x="40" y="202" width="620" height="62" rx="10" fill="#6B7C5E" opacity="0.12" stroke="#6B7C5E" stroke-width="1"/>
  <text x="64" y="226" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">3. Output Storage</text>
  <text x="64" y="244" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Are AI-generated outputs cached or stored on vendor servers?</text>
  <rect x="560" y="214" width="82" height="26" rx="6" fill="#6B7C5E" opacity="0.2"/>
  <text x="601" y="231" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#3A3228">MED RISK</text>
  <!-- Category 4 -->
  <rect x="40" y="276" width="620" height="62" rx="10" fill="#6B7C5E" opacity="0.08" stroke="#DDD8CE" stroke-width="1"/>
  <text x="64" y="300" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">4. Third-Party Sharing</text>
  <text x="64" y="318" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Which subprocessors handle your data? What are their data policies?</text>
  <rect x="570" y="288" width="72" height="26" rx="6" fill="#96845A" opacity="0.25"/>
  <text x="606" y="305" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#3A3228">HIGH RISK</text>
  <!-- Category 5 -->
  <rect x="40" y="350" width="620" height="52" rx="10" fill="#6B7C5E" opacity="0.12" stroke="#6B7C5E" stroke-width="1"/>
  <text x="64" y="374" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">5. Data Residency</text>
  <text x="64" y="392" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Where is data stored and processed? Does it cross jurisdictions?</text>
  <rect x="560" y="362" width="82" height="26" rx="6" fill="#6B7C5E" opacity="0.2"/>
  <text x="601" y="379" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#3A3228">MED RISK</text>
</svg>

**Training data risk** is the highest-stakes category. Some vendors - particularly consumer-focused AI products - explicitly reserve the right to use your prompts to improve their models. This can be opt-out rather than opt-in, and opt-out can require specific enterprise plan tiers. If you're using an AI tool on a free or entry-level plan, assume your data is being used for training unless the documentation explicitly states otherwise.

**Inference logs** are the category most people overlook. Every prompt your team sends gets processed on vendor infrastructure, and those logs frequently get retained for 30, 60, or 90 days as a default. Some vendors retain them indefinitely unless you request deletion. Those logs contain a lot: your business logic, your client names, your internal decision-making process.

**Output storage** matters when the AI tool has a built-in history feature. The concern is less about vendor misuse and more about: what happens if there's a breach? A vendor's cloud storage containing six months of AI-generated outputs from your team is a significant exposure.

**Third-party sharing** often comes via GPU compute subprocessors. Many AI startups are not running their own compute - they're calling OpenAI, Anthropic, or Google APIs on your behalf, or using AWS/Azure/GCP for inference. That means your data flows through their terms of service as well. Each subprocessor in the chain is another potential exposure point.

**Data residency** has become legally significant, particularly for companies with EU customers under GDPR, or US federal contractors under certain FedRAMP requirements. Knowing where data is physically stored matters - but for AI tools, note that training infrastructure may be in a different region than inference infrastructure.

---

## Vendor Evaluation: 10 Questions to Ask Before Signing

The single most important rule for AI vendor evaluation: ask for written answers, not verbal assurances - and get them before contract signature, not after.

I've been in enough vendor conversations to know that sales teams often don't know the answers to these questions off the top of their heads. That's not necessarily a red flag - privacy details are legitimately complex.

But it is a red flag if answers never come, come in vague language, or differ from what the ToS actually says when you go back and check.

Here are the 10 questions I ask every AI vendor, in order, with notes on what a good answer looks like versus a bad one.

<svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="500" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="350" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">Vendor Q&amp;A: Answer Quality Spectrum</text>
  <!-- Header row -->
  <text x="54" y="58" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#8A8577">QUESTION</text>
  <text x="330" y="58" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#6B7C5E">GOOD ANSWER</text>
  <text x="530" y="58" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#96845A">BAD ANSWER</text>
  <line x1="40" y1="66" x2="660" y2="66" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Q1 -->
  <text x="54" y="86" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">1. Training on my data?</text>
  <text x="330" y="86" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">No, or opt-in only, in writing</text>
  <text x="530" y="86" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"We take privacy seriously"</text>
  <line x1="40" y1="96" x2="660" y2="96" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q2 -->
  <text x="54" y="116" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">2. Prompt retention period?</text>
  <text x="330" y="116" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Specific number of days</text>
  <text x="530" y="116" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"As needed for operations"</text>
  <line x1="40" y1="126" x2="660" y2="126" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q3 -->
  <text x="54" y="146" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">3. Subprocessor list?</text>
  <text x="330" y="146" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Public URL with named vendors</text>
  <text x="530" y="146" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">No list, or "contact us"</text>
  <line x1="40" y1="156" x2="660" y2="156" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q4 -->
  <text x="54" y="176" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">4. Data residency options?</text>
  <text x="330" y="176" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Named regions, EU available</text>
  <text x="530" y="176" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"Global infrastructure"</text>
  <line x1="40" y1="186" x2="660" y2="186" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q5 -->
  <text x="54" y="206" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">5. Data deletion process?</text>
  <text x="330" y="206" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Defined SLA, model weights too</text>
  <text x="530" y="206" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"Submit a request"</text>
  <line x1="40" y1="216" x2="660" y2="216" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q6 -->
  <text x="54" y="236" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">6. Security certifications?</text>
  <text x="330" y="236" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">SOC 2 Type II, ISO 27001</text>
  <text x="530" y="236" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"In progress" without dates</text>
  <line x1="40" y1="246" x2="660" y2="246" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q7 -->
  <text x="54" y="266" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">7. DPA available?</text>
  <text x="330" y="266" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Standard DPA, GDPR-ready</text>
  <text x="530" y="266" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"Enterprise only" without price</text>
  <line x1="40" y1="276" x2="660" y2="276" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q8 -->
  <text x="54" y="296" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">8. Breach notification?</text>
  <text x="330" y="296" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">72-hour notification SLA</text>
  <text x="530" y="296" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"Promptly" without definition</text>
  <line x1="40" y1="306" x2="660" y2="306" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q9 -->
  <text x="54" y="326" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">9. Employee access to data?</text>
  <text x="330" y="326" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Logged, role-based, auditable</text>
  <text x="530" y="326" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"Authorized personnel only"</text>
  <line x1="40" y1="336" x2="660" y2="336" stroke="#DDD8CE" stroke-width="0.5"/>
  <!-- Q10 -->
  <text x="54" y="356" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#3A3228">10. ToS change notice?</text>
  <text x="330" y="356" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">30-day written notice required</text>
  <text x="530" y="356" font-family="system-ui,sans-serif" font-size="10" fill="#96845A">"We may update at any time"</text>
  <line x1="40" y1="366" x2="660" y2="366" stroke="#DDD8CE" stroke-width="1"/>
  <!-- Legend -->
  <rect x="40" y="384" width="620" height="96" rx="8" fill="#DDD8CE" opacity="0.35"/>
  <text x="60" y="406" font-family="system-ui,sans-serif" font-size="11" font-weight="700" fill="#4A5942">Key principle:</text>
  <text x="60" y="424" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Vague language in ToS always resolves in favor of the vendor, not you.</text>
  <text x="60" y="442" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">If it says "we may use data to improve services," that means training.</text>
  <text x="60" y="460" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Get specifics or negotiate specific language into the contract.</text>
</svg>

**Question 1: Does the vendor train on customer data by default, and how do I opt out?**

A good answer is: no, we do not train on API or enterprise customer data, and here is the documentation confirming that. A bad answer is any version of "we use data to improve our services" without specifics.

That phrase is load-bearing language in most AI ToS documents - it means training. If the opt-out requires an enterprise plan, find out the price before you go further.

**Question 2: How long are prompts and responses retained, and who can access them?**

Good: 30 days for abuse detection, deleted after that, accessible only by security and trust & safety teams under logged access. Bad: "as long as necessary for operational purposes." That's legally meaningless and practically indefinite.

**Question 3: Do you have a public subprocessor list?**

This question is underused. AI tools often rely on three or four other vendors to actually function - the model provider, the cloud compute provider, a database vendor, maybe an analytics layer.

Each of those is processing your data. A vendor that can't or won't give you a named subprocessor list is hiding significant information.

Check whether their data processing agreement (DPA) commits them to notifying you of subprocessor changes - and within what timeframe.

**Question 4: Can you provide data residency guarantees for EU or specific-region storage?**

For any company with EU operations or EU customers, GDPR requires that personal data either stays in the EU or is transferred under appropriate safeguards (Standard Contractual Clauses, adequacy decisions, etc.). Ask specifically whether training runs also stay in-region, not just inference.

They often differ.

**Question 5: What is your process for data deletion, and does it cover model weights?**

This is the hardest question for vendors to answer well because the honest answer for most of them is: we can delete your account data but we cannot guarantee removal from model weights after training. Get the vendor to be explicit about this limitation.

If they can't acknowledge it, that's a red flag.

**Question 6: What security certifications do you hold, and can I see the audit reports?**

SOC 2 Type II is the minimum bar for enterprise AI tools. ISO 27001 is a plus.

"In progress" is not a certification. Ask for the date range of the most recent audit and whether you can review the report under NDA.

Ask for the date range of the most recent audit and whether you can review the report under NDA.

**Question 7: Is a Data Processing Agreement available, and what does it cost?**

Under GDPR, if you're a controller and the vendor is a processor, you are legally required to have a DPA in place. Some vendors make this an enterprise-only feature at significant additional cost.

Know this before you pilot.

**Question 8: What is your breach notification policy and timeline?**

GDPR requires 72-hour notification to supervisory authorities. Your vendor contract should reflect that timeline or better.

"We will notify you promptly" without a defined timeframe is not adequate.

**Question 9: Which of your employees can access my data, and under what conditions?**

The answer should reference role-based access controls, logging of all access events, and a defined process for authorized access. If human review of conversations is part of their quality or safety process (it is, at most consumer AI companies), you should know this explicitly.

**Question 10: How will I be notified of changes to your privacy terms?**

AI companies update their terms frequently as products and regulations evolve. Your contract should include a provision requiring advance notice - ideally 30 days - before any material change to how your data is handled.

Without this, a vendor can change their training policy with a website update and a "continued use constitutes acceptance" clause.

If you're also evaluating the underlying model (not just the wrapper product), [this comparison of leading AI models](/blog/how-to-choose-an-ai-model-for-your-business) includes privacy notes for each. And if you're using any of the [best AI agents](/blog/best-ai-agents-2026) on the market, many of them inherit the privacy posture of the model they're built on - which is often less visible than the agent interface itself.

---

## Internal Policy: What to Tell Your Team About AI Use

The most overlooked AI privacy gap in businesses is not vendor policy - it is the absence of any internal policy about what employees are allowed to put into AI tools.

I see this pattern constantly. A company runs a thorough vendor evaluation, signs a solid contract, and then their team members spend the next six months pasting customer PII, source code, financial projections, and legal correspondence into AI chat windows without any guidance.

The vendor's privacy controls cannot protect you from your own employees making uninformed decisions.

Internal policy for AI tools needs to cover four things: what data categories are allowed, what tools are approved, how to handle AI-generated output, and how to report incidents.

<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="380" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="350" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">Internal AI Policy - 4 Coverage Areas</text>
  <!-- Quadrant 1 top-left -->
  <rect x="40" y="52" width="300" height="140" rx="12" fill="#6B7C5E" opacity="0.12" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="190" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">1. Data Classification</text>
  <text x="60" y="102" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Green: public info, generic tasks</text>
  <text x="60" y="122" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Yellow: internal, non-sensitive</text>
  <text x="60" y="142" font-family="system-ui,sans-serif" font-size="11" fill="#96845A">Red: PII, financials, legal docs</text>
  <text x="60" y="162" font-family="system-ui,sans-serif" font-size="11" fill="#96845A">Red: source code, client data</text>
  <!-- Quadrant 2 top-right -->
  <rect x="360" y="52" width="300" height="140" rx="12" fill="#96845A" opacity="0.1" stroke="#96845A" stroke-width="1.5"/>
  <text x="510" y="78" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">2. Approved Tools</text>
  <text x="380" y="102" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Maintain approved tool list</text>
  <text x="380" y="122" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Block unapproved AI services</text>
  <text x="380" y="142" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Review list quarterly</text>
  <text x="380" y="162" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Include browser extensions</text>
  <!-- Quadrant 3 bottom-left -->
  <rect x="40" y="212" width="300" height="140" rx="12" fill="#6B7C5E" opacity="0.08" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="190" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">3. Output Handling</text>
  <text x="60" y="262" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">AI output is not source-of-truth</text>
  <text x="60" y="282" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Verify before using externally</text>
  <text x="60" y="302" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Label AI-generated content</text>
  <text x="60" y="322" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Follow [hallucination](/blog/what-is-hallucination-in-ai) policy</text>
  <!-- Quadrant 4 bottom-right -->
  <rect x="360" y="212" width="300" height="140" rx="12" fill="#96845A" opacity="0.08" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="510" y="238" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#4A5942">4. Incident Reporting</text>
  <text x="380" y="262" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Clear escalation path</text>
  <text x="380" y="282" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">No punishment for self-reporting</text>
  <text x="380" y="302" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Define "incident" clearly</text>
  <text x="380" y="322" font-family="system-ui,sans-serif" font-size="11" fill="#3A3228">Document and review patterns</text>
</svg>

**Data classification is the starting point.** Before you can tell employees what not to put into AI tools, you need a shared vocabulary for data sensitivity. The simplest framework I've seen that actually works in practice is a three-tier system: green (publicly shareable, no restrictions), yellow (internal but non-sensitive, approved tools only), red (restricted - PII, financials, legal matters, source code, client data, unreleased product plans).

One thing I'd add to that framework: classify by what the data reveals, not just what it is. A list of customer names is PII, obviously.

But a project status update that names a specific customer deal and its estimated close date is also sensitive even if it contains no technically regulated data.

Most employees using AI tools for the first time do not instinctively think of the prompt as a data transfer. They think of it as asking a question.

Part of internal policy is reframing this: every prompt is data you're sending to a third-party service, and it should be treated as such. The mental model shift from "asking" to "transferring" changes behavior more than any policy document.

**The approved tool list is not optional.** One of the most common privacy incidents I hear about is employees discovering a consumer AI tool on their own and using it for work tasks before IT has evaluated it. The AI browser extension problem is particularly bad - there are dozens of extensions that intercept browser text, offer AI assistance, and send that content to unknown endpoints. Your policy needs to explicitly cover browser extensions, not just standalone apps.

My recommendation: maintain an IT-approved list, publish it clearly, and pair it with a simple process to request evaluation of new tools. This last part matters because if the approved list is hard to change, employees route around it.

**Output handling policy should include a verification requirement** for anything being used externally - sent to clients, published, or used in decision-making. [Hallucinations in AI](/blog/what-is-hallucination-in-ai) are still a real operational risk, and AI-generated content that contains fabricated facts or fake citations can create legal exposure beyond just privacy risk.

**Incident reporting needs to be psychologically safe.** If an employee accidentally pastes client PII into a non-approved tool, the worst outcome for your organization is that they don't tell anyone. Create a reporting path with explicit "no punishment for good-faith self-reporting" language. The faster you know about an incident, the more options you have.

For teams where AI tools are becoming central to workflows - and that's increasingly every team - you'll also want to think about how this intersects with your overall [AI tool stack decisions](/blog/how-to-build-an-ai-tool-stack). Tool sprawl is a privacy risk multiplier.

---

## The Privacy Red Flags I've Found in Popular AI Tools

Testing AI tools for privacy compliance is one of the more tedious parts of running this site - but it has produced some concrete findings that I couldn't have gotten from reading documentation alone.

I'll be specific about what I found, without turning this into a full vendor teardown (those are in the individual [reviews](/review/cursor) section). The goal is to illustrate what red flags look like in practice, so you can spot them yourself.

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="360" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="350" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">Privacy Red Flag Severity Scale</text>
  <!-- Y-axis label -->
  <text x="22" y="200" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577" writing-mode="vertical-lr">SEVERITY</text>
  <!-- Bars -->
  <!-- Bar 1 -->
  <rect x="68" y="260" width="72" height="30" rx="6" fill="#DDD8CE"/>
  <rect x="68" y="190" width="72" height="70" rx="6" fill="#6B7C5E" opacity="0.5"/>
  <text x="104" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Vague ToS</text>
  <text x="104" y="322" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">language</text>
  <text x="104" y="182" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">Low</text>
  <!-- Bar 2 -->
  <rect x="168" y="260" width="72" height="30" rx="6" fill="#DDD8CE"/>
  <rect x="168" y="155" width="72" height="105" rx="6" fill="#6B7C5E" opacity="0.65"/>
  <text x="204" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Missing</text>
  <text x="204" y="322" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">subprocessors</text>
  <text x="204" y="147" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#4A5942">Medium</text>
  <!-- Bar 3 -->
  <rect x="268" y="260" width="72" height="30" rx="6" fill="#DDD8CE"/>
  <rect x="268" y="120" width="72" height="140" rx="6" fill="#96845A" opacity="0.6"/>
  <text x="304" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Training</text>
  <text x="304" y="322" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">opt-out hidden</text>
  <text x="304" y="112" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#96845A">High</text>
  <!-- Bar 4 -->
  <rect x="368" y="260" width="72" height="30" rx="6" fill="#DDD8CE"/>
  <rect x="368" y="100" width="72" height="160" rx="6" fill="#96845A" opacity="0.75"/>
  <text x="404" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">No DPA</text>
  <text x="404" y="322" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">available</text>
  <text x="404" y="92" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#96845A">High</text>
  <!-- Bar 5 -->
  <rect x="468" y="260" width="72" height="30" rx="6" fill="#DDD8CE"/>
  <rect x="468" y="68" width="72" height="192" rx="6" fill="#96845A" opacity="0.9"/>
  <text x="504" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Data used</text>
  <text x="504" y="322" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">in training</text>
  <text x="504" y="60" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#96845A">Critical</text>
  <!-- Bar 6 -->
  <rect x="568" y="260" width="72" height="30" rx="6" fill="#DDD8CE"/>
  <rect x="568" y="56" width="72" height="204" rx="6" fill="#96845A"/>
  <text x="604" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Unencrypted</text>
  <text x="604" y="322" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">storage</text>
  <text x="604" y="48" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" font-weight="700" fill="#96845A">Critical</text>
  <!-- Horizontal base line -->
  <line x1="54" y1="260" x2="660" y2="260" stroke="#DDD8CE" stroke-width="1.5"/>
</svg>

**Red flag 1: The opt-out is buried in account settings under a non-obvious label.**

I found this pattern in at least three AI productivity tools in 2025. The training opt-out existed, but it was labeled something like "Contribute to product improvements" in a General Settings panel, not in a Privacy section.

It was on by default. If you weren't specifically looking for it, you would never find it.

In one case, the setting was only available to workspace admins, not individual users - which means individual contributors on the team had no ability to opt out even if they found the setting.

**Red flag 2: Free plan terms differ materially from paid plan terms.**

Several AI tools operate with a split privacy policy: one set of terms for free users (typically including training rights on inputs) and a different set for paid business accounts. This is not always prominently disclosed.

If your team started on a free plan and migrated to a paid plan, verify that the transition actually changed your data handling terms, rather than just your billing status. I have seen at least one case where the transition required a separate opt-out action that was not triggered automatically by the plan upgrade.

**Red flag 3: The security page is updated, but the ToS is not.**

This is a subtle one. Vendors often update their security documentation (adding new certifications, listing new infrastructure controls) while the actual ToS that governs data use stays unchanged.

Read both. The ToS is the legally binding document.

The security page is marketing.

**Red flag 4: Subprocessor lists with no update mechanism.**

A vendor with a subprocessor list is better than one without. But a subprocessor list with no stated update frequency, and no notification mechanism when it changes, is incomplete.

In my testing, I found one vendor who had added two new subprocessors to their list between my Q1 and Q3 checks, with no customer notification at all. One of those new subprocessors was located in a jurisdiction that would have been a compliance issue for EU-based customers.

**Red flag 5: "Zero data retention" claims that apply only to the API, not the application.**

This is common with tools built on top of models from major providers. The underlying model API may have a zero-retention policy - meaning the model provider does not store your prompts.

But the application layer (the vendor you're actually paying) may store prompts extensively for their own logging, analytics, and product improvement purposes. The "zero retention" claim is technically true and practically misleading.

I found this exact pattern when testing a code completion tool in late 2025. The marketing page prominently featured "zero data retention" language.

The actual data flow was: prompt sent to the vendor application, logged in their system, then forwarded to the model provider API under zero-retention terms. The vendor's own logging was retention period 90 days, not zero.

You can also [use our transparency index](/tools/transparency-index) to see vendor ratings on several of these dimensions - we've been building this out through 2026 with crowdsourced and first-party testing data.

---

## High-Risk vs Low-Risk AI Use Cases

Not all AI use is equally risky from a privacy standpoint - and a practical risk framework lets you move fast on low-risk tasks while being appropriately careful on high-risk ones.

The categorization that works best in my experience maps two variables: the sensitivity of the input data, and the auditability of the output.

<svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="440" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="350" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">AI Use Case Risk Matrix</text>
  <!-- Axis labels -->
  <text x="350" y="420" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#8A8577">INPUT DATA SENSITIVITY</text>
  <text x="350" y="56" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">High Sensitivity</text>
  <text x="350" y="390" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#8A8577">Low Sensitivity</text>
  <text x="18" y="230" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="#8A8577">OUTPUT AUDITABILITY</text>
  <text x="20" y="76" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Low</text>
  <text x="20" y="370" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">High</text>
  <!-- Quadrant fills -->
  <!-- Top-left: HIGH input, LOW audit = CRITICAL -->
  <rect x="54" y="64" width="296" height="160" rx="10" fill="#96845A" opacity="0.2" stroke="#96845A" stroke-width="1.5"/>
  <text x="202" y="92" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#96845A">CRITICAL RISK</text>
  <text x="202" y="114" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI drafting legal documents</text>
  <text x="202" y="132" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">from confidential case files</text>
  <text x="202" y="152" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI analyzing patient records</text>
  <text x="202" y="172" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI coding with proprietary repo</text>
  <text x="202" y="207" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-style="italic" fill="#8A8577">Avoid or use isolated deployment</text>
  <!-- Top-right: HIGH input, HIGH audit = HIGH -->
  <rect x="360" y="64" width="296" height="160" rx="10" fill="#96845A" opacity="0.1" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="508" y="92" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">HIGH RISK</text>
  <text x="508" y="114" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Summarizing earnings calls</text>
  <text x="508" y="132" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI answering HR policy questions</text>
  <text x="508" y="152" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI analyzing customer feedback</text>
  <text x="508" y="172" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">with PII included</text>
  <text x="508" y="207" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-style="italic" fill="#8A8577">Approved vendors only, DPA required</text>
  <!-- Bottom-left: LOW input, LOW audit = MEDIUM -->
  <rect x="54" y="242" width="296" height="130" rx="10" fill="#6B7C5E" opacity="0.1" stroke="#DDD8CE" stroke-width="1.5"/>
  <text x="202" y="270" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">MEDIUM RISK</text>
  <text x="202" y="292" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI writing marketing copy</text>
  <text x="202" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">with creative brief (internal)</text>
  <text x="202" y="328" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI generating product descriptions</text>
  <text x="202" y="360" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-style="italic" fill="#8A8577">Approved vendors, review outputs</text>
  <!-- Bottom-right: LOW input, HIGH audit = LOW -->
  <rect x="360" y="242" width="296" height="130" rx="10" fill="#6B7C5E" opacity="0.18" stroke="#6B7C5E" stroke-width="1.5"/>
  <text x="508" y="270" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">LOW RISK</text>
  <text x="508" y="292" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI drafting email templates</text>
  <text x="508" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI explaining public concepts</text>
  <text x="508" y="328" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">AI formatting public datasets</text>
  <text x="508" y="360" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" font-style="italic" fill="#8A8577">Any approved tool, standard care</text>
</svg>

The critical-risk quadrant - high-sensitivity input data combined with low auditability of output - is where most AI-related privacy incidents happen. The combination of sensitive source material and outputs that are hard to verify creates maximum exposure.

Legal drafting from confidential case files, medical record analysis, and coding assistance with proprietary source code all fall here.

Note that these aren't uses you necessarily need to avoid. They're uses that require a higher level of control: isolated deployment (self-hosted or a private enterprise API endpoint), explicit contractual prohibitions on training, mandatory human review of outputs, and logging of all AI-assisted work product.

**The medium-risk middle ground is where most business AI use actually lives.** Marketing copy based on internal briefs, sales emails using CRM context, product descriptions from internal specs - these aren't high-sensitivity inputs, but they're not fully public either. Internal strategy and branding context is worth protecting even if it's not regulated data.

For medium-risk use cases, the key controls are: approved vendor list, prohibition on pasting customer PII even into "safe" context, and a review step before external use.

**Low-risk AI use is often undertreated as if it were high-risk**, which creates the shadow-IT problem. If employees feel that any AI use is forbidden or burdensome to navigate, they route around the approved process. A clear low-risk category - with explicit examples and approved tools - reduces that pressure.

This maps to [how you evaluate AI output quality](/blog/how-to-evaluate-ai-output-quality) in practice. Low-risk tasks can tolerate lighter verification.

High-risk tasks need systematic review, especially for [hallucination risks](/blog/what-is-hallucination-in-ai) that could compound a privacy problem. A factually wrong AI output that also contains confidential source data in its reasoning chain is a worse outcome than either problem alone.

One practical calibration I've used: if you would be comfortable sending the AI output directly to a client without reading it, you may be in the wrong risk category. That test sounds obvious, but it catches more medium-risk misclassifications than any checklist question I've tried.

The NIST AI Risk Management Framework (NIST AI RMF 1.0, published 2023) provides a more formal version of this categorization for organizations that need regulatory alignment. The govern-map-measure-manage structure from that framework is worth reading if your organization has compliance obligations.

I've found the NIST framework useful as a communication tool with legal and compliance teams, even if the day-to-day implementation ends up being lighter-weight than the full framework implies.

---

## The 5-Step Privacy Review Process Before Any AI Deployment

Every new AI tool at your company should go through a defined review process before it's deployed to the team - and that process should take no more than five working days for a typical business tool.

I developed this process after running informal reviews for about a year and realizing I was repeating the same steps inconsistently. Writing it down made it faster, more thorough, and much easier to delegate.

Here's the version I now use.

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:2rem auto;">
  <!-- Background -->
  <rect width="700" height="400" fill="#F4F1EA" rx="12"/>
  <!-- Title -->
  <text x="350" y="32" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#4A5942">5-Step AI Privacy Review Process</text>
  <!-- Timeline line -->
  <line x1="350" y1="58" x2="350" y2="370" stroke="#DDD8CE" stroke-width="2" stroke-dasharray="4,3"/>
  <!-- Step 1 -->
  <circle cx="350" cy="76" r="16" fill="#6B7C5E"/>
  <text x="350" y="81" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">1</text>
  <rect x="54" y="58" width="270" height="52" rx="10" fill="#6B7C5E" opacity="0.15" stroke="#6B7C5E" stroke-width="1"/>
  <text x="189" y="80" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Data Classification</text>
  <text x="189" y="98" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">What data will this tool touch?</text>
  <text x="56" y="118" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Day 1</text>
  <!-- Step 2 -->
  <circle cx="350" cy="152" r="16" fill="#6B7C5E"/>
  <text x="350" y="157" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">2</text>
  <rect x="376" y="134" width="270" height="52" rx="10" fill="#96845A" opacity="0.12" stroke="#96845A" stroke-width="1"/>
  <text x="511" y="156" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Vendor Documentation</text>
  <text x="511" y="174" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">ToS, privacy policy, DPA review</text>
  <text x="378" y="194" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Day 1-2</text>
  <!-- Step 3 -->
  <circle cx="350" cy="228" r="16" fill="#6B7C5E"/>
  <text x="350" y="233" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">3</text>
  <rect x="54" y="210" width="270" height="52" rx="10" fill="#6B7C5E" opacity="0.15" stroke="#6B7C5E" stroke-width="1"/>
  <text x="189" y="232" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">The 10 Questions</text>
  <text x="189" y="250" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">Written answers from vendor</text>
  <text x="56" y="270" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Day 2-3</text>
  <!-- Step 4 -->
  <circle cx="350" cy="304" r="16" fill="#6B7C5E"/>
  <text x="350" y="309" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">4</text>
  <rect x="376" y="286" width="270" height="52" rx="10" fill="#96845A" opacity="0.12" stroke="#96845A" stroke-width="1"/>
  <text x="511" y="308" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Legal / Compliance Sign-Off</text>
  <text x="511" y="326" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#3A3228">GDPR, HIPAA, internal policy</text>
  <text x="378" y="346" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Day 3-4</text>
  <!-- Step 5 -->
  <circle cx="350" cy="362" r="16" fill="#96845A"/>
  <text x="350" y="367" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#F4F1EA">5</text>
  <rect x="54" y="346" width="270" height="38" rx="10" fill="#96845A" opacity="0.2" stroke="#96845A" stroke-width="1"/>
  <text x="189" y="369" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#4A5942">Team Communication</text>
  <text x="56" y="392" font-family="system-ui,sans-serif" font-size="9" fill="#8A8577">Day 4-5</text>
</svg>

**Step 1: Data classification (Day 1)**

Before contacting the vendor, answer internally: what data will this tool actually process? Think through the real-world workflow, not just the intended use case.

A document summarization tool used for "internal meeting notes" might end up processing earnings call recordings, customer complaint logs, and board materials, depending on who starts using it. Map the plausible data flows, not just the ideal ones.

If the tool will touch any red-category data (PII, financials, legal, source code), flag this upfront. It determines what level of contractual controls you need.

**Step 2: Vendor documentation review (Days 1-2)**

Read three documents: the privacy policy, the terms of service, and the data processing agreement (if one exists). Focus specifically on: training rights language, inference log retention, subprocessor disclosure, deletion process, and ToS change notification.

Flag any vague language for follow-up.

This step is also where I check whether the security certifications claim (SOC 2, ISO 27001) is backed by actual reports or just marketing copy. A certification that expired two years ago is not a current control.

**Step 3: The 10 questions (Days 2-3)**

Send the vendor the written questions from the section above. Give them 48 hours to respond.

If they respond quickly with specific, documented answers, that is itself a positive signal - it means they handle these questions regularly and have thought about them. If you get vague or delayed responses, that is a signal too.

Treat this step as a negotiation opener if needed. Many AI vendors will modify their standard DPA terms for enterprise customers, especially around training opt-out and retention period.

The ask needs to come in writing, and the agreement needs to be reflected in the contract, not just stated verbally.

**Step 4: Legal and compliance sign-off (Days 3-4)**

Depending on your organization's compliance obligations, this step may be a quick checkbox or a substantive review. At minimum, confirm that the deployment is consistent with GDPR obligations if you have EU data subjects, any sector-specific regulations (HIPAA for healthcare, SOC for financial services, etc.), and your existing data handling policies and any client or partner contractual obligations.

The client contract angle is one that catches people off guard. If you have customers whose contracts specify data handling requirements - which many enterprise contracts do - an AI tool that processes customer data may need to be evaluated against those contracts as well.

**Step 5: Team communication (Days 4-5)**

Approval means nothing if the team doesn't know what approved use looks like. For each approved AI tool, prepare a one-page internal summary: what the tool is approved for, what data categories are off-limits, how outputs should be handled, and who to contact with questions.

This does not need to be a formal policy document - a Notion page or internal wiki entry is fine.

The goal is to make the right choice the easy choice. If employees know the rules are accessible and clear, compliance improves significantly.

I've also found it helps to include a worked example in the team summary. Show the team a real scenario: "If you want to use [Approved Tool X] to summarize a customer call transcript, here is what you do and what you don't paste into the prompt." Concrete examples beat abstract policies every time.

The review process I've described above should take 3 to 5 working days for a typical business tool. It can and should be faster for low-risk, well-established vendors with a track record.

It should be slower and more rigorous for any tool that will touch regulated data - add a dedicated security review and legal opinion to the timeline in those cases.

One more thing: document your decisions. When you complete a review and approve a tool, write down what you checked, what the vendor answered, and what the approval was conditional on.

That record is valuable six months later when someone asks why a particular tool is on the approved list, and it's essential if you ever need to demonstrate due diligence to a regulator or auditor.

For teams evaluating whether AI investment makes business sense alongside these compliance costs, [calculating ROI on AI tools](/blog/how-to-calculate-roi-on-ai-tools) is worth reading - the compliance overhead is a real cost that should factor into the denominator.

---

## Frequently Asked Questions

**Does GDPR apply to AI tools we use internally at our company?**

Yes, if the AI tool processes personal data of EU residents - including your employees based in the EU, or any customer data from EU individuals. The AI vendor becomes a data processor under GDPR Article 28, which means you need a Data Processing Agreement in place before using them.

GDPR applies based on the data subject's location, not your company's location, which catches many US-based companies off guard. The [official GDPR guidance at gdpr.eu](https://gdpr.eu) has an overview of processor obligations worth reviewing.

**What's the difference between a privacy policy and a data processing agreement?**

A privacy policy is a public-facing document that describes how a company handles data in general. It is primarily a disclosure document, not a contract.

A data processing agreement (DPA) is a contractual document between you (the controller) and the vendor (the processor) that creates legally binding obligations about how your specific data is handled. Under GDPR, having a DPA is legally required when you share personal data with a processor.

The privacy policy cannot substitute for a DPA.

**Can I use ChatGPT or Claude for work if I'm on a paid plan?**

The answer depends heavily on which plan and what data you're using. OpenAI's business and enterprise plans include data processing agreements and do not train on API inputs.

The free and ChatGPT Plus tiers historically have different terms. Anthropic's Claude for business use similarly differs by plan tier.

Check the current terms for your specific plan, not the general documentation - and verify whether your plan includes a DPA, not just a marketing description of privacy features.

**What should I do if an employee accidentally enters sensitive data into an unapproved AI tool?**

Treat it as a data incident, not a disciplinary matter. First, document what was entered, when, and into which tool.

Review that tool's data retention policy to understand how long the data will persist. If the data includes regulated information (PII, health data, financial data), assess whether your breach notification obligations are triggered - GDPR's 72-hour notification requirement applies to breaches that risk harm to individuals.

Update your internal policy to add guardrails that would have caught this case. The goal of incident response is to improve the system, not punish the individual.

**How do I handle AI tools that access our systems through integrations?**

AI tools that integrate with your email, calendar, CRM, code repository, or file storage are accessing a much broader data set than the individual prompts you send. Review the scope of permissions requested by any integration carefully - most ask for more access than they actually need.

Apply the same vendor evaluation checklist to the integration context, but with heightened attention to data residency (where do the files the AI reads actually go?) and subprocessors (which third parties can the AI call while processing your documents?). [AI agents](/blog/what-is-an-ai-agent) that connect to external tools through frameworks like the [Model Context Protocol](/blog/what-is-the-model-context-protocol-mcp) deserve particularly careful review, since they can take actions - not just read data.

**Is self-hosted or open-source AI automatically private?**

Self-hosted open-source AI is significantly more private than cloud-based tools, but "automatically private" is too strong. The privacy of a self-hosted deployment depends on: where the infrastructure runs (cloud provider privacy still applies), who has access to the inference logs you generate locally, whether you've reviewed the model weights and training data for the open-source model, and how you handle user data within your own deployment.

The [tradeoffs between open-source and closed AI](/blog/open-source-vs-closed-ai) and [cloud vs. local AI deployment](/blog/when-to-use-cloud-ai-vs-local-ai) are worth reading for the full picture.

**How often should we review our AI vendor privacy terms?**

At minimum, annually. In practice, AI vendor terms change more frequently than annual - new model versions, new features, new subprocessors, and regulatory changes all trigger updates.

Set a calendar reminder to re-read the ToS and DPA of any AI tool you use regularly at least once per year. For high-sensitivity use cases, review any time the vendor announces a major product update or privacy-related change.

If you've negotiated specific terms into your contract, confirm those terms are still reflected whenever the contract comes up for renewal.

**What's the fastest way to check if a vendor uses my data for training?**

Search the vendor's privacy policy and terms of service for the phrases "improve our services," "improve our products," "train," "fine-tune," and "machine learning." If any of these appear in a section that also references your usage data, inputs, or interactions, that is training-rights language. Then check whether there is an opt-out: search for "opt out" or "do not use" in the same document.

If the opt-out exists, check whether it's automatic for your plan tier or requires action. This search takes about 10 minutes per vendor and surfaces the most important information.

You can cross-reference findings against our [tools transparency index](/tools/transparency-index) which tracks this for popular AI tools.

