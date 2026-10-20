# Security policy

Report security issues privately to `hello@teambotics.com` with the subject `Take It and Go security`. Please include a concise impact description and steps to reproduce. Do not publish secrets or exploit details in a public issue.

The maintenance workflows call GitHub's API and never download, build, or execute code from discovered repositories. Pull request CI has read-only repository permissions and does not use `pull_request_target`.
