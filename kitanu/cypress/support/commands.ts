// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

// import endpoints from '@mock/endpoints';
// Cypress.Commands.add('mock', () => {
//   cy.server();
//   const allEndpoints = Object.keys(endpoints);
//   allEndpoints.forEach(endpoint => {
//     const fileName = endpoint.replace(/\//g, '-') + '.ts';
//     const res = require(`@mock/fixtures/${fileName}`);
//     cy.route('POST', `/api/${endpoint}`, res.default());
//   });
// });
