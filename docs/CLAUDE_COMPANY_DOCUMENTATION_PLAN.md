# Claude Documentation Plan: Teambotics Company Docs Only

## Purpose

Create company documentation that supports the Teambotics public site, chatbot grounding, lead capture, and compliance posture.

Claude should work only on documentation. Do not edit application code, configuration files, scripts, tests, package files, or runtime behavior.

All documentation work should remain inside the `docs/` folder.

## Scope

Claude should draft first-pass company documentation for review.

Primary documentation outputs:

- Privacy policy draft.
- Terms of use draft.
- Chatbot disclaimer and safety language.
- Lead form consent and data-use language.
- Company positioning reference.
- Product summary reference for chatbot ingestion.
- Internal FAQ for strongly grounded chatbot answers.

## Writing Direction

Teambotics positioning should avoid the term "enterprise" unless it is legally or contextually necessary.

Preferred language:

- Workflows.
- Enablement.
- Strategy.
- Operational clarity.
- Adoption.
- Guided systems.
- Compliance-aware interfaces.
- Practical impact.
- Production readiness.

Tone:

- Clear.
- Plainspoken.
- Professional.
- Conservative around claims.
- Helpful without sounding like legal advice.

Avoid:

- Overclaiming AI capability.
- Guaranteeing outcomes.
- Claiming legal, financial, medical, or professional advice.
- Referring to private GitHub repositories.
- Publishing sensitive implementation details.
- Mentioning unannounced customers or confidential project data.

## Required Files

Create or update these documentation files inside `docs/`:

```txt
docs/company-overview.md
docs/privacy-policy-draft.md
docs/terms-of-use-draft.md
docs/chatbot-disclaimer.md
docs/lead-form-consent.md
docs/chatbot-grounding-faq.md
docs/product-summaries.md
```

Do not create files outside `docs/`.

## Document 1: Company Overview

File:

```txt
docs/company-overview.md
```

Purpose:

- Provide a stable source of truth for what Teambotics does.
- Feed public copy and chatbot context.

Include:

- Short company description.
- Longer company description.
- Core capabilities.
- Target audiences.
- How Teambotics approaches workflow strategy.
- How Teambotics approaches enablement.
- How Teambotics approaches compliance-aware product design.
- What Teambotics does not claim to do.

Key message:

Teambotics designs intelligent workflow systems and interactive platforms shaped for operational clarity, enablement, and practical impact.

## Document 2: Privacy Policy Draft

File:

```txt
docs/privacy-policy-draft.md
```

Purpose:

- Provide a review-ready Privacy Policy draft for the public website.
- Support lead form and chatbot data handling language.

Must include:

- Information collected through the website.
- Information collected through the lead form.
- Information collected through chatbot interactions.
- How information is used.
- How information is stored.
- Third-party services that may process data.
- Cookies or analytics language.
- Data retention placeholder.
- User contact rights.
- Contact email: `hello@teambotics.app`

Known services to mention carefully:

- Vercel hosting and analytics.
- Neon/Postgres database.
- OpenAI for chatbot processing when enabled.
- GitHub as an internal source for project documentation ingestion, not as a public visitor data processor unless needed.

Keep this as a draft requiring legal review.

## Document 3: Terms Of Use Draft

File:

```txt
docs/terms-of-use-draft.md
```

Purpose:

- Provide a review-ready Terms of Use draft for the public website.

Must include:

- Website use.
- Informational nature of site content.
- No professional advice.
- Chatbot limitations.
- Lead form submissions.
- Intellectual property.
- Third-party links.
- Disclaimer of warranties.
- Limitation of liability placeholder.
- Governing law placeholder.
- Contact email: `hello@teambotics.app`

Important:

- Be especially conservative around LTB Buddy and legal-adjacent topics.
- State that chatbot or website content is informational and does not replace professional advice.

## Document 4: Chatbot Disclaimer

File:

```txt
docs/chatbot-disclaimer.md
```

Purpose:

- Provide concise disclaimer text for chatbot UI, chatbot system prompts, and public policy pages.

Include:

- Short UI disclaimer.
- Longer disclaimer for policy pages.
- Legal-adjacent disclaimer for LTB Buddy questions.
- Refusal language for unsupported questions.
- Suggested fallback wording when the assistant lacks sources.

Grounding policy:

- The assistant should answer only from Teambotics-approved sources.
- If it cannot find reliable context, it should say so.
- It should not invent product details, customers, metrics, legal outcomes, or private repository information.

## Document 5: Lead Form Consent

File:

```txt
docs/lead-form-consent.md
```

Purpose:

- Provide copy for the lead form consent line and supporting privacy text.

Include:

- One short checkbox or helper-text version.
- One longer version for the Privacy Policy.
- Suggested success message.
- Suggested error message.

Lead form fields expected:

- Name.
- Email.
- Organization.
- Interest area.
- Message.

## Document 6: Chatbot Grounding FAQ

File:

```txt
docs/chatbot-grounding-faq.md
```

Purpose:

- Provide a question-and-answer source for chatbot ingestion and evaluator tests.

Include answers for:

- What does Teambotics do?
- What kinds of workflows does Teambotics work on?
- What does "workflow strategy" mean?
- What does "enablement" mean in Teambotics context?
- What is LTB Buddy?
- Can LTB Buddy give legal advice?
- What is EasyBuddy?
- What is Code2Motion?
- What is Storytellr?
- How can someone contact Teambotics?
- Does Teambotics publish its GitHub repositories?
- What should the assistant do when it does not know?

Answer style:

- Short.
- Grounded.
- Source-ready.
- No speculation.

## Document 7: Product Summaries

File:

```txt
docs/product-summaries.md
```

Purpose:

- Provide clean ingestion-ready summaries for the four featured products.

Products:

- LTB Buddy.
- EasyBuddy.
- Code2Motion.
- Storytellr.

For each product, include:

- One-sentence summary.
- Longer summary.
- Audience.
- Workflow problem.
- How Teambotics frames the product.
- What the product should not be claimed to do.
- Suggested chatbot-safe answer.

Constraints:

- Do not invent metrics.
- Do not claim customer adoption numbers.
- Do not claim legal outcomes.
- Do not include private repository links.

## Output Requirements

Each document should:

- Use Markdown.
- Start with a clear title.
- Include "Draft for review" near the top where appropriate.
- Use concise sections.
- Avoid unnecessary legal complexity.
- Keep language suitable for review by the owner and, later, counsel.

## Boundaries

Claude must not:

- Edit app code.
- Edit package files.
- Edit tests.
- Edit environment files.
- Add dependencies.
- Add public GitHub links to private repositories.
- Present legal drafts as final legal advice.

Claude may:

- Draft documentation.
- Suggest questions for legal review.
- Flag missing business details.
- Create documentation-only TODOs inside `docs/`.

## Final Handoff

When complete, Claude should provide:

- List of docs created or updated.
- Any assumptions made.
- Any legal review questions.
- Any content that needs owner confirmation before publishing.

