import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function expectNoAccessibilityViolations(page: Page, pageUrl: string) {
  await page.goto(pageUrl);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(results.violations).toEqual([]);
}

test("homepage has no axe violations", async ({ page }) => {
  await expectNoAccessibilityViolations(page, "/");
});

test("product detail page has no axe violations", async ({ page }) => {
  await expectNoAccessibilityViolations(page, "/products/ltb-buddy");
});

test("privacy page has no axe violations", async ({ page }) => {
  await expectNoAccessibilityViolations(page, "/privacy");
});

test("terms page has no axe violations", async ({ page }) => {
  await expectNoAccessibilityViolations(page, "/terms");
});
