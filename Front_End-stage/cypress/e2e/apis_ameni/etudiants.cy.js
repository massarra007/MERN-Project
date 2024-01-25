/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import bcrypt from 'bcryptjs';
import moment from "moment";

describe("etudiants", () => {
  before(() => {
    cy.loginasadmin().then((resp) => {
 

    })
  })

    let savedEtudiant = {}
    it("should get all etudiants", () => {
      cy.request("GET", Cypress.env("urlBackend") + "/users/getAllEtudiant").then((response) => {
        console.log(response,"this is our response");
        expect(response.status).to.eq(200)
        // Check the response type and length
        // expect(response.body.model).to.have.lengthOf(0)
      })
    })
  
     it("should add an etudiant", () => {
      const data = {
        firstname: "salma",
        lastname:"hosni",
        phone:"12345632",
        email:"salmahosni@gmail.com",
        login:"salma",
        password:bcrypt.hashSync("123"),
        classe:"2eme",
        Birth_date:"1999-08-24",
        niveau:"master",
        etat:"actuel",
        role: "etudiant",

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
        //expect(response.body.password).to.eq(data.password)
        expect(response.body.classe).to.eq(data.classe)
       // expect(moment(response.body.Birth_date).format("YYYY-MM-DD")).to.eq(data.Birth_date)
        expect(response.body.niveau).to.eq(data.niveau)
        expect(response.body.etat).to.eq(data.etat)
        expect(response.body.role).to.eq(data.role)


        // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedEtudiant = response.body 

        //     // Check the response
      })
    })
  
    it("should find the saved etudiant in etudiant list", () => {
      cy.request("GET", Cypress.env("urlBackend") + "/users/getAllEtudiant").then((response) => {
        expect(response.status).to.eq(200)
        // Check the response type and length
        const etudiants = response.body
        const etudiant = etudiants.find((e) => e._id == savedEtudiant._id)
        expect(etudiant).to.exist
      })
    })
    console.log(    savedEtudiant._id
        );
    it("should update a task", () => {
      const dataToUpdate = {
        firstname: "salmaupdated",
        lastname:"hosni",
        phone:"12345632",
        email:"salmahosni@gmail.com",
        login:"salma",
        password:bcrypt.hashSync("123"),
        classe:"2eme",
        Birth_date:"1999-08-24",
        niveau:"master",
        etat:"actuel",
        role: "etudiant",
      }
      cy.request({
        method: "PUT",
        url: Cypress.env("urlBackend") + "/users/updatebyid/" + savedEtudiant._id,
        failOnStatusCode: false,
        body: dataToUpdate,
      }).then((response) => {
        console.log(response,"updatedresp");
        expect(response.status).to.eq(200)
        expect(response.body.firstname).to.eq(dataToUpdate.firstname)
        expect(response.body.lastname).to.eq(dataToUpdate.lastname)
        expect(response.body.phone).to.eq(dataToUpdate.phone)
        expect(response.body.email).to.eq(dataToUpdate.email)
        expect(response.body.login).to.eq(dataToUpdate.login)
        //expect(response.body.password).to.eq(dataToUpdate.password)
        expect(response.body.classe).to.eq(dataToUpdate.classe)
       // expect(moment(response.body.Birth_date).format("YYYY-MM-DD")).to.eq(dataToUpdate.Birth_date)
        expect(response.body.niveau).to.eq(dataToUpdate.niveau)
        expect(response.body.etat).to.eq(dataToUpdate.etat)
        expect(response.body.role).to.eq(dataToUpdate.role)
 

        // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedEtudiant = response.body 
        console.log(savedEtudiant,"saved etudiant");  
  
        //     // Check the response
      })
    })
      
  
  
    it("should delete the updated etudiant ", () => {
      cy.request(
        "DELETE",
        Cypress.env("urlBackend") + "/users/deletebyid/" + savedEtudiant._id
      ).then((response) => {
        expect(response.status).to.eq(200)
        cy.request({
          method: "GET",
          url: Cypress.env("urlBackend") + "//users/getbyid/" + savedEtudiant._id,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
    }) 
  })
  