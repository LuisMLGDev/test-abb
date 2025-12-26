describe("testing navbar functions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("clicking on products works properly", () => {
    cy.get('[data-test="main-products"]').click({ force: true });
    cy.location("pathname").should("contain", "/products");
  });

  it("clicking on products works properly", () => {
    cy.get('[data-test="main-logo"]').click({ force: true });
    // Verify it goes back to root (which is /test-abb/)
    cy.location("pathname").should("match", /\/test-abb\/?$/);
  });

  it.skip("clicking on a product works properly", () => {
    cy.get('[data-test="product-card"]').first().click({ force: true });
    cy.location("pathname").should("contain", "/product/1");
  });

  it("login & logout works properly", () => {
    cy.get('[data-test="login-btn"]').click({ force: true });
    cy.get('[data-test="input-username"]').type("atuny0");
    cy.get('[data-test="input-password"]').type("9uQFF1Lh");
    cy.get('[data-test="input-submit"]').click({ force: true });
    cy.get('[data-test="username-popup"]').click({ force: true });
    cy.get('[data-test="popup-content-list"]').should("exist");
    cy.get('[data-test="logout-btn"]').click({ force: true });
    cy.get('[data-test="popup-content-list"]').should("not.exist");
    cy.get('[data-test="login-btn"]').should("exist");
  });
});
