class ProductsPage {
  elements = {
    productsMenu: () => cy.get('a[href="/products"]'),
    productList: () => cy.get('.features_items'),
    productCards: () => cy.get('.features_items .product-image-wrapper'),
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
    this.elements.listTitle().should('contain.text', 'All Products');
    this.elements.productCards().should('have.length.greaterThan', 0);
  }

  openFirstProductDetails() {
    this.elements.detailsLink().first().click();
    cy.url().should('include', '/product_details/');
  }

  assertDetails() {
    this.elements.detailsPanel().should('be.visible').within(() => {
      this.elements.productName().should('be.visible').and('not.be.empty');
      this.elements.productPrice().should('be.visible').and('contain', 'Rs.');
      ['Category', 'Availability', 'Condition', 'Brand'].forEach((info) => {
        this.elements.productInfo(info).should('be.visible');
      });
    });
  }

  search(term) {
    this.elements.searchField().type(term);
    this.elements.searchButton().click();
    cy.url().should('include', `search=${term}`);
  }

  assertSearchResults(term) {
    this.elements.listTitle()
      .should('be.visible')
      .and('contain.text', 'Searched Products');
    this.elements.productCards().should('have.length.greaterThan', 0);
    this.elements.productList().should('contain', term);
  }
}

export const productsPage = new ProductsPage();
