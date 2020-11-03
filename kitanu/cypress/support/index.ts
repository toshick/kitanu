// ***********************************************************
// This example support/index.js is processed and
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
import '@testing-library/cypress/add-commands';
import './commands';

/**
 * assertions
 */
Cypress.Commands.add('assertText', { prevSubject: true }, (subject, text) => {
  cy.get(subject).findByText(text).should('exist');
  cy.get(subject).then((subj) => {
    return subj;
  });
});

Cypress.Commands.add(
  'assertInput',
  { prevSubject: true },
  (subject, placeholder) => {
    cy.get(subject).find(`input[placeholder=${placeholder}]`).should('exist');
    cy.get(subject).then((subj) => {
      return subj;
    });
  },
);

Cypress.Commands.add(
  'assertButton',
  { prevSubject: true },
  (subject, label) => {
    cy.get(subject).find('button').findByText(label).should('exist');
    cy.get(subject).then((subj) => {
      return subj;
    });
  },
);

/**
 * update
 */
Cypress.Commands.add(
  'updateInput',
  { prevSubject: true },
  (subject, placeholder, str) => {
    cy.get(subject).find(`input[placeholder=${placeholder}]`).type(str);
    cy.get(subject).then((subj) => {
      return subj;
    });
  },
);
