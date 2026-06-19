import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

const products = [
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
    href: "/MdownManager",
    badge: "Live" as const,
    badgeVariant: "live" as const,
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
    href: "/RedactorBuddy",
    badge: "Early access" as const,
    badgeVariant: "pilot" as const,
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
