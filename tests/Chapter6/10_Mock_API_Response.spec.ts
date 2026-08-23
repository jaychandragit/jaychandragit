import { test, expect } from "@playwright/test"
test("Mock API Response in Playwright", async ({ page }) => {
    //Mock API Response testing 
    await page.route('*/**/api/v1/fruits', async route => {
        const response=await route.fetch();
      const  json=await response.json();
      json.push( { name: 'playwright by testers talk', id: 21 });
      json.push( { name: 'cypress by testers talk', id: 71 });
      json.push({ name: 'api testing by testers talk', id: 72 });
      json.push({ name: 'postman by testers talk', id: 73 })

        
        await route.fulfill({response, json });
    })

    //goto url
    await page.goto("https://demo.playwright.dev/api-mocking/");

    //Validate text
    await expect(page.getByText('playwright by testers talk')).toBeVisible();
    await expect(page.getByText('cypress by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();
    await expect(page.getByText('postman by testers talk')).toBeVisible();
   
await page.pause();
    
})


