/// <reference types="cypress" />

describe('Signup', () => {
  describe('render', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup');
    });

    it('render', () => {
      cy.get('.app')
        .assertInput('オナマエ')
        .assertInput('メール')
        .assertText(/規約に同意/)
        .assertButton(/登録ヌ/);
    });
  });
  describe('validation', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup');
    });
    it('submit', () => {
      cy.get('.app').updateInput('オナマエ', 'せかいのとしっく');
    });
  });
});
