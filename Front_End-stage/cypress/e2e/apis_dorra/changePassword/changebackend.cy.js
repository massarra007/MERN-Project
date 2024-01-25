describe("Backend Password change Tests", () => {
  it("Réinitialisation du mot de passe avec succès", () => {
    // Assurez-vous d'avoir un utilisateur existant avec l'ID spécifié
    const userId = "642b21f8dbb4c8c1bb95b444";
    const newPassword = "NouveauMotDePasse123@";

    cy.request({
      method: "POST",
      url: `http://localhost:5000/reset/${userId}`,
      body: {
        password: newPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Password reset successfully");
    });
  });

  it("Réinitialisation du mot de passe avec un ID invalide", () => {
    // Cas où l'ID utilisateur est invalide
    cy.request({
      method: "POST",
      url: `http://localhost:5000/reset/692v21f8dbb4c8c1bb95b445`,
      body: {
        password: "NouveauMotDePasse123",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
