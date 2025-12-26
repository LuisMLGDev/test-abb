// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
    // Hack para DevOps: Ocultar el banner maldito que rompe los tests en CI
    // Inyectamos un estilo para ocultar la imagen del banner forzosamente
    cy.document().then((doc) => {
        const style = doc.createElement('style');
        style.innerHTML = 'img[alt="banner"] { display: none !important; }';
        doc.head.appendChild(style);
    });
});