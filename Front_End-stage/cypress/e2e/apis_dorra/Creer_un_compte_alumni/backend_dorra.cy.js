describe("ajouter demande compte alumni", () => {
  it("Création d'un nouvel alumni avec succès", () => {
    const alumniData = {
      firstname: "first_test_alumni",
      lastname: "last_test_alumni",
      login: "test_alumni",
      password: "Mot1de2passe3-",
      email: "test.alumni@gmail.com",
      phone: "222222222222",
      Birth_date: "1984-04-14",
      Cv: "55555555555555555555555",
      pays: "Tunisia",
      societe: "ISAMM",
      promotion: 2000,
      date_diplome: "2000-04-07",
      date_embauche: "2003-04-07",
      demande: false,
      report: false,
    };

    cy.request({
      method: "POST",
      url: "http://localhost:5000/alumnis/create",
      body: alumniData,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("_id");
      expect(response.body.firstname).to.eq(alumniData.firstname);
      expect(response.body.lastname).to.eq(alumniData.lastname);
      expect(response.body.login).to.eq(alumniData.login);
      expect(response.body.password).to.eq(alumniData.password);
      expect(response.body.email).to.eq(alumniData.email);
      expect(response.body.phone).to.eq(alumniData.phone);
    });
  });

  it("Échec de la création d'un nouvel alumni avec des données invalides", () => {
    // Envoyer une requête avec des données invalides (par exemple, des champs manquants)
    const invalidData = {
      email: "test.alumni@gmail.com",
      phone: "222222222222",
      Birth_date: "1984-04-14",
      Cv: "55555555555555555555555",
      pays: "Tunisia",
      societe: "ISAMM",
      promotion: 2000,
      date_diplome: "2000-04-07",
      date_embauche: "2003-04-07",
      demande: false,
      report: false,
    };
    cy.request({
      method: "POST",
      url: "http://localhost:5000/alumnis/create",
      body: invalidData,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.have.property("message");
    });
  });
});
