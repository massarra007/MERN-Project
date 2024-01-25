/* eslint-disable no-undef */
describe("academic year", () => {
    before(() => {
      cy.loginasadmin().then((resp) => {
   
  
      })
    })
  
      it("should generate an academic year", () => {
        cy.viewport(1500, 800)
        cy.visit("/administratif")
        cy.getByData("anneeuniver").click() 
        cy.getByData("anneeUvivgenerate").should("exist")
        cy.getByData("ajouteranneeUniv").should("exist")

        cy.getByData("anneeUvivgenerate").select(2)

        cy.getByData("ajouteranneeUniv").click();

      })

      it.only("should Switch between academic years ", () => {
        cy.viewport(1500, 800)
        cy.visit("/administratif")
        cy.getByData("readall-evenement").click() 
        cy.location("pathname").should("eq", "/readall-evenement")

        cy.getByData("anneeUvivgenerate").should("exist")
        cy.getByData("anneeUvivgenerate").select(1)


      })
    })