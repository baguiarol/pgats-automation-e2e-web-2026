class CartPage {
  elements = {
    addButton: () => cy.get('.add-to-cart'),
    successModal: () => cy.get('#cartModal'),
    viewCartLink: () => cy.get('#cartModal a[href="/view_cart"]'),
    cartRows: () => cy.get('#cart_info tbody tr'),

    checkoutButton: () => cy.get('.check_out'),
    deliveryAddress: () => cy.get('#address_delivery'),
    invoiceAddress: () => cy.get('#address_invoice'),
    placeOrderButton: () => cy.get('a[href="/payment"]'),

    cardName: () => cy.get('[data-qa="name-on-card"]'),
    cardNumber: () => cy.get('[data-qa="card-number"]'),
    cvc: () => cy.get('[data-qa="cvc"]'),
    expiryMonth: () => cy.get('[data-qa="expiry-month"]'),
    expiryYear: () => cy.get('[data-qa="expiry-year"]'),
    payButton: () => cy.get('[data-qa="pay-button"]'),

    orderMessage: () => cy.get('[data-qa="order-placed"]'),
    orderConfirmation: () => cy.contains('p', 'Congratulations! Your order has been confirmed!'),
  };

  addFirstProduct() {
    this.elements.addButton().first().click();
    this.elements.successModal().should('be.visible');
    this.elements.viewCartLink().click();
    cy.url().should('include', '/view_cart');
    this.elements.cartRows().should('have.length', 1);
  }

  assertCheckoutDetails(user) {
    cy.url().should('include', '/checkout');
    [this.elements.deliveryAddress, this.elements.invoiceAddress].forEach((address) => {
      address().should('be.visible').within(() => {
        [user.firstName, user.lastName, user.address, user.city, user.country, user.mobileNumber]
          .forEach((info) => cy.root().should('contain', info));
      });
    });
    this.elements.cartRows().should('have.length.greaterThan', 0);
  }

  goToPayment(user) {
    this.elements.checkoutButton().click();
    this.assertCheckoutDetails(user);
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
    this.elements.orderConfirmation().should('be.visible');
    cy.url().should('include', '/payment_done');
  }

  completePurchase(user, card) {
    this.addFirstProduct();
    this.goToPayment(user);
    this.pay(card);
    this.assertOrderPlaced();
  }
}

export const cartPage = new CartPage();
