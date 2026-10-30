const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    watchForFileChanges: false,
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Relatório de Testes - PGATS Automation Exercise',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    autoOpen: true, // Abre o relatório HTML ao término da execução
  },
});
