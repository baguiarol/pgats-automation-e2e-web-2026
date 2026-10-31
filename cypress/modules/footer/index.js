class FooterPage {
  elements = {
    footer: () => cy.get('#footer'),
    subscriptionTitle: () => cy.get('.single-widget h2'),
    emailField: () => cy.get('#susbscribe_email'),
    subscribeButton: () => cy.get('#subscribe'),
    successMessage: () => cy.get('#success-subscribe'),
  };

  scrollToSubscription() {
    this.elements.footer().scrollIntoView();
    this.elements.subscriptionTitle()
      .should('be.visible')
      .and('contain', 'Subscription');
  }

  subscribe(email) {
    this.elements.emailField().type(email);
    this.elements.subscribeButton().click();
  }

  assertSubscribed() {
    this.elements.successMessage()
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  }
}

export const footerPage = new FooterPage();
