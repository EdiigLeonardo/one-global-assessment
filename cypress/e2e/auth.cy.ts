describe("Autenticação", () => {
  it("redireciona para login se acessar dashboard sem sessão", () => {
    cy.visit("/dashboard")
    cy.url().should("include", "/login")
  })

  it("login bem-sucedido redireciona para dashboard", () => {
    cy.intercept("POST", "**/login", {
      fixture: "login.json",
    }).as("login")

    cy.intercept("GET", "**/users?page=1", {
      fixture: "users-page-1.json",
    })

    cy.visit("/login")

    cy.get('input[placeholder="email@exemplo.com"]').type("test@test.com")
    cy.get('input[type="password"]').type("123456")
    cy.get("button").contains("Entrar").click()

    cy.wait("@login")
    cy.url().should("include", "/dashboard")
  })
})
