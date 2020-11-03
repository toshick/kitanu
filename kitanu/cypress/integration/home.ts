/// <reference types="cypress" />

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('render', () => {
    cy.get('.app')
      .assertText(/キータヌは世話焼きたぬき/)
      .assertText('最近のアルバム');
  });
});
