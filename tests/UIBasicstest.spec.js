const {test, expect} = require('@playwright/test');

test('Fist Playwright test', async ({page})=>
{
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});


test('Login page Fail', async ({page})=>
{
    const userName = page.locator('#username');
    const signIn = page.locator("[id='signInBtn']");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css
    await userName.fill("rahulshetty");
    await page.locator("[id='password']").fill("learning");
    await signIn.click();
    console.log (await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log (await page.locator(".card-body a").first().textContent());
    console.log (await page.locator(".card-body a").nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);



});


test.only('Login Success all content', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
});


test('Login page Sucess', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[id='password']").fill("learning");
    await page.locator("[id='signInBtn']").click();
});
