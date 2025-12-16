/// <reference types="cypress" />
import { SELECTORS } from "./selectors";

Cypress.Commands.add("getIngredientCard", (ingredientName: string) => {
    return cy.contains(SELECTORS.ingredientCard, ingredientName);
});

Cypress.Commands.add("clickIngredientCard", (ingredientName: string) => {
    cy.getIngredientCard(ingredientName).click();
});

Cypress.Commands.add("dragIngredientToConstructor", (ingredientName: string) => {
    const dataTransfer = new DataTransfer();

    cy.getIngredientCard(ingredientName).trigger("dragstart", { dataTransfer });
    cy.get(SELECTORS.constructorContainer).trigger("drop", { dataTransfer });
    cy.get(SELECTORS.constructorContainer).trigger("dragend");
});

Cypress.Commands.add("getModal", () => {
    cy.get(SELECTORS.modalContainer).as("modal");
    return cy.get("@modal");
});

Cypress.Commands.add("closeModalByOverlay", () => {
    cy.get(SELECTORS.modalOverlay).click({ force: true });
});

Cypress.Commands.add("closeModalByButton", () => {
    cy.get(SELECTORS.modalContainer).within(() => {
        cy.get(SELECTORS.modalCloseIcon).last().click();
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
            getIngredientCard(ingredientName: string): Chainable<JQuery<HTMLElement>>;
            clickIngredientCard(ingredientName: string): Chainable<void>;

            dragIngredientToConstructor(ingredientName: string): Chainable<void>;
            getModal(): Chainable<JQuery<HTMLElement>>;
            closeModalByOverlay(): Chainable<void>;
            closeModalByButton(): Chainable<void>;
        }
    }
}
