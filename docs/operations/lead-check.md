# Manual lead checks

Until a mail provider is configured, the website contact form saves valid submissions to Neon's `leads` table without sending a notification. The form's success response means the database insert completed; it does not mean anyone has seen the lead.

The site owner should check the production Neon database at least once each business day. In the Neon SQL editor, run:

```sql
SELECT id, created_at, name, email, organization, interest_area, message, page_path
FROM leads
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at ASC;
```

Review new rows against a private record of handled lead IDs; the seven-day overlap prevents a missed day from hiding recent submissions. Reply to qualified inquiries from the normal business inbox. Keep lead contents out of the repository and public issue tracker.

If a check fails or a lead is missing after a confirmed form success response, inspect the Vercel `/api/leads` function logs and the configured production `NEON_DB_URL`. Do not test with a real person's data without their consent. Add server-side mail notification when an email provider and recipient inbox are available, then verify delivery before retiring this procedure.
