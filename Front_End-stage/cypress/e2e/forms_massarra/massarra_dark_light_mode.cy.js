describe("dark_light_mode", () => {
  beforeEach(() => {
    cy.visit("/update-cv");
  });

  it("should toggle between light and dark mode", () => {
    cy.get(".dark_mode_input").should("not.be.checked");
    cy.wait(2000);
    cy.get(".dark_mode_input").click({ force: true });
    cy.wait(1000);
    cy.get(".dark_mode_input").should("be.checked");
  });
});
