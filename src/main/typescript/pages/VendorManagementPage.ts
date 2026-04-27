import { expect } from '@playwright/test';
import { BasePage } from '../base/BasePage'
import { step } from '../helpers/Decorators'
export class VendorManagementPage extends BasePage 
{
  private readonly vendorMenu = () => this.page.getByRole('link').nth(3);
  private readonly addVendorBtn = () => this.page.getByRole('button', { name: 'add-vendor Add Vendor' });
  private readonly vendorName = () => this.page.getByRole('textbox', { name: 'Vendor Name *' });
  private readonly vendorDisplayName = () => this.page.getByRole('textbox', { name: 'Vendor Display Name *' });
  private readonly vendorCode = () => this.page.getByRole('textbox', { name: 'Vendor Code *' });
  private readonly chargeCode = () => this.page.getByRole('textbox', { name: 'Charge Code *' });
  private readonly vendorTypeDropdown = () => this.page.getByRole('combobox');
  private readonly truckersOption = () => this.page.getByRole('option', { name: 'Carrier', exact: true });
  private readonly email = () => this.page.getByRole('textbox', { name: 'Email Address' });
  private readonly address = () => this.page.getByRole('textbox', { name: 'Company Address' });
  private readonly saveBtn = () => this.page.getByRole('button', { name: 'Save' });
  private readonly okBtn = () => this.page.getByRole('button', { name: 'OK' });
  private readonly editBtn = () => this.page.locator("//tr[1]//a[contains(@href, '/edit')]").first();
  private readonly updateBtn = () => this.page.getByRole('button', { name: 'Update' });
  private readonly searchBox = () => this.page.getByRole('textbox', { name: 'Search by Name' });
  private readonly deleteBtn = () => this.page.locator("//tr[1]/td[7]//button[.//span[text()='Delete']]");
  private readonly yesBtn = () => this.page.getByRole('button', { name: 'Yes' });
  private readonly clearFiltersBtn = () => this.page.getByRole('button', { name: 'Clear Filters' });
 private readonly vendordisplaynametable = () =>this.page.locator("//tbody/tr/td[1]");
 private readonly vendorTableHeader = () => this.page.locator("//thead");
 
 
 @step('Navigate to Vendor Page')
  async navigateToVendor() 
  {
    // Wait for the page to load and ensure menu is visible
    await this.page.waitForLoadState('networkidle');
    
    // Wait for the vendor menu link to be visible with timeout
    const vendorMenu = this.vendorMenu();
    await vendorMenu.waitFor({ state: 'visible', timeout: 10000 });
    
    // Click the vendor menu
    await vendorMenu.click();
    
    // Wait for vendor page to load
    await this.page.waitForLoadState('networkidle');
  }
 @step('Add Vendor')
  async addVendor() 
  {
    // Wait for add vendor button to be visible
    await this.addVendorBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.addVendorBtn().click();
    
    // Wait for form to load
    await this.page.waitForLoadState('networkidle');
    
    // Fill vendor details
    await this.vendorName().waitFor({ state: 'visible', timeout: 10000 });
    await this.vendorName().fill('Lalithaaaaaaaaaa');
    await this.vendorDisplayName().fill('Jampanaaaaaaa');
    await this.vendorCode().fill('LARRR');
    await this.chargeCode().fill('ABC,BCA');
    
    // Select vendor type
    await this.vendorTypeDropdown().click();
    await this.page.waitForLoadState('networkidle');
    
    // Scroll the option into view and click it
    const truckersOption = this.truckersOption();
    await truckersOption.waitFor({ state: 'visible', timeout: 10000 });
    await truckersOption.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500); // Small delay to ensure element is ready
    await truckersOption.click();
    
    // Fill remaining fields
    await this.email().fill('lalithajam1@yopmail.com');
    await this.address().fill('Hyderabad');
    
    // Save the vendor
    await this.saveBtn().click();
    await this.okBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.okBtn().click();
    
    // Wait for page to return to vendor list
    await this.page.waitForLoadState('networkidle');
  }
  @step('Edit Vendor')
  async editVendor() 
  {
    // Wait for the vendor list to fully load
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000); // Extra delay for list to render
    
    // Try to find and click edit button with multiple attempts
    const editBtn = this.editBtn();
    
    try {
      // Wait for edit button with timeout
      await editBtn.waitFor({ state: 'visible', timeout: 10000 });
      await editBtn.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await editBtn.click();
    } catch (error) {
      // Fallback: click on the vendor display name table row
      console.log('Edit button not found, clicking vendor row as fallback');
      await this.vendordisplaynametable().click();
    }
    
    // Wait for edit form to load
    await this.page.waitForLoadState('networkidle');
    await this.vendorDisplayName().waitFor({ state: 'visible', timeout: 10000 });
    
    // Fill updated information
    await this.vendorDisplayName().clear();
    await this.vendorDisplayName().fill('Jampanaaa');
    await this.vendorName().clear();
    await this.vendorName().fill('Lalithaa');
    await this.email().clear();
    await this.email().fill('lalithajamp11s@yopmail.com');
    
    // Update vendor
    await this.updateBtn().click();
    await this.okBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.okBtn().click();
    
    // Wait for page to return to vendor list
    await this.page.waitForLoadState('networkidle');
  }
 async searchVendor(searchValue: string) {

  await this.searchBox().waitFor({ state: 'visible', timeout: 10000 });

  await this.searchBox().fill(searchValue); // ✅ dynamic
  await this.searchBox().press('Enter');

  await this.page.waitForLoadState('networkidle');
}
  @step('Validate Vendor Details')
  async validateVendor() {
    // Wait for table to load
    const table = this.page.locator('tbody');
    await table.waitFor({ state: 'visible', timeout: 10000 });
    
    // Validate vendor details
    await expect(table).toContainText('Jampanaa');
    await expect(table).toContainText('LARRR');
    await expect(table).toContainText('Truckers');
    await expect(table).toContainText('[ABC, BCA]');
    await expect(table).toContainText('lalithajamp11s@yopmail.com');
    await expect(table).toContainText('Hyderabad');
  }
  @step('Delete Vendor')
  async deleteVendor() {
    // Wait for delete button to be visible
    await this.deleteBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.deleteBtn().click();
    
    // Confirm deletion
    await this.yesBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.yesBtn().click();

    // Wait for success message
    await expect(this.page.getByRole('paragraph'))
      .toContainText('Vendor deleted successfully.');

    // Click OK to close confirmation
    await this.okBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.okBtn().click();
    
    // Wait for page to return to vendor list
    await this.page.waitForLoadState('networkidle');
  }
  @step('Clear Filters')
  async clearFilters() {
    await this.clearFiltersBtn().waitFor({ state: 'visible', timeout: 10000 });
    await this.clearFiltersBtn().click();
    
    // Wait for page to reload after clearing filters
    await this.page.waitForLoadState('networkidle');
  }

@step('Verify Vendor Table Headers')
async verifyVendorTableHeaders() 
{
    const header = this.vendorTableHeader();

    await expect(header).toBeVisible();
    await expect(header).toContainText('Vendor Name');
    await expect(header).toContainText('Vendor Code');
    await expect(header).toContainText('Category');
    await expect(header).toContainText('Charge Code');
    await expect(header).toContainText('Email Address');
    await expect(header).toContainText('Company Address');
    await expect(header).toContainText('Action');
}
}