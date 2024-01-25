describe("Update CV API", () => {
  it("should update a CV", () => {
    const cvId = "647108b0c1c947aa19d92d7e";
    const updatedData = {
      firstname: "mohamed",
      lastname: "ben ben",
      phone: "123456789",
      Birth_date: "1990-01-01",
      niveau: "licence",
      classe: "2eme",
      adresse: "rue 123",
      email: "moh.ben@gmail.com",
      experiences: [
        {
          title: "Experience 1",
          description: "Description 1",
          date_debut: "2022-01-01",
          date_fin: "2022-12-31",
        },
      ],
      stages: [
        {
          sujet: "Stage 1",
          societe: "societe 1",
          duree: "3 mois",
          type: "PFE",
        },
      ],
    };

    cy.request({
      method: "PUT",
      url: Cypress.env("urlBackend") + "/cv/updatecv/" + cvId,
      body: updatedData,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("CV was updated successfully.");
    });
  });
});
