/* eslint-disable no-undef */
describe("crud etudiant", () => {
    let adminToken = ""
    let adminrole= ""
    before(() => {
      cy.loginasadmin().then((resp) => {
        adminToken = window.localStorage.getItem("token");
        adminrole=window.localStorage.getItem("role")
      })
    })
    it("should add an etudiant ", () => {
        cy.viewport(1500, 800)

        cy.visit("/administratif")
        cy.getByData("gestion-etudiant").click()
        cy.getByData("add-etudiant").click()
        cy.getByData("firstname").should("exist")
        cy.getByData("lastname").should("exist")
        cy.getByData("phone").should("exist")
        cy.getByData("email").should("exist")
        cy.getByData("login").should("exist")
        cy.getByData("password").should("exist")
        cy.getByData("classe").should("exist")
        cy.getByData("Birth_date").should("exist")
        cy.getByData("niveau").should("exist")
        cy.getByData("etat").should("exist")
        cy.getByData("ajouter").should("exist")

        cy.getByData("firstname").type("ameni")
        cy.getByData("phone").type("12121212")
        cy.getByData("email").type("amenimagh559@gmail.com")
        cy.getByData("login").type("amenii")
        cy.getByData("password").type("123")
        cy.getByData("classe").type("1ere")
        cy.getByData("Birth_date").type("1999-08-25")
        cy.getByData("niveau").select(2)
        cy.getByData("etat").select(1)

        cy.getByData("ajouter").click().then((res)=>{console.log(res, "resppp");})
      

        cy.location("pathname").should("eq", "/create-etudiant")

        cy.getByData("lastname").type("maghraaoui")
        cy.getByData("ajouter").click().then((res)=>{console.log(res, "resppp");})
        cy.visit("/readall-etudiant")
        cy.location("pathname").should("eq", "/readall-etudiant")

    })
    it.only("should update an etudiant ", () => {
      cy.viewport(1500, 800)

      cy.visit("/administratif")
      cy.getByData("gestion-etudiant").click()
      cy.get('[data-rowindex="2"]     ') //change the id 
      .find('.MuiCheckbox-root')
      .click();
      cy.get('a[data-test="modify-etudiant"]').first().click().then(() => {
        cy.url().should('include', '/update-etudiant/643c17c52d030ac6e59e352a')// remplace with the id
      })

      cy.getByData("firstname").should("exist")
        cy.getByData("lastname").should("exist")
        cy.getByData("phone").should("exist")
        cy.getByData("email").should("exist")
        cy.getByData("login").should("exist")
        cy.getByData("classe").should("exist")
        cy.getByData("Birth_date").should("exist")
        cy.getByData("niveau").should("exist")
        cy.getByData("etat").should("exist")
        cy.getByData("modifier").should("exist")

        cy.getByData("firstname").type("newnew")
        cy.getByData("modifier").click().then((res)=>{console.log(res, "resppp");})
      



        cy.location("pathname").should("eq", "/readall-etudiant")
      
    })
    it("should delete an etudiant ", () => {
      cy.viewport(1500, 800)

      cy.visit("/administratif")
      cy.getByData("gestion-etudiant").click()
      cy.get('[data-rowindex="1"]     ') //change the id 
      .find('.MuiCheckbox-root')
      .click();
      cy.get('button[data-test="delete-etudiant"]').first().click()
      cy.get('button[data-test="confirm-etudiant"]').first().click()

     


        cy.location("pathname").should("eq", "/readall-etudiant")
      
    })

    it("should get all  etudiant ", () => {
      cy.viewport(1500, 800)

      cy.visit("/administratif")
      cy.getByData("gestion-etudiant").click()
    
        cy.location("pathname").should("eq", "/readall-etudiant")
      
    })

})