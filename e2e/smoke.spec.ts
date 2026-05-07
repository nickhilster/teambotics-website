import { expect, test } from "@playwright/test";

test("homepage exposes flagship product case studies", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Building intelligent")).toBeVisible();
  await expect(page.getByText("LTB Buddy").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Read case study/i }).first()).toBeVisible();
});

test("product detail pages render the ported case-study model", async ({ page }) => {
  const products = [
    ["ltb-buddy", "LTB Buddy"],
    ["easybuddy", "EasyBuddy"],
    ["code2motion", "Code2Motion"],
    ["storytellr", "Storytellr"],
  ];

  for (const [slug, name] of products) {
    await page.goto(`/products/${slug}`);
    await expect(page.getByRole("heading", { name })).toBeVisible();
    await expect(page.getByText("How the product earns trust.")).toBeVisible();
    await expect(page.getByText("What this work demonstrates.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Discuss|Open/i }).first()).toBeVisible();
  }
});

test("mobile navigation opens and exposes section links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: /Open navigation/i }).click();
  await expect(page.locator("#mobile-drawer")).toHaveClass(/mobile-drawer--open/);
  await expect(page.locator("#mobile-drawer").getByRole("link", { name: "Capabilities" })).toBeVisible();
});

test("chat widget opens and sends a site-context message", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /Open chat/i }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByPlaceholder("Ask something...").fill("What is LTB Buddy?");
  await page.getByRole("button", { name: /Send message/i }).click();

  await expect(
    page.getByText(/LTB Buddy|Teambotics|published site context|not have enough Teambotics context/i).last(),
  ).toBeVisible({ timeout: 15_000 });
});

test("admin auth page is protected by the login gate", async ({ page }) => {
  await page.goto("/admin/chatbot");

  await expect(page.getByText(/Admin Login|Chatbot Admin/i)).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});
