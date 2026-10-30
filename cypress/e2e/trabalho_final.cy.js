/// <reference types="cypress" />

import { cadastro } from '../modules/cadastro';
import { login } from '../modules/login';
import { produtos } from '../modules/produtos';
import { carrinho } from '../modules/carrinho';
import { rodape } from '../modules/rodape';
import { criarUsuario, criarCartao } from '../support/factories';

describe('Trabalho de Conclusão PGATS - Automation Exercise E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Autenticação e conta', () => {
    it('Caso 1: Cadastrar usuário', () => {
      const usuario = criarUsuario('Cadastro');

      cadastro.criarConta(usuario);
      login.validarUsuarioLogado(usuario.nomeExibicao);

      login.excluirConta();
    });

    it('Caso 2: Login com e-mail e senha corretos', () => {
      const usuario = criarUsuario('Login');
      cadastro.criarConta(usuario);
      login.sair();

      login.acessarPagina();
      login.entrar(usuario.email, usuario.senha);
      login.validarUsuarioLogado(usuario.nomeExibicao);

      login.excluirConta();
    });

    it('Caso 3: Login com e-mail e senha incorretos', () => {
      login.acessarPagina();
      login.entrar('email_invalido_pgats@naoexiste.com', 'SenhaIncorreta999');

      login.validarErroLogin();
    });

    it('Caso 4: Logout do usuário', () => {
      const usuario = criarUsuario('Logout');
      cadastro.criarConta(usuario);

      login.sair();
      login.validarLogout();
    });

    it('Caso 5: Cadastro com e-mail já existente', () => {
      const usuario = criarUsuario('Existente');
      cadastro.criarConta(usuario);
      login.sair();

      login.acessarPagina();
      cadastro.iniciar(usuario.nomeExibicao, usuario.email);
      cadastro.validarEmailJaExistente();

      // Limpeza: loga com a conta criada para excluí-la
      login.entrar(usuario.email, usuario.senha);
      login.excluirConta();
    });
  });

  context('Produtos', () => {
    it('Caso 8: Ver todos os produtos e a página de detalhes', () => {
      produtos.acessarPagina();
      produtos.validarListaVisivel();

      produtos.abrirDetalhesPrimeiroProduto();
      produtos.validarDetalhes();
    });

    it('Caso 9: Pesquisar produto', () => {
      produtos.acessarPagina();
      produtos.pesquisar('Dress');

      produtos.validarResultadoPesquisa('Dress');
    });
  });

  context('Rodapé', () => {
    it('Caso 10: Inscrição na newsletter pela página inicial', () => {
      rodape.rolarAteInscricao();
      rodape.inscrever(`aluna_newsletter_${Date.now()}@teste.com`);

      rodape.validarInscricao();
    });
  });

  context('Carrinho e checkout', () => {
    it('Caso 15: Fazer pedido cadastrando antes do checkout', () => {
      const usuario = criarUsuario('Checkout');
      cadastro.criarConta(usuario);
      login.validarUsuarioLogado(usuario.nomeExibicao);

      produtos.acessarPagina();
      carrinho.finalizarCompra(criarCartao(usuario.nomeExibicao));

      login.excluirConta();
    });

    it('Caso 16: Fazer pedido fazendo login antes do checkout', () => {
      const usuario = criarUsuario('LoginCheckout');
      cadastro.criarConta(usuario);
      login.sair();

      login.acessarPagina();
      login.entrar(usuario.email, usuario.senha);
      login.validarUsuarioLogado(usuario.nomeExibicao);

      produtos.acessarPagina();
      carrinho.finalizarCompra(criarCartao(usuario.nomeExibicao));

      login.excluirConta();
    });
  });
});
