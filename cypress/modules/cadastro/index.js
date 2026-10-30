import { login } from '../login';

const seletores = {
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  mensagemErro: '.signup-form form p',

  generoMasculino: '#id_gender1',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  endereco: '[data-qa="address"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  zipcode: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  mensagemContaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

export const cadastro = {
  /** Etapa 1: nome + e-mail e clique em Signup. */
  iniciar(nome, email) {
    cy.get(seletores.nome).type(nome);
    cy.get(seletores.email).type(email);
    cy.get(seletores.botaoSignup).click();
  },

  /** Etapa 2: formulário completo de dados pessoais e endereço. */
  preencherFormulario(usuario) {
    cy.get(seletores.generoMasculino).check();
    cy.get(seletores.senha).type(usuario.senha, { log: false });
    cy.get(seletores.dia).select(usuario.dia); // Opções sem zero à esquerda: '1' a '31'
    cy.get(seletores.mes).select(usuario.mes);
    cy.get(seletores.ano).select(usuario.ano);
    cy.get(seletores.primeiroNome).type(usuario.nome);
    cy.get(seletores.sobrenome).type(usuario.sobrenome);
    cy.get(seletores.endereco).type(usuario.endereco);
    cy.get(seletores.pais).select(usuario.pais);
    cy.get(seletores.estado).type(usuario.estado);
    cy.get(seletores.cidade).type(usuario.cidade);
    cy.get(seletores.zipcode).type(usuario.zipcode);
    cy.get(seletores.celular).type(usuario.celular);
    cy.get(seletores.botaoCriarConta).click();
  },

  /** Confirma "Account Created!" (o HTML usa caixa mista; o CSS deixa em maiúsculas). */
  validarContaCriada() {
    cy.get(seletores.mensagemContaCriada)
      .should('be.visible')
      .and('contain.text', 'Account Created');
    cy.get(seletores.botaoContinuar).click();
  },

  validarEmailJaExistente() {
    cy.get(seletores.mensagemErro)
      .should('be.visible')
      .and('contain', 'Email Address already exist!');
  },

  /** Fluxo completo de criação de conta; termina com o usuário logado. */
  criarConta(usuario) {
    login.acessarPagina();
    this.iniciar(usuario.nomeExibicao, usuario.email);
    this.preencherFormulario(usuario);
    this.validarContaCriada();
  },
};
