# Blog deployment guardrail

The Teambotics repository does not contain the blog source. It lives in the public `BLOGS` repository under `teambotics/` and deploys independently to `blog.teambotics.app` via the Vercel project `teambotics-blog`.

Incident note (2026-09-25): after the migration, the blog domain served the Teambotics website landing page because the blog deployment/domain routing was stale. Keep the blog out of this repository, and do not change the blog domain to point at the website project. Blog changes must be made and deployed from `BLOGS/teambotics`; verify the custom domain returns blog content after each deployment.

Migration correction (2026-09-26): the first monorepo migration accidentally used the Teambotics subtree for both blog directories. `BLOGS/teambotics` was already the correct Teambotics source and must remain independent from `BLOGS/nikdesign`. Confirm each Vercel project is linked to its matching subdirectory before deployment.
