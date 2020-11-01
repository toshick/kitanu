Cypress.Commands.add('assertText', { prevSubject: true }, (subject, text) => {
  cy.get(subject).findByText(text).should('exist');
  cy.get(subject).then((subj) => {
    return subj;
  });
});
