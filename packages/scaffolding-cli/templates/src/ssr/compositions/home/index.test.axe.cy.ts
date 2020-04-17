/*
Example using Axe with Cypress to ensure we are rendering the entire page and checking
against our configured accessibility rules.

Please where possible, use this as a final check, prioritising jest-axe tests with the React
components. See axe/accessibilityTestHelper.tsx for more information.

By minimum, we expect to support WCAG 2.1 Level AA ["wcag21aa"]

For more: https://www.npmjs.com/package/cypress-axe
*/

/// <reference types="cypress" />
/// <reference types="cypress-axe" />

/**
 * @type {Cypress.PluginConfig}
 */
describe("/ (index)", () => {
    beforeEach(() => {
        cy.fixture("get-menu-response.json").as("menuResponse")
        cy.server()
        cy.route({
            method: "GET", // Route all GET requests
            url: "/menu*", // that have a URL that matches '/menu'
            response: "@menuResponse", // and force the response to be: []
        }).as("getStubbedMenu")

        cy.visit("")

        cy.injectAxe() //Inject the aXe plugin to the page
    })
    it("conforms to wcag21aa", () => {
        cy.configureAxe({
            rules: ["wcag21aa"]
          })

        cy.wait("@getStubbedMenu")
        
        cy.checkA11y()
    })
})

export default {}
