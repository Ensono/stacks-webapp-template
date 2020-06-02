/*
Example using Lighthouse to showcase how to use Cypress to assert on the performance of a URL

This can be used on a locally running instances BEFORE deployment.

For more: https://www.npmjs.com/package/cypress-axe
*/

/// <reference types="Cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

describe("Performance of", () => {
    // Set baseline. If this isn't set, then it will default to 100% for all aspects
    const thresholds = {
        performance: 80,
        accessibility: 100,
        "best-practices": 85,
        seo: 85,
        pwa: 0,
    } 

    beforeEach(() => {
        cy.fixture("get-menu-response.json").as("menuResponse")
        cy.server()
        cy.route({
            method: "GET", // Route all GET requests
            url: new RegExp(".*/menu.*"), // that have a URL that matches '/menu'
            response: "@menuResponse", // and force the response to be: []
        }).as("getStubbedMenu")
    })
    it("SSR production passes the audits", () => {
        cy.visit("")
        cy.wait("@getStubbedMenu")
        cy.lighthouse(thresholds)
    })
    it("CSR production passes the audits", () => {
        cy.visit("https://csr2-app.nonprod.amidostacks.com/")
        cy.wait("@getStubbedMenu")
        cy.lighthouse(thresholds)
    })
})

export default {}
