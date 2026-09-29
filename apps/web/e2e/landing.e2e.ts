import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has a title and meta description", async ({ page }) => {
  await expect(page).toHaveTitle(/potluck/i);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /shared budget/i,
  );
});

test("hero explains the product and offers Get started", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /shared budgets/i,
  );
  await expect(
    page.getByRole("button", { name: /get started/i }).first(),
  ).toBeVisible();
});

test("every CTA reveals Coming soon and collects nothing", async ({ page }) => {
  await expect(page.locator("input")).toHaveCount(0);
  const ctas = page.getByRole("button", { name: /get started/i });
  const count = await ctas.count();
  expect(count).toBeGreaterThanOrEqual(2);
  for (let i = 0; i < count; i++) {
    await ctas.nth(i).click();
  }
  await expect(page.getByRole("status")).toHaveCount(count);
  for (const status of await page.getByRole("status").all()) {
    await expect(status).toContainText(/coming soon/i);
  }
});

test("shows the four use cases", async ({ page }) => {
  const section = page.getByRole("region", { name: /use cases/i });
  for (const name of ["Travel", "Family", "Party", "Shopping"]) {
    await expect(
      section.getByRole("heading", { level: 3, name }),
    ).toBeVisible();
  }
});

test("lists the core features", async ({ page }) => {
  const section = page.getByRole("region", { name: /features/i });
  await expect(section).toContainText(/separate budgets/i);
  await expect(section).toContainText(/invite/i);
  await expect(section).toContainText(/together/i);
});

test("explains how it works in three steps", async ({ page }) => {
  const section = page.getByRole("region", { name: /how it works/i });
  await expect(section.getByRole("listitem")).toHaveCount(3);
});

test("pricing says free during early access", async ({ page }) => {
  const section = page.getByRole("region", { name: /pricing/i });
  await expect(section).toContainText(/free during early access/i);
  await expect(
    section.getByRole("button", { name: /get started/i }),
  ).toBeVisible();
});

test("FAQ has between four and six questions", async ({ page }) => {
  const section = page.getByRole("region", { name: /faq|questions/i });
  const count = await section.getByRole("heading", { level: 3 }).count();
  expect(count).toBeGreaterThanOrEqual(4);
  expect(count).toBeLessThanOrEqual(6);
});

test("footer shows the name and current year", async ({ page }) => {
  const footer = page.getByRole("contentinfo");
  await expect(footer).toContainText("Potluck");
  await expect(footer).toContainText(String(new Date().getFullYear()));
});

test("does not scroll horizontally", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});

test("has no WCAG A/AA accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
