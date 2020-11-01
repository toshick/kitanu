/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    mock(): void;
    // dataCy(value: string): Chainable<Element>;
  }
}
