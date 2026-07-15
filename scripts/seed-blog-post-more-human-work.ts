/**
 * Seed or update the Teambotics post on software that reduces screen work
 * and gives teams more room for human interaction.
 *
 * Usage: pnpm tsx scripts/seed-blog-post-more-human-work.ts
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

const POST = {
  title: "Software Should Give Your Team More Time With People",
  slug: "software-should-give-your-team-more-time-with-people",
  excerpt:
    "We build software to take mundane digital work off a team’s plate, so people can spend more time using judgment, serving customers, and working with one another.",
  content: `## Why We Keep Coming Back to This Problem

Most teams already have enough software.

What they do not have enough of is uninterrupted time.

A normal workday is spread across inboxes, documents, dashboards, approvals, project tools, and internal chat. None of those systems is necessarily the problem on its own. The problem is the accumulation of small digital tasks around the real work.

Copy this. Reformat that. Find the correct version. Remove sensitive information. Rewrite the message. Move the same material into another system.

Each task looks minor. Together, they consume a meaningful share of the day.

That is the problem we are building for.

## Software Should Behave Like a Good Team Member

Our view is fairly simple: a business product should earn its place on the team.

A good team member does not create unnecessary process for everyone else. They take responsibility for a clear area of work. They reduce pressure. They make the people around them more capable.

We think software should be held to the same standard.

That does not mean automating every part of a job. In many roles, the most valuable work still depends on judgment, context, trust, empathy, and conversation. Those are not inconveniences to eliminate. They are often the work itself.

The opportunity is to remove the repetitive digital work around those moments.

A manager should have more time to coach.

A clinician should have more time with a patient.

A consultant should have more time to understand the client.

A team should have more time to resolve a difficult decision together.

When software handles the routine preparation, formatting, organization, transformation, and follow-up, it protects the work that only people can do well.

## We Do Not Want Users to Go to School for the Product

Ease of use is not a finishing layer for us. It is part of the product strategy.

We do not want a team to need a training program before the software becomes useful. We want the product to make the next action visible before the user has to search for it.

That is a high standard, particularly when the underlying product is technically complex. But complexity in the system should not become complexity for the person using it.

The experience should feel clear:

- The next step is easy to recognize.
- The repetitive effort is reduced.
- The user remains in control.
- The value is visible quickly.

We will not always get that perfectly on the first attempt. Good product design is iterative. But the direction is consistent: the product should carry more of the cognitive load, not transfer it to the user.

## Local First, Connected When It Helps

We also believe useful software should not become useless the moment the internet is unavailable.

Cloud services can add significant leverage. They can provide access to stronger models, synchronization, collaboration, and external integrations. We use those capabilities where they improve the work.

But we do not think connectivity should always be the price of admission.

Where practical, our products are designed to continue performing meaningful work locally. That improves resilience and gives teams more control over sensitive information.

For organizations working with client material, regulated records, proprietary documents, or internal knowledge, privacy is stronger when it is supported by the architecture—not only by a policy statement.

The internet should be able to supercharge the product without being the only reason it functions.

## Each Product Should Stand on Its Own

We are building focused products, not features looking for a container.

Each product should solve a clear problem well enough to justify itself independently. A customer should not need to buy an entire suite to receive value from one tool.

At the same time, independent products can become more capable when they work together. Shared context, consistent workflows, and careful interoperability can reduce the friction between tasks without forcing the user into a large, monolithic system.

That balance matters to us.

Standalone value creates trust.

Interoperability creates leverage.

The connection between products should feel like an advantage, not a dependency.

## The Outcome We Are Working Toward

We are not trying to give teams more software to operate.

We are trying to give them more capacity.

More time with customers.

More time for decisions.

More time for collaboration, teaching, and leadership.

Less time spent copying, formatting, searching, switching, and repeating.

The best business software does not demand constant attention. It quietly removes friction and helps the team perform at a higher level.

That is the standard we are working toward: products that feel intuitive, remain useful when connectivity is limited, respect the work entrusted to them, and take responsibility for the mundane tasks that consume too much human time.

We are still building toward that standard. But the principle is settled.

Every product should earn its place like a capable new team member—and help the people using it spend more of their day being human.`,
  cover_image_url: null,
  author: "Nikhil Khedkar",
  tags: ["human-centered-software", "workflow-design", "local-first", "team-productivity", "automation"],
  status: "published" as const,
  published_at: new Date("2026-07-15T17:30:00Z").toISOString(),
};

async function run() {
  const connectionString = getConnectionString();
  const sql = neon(connectionString);

  console.log(`Seeding or updating blog post: ${POST.title}`);

  await sql`
    INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, author, tags, status, published_at)
    VALUES (
      ${POST.title},
      ${POST.slug},
      ${POST.excerpt},
      ${POST.content},
      ${POST.cover_image_url},
      ${POST.author},
      ${POST.tags},
      ${POST.status},
      ${POST.published_at}
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      content = EXCLUDED.content,
      cover_image_url = EXCLUDED.cover_image_url,
      author = EXCLUDED.author,
      tags = EXCLUDED.tags,
      status = EXCLUDED.status,
      updated_at = NOW()
  `;

  console.log(`  ✓  Seeded or updated "${POST.title}"`);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
