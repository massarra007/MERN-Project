/* eslint-disable no-undef */
describe("statistics as admin", () => {

    before(() => {
      cy.loginasadmin().then((resp) => {
       
      })
    })
    it("should read statistics as admin ", () => {
        cy.viewport(1500, 800)
        cy.visit("/administratif")
        cy.getByData("readall-statistics").click()
        cy.location("pathname").should("eq", "/statistics-pfe")


    })








})