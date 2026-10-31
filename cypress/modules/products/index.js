class ProductsPage {
  elements = {
    productsMenu: () => cy.get('a[href="/products"]'),
    productList: () => cy.get('.features_items'),
    detailsLink: () => cy.get('.features_items a[href^="/product_details"]'),

    detailsPanel: () => cy.get('.product-information'),
    productName: () => cy.get('h2'),
    productPrice: () => cy.get('span span'),
    productInfo: (info) => cy.contains('p', info),

    searchField: () => cy.get('#search_product'),
    searchButton: () => cy.get('#submit_search'),
    listTitle: () => cy.get('.features_items .title'),
  };

  openPage() {
    this.elements.productsMenu().click();
    cy.url().should('include', '/products');
  }

  assertListVisible() {
    this.elements.productList().should('be.visible');
  }

  openFirstProductDetails() {
    this.elements.detailsLink().first().click();
  }

  /** Name, category, price, availability, condition and brand. */
  assertDetails() {
    this.elements.detailsPanel().should('be.visible').within(() => {
      this.elements.productName().should('be.visible');
      this.elements.productPrice().should('be.visible');
      ['Category', 'Availability', 'Condition', 'Brand'].forEach((info) => {
        this.elements.productInfo(info).should('be.visible');
      });
    });
  }

  search(term) {
    this.elements.searchField().type(term);
    this.elements.searchButton().click();
  }

  assertSearchResults(term) {
    this.elements.listTitle()
      .should('be.visible')
      .and('contain.text', 'Searched Products');
    this.elements.productList().should('contain', term);
  }
}

export const productsPage = new ProductsPage();
