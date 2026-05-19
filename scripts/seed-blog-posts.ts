/**
 * Seed 3 placeholder blog posts for UI/UX testing.
 * Usage: pnpm blog:seed
 */
import { neon } from "@neondatabase/serverless";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function loadEnvFile(filename: string) {
  const filepath = path.join(repoRoot, filename);
  if (!fs.existsSync(filepath)) return;
  const content = fs.readFileSync(filepath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const sep = trimmed.indexOf("=");
    if (sep < 0) continue;
    const key = trimmed.slice(0, sep).trim();
    const value = trimmed.slice(sep + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = value;
  }
}

[".env.local", ".env.production.local", ".env"].forEach(loadEnvFile);

function getConnectionString() {
  for (const key of ["NEON_DB_URL", "NEON_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL"]) {
    const val = process.env[key]?.trim();
    if (val && !val.includes("placeholder") && !val.includes("your-")) return val;
  }
  throw new Error(
    "No Neon database connection string found. Set NEON_DB_URL or DATABASE_URL in .env.local"
  );
}

const PLACEHOLDER_POSTS = [
  {
    title: "The Future of Industrial Robotics: What 2025 Looks Like on the Factory Floor",
    slug: "future-industrial-robotics-2025",
    excerpt:
      "From collaborative arms to autonomous mobile robots, the manufacturing floor is undergoing its most significant transformation in decades. Here's what's actually changing.",
    content: `## The Shift Is Already Here

The robots of science fiction — bulky, isolated, dangerous — are giving way to something far more interesting: machines that work *alongside* people, learn from their environment, and adapt in real time.

In 2025, more than 60% of new industrial robot installations include some form of collaborative safety feature. That's not a trend; it's a fundamental shift in how we think about automation.

## Collaborative Robots (Cobots) Grow Up

Early cobots were slow. Necessarily so — without the cage, they needed to be safe by design. Speed was sacrificed for proximity. That trade-off is eroding fast.

Modern force-torque sensing, combined with improved vision stacks, now allows cobots to operate at speeds that would have been unsafe just three years ago — while still stopping instantly if a human hand gets too close.

**What this means for manufacturers:** You no longer need to choose between safety and throughput. A well-deployed cobot line can match the cycle time of a traditional guarded robot cell while remaining fully accessible to operators.

## Autonomous Mobile Robots in the Middle Layer

AMRs (Autonomous Mobile Robots) have quietly become the connective tissue of the modern factory. They handle the movement that humans find tedious and that traditional conveyors can't handle flexibly.

The real unlock was fleet management software. Single AMRs are interesting. A fleet of 20, dynamically re-routing around each other and responding to production priorities in real time, is genuinely transformative.

## The Software Layer Is Where Battles Are Won

Hardware is increasingly commoditised. The robots from major vendors are good — reliably good. The differentiation now lives in:

- **Programming interfaces** — how fast can you teach the robot a new task?
- **Integration depth** — how well does it talk to your MES, ERP, and vision systems?
- **Diagnostics and uptime** — predictive maintenance over reactive maintenance

At Teambotics, we spend the majority of our time in this layer. The robot is table stakes.

## What's Next

Keep watching: AI-driven path planning, digital twin integration for commissioning, and the maturation of soft robotics for handling irregular objects. The next three years will be as dramatic as the last ten.`,
    cover_image_url: null,
    author: "Nikhil Khedkar",
    tags: ["robotics", "industry", "automation"],
    status: "published" as const,
    published_at: new Date("2025-03-12T09:00:00Z").toISOString(),
  },
  {
    title: "How to Choose the Right Automation Engagement Model for Your Business",
    slug: "choosing-automation-engagement-model",
    excerpt:
      "Turnkey project, retained partner, or internal build? Each model carries different risk profiles, cost structures, and outcomes. Here's a framework for making the right call.",
    content: `## Not All Automation Projects Are the Same

A single-station palletising cell and a factory-wide MES integration are both "automation projects." Treating them the same way is a recipe for disappointment.

The engagement model you choose should match:

1. The **scope and complexity** of the project
2. Your team's **internal capability**
3. Your **risk tolerance**
4. Your **time horizon**

## Model 1: Turnkey Project

You scope it, you build it, you hand it over.

**Best for:** Well-defined problems with stable requirements. A pick-and-place cell with known part geometries. A weld fixture replacement.

**Watch out for:** Scope creep. Turnkey works when the spec is truly fixed. If you expect the requirements to evolve, you'll end up in costly change orders.

**Cost structure:** High upfront capital, predictable. Good for CapEx-heavy organisations with board approval processes.

## Model 2: Retained Integration Partner

An ongoing relationship where the partner is embedded in your roadmap, not just a single project.

**Best for:** Organisations with multiple automation initiatives, internal teams that need to develop capability over time, and anyone who wants IP retention and knowledge transfer.

**Cost structure:** Mix of project-based and retainer. More predictable over a 12–24 month horizon.

This is Teambotics' preferred model. It produces better outcomes because we understand *why* you're automating, not just *what* to build.

## Model 3: Internal Build with External Support

You hire the engineers, own the stack, and bring in specialists for specific gaps.

**Best for:** Organisations with genuine long-term automation ambition and the budget to build a team.

**Harder than it looks:** Recruiting automation engineers is competitive. Training them takes 12–18 months. You'll likely need external support longer than you expect.

## A Framework for Deciding

Ask yourself three questions:

- **Will the requirements change?** If yes, avoid pure turnkey.
- **Do we need to own this capability internally?** If yes, build a retained partnership with knowledge transfer baked in.
- **Is this a one-off or recurring problem?** One-off leans toward project; recurring leans toward partnership.

There's no universally correct answer — but there is a right answer for your situation. We're happy to help you work through it.`,
    cover_image_url: null,
    author: "Nikhil Khedkar",
    tags: ["strategy", "automation", "business"],
    status: "published" as const,
    published_at: new Date("2025-04-22T10:30:00Z").toISOString(),
  },
  {
    title: "Vision-Guided Robotics: From Lab Curiosity to Production Reality",
    slug: "vision-guided-robotics-production",
    excerpt:
      "Machine vision has been 'almost ready' for most of manufacturing's history. In 2025, the story is finally different — and the use cases are expanding faster than most expect.",
    content: `## The Long Wait Is Over

Machine vision has been a promising technology for decades. Pick-and-place with vision guidance, bin picking, quality inspection — the demos were always impressive. The production deployments were... less so.

The reliability gap between lab performance and factory floor performance was enormous. Lighting changes, part variation, vibration, dust — real environments are brutal.

That gap has closed. Not because the algorithms got incrementally better, but because three things converged at once:

1. **Deep learning inference became fast and cheap** — running a capable neural network on edge hardware is no longer an expensive proposition.
2. **Structured light and time-of-flight sensors matured** — 3D point clouds from $500 sensors are now accurate enough for production use.
3. **Software stacks for deployment improved dramatically** — you no longer need a PhD to deploy a vision system.

## What's Actually Working in Production Today

**Bin picking** is genuinely solved for many part geometries. Random bin picking of machined metal parts, injection moulded components, and sheet metal blanks is a production reality, not a demo.

**Quality inspection** at line speed is reliable for defined defect classes. Surface scratches, dimensional checks, colour variation, label placement — all of these work at 100% inspection rates on production lines.

**Flexible fixturing** — using vision to compensate for part position variation without hard tooling — is opening up small-batch production to automation in ways that weren't possible three years ago.

## What's Still Hard

**Transparent and reflective materials** remain difficult. Plastic bags, polished chrome, glass — specular reflections defeat most 2D systems and challenge many 3D systems.

**Novel defect detection** — finding defects you haven't seen before — is still fundamentally a hard problem. Current systems are strong at classifying known defect types; they're not great at flagging anomalies they weren't trained on.

**High-mix, high-variation environments** where part geometry changes frequently still require significant re-training investment, though few-shot learning approaches are improving this.

## Getting Started Without Over-Investing

Our recommendation for most clients: start with a well-defined, high-value inspection step. Don't try to automate the hardest problem first.

Define success criteria clearly — defect escape rate, false positive rate, cycle time — before you buy anything. Run a proof of concept with real production parts, real lighting, real line conditions.

Vision systems that work in controlled conditions often fail in production. Validate early, validate hard.

The technology is ready. The discipline of deployment is what separates successful implementations from expensive lessons.`,
    cover_image_url: null,
    author: "Nikhil Khedkar",
    tags: ["vision", "robotics", "manufacturing"],
    status: "published" as const,
    published_at: new Date("2025-05-08T08:00:00Z").toISOString(),
  },
];

async function run() {
  const connectionString = getConnectionString();
  const sql = neon(connectionString);

  console.log("Seeding 3 placeholder blog posts…");

  for (const post of PLACEHOLDER_POSTS) {
    const existing = await sql`
      SELECT id FROM blog_posts WHERE slug = ${post.slug} LIMIT 1
    `;

    if (existing.length > 0) {
      console.log(`  ⏭  Skipping "${post.title}" (slug already exists)`);
      continue;
    }

    await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, author, tags, status, published_at)
      VALUES (
        ${post.title},
        ${post.slug},
        ${post.excerpt},
        ${post.content},
        ${post.cover_image_url},
        ${post.author},
        ${post.tags},
        ${post.status},
        ${post.published_at}
      )
    `;

    console.log(`  ✓  Created "${post.title}"`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
