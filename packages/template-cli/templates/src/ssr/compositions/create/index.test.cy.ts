/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 **/

describe("/create", () => {
    beforeEach(() => {
        cy.fixture("add-menu-response.json").as("menuResponse")
        cy.server()
        cy.route({
            method: "POST", // Route all GET requests
            url: "/menu", // that have a URL that matches '/menu'
            response: "@menuResponse",
        }).as("addMenuItem")
        cy.visit("")

    })

    it("can navigate to create menu page when clicking on the button on header", () => {
        cy.get("[data-testid=create_button]").then($button => {
            if ($button.is(":visible")) {
                assert.isOk("create button exists and active")
            } else {
                assert.isNotOk("create button does not exist")
            }
        })

        cy.get("[data-testid=create_button]").click()
        cy.location().should(loc => {
            expect(loc.pathname).to.eq("/create")
        })
    })

    it("can add a new menu", () => {
        cy.get("[data-testid=create_button]").click()
        cy.location().should(loc => {
            expect(loc.pathname).to.eq("/create")
        })
        cy.get("[data-testid=save_btn]").should("be.disabled")
        cy.get("#name").type("cy_test_name")
        cy.get("#description").type("cy_test_description")
        cy.get("[data-testid=save_btn]").should("be.enabled").click()
        cy.wait("@addMenuItem").then(xhr => {
            assert.isNotNull(xhr.response, "api called")
            cy.get("#snackbar-message-id").should("be.visible")
        })
    })
})
