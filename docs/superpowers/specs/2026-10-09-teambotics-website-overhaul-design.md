# Teambotics website overhaul — design spec

Status: **Draft for Nikhil and Instinct review**, 9 October 2026. This specifies the public site direction; it does not authorize publication or turn unverified claims into copy.

## Decision and purpose

**Agreed:** The homepage has one consultancy front door. Products and submitted proposals support the offer as evidence, rather than competing with it as equal entry points. Nikhil chose this in the project discussion on 9 October. Instinct's [project-room email](https://mail.google.com/mail/u/?authuser=nickhilster%40gmail.com#all/1a122f3c4c0f12b8) supplies the working positioning, proof set, and two-week pilot outline.

The site should help a customer-service or operations leader understand, within the first screen, who Teambotics helps, what it does alongside a team, and how to start a scoped conversation. The promise is practical: enable people on AI tools that already exist, then build a small bridge where those tools do not cover the real workflow. Nikhil's frontline service experience is part of the reason to trust that approach.

**Proposed primary audience:** leaders responsible for frontline service, training, operations, or customer experience who are trying to make AI useful in day-to-day work. Validate this audience and buying trigger with Nikhil before final copy.

## Approach considered

1. **Refocus the existing homepage (recommended).** Keep the current domain, product routes, contact form, accessibility shell, and localization flow. Replace the product-first narrative and navigation with a consultancy journey. This is the shortest path to one clear front door.
2. **Add a separate consultancy landing page.** This preserves the product-first homepage but creates two public entrances and conflicts with the selected direction.
3. **Rebuild the site and visual system.** This could serve a broader brand reset, but adds design and migration work before the offer and proof are settled.

The recommended approach changes the homepage narrative and relevant shared copy. Product detail pages remain accessible as evidence; their claims and status labels still require review before being featured.

## Visitor journey and page structure

| Order | Section | Question it answers | Required action or content |
| --- | --- | --- | --- |
| 1 | Hero | Is this for my team? | Frontline-focused headline, two-sentence explanation, primary **Discuss a pilot** CTA to contact, secondary **See how we work** anchor. |
| 2 | The working method | What would Teambotics do with us? | Two linked activities: enable the team on available AI tools; identify and build a bridge for the uncovered workflow. Explain the human role and operational context in plain language. |
| 3 | Proposal proof | Can this team frame a useful engagement quickly? | Instinct and Muse cards explicitly labeled **submitted proposal**. Describe the problem framing and proposed intervention, with links. Never present a proposal as delivered client work or measured outcome. |
| 4 | Published work | Can I inspect something real? | LTB Buddy, RyFine, and Small Wonder, each with a verified live link, current stage, one user problem, and what can actually be tried or viewed. Keep other products available through secondary navigation or product pages. |
| 5 | Two-week pilot | What happens first? | Week one: embed, observe, and enable existing tools. Week two: build one agreed bridge within a fixed scope. Show the boundary, handoff, and outcome only after deliverables are confirmed. |
| 6 | Credibility | Why trust this perspective? | Nikhil's firsthand frontline and enablement experience, with his employer and account relationships stated precisely. Use plain text; brand marks or endorsement language need separate permission. |
| 7 | Contact | What should I do now? | One pilot-oriented form and direct email fallback. Ask for team, workflow, existing tools, and the gap; keep the current privacy notice and spam protection. |

The header should lead to **How we work**, **Proof**, **Pilot**, and **Contact**. A product index can remain in the footer or a secondary link. The primary CTA should lead to the same contact destination from hero, pilot, and header. On mobile, the offer and CTA should remain clear before the first long proof block.

## Copy direction

Voice: direct, specific, and easy to explain. Describe what a team will see and do. Avoid broad AI transformation claims, invented outcome metrics, and language that implies an employment relationship was a Teambotics client engagement.

**Draft hero, for review:**

> Make AI useful on the frontline.
>
> Teambotics works alongside customer-service teams to make better use of the AI tools they already have. When those tools leave a gap in the real workflow, we build the bridge.

Supporting line, subject to Nikhil's review: **Led by someone who has worked frontline customer service.** His supplied career record supports that claim through customer support for a Rogers Wireless account and team leadership at Best Buy Canada. The site should show the pilot as a concrete way to start, while avoiding a guarantee that every engagement can produce a production system in two weeks.

## Evidence and publication rules

| Item | Current evidence | Public label / gate |
| --- | --- | --- |
| Instinct proposal | Named as a submitted proposal in the project-room email; subdomain returned HTTP 200 during this review. | **Submitted proposal**. Confirm intended recipient, publication rights, and the exact scope before summarizing. |
| Muse proposal | Project-room email names it; `origin/main` contains `public/muse/index.html` titled as a product design proposal; subdomain returned HTTP 200. | **Submitted proposal**. Describe proposal content, not client delivery. |
| LTB Buddy and RyFine | Current site links them as a public beta and live product, respectively. | Recheck current stage and usable destination when preparing launch copy. |
| Small Wonder | Named in the project-room email; no supporting page or status was found in the inspected site source. | Hold its card until link, publisher, ownership, and status are supplied. |
| Rogers Wireless | Nikhil's supplied career record identifies Gemma Communications as his employer and Rogers Wireless as the customer/account context. It records customer support, billing, troubleshooting, and sales starting April 2013; the end date is unresolved. | If named, say **customer service and sales supporting Rogers Wireless through Gemma Communications**. Do not call Nikhil a direct Rogers employee, or imply a Teambotics client relationship or endorsement. |
| Best Buy Canada | Nikhil's supplied career record identifies a direct **Team Lead** role from August 2022 to February 2024, including frontline training, coaching, and operations. It describes BlueBot as a designed/piloted concept at Sherway Gardens. | **Former Best Buy Canada team lead** is supported by this record. Do not claim a corporate-scale BlueBot launch or a Teambotics client engagement. |
| Rothmans, Benson & Hedges (RBH) | Nikhil's supplied career record identifies **Lead Platform Advancement, Enablement**, September to December 2025, at RBH / a Philip Morris International affiliate. It describes internal platform and AI enablement work in a regulated environment. | Attribute this as prior employment/role experience. Keep internal details confidential; do not imply a Teambotics contract, production deployment of prototypes, or RBH endorsement. |

The career record is Nikhil-provided evidence, not independent employer confirmation. It supports accurately attributed text. Logo use and quotations still need separate approval. Proposed public summary: **Experience spans customer service supporting Rogers Wireless through Gemma Communications, frontline team leadership at Best Buy Canada, and platform enablement at RBH.** This is a draft, not approved site copy.

Every proof card should make the evidence type visible: **proposal**, **published product**, or **personal experience**. A proof item with missing attribution or a broken destination stays out of the launch page until resolved.

## Pilot definition to finalize

The two-week pilot is an **offer concept**, pending Nikhil's confirmation of its commercial and delivery terms. Proposed scope language: one team, one workflow, one agreed bridge. Define the following before publishing the offer:

- Buyer and team size; access and onboarding requirements.
- Week-one activities and tangible output (for example, workflow map, tool-use plan, or training session).
- Week-two bridge type, acceptance test, handoff, support period, and what counts as complete.
- What is excluded: broad systems replacement, unrestricted integrations, or production guarantees unless separately scoped.
- Pricing language, if any, and whether the two weeks are a standard package or a starting format.

## Repository fit and delivery boundaries

The inspected site is a Next.js 16 app. The homepage is assembled in `app/(site)/page.tsx` from `components/home/*`; the hero and navigation copy come from `lib/i18n/siteMessages.source.ts`, with generated French Canadian and Latin American Spanish messages. The current sequence places product flagship sections directly after the hero, then a second product grid. The current hero CTA points to `#systems`; the contact form posts to `/api/leads`.

Implementation should update the homepage section order, navigation and CTA copy, form prompts and relevant metadata together. Preserve existing product routes, the lead API and privacy text, and the standalone proposal subdomains. The checkout used for this spec is based on `origin/main` at `94ab2f9`; the original local `main` has unrelated Symphony and lockfile edits. Future implementation should use a clean worktree and reconcile against the then-current remote before editing. README positioning should be refreshed when the new site actually ships, rather than describing a draft as implemented.

## Acceptance criteria for a later implementation

- Hero states audience, service, and contact action without requiring a visitor to infer them from a product grid.
- Proposals, published work, and personal experience carry distinct visible labels and accurate attribution.
- Pilot section explains both weeks and its fixed boundary, using terms Nikhil has approved.
- One primary contact journey works from desktop and mobile; form submission, error handling, and email fallback still work.
- English and generated locale content agree on section structure; translation checks, lint, typecheck, tests, build, keyboard navigation, and mobile layout pass.
- All featured destinations load, and the published page is checked visually and functionally after deployment. A successful build or deployment status alone is insufficient.

## Open decisions for the project room

1. Confirm the final first-person or company voice and approve the concise career summary for the public site.
2. Supply and approve proposal summaries, publication rights, and accurate relationship wording for Instinct and Muse.
3. Supply Small Wonder's live link and stage; reconfirm LTB Buddy and RyFine status.
4. Define the pilot deliverables, exclusions, commercial terms, and preferred contact action.
5. Confirm any logo or named-organization permissions separately; career connections are now attributed in the evidence table above.

The project-room thread is the discussion record. This file is the versioned site spec; decisions returned in that thread should be incorporated here with dates and attribution before implementation.
