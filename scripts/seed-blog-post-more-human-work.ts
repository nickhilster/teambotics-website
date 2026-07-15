/**
 * Seed a Teambotics blog post on building software that reduces screen time,
 * removes repetitive work, and gives teams more room for human interaction.
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
    "The best business software should feel less like another system to manage and more like a capable new team member—one that handles repetitive digital work so your people can focus on judgment, collaboration, and customers.",
  content: `## The Real Cost of Digital Work

Most teams do not have a shortage of software.

They have a shortage of time.

A typical workday is already divided across inboxes, documents, dashboards, approvals, project tools, reporting systems, and internal chat. Each platform may be useful on its own, but together they create a steady stream of small administrative demands.

Copy this. Reformat that. Find the latest version. Remove sensitive details. Rewrite the message. Update the status. Move the information into another system.

None of these tasks looks significant in isolation. Collectively, they consume the attention that should be going toward customers, colleagues, decisions, and creative problem-solving.

That is the problem we care about.

## A Better Standard for Business Software

We believe a business product should behave less like another screen to manage and more like a capable new member of the team.

A useful team member does not create more process for everyone else. They absorb work. They understand their role. They make the people around them more effective.

Software should be held to the same standard.

The goal is not to automate every part of a job. The goal is to remove the repetitive digital work around the job so that people have more room to do the parts that require judgment, empathy, context, creativity, and trust.

That distinction matters.

Technology is at its best when it expands human capacity. It is at its worst when people spend their day maintaining the technology itself.

## Every Product Should Earn Its Place on the Team

When we design a product, we ask a simple question:

**What work will this take off someone's plate?**

Not what dashboard can we add. Not how many settings can we expose. Not how impressive the technology sounds.

What recurring burden will disappear?

A strong product should be able to stand on its own, solve a clear problem, and deliver value without requiring a training program. The user should not need to go to school to learn the tool. The product should make the right action visible before the user has to search for it.

That is a demanding design standard, but it is an important one. Complexity in the underlying system should not become complexity for the person using it.

The result should feel natural:

- The next step is clear.
- The repetitive work is reduced.
- The user remains in control.
- The outcome is useful immediately.

## Less Screen Interaction, More Human Interaction

For most organizations, the highest-value work still happens between people.

A manager coaching an employee.

A consultant listening carefully to a client.

A healthcare professional reassuring a patient.

A sales team understanding what a customer actually needs.

A project team resolving uncertainty together.

These moments require attention. They are difficult to automate well, and in many cases they should not be automated at all.

But they can be protected.

When software handles the mundane preparation, formatting, organization, transformation, and follow-up work, people can spend less time interacting with digital screens and more time interacting with one another.

That is not anti-technology. It is a more mature use of technology.

The screen is a tool, not the destination.

## Useful Without Becoming Dependent

We also believe software should remain dependable when connectivity is limited or unavailable.

Cloud services can add significant value. They can improve collaboration, provide access to powerful models, enable synchronization, and connect teams across locations. We use that leverage where it genuinely helps.

But connectivity should not always be the price of admission.

Where practical, products should continue doing meaningful work locally. This creates resilience, improves privacy, and gives organizations more control over how their information is handled.

The internet can supercharge a product without being the only reason it works.

For teams handling sensitive documents, proprietary knowledge, regulated information, or client material, that architectural choice matters. Privacy is stronger when it is built into how the product operates, not added later as a policy statement.

## Independent Value, Greater Value Together

Each tool should justify its own place in the organization.

At the same time, tools can become more valuable when they work together. Shared context, consistent workflows, local data, and carefully designed integrations can reduce the friction between tasks without forcing teams into a monolithic platform.

That means organizations do not have to choose between focused products and connected systems.

They can have both:

- Products that solve one job well.
- Products that remain useful independently.
- Products that become more capable when connected.
- Products that preserve user choice and control.

The business value comes from that combination. Standalone usefulness creates trust. Interoperability creates leverage.

## The Outcome We Are Building Toward

We are not trying to give teams more software to operate.

We are trying to give them more capacity.

More time to speak with customers.

More time to make good decisions.

More time to teach, collaborate, build, and lead.

Less time spent copying, formatting, searching, switching, and repeating.

The best technology does not demand constant attention. It quietly removes friction and helps the team perform at a higher level.

That is the standard we are building toward: software that feels intuitive from the first moment, remains useful when the internet is unavailable, protects the work entrusted to it, and takes responsibility for the repetitive tasks that should never have consumed so much human time in the first place.

Every product should earn its place like a strong new team member.

It should make the whole team more human—not less.`,
  cover_image_url: null,
  author: "Nikhil Khedkar",
  tags: ["human-centered-software", "workflow-design", "local-first", "team-productivity", "automation"],
  status: "published" as const,
  published_at: new Date("2026-07-15T17:30:00Z").toISOString(),
};

async function run() {
  const connectionString = getConnectionString();
  const sql = neon(connectionString);

  console.log(`Seeding blog post: ${POST.title}`);

  const existing = await sql`
    SELECT id FROM blog_posts WHERE slug = ${POST.slug} LIMIT 1
  `;

  if (existing.length > 0) {
    console.log(`  ⏭  Skipping "${POST.title}" (slug already exists)`);
    return;
  }

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
  `;

  console.log(`  ✓  Created "${POST.title}"`);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
