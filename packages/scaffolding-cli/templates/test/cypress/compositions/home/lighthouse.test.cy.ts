/*

*/

/// <reference types="Cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

describe("Performance of", () => {
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
        cy.lighthouse({
            performance: 80,
            accessibility: 100,
            "best-practices": 85,
            seo: 85,
            pwa: 10,
        })
    })
    it("CSR production passes the audits", () => {
        cy.visit("https://csr2-app.nonprod.amidostacks.com/")
        cy.wait("@getStubbedMenu")
        cy.lighthouse({
            performance: 80,
            accessibility: 100,
            "best-practices": 85,
            seo: 85,
            pwa: 0,
        })
    })
    it("SSR production perform better than CSR", () => {
        cy.visit("https://csr2-app.nonprod.amidostacks.com/")
        cy.wait("@getStubbedMenu")
        cy.lighthouse({
            performance: 80,
            accessibility: 100,
            "best-practices": 85,
            seo: 85,
            pwa: 0,
        }).then()
    })
})

export default {}
