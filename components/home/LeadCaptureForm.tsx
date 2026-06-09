"use client";

import Link from "next/link";
import { useState } from "react";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
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
  const { messages } = useSiteLocale();
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
        setStatus({ tone: "success", message: messages.leadForm.spamSuccessLabel });
        setValues(getInitialLeadFormValues());
        setErrors({});
        return;
      }

      setErrors(validation.errors);
      setStatus({ tone: "error", message: messages.leadForm.validationErrorLabel });
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
          : { form: messages.leadForm.requestErrorLabel };
        setErrors(nextErrors);
        setStatus({
          tone: "error",
          message: nextErrors.form ?? messages.leadForm.requestErrorLabel,
        });
        return;
      }

      setValues(getInitialLeadFormValues());
      setStatus({
        tone: "success",
        message: result?.message ?? messages.leadForm.successLabel,
      });
    } catch {
      setErrors({ form: messages.leadForm.requestEmailFallbackLabel });
      setStatus({
        tone: "error",
        message: messages.leadForm.requestEmailFallbackLabel,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lead-form-card">
      <div className="lead-form-card__header">
        <p className="lead-form-card__eyebrow">{messages.leadForm.eyebrow}</p>
        <h3 className="lead-form-card__title">{messages.leadForm.title}</h3>
        <p className="lead-form-card__copy">
          {messages.leadForm.copy}
        </p>
      </div>

      <form className="lead-form" noValidate onSubmit={handleSubmit}>
        <div className="lead-form__honeypot" aria-hidden="true">
          <label htmlFor="lead-website">{messages.leadForm.honeypotLabel}</label>
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
            <span>{messages.leadForm.fields.name}</span>
            <input
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              aria-invalid={errors.name ? true : undefined}
              autoComplete="name"
              id="lead-name"
              maxLength={80}
              name="name"
              onChange={(event) => updateField("name", event.target.value)}
              required
              type="text"
              value={values.name}
            />
            {errors.name ? <span className="lead-form__error" id="lead-name-error" role="alert">{errors.name}</span> : null}
          </label>

          <label className={`lead-form__field ${errors.email ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-email">
            <span>{messages.leadForm.fields.email}</span>
            <input
              aria-describedby={errors.email ? "lead-email-error" : undefined}
              aria-invalid={errors.email ? true : undefined}
              autoComplete="email"
              id="lead-email"
              maxLength={160}
              name="email"
              onChange={(event) => updateField("email", event.target.value)}
              required
              type="email"
              value={values.email}
            />
            {errors.email ? <span className="lead-form__error" id="lead-email-error" role="alert">{errors.email}</span> : null}
          </label>

          <label className={`lead-form__field ${errors.organization ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-organization">
            <span>{messages.leadForm.fields.organization}</span>
            <input
              aria-describedby={errors.organization ? "lead-organization-error" : undefined}
              aria-invalid={errors.organization ? true : undefined}
              autoComplete="organization"
              id="lead-organization"
              maxLength={120}
              name="organization"
              onChange={(event) => updateField("organization", event.target.value)}
              type="text"
              value={values.organization}
            />
            {errors.organization ? <span className="lead-form__error" id="lead-organization-error" role="alert">{errors.organization}</span> : null}
          </label>

          <label className={`lead-form__field ${errors.interestArea ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-interest-area">
            <span>{messages.leadForm.fields.interestArea}</span>
            <select
              aria-describedby={errors.interestArea ? "lead-interest-area-error" : undefined}
              aria-invalid={errors.interestArea ? true : undefined}
              id="lead-interest-area"
              name="interestArea"
              onChange={(event) => updateField("interestArea", event.target.value)}
              value={values.interestArea}
            >
              <option value="">{messages.leadForm.chooseFocusLabel}</option>
              {LEAD_INTEREST_AREAS.map((option) => (
                <option key={option} value={option}>{messages.leadForm.interestAreaLabels[option]}</option>
              ))}
            </select>
            {errors.interestArea ? <span className="lead-form__error" id="lead-interest-area-error" role="alert">{errors.interestArea}</span> : null}
          </label>

          <label className={`lead-form__field lead-form__field--full ${errors.message ? "lead-form__field--invalid" : ""}`.trim()} htmlFor="lead-message">
            <span>{messages.leadForm.fields.message}</span>
            <textarea
              aria-describedby={errors.message ? "lead-message-error" : undefined}
              aria-invalid={errors.message ? true : undefined}
              id="lead-message"
              maxLength={MAX_LEAD_MESSAGE_LENGTH}
              name="message"
              onChange={(event) => updateField("message", event.target.value)}
              required
              rows={5}
              value={values.message}
            />
            <div className="lead-form__field-meta">
              {errors.message ? <span className="lead-form__error" id="lead-message-error" role="alert">{errors.message}</span> : <span className="lead-form__hint">{messages.leadForm.messageHint}</span>}
              <span className="lead-form__hint">{values.message.length}/{MAX_LEAD_MESSAGE_LENGTH}</span>
            </div>
          </label>
        </div>

        <div className="lead-form__footer">
          <p className="lead-form__privacy">
            {messages.leadForm.privacyPrefix}
            <Link href="/privacy">{messages.leadForm.privacyLinkLabel}</Link>
            {messages.leadForm.privacySuffix}
          </p>
          <div className="lead-form__actions">
            <button className="button button--primary" disabled={submitting} type="submit">
              <span>{submitting ? messages.leadForm.submittingLabel : messages.leadForm.submitLabel}</span>
            </button>
            <a className="button button--ghost" href="mailto:hello@teambotics.app">
              <span>{messages.leadForm.emailLabel}</span>
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