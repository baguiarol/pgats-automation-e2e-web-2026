const seletores = {
  rodape: '#footer',
  tituloInscricao: '.single-widget h2',
  campoEmail: '#susbscribe_email', // Grafia "susbscribe" é a do próprio site
  botaoInscrever: '#subscribe',
  mensagemSucesso: '#success-subscribe',
};

export const rodape = {
  rolarAteInscricao() {
    cy.get(seletores.rodape).scrollIntoView();
    cy.get(seletores.tituloInscricao)
      .should('be.visible')
      .and('contain', 'Subscription');
  },

  inscrever(email) {
    cy.get(seletores.campoEmail).type(email);
    cy.get(seletores.botaoInscrever).click();
  },

  validarInscricao() {
    cy.get(seletores.mensagemSucesso)
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  },
};
