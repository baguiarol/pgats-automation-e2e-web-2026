class LoginPage {
  elements = {
    loginMenu: () => cy.get('a[href="/login"]'),
    email: () => cy.get('[data-qa="login-email"]'),
    password: () => cy.get('[data-qa="login-password"]'),
    loginButton: () => cy.get('[data-qa="login-button"]'),
    errorMessage: () => cy.get('.login-form form p'),

    loggedInUser: () => cy.get('a:contains("Logged in as")'),
    logoutMenu: () => cy.get('a[href="/logout"]'),
    deleteAccountMenu: () => cy.get('a[href="/delete_account"]'),

    accountDeletedMessage: () => cy.get('[data-qa="account-deleted"]'),
    continueButton: () => cy.get('[data-qa="continue-button"]'),
  };

  openPage() {
    this.elements.loginMenu().click();
  }

  signIn(email, password) {
    this.elements.email().type(email);
    this.elements.password().type(password, { log: false });
    this.elements.loginButton().click();
  }

  assertUserLoggedIn(name) {
    this.elements.loggedInUser().should('be.visible').and('contain', name);
  }

  assertLoginError() {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!');
  }

  logout() {
    this.elements.logoutMenu().click();
  }

  assertLoggedOut() {
    cy.url().should('include', '/login');
    this.elements.logoutMenu().should('not.exist');
  }

  deleteAccount() {
    this.elements.deleteAccountMenu().click();
    this.elements.accountDeletedMessage()
      .should('be.visible')
      .and('contain.text', 'Account Deleted');
    this.elements.continueButton().click();
  }
}

export const loginPage = new LoginPage();
