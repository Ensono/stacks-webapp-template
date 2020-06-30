/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page security", () => {
    const protocol = "http://"
    const defaultUrl = Cypress.config().baseUrl || ""
    const host = defaultUrl?.startsWith("http:\/\//") ? defaultUrl.substring(0, 7) : defaultUrl.substring(0, 8)
    const maxAge = "15552000"

    beforeEach(() => {
        cy.request({url: `${Cypress.config().baseUrl}`, failOnStatusCode: true, followRedirect: false}).as("request")
    })

    it.skip("response status code should be 301 (permanent redirect)", () => {
        cy.request({url: `${protocol}${host}`, failOnStatusCode: true, followRedirect: false}).as("request")
        cy.get("@request")
        .its("status")
        .should("eq", "301")
    })

    it.skip("response should redirect to secure URL", () => {
        cy.get("@request")
        .its("headers")
        .its("location")
        .should("eq", `https://${host}/`)
    })

    it("Strict-Transport-Security header should be set", () => {
        cy.get("@request")
        .its("headers")
        .its("strict-transport-security")
        .should("eq", `max-age=${maxAge}; includeSubDomains`)
    })

    it("X-Content-Type-Options header should be set to nosniff", () => {
        cy.get("@request")
        .its("headers")
        .its("x-content-type-options")
        .should("eq", "nosniff")
    })

    it("X-XSS-Protection header should be set", () => {
        cy.get("@request")
        .its("headers")
        .its("x-xss-protection")
        .should("eq", "1; mode=block")
    })

    it("x-frame-options header should be set to SAMEORIGIN", () => {
        cy.get("@request")
        .its("headers")
        .its("x-frame-options")
        .should("eq", "SAMEORIGIN")
    })

    it("content-security-policy header should be set", () => {
        cy.get("@request")
        .its("headers")
        .its("content-security-policy")
        .should("exist")
    })

    it("content-security-policy header should be set", () => {
        cy.get("@request")
        .its("headers")
        .its("content-security-policy")
        .should("exist")
    })
})
