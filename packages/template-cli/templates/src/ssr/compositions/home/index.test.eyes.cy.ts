/*
Example using Applitools Eyes SDK for Cypress to ensure we can rendering the entire page in
supported browsers.

Please where possible, use this as a final check, prioritising jest-axe tests with the React
components. See axe/accessibilityTestHelper.tsx for more information.

By minimum, we expect to support WCAG 2.1 Level AA ["wcag21aa"]

For more: https://github.com/applitools/eyes.sdk.javascript1/tree/master/packages/eyes-cypress
*/

/// <reference types="cypress" />
/// <reference types="@applitools/eyes-cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

// Import Cypress Applitools commands for visual tests
import "@applitools/eyes-cypress/commands"

describe("Given we open the Yumido webapp", () => {
    beforeEach(() => {
        cy.visit("")
        cy.server()
        cy.eyesOpen({
            browser: {name: "ie11", width: 800, height: 600},
        })
    })

    afterEach(() => {
        cy.eyesClose()
    })

    it("renders the page and stubbed menu component in supported browsers", () => {
        let menuName: String = "Breakfast Menu"

        // Check the page renders on navigation
        cy.eyesCheckWindow({tag: "compositions/home"})

        cy.fixture("get-menu-response.json").as("menuResponse")
        cy.route({
            method: "GET", // Route all GET requests
            url: "/menu", // that have a URL that matches '/menu'
            response: "@menuResponse", // and force the response to be: []
        }).as("getStubbedMenu")

        cy.eyesCheckWindow({tag: "compositions/home > GET menu"})

        cy.get("[data-testid=results]").should("contain", menuName)
    })
})

export default {}
