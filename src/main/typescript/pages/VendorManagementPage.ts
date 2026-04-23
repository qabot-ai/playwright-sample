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
  private readonly truckersOption = () => this.page.getByRole('option', { name: 'Truckers', exact: true });
  private readonly email = () => this.page.getByRole('textbox', { name: 'Email Address' });
  private readonly address = () => this.page.getByRole('textbox', { name: 'Company Address' });
  private readonly saveBtn = () => this.page.getByRole('button', { name: 'Save' });
  private readonly okBtn = () => this.page.getByRole('button', { name: 'OK' });
  private readonly editBtn = () => this.page.getByRole('link', { name: 'Edit' }).first();
  private readonly updateBtn = () => this.page.getByRole('button', { name: 'Update' });
  private readonly searchBox = () => this.page.getByRole('textbox', { name: 'Search by Name' });
  private readonly deleteBtn = () => this.page.locator("//tr[1]/td[7]//button[.//span[text()='Delete']]");
  private readonly yesBtn = () => this.page.getByRole('button', { name: 'Yes' });
  private readonly clearFiltersBtn = () => this.page.getByRole('button', { name: 'Clear Filters' });
 
  @step('Navigate to Vendor Page')
  async navigateToVendor() 
  {
    await this.vendorMenu().click();
  }
 @step('Add Vendor')
  async addVendor() 
  {
    await this.addVendorBtn().click();
    await this.vendorName().fill('Lalithaaaaaaaaaa');
    await this.vendorDisplayName().fill('Jampanaaaaaaa');
    await this.vendorCode().fill('LARRR');
    await this.chargeCode().fill('ABC,BCA');
    await this.vendorTypeDropdown().click();
    await this.truckersOption().click();
    await this.email().fill('lalithajam1@yopmail.com');
    await this.address().fill('Hyderabad');
    await this.saveBtn().click();
    await this.okBtn().click();
  }
  @step('Edit Vendor')
  async editVendor() 
  {
    await this.editBtn().click();
    await this.vendorDisplayName().fill('Jampanaaa');
    await this.vendorName().fill('Lalithaa');
    await this.email().fill('lalithajamp11s@yopmail.com');
    await this.updateBtn().click();
    await this.okBtn().click();
  }
  @step('Search Vendor')
  async searchVendor() {
    await this.searchBox().fill('jampanaa');
    await this.searchBox().press('Enter');
  }
  @step('Validate Vendor Details')
  async validateVendor() {
    const table = this.page.locator('tbody');
    await expect(table).toContainText('Jampanaa');
    await expect(table).toContainText('LARRR');
    await expect(table).toContainText('Truckers');
    await expect(table).toContainText('[ABC, BCA]');
    await expect(table).toContainText('lalithajamp11s@yopmail.com');
    await expect(table).toContainText('Hyderabad');
  }
  @step('Delete Vendor')
  async deleteVendor() {
    await this.deleteBtn().click();
    await this.yesBtn().click();

    await expect(this.page.getByRole('paragraph'))
      .toContainText('Vendor deleted successfully.');

    await this.okBtn().click();
  }
  @step('Clear Filters')
  async clearFilters() {
    await this.clearFiltersBtn().click();
  }
}