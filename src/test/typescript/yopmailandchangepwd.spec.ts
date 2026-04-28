import { test, expect } from '../../main/typescript/base/customFixtures';

    test('should successfully complete password update from confirmation email', async ({ page, yopmailandchangepwdPage, addadminPage, ENV }) => {
    const adminUrl = ENV.BASE_URL.replace('/login', '/add-admin');
    await page.goto(adminUrl);   
    await addadminPage.addAdmin();
    console.log('Using generated email:'+ addadminPage.generatedEmail);
    await page.goto('https://yopmail.com');
    await page.waitForTimeout(5000);
    await yopmailandchangepwdPage.openYopmailInbox(addadminPage.generatedEmail);
    await yopmailandchangepwdPage.openSignupMail();
    await yopmailandchangepwdPage.confirmSignup('Test@123456');
    console.log('✅ yopmail confirmation link clicked and password updated');
    });

    test('Set Password and Login to Dashboard', async ({ yopmailandchangepwdPage, page, ENV, addadminPage }) =>
    {
         const Url = ENV.BASE_URL.replace('/login', '/update-password?force=true');
  await page.goto(Url);
  await page.waitForLoadState('networkidle');
  await yopmailandchangepwdPage.updatePassword(page, 'Test@123456');
   console.log('✅ Password updated successfully and navigated to dashboard');
    });
