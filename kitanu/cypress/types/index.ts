/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    mock(): void;
    // assert
    assertText(value: string | RegExp): Chainable<Element>;
    assertInput(value: string | RegExp): Chainable<Element>;
    assertButton(value: string | RegExp): Chainable<Element>;
    // update
    updateInput(value: string | RegExp, str: string): Chainable<Element>;
  }
}
