import type { ProductCaseStudy, ProductDetailSection, ProductFocusPoint } from "@/lib/products";

export const siteLocales = ["en", "fr-CA", "es-419"] as const;
export const localizedRouteLocales = ["fr-CA", "es-419"] as const;

export type SiteLocale = (typeof siteLocales)[number];
export type LocalizedRouteLocale = (typeof localizedRouteLocales)[number];

export type SiteNavItem = {
  href: string;
  label: string;
};

export type CapabilityMessage = {
  title: string;
  body: string;
};

export type EngagementStepMessage = {
  number: string;
  title: string;
  body: string;
};

export type SiteMessages = {
  header: {
    navLabel: string;
    navItems: SiteNavItem[];
    ctaLabel: string;
    openNavigationLabel: string;
    closeNavigationLabel: string;
    languageLabel: string;
  };
  footer: {
    navLabel: string;
    copyright: string;
    privacyLabel: string;
    termsLabel: string;
    linkedInLabel: string;
    madeWith: string;
  };
  hero: {
    pill: string;
    titleLines: [string, string];
    copy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  positioning: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string];
    quote: string;
  };
  liveSystems: {
    eyebrow: string;
    title: string;
    description: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    items: CapabilityMessage[];
  };
  engagement: {
    eyebrow: string;
    title: string;
    description: string;
    steps: EngagementStepMessage[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
    reviewSystemsLabel: string;
  };
  leadForm: {
    eyebrow: string;
    title: string;
    copy: string;
    honeypotLabel: string;
    fields: {
      name: string;
      email: string;
      organization: string;
      interestArea: string;
      message: string;
    };
    chooseFocusLabel: string;
    interestAreaLabels: Record<string, string>;
    messageHint: string;
    privacyPrefix: string;
    privacyLinkLabel: string;
    privacySuffix: string;
    submitLabel: string;
    submittingLabel: string;
    emailLabel: string;
    validationErrorLabel: string;
    spamSuccessLabel: string;
    requestErrorLabel: string;
    requestEmailFallbackLabel: string;
    successLabel: string;
  };
  productPage: {
    allProductsLabel: string;
    detailEyebrow: string;
    detailTitle: string;
    detailDescription: string;
    evidenceEyebrow: string;
    evidenceTitle: string;
    buildProfileEyebrow: string;
    technologyLabel: string;
    systemCapabilitiesLabel: string;
  };
};

export type GeneratedProductTranslation = Partial<Pick<
  ProductCaseStudy,
  | "title"
  | "label"
  | "stage"
  | "statusLabel"
  | "market"
  | "tagline"
  | "description"
  | "summary"
  | "heroSummary"
  | "impact"
  | "tags"
  | "techStack"
  | "aiCapabilities"
  | "externalLabel"
  | "supportLabel"
>> & {
  ctaLabel?: string;
  focusPoints?: ProductFocusPoint[];
  proofPoints?: string[];
  detailSections?: ProductDetailSection[];
};

export type TranslationMeta = {
  sourceHash: string;
  generatedAt: string;
  generator: string;
};