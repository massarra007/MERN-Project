/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import moment from "moment";


describe("stageEte", () => {
  before(() => {
    cy.loginasetudiant().then((resp) => {
 

    })
  })
    let savedStageEte = {}
    
     it("should add a stage ete", () => {
      const data = {
        sujet: "sujet 35",
        description:"c'est un sujet num 2",
        societe:"talan",
        duree:"2",
        technologies:"laravel",
        dateDébutStage:"2023-02-20",
        dateFinStage:"2023-04-20",
        statutStage:"validé",
    

      }
      cy.request({
        method: "POST",
        url: Cypress.env("urlBackend") + "/stage/create",
        body: data,
      }).then((response) => {
        expect(response.status).to.eq(200)
        //     // eslint-disable-next-line no-unused-expressions
        expect(response.body.sujet).to.eq(data.sujet)
        expect(response.body.description).to.eq(data.description)
        expect(response.body.societe).to.eq(data.societe)
        expect(response.body.duree).to.eq(data.duree)
        expect(response.body.technologies).to.eq(data.technologies)
       // expect(moment(response.body.dateDébutStage).format("YYYY-MM-DD")).to.eq(moment(data.dateDébutStage).format("YYYY-MM-DD"))
        //expect(moment(response.body.dateFinStage).format("YYYY-MM-DD")).to.eq(moment(data.dateFinStage).format("YYYY-MM-DD"))
        expect(response.body.statutStage).to.eq(data.statutStage)
        // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedStageEte = response.body 

        //     // Check the response
      })
    })
  /*
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
    }) */
  })
  