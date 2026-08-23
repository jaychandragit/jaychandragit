import {test,expect} from "@playwright/test";
import testdata from "../../testdata/qa/testdata.json";

type TestData = {
    TestDataSet1: {
        Skill1: string,
        Skill2: string
       
    },
    TestDataSet2: {
        Skill1: string,
        Skill2: string
        
    },
}
const typedTestData= testdata as TestData;
for (const datasetName in typedTestData) {
   
    const skill  =typedTestData[datasetName as keyof TestData];
     test(`Data Driven Testing Using JSON file in playwright : ${skill.Skill1}`, { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

      
       
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill(skill.Skill1);
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: skill.Skill1 }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle(skill.Skill1 + '☑️ - YouTube');
    });
    
}