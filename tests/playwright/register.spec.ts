import { expect, test } from "@playwright/test"

test("타이틀이 있나요?", async ({ page }) => {
  await page.goto("http://localhost:3000/register")
  await expect(page.getByText("기본 정보")).toBeInViewport()
})

test("다음 버튼이 있나요", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("http://localhost:3000/register")
  const nextButton = page.getByRole("button", { name: "다음" })
  await expect(nextButton).toBeInViewport()
  await expect(nextButton).toBeDisabled()

  const select = page.getByRole("combobox")
  await select.click()
})
// await page.locator(select).selectOption({ label: "수친자" });
// await expect(nextButton).toBeEnabled();
