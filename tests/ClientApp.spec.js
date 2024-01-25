const {test, expect} = require('@playwright/test');

test('Login Success all content', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    //DUAS ALTERNATIVAS
   // await page.waitForLoadState('networkidle');
    page.locator(".card-body b").last().waitFor;
    //
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
});