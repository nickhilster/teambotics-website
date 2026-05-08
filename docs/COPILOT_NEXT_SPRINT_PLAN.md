# GitHub Copilot Sprint Plan: Public Site Completion + Chatbot Activation

## Sprint Goal

Move Teambotics from a polished launch site to a complete public company site with a strongly grounded chatbot, lead capture, and automated knowledge ingestion.

This sprint should focus on:

- Public-site completeness.
- Chatbot activation.
- Simple lead capture.
- Automated ingestion from site content and the four featured project repositories.

Admin feature expansion is explicitly out of scope for this sprint except where needed to keep existing admin routes from breaking.

## Current Production Baseline

The site is a Next.js 16 / React 19 App Router project.

Already working:

- Homepage with workflow, enablement, and strategy positioning.
- Product case-study routes for:
  - `/products/ltb-buddy`
  - `/products/easybuddy`
  - `/products/code2motion`
  - `/products/storytellr`
- Public chat widget connected to `/api/chat`.
- Chat runtime with rate limiting, moderation, local retrieval, fallback responses, sources, suggestions, and telemetry hooks.
- Neon-backed admin/chatbot schema direction.
- Knowledge document generation script.
- Unit, smoke, and accessibility test coverage.

Known gaps:

- Placeholder pages still exist for Privacy, Terms, GitHub, and LinkedIn.
- LinkedIn should point to the real company page.
- GitHub repositories are private, so public GitHub links should not be exposed.
- Chatbot needs production secrets and real ingestion.
- Chatbot must be very strongly grounded.
- Lead capture does not exist yet.
- Project proof assets and deeper case-study data are separate future sprints.

## Product Decisions From Owner

- Sprint priority: public-site completeness plus chatbot activation.
- OpenAI key will be provided later as `OPENAI_API_KEY`.
- Database should be Neon, connected through Vercel environment variables.
- Admin password work is deferred until the admin feature sprint.
- Chatbot corpus should include:
  - Site copy.
  - The four featured project repositories from GitHub, if accessible.
- Chatbot should regularly refresh the corpus from those repositories every 48 hours.
- Legal/company documentation will be drafted separately by Claude.
- Add a simple interactive lead form.
- LinkedIn destination: `https://www.linkedin.com/company/teambotics-inc`
- GitHub links should not point to private repositories.
- Product proof/content deepening is deferred to separate project-specific sprints.
- Admin users for now: owner only.
- Chatbot grounding level: very strong.
- Release style: single sprint release.

## Required Secrets And Environment Variables

Required for chatbot activation:

- `OPENAI_API_KEY`
- One Neon/Postgres URL already supported by the codebase:
  - `NEON_DB_URL`, or
  - `NEON_DATABASE_URL`, or
  - `DATABASE_URL`, or
  - `POSTGRES_URL`

Optional model overrides:

- `OPENAI_CHAT_MODEL`
- `OPENAI_EMBEDDING_MODEL`

Needed for private GitHub repository ingestion:

- A GitHub access mechanism that can read the four private project repositories.
- Prefer a fine-grained GitHub token stored in Vercel, for example `GITHUB_INGEST_TOKEN`.
- Token permissions should be read-only and scoped only to the required repositories.

Needed for lead form:

- If storing leads in Neon only, no new third-party secret is required beyond the DB URL.
- If sending email notifications, add a provider later, for example Resend. Do not add this dependency unless the owner confirms it.

## Workstream 1: Public Site Completion

### Scope

Replace remaining public placeholders and remove private GitHub exposure.

### Tasks

1. Update LinkedIn link.
   - Replace `/linkedin-placeholder` with `https://www.linkedin.com/company/teambotics-inc`.
   - Use external-link behavior where appropriate.

2. Remove or reframe GitHub link.
   - Do not expose private repository URLs.
   - Either remove the footer GitHub link or route it to a simple "Repository access is private" page.
   - Recommended: remove GitHub from public footer for now.

3. Replace Privacy and Terms placeholder pages.
   - Use Claude-produced docs from `docs/` as the source.
   - Build real pages at the existing routes or rename to final routes:
     - Recommended final routes: `/privacy` and `/terms`.
   - Keep redirects or compatibility links from placeholder routes if needed.

4. Update sitemap and footer links.
   - Ensure sitemap references final public pages.
   - Ensure footer does not contain placeholder links.

### Acceptance Criteria

- No public footer links point to placeholder routes.
- LinkedIn opens the Teambotics company page.
- Privacy and Terms pages render real content.
- `rg -n "placeholder" app components lib` shows no user-facing placeholder pages or links, except legitimate input placeholder attributes.
- `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.

## Workstream 2: Lead Form

### Scope

Add a simple, interactive lead form that captures useful inbound leads without adding unnecessary operational complexity.

### Recommended UX

Keep it short and low-friction:

- Name
- Email
- Organization
- Interest area
- Message

Recommended interest areas:

- Workflow strategy
- Team enablement
- AI chatbot or assistant
- Legal/compliance workflow
- Creative or interactive platform
- Other

### Implementation Direction

1. Replace or complement the current `mailto:` CTA in `HomeCTASection`.
2. Add a compact lead form near the contact CTA.
3. Create an API route, likely `app/api/leads/route.ts`.
4. Store submissions in Neon.
5. Add basic validation:
   - Required name, email, and message.
   - Valid email shape.
   - Message length limit.
   - Honeypot field for spam.
6. Add friendly success and error states.
7. Keep the form accessible and keyboard-friendly.

### Data Model

Suggested table:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  interest_area text,
  message text NOT NULL,
  page_path text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

### Acceptance Criteria

- User can submit a valid lead from the homepage.
- Invalid submissions show clear inline errors.
- Successful submissions persist to Neon.
- No lead data is logged to the browser console.
- Tests cover basic validation and successful submission.

## Workstream 3: Strongly Grounded Chatbot Activation

### Scope

Turn the chatbot from a working runtime into a production-ready grounded assistant.

### Grounding Policy

The assistant must be very strongly grounded.

Behavior requirements:

- Answer only from retrieved Teambotics/site/project corpus content.
- Refuse or defer when context is missing.
- Clearly separate informational content from advice, especially around legal/compliance topics.
- Never imply it is a lawyer, professional advisor, or source of legal advice.
- Provide sources when answering.
- Prefer concise, useful answers over speculative or broad claims.

### Tasks

1. Verify OpenAI and Neon environment variables in Vercel.
2. Seed existing site knowledge into Neon.
3. Ensure runtime prefers database retrieval once documents exist.
4. Set strict grounding behavior in chatbot settings.
5. Tune fallback behavior for missing or weak context.
6. Add a small evaluator set for key public questions:
   - "What does Teambotics do?"
   - "What is LTB Buddy?"
   - "Can LTB Buddy give me legal advice?"
   - "What is EasyBuddy?"
   - "What is Code2Motion?"
   - "What is Storytellr?"
   - "How do I contact Teambotics?"
   - "What private clients has Teambotics worked with?"
7. Validate that unsupported claims are refused or redirected.

### Acceptance Criteria

- Chatbot returns sourced answers for supported Teambotics questions.
- Chatbot refuses unsupported or sensitive claims.
- Chatbot does not answer legal questions as legal advice.
- Chatbot returns `mode`, `sources`, `suggestions`, and `conversationId`.
- Logs are created for production chat interactions when Neon is configured.

## Workstream 4: Automated GitHub Repository Ingestion

### Scope

Create an automated ingestion pipeline that refreshes chatbot corpus content from the four featured project repositories every 48 hours.

### Featured Projects

The ingestion system should support these products:

- LTB Buddy
- EasyBuddy
- Code2Motion
- Storytellr

The actual private GitHub repository identifiers should be configured through environment variables or a private config file that is not committed if it contains sensitive information.

Suggested environment variables:

- `GITHUB_INGEST_TOKEN`
- `GITHUB_INGEST_REPOS`

Example format:

```txt
GITHUB_INGEST_REPOS=owner/ltb-buddy,owner/easybuddy,owner/code2motion,owner/storytellr
```

### Repository Content To Ingest

Prefer high-signal text sources:

- README files.
- Docs folders.
- Product specs.
- Architecture notes.
- Public-facing copy.
- Changelogs.
- API route summaries when useful.
- Package metadata.

Avoid low-signal or sensitive sources:

- `.env` files.
- Secrets.
- Credentials.
- Dependency lockfiles.
- Build artifacts.
- Large generated files.
- Raw logs.
- User data.
- Test snapshots unless explicitly useful.

### Implementation Direction

1. Add a GitHub ingestion service under `lib/chat` or `scripts`.
2. Use the GitHub API with a read-only token.
3. Fetch changed files by repository commit SHA.
4. Convert selected files into normalized knowledge documents.
5. Store document metadata:
   - repo name
   - branch
   - commit SHA
   - file path
   - product mapping
   - content hash
   - last ingested timestamp
6. Skip unchanged content using content hashes.
7. Chunk large documents before embedding.
8. Upsert documents and embeddings into Neon.
9. Record ingestion runs in `chatbot_ingestion_runs`.
10. Surface source status in the existing admin sources/ingestion panels.

### 48-Hour Refresh

Use Vercel Cron if available for this project.

Recommended route:

- `app/api/cron/ingest-github/route.ts`

Recommended schedule:

```json
{
  "crons": [
    {
      "path": "/api/cron/ingest-github",
      "schedule": "0 6 */2 * *"
    }
  ]
}
```

Protect the cron route:

- Require a secret header or token such as `CRON_SECRET`.
- Do not allow unauthenticated public ingestion triggers.

### Acceptance Criteria

- Manual ingestion can be triggered locally or through a protected endpoint.
- Scheduled ingestion runs every 48 hours in production.
- Ingestion skips unchanged files.
- Ingestion records source and run metadata.
- Chatbot answers can cite GitHub-derived knowledge where appropriate.
- No private repository links or sensitive file contents are exposed publicly.

## Workstream 5: QA And Release

### Required Validation

Run before release:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

### Add Or Update Tests

Recommended:

- Lead form validation unit tests.
- Lead API route tests if practical.
- Chatbot grounding tests.
- Retrieval tests for seeded site docs and GitHub-derived docs.
- Smoke test for `/privacy`, `/terms`, homepage lead form, and chat open/send.
- Accessibility test for lead form.

### Production Sanity Checks

After deployment:

- Homepage loads.
- Privacy and Terms load.
- LinkedIn footer link points to the correct company page.
- Lead form submission works against production Neon.
- Chatbot answers supported questions with sources.
- Chatbot refuses unsupported legal/advice-style questions.
- Vercel deployment is `READY`.

## Out Of Scope For This Sprint

- Deep project-specific proof pages.
- Full admin feature expansion.
- Multi-user admin auth.
- Public GitHub repository links.
- Email marketing automation.
- CRM integration.
- Rebuilding the visual design.

## Suggested Sprint Order

1. Public links and placeholder cleanup.
2. Lead form data model and API.
3. Lead form UI and tests.
4. Seed current site copy into Neon.
5. Tighten chatbot grounding and evaluator prompts.
6. Add GitHub ingestion service.
7. Add protected 48-hour cron.
8. Wire ingestion metadata into existing admin surfaces.
9. Run full QA.
10. Deploy once as a coordinated production release.

