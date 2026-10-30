const seletores = {
  menuLogin: 'a[href="/login"]',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErro: '.login-form form p',

  usuarioLogado: 'a:contains("Logged in as")',
  menuLogout: 'a[href="/logout"]',
  menuExcluirConta: 'a[href="/delete_account"]',

  mensagemContaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

export const login = {
  /** Abre a página de Login/Signup pelo menu superior. */
  acessarPagina() {
    cy.get(seletores.menuLogin).click();
  },

  /** Preenche e envia o formulário de login. */
  entrar(email, senha) {
    cy.get(seletores.email).type(email);
    cy.get(seletores.senha).type(senha, { log: false });
    cy.get(seletores.botaoLogin).click();
  },

  validarUsuarioLogado(nome) {
    cy.get(seletores.usuarioLogado).should('be.visible').and('contain', nome);
  },

  validarErroLogin() {
    cy.get(seletores.mensagemErro)
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!');
  },

  sair() {
    cy.get(seletores.menuLogout).click();
  },

  validarLogout() {
    cy.url().should('include', '/login');
    cy.get(seletores.menuLogout).should('not.exist');
  },

  /** Exclui a conta logada e confirma a mensagem "Account Deleted!". */
  excluirConta() {
    cy.get(seletores.menuExcluirConta).click();
    cy.get(seletores.mensagemContaExcluida)
      .should('be.visible')
      .and('contain.text', 'Account Deleted');
    cy.get(seletores.botaoContinuar).click();
  },
};
