import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage'
import { log, step } from '../helpers/Decorators'
import { clearScreenDown } from 'readline';

export class UserManagementPage extends BasePage 
{
  private readonly UserMenu = () => this.page.getByRole('link').nth(2);
  private readonly totalUsersLabel = () =>this.page.getByText('TOTAL USERS', { exact: true });
  private readonly totalUsersCount = () =>this.page.locator('//p[normalize-space()="TOTAL USERS"]/following-sibling::p');
  private readonly paginationText = () =>this.page.locator('//div[contains(@class,"flex items-center gap-4")]//span[contains(text(),"Showing")]');
  private readonly totalActiveUsersCount = () =>this.page.locator('//p[text()="TOTAL ACTIVE USERS"]/following-sibling::p');
  private readonly statusDropdown = () =>this.page.locator('//button[@role="combobox"]//span[text()="Select Status"]/parent::button');
  private readonly statusOption = (value: string) => this.page.locator(`//div[@role="option"][.//text()="${value}"]`);
 private readonly totalInActiveUsersCount = () =>this.page.locator('//p[text()="INACTIVE USERS"]/following-sibling::p');
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
async getTotalActiveUsersCount(): Promise<number>
 {
  const element = this.totalActiveUsersCount();
  await element.waitFor({ state: 'visible' });
  const text = await element.innerText(); // "141"
  return Number(text.trim());
}

async selectStatus(value: string): Promise<void> 
{
  // Open dropdown
  await this.statusDropdown().click();
  // Click option
  const option = this.statusOption(value);
  await option.waitFor({ state: 'visible' });
  await option.click();
}
async getInActiveUsersCount(): Promise<number>
 {
  const element = this.totalInActiveUsersCount();
  await element.waitFor({ state: 'visible' });
  const text = await element.innerText(); // "141"
  return Number(text.trim());
}
}
