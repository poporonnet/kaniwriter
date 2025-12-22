import { expect, test } from "@playwright/test";

test("VRT", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("code");

  await expect(page).toHaveScreenshot();
});
