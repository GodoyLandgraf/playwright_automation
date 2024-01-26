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
    // nao pode pegar todo conteudo da página sem esperar ela carregar por inteira (exemplo certo no arquivo clienteApp)
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

test('UI Controls', async ({page})=>
{   
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[id='password']").fill("learning");
    const dropdown = page.locator("select.form-control[data-style='btn-info']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //assertion
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect (page.locator("#terms")).not.toBeChecked();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //somente printa se está checked
    //console.log(page.locator(".radiotextsty").last()).isChecked;
    //await page.pause();
    //await page.pause();
    await page.locator("[id='signInBtn']").click();
});

test.only('Child windows hadl', async ({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
    [context.waitForEvent('page'), 
    documentLink.click(),] )
    const text = await(newPage.locator(".red")).textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    await page.locator('#username').fill(domain);
});
