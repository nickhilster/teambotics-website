"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getInitialLeadFormValues,
  LEAD_INTEREST_AREAS,
  MAX_LEAD_MESSAGE_LENGTH,
  type LeadFormPayload,
  type LeadValidationErrors,
  validateLeadSubmission,
} from "@/lib/leads";

type FormStatus = {
  tone: "idle" | "success" | "error";
  message: string;
};

export function LeadCaptureForm() {
  const [values, setValues] = useState<LeadFormPayload>(() => getInitialLeadFormValues());
  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>({ tone: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof LeadFormPayload, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
    if (status.tone !== "idle") {
      setStatus({ tone: "idle", message: "" });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...values,
      pagePath: typeof window === "undefined" ? values.pagePath : window.location.pathname,
    };
    const validation = validateLeadSubmission(payload);

    if (!validation.success) {
      if (validation.spam) {
        setStatus({ tone: "success", message: "Thanks. Your note has been received." });
        setValues(getInitialLeadFormValues());
        setErrors({});
        return;
      }

      setErrors(validation.errors);
      setStatus({ tone: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    setSubmitting(true);
    setErrors({});
    setStatus({ tone: "idle", message: "" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const nextErrors = result?.errors && typeof result.errors === "object"
          ? result.errors as LeadValidationErrors
          : { form: "Unable to send your message right now." };
        setErrors(nextErrors);
        setStatus({
          tone: "error",
          message: nextErrors.form ?? "Unable to send your message right now.",
        });
        return;
      }

      setValues(getInitialLeadFormValues());
      setStatus({
        tone: "success",
        message: result?.message ?? "Thanks. Teambotics will follow up shortly.",
      });
    } catch {
      setErrors({ form: "Unable to send your message right now. Please try email instead." });
      setStatus({
        tone: "error",
        message: "Unable to send your message right now. Please try email instead.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lead-form-card">
      <div className="lead-form-card__header">
        <p className="lead-form-card__eyebrow">Lead intake</p>
        <h3 className="lead-form-card__title">Tell us what you&apos;re working on.</h3>
        <p className="lead-form-card__copy">
          A short note is fine. We use it to understand the workflow, team, or product problem you want to talk about.
        </p>
      </div>

      <form className="lead-form" noValidate onSubmit={handleSubmit}>
        <div className="lead-form__honeypot" aria-hidden="true">
          <label htmlFor="lead-website">Website</label>
          <input
            autoComplete="off"
            id="lead-website"
            name="website"
            tabIndex={-1}
            type="text"
            value={values.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </div>

        <div className="lead-form__grid">
          <label className={`lead-form__field ${errors.name ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-name">
            <span>Name</span>
            <input
              autoComplete="name"
              id="lead-name"
              maxLength={80}
              name="name"
              onChange={(event) => updateField("name", event.target.value)}
              required
              type="text"
              value={values.name}
            />
            {errors.name ? <span className="lead-form__error" role="alert">{errors.name}</span> : null}
          </label>

          <label className={`lead-form__field ${errors.email ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-email">
            <span>Email</span>
            <input
              autoComplete="email"
              id="lead-email"
              maxLength={160}
              name="email"
              onChange={(event) => updateField("email", event.target.value)}
              required
              type="email"
              value={values.email}
            />
            {errors.email ? <span className="lead-form__error" role="alert">{errors.email}</span> : null}
          </label>

          <label className={`lead-form__field ${errors.organization ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-organization">
            <span>Organization</span>
            <input
              autoComplete="organization"
              id="lead-organization"
              maxLength={120}
              name="organization"
              onChange={(event) => updateField("organization", event.target.value)}
              type="text"
              value={values.organization}
            />
            {errors.organization ? <span className="lead-form__error" role="alert">{errors.organization}</span> : null}
          </label>

          <label className={`lead-form__field ${errors.interestArea ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-interest-area">
            <span>Interest area</span>
            <select
              id="lead-interest-area"
              name="interestArea"
              onChange={(event) => updateField("interestArea", event.target.value)}
              value={values.interestArea}
            >
              <option value="">Choose a focus</option>
              {LEAD_INTEREST_AREAS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.interestArea ? <span className="lead-form__error" role="alert">{errors.interestArea}</span> : null}
          </label>

          <label className={`lead-form__field lead-form__field--full ${errors.message ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-message">
            <span>Message</span>
            <textarea
              id="lead-message"
              maxLength={MAX_LEAD_MESSAGE_LENGTH}
              name="message"
              onChange={(event) => updateField("message", event.target.value)}
              required
              rows={5}
              value={values.message}
            />
            <div className="lead-form__field-meta">
              {errors.message ? <span className="lead-form__error" role="alert">{errors.message}</span> : <span className="lead-form__hint">Outline the problem, timeline, or team context.</span>}
              <span className="lead-form__hint">{values.message.length}/{MAX_LEAD_MESSAGE_LENGTH}</span>
            </div>
          </label>
        </div>

        <div className="lead-form__footer">
          <p className="lead-form__privacy">
            By sending this form, you agree that Teambotics may use your information to respond to your inquiry. See our <Link href="/privacy">Privacy Policy</Link>.
          </p>
          <div className="lead-form__actions">
            <button className="button button--primary" disabled={submitting} type="submit">
              <span>{submitting ? "Sending…" : "Start a conversation"}</span>
            </button>
            <a className="button button--ghost" href="mailto:hello@teambotics.app">
              <span>Prefer email?</span>
            </a>
          </div>
        </div>

        {errors.form ? <p className="lead-form__status lead-form__status--error" role="alert">{errors.form}</p> : null}
        {status.message ? (
          <p
            className={`lead-form__status ${status.tone === "success" ? "lead-form__status--success" : "lead-form__status--error"}`}
            role="status"
          >
            {status.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}