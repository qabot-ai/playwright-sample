import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage'
import { log, step } from '../helpers/Decorators'
import { clearScreenDown } from 'readline';

export class UserManagementPage extends BasePage 
{
  public generatedEmail: string = '';
  private readonly UserMenu = () => this.page.getByRole('link').nth(2);
  private readonly totalUsersLabel = () =>this.page.getByText('TOTAL USERS', { exact: true });
  private readonly totalUsersCount = () =>this.page.locator('//p[normalize-space()="TOTAL USERS"]/following-sibling::p');
  private readonly paginationText = () =>this.page.locator('//div[contains(@class,"flex items-center gap-4")]//span[contains(text(),"Showing")]');
  private readonly totalActiveUsersCount = () =>this.page.locator('//p[text()="TOTAL ACTIVE USERS"]/following-sibling::p');
  private readonly statusDropdown = () =>this.page.locator('//button[@role="combobox"]//span[text()="Select Status"]/parent::button');
  private readonly statusOption = (value: string) => this.page.locator(`//div[@role="option"][.//text()="${value}"]`);
  private readonly totalInActiveUsersCount = () =>this.page.locator('//p[text()="INACTIVE USERS"]/following-sibling::p');
  private readonly roleDropdown = () =>this.page.locator('//button[@role="combobox"]//span[text()="Select Role"]/parent::button');
  private readonly roleOption = (value: string) => this.page.locator(`//div[@role="option"][.//text()="${value}"]`);
  private readonly totalAdminsOrManagerCount = () =>this.page.locator('//p[text()="ADMINS / MANAGERS"]/following-sibling::p');
  private readonly addUserButton = () =>this.page.locator('//span[text()="Add User"]');

  private readonly fullName = () => this.page.getByRole('textbox', { name: 'Full Name *' });
  private readonly email = () => this.page.getByRole('textbox', { name: 'Email Address *' });
  private readonly phoneNumber = () => this.page.getByRole('textbox', { name: 'Enter phone number' });
  private readonly userName = () => this.page.getByRole('textbox', { name: 'User Name *' });
  private readonly assignVendorDropdown = () => this.page.locator("div:has-text('Assign Vendor')").locator("div[role='combobox']").first();
  private readonly vendorCheckbox = () => this.page.getByRole('option', { name: 'All', exact: true }).getByRole('checkbox');
  private readonly timeZoneDropdown = () =>this.page.locator("//span[contains(text(),'Timezone')]/ancestor::div[contains(@class,'flex-col')]//button[@role='combobox']");
  private readonly activeRadioBtn = () => this.page.getByRole('radio').nth(0);
  private readonly saveBtn = () => this.page.getByRole('button', { name: 'Save' });
  private readonly okBtn = () => this.page.getByRole('button', { name: 'OK' });
  private readonly successMsg = () => this.page.locator("text=Admin added successfully");
  private readonly UsersTableHeader = () => this.page.locator("//thead");

 

               

  @step('Navigate to User Management Page')
  async navigateToUserManagement()
  {

    // Wait for user management link and click
    await this.UserMenu().click();
    // Wait for user management page to load
    await this.page.waitForLoadState('networkidle');
  }
  @step('Get Total Users Count card details in User Management Page')
async getTotalUsersCount(): Promise<number> 
{
  await this.totalUsersCount().waitFor({ state: 'visible' });
  const text = await this.totalUsersCount().innerText();
  console.log('Total Users Count Text:' + text);
  return Number(text.trim());
}
@step('Get total count from pagination')
async getPaginationTotalCount(): Promise<number>
 {
  await this.paginationText().waitFor({ state: 'visible' });
  const text = await this.paginationText().innerText();
  // Example: "Showing 1 - 10 of 143"
  const match = text.match(/of\s+(\d+)/);
  return match ? Number(match[1]) : 0;
}
@step('Get total active users count from card')
async getTotalActiveUsersCount(): Promise<number>
 {
  const element = this.totalActiveUsersCount();
  await element.waitFor({ state: 'visible' });
  const text = await element.innerText(); // "141"
  return Number(text.trim());
}
@step('select status from dropdown')
async selectStatus(value: string): Promise<void> 
{
  // Open dropdown
  await this.statusDropdown().click();
  // Click option
  const option = this.statusOption(value);
  await option.waitFor({ state: 'visible' });
  await option.click();
}
@step('Get inactive users count from card')
async getInActiveUsersCount(): Promise<number>
 {
  const element = this.totalInActiveUsersCount();
  await element.waitFor({ state: 'visible' });
  const text = await element.innerText(); // "141"
  return Number(text.trim());
}
@step('select role from dropdown')
async selectRole(value: string): Promise<void> 
{
  // Open dropdown
  await this.roleDropdown().click();
  // Click option
  const option = this.roleOption(value);
  await option.waitFor({ state: 'visible' });
  await option.click();
}
@step('Get admin count from card')
async getAdminCount(): Promise<number>
 {
  const element = this.totalAdminsOrManagerCount();
  await element.waitFor({ state: 'visible' });
  const text = await element.innerText(); // "141"
  return Number(text.split('/')[0].trim());
}
@step('Get manager count from card')
async getManagerCount(): Promise<number>
 {
  const element = this.totalAdminsOrManagerCount();
  await element.waitFor({ state: 'visible' });
  const text = await element.innerText(); // "141"
  return Number(text.split('/')[1].trim());
}
@step('Click Add User button')
async clickAddUser()
{
  await this.addUserButton().waitFor({ state: 'visible' });
  await this.addUserButton().click();
}
 @step('Add Standard User')
  async addStandardUser()
  { // Generate random values
  const random5Digits = Math.floor(10000 + Math.random() * 90000); // 5 digits
  const random7Digits = Math.floor(1000000 + Math.random() * 9000000); // 7 digits
  const randomText = Math.random().toString(36).replace(/[^a-z]/g, '').substring(0, 6);
  console.log(randomText); // example: abcxyz
  // Unique test data
  const fullName = 'Lalitha'+random5Digits;
  const phone = '903'+random7Digits;
  const email = randomText+random5Digits+"@yopmail.com";
  const username = 'lalithastandard'+random5Digits;
  
  // Store email for external access
  this.generatedEmail = email;
  console.log('Generated Email: ' + this.generatedEmail);
   // await this.page.waitForLoadState('networkidle');
    
    // Fill form fields
    await this.fullName().waitFor({ state: 'visible', timeout: 10000 });
    await this.fullName().fill(fullName);
    await this.email().fill(email);
    await this.phoneNumber().fill(phone);
    await this.userName().fill(username);
    // Assign Vendor
    await this.assignVendorDropdown().click();
    await this.page.waitForLoadState('networkidle');
    await this.vendorCheckbox().check();
    await this.timeZoneDropdown().scrollIntoViewIfNeeded();
    // Select Timezone
    await this.timeZoneDropdown().click();
    await this.page.waitForLoadState('networkidle');
    const timeZoneOption = this.page.getByRole('option', { name: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi' });
    await timeZoneOption.waitFor({ state: 'visible', timeout: 5000 });
    await timeZoneOption.click();
    
    // Set as Active`
    await this.activeRadioBtn().check();
    
    // Save Standard User
    await this.saveBtn().click();
    await this.okBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.okBtn().click();
    
    // Wait for success and return to list
    await this.page.waitForLoadState('networkidle');
  }

  @step('Validate Standard User Added Successfully')
  async validateStandardUserAdded()
  {
    await this.successMsg().waitFor({ state: 'visible', timeout: 10000 });
  }
} 

