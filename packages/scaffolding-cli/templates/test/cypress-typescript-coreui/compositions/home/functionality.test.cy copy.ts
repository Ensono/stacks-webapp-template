/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page", () => {
    const csrUrl = "https://csr-app.nonprod.amidostacks.com"

    beforeEach(() => {
        cy.request({url: csrUrl, failOnStatusCode: true}).as("request")
    })

    it("status code should be 200", () => {
        cy.get("@request")
            .its("status")
            .should("equal", 200)
    })

    it.skip("should have header and footer tags", () => {
        cy.get("@request")
            .its("body")
            .should("include", "header")
            .and("include", "footer")
    })

    it("title should exist", () => {
        cy.get("@request")
            .its("body")
            .should("include", "title")
    })

    it("manifest file should exist", () => {
        cy.get("@request")
        .its("headers")
        .its("content-type")
        .should("include", "application/json")
    })
})
