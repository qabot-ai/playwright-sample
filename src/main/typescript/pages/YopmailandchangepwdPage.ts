import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'
import { Page } from '@playwright/test';
export class YopmailandchangepwdPage extends BasePage 
{
private readonly yopmailLoginTxt = () => this.page.getByRole('textbox', { name: 'Login' });
private readonly checkInboxBtn = () => this.page.getByTitle('Check Inbox @yopmail.com');
private readonly inboxFrame = () => this.page.frameLocator("iframe[name='ifinbox']");
private readonly mailFrame = () => this.page.frameLocator("iframe[name='ifmail']");

private readonly signupMail = () =>
    this.inboxFrame().getByRole('button', { name: /Confirm Your Signup/i });

private readonly confirmMailLink = () =>
    this.mailFrame().getByRole('link', { name: 'Confirm your mail' });

private readonly newPasswordTxt = () =>
    this.page.getByRole('textbox', { name: 'Enter new password' });

private readonly confirmPasswordTxt = () =>
    this.page.getByRole('textbox', { name: 'Confirm password' });

private readonly nextBtn1 = () =>
    this.page.getByRole('button').nth(1);

private readonly nextBtn2 = () =>
    this.page.getByRole('button').nth(2);

private readonly submitBtn = () =>
    this.page.getByRole('button', { name: 'Submit' });

private readonly userMenu = () =>
    this.page.getByRole('link', { name: 'User' });


private readonly nextBtn = (page: Page) =>
    page.getByRole('button').nth(1);

private readonly confirmBtn = (page: Page) =>
    page.getByRole('button').nth(2);

@step('Open Yopmail Inbox')
async openYopmailInbox(email: string)
{
   // await this.page.waitForLoadState('networkidle');
    await this.yopmailLoginTxt().fill(email);
    await this.checkInboxBtn().click();
    await this.page.waitForLoadState('networkidle');
}

@step('Open Signup Mail')
async openSignupMail()
{
    await this.signupMail().waitFor({ state: 'visible', timeout: 15000 });
    await this.signupMail().click();
}



@step('Confirm Signup and Set Password')
async confirmSignup(password: string)
{
    const newTabPromise = this.page.context().waitForEvent('page');
    await this.confirmMailLink().waitFor({ state: 'visible', timeout: 15000 });
    await this.confirmMailLink().click();
    const newTab = await newTabPromise;
    await this.updatePassword(newTab, password);
}

@step('Update Password on New Tab')
async updatePassword(page: Page, password: string)
{
    // Wait for page to load
  //  await page.waitForLoadState('networkidle');
    
    // Fill Enter New Password field
    const newPasswordField = page.getByRole('textbox', { name: 'Enter new password' });
    await newPasswordField.waitFor({ state: 'visible', timeout: 10000 });
    await newPasswordField.click();
    await newPasswordField.fill(password);
    
    // Click Next button
    await this.nextBtn(page).waitFor({ state: 'visible', timeout: 10000 });
    await this.nextBtn(page).click();
    await page.waitForLoadState('networkidle');
    
    // Fill Confirm Password field
    const confirmPasswordField = page.getByRole('textbox', { name: 'Confirm password' });
    await confirmPasswordField.waitFor({ state: 'visible', timeout: 10000 });
    await confirmPasswordField.click();
    await confirmPasswordField.fill(password);
    
    // Click Confirm button
    await this.confirmBtn(page).waitFor({ state: 'visible', timeout: 10000 });
    await this.confirmBtn(page).click();
    await page.waitForLoadState('networkidle');
    
    // Click Submit button
    const submitBtn = page.getByRole('button', { name: 'Submit' });
    await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
    await submitBtn.click();

}
}