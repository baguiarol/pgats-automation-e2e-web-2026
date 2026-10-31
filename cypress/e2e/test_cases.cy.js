/// <reference types="cypress" />

import { signupPage } from '../modules/signup';
import { loginPage } from '../modules/login';
import { productsPage } from '../modules/products';
import { cartPage } from '../modules/cart';
import { footerPage } from '../modules/footer';
import { createUser, createCard } from '../support/factories';

describe('PGATS Final Project - Automation Exercise E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Authentication and account', () => {
    it('Test Case 1: Register User', () => {
      const user = createUser('Signup');

      signupPage.createAccount(user);
      loginPage.assertUserLoggedIn(user.displayName);

      loginPage.deleteAccount();
    });

    it('Test Case 2: Login User with correct email and password', () => {
      const user = createUser('Login');
      signupPage.createAccount(user);
      loginPage.logout();

      loginPage.openPage();
      loginPage.signIn(user.email, user.password);
      loginPage.assertUserLoggedIn(user.displayName);

      loginPage.deleteAccount();
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
      loginPage.openPage();
      loginPage.signIn('invalid_email_pgats@doesnotexist.com', 'WrongPassword999');

      loginPage.assertLoginError();
    });

    it('Test Case 4: Logout User', () => {
      const user = createUser('Logout');
      signupPage.createAccount(user);

      loginPage.logout();
      loginPage.assertLoggedOut();
    });

    it('Test Case 5: Register User with existing email', () => {
      const user = createUser('Existing');
      signupPage.createAccount(user);
      loginPage.logout();

      loginPage.openPage();
      signupPage.start(user.displayName, user.email);
      signupPage.assertEmailAlreadyExists();

      // Cleanup: logs in with the created account to delete it
      loginPage.signIn(user.email, user.password);
      loginPage.deleteAccount();
    });
  });

  context('Products', () => {
    it('Test Case 8: Verify All Products and product detail page', () => {
      productsPage.openPage();
      productsPage.assertListVisible();

      productsPage.openFirstProductDetails();
      productsPage.assertDetails();
    });

    it('Test Case 9: Search Product', () => {
      productsPage.openPage();
      productsPage.search('Dress');

      productsPage.assertSearchResults('Dress');
    });
  });

  context('Footer', () => {
    it('Test Case 10: Verify Subscription in home page', () => {
      footerPage.scrollToSubscription();
      footerPage.subscribe(`qa_newsletter_${Date.now()}@example.com`);

      footerPage.assertSubscribed();
    });
  });

  context('Cart and checkout', () => {
    it('Test Case 15: Place Order: Register before Checkout', () => {
      const user = createUser('Checkout');
      signupPage.createAccount(user);
      loginPage.assertUserLoggedIn(user.displayName);

      productsPage.openPage();
      cartPage.completePurchase(createCard(user.displayName));

      loginPage.deleteAccount();
    });

    it('Test Case 16: Place Order: Login before Checkout', () => {
      const user = createUser('LoginCheckout');
      signupPage.createAccount(user);
      loginPage.logout();

      loginPage.openPage();
      loginPage.signIn(user.email, user.password);
      loginPage.assertUserLoggedIn(user.displayName);

      productsPage.openPage();
      cartPage.completePurchase(createCard(user.displayName));

      loginPage.deleteAccount();
    });
  });
});
