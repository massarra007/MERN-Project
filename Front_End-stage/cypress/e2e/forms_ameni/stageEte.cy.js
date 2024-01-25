/* eslint-disable no-undef */
describe("crud etudiant", () => {
    let etToken = ""
    let etrole= ""
    let id = ""
    before(() => {
      cy.loginasetudiant().then((resp) => {
        console.log(resp.body.model._id,"this iss id");
        etToken = window.localStorage.getItem("token");
        etrole=window.localStorage.getItem("role")
        id=resp.body.model._id
      })
    })
    it("should add an stage ", () => {
        cy.viewport(1500, 800)

        cy.visit("/espace-etudiant")
        cy.getByData("stage-ete").click()
        cy.getByData("sujet").should("exist")
        cy.getByData("description").should("exist")
        cy.getByData("societe").should("exist")
        cy.getByData("duree").should("exist")
        cy.getByData("technologies").should("exist")
        cy.getByData("dateDébutStage").should("exist")
        cy.getByData("dateFinStage").should("exist")
        cy.getByData("statutStage").should("exist")
        cy.getByData("ajouter").should("exist")

        cy.getByData("sujet").type("sujet3")
        cy.getByData("description").type("sujet stage ete ")
        cy.getByData("duree").type("2")
        cy.getByData("technologies").type("symphony")
        cy.getByData("dateDébutStage").type("2023-02-25")
        cy.getByData("statutStage").select(1)
        cy.getByData("dateFinStage").type("2023-04-25")

        cy.getByData("ajouter").click()
        cy.location("pathname").should("eq", "/inserer-stage-ete")

        cy.getByData("societe").type("microsoft")
        cy.getByData("ajouter").click()
        cy.visit("/mes-stage-ete")


    })
})