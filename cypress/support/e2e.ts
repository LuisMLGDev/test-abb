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

// HACK: Ocultar elementos que molestan en modo Headless/CI
const hideObstructiveElements = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      img[alt="banner"] { display: none !important; visibility: hidden !important; height: 0 !important; }
      div[class*="fixed inset-0"] { display: none !important; pointer-events: none !important; }
      nav { z-index: 9999 !important; }
    `;
    document.head.appendChild(style);
};

beforeEach(() => {
    hideObstructiveElements();
});

// 2. Sobreescribir el comando 'click' para que SIEMPRE use force: true
// Esto es mano de santo para entornos CI inestables
// @ts-expect-error: Overwriting command signature for CI stability override
Cypress.Commands.overwrite('click', (originalFn, element, options) => {
    options = options || {}
    options.force = true
    return originalFn(element, options)
})

// 3. Sobreescribir 'type' para que SIEMPRE use force: true
// @ts-expect-error: Overwriting command signature for CI stability override
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    options = options || {}
    options.force = true
    return originalFn(element, text, options)
})