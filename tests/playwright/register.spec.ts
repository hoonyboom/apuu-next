import { expect, test } from "@playwright/test"

test("타이틀이 있나요?", async ({ page }) => {
  await page.goto("http://localhost:3000/register")
  await expect(page.getByText(/Apuu/)).toBeInViewport()
})

test("카카오 로그인 버튼이 있나요?", async ({ page }) => {
  await page.goto("http://localhost:3000/register")
  const kakaoButton = page.getByRole("button", { name: "카카오 로그인" })
  await expect(kakaoButton).toBeInViewport()
})

// test("다음 버튼이 있나요", async ({ page, isMobile }) => {
//   test.skip(isMobile === false, "모바일에서만 적용되는 레이아웃입니다")

//   await page.goto("http://localhost:3000/register")
//   const nextButton = page.getByRole("button", { name: "다음" })
//   await expect(nextButton).toBeInViewport()
//   await expect(nextButton).toBeDisabled()

//   const select = page.getByRole("combobox")
//   await select.click()
// })
