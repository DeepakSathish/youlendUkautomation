import { test, expect } from '@playwright/test';

test('e2eautomation',async({page,context})=>{
     test.setTimeout(180000);

   await page.goto("https://accounts-e2e.intuit.com/app/sign-in?app_group=QBO&asset_alias=Intuit.accounting.core.qbowebapp&app_environment=e2e");
   await page.getByPlaceholder('Email or user ID').fill('test1765376518030_iamtestpass');
   await page.getByTestId('IdentifierFirstSubmitButton').click();

  const passexpect='Password1!'; //string 1
  await page.locator('input[name="Password"]').fill('Password1!');// promise void not a string 
  const passfilled = await page.getByTestId('currentPasswordInput').inputValue();
// read the input value in the input box it is string 2
if(passexpect === passfilled){ // string 1=== string 2 Compares both value and type, no conversion.
  await page.getByText('Continue').press('Enter');
  // await page.waitForTimeout(5000);
}
  else{
    expect(passexpect,"password missmatch so please use correct one ").toBe(passfilled);
   }
try{
    await page.getByTestId('VUUSkipButton').click({timeout:120000});
    console.log('skip for now page is visible')
  } catch(e){
    console.log('skip for now page is not visible more than 10 seconds')
  }
const currentUrl=page.url();
const ourUrl='https://e2e.qbo.intuit.com/app/homepage';
expect(currentUrl.includes(ourUrl));
// expect(currentUrl.includes(ourUrl)).toBeTruthy();
 await page.getByTestId('acceptAll').click();
//  await page.getByText("preferences saved").hover();
//  await page.getByTestId('linkActionCloseButton').click();
await expect(page.getByTestId('leftrail-item-my-apps')).toBeVisible({ timeout: 60000 });
await page.getByTestId('leftrail-item-my-apps').hover();
expect(await page.getByText('All appsAccountingExpenses &').getByRole('link', { name: 'Capital', exact: true })).toBeVisible({ timeout: 60000 });
await page.getByText('All appsAccountingExpenses &').getByRole('link', { name: 'Capital' }).hover();
await expect(page.getByRole('link', { name: 'Working Capital' })).toBeVisible({ timeout: 60000 });
await page.getByRole('link',{name:'Working Capital'}).click();
// Wait for new tab to open when clicking "Check for Offers"
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.getByRole('button', { name: 'Check for Offers' }).click()
]);
// Wait for the new tab to load
await newPage.waitForLoadState();
// Verify the URL is correct
const reviewUrl = newPage.url();
console.log('Navigated to:', reviewUrl);
// await expect(newPage).toHaveURL('https://barbican.dev-youlend.com/apply/quickbooks/reviewinformation', { timeout: 60000 });
// await expect(newPage).toHaveURL(/barbican\.dev-youlend\.com\/apply\/quickbooks/, { timeout: 60000 });
// await expect(newPage).toHaveURL(/barbican\.dev-youlend\.com\/apply\/quickbooks\/(?!sso)/, { timeout: 60000 });
// await expect(newPage).toHaveURL(/barbican\.dev-youlend\.com\/apply\/quickbooks\/(?!sso).*$/, { timeout: 60000 });cle
await newPage.getByRole('button', { name: 'Accept All Cookies' }).click();
//company detail page
await newPage.getByRole('tab').first().click();
await expect(newPage.getByRole('heading', { name: 'Tell us about your company' })).toBeVisible({ timeout:60000  });
await newPage.locator('span.ng-star-inserted', { hasText: 'Next' }).click();
//person details page
await newPage.getByRole('tab').nth(1).click();
await expect(newPage.getByRole('heading', { name: 'Tell us about you' })).toBeVisible({ timeout:60000  });
await newPage.locator('span.ng-star-inserted', { hasText: 'Next' }).click();
// review page
await expect(newPage.getByRole('heading', { name: ' Review your information ' })).toBeVisible({ timeout:60000  });
await expect(newPage.getByRole('heading', { name: 'Company information' })).toBeVisible({ timeout:60000  });
await newPage.getByRole('link', { name: 'Edit' }).nth(0).click();
await expect(newPage.getByRole('heading', { name: 'Tell us about your company' })).toBeVisible({ timeout:60000  });
await newPage.locator('span.ng-star-inserted', { hasText: 'Next' }).click();
//personal inforamtion
await expect(newPage.getByRole('heading', { name: 'Personal information' })).toBeVisible({ timeout:60000  });
await newPage.getByRole('link', { name: 'Edit' }).nth(1).click();
await expect(newPage.getByRole('heading', { name: 'Tell us about you' })).toBeVisible({ timeout:60000  });
await newPage.locator('span.ng-star-inserted', { hasText: 'Next' }).click();
//verify bank account page 
await expect(newPage.getByRole('heading', { name: 'Verify bank account' })).toBeVisible({ timeout:60000  });
await newPage.locator('[data-cy="review-information__bank-account__edit-link"]').click();
await expect(newPage.locator('[data-cy="drag-drop-container__input"]')).toBeVisible({ timeout: 60000 });
await newPage.getByRole('button', { name: 'Cancel' }).click();

// await newPage.pause()

});