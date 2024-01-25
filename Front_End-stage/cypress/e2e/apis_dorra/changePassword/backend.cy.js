describe("Backend Password Reset Tests", () => {
  it("Envoi d'un lien de réinitialisation de mot de passe", () => {
    // Cas où l'e-mail est valide et l'utilisateur existe
    cy.request("POST", "http://localhost:5000/reset", {
      email: "boutitidorra@gmail.com",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(
        "Password reset link sent to your email account"
      );
    });

    // Cas où l'e-mail est manquant
    cy.request({
      method: "POST",
      url: "http://localhost:5000/reset",
      failOnStatusCode: false,
      body: {},
    }).then((response) => {
      expect(response.status).to.eq(400);
    });

    // Cas où l'e-mail est invalide
    cy.request({
      method: "POST",
      url: "http://localhost:5000/reset",
      failOnStatusCode: false,
      body: {
        email: "invalid-email",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });

    // Cas où l'utilisateur avec l'e-mail donné n'existe pas
    cy.request({
      method: "POST",
      url: "http://localhost:5000/reset",
      failOnStatusCode: false,
      body: {
        email: "nonexistent@example.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.message).to.eq(
        "User with given email does not exist!"
      );
    });
  });
  it("Vérification d'un lien de réinitialisation de mot de passe valide", () => {
    // Assurez-vous d'avoir un utilisateur existant avec un token valide
    const userId = "642b21f8dbb4c8c1bb95b444";
    const token =
      "b937440cc374de4bc033f7c5e87d772260a523929bb4101356c4dee391ec841c";

    cy.request({
      method: "GET",
      url: `http://localhost:5000/reset/${userId}/${token}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("Valid Url");
    });

    // Cas où l'ID utilisateur est invalide
    cy.request({
      method: "GET",
      url: `http://localhost:5000/reset/642b21f8dbb4c8c1bb95b445/${token}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Invalid link1");
    });

    // Cas où le token est invalide
    cy.request({
      method: "GET",
      url: `http://localhost:5000/reset/${userId}/a0435f7833310587b9790c3918108c8ac2b8f42280e47482cadc85d640fc5d59`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Invalid link2");
    });
  });
  it("Réinitialisation du mot de passe", () => {
    // Assurez-vous d'avoir un utilisateur existant avec un token valide
    const userId = "642b21f8dbb4c8c1bb95b444";
    const token =
      "b937440cc374de4bc033f7c5e87d772260a523929bb4101356c4dee391ec841c";
    const newPassword = "NouveauMotDePasse123@";

    cy.request({
      method: "POST",
      url: `http://localhost:5000/reset/${userId}/${token}`,
      body: {
        password: newPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Password reset successfully");
    });

    // Cas où le mot de passe invalid
    cy.request({
      method: "POST",
      url: `http://localhost:5000/reset/${userId}/${token}`,
      body: {
        password: "invalid mot de passe",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });

    // Cas où l'ID utilisateur est invalide
    cy.request({
      method: "POST",
      url: `http://localhost:5000/reset/642b21f8dbb4c8c1bb95b445/${token}`,
      body: {
        password: newPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Invalid link1");
    });

    // Cas où le token est invalide
    cy.request({
      method: "POST",
      url: `http://localhost:5000/reset/${userId}/8d1270b1eed2716ba1ea3df4b4649798c3862d9e374c0683f21920d2bb8db509`,
      body: {
        password: newPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq("Invalid link2");
    });
  });
});
