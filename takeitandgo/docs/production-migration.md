# Production migration checklist

This checklist is a proposal for the repository extraction. It does not authorize or perform the production cutover.

1. Create the public `nickhilster/takeitandgo` repository after reviewing its source files and choosing a license.
2. Copy the `takeitandgo/` subtree to the new repository root, preserving history if practical. Do not delete the original subtree.
3. Confirm GitHub Actions workflows are visible; run CI and dispatch discovery and verification manually. Review permissions and artifacts.
4. Verify the extracted project with `npm ci`, `npm run validate`, `npm run build`, and `npm run smoke`; inspect the preview site and its links/interactions.
5. Verify the existing Vercel project settings, Git authorization, root directory, build command/output, environment, and protection settings. Keep the existing project and domain.
6. Connect the existing Vercel project to the new repository only after preview verification. Deploy a preview, inspect it, then make the production change with a rollback path to the old repository.
7. Verify production URL, TLS, forms, search/filter/card interactions, and a successful deployment. Keep the old source subtree until a separately reviewed PR after the rollback window.

No Vercel project IDs, tokens, or environment values belong in this repository.
