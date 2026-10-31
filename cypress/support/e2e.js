import 'cypress-mochawesome-reporter/register';

// Ignores exceptions from the site's third-party scripts (ads, analytics)
Cypress.on('uncaught:exception', () => false);
