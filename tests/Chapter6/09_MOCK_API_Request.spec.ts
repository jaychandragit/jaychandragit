import { test, expect } from "@playwright/test"
test("Mock API Request in Playwright", async ({ page }) => {
    //Mock API Request
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [
            { name: 'playwright by testers talk', id: 21 },
            { name: 'cypress by testers talk', id: 71 },
            { name: 'api testing by testers talk', id: 72 },
            { name: 'postman by testers talk', id: 73 },
            { name: 'rest assured by testers talk', id: 74 },
        ];
        await route.fulfill({ json });
    })

    //goto url
    await page.goto("https://demo.playwright.dev/api-mocking/");

    //Validate text
    await expect(page.getByText('playwright by testers talk')).toBeVisible();
    await expect(page.getByText('cypress by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();
    await expect(page.getByText('postman by testers talk')).toBeVisible();
    await expect(page.getByText('rest assured by testers talk')).toBeVisible();

    await page.pause();
})


