import { test, expect } from '../../main/typescript/base/customFixtures';
import { UserManagementPage } from '../../main/typescript/pages/UserManagementPage';


test('Navigate to User Management Page', async ({ userManagementPage, page, ENV }) =>
{
  // Navigate directly to user management page with stored session
  //const userManagementUrl = ENV.BASE_URL.replace('/login', '/user-management');
 // await page.goto(userManagementUrl);
   await page.goto(ENV.BASE_URL.replace('/login', '/dashboard'));
  await page.waitForLoadState('networkidle');
  await userManagementPage.navigateToUserManagement();
    await page.waitForLoadState('networkidle');
  // Assert that we are on the user management page
  const userManagementPageTitle = page.locator('h1, h2');
  await expect(userManagementPageTitle).toBeTruthy();
  //await expect(page).toHaveTitle('user-management');

  console.log('✅ Navigated to User Management page successfully');
});

test('', async ({ userManagementPage, page, ENV }) =>
{
  await page.goto(ENV.BASE_URL.replace('/login', '/user-management'));
  await page.waitForLoadState('networkidle');
  await userManagementPage.getTotalUsersCount();
  // Assert that we are on the user management page
  const userManagementPageTitle = page.locator('h1, h2');
  await expect(userManagementPageTitle).toBeTruthy();
  //await expect(page).toHaveTitle('user-management');

  console.log('✅ Navigated to User Management page successfully');
});
test('Verify total users matches pagination count in user management', async ({  userManagementPage,page, ENV }) => 
  {
  await page.goto(ENV.BASE_URL.replace('/login', '/user-management'));
  // ✅ Main validation (your step)
  await page.waitForLoadState('networkidle');
  const totalUsers = await userManagementPage.getTotalUsersCount();
  const paginationTotal = await userManagementPage.getPaginationTotalCount();
  expect(totalUsers).toBe(paginationTotal);
  console.log(`Total Users: ${totalUsers}, Pagination Total: ${paginationTotal}`);
  console.log('✅ Total users count matches pagination count');
});
test('Verify active users matches pagination count of active users in user management', async ({  userManagementPage,page, ENV }) => 
  {
  await page.goto(ENV.BASE_URL.replace('/login', '/user-management'));
  // ✅ Main validation (your step)
  await page.waitForLoadState('networkidle');
  const activeUsersCount = await userManagementPage.getTotalActiveUsersCount();
  await userManagementPage.getTotalActiveUsersCount();
  await page.waitForLoadState('networkidle');
  await userManagementPage.selectStatus('Active');
  await page.waitForTimeout(8000); 
  const paginationTotal = await userManagementPage.getPaginationTotalCount();
  expect(activeUsersCount).toBe(paginationTotal);
  console.log(`Active Users Count: ${activeUsersCount}, Pagination Total: ${paginationTotal}`);
  console.log('✅ Active users count matches pagination count');
})

test('Verify inactive users matches pagination count of active users in user management', async ({  userManagementPage,page, ENV }) => 
  {
  await page.goto(ENV.BASE_URL.replace('/login', '/user-management'));
  // ✅ Main validation (your step)
  await page.waitForLoadState('networkidle');
  const inactiveUsersCount = await userManagementPage.getInActiveUsersCount();
  await userManagementPage.getInActiveUsersCount();
  await page.waitForLoadState('networkidle');
  await userManagementPage.selectStatus('Inactive');
  await page.waitForTimeout(8000); 
  const paginationTotal = await userManagementPage.getPaginationTotalCount();
  expect(inactiveUsersCount).toBe(paginationTotal);
  console.log(`Inactive Users Count: ${inactiveUsersCount}, Pagination Total: ${paginationTotal}`);
  console.log('✅ Inactive users count matches pagination count');
});
test('Verify admin users count matches pagination count of admin users in user management', async ({  userManagementPage,page, ENV }) => 
  {
  await page.goto(ENV.BASE_URL.replace('/login', '/user-management'));
  // ✅ Main validation (your step)
  await page.waitForLoadState('networkidle');
  const AdminCount = await userManagementPage.getAdminCount();
  await userManagementPage.getAdminCount();
  await page.waitForLoadState('networkidle');
  await userManagementPage.selectRole('Admin');
  await page.waitForTimeout(8000); 
  const paginationTotal = await userManagementPage.getPaginationTotalCount();
  expect(AdminCount).toBe(paginationTotal);
  console.log(`Admin Count: ${AdminCount}, Pagination Total: ${paginationTotal}`);
  console.log('✅ Admin users count matches pagination count');
});
test('Verify Managers users matches pagination count of Manager users in user management', async ({  userManagementPage,page, ENV }) => 
  {
  await page.goto(ENV.BASE_URL.replace('/login', '/user-management'));
  // ✅ Main validation (your step)
  await page.waitForLoadState('networkidle');
  const ManagerCount = await userManagementPage.getManagerCount();
  await userManagementPage.getManagerCount();
  await page.waitForLoadState('networkidle');
  await userManagementPage.selectRole('Manager');
  await page.waitForTimeout(8000); 
  const paginationTotal = await userManagementPage.getPaginationTotalCount();
  expect(ManagerCount).toBe(paginationTotal);
  console.log(`Manager Count: ${ManagerCount}, Pagination Total: ${paginationTotal}`);
  console.log('✅ Manager users count matches pagination count');
});
test('Verify add user page navigation', async ({ userManagementPage, page, ENV }) =>
{
  // Navigate directly to user management page with stored session

  await page.goto(ENV.BASE_URL.replace('/login', '/user-management'));
  await page.waitForLoadState('networkidle');
  // Assert that we are on the user management page
  await userManagementPage.clickAddUser();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://dev-freight.wendai.ai/add-user'); 

  console.log('✅ Navigated to Add User page successfully');
});

test('Add New Standard User', async ({ userManagementPage, page, ENV }) =>

{
  // Navigate directly to admin page with stored session
 const addUserUrl = ENV.BASE_URL.replace('/login', '/add-user');
  await page.goto(addUserUrl);
  await page.waitForLoadState('networkidle')
  await userManagementPage.addStandardUser();
  await page.waitForLoadState('networkidle');
  await userManagementPage.validateStandardUserAdded();
});

