/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

// const csrUrl = "https://csr-app.nonprod.amidostacks.com/web/stacks"
const csrUrl = "https://app.nonprod.amidostacks.com/web/stacks/"
const cacheControlMs = 3584 

describe("Response", () => {
    before(() => {
        cy.request({url: csrUrl, followRedirect: true, failOnStatusCode: false})
            .its("headers")
            .as("requestHeaders")
    })

    it(`control header should be set to ${cacheControlMs} ms`, () => {
        cy.get("@requestHeaders")
            .its("cache-control")
            .should("include", `max-age=${cacheControlMs}`)
    })
})

