//@ts-check

describe("Sample Cypress setup", () => {
    it("should go to Google directly", () => {
        cy.visit("https://google.com")
    })
})

export default {}
