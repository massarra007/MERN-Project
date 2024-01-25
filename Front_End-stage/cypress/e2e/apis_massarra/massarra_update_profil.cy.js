describe("Update Etudiant API", () => {
  it("should update an etudiant", () => {
    const etudiantId = "643c17c52d030ac6e59e352a";
    const updatedData = {
      firstname: "massarraupdated",
      lastname: "benj",
      phone: "97876554",
      email: "massbbjj@gmail.com",
      login: "massarra",
      classe: "2eme",
      Birth_date: "1998-09-17",
      niveau: "master",
      etat: "actuel",
      visibility: "private"
    };

    cy.request({
      method: "PUT",
      url: Cypress.env("urlBackend") + "/users/updatebyid/" + etudiantId,
      body: updatedData,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
