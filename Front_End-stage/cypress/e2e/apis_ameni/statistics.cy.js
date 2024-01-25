/* eslint-disable no-undef */
describe("statistics", () => {
    before(() => {
      cy.loginasadmin().then((resp) => {
   
  
      })
    })
  
      it("should get all statistics", () => {
        cy.request("GET", Cypress.env("urlBackend") + "/pfe/getstatpfe").then((response) => {
          console.log(response,"this is our response");
          expect(response.status).to.eq(200)
          // Check the response type and length
          // expect(response.body.model).to.have.lengthOf(0)
        })
      })
    })