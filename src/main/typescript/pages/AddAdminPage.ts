import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'

export class AddAdminPage extends BasePage 
{
  private readonly adminMenu = () => this.page.getByRole('link', { name: 'Admin' });
  private readonly addAdminBtn = () => this.page.getByRole('button', { name: 'Add Admin' });
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
  private readonly adminTableHeader = () => this.page.locator("//thead");

  @step('Navigate to Admin Page')
  async navigateToAdmin()
  {
    // Wait for the page to load
    await this.page.waitForLoadState('networkidle');
    
    // Wait for admin menu and click
    const adminMenu = this.adminMenu();
    await adminMenu.waitFor({ state: 'visible', timeout: 10000 });
    await adminMenu.click();
    
    // Wait for admin page to load
    await this.page.waitForLoadState('networkidle');
  }

  @step('Add Admin User')
  async addAdmin(fullName: string = 'Lalitha Jampana', email: string = 'lalithaadmin@yopmail.com', 
                 phone: string = '9876543210', username: string = 'lalithaadmin')
  {
    await this.page.waitForLoadState('networkidle');
    
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
    
    // Set as Active
    await this.activeRadioBtn().check();
    
    // Save Admin
    await this.saveBtn().click();
    await this.okBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.okBtn().click();
    
    // Wait for success and return to list
    await this.page.waitForLoadState('networkidle');
  }

  @step('Validate Admin Added Successfully')
  async validateAdminAdded()
  {
    await this.successMsg().waitFor({ state: 'visible', timeout: 10000 });
  }

}