describe('Navigation Test', () => {
  it('should navigate between pages', () => {
    cy.visit('/')
    cy.get('nav a').first().click()
    cy.url().should('not.eq', Cypress.config().baseUrl + '/')
  })
})
