/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page performance", () => {
    const cacheControlMs = 3584 

    before(() => {
        cy.request({url: `${Cypress.config().baseUrl}`, followRedirect: true, failOnStatusCode: false})
            .its("headers")
            .as("requestHeaders")
    })

    it(`control header should be set to ${cacheControlMs} ms`, () => {
        cy.get("@requestHeaders")
            .its("cache-control")
            .should("include", `max-age=${cacheControlMs}`)
    })
})
