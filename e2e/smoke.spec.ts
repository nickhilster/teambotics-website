import { expect, test } from "@playwright/test";

test("homepage exposes product case studies", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");

  await expect(page.getByRole("heading", { name: /Built for the/i })).toBeVisible();
  await expect(page.getByText("LTB Buddy").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Read case study/i }).first()).toBeVisible();
  await expect(footer.getByRole("link", { name: "Privacy", exact: true })).toHaveAttribute("href", "/privacy");
  await expect(footer.getByRole("link", { name: "Terms", exact: true })).toHaveAttribute("href", "/terms");
  await expect(footer.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/company/teambotics-inc",
  );
});

test("privacy and terms pages render real content", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
  await expect(page.getByText(/Information We Collect/i)).toBeVisible();

  await page.goto("/terms");
  await expect(page.getByRole("heading", { name: "Terms of Use" })).toBeVisible();
  await expect(page.getByText(/Chatbot Limitations/i)).toBeVisible();
});

test("legacy placeholder redirect routes are retired", async ({ page }) => {
  const retiredRoutes = [
    "/github-placeholder",
    "/linkedin-placeholder",
    "/privacy-placeholder",
    "/terms-placeholder",
    "/products/easybuddy-placeholder",
    "/products/ltb-buddy-placeholder",
  ];

  for (const route of retiredRoutes) {
    const response = await page.goto(route);

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Could not find the requested resource." })).toBeVisible();
  }
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
  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await page.getByPlaceholder("Ask something...").fill("What is LTB Buddy?");
  await page.getByRole("button", { name: /Send message/i }).click();

  await expect(
    dialog.getByText(/LTB Buddy|Teambotics|published site context|not have enough Teambotics context/i).last(),
  ).toBeVisible({ timeout: 15_000 });
});

test("lead form shows inline validation for invalid submissions", async ({ page }) => {
  await page.goto("/#contact");

  await page.getByRole("button", { name: "Start a conversation" }).click();

  await expect(page.getByText("Please add your name.")).toBeVisible();
  await expect(page.getByText("Please add your email address.")).toBeVisible();
  await expect(page.getByText("Please add a short message about what you need.")).toBeVisible();
});

test("lead form submits successfully with a mocked API response", async ({ page }) => {
  let leadRequestCount = 0;
  let leadRequestPayload: Record<string, unknown> | null = null;

  await page.route("**/api/leads", async (route) => {
    leadRequestCount += 1;
    leadRequestPayload = route.request().postDataJSON() as Record<string, unknown> | null;

    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Thanks. Teambotics will follow up shortly.",
      }),
    });
  });

  const formCard = page.locator(".lead-form-card");

  await page.goto("/#contact");
  await page.getByLabel("Name").fill("Nikhil Khedkar");
  await page.getByLabel("Email").fill("nikhil@example.com");
  await page.getByLabel("Organization").fill("Teambotics");
  await page.getByLabel("Interest area").selectOption("AI chatbot or assistant");
  await page.getByLabel("Message").fill("We want a grounded assistant for regulated workflow questions.");
  await page.getByRole("button", { name: "Start a conversation" }).click();

  await expect.poll(() => leadRequestCount).toBe(1);
  expect(leadRequestPayload).toMatchObject({
    name: "Nikhil Khedkar",
    email: "nikhil@example.com",
    organization: "Teambotics",
    interestArea: "AI chatbot or assistant",
    message: "We want a grounded assistant for regulated workflow questions.",
    pagePath: "/",
  });
  await expect(formCard.getByRole("status")).toHaveText("Thanks. Teambotics will follow up shortly.");
  await expect(page.getByLabel("Name")).toHaveValue("");
  await expect(page.getByLabel("Email")).toHaveValue("");
  await expect(page.getByLabel("Message")).toHaveValue("");
  await expect(page.getByRole("button", { name: "Start a conversation" })).toBeEnabled();
});

test("homepage keeps below-the-fold sections visible before scroll", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1000);

  const selectors = [
    "#positioning .positioning__copy",
    ".systems-grid > div:first-child",
    ".capabilities-grid > div:first-child",
    ".engagement-rail > :nth-child(2)",
  ];

  for (const selector of selectors) {
    await expect
      .poll(async () => page.locator(selector).evaluate((node) => getComputedStyle(node).opacity))
      .toBe("1");
  }
});

test("admin auth page is protected by the login gate", async ({ page }) => {
  await page.goto("/admin/chatbot");

  await expect(page.getByText(/Admin Login|Chatbot Admin/i)).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});
