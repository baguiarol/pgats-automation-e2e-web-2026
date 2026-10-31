class CartPage {
  elements = {
    addButton: () => cy.get('.add-to-cart'),
    successModal: () => cy.get('#cartModal'),
    viewCartLink: () => cy.get('#cartModal a[href="/view_cart"]'),

    checkoutButton: () => cy.get('.check_out'),
    placeOrderButton: () => cy.get('a[href="/payment"]'),

    cardName: () => cy.get('[data-qa="name-on-card"]'),
    cardNumber: () => cy.get('[data-qa="card-number"]'),
    cvc: () => cy.get('[data-qa="cvc"]'),
    expiryMonth: () => cy.get('[data-qa="expiry-month"]'),
    expiryYear: () => cy.get('[data-qa="expiry-year"]'),
    payButton: () => cy.get('[data-qa="pay-button"]'),

    orderMessage: () => cy.get('[data-qa="order-placed"]'),
  };

  /** Adds the first product on display and opens the cart from the modal. */
  addFirstProduct() {
    this.elements.addButton().first().click();
    this.elements.successModal().should('be.visible');
    this.elements.viewCartLink().click();
    cy.url().should('include', '/view_cart');
  }

  /** /view_cart → /checkout → /payment */
  goToPayment() {
    this.elements.checkoutButton().click();
    this.elements.placeOrderButton().click();
    cy.url().should('include', '/payment');
  }

  pay(card) {
    this.elements.cardName().type(card.name);
    this.elements.cardNumber().type(card.number);
    this.elements.cvc().type(card.cvc);
    this.elements.expiryMonth().type(card.month);
    this.elements.expiryYear().type(card.year);
    this.elements.payButton().click();
  }

  assertOrderPlaced() {
    this.elements.orderMessage()
      .should('be.visible')
      .and('contain.text', 'Order Placed');
  }

  /** Full purchase flow starting from the products page. */
  completePurchase(card) {
    this.addFirstProduct();
    this.goToPayment();
    this.pay(card);
    this.assertOrderPlaced();
  }
}

export const cartPage = new CartPage();
