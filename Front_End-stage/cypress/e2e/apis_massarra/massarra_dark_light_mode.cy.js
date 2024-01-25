describe('CV API', () => {
    it('should update CV mode to dark', () => {
      cy.request('GET', 'http://localhost:5000/cv/getbyid/647135ef819526ae5cfb94a7')
        .then((response) => {
          const cvId = response.body.cvId; 
  
          cy.request('PUT', `http://localhost:5000/cv/updatemode/647135ef819526ae5cfb94a7`, { mode: 'dark' }) // Replace '/api/cv/${cvId}/mode' with the actual update mode endpoint
            .then((updateResponse) => {
              expect(updateResponse.status).to.eq(200);
              expect(updateResponse.body.message).to.eq('CV mode updated to dark');
              expect(updateResponse.body.cv.mode).to.eq('dark');
            });
        });
    });
  });
  