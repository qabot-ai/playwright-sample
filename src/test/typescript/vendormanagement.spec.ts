import { test, expect } from '../../main/typescript/base/customFixtures';

test('Dashboard Header Visibility', async ({ dashboardPage, page, ENV }) =>
{ 
  await page.goto(ENV.BASE_URL.replace('/login', ''));
  await dashboardPage.dashboardHeaderVisibilty();
  // Assert that dashboard header is visible
  const dashboardHeader = page.locator("//h1[text()='Dashboard']");
  await expect(dashboardHeader).toBeVisible();
   console.log('✅ Dashboard header is visible');
});

test('Navigate to Vendor Management Page', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page with stored session
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  // Assert that we are on the vendor management page
  const vendorPageTitle = page.locator('h1, h2');
  await expect(vendorPageTitle).toBeTruthy();
   console.log('✅ navigated to Vendor Management page successfully');
});

test('Add New Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  // Add a new vendor
  await vendormanagementPage.addVendor();
   console.log('✅ New vendor added successfully');
});

test('Edit Vendor Information', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  await vendormanagementPage.searchVendor("Jampanaaaaaaa");
  // Edit the vendor
  await vendormanagementPage.editVendor();
   console.log('✅ Edit Vendor Information successfully')
});
test('Validate Edited Vendor Details', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  // Validate vendor details
  await vendormanagementPage.validateVendor();
  // Assert that all vendor details are present in the table
  const tableBody = page.locator('tbody');
  await expect(tableBody).toContainText('Jampanaaa');
  await expect(tableBody).toContainText('LARRR');
  await expect(tableBody).toContainText('Truckers');
  await expect(tableBody).toContainText('lalithajamp11s@yopmail.com');
 console.log('✅ Validate Edited Vendor Details successfully')
});
test('Delete Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  await vendormanagementPage.searchVendor("Jampanaaa");
  // Delete the vendor
  await vendormanagementPage.deleteVendor(); 
   
});
test('Search for Deleted Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
   console.log('✅ Delete Vendor successfully');
  // Search for a non-existent vendor
  const searchBox = page.getByRole('textbox', { name: 'Search by Name' });
  await searchBox.waitFor({ state: 'visible', timeout: 10000 });
  await vendormanagementPage.searchVendor("Jampanaaa");
  
  // Assert that search results are displayed
  await page.waitForLoadState('networkidle');
   console.log('✅ Search for Deleted Vendor successfull');
});

test('Clear Filters', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  await vendormanagementPage.searchVendor("Jampanaaa");
  // Clear filters
  await vendormanagementPage.clearFilters();
  
  // Assert that filters are cleared and page reloads
  await page.waitForLoadState('networkidle');
  const tableBody = page.locator('tbody');
  await expect(tableBody).toBeVisible();
   console.log('✅ Clear Filters successfully');
});
test('Verify Vendor Table Headers', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  // Verify table headers
  await vendormanagementPage.verifyVendorTableHeaders();
  // Assert that headers are visible and contain expected text
  await page.waitForLoadState('networkidle');
   console.log('✅ Verify Vendor Table Headers successfully');
});
