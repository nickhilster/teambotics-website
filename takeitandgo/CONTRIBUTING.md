# Contributing

## Propose a project

Open an issue or pull request with:

- The upstream repository URL and its license.
- What it does, who benefits, and a copy-pasteable quickstart.
- Primary documentation and evidence that the project is active and maintained.
- Any known security, privacy, or operational trade-offs.

Discovery candidates are leads, not endorsements. Automated workflows do not add entries to `data/picks.json`. A maintainer reviews and writes all editorial fields.

## Change the site

Run `npm ci`, `npm run validate`, `npm run build`, and `npm run smoke`. Keep build-time/API failure behavior graceful. Do not add candidate-repository checkouts, execute submitted code, or add secrets to a workflow. GitHub Actions permissions must stay limited to what each workflow needs.

## Licensing

Do not add or change the repository license in a contribution. The owner must make that decision explicitly. Upstream project licenses are recorded as metadata and are not endorsements or legal advice.
