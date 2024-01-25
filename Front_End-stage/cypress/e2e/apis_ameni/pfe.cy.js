/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import moment from "moment";


describe("stagePFE", () => {
    let savedStagePfe = {}

    let id_etudiant = ""
    let idenseignant = ""
    let emailEnseignant=""
    let emailEtudiant= ""
    before(() => {
      cy.loginasetudiant().then((resp) => {
    id_etudiant=resp.body.model._id
    emailEtudiant= resp.body.model.email

      })
    })
    before(() => {
        cy.loginasadmin().then((resp) => {
   
  
        })
      })
      before(() => {
        cy.loginasenseignant().then((resp) => {
   idenseignant=resp.body.model._id;
   emailEnseignant=resp.body.model.email
  
        })
      })

     it.only("should add a stage pfe", () => {
      const data = {
        sujet: "sujet pfe",
        description:"c'est un sujet de pfe test",
        societe:"talan",
        duree:"2",
        technologies:"laravel",
        dateDébutStage:"2023-02-20",
        dateFinStage:"2023-04-20",
        statutStage:"validé",
        pays:"tunisie",
         id_etudiant:id_etudiant,
        emailEtudiant:emailEtudiant,
    

      }
      cy.request({
        method: "POST",
        url: Cypress.env("urlBackend") + "/pfe/createPfe",
        body: data,
      }).then((response) => {
        console.log(response,"reponse dataaa");

        expect(response.status).to.eq(200)
        //     // eslint-disable-next-line no-unused-expressions
        expect(response.body.sujet).to.eq(data.sujet)
        expect(response.body.description).to.eq(data.description)
        expect(response.body.societe).to.eq(data.societe)
        expect(response.body.duree).to.eq(data.duree)
        expect(response.body.pays).to.eq(data.pays)
        expect(response.body.id_etudiant).to.contain(data.id_etudiant)
        expect(response.body.emailEtudiant).to.eq(data.emailEtudiant)
        console.log(response,"reponse dataaa");


        expect(response.body.technologies).to.eq(data.technologies)
       // expect(moment(response.body.dateDébutStage).format("YYYY-MM-DD")).to.eq(moment(data.dateDébutStage).format("YYYY-MM-DD"))
        //expect(moment(response.body.dateFinStage).format("YYYY-MM-DD")).to.eq(moment(data.dateFinStage).format("YYYY-MM-DD"))
        expect(response.body.statutStage).to.eq(data.statutStage)
        // eslint-disable-next-line no-unused-expressions
        expect(response.body._id).to.exist
        savedStagePfe = response.body 

        //     // Check the response
      })

    })
    console.log(savedStagePfe,"savedStagepfe");


    it("should get all the pfe list as admin", () => {
       
        cy.request("GET", Cypress.env("urlBackend") + "/pfe/").then((response) => {
          console.log(response,"this is our response");
          expect(response.status).to.eq(200)
          // Check the response type and length
          // expect(response.body.model).to.have.lengthOf(0)
        })
      })



      it("should get all the pfe list as enseignat", () => {
       
        cy.request("GET", Cypress.env("urlBackend") + "/pfe/getbyidenseignant/"+idenseignant).then((response) => {
          console.log(response,"this is our response");
          expect(response.status).to.eq(200)
          // Check the response type and length
          // expect(response.body.model).to.have.lengthOf(0)
        })
      })


   
      it.only("should select a pfe as enseignant", () => {
        const data = {
          id_enseignant:idenseignant,
          emailEnseignant:emailEnseignant,
      
  
        }
        cy.request({
          method: "PUT",
          url: Cypress.env("urlBackend") + "/pfe/updatebyid/"+ savedStagePfe._id,
          failOnStatusCode: false,

          body: data,
        }).then((response) => {
  
          expect(response.status).to.eq(200)
              // eslint-disable-next-line no-unused-expressions
      
        })
  
      })

  })
  