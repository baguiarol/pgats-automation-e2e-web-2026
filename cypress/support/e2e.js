import 'cypress-mochawesome-reporter/register';

// Ignora exceções de scripts de terceiros do site (anúncios, analytics)
Cypress.on('uncaught:exception', () => false);
