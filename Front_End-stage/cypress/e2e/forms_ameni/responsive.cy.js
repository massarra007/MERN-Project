/* eslint-disable no-undef */
describe("Responsive", () => {
 
    it("should login page be responsive ", () => {
        cy.viewport('iphone-x')
        window.localStorage.removeItem("token")
        cy.visit("/signin")
        cy.getByData("phone").should("exist")
        cy.getByData("password").should("exist")
        cy.getByData("phone").type("23000000")
        cy.getByData("password").type("123")
        cy.getByData("connect").click()
        cy.location("pathname").should("eq", "/administratif")
    })

    
})