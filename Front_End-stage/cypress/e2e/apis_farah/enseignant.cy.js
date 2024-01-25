
import bcrypt from 'bcryptjs';

describe("crud enseignant", () => {
  before(() => {
    cy.loginasadmin().then((resp) => {
    })
  })

    let savedEnseignant = {}
    it("read all enseignants", () => {
      cy.request("GET", Cypress.env("urlBackend") + "/users/getAllEnseignant").then((response) => {
        console.log(response," get all enseignant");
        expect(response.status).to.eq(200)
      })
    })
  

    /*  it(" add an enseignant", () => {
      const data = {
        firstname: "testenseignant",
        lastname:"testenseignant",
        phone:"60606060",
        email:"testenseignant@gmail.com",
        login:"testenseignant",
        password:bcrypt.hashSync("123"),
        status:"enseignant",
        role: "enseignant",

      }
      cy.request({
        method: "POST",
        url: Cypress.env("urlBackend") + "/users/create",
        body: data,
      }).then((response) => {
        expect(response.status).to.eq(200)

           //     // eslint-disable-next-line no-unused-expressions
         expect(response.body.firstname).to.eq(data.firstname)
        expect(response.body.lastname).to.eq(data.lastname)
        expect(response.body.phone).to.eq(data.phone)
        expect(response.body.email).to.eq(data.email)
        expect(response.body.login).to.eq(data.login)
        expect(response.body.status).to.eq(data.status)
        expect(response.body.role).to.eq(data.role)
         // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedEnseignant = response.body 


        //     // Check the response
      })
    })

*/

      it(" add a responsable", () => {
        const data = {
          firstname: "testresponsable",
          lastname:"testresponsable",
          phone:"30303030",
          email:"testresponsable@gmail.com",
          login:"testresponsable",
          password:bcrypt.hashSync("123"),
      
          status:"responsable formation",
     
          role: "enseignant",
  
        }
        cy.request({
          method: "POST",
          url: Cypress.env("urlBackend") + "/users/create",
          body: data,
        }).then((response) => {
          expect(response.status).to.eq(200)

          //     // eslint-disable-next-line no-unused-expressions
          expect(response.body.firstname).to.eq(data.firstname)
          expect(response.body.lastname).to.eq(data.lastname)
          expect(response.body.phone).to.eq(data.phone)
          expect(response.body.email).to.eq(data.email)
          expect(response.body.login).to.eq(data.login)
          expect(response.body.status).to.eq(data.status)
          expect(response.body.role).to.eq(data.role)
           // eslint-disable-next-line no-unused-expressions
          expect(response.body._id).to.exist
          savedEnseignant = response.body 

           //     // Check the response
  
         
        })
      })
  
    it("get the saved enseignant", () => {
      cy.request("GET", Cypress.env("urlBackend") + "/users/getAllEnseignant").then((response) => {
        expect(response.status).to.eq(200)
        const enseignants = response.body
        const enseignant = enseignants.find((e) => e._id == savedEnseignant._id)
        expect(enseignant).to.exist
    })
})




    it(" update an enseignant", () => {
      const dataToUpdate = {
        firstname: "testupdateenseignant",
        lastname:"testupdateenseignant",
        phone:"30303030",
        email:"testupdateenseignant@gmail.com",
        login:"testupdateenseignant",
        password:bcrypt.hashSync("123"),
        status:"enseignant",
        role: "enseignant",
      }
      cy.request({
        method: "PUT",
        url: Cypress.env("urlBackend") + "/users/updatebyid/" + savedEnseignant._id,
        failOnStatusCode: false,
        body: dataToUpdate,
      }).then((response) => {
        console.log(response,"updateEnseignant");
        expect(response.status).to.eq(200)
        expect(response.body.firstname).to.eq(dataToUpdate.firstname)
        expect(response.body.lastname).to.eq(dataToUpdate.lastname)
        expect(response.body.phone).to.eq(dataToUpdate.phone)
        expect(response.body.email).to.eq(dataToUpdate.email)
        expect(response.body.login).to.eq(dataToUpdate.login)
        expect(response.body.status).to.eq(dataToUpdate.status)
        expect(response.body.role).to.eq(dataToUpdate.role)

        // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedEnseignant = response.body 
        console.log(savedEnseignant,"saved enseignant");  
      })
    })
      
  
  
    it(" delete the last modified enseignant ", () => {
      cy.request(
        "DELETE",
        Cypress.env("urlBackend") + "/users/deletebyid/" + savedEnseignant._id
      ).then((response) => {
        expect(response.status).to.eq(200)
        cy.request({
          method: "GET",
          url: Cypress.env("urlBackend") + "//users/getbyid/" + savedEnseignant._id,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
    }) 

  })
  