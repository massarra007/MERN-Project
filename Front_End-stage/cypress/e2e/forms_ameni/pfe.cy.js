/* eslint-disable no-undef */
describe("crud pfe", () => {
    before(() => {

        cy.loginasetudiant().then((resp) => {

        })
      })
    it.only("should add a pfe ", () => {
        cy.viewport(1500, 800)

        cy.visit("/espace-etudiant")
        cy.getByData("stage-pfe").click()
        cy.location("pathname").should("eq", "/inserer-stage-pfe")

        cy.getByData("sujet").should("exist")
        cy.getByData("description").should("exist")
        cy.getByData("societe").should("exist")
        cy.getByData("duree").should("exist")
        cy.getByData("technologies").should("exist")
        cy.getByData("dateDébutStage").should("exist")
        cy.getByData("dateFinStage").should("exist")
        cy.getByData("statutStage").should("exist")
        cy.getByData("pays").should("exist")

        cy.getByData("ajouter").should("exist")

        cy.getByData("sujet").type("sujet1")
        cy.getByData("description").type("sujet stage pfeee 2 ")
        cy.getByData("duree").type("2")
        cy.getByData("technologies").type("symphony")
        cy.getByData("dateDébutStage").type("2023-02-25")
        cy.getByData("statutStage").select(1)
        cy.getByData("dateFinStage").type("2023-04-25")
        cy.getByData("pays").type("tunisie")

        cy.getByData("ajouter").click()
        cy.location("pathname").should("eq", "/inserer-stage-pfe")

        cy.getByData("societe").type("microsoft")
        cy.getByData("ajouter").click()
        cy.visit("/mes-stage-pfe")

    })
    it("should get all the list of pfe as admin ", () => {
        cy.viewport(1500, 800)

        cy.loginasadmin()
        cy.visit("/administratif")
        cy.location("pathname").should("eq", "/administratif")
        cy.getByData("readall-pfe").click()
        cy.location("pathname").should("eq", "/readall-pfe")


    })

    it("should get all the list of pfe as enseignant", () => {
        cy.viewport(1500, 800)

        cy.loginasenseignant()
        cy.visit("/enseignant")
        cy.location("pathname").should("eq", "/enseignant")
        cy.getByData("liste-mes-pfe").click()
        cy.location("pathname").should("eq", "/liste-mes-pfe")


    })
    it("should select a pfe as enseignant", () => {
        cy.viewport(1500, 800)

        cy.loginasenseignant()
        cy.visit("/enseignant")
        cy.location("pathname").should("eq", "/enseignant")
        cy.getByData("liste-pfe").click()
        cy.location("pathname").should("eq", "/liste-pfe")
        cy.get('[data-rowindex="0"]     ') 
        .find('.MuiCheckbox-root')
        .click();
        cy.get('button[data-test="encadrer"]').first().click()

        cy.get('button[data-test="confirm-encadrer"]').first().click()
        cy.location("pathname").should("eq", "/liste-mes-pfe")


    })

})