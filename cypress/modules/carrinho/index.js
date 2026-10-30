const seletores = {
  botaoAdicionar: '.add-to-cart',
  modalSucesso: '#cartModal',
  linkVerCarrinho: '#cartModal a[href="/view_cart"]',

  botaoCheckout: '.check_out',
  botaoPlaceOrder: 'a[href="/payment"]',

  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',

  mensagemPedido: '[data-qa="order-placed"]',
};

export const carrinho = {
  /** Adiciona o primeiro produto da vitrine e abre o carrinho pelo modal. */
  adicionarPrimeiroProduto() {
    cy.get(seletores.botaoAdicionar).first().click();
    cy.get(seletores.modalSucesso).should('be.visible');
    cy.get(seletores.linkVerCarrinho).click();
    cy.url().should('include', '/view_cart');
  },

  /** /view_cart → /checkout → /payment */
  irParaPagamento() {
    cy.get(seletores.botaoCheckout).click();
    cy.get(seletores.botaoPlaceOrder).click();
    cy.url().should('include', '/payment');
  },

  pagar(cartao) {
    cy.get(seletores.nomeCartao).type(cartao.nome);
    cy.get(seletores.numeroCartao).type(cartao.numero);
    cy.get(seletores.cvc).type(cartao.cvc);
    cy.get(seletores.mesExpiracao).type(cartao.mes);
    cy.get(seletores.anoExpiracao).type(cartao.ano);
    cy.get(seletores.botaoPagar).click();
  },

  validarPedidoConcluido() {
    cy.get(seletores.mensagemPedido)
      .should('be.visible')
      .and('contain.text', 'Order Placed');
  },

  /** Fluxo completo de compra a partir da página de produtos. */
  finalizarCompra(cartao) {
    this.adicionarPrimeiroProduto();
    this.irParaPagamento();
    this.pagar(cartao);
    this.validarPedidoConcluido();
  },
};
