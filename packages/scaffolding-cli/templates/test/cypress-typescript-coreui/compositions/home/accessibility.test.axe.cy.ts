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
describe("Page accessibility", () => {
    beforeEach(() => {
        cy.visit("")

        cy.injectAxe() // Inject the aXe plugin to the page
    })

    it("conforms to wcag21aa accessibility guidelines", () => {
        cy.configureAxe({
            rules: ["wcag21aa"],
        })

        cy.checkA11y()
    })

    it("mobile viewport meta tag should exist", () => {
        cy.get("meta[name='viewport']")
            .should("have.attr", "content")
            .and("contain", "width=device-width")
            .and("contain", "initial-scale=1")
    })
})
