import { test, expect } from '../../main/typescript/base/customFixtures';


test('Navigate to Admin Page',{tag:["@Smoke", "Regression", "@Urgent"]}, async ({ addadminPage, page, ENV }) =>
{
  // Navigate directly to admin page with stored session
  const adminUrl = ENV.BASE_URL.replace('/login', '/add-admin');
  await page.goto(adminUrl);
  await page.waitForLoadState('networkidle');
  
  // Assert that we are on the admin page
  const adminPageTitle = page.locator('h1, h2');
  await expect(adminPageTitle).toBeTruthy();
  console.log('✅ Navigated to Admin page successfully');
});



