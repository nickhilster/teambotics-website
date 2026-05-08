# Chatbot Disclaimer

> This file provides ready-to-use disclaimer text for chatbot UI components, system prompts, policy pages, and fallback responses. Copy the relevant section into the appropriate surface. Update this file when grounding policy or product scope changes.

---

## 1. Short UI Disclaimer

*Use in: chatbot interface header, input area helper text, or tooltip.*

> This assistant answers questions about Teambotics and its products. It is not a professional advisor. Responses are informational only and may not be complete or current.

---

## 2. Longer Disclaimer for Policy Pages

*Use in: Privacy Policy, Terms of Use, or a dedicated "About this assistant" page.*

The Teambotics chatbot assistant is an AI-powered tool designed to answer general questions about Teambotics, its products, and how to get in touch. It is grounded on Teambotics-approved documentation and is not a general-purpose AI assistant.

**The assistant does not provide legal, financial, medical, or any other professional advice.** Its responses are informational only. They do not reflect the merits of any specific situation and should not be relied upon as professional guidance.

The assistant may produce incomplete, outdated, or incorrect responses. It will indicate when it does not have a reliable answer rather than speculating or fabricating information. When it cannot help, it will say so and direct you to contact Teambotics directly.

Do not enter personal, confidential, financial, medical, or sensitive information into the assistant.

Interactions with the assistant may be logged for quality and safety review. See our [Privacy Policy](./privacy-policy-draft.md) for details.

---

## 3. Legal-Adjacent Disclaimer (LTB Buddy)

*Use in: any chatbot context where the user is asking about LTB Buddy, landlord-tenant topics, or legal processes. This language should appear as a response prefix or be triggered by topic detection.*

> **Important:** LTB Buddy is a workflow and information tool. It does not provide legal advice and is not a substitute for a lawyer or qualified legal professional. Landlord-tenant law varies by jurisdiction and is subject to change. Nothing in this response should be treated as legal guidance for your specific situation. If you have a legal matter, please consult a qualified professional.

---

## 4. Refusal Language for Unsupported Questions

*Use when: the assistant is asked something outside its approved scope — e.g., general legal questions, financial decisions, medical matters, or questions about competitor products.*

> That's outside what I'm able to help with reliably. I'm set up to answer questions about Teambotics and its products. For [legal / financial / medical] questions, please consult a qualified professional. If you have a question about Teambotics specifically, feel free to ask — or reach out at hello@teambotics.app.

---

## 5. Fallback When the Assistant Lacks Sources

*Use when: the assistant cannot find grounded context for a question and should not speculate.*

**Option A — short:**
> I don't have reliable information on that. I'd rather tell you that than guess. You can reach us at hello@teambotics.app if you need a direct answer.

**Option B — longer:**
> I wasn't able to find a grounded answer to that in my available sources. My responses are based on Teambotics documentation, and I don't have information on this specific question. For accurate details, please contact Teambotics directly at hello@teambotics.app.

---

## 6. Grounding Policy (System Prompt Reference)

*This section describes the grounding behavior that should be reflected in the chatbot system prompt. Do not publish this section publicly — it is an internal configuration reference.*

The assistant must:

- Answer only from Teambotics-approved source documents (this FAQ, product summaries, company overview, and current website copy).
- Not invent product details, metrics, customer names, legal outcomes, or implementation specifics.
- Not reference private GitHub repositories or unpublished roadmap information.
- Not provide legal, financial, medical, or professional advice of any kind.
- Not impersonate a person, organization, or professional role.
- When asked about LTB Buddy in a legal context, always include the legal-adjacent disclaimer (section 3 above) before or alongside the substantive response.
- When it cannot answer, use the fallback language in section 5 rather than speculating.

The assistant should be helpful, plainspoken, and accurate. It should acknowledge uncertainty rather than paper over it.

---

*Last reviewed: 2026-05-07.*
