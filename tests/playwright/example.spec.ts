import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3001");
  await expect(page).toHaveTitle(/Apuu/);
});

test("has login link", async ({ page }) => {
  await page.goto("http://localhost:3001");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByRole("heading", { name: "로그인" })).toBeVisible();
});
