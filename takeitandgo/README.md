# Take It And Go

Independent Astro site for `takeitandgo.teambotics.app`.

This project is intentionally separate from the main Teambotics website. It exists as a standalone deployment boundary for open-source releases, even when the code overlaps with Teambotics products or internal work.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel deployment

1. Create a new Vercel project for `takeitandgo.teambotics.app`.
1. Link this folder to that project from inside `takeitandgo/`.
1. Deploy this folder as its own app, not as part of the root Next.js site.

Recommended CLI flow:

```bash
vercel link --yes
vercel env pull .env.local
vercel deploy --prod
```

Project scripts:

```bash
npm run vercel:link
npm run vercel:env:pull
npm run vercel:deploy
npm run vercel:deploy:prod
```

## Project boundary

- Framework: Astro
- Scope: public OSS landing page only
- Domain: `takeitandgo.teambotics.app`
- Ownership: Teambotics umbrella project, but independently deployed
- No dependency on the root Next.js app
- Machine-readable deploy metadata: [`deployment.json`](./deployment.json)
