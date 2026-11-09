# Mobile layout audit — teambotics.app

**Date:** 2026-11-09  
**Scope:** All 13 live pages rendered in real Chrome at 390px (phone) and 1280px (desktop); every sheet inspected by eye.  
**Method:** site check against https://teambotics.app/. Read-only; no site or repo changes.  
**Requested by:** Nikhil. **Run by:** The Maestro / Sawyer (Symphony).

## Summary

teambotics.app holds up well on a phone. Across all 13 pages there was no sideways scrolling, no clipped or broken text, and no broken images at 390px. Two real issues show up, both site-wide, plus a few minor items.

## Limits of this run

- Rendered at 390px only; 360px and 414px were not checked.
- Sheets are thumbnails, so fine details are unconfirmed.
- The open mobile menu was not rendered, so menu overlap is untested.
- Tap-target sizes, contrast, and the 200% text-overflow figure are measured by the checker, not seen by eye. They are marked as such below.

## Site-wide (seen on every page, 390px)

1. **Floating "Chat" button overlaps page content. Severity: notable.** A pink pill fixed at the right edge sits on top of copy or controls: over body text on `/privacy`, `/terms`, `/land-acknowledgment` and `/about`; over the hero image on `/everythings-computer`; and right under or over the hero buttons ("Open Product" / "Discuss ..." / "All products") on every product page. It will cover text as the visitor scrolls, and sits close enough to the hero buttons to risk blocking taps on `/products/ryfine`, `ltb-buddy`, `redactorbuddy`, `mdownmanager` and `easybuddy`.
2. **Header controls are tiny tap targets. Severity: notable.** The menu toggle, the theme toggle and the language select are small icons in the header on every page. Measured: menu toggle ~20x36px, theme toggle ~19x36px, the "..." links ~17x30px (target is 44x44px). Footer credit links measured ~19-21px tall (123x19 on home, 169x21 on `/everythings-computer`). Measured, and consistent with how small they look in the sheets.
3. **No visible call to action in the phone header. Severity: minor.** The nav collapses into the menu button, so "Contact" is only inside the menu. The home page's main action was flagged as not visible on phone. The hero button "Discuss your workflow" is visible, so the path to contact still exists.

## Per page

- **https://teambotics.app/** — [sheet](https://static.wixstatic.com/media/5829b8_3a857ab7712e48958ab9266b5b2b6ac8~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-home-0.jpg)  
  Layout clean. Hero, "Map the task" steps, "Selected work" cards and contact section stack to one column with even spacing and no overflow. Issues: the site-wide items above. Minor (measured): small 12px mono labels have low contrast (3.63:1 vs 4.5:1), and the privacy link in the form note is not distinguishable from surrounding text.
- **https://teambotics.app/privacy** — [sheet](https://static.wixstatic.com/media/5829b8_2626b1bdbb644b849646d6ecb6abe89d~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-privacy-1.jpg)  
  Long text wraps cleanly in a single column. Chat button over body text (site-wide item 1). Unconfirmed: the "Third-Party Services" table was flagged as a scrollable region; could not tell from the thumbnail whether it scrolls sideways on a phone. Worth a manual look.
- **https://teambotics.app/land-acknowledgment** — [sheet](https://static.wixstatic.com/media/5829b8_3a481dcf4d394e77ab8c8fed0ef688bf~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-land-acknowledgment-2.jpg)  
  Clean. Region lists wrap well. Only the site-wide items.
- **https://teambotics.app/about** — [sheet](https://static.wixstatic.com/media/5829b8_4275ddea29924b91bf08e1f1859d955a~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-about-3.jpg)  
  Clean. The product list and footer links wrap properly. Only the site-wide items.
- **https://teambotics.app/terms** — [sheet](https://static.wixstatic.com/media/5829b8_ed49da558b464cc3b439a2b6b3d2c067~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-terms-4.jpg)  
  Clean. Only the site-wide items.
- **https://teambotics.app/everythings-computer** — [sheet](https://static.wixstatic.com/media/5829b8_677122ab50044fcfb94fd963e9b7aa02~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-everythings-computer-5.jpg)  
  Photo loads and scales to the width; the pledge box, record list and cards stack well. Chat button sits over the photo. Minor (measured, not seen): with text enlarged to 200% the page scrolls sideways by 39px, from the press pledge section (intro, overline and "Press pledge" heading). Normal text size is fine.
- **https://teambotics.app/products/ryfine** — [sheet](https://static.wixstatic.com/media/5829b8_b4c11b54b0a04ebdb24a51a5278dd6a8~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-products-ryfine-6.jpg)  
  Clean stacked layout: badges, three-card block, architecture cards, capabilities list, profile block. Chat button over the hero button row.
- **https://teambotics.app/products/ltb-buddy** — [sheet](https://static.wixstatic.com/media/5829b8_9dfdbf639b6349449064152fd46b97e1~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-products-ltb-buddy-7.jpg)  
  Clean, with the Chat button beside the hero buttons.
- **https://teambotics.app/products/redactorbuddy** — [sheet](https://static.wixstatic.com/media/5829b8_2479c19048504d6b80b1ea46da5c3006~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-products-redactorbuddy-8.jpg)  
  Clean. Chat button beside the hero buttons.
- **https://teambotics.app/products/mdownmanager** — [sheet](https://static.wixstatic.com/media/5829b8_1b4c92d939524234a5a6f54ddbd9e5da~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-products-mdownmanager-9.jpg)  
  Clean. Chat button beside the hero buttons.
- **https://teambotics.app/products/code2motion** — [sheet](https://static.wixstatic.com/media/5829b8_b2d3cc43580f45b190c449c3798d7e72~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-products-code2motion-10.jpg)  
  Clean. Chat button just below the hero buttons, over the first card.
- **https://teambotics.app/products/easybuddy** — [sheet](https://static.wixstatic.com/media/5829b8_90c2c2fb802242e8ad6fec91d28db63a~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-products-easybuddy-11.jpg)  
  Clean. Chat button beside the hero buttons.
- **https://teambotics.app/products/storytellr** — [sheet](https://static.wixstatic.com/media/5829b8_01b9f5802e094ddfaed617b05d46d8da~mv2.jpg/v1/fit/w_1600,h_4000,q_90/site-products-storytellr-12.jpg)  
  Clean. Chat button beside the hero buttons.

## Not reported as mobile issues

The check also failed pages for things that are not mobile layout and mostly assume a Wix-built site: no "Built with" badge, no photographs on most pages, missing og tags and canonical links, a Wikimedia image not served through a CDN, and a 307 instead of 404 on unknown addresses. The site is built and deployed on Vercel, so these were left out. Other accessibility items (hidden mobile drawer containing focusable links, no visible focus ring on the language select) came from the check, not the sheets.

## Prioritized fixes

1. Move or shrink the Chat button so it does not cover content or the hero buttons on phones.
2. Enlarge the header menu, theme and language controls (and footer credit links) to roughly 44px tap targets.
3. Consider a visible Contact button in the phone header.
4. Manually check the `/privacy` table and the `/everythings-computer` press pledge at large text sizes.
5. Re-run at 360px and 414px; this run only covered 390px.

Tracked as **TBW-006**.
