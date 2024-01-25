describe("valider ou reporter demande compte alumni ", () => {
  it("avoir la liste des alumnis à valider", () => {
    cy.request("GET", "http://localhost:5000/enseignant/lists").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });
  it("Acceptation d'une demande d'alumni avec succès", () => {
    const alumniId = "64469c2d01857e7fb80179ad";

    cy.request({
      method: "POST",
      url: `http://localhost:5000/enseignant/acceptAlumni/${alumniId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Reporter d'une demande d'alumni avec succès", () => {
    const alumniId = "64469eeb01857e7fb80179b1";

    cy.request({
      method: "PUT",
      url: `http://localhost:5000/enseignant/report/${alumniId}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("user was updated successfully.");
    });
  });
});
