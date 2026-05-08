export const LEAD_INTEREST_AREAS = [
  "Workflow strategy",
  "Team enablement",
  "AI chatbot or assistant",
  "Legal/compliance workflow",
  "Creative or interactive platform",
  "Other",
] as const;

export const MAX_LEAD_MESSAGE_LENGTH = 1500;
export const MAX_LEAD_NAME_LENGTH = 80;
export const MAX_LEAD_EMAIL_LENGTH = 160;
export const MAX_LEAD_ORGANIZATION_LENGTH = 120;
export const MAX_LEAD_PAGE_PATH_LENGTH = 200;

export type LeadValidationErrors = Partial<Record<"name" | "email" | "organization" | "interestArea" | "message" | "form", string>>;

export type LeadFormPayload = {
  name: string;
  email: string;
  organization: string;
  interestArea: string;
  message: string;
  website: string;
  pagePath: string;
};

export type ValidLeadSubmission = {
  name: string;
  email: string;
  organization: string | null;
  interestArea: string | null;
  message: string;
  pagePath: string | null;
};

export type LeadValidationResult =
  | { success: true; data: ValidLeadSubmission }
  | { success: false; errors: LeadValidationErrors; spam: boolean };

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePayload(payload: unknown): LeadFormPayload {
  const record = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};

  return {
    name: cleanString(record.name),
    email: cleanString(record.email),
    organization: cleanString(record.organization),
    interestArea: cleanString(record.interestArea),
    message: cleanString(record.message),
    website: cleanString(record.website),
    pagePath: cleanString(record.pagePath),
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getInitialLeadFormValues(): LeadFormPayload {
  return {
    name: "",
    email: "",
    organization: "",
    interestArea: "",
    message: "",
    website: "",
    pagePath: "",
  };
}

export function validateLeadSubmission(payload: unknown): LeadValidationResult {
  const normalized = normalizePayload(payload);

  if (normalized.website) {
    return {
      success: false,
      errors: {},
      spam: true,
    };
  }

  const errors: LeadValidationErrors = {};

  if (!normalized.name) {
    errors.name = "Please add your name.";
  } else if (normalized.name.length > MAX_LEAD_NAME_LENGTH) {
    errors.name = `Please keep your name under ${MAX_LEAD_NAME_LENGTH} characters.`;
  }

  if (!normalized.email) {
    errors.email = "Please add your email address.";
  } else if (normalized.email.length > MAX_LEAD_EMAIL_LENGTH || !isValidEmail(normalized.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (normalized.organization.length > MAX_LEAD_ORGANIZATION_LENGTH) {
    errors.organization = `Please keep the organization name under ${MAX_LEAD_ORGANIZATION_LENGTH} characters.`;
  }

  if (
    normalized.interestArea &&
    !LEAD_INTEREST_AREAS.includes(normalized.interestArea as (typeof LEAD_INTEREST_AREAS)[number])
  ) {
    errors.interestArea = "Please choose one of the listed interest areas.";
  }

  if (!normalized.message) {
    errors.message = "Please add a short message about what you need.";
  } else if (normalized.message.length > MAX_LEAD_MESSAGE_LENGTH) {
    errors.message = `Please keep your message under ${MAX_LEAD_MESSAGE_LENGTH} characters.`;
  }

  const pagePath = normalized.pagePath && normalized.pagePath.startsWith("/") && normalized.pagePath.length <= MAX_LEAD_PAGE_PATH_LENGTH
    ? normalized.pagePath
    : "";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      spam: false,
    };
  }

  return {
    success: true,
    data: {
      name: normalized.name,
      email: normalized.email.toLowerCase(),
      organization: normalized.organization || null,
      interestArea: normalized.interestArea || null,
      message: normalized.message,
      pagePath: pagePath || null,
    },
  };
}