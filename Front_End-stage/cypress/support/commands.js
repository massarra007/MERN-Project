/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
Cypress.Commands.add("getByData", (selector) => {
    // eslint-disable-next-line no-undef
    return cy.get(`[data-test=${selector}]`)
  })

  Cypress.Commands.add("loginasadmin", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("urlBackend") + "/users/signin",
      failOnStatusCode: false,
      body: {
        phone: "23000000",
        password: "123",
      },
    }).then((resp) => {
      console.log(resp.body.model, "response");
      localStorage.setItem("profile", JSON.stringify({ ...resp.body?.model }));

      window.localStorage.setItem("token", resp.body.mytoken)
      window.localStorage.setItem("role", resp.body.model.role)

    })
  })
  Cypress.Commands.add("loginasetudiant", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("urlBackend") + "/users/signin",
      failOnStatusCode: false,
      body: {
        phone: "12121212",
        password: "123",
      },
    }).then((resp) => {
      console.log(resp.body, "response signi");
      localStorage.setItem("profile", JSON.stringify({ ...resp.body?.model }));

      window.localStorage.setItem("token", resp.body.mytoken)
      window.localStorage.setItem("role", resp.body.model.role)     })
  })


  Cypress.Commands.add("loginasenseignant", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("urlBackend") + "/users/signin",
      failOnStatusCode: false,
      body: {
        phone: "25000000",
        password: "123",
      },
    }).then((resp) => {
      console.log(resp, "response");
      localStorage.setItem("profile", JSON.stringify({ ...resp.body?.model }));

      window.localStorage.setItem("token", resp.body.mytoken)
      window.localStorage.setItem("role", resp.body.model.role)    })
  })

  Cypress.Commands.add("loginasalumni", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("urlBackend") + "/users/signin",
      failOnStatusCode: false,
      body: {
        phone: "+2168596754",
        password: "123",
      },
    }).then((resp) => {
      console.log(resp, "response");
      localStorage.setItem("profile", JSON.stringify({ ...resp.body?.model }));

      window.localStorage.setItem("token", resp.body.mytoken)
      window.localStorage.setItem("role", resp.body.model.role)    })
  })