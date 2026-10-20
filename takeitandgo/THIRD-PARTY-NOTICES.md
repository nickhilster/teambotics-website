# Third-party assets and content

The MIT license in `LICENSE` applies to original Take It and Go source code and documentation authored for this project. It does not replace the separate terms for third-party assets or npm packages.

## Typeface

The site requests **Space Grotesk** from Google Fonts; font files are served by Google Fonts and are not copied into this repository. The upstream typeface project identifies Space Grotesk as licensed under the SIL Open Font License 1.1. See the [upstream project](https://github.com/floriankarsten/space-grotesk) and its [OFL 1.1 text](https://github.com/floriankarsten/space-grotesk/blob/master/OFL.txt).

## Project references and editorial copy

The picks link to their upstream repositories. Names, repository URLs, license identifiers, stars, activity dates, and issue counts are repository facts with source links recorded in `data/picks.json`, `data/observed.json`, and `data/discovery-candidates.json`. The pick descriptions, rationale, audience notes, and quickstarts are original editorial material; they are not copied from upstream README or repository-description text. Automated candidate reports intentionally omit upstream repository descriptions and never add candidates to the curated list.

No upstream project logos, screenshots, or other project artwork are included.

## npm packages

`package-lock.json` records the dependency graph and each package's declared license. Astro is the project's direct build dependency; packages retain their own licenses, including MIT, Apache-2.0, BSD, ISC, MPL, LGPL, Blue Oak, CC0, and 0BSD terms. Dependencies are installed from their package sources and are not vendored into this repository. Review the relevant package license before redistributing a dependency or build artifact that contains it.
