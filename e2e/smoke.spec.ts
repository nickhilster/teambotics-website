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
    await expect(page.getByRole("heading", { name: "This route got tetrominoed." })).toBeVisible();
  }
});

test("product detail pages render the ported case-study model", async ({ page }) => {
  const products = [
    ["ltb-buddy", "LTB Buddy"],
    ["easybuddy", "EasyBuddy"],
    ["code2motion", "Code2Motion"],
    ["storytellr", "StoryTeller"],
  ];

  for (const [slug, name] of products) {
    await page.goto(`/products/${slug}`);
    await expect(page.getByRole("heading", { name })).toBeVisible();
    await expect(page.getByText("How the product earns trust.")).toBeVisible();
    await expect(page.getByText("What this work demonstrates.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Discuss|Open/i }).first()).toBeVisible();
  }
});

test("Values link appears in desktop and mobile navigation", async ({ page }) => {
  await page.goto("/");

  const desktopValues = page.locator(".site-nav").getByRole("link", { name: "Values", exact: true });
  await expect(desktopValues).toHaveAttribute("href", "https://blog.teambotics.app/values");

  for (const localeRoute of ["/fr-CA", "/es-419"]) {
    await page.goto(localeRoute);
    await expect(page.locator(".site-nav").getByRole("link", { name: "Values", exact: true }))
      .toHaveAttribute("href", "https://blog.teambotics.app/values");
  }

  await page.goto("/");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /Open navigation/i }).click();
  await expect(page.locator("#mobile-drawer").getByRole("link", { name: "Values", exact: true }))
    .toHaveAttribute("href", "https://blog.teambotics.app/values");
});

test("mobile navigation opens and exposes section links", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: /Open navigation/i }).click();
  await expect(page.locator("#mobile-drawer")).toHaveClass(/mobile-drawer--open/);
  await expect(page.locator("#mobile-drawer").getByRole("link", { name: "Products" })).toBeVisible();
});

test("marketing prototype case study stays within its disclosure boundary", async ({ page }) => {
  await page.goto("/case-studies/marketing-prototype");

  await expect(page.getByRole("heading", { name: "Marketing prototype", level: 1 })).toBeVisible();
  const caseStudy = page.locator("main article");
  await expect(caseStudy.getByText("A marketing prototype.", { exact: true })).toBeVisible();
  await expect(caseStudy.locator("img")).toHaveCount(0);
  await expect(caseStudy).not.toContainText(/RBH|IQOS|VEEV|campaign|workflow|preflight|research|handoff|Figma|testing|outcomes?|feedback/i);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("case studies use the homepage editorial palette and square image frames", async ({ page }) => {
  await page.goto("/case-studies/ikoki");

  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", "rgb(25, 49, 39)");
  await expect(page.locator("article").first()).toHaveCSS("background-color", "rgb(251, 250, 245)");
  await expect(page.locator("figure").first()).toHaveCSS("border-radius", "0px");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("IKOKI case study shows all prototype screenshots and retains its prototype label", async ({ page }) => {
  await page.goto("/case-studies/ikoki");

  await expect(page.getByRole("heading", { name: /IKO.*Rooftop Chatbot/i, level: 1 })).toBeVisible();
  await expect(page.getByText(/Prototype only|prototype.*not an official production IKO system/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open IKOKI prototype/i })).toHaveAttribute(
    "href",
    "https://ikoki.teambotics.app/",
  );

  const screenshots = page.locator("article img");
  await expect(screenshots).toHaveCount(3);
  for (const screenshot of await screenshots.all()) {
    await screenshot.scrollIntoViewIfNeeded();
    await expect(screenshot).toBeVisible();
    await expect.poll(() => screenshot.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  }
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
