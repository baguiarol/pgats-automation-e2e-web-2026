/**
 * Gera um usuário com e-mail único (timestamp) para evitar duplicidade no banco.
 * Qualquer campo pode ser sobrescrito via `overrides`.
 */
export function criarUsuario(apelido, overrides = {}) {
  return {
    nomeExibicao: `Juliana ${apelido}`,
    email: `aluna_${apelido.toLowerCase()}_${Date.now()}@teste.com`,
    senha: 'SenhaSegura123',
    dia: '10',
    mes: 'May',
    ano: '1995',
    nome: 'Juliana',
    sobrenome: apelido,
    endereco: 'Rua das Automações, 100',
    pais: 'United States',
    estado: 'California',
    cidade: 'Los Angeles',
    zipcode: '90001',
    celular: '11999999999',
    ...overrides,
  };
}

/** Dados fictícios de cartão aceitos pelo Automation Exercise. */
export function criarCartao(nomeTitular) {
  return {
    nome: nomeTitular,
    numero: '4111111111111111',
    cvc: '311',
    mes: '12',
    ano: '2028',
  };
}
