/// <reference types="Cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("The Got Page", function () {
  it("successfully loads", function () {
    cy.visit("http://localhost:8081/got");
    //get Houeses
    cy.get(".row > :nth-child(1) > .v-btn").click();
    cy.get(".sucsses").click().wait(1500);
    cy.get(".v-card__actions > .v-btn--text").click();
    //get Characters
    cy.get(":nth-child(2) > .v-btn").click();
    cy.get(
      ".v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .sucsses"
    )
      .click()
      .wait(1500);
    cy.get(
      ".v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .v-btn--text"
    ).click();
    // get Book
    cy.get(".row > :nth-child(3) > .v-btn").click();
    cy.get(
      ".v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .sucsses"
    )
      .click()
      .wait(1500);
    cy.get(
      ".v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .v-btn--text"
    ).click();
  });
});
