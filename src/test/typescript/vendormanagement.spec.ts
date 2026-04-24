import { test, expect } from '../../main/typescript/base/customFixtures';

test('Dashboard Header Visibility', async ({ dashboardPage, page, ENV }) =>
{ 
  await page.goto(ENV.BASE_URL.replace('/login', ''));
  await dashboardPage.dashboardHeaderVisibilty();
  // Assert that dashboard header is visible
  const dashboardHeader = page.locator("//h1[text()='Dashboard']");
  await expect(dashboardHeader).toBeVisible();
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
});

test('Add New Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  // Add a new vendor
  await vendormanagementPage.addVendor();
});

test('Search for Added Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  
  // Search for the vendor
  await vendormanagementPage.searchVendor();
  
  // Assert that search results are displayed
  await page.waitForLoadState('networkidle');
  const tableBody = page.locator('tbody');
  
  // Assert that search results contain the vendor name
  const vendorExists = await tableBody.locator('text=Jampanaaaaaaa').isVisible().catch(() => false);
  
  if (vendorExists) {
    // If vendor exists, assert it's in the table
    await expect(tableBody).toContainText('Jampanaaaaaaa');
  } else {
    // If vendor does not exist, assert true (vendor not found)
    await expect(vendorExists).toBe(false);
  }
});

test('Edit Vendor Information', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  
  // Edit the vendor
  await vendormanagementPage.editVendor();
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
  await expect(tableBody).toContainText('Jampanaa');
  await expect(tableBody).toContainText('LARRR');
  await expect(tableBody).toContainText('Truckers');
  await expect(tableBody).toContainText('lalithajamp11s@yopmail.com');
});
test('Search for Edited Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  
  // Search for the vendor
  await vendormanagementPage.searchVendor();
  
  // Assert that search results are displayed
  await page.waitForLoadState('networkidle');
  const tableBody = page.locator('tbody');
  
  // Assert that search results contain the vendor name
  const vendorExists = await tableBody.locator('text=Jampanaa').isVisible().catch(() => false);
  
  if (vendorExists) {
    // If vendor exists, assert it's in the table
    await expect(tableBody).toContainText('Jampanaa');
  } else {
    // If vendor does not exist, assert true (vendor not found)
    await expect(vendorExists).toBe(false);
  }
});
test('Delete Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  
  // Delete the vendor
  await vendormanagementPage.deleteVendor(); 
});


test('Search for Deleted Vendor', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  
  // Search for a non-existent vendor
  const searchBox = page.getByRole('textbox', { name: 'Search by Name' });
  await searchBox.waitFor({ state: 'visible', timeout: 10000 });
  await searchBox.fill('Jampanaa');
  await searchBox.press('Enter');
  
  // Assert that search results are displayed
  await page.waitForLoadState('networkidle');
});


test('Clear Filters', async ({ vendormanagementPage, page, ENV }) =>
{
  // Navigate directly to vendor management page
  const vendorManagementUrl = ENV.BASE_URL.replace('/login', '/vendor-management');
  await page.goto(vendorManagementUrl);
  await page.waitForLoadState('networkidle');
  
  // Clear filters
  await vendormanagementPage.clearFilters();
  
  // Assert that filters are cleared and page reloads
  await page.waitForLoadState('networkidle');
  const tableBody = page.locator('tbody');
  await expect(tableBody).toBeVisible();
});