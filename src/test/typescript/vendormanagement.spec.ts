import { test } from '../../main/typescript/base/customFixtures';

test('VendorManagement Flow', async ({ loginPage,dashboardPage, vendormanagementPage }) =>
{
   await loginPage.lauchURL();
   await loginPage.performLogin('superadmin@yopmail.com', 'Test@1234');
   await dashboardPage.dashboardHeaderVisibilty();
  await vendormanagementPage.navigateToVendor();
  await vendormanagementPage.addVendor();
  await vendormanagementPage.editVendor();
  await vendormanagementPage.searchVendor();
  await vendormanagementPage.validateVendor();
  await vendormanagementPage.deleteVendor();
  await vendormanagementPage.clearFilters();
});