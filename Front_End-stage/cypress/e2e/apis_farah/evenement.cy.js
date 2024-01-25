/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import bcrypt from 'bcryptjs';
import moment from "moment";

describe("crud evenement", () => {
  before(() => {
    cy.loginasadmin().then((resp) => {
 

    })
  })

    let savedEvenement = {}
    it("should get all evenement", () => {
      cy.request("GET", Cypress.env("urlBackend") + "/users/getAll").then((response) => {
        console.log(response,"this is our response");
        expect(response.status).to.eq(200)
        
      })
    })
  
     it("should add an evenement", () => {
      const data = {
        eventName: "testevent",
        eventDate:"1999-08-24",
        eventType:"Formation",
        description:"testevent",
        location: "testevent",

      }
      cy.request({
        method: "POST",
        url: Cypress.env("urlBackend") + "/evenements/create",
        body: data,
      }).then((response) => {
        expect(response.status).to.eq(200)
        //     // eslint-disable-next-line no-unused-expressions
         expect(response.body.eventName).to.eq(data.eventName)
        expect(response.body.eventType).to.eq(data.eventType)
        expect(response.body.description).to.eq(data.description)
        expect(response.body.location).to.eq(data.location)
        expect(moment(response.body.eventDate).format("YYYY-MM-DD")).to.eq(data.eventDate)
      

        // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedEvenement = response.body 

        //     // Check the response
      })
    })
  
    it(" find the saved evenement ", () => {
      cy.request("GET", Cypress.env("urlBackend") + "/evenements/getAll").then((response) => {
        expect(response.status).to.eq(200)
        const evenements = response.body
        const evenement = evenements.find((e) => e._id == savedEvenement._id)
        expect(evenement).to.exist

      })
    })
    console.log(    savedEvenement._id
        );
        /*
    it("should update an evenement", () => {
      const dataToUpdate = {
        eventName: "eventtest",
        eventDate:"1999-08-24",
        eventType:"Formation",
        description:"eventtest",
        location: "eventtest",
      }
      cy.request({
        method: "PUT",
        url: Cypress.env("urlBackend") + "/evenements/updatebyid/" + savedEvenement._id,
        failOnStatusCode: false,
        body: dataToUpdate,
      }).then((response) => {
        console.log(response,"updateEvenement");
        expect(response.status).to.eq(200)
        expect(response.body.eventName).to.eq(dataToUpdate.eventName)
        expect(response.body.eventDate).to.eq(dataToUpdate.eventDate)
        expect(response.body.eventType).to.eq(dataToUpdate.eventType)
        expect(response.body.description).to.eq(dataToUpdate.description)
        expect(response.body.location).to.eq(dataToUpdate.location)
    
        // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedEvenement = response.body 
        console.log(savedEvenement,"saved event");  
  
        //     // Check the response
      })
    })
      
  */
  
    it(" delete the updated evenement ", () => {
      cy.request(
        "DELETE",
        Cypress.env("urlBackend") + "/evenements/deletebyid/" + savedEvenement._id
      ).then((response) => {
        expect(response.status).to.eq(200)
        cy.request({
          method: "GET",
          url: Cypress.env("urlBackend") + "//getbyid/" + savedEvenement._id,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
    }) 
     
  })
 
  