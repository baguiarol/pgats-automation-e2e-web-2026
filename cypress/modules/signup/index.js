import { loginPage } from '../login';

class SignupPage {
  elements = {
    name: () => cy.get('[data-qa="signup-name"]'),
    email: () => cy.get('[data-qa="signup-email"]'),
    signupButton: () => cy.get('[data-qa="signup-button"]'),
    errorMessage: () => cy.get('.signup-form form p'),

    maleGender: () => cy.get('#id_gender1'),
    password: () => cy.get('[data-qa="password"]'),
    day: () => cy.get('[data-qa="days"]'),
    month: () => cy.get('[data-qa="months"]'),
    year: () => cy.get('[data-qa="years"]'),
    firstName: () => cy.get('[data-qa="first_name"]'),
    lastName: () => cy.get('[data-qa="last_name"]'),
    address: () => cy.get('[data-qa="address"]'),
    country: () => cy.get('[data-qa="country"]'),
    state: () => cy.get('[data-qa="state"]'),
    city: () => cy.get('[data-qa="city"]'),
    zipcode: () => cy.get('[data-qa="zipcode"]'),
    mobileNumber: () => cy.get('[data-qa="mobile_number"]'),
    createAccountButton: () => cy.get('[data-qa="create-account"]'),

    accountCreatedMessage: () => cy.get('[data-qa="account-created"]'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
  };

  start(name, email) {
    this.elements.name().type(name);
    this.elements.email().type(email);
    this.elements.signupButton().click();
  }

  fillForm(user) {
    this.elements.maleGender().check();
    this.elements.password().type(user.password, { log: false });
    this.elements.day().select(user.day);
    this.elements.month().select(user.month);
    this.elements.year().select(user.year);
    this.elements.firstName().type(user.firstName);
    this.elements.lastName().type(user.lastName);
    this.elements.address().type(user.address);
    this.elements.country().select(user.country);
    this.elements.state().type(user.state);
    this.elements.city().type(user.city);
    this.elements.zipcode().type(user.zipcode);
    this.elements.mobileNumber().type(user.mobileNumber);
    this.elements.createAccountButton().click();
  }

  assertAccountCreated() {
    this.elements.accountCreatedMessage()
      .should('be.visible')
      .and('contain.text', 'Account Created');
    this.elements.continueButton().click();
  }

  assertEmailAlreadyExists() {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Email Address already exist!');
  }

  createAccount(user) {
    loginPage.openPage();
    this.start(user.displayName, user.email);
    this.fillForm(user);
    this.assertAccountCreated();
  }
}

export const signupPage = new SignupPage();
