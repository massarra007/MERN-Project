describe('UpdateCv', () => {
  beforeEach(() => {
    cy.visit('/update-cv');
  });

  it('should update CV data', () => {
    // Retrieve the existing student from local storage
    cy.window().then((win) => {
      const studentData = win.localStorage.getItem('profile');
      const student = JSON.parse(studentData);
      console.log(student);

      // Create the updated student object
      const updatedCv = {
        ...student,
        firstname: 'maaaaaaassarra',
        lastname: 'benj',
        phone: '51271031',
        Birth_date: '1999-01-18',
        niveau: 'master',
        classe: '2eme',
        adresse: 'rue 2033',
        email: 'massarraaaaa@gmail.com',
        experiences: [
          {
            title: 'ex1',
            description: 'null',
            date_debut: '2020-01-20',
            date_fin: '2023-01-20',
          },
        ],
        stages: [
          {
            sujet: 'sujet1',
            societe: 'talan',
            duree: '3 mois',
            type: "Stage d'ete",
          },
        ],
      };

      // Fill in the input fields
      cy.get('#firstname').clear().type(updatedCv.firstname);
      cy.get('#lastname').clear().type(updatedCv.lastname);
      cy.get('#adresse').clear().type(updatedCv.adresse);
      cy.get('#email').clear().type(updatedCv.email);
      cy.get('#phone').clear().type(updatedCv.phone);
      cy.get('#classe').clear().type(updatedCv.classe);
      cy.get('#Birth_date').clear().type(updatedCv.Birth_date);
      cy.get('select[data-test="niveau"]').select(updatedCv.niveau);

      // Add experiences
      cy.contains('Add Experience').click();
      cy.get('input[name="title"]').eq(0).type('Experience 1');
      cy.get('input[name="description"]').eq(0).type('Description 1');
      cy.get('input[name="date_debut"]').eq(0).type('2020-01-01');
      cy.get('input[name="date_fin"]').eq(0).type('2021-01-01');

      cy.contains('Add Experience').click();
      cy.get('input[name="title"]').eq(1).type('Experience 2');
      cy.get('input[name="description"]').eq(1).type('Description 2');
      cy.get('input[name="date_debut"]').eq(1).type('2021-01-01');
      cy.get('input[name="date_fin"]').eq(1).type('2022-01-01');

      // Add stages
      cy.contains('Add Stage').click();
      cy.get('input[name="sujet"]').eq(0).type('Stage 1');
      cy.get('input[name="societe"]').eq(0).type('Company 1');
      cy.get('input[name="duree"]').eq(0).type('3 months');
      cy.get('select[name="type"]').eq(0).select('PFA');

      cy.contains('Add Stage').click();
      cy.get('input[name="sujet"]').eq(1).type('Stage 2');
      cy.get('input[name="societe"]').eq(1).type('Company 2');
      cy.get('input[name="duree"]').eq(1).type('6 months');
      cy.get('select[name="type"]').eq(1).select('PFA');

      // Verify the success or the updated data
      cy.request({
        method: 'PUT',
        url: 'http://localhost:5000/cv/update/6461b611d18e6eebb59f4719',
        body: updatedCv,
      }).then((response) => {
        // Assert the response or perform any additional checks
        expect(response.status).to.eq(200);
      });

      // Assert the expected result based on the updated data
    });
  });
});

