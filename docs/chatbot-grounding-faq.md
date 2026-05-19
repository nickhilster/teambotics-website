# Chatbot Grounding FAQ

> Source document for chatbot ingestion and evaluator tests. Each Q&A represents an approved, grounded answer the assistant may use. Do not add answers that speculate, claim metrics, or go beyond what Teambotics has confirmed. Update this file when product details or policies change.

---

## About Teambotics

**Q: What does Teambotics do?**

A: Teambotics is an independent AI lab that builds conversational and interactive products for complex domains — legal, operational, narrative, and creative. We ship proprietary products and build bespoke systems for a small number of partners. Our work starts from operational constraints, not generic capability.

---

**Q: What kinds of workflows does Teambotics work on?**

A: Teambotics works on workflows in regulated, operational, and frontline environments — areas where clarity, traceability, and adoption matter. That includes compliance-adjacent processes, frontline operational tooling, and situations where AI-assisted workflows need to be grounded and auditable.

---

**Q: What does "workflow strategy" mean at Teambotics?**

A: Workflow strategy means understanding the operational problem before building anything. Teambotics maps how work actually moves — where it stalls, where it breaks down, and what a guided system would need to do to improve it. The strategy phase comes before the build.

---

**Q: What does "enablement" mean in the Teambotics context?**

A: Enablement means building for the person who will actually use the system, not just the person who asked for it. A system that is not adopted has not solved the problem. Teambotics designs for adoption — lower friction, clearer flows, interfaces that match how people work.

---

## Products

**Q: What is LTB Buddy?**

A: LTB Buddy is a Teambotics product designed to assist with landlord-tenant board related workflows. It provides guided, information-based support for navigating common processes and documentation in that domain. It is a workflow and enablement tool — it does not provide legal advice and is not a substitute for a qualified legal professional.

---

**Q: Can LTB Buddy give legal advice?**

A: No. LTB Buddy is a workflow and information tool, not a legal advisor. It does not provide legal advice, legal representation, or guidance on the specific merits of any situation. Landlord-tenant law varies by jurisdiction and is subject to change. Anyone with a legal matter should consult a qualified professional. See the [Chatbot Disclaimer](./chatbot-disclaimer.md) for the full disclaimer used in the product interface.

---

**Q: What is EasyBuddy?**

A: EasyBuddy is a bespoke AI training and onboarding assistant Teambotics builds for frontline enterprise teams. It delivers scenario-based coaching, instant policy lookups, shift prep, and tone-aware guidance — integrated with a partner's existing LMS, CRM, or operational systems. It is built per engagement and is not a generic off-the-shelf product. For more information, contact hello@teambotics.app.

---

**Q: What is Code2Motion?**

A: Code2Motion is a Teambotics product — an interactive generative art platform currently in Early Access. It includes the PlayRoom, where visitors explore interactive art pieces called c2merses, and ToyMaker, a creation surface for building and publishing those experiences. There's also Sidecar, an AI co-creator. You can explore it at code2motion.app.

---

**Q: What is Storytellr?**

A: Storytellr is a Teambotics product currently in progress. It is being built as a client-facing narrative graph experience that connects projects, decisions, collaborators, and outcomes so founders, teams, and personal brands can present complex work more clearly than they could through a static profile alone.

---

## Contact and Access

**Q: How can someone contact Teambotics?**

A: You can reach Teambotics by email at hello@teambotics.app, or by submitting the contact form on the website at teambotics.app.

---

**Q: Does Teambotics publish its GitHub repositories?**

A: Teambotics uses GitHub internally for project development. Source repositories are private. The assistant does not have information about the contents of those repositories and will not share internal implementation details.

---

## Assistant Behavior

**Q: What should the assistant do when it does not know?**

A: When the assistant cannot find a grounded answer in its approved sources, it should say so plainly. It should not speculate, invent details, or fill gaps with plausible-sounding information. The correct response is: "I don't have reliable information on that. You can reach Teambotics directly at hello@teambotics.app." The assistant should never prefer a confident-sounding wrong answer over an honest acknowledgment of uncertainty.

---

*Last reviewed: 2026-05-19. EasyBuddy and Code2Motion answers drafted from live product pages — owner should confirm before chatbot goes live. Teambotics positioning answer updated to match current independent AI lab identity.*
