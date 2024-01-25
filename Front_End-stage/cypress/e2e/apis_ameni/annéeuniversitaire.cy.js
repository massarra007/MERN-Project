/* eslint-disable no-undef */
describe("cademic year", () => {
    before(() => {
      cy.loginasadmin().then((resp) => {
   
  
      })
    })
    let savedAnneeUniv = {}

      it("should generate an academic year", () => {
        const data = {
            AnneeUniv: "2026-2027",
        
    
          }
          cy.request({
            method: "POST",
            url: Cypress.env("urlBackend") + "/saison/createSaison",
            body: data,
          }).then((response) => {
            expect(response.status).to.eq(200)
            //     // eslint-disable-next-line no-unused-expressions
             expect(response.body.firstname).to.eq(data.firstname)
           
             savedAnneeUniv = response.body 
      })
    
    })

  
    it("should Switch between academic years", () => {
        cy.request("GET", Cypress.env("urlBackend") + "/evenements/getAllEventSaison/"+savedAnneeUniv).then((response) => {
          expect(response.status).to.eq(200)
          // Check the response type and length
         
        })
      })

})