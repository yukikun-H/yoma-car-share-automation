import RegistrationPage from '../pages/RegistrationPage';
import { getRandomEmail } from '../utils/helpers';

describe('Yoma Car Share - Registration Tests', function () {
  let page: RegistrationPage;

  before(function (browser) {
    page = new RegistrationPage(browser);
  });

  it('Successful Individual Registration', async function (browser) {
    await page.open();
    const email = getRandomEmail();
    await page.register('John Doe', email, 'Password123!', 'Password123!');
    await page.enterOTP('123456');
    browser.assert.containsText(page.selectors.successMsg, 'Registration successful');
  });

  it('Registration with Minimum Name Length', async function (browser) {
    await page.open();
    const email = getRandomEmail();
    await page.register('A', email, 'Password123!', 'Password123!');
    await page.enterOTP('123456');
    browser.assert.containsText(page.selectors.successMsg, 'Registration successful');
  });

  it('Registration with Maximum Name Length', async function (browser) {
    await page.open();
    const longName = 'A'.repeat(50);
    const email = getRandomEmail();
    await page.register(longName, email, 'Password123!', 'Password123!');
    await page.enterOTP('123456');
    browser.assert.containsText(page.selectors.successMsg, 'Registration successful');
  });

  it('Registration with Special Characters in Name', async function (browser) {
    await page.open();
    const email = getRandomEmail();
    await page.register("O'Neill-Smith", email, 'Password123!', 'Password123!');
    await page.enterOTP('123456');
    browser.assert.containsText(page.selectors.successMsg, 'Registration successful');
  });

  it('Empty Required Fields', async function (browser) {
    await page.open();
    await page.click(page.selectors.submitBtn);
    browser.assert.containsText(page.selectors.errorMsg, 'All fields are required');
  });

  it('Invalid Email Format', async function (browser) {
    await page.open();
    await page.register('John Doe', 'invalidEmail', 'Password123!', 'Password123!');
    browser.assert.containsText(page.selectors.errorMsg, 'Invalid email format');
  });

  it('Password Mismatch', async function (browser) {
    await page.open();
    const email = getRandomEmail();
    await page.register('John Doe', email, 'Password123!', 'Password1234!');
    browser.assert.containsText(page.selectors.errorMsg, 'The password doesnt match');
  });

  it('Password Too Short', async function (browser) {
    await page.open();
    const email = getRandomEmail();
    await page.register('John Doe', email, '123', '123');
    browser.assert.containsText(page.selectors.errorMsg, 'The password must be at least 8 characters');
  });

  it('Duplicate Email Registration', async function (browser) {
    await page.open();
    const existingEmail = 'existing_user@temp.com';
    await page.register('John Doe', existingEmail, 'Password123!', 'Password123!');
    browser.assert.containsText(page.selectors.errorMsg, 'An account with the given email already exists');
  });
});
