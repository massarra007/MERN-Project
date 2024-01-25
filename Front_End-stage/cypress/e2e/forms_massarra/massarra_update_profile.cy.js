describe("UpdateEtudiant", () => {
  beforeEach(() => {
    cy.visit("/update-etudiant-compte");
  });

  it("should update student information", () => {
    // Retrieve the existing student from local storage
    const studentData = window.localStorage.getItem("profile");
    const student = JSON.parse(studentData);
    console.log(student);

    // Create the updated student object
    const updatedStudent = {
      ...student,
      firstname: "massar",
      lastname: "benjch",
      login: "mass",
      email: "mohbenben@gmail.com",
      phone: "15101010",
      classe: "1ere",
      Birth_date: "1998-09-17",
    };

    cy.get("#firstname").type(updatedStudent.firstname);
    cy.get("#lastname").type(updatedStudent.lastname);
    cy.get("#login").type(updatedStudent.login);
    cy.get("#email").type(updatedStudent.email);
    cy.get("#phone").type(updatedStudent.phone);
    cy.get("#classe").type(updatedStudent.classe);
    cy.get("#Birth_date").type(updatedStudent.Birth_date);

    cy.getByData("niveau").select(1);
    cy.getByData("etat").select(1);
    cy.getByData("visibility").select(1);

    // Save the updated student to local storage
    window.localStorage.setItem("student", JSON.stringify(updatedStudent));

    // Make the API request with the updated student data
    cy.request({
      method: "PUT",
      url: `http://localhost:5000/users/updatebyid/642cb48ed9d2606b46641b14`,
      body: updatedStudent,
    }).then((response) => {
      // Assert the response or perform any additional checks
      expect(response.status).to.eq(200);
    });
  });
});
