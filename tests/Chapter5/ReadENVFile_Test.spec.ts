// Import playwright module
import { test, expect } from '@playwright/test';

test('Read ENV file config in playwright', async ({ page }) => {
    // Go to URL
    await page.goto(`${process.env.GOOGLE_URL}`);
    
    

    // Search with keywords
    await page.getByLabel('Search', { exact: true }).fill(`${process.env.SEARCH_KEYWORDS}`);
    await page.getByLabel('Search', { exact: true }).press('Enter');

    await page.pause();

   
});