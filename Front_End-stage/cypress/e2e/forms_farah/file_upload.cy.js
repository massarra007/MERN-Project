describe('File Upload', () => {

    let adminToken = ""
    let adminrole= ""
    before(() => {
      cy.loginasadmin().then((resp) => {
        adminToken = window.localStorage.getItem("token");
        adminrole=window.localStorage.getItem("role")
      })
    })
    it(' upload a CSV file', () => {

      cy.visit("/administratif")
      cy.getByData("gestion-etudiant").click()
      cy.getByData("upload_file-etudiant").click()
      cy.fixture('student.csv').then((csvFile) => {
        
        cy.visit('/readall-etudiant');
  

        cy.get('button[aria-label="add"]').click();
  
     
        cy.get('input[type="file"]').attachFile({
          fileContent: csvFile,
          fileName: 'student.csv',
          mimeType: 'text/csv',
        });
  
  
        cy.contains('button', 'ajouter').click();
  
       
      });
    });
  });
  