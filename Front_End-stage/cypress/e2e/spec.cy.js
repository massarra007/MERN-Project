describe("template spec", () => {
  it("should get all tasks (emplty tasks)", () => {
    cy.request("GET", "http://localhost:5000/alumnis/statchomage").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
  describe("Test d'appel API avec un corps de demande", () => {
    it("Effectue l'appel API", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:5000/alumnis/addDemande",
        body: {
          idAlumni: "6461223f921a0409473165a7",
          idDirecteur: "6461223f921a0409473165a7",
          status: false,
          vacation: true,
          expert: false,
          matiere: "math",
          description: "cours math",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
