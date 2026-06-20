import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const products = [
  {
    name: "RyFine",
    tagline: "Prompt UX · Context refinement · AI-ready workflows",
    description:
      "Turns rough intent into clearer, reusable AI instructions so individuals and teams can get more reliable outputs across providers.",
    stats: [
      { label: "Position", value: "Flagship" },
      { label: "Workflow", value: "Prompt refinement" },
      { label: "Posture", value: "Local-first" },
    ],
    href: "/products/ryfine",
    badge: "Live" as const,
    badgeVariant: "live" as const,
  },
  {
    name: "LTB Buddy",
    tagline: "Legal intake · Filing support · Guided workflow",
    description:
      "Helps Ontario tenants move from a stressful plain-language complaint to a cleaner, more structured LTB filing workflow.",
    stats: [
      { label: "Stage", value: "Public beta" },
      { label: "Mode", value: "Voice-first" },
      { label: "Focus", value: "Ontario LTB" },
    ],
    href: "/products/ltb-buddy",
    badge: "In beta" as const,
    badgeVariant: "pilot" as const,
  },
  {
    name: "RedactorBuddy",
    tagline: "Compliance-ready · Offline PII redaction · Financial documents",
    description:
      "Strips names, account numbers, SSNs, and addresses from financial documents entirely on-device — no cloud, no subscription required.",
    stats: [
      { label: "Cloud calls", value: "0" },
      { label: "Formats", value: "6" },
      { label: "Offline", value: "100%" },
    ],
    href: "/products/redactorbuddy",
    badge: "Early access" as const,
    badgeVariant: "pilot" as const,
  },
  {
    name: "MDownManager",
    tagline: "Document operations · Markdown knowledge · AI-ready workflows",
    description:
      "Turns markdown-heavy documentation into a structured, searchable knowledge layer — built for SOPs, research notes, and handoff docs.",
    stats: [
      { label: "Free tier", value: "1 vault" },
      { label: "Platform", value: "Windows" },
      { label: "AI", value: "Local (Ollama)" },
    ],
    href: "/products/mdownmanager",
    badge: "Live" as const,
    badgeVariant: "live" as const,
  },
  {
    name: "Code2Motion",
    tagline: "Creative tech · Interactive motion · Browser-native experiences",
    description:
      "Turns code, motion, and generative interaction into playable browser experiences through a dual-sided creative platform.",
    stats: [
      { label: "Stage", value: "Early access" },
      { label: "Surface", value: "Play + build" },
      { label: "Delivery", value: "Web / PWA" },
    ],
    href: "/products/code2motion",
    badge: "Early access" as const,
    badgeVariant: "pilot" as const,
  },
  {
    name: "EasyBuddy",
    tagline: "AI onboarding · Service simulations · Workflow coaching",
    description:
      "A practice environment for service teams that need faster onboarding, realistic customer scenarios, and better workflow recall.",
    stats: [
      { label: "Stage", value: "Bespoke MVP" },
      { label: "Use case", value: "Auto service" },
      { label: "Mode", value: "Simulation" },
    ],
    href: "/products/easybuddy",
    badge: "Bespoke MVP" as const,
    badgeVariant: "live" as const,
  },
  {
    name: "Storytellr",
    tagline: "Narrative graph · Founder positioning · Client storytelling",
    description:
      "Connects milestones, themes, relationships, and proof points into a readable public narrative surface for complex work.",
    stats: [
      { label: "Stage", value: "Coming soon" },
      { label: "Model", value: "Narrative graph" },
      { label: "Audience", value: "Founders / teams" },
    ],
    href: "/products/storytellr",
    badge: "Coming soon" as const,
    badgeVariant: "default" as const,
  },
] as const;

export function ProductsSection() {
  return (
    <section className="section section--border" id="products">
      <Container>
        <SectionReveal>
          <SectionHeader
            eyebrow="Products"
            title="Built and shipping today"
          />
        </SectionReveal>

        <div className="products-grid">
          {products.map((product, index) => (
            <SectionReveal delay={index * 0.08} key={product.name}>
              <Link
                className="card product-card"
                href={product.href}
              >
                <div>
                  <div className="product-card__header">
                    <StatusBadge
                      label={product.badge}
                      variant={product.badgeVariant}
                    />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="product-card__arrow"
                      size={20}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__tagline">{product.tagline}</p>
                  <p className="product-card__desc">{product.description}</p>
                </div>

                <div className="product-card__stats">
                  {product.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="product-card__stat-value">{stat.value}</div>
                      <div className="product-card__stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
