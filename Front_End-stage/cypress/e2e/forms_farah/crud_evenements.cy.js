/* eslint-disable no-undef */
describe("crud evenment", () => {
    let adminToken = ""
    let adminrole= ""
    before(() => {
      cy.loginasadmin().then((resp) => {
        adminToken = window.localStorage.getItem("token");
        adminrole=window.localStorage.getItem("role")
      })
    })


    it(" add an evenment ", () => {
        cy.viewport(1500, 800)

        cy.visit("/administratif")
        cy.getByData("readall-evenement").click()
        cy.getByData("add-evenement").click()
        cy.getByData("eventName").should("exist")
        cy.getByData("eventType").should("exist")
        cy.getByData("eventDate").should("exist")
        cy.getByData("description").should("exist")
        cy.getByData("location").should("exist")
        cy.getByData("ajouter").should("exist")

        cy.getByData("eventName").type("formation")
        cy.getByData("eventType").type("Formation")
        cy.getByData("eventDate").type("2023-08-25")
        cy.getByData("description").type("farahghri@gmail.com")
        cy.getByData("location").type("farah")
        cy.getByData("ajouter").click()

        cy.visit("/readall-evenement")

    })

    



})