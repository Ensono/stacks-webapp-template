/*
Example using Lighthouse to showcase how to use Cypress to assert on the performance of a URL

This can be used on a locally running instances BEFORE deployment.

For more: https://www.npmjs.com/package/cypress-axe
*/

/// <reference types="Cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

describe("Profile performance of", () => {
    // Set baseline. If this isn't set, then it will default to 100% for all aspects
    const thresholds = {
        performance: 80,
        accessibility: 80,
        "best-practices": 80,
        seo: 80,
        pwa: 0,
    }

    // Delcare the page urls under test
    const pageUrls: string[] = [Cypress.config("baseUrl")?.valueOf() || "", "https://csr2-app.nonprod.amidostacks.com/"]

    // Parameretised tests for testing a number of pages all meet the same threshold
    pageUrls.forEach((pageUrl: string) => {
        it(`production ${pageUrl} passes the audits`, () => {
            cy.visit(pageUrl)
            cy.lighthouse(thresholds)
        })
    })
})

export default {}
