const seletores = {
  menuProdutos: 'a[href="/products"]',
  listaProdutos: '.features_items',
  linkDetalhes: '.features_items a[href^="/product_details"]',
  painelDetalhes: '.product-information',

  campoPesquisa: '#search_product',
  botaoPesquisa: '#submit_search',
  tituloLista: '.features_items .title',
};

export const produtos = {
  acessarPagina() {
    cy.get(seletores.menuProdutos).click();
    cy.url().should('include', '/products');
  },

  validarListaVisivel() {
    cy.get(seletores.listaProdutos).should('be.visible');
  },

  abrirDetalhesPrimeiroProduto() {
    cy.get(seletores.linkDetalhes).first().click();
  },

  /** Nome, categoria, preço, disponibilidade, condição e marca. */
  validarDetalhes() {
    cy.get(seletores.painelDetalhes).should('be.visible').within(() => {
      cy.get('h2').should('be.visible');
      cy.get('span span').should('be.visible');
      ['Category', 'Availability', 'Condition', 'Brand'].forEach((info) => {
        cy.contains('p', info).should('be.visible');
      });
    });
  },

  pesquisar(termo) {
    cy.get(seletores.campoPesquisa).type(termo);
    cy.get(seletores.botaoPesquisa).click();
  },

  validarResultadoPesquisa(termo) {
    cy.get(seletores.tituloLista)
      .should('be.visible')
      .and('contain.text', 'Searched Products');
    cy.get(seletores.listaProdutos).should('contain', termo);
  },
};
