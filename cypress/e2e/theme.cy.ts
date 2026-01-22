describe("Tema", () => {
  beforeEach(() => {
    cy.setCookie("session_token", "fake-session-token")

    cy.intercept("GET", "**/users?page=1", {
      fixture: "users-page-1.json",
    })

    cy.visit("/dashboard")
  })

  it("persiste tema dark após reload", () => {
    cy.get("html").then(($html) => {
      const initialClass = $html.attr("class")

      cy.contains("Dark").click()
      cy.reload()

      cy.get("html").should("not.have.class", initialClass!)
    })
  })
})
