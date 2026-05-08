# Lead Form Consent

> Ready-to-use copy for the lead form consent line, supporting privacy text, and response messages. Use these strings in the UI and update this file when privacy or data handling practices change.

---

## Form Fields

The lead form collects:

- Name
- Email address
- Organization
- Interest area
- Message

---

## 1. Consent — Short Version (Checkbox or Helper Text)

*Use in: the lead form, directly below the submit button or as a checkbox label. Choose the checkbox version if you want an explicit opt-in; use the helper text version if submission itself constitutes acceptance.*

**Checkbox version:**
> I agree that Teambotics may use the information I've provided to respond to my inquiry, in accordance with the [Privacy Policy](./privacy-policy-draft.md).

**Helper text version (no checkbox):**
> By submitting this form, you agree that Teambotics may use this information to respond to your inquiry. See our [Privacy Policy](./privacy-policy-draft.md).

*TODO(owner/legal): Confirm which version is preferred. A checkbox provides a clearer record of consent. Helper text is lower friction but provides less documentation.*

---

## 2. Consent — Longer Version (Privacy Policy)

*Use in: the Privacy Policy, under the lead form section.*

When you submit the lead form, you provide us with your name, email address, organization, interest area, and message. You consent to Teambotics using this information to respond to your inquiry and, where relevant, to follow up on the interest you have expressed.

We will not add you to marketing lists without a separate, clear indication of your preference. We will not share your submission data with third parties for their own marketing purposes. Your information is stored securely and retained in accordance with our data retention policy.

You may request access to, correction of, or deletion of your submitted information at any time by contacting us at hello@teambotics.app.

---

## 3. Success Message

*Use in: the form UI, displayed after a successful submission.*

> Thanks — we've received your message. Someone from Teambotics will be in touch shortly.

*Alternative (if you want to set a specific expectation):*
> We've received your message. We typically follow up within 1–2 business days.

*TODO(owner): Confirm response time expectation to include here.*

---

## 4. Error Message

*Use in: the form UI, displayed if the submission fails.*

> Something went wrong with your submission. Please try again, or email us directly at hello@teambotics.app.

---

## 5. Validation Messages

*Use in: individual field validation, shown inline.*

| Field | Required message | Format message |
|---|---|---|
| Name | Please enter your name. | — |
| Email | Please enter your email address. | Please enter a valid email address. |
| Organization | — (optional) | — |
| Interest area | Please select an interest area. | — |
| Message | Please enter a message. | — |

*TODO(owner): Confirm which fields are required vs. optional before implementation.*

---

*Last reviewed: 2026-05-07.*
