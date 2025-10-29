import BasePage from './BasePage';

export default class RegistrationPage extends BasePage {
  selectors = {
    fullName: '#fullName',
    email: '#email',
    password: '#password',
    confirmPassword: '#confirmPassword',
    submitBtn: 'button[type="submit"]',
    otpField: '#otp',       
    successMsg: '.success-message',
    errorMsg: '.error-message'
  };

  async open() {
    await this.navigate('https://carshare.yomafleet.com/account/register');
  }

  async register(fullName: string, email: string, password: string, confirmPassword: string) {
    await this.setValue(this.selectors.fullName, fullName);
    await this.setValue(this.selectors.email, email);
    await this.setValue(this.selectors.password, password);
    await this.setValue(this.selectors.confirmPassword, confirmPassword);
    await this.click(this.selectors.submitBtn);
  }

  async enterOTP(otp: string) {
    if (await this.isVisible(this.selectors.otpField)) {
      await this.setValue(this.selectors.otpField, otp);
    }
  }
}
